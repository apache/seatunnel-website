---
slug: spark-structured-streaming
title: How to support Spark StructuredStreaming
tags: [Spark, StructuredStreaming]
---

# How to use StructuredStreaming recently supported by Seatunnel

### Foreword

StructuredStreaming is a newly opened module after Spark 2.0. Compared with SparkStreaming, it has some prominent advantages:<br/> &emsp;&emsp;First, it can achieve lower latency;<br/>
&emsp;&emsp;Second, real-time aggregation can be done, such as real-time calculation of the total sales of each commodity every day;<br/>
&emsp;&emsp;Third, you can do the association between streams, for example, to calculate the click rate of an advertisement, you need to associate the exposure record of the advertisement with the click record. <br/>
The above points may be cumbersome or difficult to implement if using SparkStreaming, but it will be easier to implement using StructuredStreaming.
### How to use StructuredStreaming
Maybe you have not studied StructuredStreaming in detail, but found that StructuredStreaming can solve your needs very well. How to quickly use StructuredStreaming to solve your needs? Currently there is a tool **Seatunnel** in the community, the project address: [https://github.com/apache/incubator-seatunnel](https://github.com/apache/incubator-seatunnel) ,
It can help you use StructuredStreaming to complete your needs efficiently and at low cost.

### Seatunnel

Seatunnel is a very easy-to-use, high-performance, real-time data processing product that can deal with massive data. It is built on Spark. Seatunnel has a very rich set of plug-ins, supports reading data from Kafka, HDFS, Kudu, performs various data processing, and writes the results to ClickHouse, Elasticsearch or Kafka

### Ready to work

First we need to install Seatunnel, the installation is very simple, no need to configure system environment variables

1. Prepare the Spark environment
2. Install Seatunnel
3. Configure Seatunnel

The following are simple steps, the specific installation can refer to [Quick Start](/docs/quick-start)

```
cd /usr/local
wget https://archive.apache.org/dist/spark/spark-2.2.0/spark-2.2.0-bin-hadoop2.7.tgz
tar -xvf https://archive.apache.org/dist/spark/spark-2.2.0/spark-2.2.0-bin-hadoop2.7.tgz
wget https://github.com/InterestingLab/seatunnel/releases/download/v1.3.0/seatunnel-1.3.0.zip
unzip seatunnel-1.3.0.zip
cd seatunnel-1.3.0

vim config/seatunnel-env.sh
# Specify the Spark installation path
SPARK_HOME=${SPARK_HOME:-/usr/local/spark-2.2.0-bin-hadoop2.7}
```

### Seatunnel Pipeline

We only need to write a configuration file of Seatunnel Pipeline to complete the data import.

The configuration file includes four parts, namely Spark, Input, filter and Output.

#### Spark

This part is the related configuration of Spark, which mainly configures the resource size required for Spark execution.

```
spark {
  spark.app.name = "seatunnel"
  spark.executor.instances = 2
  spark.executor.cores = 1
  spark.executor.memory = "1g"
}
```

#### Input

Below is an example of reading data from kafka

```
kafkaStream {
    topics = "seatunnel"
    consumer.bootstrap.servers = "localhost:9092"
    schema = "{\"name\":\"string\",\"age\":\"integer\",\"addrs\":{\"country\":\"string\",\"city\":\"string\"}}"
}
```

Through the above configuration, the data in kafka can be read. Topics is the topic of kafka to be subscribed to. Subscribing to multiple topics at the same time can be separated by commas. Consumer.bootstrap.servers is the list of Kafka servers, and schema is optional. Because the value read by StructuredStreaming from kafka (official fixed field value) is of binary type, see http://spark.apache.org/docs/latest/structured-streaming-kafka-integration.html
But if you are sure that the data in your kafka is a json string, you can specify the schema, and the input plugin will parse it according to the schema you specify

#### Filter

Here is a simple filter example

```
filter{
    sql{
        table_name = "student"
        sql = "select name,age from student"
    }
}
```
`table_name` is the registered temporary table name for easy use in the following sql

#### Output

The processed data is output, assuming that our output is also kafka

```
output{
    kafka {
        topic = "seatunnel"
        producer.bootstrap.servers = "localhost:9092"
        streaming_output_mode = "update"
        checkpointLocation = "/your/path"
    }
}
```

`topic` is the topic you want to output, `producer.bootstrap.servers` is a list of kafka clusters, `streaming_output_mode` is an output mode parameter of StructuredStreaming, there are three types of `append|update|complete`, for details, see the documentation http: //spark.apache.org/docs/latest/structured-streaming-programming-guide.html#output-modes

`checkpointLocation` is the checkpoint path of StructuredStreaming. If configured, this directory will store the running information of the program. For example, if the program exits and restarts, it will continue to consume the last offset.

### Scenario Analysis

The above is a simple example. Next, we will introduce a slightly more complex business scenario.

#### Scenario 1: Real-time aggregation scenario

Suppose there is now a mall with 10 kinds of products on it, and now it is necessary to find the daily sales of each product in real time, and even to find the number of buyers of each product (not very precise).
The huge advantage of this is that massive data can be aggregated during real-time processing, and there is no need to write data into the data warehouse first, and then run offline scheduled tasks for aggregation.
It is still very convenient to operate.

The data of kafka is as follows

```
{"good_id":"abc","price":300,"user_id":123456,"time":1553216320}
```

So how do we use Seatunnel to fulfill this requirement, of course, we only need to configure it.

```
#The configuration in spark is configured according to business requirements
spark {
  spark.app.name = "seatunnel"
  spark.executor.instances = 2
  spark.executor.cores = 1
  spark.executor.memory = "1g"
}

#configure input
input {
    kafkaStream {
        topics = "good_topic"
        consumer.bootstrap.servers = "localhost:9092"
        schema = "{\"good_id\":\"string\",\"price\":\"integer\",\"user_id\":\"Long\",\"time\":\"Long\"}"
    }
}

#configure filter    
filter {
    
    #When the program is doing aggregation, it will internally store the aggregation state of the program since startup, which will lead to OOM over time. If the watermark is set, the program will automatically clean up the state other than the watermark.
    #Here means use the ts field to set the watermark, the limit is 1 day

    Watermark {
        time_field = "time"
        time_type = "UNIX"              #UNIX represents a timestamp with a time field of 10, and other types can be found in the plugin documentation for details.
        time_pattern = "yyyy-MM-dd"     #The reason why the ts is assigned to the day is because the daily sales are sought, if the hourly sales are sought, the hour can be assigned `yyyy-MM-dd HH`
        delay_threshold = "1 day"
        watermark_field = "ts"          #After setting the watermark, a new field will be added, `ts` is the name of this field
    }
    
    #The reason for group by ts is to make the watermark take effect, approx_count_distinct is an estimate, not an exact count_distinct
    sql {
        table_name = "good_table_2"
        sql = "select good_id,sum(price) total,	approx_count_distinct(user_id) person from good_table_2 group by ts,good_id"
    }
}

#Next we choose to output the results to Kafka in real time
output{
    kafka {
        topic = "seatunnel"
        producer.bootstrap.servers = "localhost:9092"
        streaming_output_mode = "update"
        checkpointLocation = "/your/path"
    }
}

```
The above configuration is complete, start Seatunnel, and you can get the results you want.

#### Scenario 2: Multiple stream association scenarios

Suppose you have placed an advertisement on a certain platform, and now you need to calculate the CTR (click-through rate) of each advertisement in real time. The data comes from two topics, one is the advertisement exposure log, and the other is the advertisement click log.
At this point, we need to associate the two stream data together for calculation, and Seatunnel also supports this function recently, let's take a look at how to do it:


Click on topic data format

```
{"ad_id":"abc","click_time":1553216320,"user_id":12345}

```

Exposure topic data format

```
{"ad_id":"abc","show_time":1553216220,"user_id":12345}

```

```
#The configuration in spark is configured according to business requirements
spark {
  spark.app.name = "seatunnel"
  spark.executor.instances = 2
  spark.executor.cores = 1
  spark.executor.memory = "1g"
}

#configure input
input {
    
    kafkaStream {
        topics = "click_topic"
        consumer.bootstrap.servers = "localhost:9092"
        schema = "{\"ad_id\":\"string\",\"user_id\":\"Long\",\"click_time\":\"Long\"}"
        table_name = "click_table"
    }
    
    kafkaStream {
        topics = "show_topic"
        consumer.bootstrap.servers = "localhost:9092"
        schema = "{\"ad_id\":\"string\",\"user_id\":\"Long\",\"show_time\":\"Long\"}"
        table_name = "show_table"
    }
}

filter {
    
    #Left association right table must set watermark
    #Right off left and right tables must set watermark
    #http://spark.apache.org/docs/latest/structured-streaming-programming-guide.html#inner-joins-with-optional-watermarking
    Watermark {
              source_table_name = "click_table" #Here you can specify to add a watermark to a temporary table. If you don't specify it, it will be the first one in the input.
              time_field = "time"
              time_type = "UNIX"               
              delay_threshold = "3 hours"
              watermark_field = "ts" 
              result_table_name = "click_table_watermark" #After adding the watermark, it can be registered as a temporary table, which is convenient for subsequent use in sql
    }
    
    Watermark {
                source_table_name = "show_table" 
                time_field = "time"
                time_type = "UNIX"               
                delay_threshold = "2 hours"
                watermark_field = "ts" 
                result_table_name = "show_table_watermark" 
     }
    
    
    sql {
        table_name = "show_table_watermark"
        sql = "select a.ad_id,count(b.user_id)/count(a.user_id) ctr from show_table_watermark as a left join click_table_watermark as b on a.ad_id = b.ad_id and a.user_id = b.user_id "
    }
    
}

#Next we choose to output the results to Kafka in real time
output {
    kafka {
        topic = "seatunnel"
        producer.bootstrap.servers = "localhost:9092"
        streaming_output_mode = "append" #Stream association only supports append mode
        checkpointLocation = "/your/path"
    }
}
```
Through configuration, the case of stream association is also completed here.

### Conclusion
Through configuration, you can quickly use StructuredStreaming for real-time data processing, but you still need to understand some concepts of StructuredStreaming, such as the watermark mechanism, and the output mode of the program.

Finally, Seatunnel also supports spark streaming and spark batching of course.
If you are also interested in these two, you can read our previous article "[How to quickly import data from Hive into ClickHouse](2021-12-30-hive-to-clickhouse.md)",
"[Excellent data engineer, how to use Spark to do OLAP analysis on TiDB] (2021-12-30-spark-execute-tidb.md)",
"[How to use Spark to quickly write data to Elasticsearch] (2021-12-30-spark-execute-elasticsearch.md)"

If you want to know more functions and cases of Seatunnel combined with HBase, ClickHouse, Elasticsearch, Kafka, MySQL and other data sources, you can go directly to the official website [https://seatunnel.apache.org/](https://seatunnel.apache. org/)

## 联系我们
* Mailing list : **dev@seatunnel.apache.org**. Send anything to `dev-subscribe@seatunnel.apache.org` and subscribe to the mailing list according to the replies.
* Slack: Send a `Request to join SeaTunnel slack` email to the mailing list (`dev@seatunnel.apache.org`), and we will invite you to join (please make sure you are registered with Slack before doing so).
* [bilibili B station video](https://space.bilibili.com/1542095008)
