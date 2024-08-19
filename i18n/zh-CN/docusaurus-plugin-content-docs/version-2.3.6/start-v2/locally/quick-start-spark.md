---

sidebar_position: 4
-------------------

# Spark引擎快速开始

## 步骤 1: 部署SeaTunnel及连接器

在开始前，请确保您已经按照[部署](deployment.md)中的描述下载并部署了SeaTunnel。

## 步骤 2: 部署并配置Spark

请先[下载Spark](https://spark.apache.org/downloads.html)(**需要版本 >= 2.4.0**)。 更多信息您可以查看[入门: Standalone模式](https://spark.apache.org/docs/latest/spark-standalone.html#installing-spark-standalone-to-a-cluster)

**配置SeaTunnel**: 修改`config/seatunnel-env.sh`中的设置,它是基于你的引擎在[部署](deployment.md)时的安装路径。
将`SPARK_HOME`修改为Spark的部署目录。

## 步骤 3: 添加作业配置文件来定义作业

编辑`config/v2.streaming.conf.template`，它决定了当SeaTunnel启动后数据输入、处理和输出的方式及逻辑。
下面是配置文件的示例，它与上面提到的示例应用程序相同。

```hocon
env {
  parallelism = 1
  job.mode = "BATCH"
}

source {
  FakeSource {
    result_table_name = "fake"
    row.num = 16
    schema = {
      fields {
        name = "string"
        age = "int"
      }
    }
  }
}

transform {
  FieldMapper {
    source_table_name = "fake"
    result_table_name = "fake1"
    field_mapper = {
      age = age
      name = new_name
    }
  }
}

sink {
  Console {
    source_table_name = "fake1"
  }
}

```

关于配置的更多信息请查看[配置的基本概念](../../concept/config.md)

## 步骤 4: 运行SeaTunnel应用程序

您可以通过以下命令启动应用程序：

Spark 2.4.x

```bash
cd "apache-seatunnel-${version}"
./bin/start-seatunnel-spark-2-connector-v2.sh \
--master local[4] \
--deploy-mode client \
--config ./config/v2.streaming.conf.template
```

Spark 3.x.x

```shell
cd "apache-seatunnel-${version}"
./bin/start-seatunnel-spark-3-connector-v2.sh \
--master local[4] \
--deploy-mode client \
--config ./config/v2.streaming.conf.template
```

**查看输出**: 当您运行该命令时，您可以在控制台中看到它的输出。您可以认为这是命令运行成功或失败的标志。

SeaTunnel控制台将会打印一些如下日志信息:

```shell
fields : name, age
types : STRING, INT
row=1 : elWaB, 1984352560
row=2 : uAtnp, 762961563
row=3 : TQEIB, 2042675010
row=4 : DcFjo, 593971283
row=5 : SenEb, 2099913608
row=6 : DHjkg, 1928005856
row=7 : eScCM, 526029657
row=8 : sgOeE, 600878991
row=9 : gwdvw, 1951126920
row=10 : nSiKE, 488708928
row=11 : xubpl, 1420202810
row=12 : rHZqb, 331185742
row=13 : rciGD, 1112878259
row=14 : qLhdI, 1457046294
row=15 : ZTkRx, 1240668386
row=16 : SGZCr, 94186144
```

## 此外

现在，您已经快速浏览了SeaTunnel使用Spark引擎的方式，可以通过在[连接器](/docs/category/connector-v2)中找到SeaTunnel所支持的所有source和sink。
如果您想要了解更多关于SeaTunnel运行在Spark上的信息，请参阅[基于Spark的SeaTunnel](../../../en/other-engine/spark.md)。

SeaTunnel有内置的`Zeta`引擎，它是作为SeaTunnel的默认引擎。您可以参考[快速开始](quick-start-seatunnel-engine.md)配置和运行数据同步作业。
