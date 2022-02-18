---
slug: hive-to-clickhouse
title: How to quickly import data from Hive into ClickHouse
tags: [Hive, ClickHouse]
---

ClickHouse is a distributed columnar DBMS for OLAP. Our department has stored all log data related to data analysis in ClickHouse, an excellent data warehouse, and the current daily data volume has reached 30 billion.

In the previous article [How to quickly import data from HDFS into ClickHouse] (2021-12-30-hdfs-to-clickhouse.md), we mentioned the use of Seatunnel [https://github.com/apache/incubator -seatunnel](https://github.com/apache/incubator-seatunnel) After a very simple operation on the data in HDFS, the data can be written to ClickHouse. The data in HDFS is generally unstructured data, so what should we do with the structured data stored in Hive?

![](/doc/image_zh/hive-logo.png)

## Hive to ClickHouse

Assuming that our data has been stored in Hive, we need to read the data in the Hive table and filter out the fields we care about, or convert the fields, and finally write the corresponding fields into the ClickHouse table.

### Hive Schema

The structure of the data table we store in Hive is as follows, which stores common Nginx logs.

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

Our ClickHouse table creation statement is as follows, our table is partitioned by day

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

Next, I will introduce to you how we write data from Hive to ClickHouse through Seatunnel.

### Seatunnel

[Seatunnel](https://github.com/apache/incubator-seatunnel) is a very easy-to-use, high-performance, real-time data processing product that can deal with massive data. It is built on Spark. Seatunnel has a very rich set of plug-ins that support reading data from Kafka, HDFS, and Kudu, performing various data processing, and writing the results to ClickHouse, Elasticsearch or Kafka.

The environment preparation and installation steps of Seatunnel will not be repeated here. For specific installation steps, please refer to the previous article or visit [Seatunnel Docs](/docs/introduction)

### Seatunnel Pipeline

We only need to write a configuration file of Seatunnel Pipeline to complete the data import.

The configuration file includes four parts, namely Spark, Input, filter and Output.

#### Spark


This part is the related configuration of Spark, which mainly configures the resource size required for Spark execution.

```
spark {
  // This configuration is required
  spark.sql.catalogImplementation = "hive"
  spark.app.name = "seatunnel"
  spark.executor.instances = 2
  spark.executor.cores = 1
  spark.executor.memory = "1g"
}
```

#### Input

This part defines the data source. The following is a configuration example of reading data in text format from a Hive file.

```
input {
    hive {
        pre_sql = "select * from access.nginx_msg_detail"
        table_name = "access_log"
    }
}
```

See, a very simple configuration can read data from Hive. `pre_sql` is the SQL to read data from Hive, and `table_name` is the name of the table that will register the read data as a temporary table in Spark, which can be any field.

It should be noted that it must be ensured that the metastore of hive is in the service state.

When running in Cluster, Client, Local mode, the `hive-site.xml` file must be placed in the $HADOOP_CONF directory of the submit task node

#### Filter

In the Filter section, here we configure a series of transformations, and here we discard the unnecessary minute and hour fields. Of course, we can also not read these fields through `pre_sql` when reading Hive

```
filter {
    remove {
        source_field = ["minute", "hour"]
    }
}
```

#### Output

Finally, we write the processed structured data to ClickHouse

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

We combine the above four-part configuration into our configuration file `config/batch.conf`.

    vim config/batch.conf

```
spark {
  spark.app.name = "seatunnel"
  spark.executor.instances = 2
  spark.executor.cores = 1
  spark.executor.memory = "1g"
  // This configuration is required
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

Execute the command, specify the configuration file, and run Seatunnel to write data to ClickHouse. Here we take the local mode as an example.

    ./bin/start-seatunnel.sh --config config/batch.conf -e client -m 'local[2]'


## Conclusion

In this post, we covered how to import data from Hive into ClickHouse using Seatunnel. The data import can be completed quickly through only one configuration file without writing any code, which is very simple.

If you want to know more functions and cases of Seatunnel combined with ClickHouse, Elasticsearch, Kafka, Hadoop, you can go directly to the official website [https://seatunnel.apache.org/](https://seatunnel.apache.org/)

-- Power by [InterestingLab](https://github.com/InterestingLab)
