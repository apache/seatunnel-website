---
slug: spark-execute-tidb
title: 怎么用 Spark 在 TiDB 上做 OLAP 分析
tags: [Spark, TiDB]
---

# 怎么用Spark在TiDB上做OLAP分析

![](https://download.pingcap.com/images/tidb-planet.jpg)

[TiDB](https://github.com/pingcap/tidb) 是一款定位于在线事务处理/在线分析处理的融合型数据库产品，实现了一键水平伸缩，强一致性的多副本数据安全，分布式事务，实时 OLAP 等重要特性。

TiSpark 是 PingCAP 为解决用户复杂 OLAP 需求而推出的产品。它借助 Spark 平台，同时融合 TiKV 分布式集群的优势。

直接使用 TiSpark 完成 OLAP 操作需要了解 Spark，还需要一些开发工作。那么，有没有一些开箱即用的工具能帮我们更快速地使用 TiSpark 在 TiDB 上完成 OLAP 分析呢？

目前开源社区上有一款工具 **Seatunnel**，项目地址 [https://github.com/apache/incubator-seatunnel](https://github.com/apache/incubator-seatunnel) ，可以基于Spark，在 TiSpark 的基础上快速实现 TiDB 数据读取和 OLAP 分析。


## 使用 Seatunnel 操作TiDB

在我们线上有这么一个需求，从 TiDB 中读取某一天的网站访问数据，统计每个域名以及服务返回状态码的访问次数，最后将统计结果写入 TiDB 另外一个表中。 我们来看看 Seatunnel 是如何实现这么一个功能的。

### Seatunnel

[Seatunnel](https://github.com/apache/incubator-seatunnel) 是一个非常易用，高性能，能够应对海量数据的实时数据处理产品，它构建在 Spark 之上。Seatunnel 拥有着非常丰富的插件，支持从 TiDB、Kafka、HDFS、Kudu 中读取数据，进行各种各样的数据处理，然后将结果写入 TiDB、ClickHouse、Elasticsearch 或者 Kafka 中。


#### 准备工作

##### 1. TiDB 表结构介绍

**Input**（存储访问日志的表）

```
CREATE TABLE access_log (
    domain VARCHAR(255),
    datetime VARCHAR(63),
    remote_addr VARCHAR(63),
    http_ver VARCHAR(15),
    body_bytes_send INT,
    status INT,
    request_time FLOAT,
    url TEXT
)
```

```
+-----------------+--------------+------+------+---------+-------+
| Field           | Type         | Null | Key  | Default | Extra |
+-----------------+--------------+------+------+---------+-------+
| domain          | varchar(255) | YES  |      | NULL    |       |
| datetime        | varchar(63)  | YES  |      | NULL    |       |
| remote_addr     | varchar(63)  | YES  |      | NULL    |       |
| http_ver        | varchar(15)  | YES  |      | NULL    |       |
| body_bytes_send | int(11)      | YES  |      | NULL    |       |
| status          | int(11)      | YES  |      | NULL    |       |
| request_time    | float        | YES  |      | NULL    |       |
| url             | text         | YES  |      | NULL    |       |
+-----------------+--------------+------+------+---------+-------+
```

**Output**（存储结果数据的表）

```
CREATE TABLE access_collect (
    date VARCHAR(23),
    domain VARCHAR(63),
    status INT,
    hit INT
)
```

```
+--------+-------------+------+------+---------+-------+
| Field  | Type        | Null | Key  | Default | Extra |
+--------+-------------+------+------+---------+-------+
| date   | varchar(23) | YES  |      | NULL    |       |
| domain | varchar(63) | YES  |      | NULL    |       |
| status | int(11)     | YES  |      | NULL    |       |
| hit    | int(11)     | YES  |      | NULL    |       |
+--------+-------------+------+------+---------+-------+
```

##### 2. 安装 Seatunnel

有了 TiDB 输入和输出表之后， 我们需要安装 Seatunnel，安装十分简单，无需配置系统环境变量
1. 准备 Spark环境
2. 安装 Seatunnel
3. 配置 Seatunnel

以下是简易步骤，具体安装可以参照 [Quick Start](/docs/quick-start)

```
# 下载安装Spark
cd /usr/local
wget https://archive.apache.org/dist/spark/spark-2.1.0/spark-2.1.0-bin-hadoop2.7.tgz
tar -xvf https://archive.apache.org/dist/spark/spark-2.1.0/spark-2.1.0-bin-hadoop2.7.tgz
wget
# 下载安装seatunnel
https://github.com/InterestingLab/seatunnel/releases/download/v1.2.0/seatunnel-1.2.0.zip
unzip seatunnel-1.2.0.zip
cd seatunnel-1.2.0

vim config/seatunnel-env.sh
# 指定Spark安装路径
SPARK_HOME=${SPARK_HOME:-/usr/local/spark-2.1.0-bin-hadoop2.7}
```


### 实现 Seatunnel 处理流程

我们仅需要编写一个 Seatunnel 配置文件即可完成数据的读取、处理、写入。

Seatunnel 配置文件由四个部分组成，分别是 `Spark`、`Input`、`Filter` 和 `Output`。`Input` 部分用于指定数据的输入源，`Filter` 部分用于定义各种各样的数据处理、聚合，`Output` 部分负责将处理之后的数据写入指定的数据库或者消息队列。

整个处理流程为 `Input` -> `Filter` -> `Output`，整个流程组成了 Seatunnel 的 处理流程（Pipeline）。

> 以下是一个具体配置，此配置来源于线上实际应用，但是为了演示有所简化。


##### Input (TiDB)

这里部分配置定义输入源，如下是从 TiDB 一张表中读取数据。

    input {
        tidb {
            database = "nginx"
            pre_sql = "select * from nginx.access_log"
            table_name = "spark_nginx_input"
        }
    }

##### Filter

在Filter部分，这里我们配置一系列的转化, 大部分数据分析的需求，都是在Filter完成的。Seatunnel 提供了丰富的插件，足以满足各种数据分析需求。这里我们通过 SQL 插件完成数据的聚合操作。

    filter {
        sql {
            table_name = "spark_nginx_log"
            sql = "select count(*) as hit, domain, status, substring(datetime, 1, 10) as date from spark_nginx_log where substring(datetime, 1, 10)='2019-01-20' group by domain, status, substring(datetime, 1, 10)"
        }
    }


##### Output (TiDB)

最后， 我们将处理后的结果写入TiDB另外一张表中。TiDB Output是通过JDBC实现的

    output {
        tidb {
            url = "jdbc:mysql://127.0.0.1:4000/nginx?useUnicode=true&characterEncoding=utf8"
            table = "access_collect"
            user = "username"
            password = "password"
            save_mode = "append"
        }
    }

##### Spark

这一部分是 Spark 的相关配置，主要配置 Spark 执行时所需的资源大小以及其他 Spark 配置。

我们的 TiDB Input 插件是基于 TiSpark 实现的，而 TiSpark 依赖于 TiKV 集群和 Placement Driver (PD)。因此我们需要指定 PD 节点信息以及 TiSpark 相关配置`spark.tispark.pd.addresses`和`spark.sql.extensions`。


    spark {
      spark.app.name = "seatunnel-tidb"
      spark.executor.instances = 2
      spark.executor.cores = 1
      spark.executor.memory = "1g"
      # Set for TiSpark
      spark.tispark.pd.addresses = "localhost:2379"
      spark.sql.extensions = "org.apache.spark.sql.TiExtensions"
    }


#### 运行 Seatunnel

我们将上述四部分配置组合成我们最终的配置文件 `conf/tidb.conf`

```
spark {
    spark.app.name = "seatunnel-tidb"
    spark.executor.instances = 2
    spark.executor.cores = 1
    spark.executor.memory = "1g"
    # Set for TiSpark
    spark.tispark.pd.addresses = "localhost:2379"
    spark.sql.extensions = "org.apache.spark.sql.TiExtensions"
}
input {
    tidb {
        database = "nginx"
        pre_sql = "select * from nginx.access_log"
        table_name = "spark_table"
    }
}
filter {
    sql {
        table_name = "spark_nginx_log"
        sql = "select count(*) as hit, domain, status, substring(datetime, 1, 10) as date from spark_nginx_log where substring(datetime, 1, 10)='2019-01-20' group by domain, status, substring(datetime, 1, 10)"
    }
}
output {
    tidb {
        url = "jdbc:mysql://127.0.0.1:4000/nginx?useUnicode=true&characterEncoding=utf8"
        table = "access_collect"
        user = "username"
        password = "password"
        save_mode = "append"
    }
}
```

执行命令，指定配置文件，运行 Seatunnel ，即可实现我们的数据处理逻辑。

* Local

> ./bin/start-seatunnel.sh --config config/tidb.conf --deploy-mode client --master 'local[2]'

* yarn-client

> ./bin/start-seatunnel.sh --config config/tidb.conf --deploy-mode client --master yarn

* yarn-cluster

> ./bin/start-seatunnel.sh --config config/tidb.conf --deploy-mode cluster -master yarn

如果是本机测试验证逻辑，用本地模式（Local）就可以了，一般生产环境下，都是使用`yarn-client`或者`yarn-cluster`模式。

#### 检查结果

```
mysql> select * from access_collect;
+------------+--------+--------+------+
| date       | domain | status | hit  |
+------------+--------+--------+------+
| 2019-01-20 | b.com  |    200 |   63 |
| 2019-01-20 | a.com  |    200 |   85 |
+------------+--------+--------+------+
2 rows in set (0.21 sec)
```



## 总结

在这篇文章中，我们介绍了如何使用 Seatunnel 从 TiDB 中读取数据，做简单的数据处理之后写入 TiDB 另外一个表中。仅通过一个配置文件便可快速完成数据的导入，无需编写任何代码。

除了支持 TiDB 数据源之外，Seatunnel 同样支持Elasticsearch, Kafka, Kudu, ClickHouse等数据源。

**于此同时，我们正在研发一个重要功能，就是在 Seatunnel 中，利用 TiDB 的事务特性，实现从 Kafka 到 TiDB 流式数据处理，并且支持端（Kafka）到端（TiDB）的 Exactly-Once 数据一致性。**

希望了解 Seatunnel 和 TiDB，ClickHouse、Elasticsearch、Kafka结合使用的更多功能和案例，可以直接进入官网 [https://seatunnel.apache.org/](https://seatunnel.apache.org/)

## 联系我们
* 邮件列表 : **dev@seatunnel.apache.org**. 发送任意内容至 `dev-subscribe@seatunnel.apache.org`， 按照回复订阅邮件列表。
* Slack: 发送 `Request to join SeaTunnel slack` 邮件到邮件列表 (`dev@seatunnel.apache.org`), 我们会邀请你加入（在此之前请确认已经注册Slack）.
* [bilibili B站 视频](https://space.bilibili.com/1542095008)

-- Power by [InterestingLab](https://github.com/InterestingLab)

