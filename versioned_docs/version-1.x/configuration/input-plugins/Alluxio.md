## Input plugin : Alluxio

* Author: InterestingLab
* Homepage: https://interestinglab.github.io/seatunnel-docs
* Version: 1.5.0

### Description

Read raw data from Alluxio.

### Options

| name | type | required | default value |
| --- | --- | --- | --- |
| [path](#path-string) | string | yes | - |

##### path [string]

File path on Alluxio cluster.

### Note 
if use alluxio with zookeeper, please add below in start-seatunnel.sh 

```
driverJavaOpts="-Dalluxio.user.file.writetype.default=CACHE_THROUGH -Dalluxio.zookeeper.address=your.zookeeper.address:zookeeper.port -Dalluxio.zookeeper.enabled=true"
executorJavaOpts="-Dalluxio.user.file.writetype.default=CACHE_THROUGH -Dalluxio.zookeeper.address=your.zookeeper.address:zookeeper.port -Dalluxio.zookeeper.enabled=true"
```

or you can also add below in spark{} in seatunnel configuration after 1.5.0 

```
spark.driverJavaOpts="-Dalluxio.user.file.writetype.default=CACHE_THROUGH -Dalluxio.zookeeper.address=your.zookeeper.address:zookeeper.port -Dalluxio.zookeeper.enabled=true"
spark.executorJavaOpts="-Dalluxio.user.file.writetype.default=CACHE_THROUGH -Dalluxio.zookeeper.address=your.zookeeper.address:zookeeper.port -Dalluxio.zookeeper.enabled=true"
```

### Example

```
alluxio {
    path = "alluxio:///access.log"
}
```

or you can specify alluxio name service:

```
alluxio {
    path = "alluxio://m2:8022/access.log"
}
```
