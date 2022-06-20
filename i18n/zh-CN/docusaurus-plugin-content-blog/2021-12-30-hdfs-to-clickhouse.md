---
slug: hdfs-to-clickhouse
title: 如何快速地把 HDFS 中的数据导入 ClickHouse
tags: [HDFS, ClickHouse]
---

# 如何快速地把 HDFS 中的数据导入 ClickHouse

ClickHouse 是面向 OLAP 的分布式列式 DBMS。我们部门目前已经把所有数据分析相关的日志数据存储至 ClickHouse 这个优秀的数据仓库之中，当前日数据量达到了 300 亿。

之前介绍的有关数据处理入库的经验都是基于实时数据流，数据存储在 Kafka 中，我们使用 Java 或者 Golang 将数据从 Kafka 中读取、解析、清洗之后写入 ClickHouse 中，这样可以实现数据的快速接入。然而在很多同学的使用场景中，数据都不是实时的，可能需要将 HDFS 或者是 Hive 中的数据导入 ClickHouse。有的同学通过编写 Spark 程序来实现数据的导入，那么是否有更简单、高效的方法呢。

目前开源社区上有一款工具 **Seatunnel**，项目地址 [https://github.com/apache/incubator-seatunnel](https://github.com/apache/incubator-seatunnel)，可以快速地将 HDFS 中的数据导入 ClickHouse。

## HDFS To ClickHouse

假设我们的日志存储在 HDFS 中，我们需要将日志进行解析并筛选出我们关心的字段，将对应的字段写入 ClickHouse 的表中。

### Log Sample

我们在 HDFS 中存储的日志格式如下， 是很常见的 Nginx 日志

```shell
10.41.1.28 github.com 114.250.140.241 0.001s "127.0.0.1:80" [26/Oct/2018:03:09:32 +0800] "GET /Apache/Seatunnel HTTP/1.1" 200 0 "-" - "Dalvik/2.1.0 (Linux; U; Android 7.1.1; OPPO R11 Build/NMF26X)" "196" "-" "mainpage" "443" "-" "172.16.181.129"
```

### ClickHouse Schema

我们的 ClickHouse 建表语句如下，我们的表按日进行分区

```shell
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
    data_size Int32, 
    pool String
) ENGINE = MergeTree PARTITION BY date ORDER BY date SETTINGS index_granularity = 16384
```

## Seatunnel with ClickHouse

接下来会给大家详细介绍，我们如何通过 Seatunnel 满足上述需求，将 HDFS 中的数据写入 ClickHouse 中。

### Seatunnel

[Seatunnel](https://github.com/apache/incubator-seatunnel) 是一个非常易用，高性能，能够应对海量数据的实时数据处理产品，它构建在Spark之上。Seatunnel 拥有着非常丰富的插件，支持从 Kafka、HDFS、Kudu 中读取数据，进行各种各样的数据处理，并将结果写入 ClickHouse、Elasticsearch 或者 Kafka 中。

### Prerequisites

首先我们需要安装 Seatunnel，安装十分简单，无需配置系统环境变量

1. 准备 Spark 环境
2. 安装 Seatunnel
3. 配置 Seatunnel

以下是简易步骤，具体安装可以参照 [Quick Start](/docs/quick-start)

```shell
cd /usr/local

wget https://archive.apache.org/dist/spark/spark-2.2.0/spark-2.2.0-bin-hadoop2.7.tgz
tar -xvf https://archive.apache.org/dist/spark/spark-2.2.0/spark-2.2.0-bin-hadoop2.7.tgz

wget https://github.com/InterestingLab/seatunnel/releases/download/v1.1.1/seatunnel-1.1.1.zip

unzip seatunnel-1.1.1.zip

cd seatunnel-1.1.1
vim config/seatunnel-env.sh

# 指定Spark安装路径
SPARK_HOME=${SPARK_HOME:-/usr/local/spark-2.2.0-bin-hadoop2.7}
```

### seatunnel Pipeline

我们仅需要编写一个 seatunnel Pipeline 的配置文件即可完成数据的导入。

配置文件包括四个部分，分别是 Spark、Input、filter 和 Output。

#### Spark

这一部分是 Spark 的相关配置，主要配置 Spark 执行时所需的资源大小。

```shell
spark {
  spark.app.name = "seatunnel"
  spark.executor.instances = 2
  spark.executor.cores = 1
  spark.executor.memory = "1g"
}
```

#### Input

这一部分定义数据源，如下是从 HDFS 文件中读取 text 格式数据的配置案例。

```shell
input {
    hdfs {
        path = "hdfs://nomanode:8020/rowlog/accesslog"
        table_name = "access_log"
        format = "text"
    }
}
```

#### Filter

在 Filter 部分，这里我们配置一系列的转化，包括正则解析将日志进行拆分、时间转换将 HTTPDATE 转化为 ClickHouse 支持的日期格式、对 Number 类型的字段进行类型转换以及通过 SQL 进行字段筛减等

```shell
filter {
    # 使用正则解析原始日志
    grok {
        source_field = "raw_message"
        pattern = '%{IP:ha_ip}\\s%{NOTSPACE:domain}\\s%{IP:remote_addr}\\s%{NUMBER:request_time}s\\s\"%{DATA:upstream_ip}\"\\s\\[%{HTTPDATE:timestamp}\\]\\s\"%{NOTSPACE:method}\\s%{DATA:url}\\s%{NOTSPACE:http_ver}\"\\s%{NUMBER:status}\\s%{NUMBER:body_bytes_send}\\s%{DATA:referer}\\s%{NOTSPACE:cookie_info}\\s\"%{DATA:user_agent}\"\\s%{DATA:uid}\\s%{DATA:session_id}\\s\"%{DATA:pool}\"\\s\"%{DATA:tag2}\"\\s%{DATA:tag3}\\s%{DATA:tag4}'
    }

    # 将"dd/MMM/yyyy:HH:mm:ss Z"格式的数据转换为
    # "yyyy/MM/dd HH:mm:ss"格式的数据
    date {
        source_field = "timestamp"
        target_field = "datetime"
        source_time_format = "dd/MMM/yyyy:HH:mm:ss Z"
        target_time_format = "yyyy/MM/dd HH:mm:ss"
    }

    # 使用SQL筛选关注的字段，并对字段进行处理
    # 甚至可以通过过滤条件过滤掉不关心的数据
    sql {
        table_name = "access"
        sql = "select substring(date, 1, 10) as date, datetime, hostname, url, http_code, float(request_time), int(data_size), domain from access"
    }
}
```

#### Output

最后我们将处理好的结构化数据写入 ClickHouse

```shell
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

### Running seatunnel

我们将上述四部分配置组合成为我们的配置文件 `config/batch.conf`。

```shell
vim config/batch.conf
```

```shell
spark {
  spark.app.name = "seatunnel"
  spark.executor.instances = 2
  spark.executor.cores = 1
  spark.executor.memory = "1g"
}

input {
    hdfs {
        path = "hdfs://nomanode:8020/rowlog/accesslog"
        table_name = "access_log"
        format = "text"
    }
}

filter {
    # 使用正则解析原始日志
    grok {
        source_field = "raw_message"
        pattern = '%{IP:ha_ip}\\s%{NOTSPACE:domain}\\s%{IP:remote_addr}\\s%{NUMBER:request_time}s\\s\"%{DATA:upstream_ip}\"\\s\\[%{HTTPDATE:timestamp}\\]\\s\"%{NOTSPACE:method}\\s%{DATA:url}\\s%{NOTSPACE:http_ver}\"\\s%{NUMBER:status}\\s%{NUMBER:body_bytes_send}\\s%{DATA:referer}\\s%{NOTSPACE:cookie_info}\\s\"%{DATA:user_agent}\"\\s%{DATA:uid}\\s%{DATA:session_id}\\s\"%{DATA:pool}\"\\s\"%{DATA:tag2}\"\\s%{DATA:tag3}\\s%{DATA:tag4}'
    }

    # 将"dd/MMM/yyyy:HH:mm:ss Z"格式的数据转换为
    # "yyyy/MM/dd HH:mm:ss"格式的数据
    date {
        source_field = "timestamp"
        target_field = "datetime"
        source_time_format = "dd/MMM/yyyy:HH:mm:ss Z"
        target_time_format = "yyyy/MM/dd HH:mm:ss"
    }

    # 使用SQL筛选关注的字段，并对字段进行处理
    # 甚至可以通过过滤条件过滤掉不关心的数据
    sql {
        table_name = "access"
        sql = "select substring(date, 1, 10) as date, datetime, hostname, url, http_code, float(request_time), int(data_size), domain from access"
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

执行命令，指定配置文件，运行 Seatunnel，即可将数据写入 ClickHouse。这里我们以本地模式为例。

```shell
./bin/start-seatunnel.sh --config config/batch.conf -e client -m 'local[2]'
```

## Conclusion

在这篇文章中，我们介绍了如何使用 Seatunnel 将 HDFS 中的 Nginx 日志文件导入 ClickHouse 中。仅通过一个配置文件便可快速完成数据的导入，无需编写任何代码。除了支持 HDFS 数据源之外，Seatunnel 同样支持将数据从 Kafka 中实时读取处理写入 ClickHouse 中。我们的下一篇文章将会介绍，如何将 Hive 中的数据快速导入 ClickHouse 中。

当然，Seatunnel 不仅仅是 ClickHouse 数据写入的工具，在 Elasticsearch 以及 Kafka等 数据源的写入上同样可以扮演相当重要的角色。

希望了解 Seatunnel 和 ClickHouse、Elasticsearch、Kafka 结合使用的更多功能和案例，可以直接进入官网 [https://seatunnel.apache.org/](https://seatunnel.apache.org/)

-- Power by [InterestingLab](https://github.com/InterestingLab)
