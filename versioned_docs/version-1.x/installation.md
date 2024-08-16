# Download and install

## download

### Community Edition (Community)

https://github.com/InterestingLab/seatunnel/releases

## Environment preparation

### Ready for JDK1.8

Seatunnel relies on the JDK1.8 operating environment.

### Ready for Spark

Seatunnel depends on Spark. Before installing seatunnel, you need to prepare Spark.
Please [download Spark](http://spark.apache.org/downloads.html) first, and select Spark version >= 2.x.x. After downloading and decompressing, you can submit tasks in Spark deploy-mode = local mode without any configuration.
If you expect the task to run on a Standalone cluster or a Yarn or Mesos cluster, please refer to the Spark official website configuration documentation.

### Install seatunnel

Download the seatunnel installation package and unzip it, here is the community version as an example:

````
wget https://github.com/InterestingLab/seatunnel/releases/download/v<version>/seatunnel-<version>.zip -O seatunnel-<version>.zip
unzip seatunnel-<version>.zip
ln -s seatunnel-<version> seatunnel
````

There are no complicated installation and configuration steps, please refer to [Quick Start](/zh-cn/v1/quick-start.md) for the usage of seatunnel, and [Configuration](/zh-cn/v1/configuration/base for configuration ).

If you want to deploy seatunnel to run on Spark Standalone/Yarn/Mesos cluster, please refer to [seatunnel deployment](/zh-cn/v1/deployment)