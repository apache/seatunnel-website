## Input plugin : Hdfs [Static]

* Author: InterestingLab
* Homepage: https://interestinglab.github.io/seatunnel-docs
* Version: 1.1.0

### Description

从HDFS文件中读取数据。注意此插件与`HdfsStream`不同，它不是流式的。


### Options

| name | type | required | default value |
| --- | --- | --- | --- |
| [format](#format-string) | string | no | json |
| [options.*](#options-object) | object | no | - |
| [options.rowTag](#optionsrowTag-string) | string | no | - |
| [path](#path-string) | string | yes | - |
| [common-options](#common-options-string)| string | yes | - |

##### format [string]

从HDFS中读取文件的格式，目前支持`csv`、`json`、`parquet` 、`xml`、`orc`和 `text`.


##### options [object]

自定义参数，当`format = "xml"`时必须设置`optionss.rowTag`，配置XML格式数据的Tag，其他参数不是必填参数。


##### options.rowTag [string]

当 `format` 为 **xml** 必须设置 `optionss.rowTag`，配置XML格式数据的Tag


##### path [string]

Hadoop集群文件路径，以hdfs://开头

##### common options [string]

`Input` 插件通用参数，详情参照 [Input Plugin](/zh-cn/v1/configuration/input-plugin)



### Example

```
hdfs {
    path = "hdfs:///var/seatunnel-logs"
    result_table_name = "access_log"
    format = "json"
}
```

> 从HDFS中读取json文件，加载到seatunnel中待后续处理.


或者可以指定 hdfs name service:

```
hdfs {
    result_table_name = "access_log"
    path = "hdfs://m2:8022/seatunnel-logs/access.log"
}
```

读取XML格式的文件:

```
hdfs {
    result_table_name = "books"
    path = "hdfs://m2:8022/seatunnel-logs/books.xml"
    options.rowTag = "book"
    format = "xml"
}
```

读取CSV格式文件

```
hdfs {
    path = "hdfs://m2:8022/seatunnel-logs/books.csv"
    format = "csv"
    # 将第一列的header作为列名
    # 否则将以 _c0,_c1,_c2...依次命名
    options.header = "true"
    result_table_name = "books"
}
```
