---
slug: spark-execute-tidb
title: How to use Spark to do OLAP analysis on TiDB
tags: [Spark, TiDB]
---

# How to use Spark to do OLAP analysis on TiDB

![](https://download.pingcap.com/images/tidb-planet.jpg)

[TiDB](https://github.com/pingcap/tidb) is a fusion database product targeting online transaction processing/online analytical processing. Distributed transactions, real-time OLAP and other important features.

TiSpark is a product launched by PingCAP to solve the complex OLAP needs of users. It uses the Spark platform and integrates the advantages of TiKV distributed clusters.

Completing OLAP operations with TiSpark directly requires knowledge of Spark and some development work. So, are there some out-of-the-box tools that can help us use TiSpark to complete OLAP analysis on TiDB more quickly?

At present, there is a tool **Seatunnel** in the open source community, the project address [https://github.com/apache/incubator-seatunnel](https://github.com/apache/incubator-seatunnel), which can be based on Spark, Quickly implement TiDB data reading and OLAP analysis based on TiSpark.


## Operating TiDB with Seatunnel

We have such a requirement online. Read the website access data of a certain day from TiDB, count the number of visits of each domain name and the status code returned by the service, and finally write the statistical results to another table in TiDB. Let's see how Seatunnel implements such a function.

### Seatunnel

[Seatunnel](https://github.com/apache/incubator-seatunnel) is a very easy-to-use, high-performance, real-time data processing product that can deal with massive data. It is built on Spark. Seatunnel has a very rich set of plugins that support reading data from TiDB, Kafka, HDFS, Kudu, perform various data processing, and then write the results to TiDB, ClickHouse, Elasticsearch or Kafka.


#### Ready to work

##### 1. Introduction to TiDB table structure

**Input** (table where access logs are stored)

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

**Output** (table where result data is stored)

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

##### 2. Install Seatunnel

After we have the input and output tables of TiDB, we need to install Seatunnel. The installation is very simple, and there is no need to configure system environment variables
1. Prepare the Spark environment
2. Install Seatunnel
3. Configure Seatunnel

The following are simple steps, the specific installation can refer to [Quick Start](/docs/quick-start)

```
# Download and install Spark
cd /usr/local
wget https://archive.apache.org/dist/spark/spark-2.1.0/spark-2.1.0-bin-hadoop2.7.tgz
tar -xvf https://archive.apache.org/dist/spark/spark-2.1.0/spark-2.1.0-bin-hadoop2.7.tgz
wget
# Download and install seatunnel
https://github.com/InterestingLab/seatunnel/releases/download/v1.2.0/seatunnel-1.2.0.zip
unzip seatunnel-1.2.0.zip
cd seatunnel-1.2.0

vim config/seatunnel-env.sh
# Specify the Spark installation path
SPARK_HOME=${SPARK_HOME:-/usr/local/spark-2.1.0-bin-hadoop2.7}
```


### Implement the Seatunnel processing flow

We only need to write a Seatunnel configuration file to read, process, and write data.

The Seatunnel configuration file consists of four parts, `Spark`, `Input`, `Filter` and `Output`. The `Input` part is used to specify the input source of the data, the `Filter` part is used to define various data processing and aggregation, and the `Output` part is responsible for writing the processed data to the specified database or message queue.

The whole processing flow is `Input` -> `Filter` -> `Output`, which constitutes the processing flow (Pipeline) of Seatunnel.

> The following is a specific configuration, which is derived from an online practical application, but simplified for demonstration.


##### Input (TiDB)

This part of the configuration defines the input source. The following is to read data from a table in TiDB.

    input {
        tidb {
            database = "nginx"
            pre_sql = "select * from nginx.access_log"
            table_name = "spark_nginx_input"
        }
    }

##### Filter

In the Filter section, here we configure a series of transformations, most of the data analysis requirements are completed in the Filter. Seatunnel provides a wealth of plug-ins enough to meet various data analysis needs. Here we complete the data aggregation operation through the SQL plugin.

    filter {
        sql {
            table_name = "spark_nginx_log"
            sql = "select count(*) as hit, domain, status, substring(datetime, 1, 10) as date from spark_nginx_log where substring(datetime, 1, 10)='2019-01-20' group by domain, status, substring(datetime, 1, 10)"
        }
    }


##### Output (TiDB)

Finally, we write the processed results to another table in TiDB. TiDB Output is implemented through JDBC

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

This part is related to Spark configuration. It mainly configures the resource size required for Spark execution and other Spark configurations.

Our TiDB Input plugin is implemented based on TiSpark, which relies on TiKV cluster and Placement Driver (PD). So we need to specify PD node information and TiSpark related configuration `spark.tispark.pd.addresses` and `spark.sql.extensions`.

    spark {
      spark.app.name = "seatunnel-tidb"
      spark.executor.instances = 2
      spark.executor.cores = 1
      spark.executor.memory = "1g"
      # Set for TiSpark
      spark.tispark.pd.addresses = "localhost:2379"
      spark.sql.extensions = "org.apache.spark.sql.TiExtensions"
    }


#### Run Seatunnel

We combine the above four parts into our final configuration file `conf/tidb.conf`

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

Execute the command, specify the configuration file, and run Seatunnel to implement our data processing logic.

* Local

> ./bin/start-seatunnel.sh --config config/tidb.conf --deploy-mode client --master 'local[2]'

* yarn-client

> ./bin/start-seatunnel.sh --config config/tidb.conf --deploy-mode client --master yarn

* yarn-cluster

> ./bin/start-seatunnel.sh --config config/tidb.conf --deploy-mode cluster -master yarn

If it is a local test and verification logic, you can use the local mode (Local). Generally, in the production environment, the `yarn-client` or `yarn-cluster` mode is used.

#### test result

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



## Conclusion

In this article, we introduced how to use Seatunnel to read data from TiDB, do simple data processing and write it to another table in TiDB. Data can be imported quickly with only one configuration file without writing any code.

In addition to supporting TiDB data sources, Seatunnel also supports Elasticsearch, Kafka, Kudu, ClickHouse and other data sources.

**At the same time, we are developing an important function, which is to use the transaction features of TiDB in Seatunnel to realize streaming data processing from Kafka to TiDB, and support Exactly-Once data from end (Kafka) to end (TiDB). consistency. **

If you want to know more functions and cases of Seatunnel combined with TiDB, ClickHouse, Elasticsearch and Kafka, you can go directly to the official website [https://seatunnel.apache.org/](https://seatunnel.apache.org/)

## Contract us
* Mailing list : **dev@seatunnel.apache.org**. Send anything to `dev-subscribe@seatunnel.apache.org` and subscribe to the mailing list according to the replies.
* Slack: Send a `Request to join SeaTunnel slack` email to the mailing list (`dev@seatunnel.apache.org`), and we will invite you to join (please make sure you are registered with Slack before doing so).
* [bilibili B station video](https://space.bilibili.com/1542095008)

-- Power by [InterestingLab](https://github.com/InterestingLab)

