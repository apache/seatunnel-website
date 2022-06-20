# Quick start

> We take an application that receives data through a socket, divides the data into multiple fields, and outputs the processing results as an example to quickly demonstrate the use of seatunnel.

### Step 1: Prepare the Spark runtime environment

> If you are familiar with Spark or have prepared the Spark runtime environment, you can ignore this step, Spark does not require any special configuration.

Please [download Spark](http://spark.apache.org/downloads.html) first, and select Spark version >= 2.x.x. After downloading and decompressing, you can submit tasks in Spark deploy-mode = local mode without any configuration.
If you expect the task to run on a Standalone cluster or a Yarn or Mesos cluster, please refer to the [Spark Deployment Documentation] on the Spark official website (http://spark.apache.org/docs/latest/cluster-overview.html).

### Step 2: Download seatunnel

Go to the [seatunnel installation package download page](https://github.com/InterestingLab/seatunnel/releases/latest) and download the latest version of `seatunnel-<version>.zip`

Or directly download the specified version (take 1.1.2 as an example):

````
wget https://github.com/InterestingLab/seatunnel/releases/download/v1.1.2/seatunnel-1.1.2.zip -O seatunnel-1.1.2.zip
````

After downloading, unzip:

````
unzip seatunnel-<version>.zip
ln -s seatunnel-<version> seatunnel
````

### Step 3: Configure seatunnel

Edit `config/seatunnel-env.sh`, specify the required environment configuration such as SPARK_HOME (the directory downloaded and decompressed by Spark in Step 1)

Edit `config/application.conf`, which determines the way and logic of data input, processing, and output after seatunnel is started.

````
spark {
  # seatunnel defined streaming batch duration in seconds
  spark.streaming.batchDuration = 5

  spark.app.name = "seatunnel"
  spark.ui.port = 13000
}

input {
  socketStream {}
}

filter {
  split {
    fields = ["msg", "name"]
    delimiter = ","
  }
}

output {
  stdout {}
}

````

### Step 4: Start the netcat server for sending data

````
nc -l -p 9999
````


### Step 5: Start seatunnel

````
cd seatunnel
./bin/start-seatunnel.sh --master local[4] --deploy-mode client --config ./config/application.conf

````

### Step 6: Input at the nc terminal

````
Hello World, Gary
````
The seatunnel log prints out:

````
+-----+------------+----+
|raw_message |msg |name|
+-----+------------+----+
|Hello World, Gary|Hello World|Gary|
+-----+------------+----+
````


### Summarize

seatunnel is simple and easy to use, and there are richer data processing functions waiting to be discovered. The data processing case presented in this paper,
No code, compilation, packaging required, simpler than the official [Quick Example](https://spark.apache.org/docs/latest/streaming-programming-guide.html#a-quick-example).


---

For more seatunnel configuration examples, see:

[Configuration Example 1: Streaming Streaming Computing](https://github.com/InterestingLab/seatunnel/blob/master/config/streaming.conf.template)

The above configuration is the default [Streaming Configuration Template], which can be run directly. The command is as follows:

````
cd seatunnel
./bin/start-seatunnel.sh --master local[4] --deploy-mode client --config ./config/streaming.conf.template

````

[Configuration example 2: Batch offline batch](https://github.com/InterestingLab/seatunnel/blob/master/config/batch.conf.template)

The above configuration is the default [offline batch configuration template], which can be run directly. The command is as follows:

````
cd seatunnel
./bin/start-seatunnel.sh --master local[4] --deploy-mode client --config ./config/batch.conf.template

````

[Configuration Example 3: Structured Streaming Streaming](https://github.com/InterestingLab/seatunnel/blob/master/config/structuredstreaming.conf.template)

The above configuration is the default [Structured Streaming configuration template], and the Kafka input source needs to be configured to run, the command is as follows:

````
cd seatunnel
./bin/start-seatunnel-structured-streaming.sh --master local[4] --deploy-mode client --config ./config/batch.conf.template

````