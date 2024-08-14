## Input plugin : RedisStream [Streaming]

* Author: InterestingLab
* Homepage: https://interestinglab.github.io/seatunnel-docs
* Version: 1.1.0

### Description

Read data from Redis.

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

redis cluster server host

##### prefKey [string]

redis key prefix , Splicing mode: prefKey + ':' + key

##### queue [string]

redis queue name , Data stored to queue

##### password [string]

redis password

##### maxTotal [number]

redis maxTotal config

##### maxIdle [number]

redis maxIdle config

##### maxWaitMillis [number]

redis maxWaitMillis config

##### connectionTimeout [number]

redis connectionTimeout config

##### soTimeout [number]

redis soTimeout config

##### maxAttempts [number]

redis maxAttempts config

### Example

```
RedisStream {
    host = "127.0.0.1:7000,127.0.0.1:7001,127.0.0.1:7002"
    prefKey = "api"
    queue = "test"
    password = "root"
}
```
