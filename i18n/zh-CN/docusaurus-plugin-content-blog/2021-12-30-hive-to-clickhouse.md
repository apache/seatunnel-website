---
slug: hive-to-clickhouse
title: 如何快速地把 Hive 中的数据导入 ClickHouse
tags: [Hive, ClickHouse]
---

ClickHouse是面向OLAP的分布式列式DBMS。我们部门目前已经把所有数据分析相关的日志数据存储至ClickHouse这个优秀的数据仓库之中，当前日数据量达到了300亿。

在之前的文章 [如何快速地把HDFS中的数据导入ClickHouse](i18n/zh-CN/docusaurus-plugin-content-blog/current/2021-12-30-hdfs-to-clickhouse.mdtent-blog/current/2021-12-30-hdfs-to-clickhouse.md) 中我们提到过使用 Seatunnel [https://github.com/apache/incubator-seatunnel](https://github.com/apache/incubator-seatunnel) 对HDFS中的数据经过很简单的操作就可以将数据写入ClickHouse。HDFS中的数据一般是非结构化的数据，那么针对存储在Hive中的结构化数据，我们应该怎么操作呢？

![](/doc/image_zh/hive-logo.png)

## Hive to ClickHouse

假定我们的数据已经存储在Hive中，我们需要读取Hive表中的数据并筛选出我们关心的字段，或者对字段进行转换，最后将对应的字段写入ClickHouse的表中。

### Hive Schema

我们在Hive中存储的数据表结构如下，存储的是很常见的Nginx日志

```
CREATE TABLE `nginx_msg_detail`(
   `hostname` string,
   `domain` string,
   `remote_addr` string,
   `request_time` float,
   `datetime` string,
   `url` string,
   `status` int,
   `data_size` int,
   `referer` string,
   `cookie_info` string,
   `user_agent` string,
   `minute` string)
 PARTITIONED BY (
   `date` string,
   `hour` string)

```

### ClickHouse Schema

我们的ClickHouse建表语句如下，我们的表按日进行分区

```
CREATE TABLE cms.cms_msg
(
    date Date,
    datetime DateTime,
    url String,
    request_time Float32,
    status String,
    hostname String,
    domain String,
    remote_addr String,
    data_size Int32
) ENGINE = MergeTree PARTITION BY date ORDER BY (date, hostname) SETTINGS index_granularity = 16384
```

## Seatunnel with ClickHouse

接下来会给大家介绍，我们如何通过 Seatunnel 将Hive中的数据写入ClickHouse中。

### Seatunnel

[Seatunnel](https://github.com/apache/incubator-seatunnel) 是一个非常易用，高性能，能够应对海量数据的实时数据处理产品，它构建在Spark之上。Seatunnel 拥有着非常丰富的插件，支持从Kafka、HDFS、Kudu中读取数据，进行各种各样的数据处理，并将结果写入ClickHouse、Elasticsearch或者Kafka中。

Seatunnel的环境准备以及安装步骤这里就不一一赘述了，具体安装步骤可以参考上一篇文章或者访问 [Seatunnel Docs](/docs/intro/about)

### Seatunnel Pipeline

我们仅需要编写一个Seatunnel Pipeline的配置文件即可完成数据的导入。

配置文件包括四个部分，分别是Spark、Input、filter和Output。

#### Spark


这一部分是Spark的相关配置，主要配置Spark执行时所需的资源大小。
```
spark {
  // 这个配置必需填写
  spark.sql.catalogImplementation = "hive"
  spark.app.name = "seatunnel"
  spark.executor.instances = 2
  spark.executor.cores = 1
  spark.executor.memory = "1g"
}
```

#### Input

这一部分定义数据源，如下是从Hive文件中读取text格式数据的配置案例。

```
input {
    hive {
        pre_sql = "select * from access.nginx_msg_detail"
        table_name = "access_log"
    }
}
```

看，很简单的一个配置就可以从Hive中读取数据了。其中`pre_sql`是从Hive中读取数据SQL，`table_name`是将读取后的数据，注册成为Spark中临时表的表名，可为任意字段。

需要注意的是，必须保证hive的metastore是在服务状态。

在Cluster、Client、Local模式下运行时，必须把`hive-site.xml`文件置于提交任务节点的$HADOOP_CONF目录下

#### Filter

在Filter部分，这里我们配置一系列的转化，我们这里把不需要的minute和hour字段丢弃。当然我们也可以在读取Hive的时候通过`pre_sql`不读取这些字段

```
filter {
    remove {
        source_field = ["minute", "hour"]
    }
}
```

#### Output
最后我们将处理好的结构化数据写入ClickHouse

```
output {
    clickhouse {
        host = "your.clickhouse.host:8123"
        database = "seatunnel"
        table = "nginx_log"
        fields = ["date", "datetime", "hostname", "url", "http_code", "request_time", "data_size", "domain"]
        username = "username"
        password = "password"
    }
}
```

### Running Seatunnel

我们将上述四部分配置组合成为我们的配置文件`config/batch.conf`。

    vim config/batch.conf

```
spark {
  spark.app.name = "seatunnel"
  spark.executor.instances = 2
  spark.executor.cores = 1
  spark.executor.memory = "1g"
  // 这个配置必需填写
  spark.sql.catalogImplementation = "hive"
}
input {
    hive {
        pre_sql = "select * from access.nginx_msg_detail"
        table_name = "access_log"
    }
}
filter {
    remove {
        source_field = ["minute", "hour"]
    }
}
output {
    clickhouse {
        host = "your.clickhouse.host:8123"
        database = "seatunnel"
        table = "access_log"
        fields = ["date", "datetime", "hostname", "uri", "http_code", "request_time", "data_size", "domain"]
        username = "username"
        password = "password"
    }
}
```

执行命令，指定配置文件，运行 Seatunnel，即可将数据写入ClickHouse。这里我们以本地模式为例。

    ./bin/start-seatunnel.sh --config config/batch.conf -e client -m 'local[2]'


## Conclusion

在这篇文章中，我们介绍了如何使用 Seatunnel 将Hive中的数据导入ClickHouse中。仅仅通过一个配置文件便可快速完成数据的导入，无需编写任何代码，十分简单。

希望了解 Seatunnel 与ClickHouse、Elasticsearch、Kafka、Hadoop结合使用的更多功能和案例，可以直接进入官网 [https://seatunnel.apache.org/](https://seatunnel.apache.org/)

-- Power by [InterestingLab](https://github.com/InterestingLab)
