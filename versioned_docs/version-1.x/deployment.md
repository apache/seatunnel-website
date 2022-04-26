# Deploy and run

> Seatunnel depends on Java operating environment and Spark. For detailed seatunnel installation steps, please refer to [Installing seatunnel](/zh-cn/v1/installation)

The following highlights how the different platforms work:

### Run seatunnel locally in local mode

````
./bin/start-seatunnel.sh --master local[4] --deploy-mode client --config ./config/application.conf
````

### Running seatunnel on Spark Standalone cluster

````
# client mode
./bin/start-seatunnel.sh --master spark://207.184.161.138:7077 --deploy-mode client --config ./config/application.conf

# cluster mode
./bin/start-seatunnel.sh --master spark://207.184.161.138:7077 --deploy-mode cluster --config ./config/application.conf
````

### Running seatunnel on Yarn cluster

````
# client mode
./bin/start-seatunnel.sh --master yarn --deploy-mode client --config ./config/application.conf

# cluster mode
./bin/start-seatunnel.sh --master yarn --deploy-mode cluster --config ./config/application.conf
````

### Running seatunnel on Mesos

````
# cluster mode
./bin/start-seatunnel.sh --master mesos://207.184.161.138:7077 --deploy-mode cluster --config ./config/application.conf
````

---

The `master`, `deploy-mode` parameters of start-seatunnel.sh have the same meaning as Spark `master`, `deploy-mode`,
Reference: [Spark Submitting Applications](http://spark.apache.org/docs/latest/submitting-applications.html)

If you want to specify the resource size occupied by seatunnel when running, or other Spark parameters, you can specify it in the configuration file specified by `--config`:

````
spark {
  spark.executor.instances = 2
  spark.executor.cores = 1
  spark.executor.memory = "1g"
  ...
}
...

````

For how to configure seatunnel, see [seatunnel configuration](/zh-cn/v1/configuration/base)