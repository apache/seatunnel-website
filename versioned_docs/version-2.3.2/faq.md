# FAQs


## I have a question, and I cannot solve it by myself

I have encountered a problem when using SeaTunnel and I cannot solve it by myself. What should I do? First, search in [Issue list](https://github.com/apache/seatunnel/issues) or [mailing list](https://lists.apache.org/list.html?dev@seatunnel.apache.org) to see if someone has already asked the same question and got an answer. If you cannot find an answer to your question, you can contact community members for help in [these ways](https://github.com/apache/seatunnel#contact-us).

## How do I declare a variable?

Do you want to know how to declare a variable in SeaTunnel's configuration, and then dynamically replace the value of the variable at runtime?

Since `v1.2.4`, SeaTunnel supports variable substitution in the configuration. This feature is often used for timing or non-timing offline processing to replace variables such as time and date. The usage is as follows:

Configure the variable name in the configuration. Here is an example of sql transform (actually, anywhere in the configuration file the value in `'key = value'` can use the variable substitution):

```
...
transform {
  sql {
    query = "select * from user_view where city ='"${city}"' and dt = '"${date}"'"
  }
}
...
```

Taking Spark Local mode as an example, the startup command is as follows:

```bash
./bin/start-seatunnel-spark.sh \
-c ./config/your_app.conf \
-e client \
-m local[2] \
-i city=shanghai \
-i date=20190319
```

You can use the parameter `-i` or `--variable` followed by `key=value` to specify the value of the variable, where the key needs to be same as the variable name in the configuration.

## How do I write a configuration item in multi-line text in the configuration file?

When a configured text is very long and you want to wrap it, you can use three double quotes to indicate its start and end:

```
var = """
 whatever you want
"""
```

## How do I implement variable substitution for multi-line text?

It is a little troublesome to do variable substitution in multi-line text, because the variable cannot be included in three double quotation marks:

```
var = """
your string 1
"""${you_var}""" your string 2"""
```

Refer to: [lightbend/config#456](https://github.com/lightbend/config/issues/456).


## Does SeaTunnel have a case for configuring multiple sources, such as configuring elasticsearch and hdfs in source at the same time?

```
env {
	...
}

source {
  hdfs { ... }	
  elasticsearch { ... }
  jdbc {...}
}

transform {
    ...
}

sink {
	elasticsearch { ... }
}
```


## How do I specify a different JDK version for SeaTunnel on Yarn?

For example, if you want to set the JDK version to JDK8, there are two cases:

- The Yarn cluster has deployed JDK8, but the default JDK is not JDK8. Add two configurations to the SeaTunnel config file:

  ```
    env {
   ...
   spark.executorEnv.JAVA_HOME="/your/java_8_home/directory"
   spark.yarn.appMasterEnv.JAVA_HOME="/your/java_8_home/directory"
   ...
  }
  ```
- Yarn cluster does not deploy JDK8. At this time, start SeaTunnel attached with JDK8. For detailed operations, see:
  https://www.cnblogs.com/jasondan/p/spark-specific-jdk-version.html

## What should I do if OOM always appears when running SeaTunnel in Spark local[*] mode?

If you run in local mode, you need to modify the `start-seatunnel.sh` startup script. After `spark-submit`, add a parameter `--driver-memory 4g` . Under normal circumstances, local mode is not used in the production environment. Therefore, this parameter generally does not need to be set during On Yarn. See: [Application Properties](https://spark.apache.org/docs/latest/configuration.html#application-properties) for details.


## How do I configure logging-related parameters in SeaTunnel-v1(Spark)?

There are three ways to configure logging-related parameters (such as Log Level):

- [Not recommended] Change the default `$SPARK_HOME/conf/log4j.properties`.
  - This will affect all programs submitted via `$SPARK_HOME/bin/spark-submit`.
- [Not recommended] Modify logging related parameters directly in the Spark code of SeaTunnel.
  - This is equivalent to writing dead, and each change needs to be recompiled.
- [Recommended] Use the following methods to change the logging configuration in the SeaTunnel configuration file (The change only takes effect if SeaTunnel >= 1.5.5 ):

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

The contents of the log4j configuration file for reference are as follows:

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

## How do I configure logging related parameters in SeaTunnel-v2(Spark, Flink)?

Currently, they cannot be set directly. you need to modify the SeaTunnel startup script. The relevant parameters are specified in the task submission command. For specific parameters, please refer to the official documents:

- Spark official documentation: http://spark.apache.org/docs/latest/configuration.html#configuring-logging
- Flink official documentation: https://ci.apache.org/projects/flink/flink-docs-stable/monitoring/logging.html

Reference:

https://stackoverflow.com/questions/27781187/how-to-stop-info-messages-displaying-on-spark-console

http://spark.apache.org/docs/latest/configuration.html#configuring-logging

https://medium.com/@iacomini.riccardo/spark-logging-configuration-in-yarn-faf5ba5fdb01



