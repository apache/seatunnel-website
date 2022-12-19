---
slug: Apache IoTDB (Internet of Things Database) is a software system that integrates the collection
title: SeaTunnel supports IoTDB to implement IoT data synchronization
tags: [Meetup]
---
# SeaTunnel supports IoTDB to implement IoT data synchronization
![](/image/16714316310459/16714316482580.jpg)
> Apache IoTDB (Internet of Things Database) is a software system that integrates the collection, storage, management, and analysis of time series data of the Internet of Things, which can meet the needs of massive data storage, high-speed data reading, and complex data analysis in the field of Industrial Internet of Things. Currently, SeaTunnel already supports IoTDB Connector, realizing the connection of data synchronization scenarios in the IoT field.

> At the SeaTunnel community online meeting in October this year, SeaTunnel Committer Wang Hailin introduced the implementation process of SeaTunnel’s access to IoTDB, allowing users to have a deeper understanding of the operation method and principle of IoTDB data synchronization.

The topic I’m sharing today is using SeaTunnel to play around with data synchronization in IoTDB.

This session is divided into 6 subsections. Firstly, we will have an understanding of the basic concept of SeaTunnel, and on this basis, we will focus on the functional features of IoTDB Connector, then we will analyze the data read and write functions of IoTDB Connector and the parsing of the implementation, and finally, we will show some typical usage scenarios and cases to let you understand how to use Finally, we will show some typical usage scenarios and cases to understand how to use the IoTDB Connector to implement into production environments. The last point is the community’s next steps for the IoTDB Connector and guidance on how to get involved in contributing.

## Introduction to SeaTunnel basic concepts
This is the basic architecture of SeaTunnel, an engine built for data synchronization, with a set of abstract APIs for reading data from and writing to a variety of data sources.

![](/image/16714316310459/16714316839299.jpg)
The left-hand side briefly lists the Source scenarios, for example, we abstract the Source’s API, Type, and State, to read the data source, unifying the data types of the various data sources to the abstract type defined in it, and some state recovery and retention of the read location during the reading process.

This is an abstraction for Source, and we have done a similar abstraction for Sink, i.e. how data is written, and how the data type matches the real data source type, and how the state is restored and retained.

Based on these APIs, we will have a translation layer to translate these APIs to the corresponding execution engine. SeaTunnel currently supports three execution engines, Spark, Flink, and our own execution engine, SeaTunnel Engine, which will be released soon.

This is roughly what SeaTunnel does, SeaTunnel relies on Source and Sink to read and write data for data synchronization, we call them Connectors. The Connector consists of a Source and a Sink.

![](/image/16714316310459/16714316928812.jpg)
From the diagram above we see the different data sources, Source is responsible for reading data from the various data sources and transforming it into SeaTunnelRow abstraction layer and Type to form the abstraction layer, Sink is responsible for pulling data from the abstraction layer and writing it to the concrete data store to transform it into the store concrete format.

The combination of Source + Abstraction Layer + Sink enables the synchronization of data between multiple heterogeneous data sources.

I’ll use a simple example below to illustrate how SeaTunnel’s Source and Sink work.

![](/image/16714316310459/16714317022389.jpg)

![](/image/16714316310459/16714317067444.jpg)
We can specify the number of Sources, Sink configuration file combinations through the configuration file The commands in the toolkit provided by SeaTunnel take the configuration file with them and when executed enable data handling.

![](/image/16714316310459/16714317166018.jpg)
![](/image/16714316310459/16714317203806.jpg)
![](/image/16714316310459/16714317262218.jpg)
This is the Connector ecosystem that is currently supported by SeaTunnel, such as the data sources supported by JBDC, HDFS, Hive, Pulsar, message queues, etc. are currently supported.

The list in the picture is not exhaustive of the Connectors supported by SeaTunnel. Under the GitHub SeaTunnel project, you can see the Plugins directory, where supported Connector plugins are constantly being added and where you can see the latest access in real-time.

## IoTDB Connector Features
Below is information about access to the IoTDB Connector.

Firstly, we would like to introduce the functional features of IoTDB, the IoTDB Connector integrated with SeaTunnel, and what exactly it supports for your reference.

