## Input plugin : Elasticsearch [Static]

* Author: InterestingLab
* Homepage: https://interestinglab.github.io/seatunnel-docs
* Version: 1.3.2

### Description

从 Elasticsearch 中读取数据

### Options

| name | type | required | default value |
| --- | --- | --- | --- |
| [hosts](#hosts-array) | array | yes | - |
| [index](#index-string) | string | yes |  |
| [es](#es-string) | string | no |  |
| [common-options](#common-options-string)| string | yes | - |


##### hosts [array]

ElasticSearch 集群地址，格式为host:port，允许指定多个host。如 \["host1:9200", "host2:9200"]。


##### index [string]

ElasticSearch index名称，支持 `*` 模糊匹配


##### es.* [string]

用户还可以指定多个非必须参数，详细的参数列表见[Elasticsearch支持的参数](https://www.elastic.co/guide/en/elasticsearch/hadoop/current/configuration.html#cfg-mapping).

如指定 `es.read.metadata` 的方式是: `es.read.metadata = true`。如果不指定这些非必须参数，它们将使用官方文档给出的默认值。

### Tips

在使用 ElasticSearch插件时,可以配置参数 `es.input.max.docs.per.partition`，用以最大化 seatunnel 读取 es 的效率，该参数用于决定任务的分区个数：

> 分区数 = 总数据条数 / es.input.max.docs.per.partition

通过增大任务分区数以支持更高的并发能力，根据实践优化这个参数的设置，读取ElasticSearch的效率可以提升3-10倍。


如上所述 `es.input.max.docs.per.partition`，支持用户自行根据实际的数据量进行调整，否则分区数为 ElasticSearch 索引 Shard 的个数。

##### common options [string]

`Input` 插件通用参数，详情参照 [Input Plugin](/zh-cn/v1/configuration/input-plugin)


### Examples

```
elasticsearch {
    hosts = ["localhost:9200"]
    index = "seatunnel-20190424"
    result_table_name = "my_dataset"
  }
```


```
elasticsearch {
    hosts = ["localhost:9200"]
    index = "seatunnel-*"
    es.read.field.include = "name, age"
    resulttable_name = "my_dataset"
  }
```

> 匹配所有以 `seatunnel-` 开头的索引， 并且仅仅读取 `name`和 `age` 两个字段。
