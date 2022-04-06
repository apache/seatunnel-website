# go deep into seatunnel

## seatunnel strives to improve many pain points

In addition to greatly simplifying the difficulty of distributed data processing, seatunnel does its best to solve the problems you may encounter:

* Data loss and duplication

For example, the Kafka Input of seatunnel is realized through the Kafka Direct API, and the exactly once operation is realized through the checkpoint mechanism or the support of the Output that supports idempotent writing. In addition, the project code of seatunnel has been thoroughly tested to minimize accidental data discarding caused by abnormal data processing.

* Task stacking and delays

In the online environment, there are a large number of Spark tasks or the Spark running environment of a single stage containing many tasks. We have encountered many times that the processing time of a single task is long, which slows down the entire batch. The function of Spark speculative execution is enabled by default in seatunnel. The speculative execution function will find the slow task and start a new task, and use the task completed first as the settlement result.

* low throughput

In the code implementation of seatunnel, a number of advanced features of Spark that have been proven in practice to improve processing performance are directly utilized, such as:

(1) In the core process code, use Dataset, Spark SQL programming API, and effectively utilize Spark's catalyst optimizer.

(2) Support the use of broadcast variable in plug-in implementation, which can optimize application scenarios such as IP library parsing and database link maintenance.

(3) In the implementation code of the plugin, performance is always our priority.

* The application to the production environment has a long cycle

Using seatunnel can be used out of the box, and has simplified installation, deployment, and startup in many ways; the plug-in system is easy to configure and deploy, and developers can quickly integrate specific business logic in seatunnel.

* Lack of application health monitoring

(1) Seatunnel has its own monitoring tool `Guardian`, which is a sub-project of seatunnel. It can monitor whether seatunnel is alive, and can automatically pull up seatunnel instances according to the configuration; it can monitor whether there is accumulation and delay in the streaming batch when it is running, and send an alarm .

(2) The time-consuming statistics of each stage of data processing will be added to the next release version to facilitate performance optimization.