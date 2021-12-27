## Filter plugin : UrlEncode

* Author: InterestingLab
* Homepage: https://interestinglab.github.io/seatunnel-docs
* Version: 1.5.0

### Description

UrlEncode

### Options

| name | type | required | default value |
| --- | --- | --- | --- |
| [source_field](#source_field-string) | string | no | raw_message |
| [target_field](#target_field-string)| string | no | - |


##### source_field [string]

需要进行 `UrlEncode` 处理的字段。


##### target_field [string]

存储 `UrlEncode` 处理结果的目标字段，若不配置则与 `source_field` 保持一致。

##### common options [string]

`Filter` 插件通用参数，详情参照 [Filter Plugin](/zh-cn/v1/configuration/filter-plugin)


### Example

```
urlencode {
    source_field = "url"
}
```

`UrlEncode` 方法已经注册为 **UDF**，可以直接在 `SQL` 插件中使用

```
sql {
    sql = "select urlencode(url) as url from view_1"
}
```
