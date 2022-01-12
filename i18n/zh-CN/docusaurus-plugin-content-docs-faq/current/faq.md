---
title: SeaTunnel FAQ
sidebar_position: 1
---

**FAQ 1.** 使用SeaTunnel时遇到问题，我自己解决不了，我应该怎么办？

首先搜索[Issue列表](https://github.com/apache/incubator-seatunnel/issues)或者[邮件列表](https://lists.apache.org/list.html?dev@seatunnel.apache.org)看是否有人已经提问过相同问题并已得到解决。如果仍然没有找到答案，可以通过[这些方式](https://github.com/apache/incubator-seatunnel#contact-us)联系社区人员寻求帮助。

**FAQ 2.** SeaTunnel 中如何在配置中指定变量，之后在运行时动态指定变量的值？

SeaTunnel 从`v1.2.4`开始，支持在配置中指定变量，此功能常用于做定时或非定时的离线处理时，替换时间、日期等变量，用法如下：

在配置中配置变量名称，这里以sql transform举例（实际上配置文件中任意位置的key = value中的value，都可以使用变量替换功能）:

```
...
transform {
  sql {
    sql = "select * from user_view where city ='"${city}"' and dt = '"${date}"'"
  }
}

...
```

以Spark Local模式为例，启动命令如下：

```shell
./bin/start-seatunnel-spark.sh -c ./config/your_app.conf -e client -m local[2] -i city=shanghai -i date=20190319
```

可以用参数 `-i` 或者 `--variable` 后面指定 `key=value`来指定变量的值，其中`key` 需要与配置中的变量名相同。

**FAQ 3.** 在配置文件中一个配置项如何写成多行文本？

当一个配置的文本非常长，希望能够换行时，可以使用三个双引号来表示：

```
var = """
 whatever you want
"""
```

**FAQ 4.** 多行文本如何实现变量替换？

在多行文本中做变量替换时会麻烦一点，因为变量不能包括在三个双引号之内：

```
var = """
your string 1
"""${you_var}""" your string 2"""
```

参考：[lightbend/config#456](https://github.com/lightbend/config/issues/456)

**FAQ 5.** SeaTunnel 是否支持在Azkaban， Oozie，DolphinScheduler 这些任务调度框架中运行呢？

当然可以，请见下面的截图：

<img src="/doc/image/faq.assets/workflow.png" alt="img"  />

<img src="/doc/image/faq.assets/azkaban.png" alt="img"  />

**FAQ 6.** SeaTunnel有配置多个数据源的案例吗， 比如在source里面同时配置elasticsearch和hdfs？

多数据源举例如下：

```
env {
	...
}

source {
  hdfs { ... }	
  elasticsearch { ... }
  mysql {...}
}

transform {
	sql {
	 sql = """
	 	select .... from hdfs_table 
	 	join es_table 
	 	on hdfs_table.uid = es_table.uid where ..."""
	}
}

sink {
	elasticsearch { ... }
}
```

**FAQ 7.** 有没有HBase插件？

有hbase input 插件，从这里下载：https://github.com/garyelephant/waterdrop-input-hbase

**FAQ 8.** 如何用SeaTunnel把数据写入Hive？

```
env {
  spark.sql.catalogImplementation = "hive"
  spark.hadoop.hive.exec.dynamic.partition = "true"
  spark.hadoop.hive.exec.dynamic.partition.mode = "nonstrict"
}

source {
  sql = "insert into ..."
}

sink {
    // 数据已经通过sql source写入hive了，这里只是占位，实际上不起作用。
    stdout {
        limit = 1
    }
}
```

另外，在1.5.7版本之后已经支持了Hive output插件，在2.0.5版本中已经支持了Spark引擎的Hive插件：https://github.com/apache/incubator-seatunnel/issues/910。

**FAQ 9.** SeaTunnel 写 ClickHouse 多个实例如何实现负载均衡？

1. 直接写分布式表（不推荐）

2. 通过在ClickHouse多个实例前新增代理或者域名（DNS）：

   ```
   {
       output {
           clickhouse {
               host = "ck-proxy.xx.xx:8123"
               # 本地表
               table = "table_name"
           }
       }
   }
   ```

3. 在配置里面配置多个实例：

   ```
   {
       output {
           clickhouse {
               host = "ck1:8123,ck2:8123,ck3:8123"
               # 本地表
               table = "table_name"
           }
       }
   }
   ```

4. 使用 cluster 模式：

   ```
   {
       output {
           clickhouse {
               # 仅配置一个
               host = "ck1:8123"
               cluster = "clickhouse_cluster_name"
               # 本地表
               table = "table_name"
           }
       }
   }
   ```

**FAQ 10.** SeaTunnel消费Kafka出现OOM怎么解决？

多数情况，OOM是由于消费没有限速导致的，解决方法如下：

关于Spark消费Kafka的限流：

1. 假设你用 KafkaStream 消费的 Kafka `Topic 1 `的partition个数 = N。

2. 假设`Topic 1` 的消息生产者(Producer)的生产速度为K条/秒 ，要求写入每个partition的速度是均匀的。

3. 假设经过测试，发现Spark Executor 每核每秒的处理能力为M条/秒。

可以得出以下结论：

1. 如果想让spark的消费Topic 1的速度跟上它生产的速度，那么需要 `spark.executor.cores` * `spark.executor.instances` >= K / M

2. 发生数据延迟时，如果想让消费速度不要过快，导致spark executor OOM，那么需要配置`spark.streaming.kafka.maxRatePerPartition` <= (`spark.executor.cores` * `spark.executor.instances`) * M / N

3. 一般情况下M, N都是确定的，由(2)可以得到结论：`spark.streaming.kafka.maxRatePerPartition`的大小与`spark.executor.cores` * `spark.executor.instances`的大小是正相关的，调大资源的同时可以调大`maxRatePerPartition`，加快消费。

![kafka](/doc/image/faq.assets/kafka.png)



**FAQ 11.** 遇到`Exception in thread "main" java.lang.NoSuchFieldError: INSTANCE`报错如何解决？

原因是CDH版本Spark自带的 httpclient.jar 版本较低，而ClickHouse JDBC基于的httpclient版本为4.5.2，包版本冲突。解决方法是用 httpclient-4.5.2 版本替换掉 CDH 自带的jar包。

**FAQ 12.** 我的Spark集群的默认JDK是JDK7，我安装了JDK8之后，如何指定让SeaTunnel使用JDK8启动？

在SeaTunnel的config 文件中，指定如下配置：

```shell
env {
 ...
 spark.executorEnv.JAVA_HOME="/your/java_8_home/directory"
 spark.yarn.appMasterEnv.JAVA_HOME="/your/java_8_home/directory"
 ...
}
```

**FAQ 13.** 如何为SeaTunnel on Yarn指定不同的JDK版本？

比如，你希望将JDK版本定为JDK8，分两种情况：

- Yarn集群已经部署了JDK8，但默认的JDK不是JDK8，此时只需要在SeaTunnel的config 文件中增加2个配置即可：

    ```
    spark {
     ...
     spark.executorEnv.JAVA_HOME="/your/java_8_home/directory"
     spark.yarn.appMasterEnv.JAVA_HOME="/your/java_8_home/directory"
     ...
    }
    ```
  
- Yarn集群没有部署JDK8，此时需要你启动SeaTunnel时，同时附带上JDK8，具体操作见下面的连接：
  https://www.cnblogs.com/jasondan/p/spark-specific-jdk-version.html

**FAQ 14.** Spark local[*] 模式下跑SeaTunnel，总是出现OOM怎么办？

如果用local模式跑的话，需要修改一下start-seatunnel.sh启动脚本，在spark-submit后面，增加一个参数 `--driver-memory 4g` 。一般情况下生产环境不用local 模式，所以这个参数在On Yarn时一般不需要设置。
详见 ： [Application Properties](https://spark.apache.org/docs/latest/configuration.html#application-properties)。

**FAQ 15.** 自己编写的插件或者是第三方的jdbc.jar放在哪里可以被 SeaTunnel 加载？

将Jar包放置在 `plugins` 目录指定结构下：

```
cd SeaTunnel
mkdir -p plugins/my_plugins/lib
cp third-part.jar plugins/my_plugins/lib
```

`my_plugins` 可以为任意字符串。

**FAQ 16.** SeaTunnel-v1(Spark) 如何配置logging相关参数？

有3种配置Logging相关参数的方法（如Log Level）：

- [不推荐] 更改默认的`$SPARK_HOME/conf/log4j.properties`
  - 这样会影响到所有通过此`$SPARK_HOME/bin/spark-submit` 提交程序的logging配置
- [不推荐] 直接在SeaTunnel的Spark代码中修改logging相关参数
  - 这样相当于写死了，每次更改都需要重新编译
- [推荐] 在SeaTunnel的配置文件中通过下面的方式来更改logging配置（SeaTunnel >= 1.5.5 之后才生效）：

    ```
    env {
        spark.driver.extraJavaOptions = "-Dlog4j.configuration=file:<file path>/log4j.properties"
        spark.executor.extraJavaOptions = "-Dlog4j.configuration=file:<file path>/log4j.properties"
    }
    source {
      ...
    }
    transform {
     ...
    }
    sink {
      ...
    }
    ```

参考的log4j配置文件内容如下：

```
$ cat log4j.properties
log4j.rootLogger=ERROR, console

# set the log level for these components
log4j.logger.org=ERROR
log4j.logger.org.apache.spark=ERROR
log4j.logger.org.spark-project=ERROR
log4j.logger.org.apache.hadoop=ERROR
log4j.logger.io.netty=ERROR
log4j.logger.org.apache.zookeeper=ERROR

# add a ConsoleAppender to the logger stdout to write to the console
log4j.appender.console=org.apache.log4j.ConsoleAppender
log4j.appender.console.layout=org.apache.log4j.PatternLayout
# use a simple message format
log4j.appender.console.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
```

SeaTunnel-v2(Spark, Flink) 如何配置logging相关参数？

目前暂时还不能直接设置，需要用户修改SeaTunnel启动脚本，在Spark或者Flink的提交任务命令中指定相关参数，具体参数可参照官方文档：

- Spark 官方文档：http://spark.apache.org/docs/latest/configuration.html#configuring-logging
- Flink官方文档：https://ci.apache.org/projects/flink/flink-docs-stable/monitoring/logging.html

Reference:

https://stackoverflow.com/questions/27781187/how-to-stop-info-messages-displaying-on-spark-console

http://spark.apache.org/docs/latest/configuration.html#configuring-logging

https://medium.com/@iacomini.riccardo/spark-logging-configuration-in-yarn-faf5ba5fdb01

https://stackoverflow.com/questions/27781187/how-to-stop-info-messages-displaying-on-spark-console

**FAQ 17.** 写入ClickHouse 报错: ClassCastException

在SeaTunnel里面不会主动对数据类型进行转，在Input读取数据之后，生成对应的Schema。而在写入ClickHouse的时候，需要字段类型严格匹配，不匹配的需要进行数据转换，数据转换可以通过以下2种插件实现：

1. Filter Convert插件
2. Filter Sql插件

详细的数据类型转换参考：[https://interestinglab.github.io/seatunnel-docs/#/zh-cn/v1/configuration/output-plugins/Clickhouse?id=clickhouse%e7%b1%bb%e5%9e%8b%e5%af%b9%e7%85%a7%e8%a1%a8](https://interestinglab.github.io/seatunnel-docs/#/zh-cn/v1/configuration/output-plugins/Clickhouse?id=clickhouse类型对照表)

参考Issue： [#488](https://github.com/apache/incubator-seatunnel/issues/488) [#382](https://github.com/apache/incubator-seatunnel/issues/382)

**FAQ 18.** SeaTunnel 如何访问kerberos鉴权的HDFS、YARN、Hive等资源？

请参考：[#590](https://github.com/apache/incubator-seatunnel/issues/590)

**FAQ 19.** 如何排查NoClassDefFoundError、ClassNotFoundException 等问题？

出现这种情况，大概率是Java Classpath中有多个不同版本的对应Jar包class load时因为顺序问题冲突了，而不是真的缺少这个Jar，请修改这个SeaTunnel启动命令，在spark-submit提交的地方加入以下参数，通过输出的日志来详细debug。

```
spark-submit --verbose
    ...
   --conf 'spark.driver.extraJavaOptions=-verbose:class'
   --conf 'spark.executor.extraJavaOptions=-verbose:class'
    ...
```

**FAQ 20.** 如何使用SeaTunnel完成跨HDFS集群数据同步？

只要把hdfs-site.xml配置好即可，参见这篇文章：https://www.cnblogs.com/suanec/p/7828139.html

另外附送一篇如何修改spark代码完成配置的代码（SeaTunnel不需要这么做）：https://www.jianshu.com/p/3e84c4c97610

**FAQ 21.** 我想学习SeaTunnel 源码，从哪里开始呢？

SeaTunnel 拥有完全抽象化，结构化的代码实现，已经有很多人选择将SeaTunnel的源码作为学习Spark的方式，你可以从主程序入口开始学习源码：[Seatunnel.java](https://github.com/apache/incubator-seatunnel/blob/72b57b22688f17376fe7e5cf522b4bdd3f62cce0/seatunnel-core/seatunnel-core-base/src/main/java/org/apache/seatunnel/Seatunnel.java)

**FAQ 22.** SeaTunnel开发者自己开发插件时，是否需要了解SeaTunnel代码，是否需要把代码写到SeaTunnel项目里？

开发者开发的插件，与SeaTunnel项目可以完全没有关系，不需要把你的插件代码写到SeaTunnel项目里面。
插件可以是一个完全独立的项目，在里面你用java，scala，maven，sbt，gradle，都随你。
这也是我们建议开发者开发插件的方式。

