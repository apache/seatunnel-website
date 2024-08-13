---

sidebar_position: 2
-------------------

# SeaTunnel Engine快速开始

## 步骤 1: 部署SeaTunnel及连接器

在开始前，请确保您已经按照[部署](deployment.md)中的描述下载并部署了SeaTunnel。

## 步骤 2: 添加作业配置文件来定义作业

编辑`config/v2.batch.config.template`，它决定了当seatunnel启动后数据输入、处理和输出的方式及逻辑。
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

## 步骤 3: 运行SeaTunnel应用程序

您可以通过以下命令启动应用程序：

:::tip

从2.3.1版本开始，seatunnel.sh中的-e参数被废弃，请改用-m参数。

:::

```shell
cd "apache-seatunnel-${version}"
./bin/seatunnel.sh --config ./config/v2.batch.config.template -m local

```

**查看输出**: 当您运行该命令时，您可以在控制台中看到它的输出。您可以认为这是命令运行成功或失败的标志。

SeaTunnel控制台将会打印一些如下日志信息:

```shell
2022-12-19 11:01:45,417 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - output rowType: name<STRING>, age<INT>
2022-12-19 11:01:46,489 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=1:  SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: CpiOd, 8520946
2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=2: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: eQqTs, 1256802974
2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=3: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: UsRgO, 2053193072
2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=4: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: jDQJj, 1993016602
2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=5: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: rqdKp, 1392682764
2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=6: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: wCoWN, 986999925
2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=7: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: qomTU, 72775247
2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=8: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: jcqXR, 1074529204
2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=9: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: AkWIO, 1961723427
2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=10: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: hBoib, 929089763
2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=11: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: GSvzm, 827085798
2022-12-19 11:01:46,491 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=12: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: NNAYI, 94307133
2022-12-19 11:01:46,491 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=13: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: EexFl, 1823689599
2022-12-19 11:01:46,491 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=14: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: CBXUb, 869582787
2022-12-19 11:01:46,491 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=15: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: Wbxtm, 1469371353
2022-12-19 11:01:46,491 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=16: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: mIJDt, 995616438
```

## 扩展示例：从 MySQL 到 Doris 批处理模式

## 步骤1：下载插件
首先放入所需插件`connector-jdbc`、`connector-doris`到`${SEATUNNEL_HOME}/connectors/`目录下，您需要执行以下命令来安装连接器并且需要在`${SEATUNNEL_HOME}/config/plugin_config`目录下加入插件名称：(当然，您也可以从 [Apache Maven Repository](https://repo.maven.apache.org/maven2/org/apache/seatunnel/) 手动下载连接器，然后将其移动至`connectors/seatunnel`目录下)。

```bash
sh bin/install-plugin.sh
```

## 步骤2：放入 MySQL 驱动 

您需要下载 [jdbc driver jar package](https://mvnrepository.com/artifact/mysql/mysql-connector-java) 驱动，并放置在 `${SEATUNNEL_HOME}/lib/`目录下

## 步骤3：添加作业配置文件来定义作业

```bash
cd seatunnel/job/

vim st.conf

env {
  parallelism = 2
  job.mode = "BATCH"
}
source {
    Jdbc {
        url = "jdbc:mysql://localhost:3306/test"
        driver = "com.mysql.cj.jdbc.Driver"
        connection_check_timeout_sec = 100
        user = "user"
        password = "pwd"
        table_path = "test.table_name"
        query = "select  * from test.table_name"
    }
}

sink {
   Doris {
          fenodes = "doris_ip:8030"
          username = "user"
          password = "pwd"
          database = "test_db"
          table = "table_name"
          sink.enable-2pc = "true"
          sink.label-prefix = "test-cdc"
          doris.config = {
            format = "json"
            read_json_by_line="true"
          }
      }
}
```

关于配置的更多信息请查看[配置的基本概念](../../concept/config.md)

## 步骤 4: 运行SeaTunnel应用程序

您可以通过以下命令启动应用程序：

:::tip

从2.3.1版本开始，seatunnel.sh中的-e参数被废弃，请改用-m参数。

:::

```shell
cd seatunnel/
./bin/seatunnel.sh --config ./job/st.conf -m local

```

**查看输出**: 当您运行该命令时，您可以在控制台中看到它的输出。您可以认为这是命令运行成功或失败的标志。

SeaTunnel控制台将会打印一些如下日志信息:

```shell
***********************************************
           Job Statistic Information
***********************************************
Start Time                : 2024-08-13 10:21:49
End Time                  : 2024-08-13 10:21:53
Total Time(s)             :                   4
Total Read Count          :                1000
Total Write Count         :                1000
Total Failed Count        :                   0
***********************************************
```

:::tip

如果您先优化自己的作业，请查看[Source-MySQL](../../../../../../versioned_docs/version-2.3.6/connector-v2/source/Mysql.md) 和 [Sink-Doris](../../../../../../versioned_docs/version-2.3.6/connector-v2/sink/Doris.md)

:::


## 此外

现在,您已经快速浏览了SeaTunnel，可以通过[连接器](../../../../../../versioned_docs/version-2.3.6/connector-v2/)来找到SeaTunnel所支持的所有sources和sinks。
如果您想要了解更多关于信息，请参阅[SeaTunnel引擎](../../seatunnel-engine/about.md). 在这里你将了解如何部署SeaTunnel Engine的集群模式以及如何在集群模式下使用。
