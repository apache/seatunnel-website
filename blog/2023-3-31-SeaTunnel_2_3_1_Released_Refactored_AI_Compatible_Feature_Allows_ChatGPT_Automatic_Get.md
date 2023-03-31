# SeaTunnel 2.3.1 is released! The refactored AI Compatible feature allows ChatGPT to automatically generate Connector code



>*SeaTunnel version 2.3.1 was released recently. This is a high-profile release with many important function updates and optimizations.*
>*At the level of programming user experience, the new version improves the stability of SeaTunnel Zeta and CI/CD; at the level of connectors, the new version implements 7+ new connectors and fixes existing commonly used connectors bugs, and improved security. The community refactored multiple underlying base classes and added an important feature, AI Compatible. With the optimized API, users can use ChatGPT 4.0 to quickly build the SaaS Connector they need.*
# Major Feature update

## 01 SeaTunnel Zeta

The first version of the data integration engine-SeaTunnel Zeta is introduced in the SeaTunnel 2.3.0 release and has received feedback from numerous community users. In SeaTunnel version 2.3.1, we have fixed all the bugs reported by users, optimized the use of memory and threads, and greatly improved the stability of Zeta.

In version 2.3.1, the community also added several new Zeta features, including a dedicated JVM parameter configuration file, client output of job monitoring information, Rest API for Zeta cluster information and job information, etc.

At the checkpoint level, version 2.3.1 Zeta supports using OSS as checkpoint storage. It also supports savepoint running jobs and resuming jobs from savepoints.

In addition, version 2.3.1 also adds a set of Zeta’s Rest API, which can be used to obtain the list of jobs running on Zeta, the status information of jobs, and the monitoring indicators of Zeta cluster nodes. For specific usage methods, please refer to **https:/ /seatunnel.apache.org/docs/seatunnel-engine/rest-api/**

## 02 AI Compatible

In SeaTunnel 2.3.1, the HTTP interface and related APIs are reconstructed, and the SaaS Connector-related API and Connector construction process are simplified according to the existing xGPT level capabilities so that ChatGPT 4.0 can directly generate SaaS Connectors and quickly generate various SaaS Connector interfaces. Under normal circumstances, the results obtained by this method are 95% similar to the code written by open-source contributors (see appendix).

Of course, because ChatGPT4.0 will be updated in October 2021, it is necessary to provide some latest vectorized documents for the latest SaaS interface adaptation to have the latest interface adaptation. However, this refactored API and code framework allows users to generate Connectors more quickly and contribute to the open-source community, making the SeaTunnel interface more powerful.

# Connector

## 01 7+ new connectors

While fixing the bugs of known connectors and optimizing the connectors, the community has added 7 new connectors including SAP HANA, Persistiq, TDEngine, SelectDB Cloud, Hbase, FieldMapper Transform, and SimpleSQL Transform.

## 02 Reimplement SQL Transform

Since the previous SQL Transform connector was defined based on Flink SQL and Spark SQL, SQL Transform cannot adapt to the execution of multiple engines, so we removed the SQL Transform function in version 2.3.0. In version 2.3.1, we reimplemented SQL Transform. SQL Transform is an API that does not depend on a task-specific execution engine and can perfectly run on three different engines: Flink/Spark/Zeta. Special thanks to contributor Ma Chengyuan (GitHub ID: rewerma) for leading and contributing this important Feature.

For the functions already supported by SQL Transform, please refer to [https://seatunnel.apache.org/docs/2.3.1/transform-v2/sql-functions](https://seatunnel.apache.org/docs/2.3.1/transform-v2/sql-functions)

## 03 New SQL Server CDC

At the CDC connector level, the community has newly added a SQL Server CDC connector, and made a lot of optimizations to MySQL CDC, improving the stability of MySQL CDC.

## 04 Added CDC connector to output debezium-json format function

In addition, version 2.3.1 also added the function of the CDC connector to output debezium-json format. Users can use MySQL CDC to read binlog and output data in debezium-json format to Kafka, so that users can create new synchronization tasks to read The data in debezium-json format in Kafka is synchronized to the target data source, or you can directly write other programs to read the data in debezium-json format in Kafka to perform some indicator calculations.

# Safety

Before version 2.3.1, users need to configure the database username, password, and other information in plain text in the config file, which may cause some security problems. In version 2.3.1, we added the configuration file encryption function, and users can fill in the encrypted database username, password, and other information in the config file. When the job is running, SeaTunnel will decrypt the content in the config file based on the default encryption and decryption algorithm. At the same time, the encryption function provides SPI, by which users can customize the parameter list of encryption and decryption and the algorithm of encryption and decryption based on their own needs.

For how to use this function, please refer to [https://seatunnel.apache.org/docs/2.3.1/connector-v2/Config-Encryption-Decryption](https://seatunnel.apache.org/docs/2.3.1/connector-v2/Config-Encryption-Decryption)

# Third-party engine support

SeaTunnel version 2.3.1 supports Spark version 3.3, as well as Flink 1.14.6, Flink 1.15, Flink 1.16, and other versions, basically covering the mainstream versions of Spark and Flink.

# Client

The new version introduces an SPI for job configuration. Previously, only hocon json configuration files were supported. Now SPI is opened to the users to customize the format of job configuration files to meet different business system integration requirements.

# Optimization

SeaTunnel 2.1.3 version has made many important optimizations, including changes in core components, connector components, CI/CD, Zeta(ST-Engine), and E2E components, involving updating new functions, improving existing functions, and optimizing tests and deployment processes. Some notable changes include adding parallelism and column projection interfaces in Core API, introducing MySQL-CDC source factory in Connector-V2 and supporting only-once semantics for JDBC source connectors, improving CI/CD process and stability for E2E In Zeta (ST-Engine), the logic of restarting the job when all nodes are down is added, and the timeout period for writing data is configurable.

For a detailed list, see the Release Note [Improve] section.

# Document

In addition, the new version also has a series of updates to the documentation, including adding transform v2 documentation and some hints, as well as improving the documentation of various connectors.

See the Release Note [Docs] section for details.

Document address: [https://seatunnel.apache.org/versions/](https://seatunnel.apache.org/versions/)

# Release Note

[https://github.com/apache/incubator-seatunnel/blob/2.3.1/release-note.md](https://github.com/apache/incubator-seatunnel/blob/2.3.1/release-note.md)

* Project address: [https://seatunnel.apache.org/](https://seatunnel.apache.org/)
* Download address: [https://seatunnel.apache.org/download](https://seatunnel.apache.org/download)
# Acknowledgement to the contributors

![contributors](/image/202303310331/contributors.png)

