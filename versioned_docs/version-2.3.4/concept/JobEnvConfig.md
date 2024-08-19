# JobEnvConfig

This document describes env configuration information, the common parameters can be used in all engines. In order to better distinguish between engine parameters, the additional parameters of other engine need to carry a prefix.
In flink engine, we use `flink.` as the prefix. In the spark engine, we do not use any prefixes to modify parameters, because the official spark parameters themselves start with `spark.`

## Common Parameter

The following configuration parameters are common to all engines

### job.name

This parameter configures the task name.

### jars

Third-party packages can be loaded via `jars`, like `jars="file://local/jar1.jar;file://local/jar2.jar"`

### job.mode

You can configure whether the task is in batch mode or stream mode through `job.mode`, like `job.mode = "BATCH"` or `job.mode = "STREAMING"`

### checkpoint.interval

Gets the interval in which checkpoints are periodically scheduled.

In `STREAMING` mode, checkpoints is required, if you do not set it, it will be obtained from the application configuration file `seatunnel.yaml`. In `BATCH` mode, you can disable checkpoints by not setting this parameter.

### parallelism

This parameter configures the parallelism of source and sink.

### shade.identifier

Specify the method of encryption, if you didn't have the requirement for encrypting or decrypting config files, this option can be ignored.

For more details, you can refer to the documentation [config-encryption-decryption](../connector-v2/Config-Encryption-Decryption.md)

## Flink Engine Parameter

Here are some SeaTunnel parameter names corresponding to the names in Flink, not all of them, please refer to the official [flink documentation](https://flink.apache.org/) for more.

|    Flink Configuration Name     |     SeaTunnel Configuration Name      |
|---------------------------------|---------------------------------------|
| pipeline.max-parallelism        | flink.pipeline.max-parallelism        |
| execution.checkpointing.mode    | flink.execution.checkpointing.mode    |
| execution.checkpointing.timeout | flink.execution.checkpointing.timeout |
| ...                             | ...                                   |

## Spark Engine Parameter

Because spark configuration items have not been modified, they are not listed here, please refer to the official [spark documentation](https://spark.apache.org/).
