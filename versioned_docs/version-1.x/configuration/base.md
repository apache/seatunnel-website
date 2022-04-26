# General configuration

## Core idea

* Row is a piece of data in the logical sense of seatunnel, and is the basic unit of data processing. When Filter processes data, all data will be mapped to Row.

* Field is a field of Row. Row can contain nested levels of fields.

* raw_message refers to the `raw_message` field in the Row for the data entered from the input.

* __root__ refers to the same field level as the top-level field of Row, and is often used to specify the storage location (top level field) of new fields generated during data processing in Row.


---

## config file

A complete seatunnel configuration includes `spark`, `input`, `filter`, `output`, namely:

````
spark {
    ...
}

input {
    ...
}

filter {
    ...
}

output {
    ...
}

````

* `spark` is spark related configuration,

Configurable spark parameters see:
[Spark Configuration](https://spark.apache.org/docs/latest/configuration.html#available-properties),
Among them, the two parameters of master and deploy-mode cannot be configured here and need to be specified in the seatunnel startup script.

* `input` can configure any input plugin and its parameters, and the specific parameters vary with different input plugins.

* `filter` can configure any filter plugin and its parameters, and the specific parameters vary with different filter plugins.

Multiple plugins in the filter form a data processing pipeline in the configuration order, and the output of the previous filter is the input of the next filter.

* `output` can configure any output plugin and its parameters, and the specific parameters vary with different output plugins.

The data processed by `filter` will be sent to each plugin configured in `output`.


---

## Configuration file example

An example is as follows:

> In configuration, behavior comments beginning with `#`.

````
spark {
  # You can set spark configuration here
  # seatunnel defined streaming batch duration in seconds
  spark.streaming.batchDuration = 5

  # see available properties defined by spark: https://spark.apache.org/docs/latest/configuration.html#available-properties
  spark.app.name = "seatunnel"
  spark.executor.instances = 2
  spark.executor.cores = 1
  spark.executor.memory = "1g"
}

input {
  # This is an example input plugin **only for test and demonstrate the feature input plugin**
  fakestream {
    content = ["Hello World, InterestingLab"]
    rate = 1
  }


  # If you would like to get more information about how to configure seatunnel and see full list of input plugins,
  # please go to https://interestinglab.github.io/seatunnel-docs/#/en-us/v1/configuration/base
}

filter {
  split {
    fields = ["msg", "name"]
    delimiter = ","
  }

  # If you would like to get more information about how to configure seatunnel and see full list of filter plugins,
  # please go to https://interestinglab.github.io/seatunnel-docs/#/en-us/v1/configuration/base
}

output {
  stdout {}


  # If you would like to get more information about how to configure seatunnel and see full list of output plugins,
  # please go to https://interestinglab.github.io/seatunnel-docs/#/en-us/v1/configuration/base
}
````

For other configurations, please refer to:

[Configuration Example 1: Streaming Streaming Computing](https://github.com/InterestingLab/seatunnel/blob/master/config/streaming.conf.template)

[Configuration example 2: Batch offline batch](https://github.com/InterestingLab/seatunnel/blob/master/config/batch.conf.template)

[Configuration example 3: A flexible multi-data process processing](https://github.com/InterestingLab/seatunnel/blob/master/config/complex.conf.template)