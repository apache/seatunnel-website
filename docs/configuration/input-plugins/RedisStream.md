## Input plugin : RedisStream [Streaming]

* Author: InterestingLab
* Homepage: https://interestinglab.github.io/seatunnel-docs
* Version: 1.1.0

### Description

Redis集群作为数据源,以队列作为数据输入源
> 例如：logstash支持Redis集群方法资源页-》https://github.com/elastic/logstash/issues/12099

### Options

| name | type | required | default value |
| --- | --- | --- | --- |
| [host](#host-string) | string | yes | - |
| [prefKey](#prefKey-string) | string | yes | - |
| [queue](#queue-string) | string | yes | - |
| [password](#password-string) | string | no | - |
| [maxTotal](#maxTotal-number) | number | no | 200 |
| [maxIdle](#maxIdle-number) | number | no | 200 |
| [maxWaitMillis](#maxWaitMillis-number) | number | no | 2000 |
| [connectionTimeout](#connectionTimeout-number) | number | no | 5000 |
| [soTimeout](#soTimeout-number) | number | no | 5000 |
| [maxAttempts](#maxAttempts-number) | number | no | 5 |

##### host [string]

redis集群地址:多个以逗号分隔 
> 例子：127.0.0.1:7000,127.0.0.1:7001,127.0.0.1:7002

##### prefKey [string]

redis-queue业务前缀, 前缀规则: prefKey + ':' + queue
> prefKey为空字符串，则实际队列名称为 queue

##### queue [string]

redis队列名称 , 数据存储队列
> 例子：队列实际名称为 prefKey:queue

##### password [string]

redis密码，空字符串为无密码

##### maxTotal [number]

redis连接池的最大数据库连接数

##### maxIdle [number]

redis最大空闲数

##### maxWaitMillis [number]

redis最大建立连接等待时间

##### connectionTimeout [number]

redis连接超时时间

##### soTimeout [number]

redis读取数据超时时间

##### maxAttempts [number]

redis最大尝试次数

##### common options [string]

`Input` 插件通用参数，详情参照 [Input Plugin](/zh-cn/v1/configuration/input-plugin)

### Example

```
RedisStream {
    host = "127.0.0.1:7000,127.0.0.1:7001,127.0.0.1:7002"
    prefKey = ""
    queue = "test"
    password = "root"
}
```
