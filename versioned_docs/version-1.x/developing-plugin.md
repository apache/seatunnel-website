# Plugin development


## Introduction to plugin system

The seatunnel plugin is divided into three parts, **Input**, **Filter** and **Output**

### Input

**Input** is responsible for converting the data of the external data source into `DStream[(String, String)]`

### Filter

**Filter** is a [transform](http://spark.apache.org/docs/latest/rdd-programming-guide.html#transformations) operation, responsible for operating on the data structure of Dataset[Row]

### Output

**Output** is the [action](http://spark.apache.org/docs/latest/rdd-programming-guide.html#actions) operation, which is responsible for outputting the Dataset[Row] to an external data source or printing it to terminal

## Ready to work

seatunnel supports Java/Scala as a development language for plug-ins, among which Scala is recommended for the **Input** plug-in, and both Java and Scala are available for other types of plug-ins.

Create a new Java/Scala project, or you can directly pull [seatunnel-filter-example](https://github.com/InterestingLab/seatunnel-filter-example), and then make modifications on this project

## 1. Create a new pom.xml

Reference file [pom.xml](https://github.com/InterestingLab/seatunnel-filter-example/blob/master/pom.xml)

Add the interface provided by seatunnel to the project's dependencies
````
<dependency>
    <groupId>io.github.interestinglab.seatunnel</groupId>
    <artifactId>seatunnel-apis_2.11</artifactId>
    <version>1.1.0</version>
</dependency>
````

## 2. Implement your own method

### Input (live stream)

- Create a new class and inherit the parent class `BaseInput` provided by **seatunnel-apis**
    ```scala
    class ScalaHdfs extends BaseStreamingInput {
    
      var config: Config = ConfigFactory.empty()
    
      /**
        * SetConfig.
        **/
      override def setConfig(config: Config): Unit = {
        this.config = config
      }
    
      /**
        * GetConfig.
        **/
      override def getConfig(): Config = {
        this.config
      }
    ````
- Override the `checkConfig`, `prepare` and `getDstream` methods defined by the parent class
    ```scala
    override def checkConfig(): (Boolean, String) = {}
    override def prepare(spark: SparkSession): Unit = {}
    override def getDStream(ssc: StreamingContext): DStream[(String, String)] = {}
  
    ````
- When the **Input** plugin is called, it will first execute the `checkConfig` method to check whether the parameters passed in when calling the plugin are correct, then call the `prepare` method to configure the default values ​​of the parameters and initialize the member variables of the class, and finally call the ` getStream` method converts external data source to `DStream[(String, String)]`
- Scala version **Input** plugin implementation refer to [ScalaHdfs](https://github.com/InterestingLab/seatunnel-filter-example/blob/master/src/main/scala/org/interestinglab/seatunnel/input/ScalaHdfs .scala)


### Filter

- Create a new class and inherit the parent class `BaseFilter` provided by **seatunnel-apis**
    ```Scala
    class ScalaSubstring extends BaseFilter {
    
      var config: Config = ConfigFactory.empty()
    
      /**
        * SetConfig.
        **/
      override def setConfig(config: Config): Unit = {
        this.config = config
      }
    
      /**
        * GetConfig.
        **/
      override def getConfig(): Config = {
        this.config
      }
    }
    ````
    ````Java
    public class JavaSubstring extends BaseFilter {
    
        private Config config;
    
        @Override
        public Config getConfig() {
            return config;
        }
    
        @Override
        public void setConfig(Config config) {
            this.config = config;
        }
    }
    ````
- Override the `checkConfig`, `prepare` and `process` methods defined by the parent class
    ```Scala
    override def checkConfig(): (Boolean, String) = {}
    override def prepare(spark: SparkSession): Unit = {}
    override def process(spark: SparkSession, ds: Dataset[Row]): Dataset[Row] = {}
    ````
    ````Java
    @Override
    public Tuple2<Object, String> checkConfig() {}
    @Override
    public void prepare(SparkSession spark, StreamingContext ssc) {}
    @Override
    public Dataset<Row> process(SparkSession spark, Dataset<Row> df) {}
    ````
    - When the **Filter** plugin is called, it will first execute the `checkConfig` method to check whether the parameters passed in when calling the plugin are correct, then call the `prepare` method to configure the default values ​​of the parameters and initialize the member variables of the class, and finally call the ` The process` method processes data in **Dataset[Row]** format.
    - For the implementation of the **Filter** plugin in the Java version, refer to [JavaSubstring](https://github.com/InterestingLab/seatunnel-filter-example/blob/master/src/main/java/org/interestinglab/seatunnel/filter/ JavaSubstring.java), the implementation of the Scala version **Filter** plugin refers to [ScalaSubstring](https://github.com/InterestingLab/seatunnel-filter-example/blob/master/src/main/scala/org/interestinglab/ seatunnel/filter/ScalaSubstring.scala)

### Output

- Create a new class and inherit the parent class `BaseOutput` provided by **seatunnel-apis**
    ```Scala
    class ScalaStdout extends BaseOutput {
    
    
      var config: Config = ConfigFactory.empty()
    
      /**
        * SetConfig.
        **/
      override def setConfig(config: Config): Unit = {
        this.config = config
      }
    
      /**
        * GetConfig.
        **/
      override def getConfig(): Config = {
        this.config
      }
    }
    ````
    ````Java
    public class JavaStdout extends BaseOutput {
    
        private Config config;
    
        @Override
        public Config getConfig() {
            return config;
        }
    
        @Override
        public void setConfig(Config config) {
            this.config = config;
        }
    }
    ````
- Override the `checkConfig`, `prepare` and `process` methods defined by the parent class
    ```Scala
    override def checkConfig(): (Boolean, String) = {}
    override def prepare(spark: SparkSession): Unit = {}
    override def process(spark: SparkSession, ds: Dataset[Row]): Dataset[Row] = {}
    ````
    ````Java
    @Override
    public Tuple2<Object, String> checkConfig() {}
    @Override
    public void prepare(SparkSession spark) {}
    @Override
    public Dataset<Row> process(SparkSsession spark, Dataset<Row> ds) {}
    ````
- **Output** plugin call structure is similar to **Filter** plugin. When calling, it will first execute the `checkConfig` method to check whether the parameters passed in when calling the plugin are correct, then call the `prepare` method to configure the default values ​​of the parameters and initialize the member variables of the class, and finally call the `process` method to set the **Dataset [Row]** format data output to an external data source.
- For the implementation of the **Output** plugin in the Java version, refer to [JavaStdout](https://github.com/InterestingLab/seatunnel-filter-example/blob/master/src/main/java/org/interestinglab/seatunnel/output/ JavaStdout.java), the implementation of the Scala version **Output** plugin refers to [ScalaStdout](https://github.com/InterestingLab/seatunnel-filter-example/blob/master/src/main/scala/org/interestinglab/ seatunnel/output/ScalaStdout.scala)

### UDFs

- Create a new class and inherit the parent class `BaseFilter` provided by **seatunnel-apis**
    ```Scala
    class ScalaSubstring extends BaseFilter {
    
      var config: Config = ConfigFactory.empty()
    
      /**
        * SetConfig.
        **/
      override def setConfig(config: Config): Unit = {
        this.config = config
      }
    
      /**
        * GetConfig.
        **/
      override def getConfig(): Config = {
        this.config
      }
    }
    ````
- Override the `checkConfig`, `prepare`, `getUdfList` and `process` methods defined by the parent class. Only the `getUdfList` and `process` methods are introduced here
    ```Scala
    override def getUdfList(): List[(String, UserDefinedFunction)] = {
      val func = udf((s: String, pos: Int, len: Int) => s. substring(pos, pos+len))
      List(("my_sub", func))
    }
    override def process(spark: SparkSession, ds: Dataset[Row]): Dataset[Row] = {
      val srcField = config.getString("source_field")
      val targetField = config.getString("target_field")
      val pos = config.getInt("pos")
      val len = config.getInt("len")
      val func = getUdfList().get(0)._2
      df.withColumn(targetField, func(col(srcField), lit(pos), lit(len)))
    }
    ````
  For a complete case of UDF plug-in development, refer to [ScalaSubstring](https://github.com/InterestingLab/seatunnel-example/blob/rickyhuo.fea.udf/src/main/scala/org/interestinglab/seatunnel/filter/ScalaSubstring.scala #L15)
- New META-INF/services

  Seatunnel will use the **Service loader** mechanism to register the method that implements `io.github.interestinglab.seatunnel.apis.BaseFilter` as UDF according to the method returned by `getUdfList`. If the interface implementation class is not specified in services, it will not be used. will be registered as a UDF.

  [META-INF] in the case (https://github.com/InterestingLab/seatunnel-example/blob/master/src/main/resources/META-INF/services/io.github.interestinglab.seatunnel.apis.BaseFilter )

## 3. Package and use

1. Packaging

   > mvn package

2. Put the packaged Jar package in the seatunnel `plugins` directory
    ```shell
    cd seatunnel-1.1.0
    mkdir -p plugins/my_plugins/lib
    cd plugins/my_plugins/lib
    ````

   Seatunnel needs to put the third-party Jar package, and must create a new **lib** folder
   > plugins/your_plugin_name/lib/your_jar_name

   other files in
   > plugins/your_plugin_name/files/your_file_name

3. Use plugins in configuration files

   Here is a complete example using a third-party plugin and putting it in `config/application.conf`

   The test data is generated by the `Fake` plugin, split with `Split`, then the third-party plugin `ScalaSubstring` is used to intercept the string, and finally the third-party plugin `JavaStdout` is used to print to the terminal.
    ````
    spark {
        spark.streaming.batchDuration = 5
        spark.app.name = "seatunnel-sample"
        spark.ui.port = 13000
        spark.executor.instances = 2
        spark.executor.cores = 1
        spark.executor.memory = "1g"
    }

    input {
        fakeStream {
            content = ["INFO : gary is 28 years old", "WARN : suwey is 16 years old"]
            rate = 5
        }
    }

    filter {
        split {
            fields = ["log_level", "message"]
            delimiter = ":"
        }
        sql = {
            table_name = "tmp"
            # use UDF
            sql = "select log_level, my_sub(message, 1, 3) from tmp"
        }
    }

    output {
        org.interestinglab.seatunnel.output.JavaStdout {
            limit = 2
        }
    }
    ````

4. Start seatunnel

    ````
    ./bin/start-seatunnel.sh --config config/application.conf --deploy-mode client --master local[2]
    ````

5. View the results

    ````
    +---------+--------------------------------+
    |log_level|UDF(message, 1, 3)|
    +---------+--------------------------------+
    |INFO |ary |
    |INFO |ary |
    +---------+--------------------------------+
    only showing top 2 rows

    ````