## Source Features
![](/image/16714316310459/16714317512435.jpg)
Firstly, there are the typical usage scenarios supported by Source, such as bulk reading of devices, field projection, data type mapping, parallel reading, etc.

As you can see above, IoTDB supports all features except once, exactly once and stream mode, such as batch reads, IoTDB has a SQL syntax similar to group by device, which allows you to read data from multiple devices in a single batch. For basic data type projection, the SQL in IoTDB will take time by default when looking up any metric, or group by the device will take the device column, and we also support projection onto SeaTunnel columns by default.

The only data type not supported is Victor, all others are supported.

For the parallel read piece, the IoTDB data is actually timestamped and we use timestamped ranges to achieve parallel reads.

The recovery of the state, since we have divided the time range read into different splits, can be done based on the Split location information.

## Sink functional features
![](/image/16714316310459/16714317679569.jpg)

The diagram above shows the features already supported by SeaTunnel. Regarding metadata extraction, we support the extraction of metadata such as measurement, device, etc. from SeaTunnelRow and the extraction or use of current processing time from SeaTunnelRow. Batch commits and exception retries are also supported.
## IoTDB data reading analysis
Next, we analyze the implementation and support for data reading.
## Data type mapping
The first is the data type mapping, which actually reads the IoTDB data type to SeaTunnel, so it has to be converted to the SeaTunnel data type.
![](/image/16714316310459/16714317930593.jpg)
The BOOLEAN, INT32, INT64, etc. listed here all have corresponding SeaTunnel data types. INT32 can be mapped according to the read type on the SeaTunnel, or to TINYINT, SMALLINT, or INT when the range of values is small.

The Vector type is not currently supported.

![](/image/16714316310459/16714318216373.jpg)
This is the corresponding example code showing how the mapping is done where the type conversion is done.

## Field projection

The other is the field projection when reading, we can automatically map Time fields when reading IoTDB data, or we can choose to map some of the data to SeaTunnel, such as TIMESTAMP, or BIGINT.

![](/image/16714316310459/16714318381313.jpg)
The SQL extraction of column codes allows you to extract only some of the columns you need, and when used on SeaTunnel, you can specify the name, type, etc. of the column after it is mapped to SeaTunnel via fields. The final result of the data read on SeaTunnel is shown in the figure above.

![](/image/16714316310459/16714318550071.jpg)

We have just seen that we do not have the time column in the SQL, but the actual result is that there is this column, so we support the projection of the time column field, the time column can actually be projected into different data types, the user can convert according to their needs. The diagram above shows the implementation logic.

## Batch read Device
This is a common requirement, as we are likely to synchronize data in large batches with the same data structure.

![](/image/16714316310459/16714318796196.jpg)

SeaTunnel supports the align-by-device syntax so that device columns can also be projected onto the SeaTunnelRow

![](/image/16714316310459/16714318873362.jpg)
Assuming there is a table in IoTDB, we project the device column onto SeaTunnel by making it data as well through syntax. After configuring the device name column and specifying the data type, we end up reading the data on SeaTunnel in the format shown above, containing the Time, device column, and the actual data value. This makes it possible to read data from the same device in bulk.

## Parallel reading
The other is a parallel read.

* Split
We have scoped the table by the Time column and if we are reading in parallel we may want to scope the table to allow parallel threads/processes to read a specific range of data. By configuring the three parameters, the end result will be a query SQL, where the original SQL is divided into different splits with query conditions to achieve the actual read SQL.

* Allocate Split to the reader
Once the split is done, there is an allocation logic to follow in order to distribute it to each parallel reader.

![](/image/16714316310459/16714319281280.jpg)

This logic is based on the ID of the split to the reader, which may be more random, or more uniform if the ID of the split is more hashed, depending on the Connector.

![](/image/16714316310459/16714319372730.jpg)

The result achieved is shown in the picture.

# Status recovery

There is also state recovery involved when reading because if the task is large, the reading will take longer, and if there is an error or exception in the middle, you have to consider how to recover the state from the point where the error occurred, and then read it again afterward.

![](/image/16714316310459/16714319281280.jpg)
![](/image/16714316310459/16714319569097.jpg)
![](/image/16714316310459/16714319599521.jpg)

