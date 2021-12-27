---
title: 快速开始
sidebar_position: 2
---

# 快速开始

> 我们以一个通过socket接收数据，将数据分割为多个字段，并输出处理结果的应用为例，快速展示seatunnel的使用方法。

### Step 1: 准备Spark 运行环境

> 如果你熟悉Spark或者已准备好Spark运行环境，可忽略此步骤，Spark不需要做任何特殊配置。

请先[下载Spark](http://spark.apache.org/downloads.html), Spark版本请选择 >= 2.x.x。下载解压后，不需要做任何配置即可提交Spark deploy-mode = local模式的任务。
如果你期望任务运行在Standalone集群或者Yarn、Mesos集群上，请参考Spark官网的[Spark部署文档](http://spark.apache.org/docs/latest/cluster-overview.html)。

### Step 2: 下载 seatunnel

进入[seatunnel安装包下载页面](https://github.com/InterestingLab/seatunnel/releases/latest)，下载最新版`seatunnel-<version>.zip`

或者直接下载指定版本（以1.1.2为例）：

```
wget https://github.com/InterestingLab/seatunnel/releases/download/v1.1.2/seatunnel-1.1.2.zip -O seatunnel-1.1.2.zip
```

下载后，解压：

```
unzip seatunnel-<version>.zip
ln -s seatunnel-<version> seatunnel
```

### Step 3: 配置 seatunnel

编辑 `config/seatunnel-env.sh`, 指定必须环境配置如SPARK_HOME(Step 1 中Spark下载并解压后的目录)

编辑 `config/application.conf`, 它决定了seatunnel启动后，数据输入，处理，输出的方式和逻辑。

```
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

```

### Step 4: 启动netcat server用于发送数据

```
nc -l -p 9999
```


### Step 5: 启动seatunnel

```
cd seatunnel
./bin/start-seatunnel.sh --master local[4] --deploy-mode client --config ./config/application.conf

```

### Step 6: 在nc端输入

```
Hello World, Gary
```
seatunnel日志打印出:

```
+-----------------+-----------+----+
|raw_message      |msg        |name|
+-----------------+-----------+----+
|Hello World, Gary|Hello World|Gary|
+-----------------+-----------+----+
```


### 总结

seatunnel简单易用，还有更丰富的数据处理功能等待被发现。本文展示的数据处理案例，
无需任何代码、编译、打包，比官方的[Quick Example](https://spark.apache.org/docs/latest/streaming-programming-guide.html#a-quick-example)更简单。


---

如果想了解更多的seatunnel配置示例可参见：

[配置示例1 : Streaming 流式计算](https://github.com/InterestingLab/seatunnel/blob/master/config/streaming.conf.template)

以上配置为默认【流式处理配置模版】，可直接运行，命令如下：

```
cd seatunnel
./bin/start-seatunnel.sh --master local[4] --deploy-mode client --config ./config/streaming.conf.template

```

[配置示例2 : Batch 离线批处理](https://github.com/InterestingLab/seatunnel/blob/master/config/batch.conf.template)

以上配置为默认【离线批处理配置模版】，可直接运行，命令如下：

```
cd seatunnel
./bin/start-seatunnel.sh --master local[4] --deploy-mode client --config ./config/batch.conf.template

```

[配置示例3 : Structured Streaming 流式处理](https://github.com/InterestingLab/seatunnel/blob/master/config/structuredstreaming.conf.template)

以上配置为默认【Structured Streaming 配置模版】，需配置Kafka输入源后运行，命令如下：

```
cd seatunnel
./bin/start-seatunnel-structured-streaming.sh --master local[4] --deploy-mode client --config ./config/batch.conf.template

```
