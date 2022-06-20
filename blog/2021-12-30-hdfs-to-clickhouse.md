---
slug: hdfs-to-clickhouse
title: How to quickly import data from HDFS into ClickHouse
tags: [HDFS, ClickHouse]
---

# How to quickly import data from HDFS into ClickHouse

ClickHouse is a distributed columnar DBMS for OLAP. Our department has now stored all log data related to data analysis in ClickHouse, an excellent data warehouse, and the current daily data volume has reached 30 billion.

The experience of data processing and storage introduced earlier is based on real-time data streams. The data is stored in Kafka. We use Java or Golang to read, parse, and clean the data from Kafka and write it into ClickHouse, so that the data can be stored in ClickHouse. Quick access. However, in the usage scenarios of many students, the data is not real-time, and it may be necessary to import the data in HDFS or Hive into ClickHouse. Some students implement data import by writing Spark programs, so is there a simpler and more efficient way?

At present, there is a tool **Seatunnel** in the open source community, the project address [https://github.com/apache/incubator-seatunnel](https://github.com/apache/incubator-seatunnel), can quickly Data in HDFS is imported into ClickHouse.

## HDFS To ClickHouse

Assuming that our logs are stored in HDFS, we need to parse the logs and filter out the fields we care about, and write the corresponding fields into the ClickHouse table.

### Log Sample

The log format we store in HDFS is as follows, which is a very common Nginx log

```shell
10.41.1.28 github.com 114.250.140.241 0.001s "127.0.0.1:80" [26/Oct/2018:03:09:32 +0800] "GET /Apache/Seatunnel HTTP/1.1" 200 0 "-" - "Dalvik/2.1.0 (Linux; U; Android 7.1.1; OPPO R11 Build/NMF26X)" "196" "-" "mainpage" "443" "-" "172.16.181.129"
```

### ClickHouse Schema

Our ClickHouse table creation statement is as follows, our table is partitioned by day

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

Next, I will introduce to you in detail how we can meet the above requirements through Seatunnel and write the data in HDFS into ClickHouse.

### Seatunnel

[Seatunnel](https://github.com/apache/incubator-seatunnel) is a very easy-to-use, high-performance, real-time data processing product that can deal with massive data. It is built on Spark. Seatunnel has a very rich set of plugins that support reading data from Kafka, HDFS, Kudu, performing various data processing, and writing the results to ClickHouse, Elasticsearch or Kafka.

### Prerequisites

First we need to install Seatunnel, the installation is very simple, no need to configure system environment variables

1. Prepare the Spark environment
2. Install Seatunnel
3. Configure Seatunnel

The following are simple steps, the specific installation can refer to [Quick Start](/docs/quick-start)

```shell
cd /usr/local

wget https://archive.apache.org/dist/spark/spark-2.2.0/spark-2.2.0-bin-hadoop2.7.tgz
tar -xvf https://archive.apache.org/dist/spark/spark-2.2.0/spark-2.2.0-bin-hadoop2.7.tgz

wget https://github.com/InterestingLab/seatunnel/releases/download/v1.1.1/seatunnel-1.1.1.zip

unzip seatunnel-1.1.1.zip

cd seatunnel-1.1.1
vim config/seatunnel-env.sh

# Specify the Spark installation path
SPARK_HOME=${SPARK_HOME:-/usr/local/spark-2.2.0-bin-hadoop2.7}
```

### seatunnel Pipeline

We only need to write a configuration file of seatunnel Pipeline to complete the data import.

The configuration file consists of four parts, Spark, Input, filter and Output.

#### Spark

This part is the related configuration of Spark, which mainly configures the size of the resources required for Spark to execute.

```shell
spark {
  spark.app.name = "seatunnel"
  spark.executor.instances = 2
  spark.executor.cores = 1
  spark.executor.memory = "1g"
}
```

#### Input

This part defines the data source. The following is a configuration example for reading data in text format from HDFS files.

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

In the Filter section, here we configure a series of transformations, including regular parsing to split the log, time transformation to convert HTTPDATE to the date format supported by ClickHouse, type conversion to Number type fields, and field filtering through SQL, etc.

```shell
filter {
    # Parse raw logs using regular expressions
    grok {
        source_field = "raw_message"
        pattern = '%{IP:ha_ip}\\s%{NOTSPACE:domain}\\s%{IP:remote_addr}\\s%{NUMBER:request_time}s\\s\"%{DATA:upstream_ip}\"\\s\\[%{HTTPDATE:timestamp}\\]\\s\"%{NOTSPACE:method}\\s%{DATA:url}\\s%{NOTSPACE:http_ver}\"\\s%{NUMBER:status}\\s%{NUMBER:body_bytes_send}\\s%{DATA:referer}\\s%{NOTSPACE:cookie_info}\\s\"%{DATA:user_agent}\"\\s%{DATA:uid}\\s%{DATA:session_id}\\s\"%{DATA:pool}\"\\s\"%{DATA:tag2}\"\\s%{DATA:tag3}\\s%{DATA:tag4}'
    }

    # Convert data in "dd/MMM/yyyy:HH:mm:ss Z" format to
    # Data in "yyyy/MM/dd HH:mm:ss" format
    date {
        source_field = "timestamp"
        target_field = "datetime"
        source_time_format = "dd/MMM/yyyy:HH:mm:ss Z"
        target_time_format = "yyyy/MM/dd HH:mm:ss"
    }

    # Use SQL to filter the fields of interest and process the fields
    # You can even filter out data you don't care about by filter conditions
    sql {
        table_name = "access"
        sql = "select substring(date, 1, 10) as date, datetime, hostname, url, http_code, float(request_time), int(data_size), domain from access"
    }
}
```

#### Output

Finally, we write the processed structured data to ClickHouse

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

We combine the above four-part configuration into our configuration file `config/batch.conf`.

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
    # Parse raw logs using regular expressions
    grok {
        source_field = "raw_message"
        pattern = '%{IP:ha_ip}\\s%{NOTSPACE:domain}\\s%{IP:remote_addr}\\s%{NUMBER:request_time}s\\s\"%{DATA:upstream_ip}\"\\s\\[%{HTTPDATE:timestamp}\\]\\s\"%{NOTSPACE:method}\\s%{DATA:url}\\s%{NOTSPACE:http_ver}\"\\s%{NUMBER:status}\\s%{NUMBER:body_bytes_send}\\s%{DATA:referer}\\s%{NOTSPACE:cookie_info}\\s\"%{DATA:user_agent}\"\\s%{DATA:uid}\\s%{DATA:session_id}\\s\"%{DATA:pool}\"\\s\"%{DATA:tag2}\"\\s%{DATA:tag3}\\s%{DATA:tag4}'
    }

    # Convert data in "dd/MMM/yyyy:HH:mm:ss Z" format to
    # Data in "yyyy/MM/dd HH:mm:ss" format
    date {
        source_field = "timestamp"
        target_field = "datetime"
        source_time_format = "dd/MMM/yyyy:HH:mm:ss Z"
        target_time_format = "yyyy/MM/dd HH:mm:ss"
    }

    # Use SQL to filter the fields of interest and process the fields
    # You can even filter out data you don't care about by filter conditions
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

Execute the command, specify the configuration file, and run Seatunnel to write data to ClickHouse. Here we take the local mode as an example.

```shell
./bin/start-seatunnel.sh --config config/batch.conf -e client -m 'local[2]'
```

## Conclusion

In this post, we covered how to import Nginx log files from HDFS into ClickHouse using Seatunnel. Data can be imported quickly with only one configuration file without writing any code. In addition to supporting HDFS data sources, Seatunnel also supports real-time reading and processing of data from Kafka to ClickHouse. Our next article will describe how to quickly import data from Hive into ClickHouse.

Of course, Seatunnel is not only a tool for ClickHouse data writing, but also plays a very important role in the writing of data sources such as Elasticsearch and Kafka.

If you want to know more functions and cases of Seatunnel combined with ClickHouse, Elasticsearch and Kafka, you can go directly to the official website [https://seatunnel.apache.org/](https://seatunnel.apache.org/)

-- Power by [InterestingLab](https://github.com/InterestingLab)