SeaTunnel’s state recovery is mainly through the reader storing the unread Split information into the state, and then the engine will periodically take a snapshot of the state when reading so that we can restore the last snapshot when we recover and continue reading afterward.

## IoTDB Connector Data Write Analysis
The next step is the parsing of the data writes.

## Data type mapping
![](/image/16714316310459/16714319862080.jpg)

Data writing also involves data type mapping, but here, in contrast to data reading, it maps the SeaTunnel data types to the IoTDB data types. As IoTDB only has INT32, the writing process involves lifting the data types TINYINT and SMALLINT. All other data types can be converted one-to-one; ARRAY and VECTOR data types are not yet supported.

![](/image/16714316310459/16714319949478.jpg)

The above diagram shows the corresponding code, the implementation logic will need to be seen in our specific mapping.

## Dynamic injection of metadata
SeaTunnel supports the dynamic injection of metadata.

When heterogeneous data sources are written to the IoTDB, device, measurement, and time are extracted from each row of data, either by serializing the SeaTunnelRow with a fixed column value as configured. Alternatively, the system time can be used as the time, or the current system time can be populated if no time column is specified, and the storage group can be configured to be automatically appended to the device prefix.

![](/image/16714316310459/16714320117277.jpg)

For example, suppose that the structure of a row in SeaTunnel reading the data format shown above can be configured to synchronize to the IoTDB and the result obtained is as follows.

![](/image/16714316310459/16714320201848.jpg)

The temperature and humidity columns we need were extracted, and ts and device names were extracted as the original data for the IoTDB.

## Batch commits and exception retries

In addition, Sink needs to handle batch and retry when writing. For batches, we can configure the appropriate batch configuration, including support for configuring the number and interval of batch commits; if the data is cached to memory, you can enable a separate thread for timed commits.

For retries, SeaTunnel supports the configuration of the number of retries, the waiting interval and the maximum number of retries, as well as the possibility to end a retry if it encounters a non-recoverable error when it has finished.

![](/image/16714316310459/16714320394193.jpg)

## IoTDB Connector Usage Examples

After the previous analysis of reading and writing data, let’s look at three typical examples of usage scenarios.

## Exporting data from IoTDB
The first scenario is exporting data from the IoTDB, the example I have given here is reading data from the IoTDB to the Console.

* Read in parallel, output to Console

Parallelism: 2

Number of batches: 24

Time frame: 2022–09–25 ~ 2022–09–26
![](/image/16714316310459/16714320856052.jpg)

Let’s assume that we have a data table in IoTDB and we want to export the data to the Console. The whole configuration is shown above and needs to map the columns of data we want to export and the time range to check.

This is the simplest example, but in practice, the Sink side may be more complex, so you will need to refer to the documentation of the corresponding data source for the appropriate configuration.

## Importing data to IoTDB

* Read database, batch write to IoTDB
    * Batch writing: one commit every 1024 entries or every 1000 ms
    
    * -Extracting metadata device, timestamp, measurement
    
    * -Specify the storage group: root.test_group

![](/image/16714316310459/16714321290339.jpg)
Another typical usage scenario is to import data from other data sources into IoTDB. suppose I have an external database table with columns like ts, temperature, humidity, etc. and we import it into IoTDB, requiring the columns of temperature and humidity, but the rest can be left out. The whole configuration is shown in the diagram above, you can refer to it.

On the Sink side, you mainly have to specify the Key of the device column, such as from which data the device is extracted, from which class the time is extracted, which columns to write to the IoTDB, etc.

As you can see, we can configure the storage group, which is the storage group of the IoTDB, which can be specified by the storage group.

## Synchronizing data between IoTDB
The third scenario is to synchronize data between IoTDB and IoTDB and write to IoTDB in bulk, suppose there is a table in IoTDB that needs to be synchronized to another IoTDB, after synchronization the storage group has changed and the name of the indicator of the data column has also changed, then you can use projection to rewrite the indicator name and use SQL to rewrite the storage group.

![](/image/16714316310459/16714321480992.jpg)

## How to get involved in contribution
Finally, a few words about the next steps for the IoTDB Connector and how you can get involved in improving the Connector and contributing new features that are needed.

## Next steps for the IoTDB Connector

* Support for reading and writing vector data types
* Support for tsfile reads and writes
* Support for writing tsfile and reloading to IoTDB