## Input plugin : Redis

* Author: InterestingLab
* Homepage: https://github.com/InterestingLab/seatunnel
* Version: 1.1.0

### Description

从Redis中读取数据.

### Options

| name | type | required | default value |
| --- | --- | --- | --- |
| [host](#host-string) | string | yes | - |
| [port](#port-int) | int | no | 6379 |
| [key_pattern](#key_pattern-string) | string | yes | - |
| [partition](#partition-int) | int | no | 3 |
| [db_num](#db_num-int) | int | no | 0 |
| [auth](#auth-string) | string | no | - |
| [common-options](#common-options-string)| string | yes | - |


##### host [string]

Redis服务器地址

##### port [int]

Redis服务端口, 默认6379

##### key_pattern [string]

Redis Key, 支持模糊匹配

##### partition [int]

Redis分片数量. 默认为3

##### db_num [int]

Redis数据库索引标识. 默认连接到db0. 

##### auth [string]

redis 鉴权密码

##### common options [string]

`Input` 插件通用参数，详情参照 [Input Plugin](/zh-cn/v1/configuration/input-plugin)


### Example

```
Redis {
    host = "192.168.1.100"
    port = 6379
    key_pattern = "*keys*"
    partition = 20
    db_num = 2
    result_table_name = "reids_result_table"
}
```

> 返回的table中为一个两个字段均为string的数据表

| raw_key | raw_message |
| --- | --- |
| [keys](#keys) | xxx |
| [my_keys](#my_keys) | xxx |
| [keys_mine](#keys_mine) | xxx |
