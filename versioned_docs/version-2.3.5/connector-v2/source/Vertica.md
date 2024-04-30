# Vertica

> JDBC Vertica Source Connector

## Description

Read external data source data through JDBC.

## Support Those Engines

> Spark<br/>
> Flink<br/>
> SeaTunnel Zeta<br/>

## Using Dependency

### For Spark/Flink Engine

> 1. You need to ensure that the [jdbc driver jar package](https://www.vertica.com/download/vertica/client-drivers/) has been placed in directory `${SEATUNNEL_HOME}/plugins/`.

### For SeaTunnel Zeta Engine

> 1. You need to ensure that the [jdbc driver jar package](https://www.vertica.com/download/vertica/client-drivers/) has been placed in directory `${SEATUNNEL_HOME}/lib/`.

## Key Features

- [x] [batch](../../concept/connector-v2-features.md)
- [ ] [stream](../../concept/connector-v2-features.md)
- [x] [exactly-once](../../concept/connector-v2-features.md)
- [x] [column projection](../../concept/connector-v2-features.md)
- [x] [parallelism](../../concept/connector-v2-features.md)
- [x] [support user-defined split](../../concept/connector-v2-features.md)

> supports query SQL and can achieve projection effect.

## Supported DataSource Info

| Datasource |                    Supported versions                    |         Driver          |                  Url                  |                                Maven                                 |
|------------|----------------------------------------------------------|-------------------------|---------------------------------------|----------------------------------------------------------------------|
| Vertica    | Different dependency version has different driver class. | com.vertica.jdbc.Driver | jdbc:vertica://localhost:5433/vertica | [Download](https://www.vertica.com/download/vertica/client-drivers/) |

## Data Type Mapping

|                                                        Vertical Data Type                                                         |                                                                 SeaTunnel Data Type                                                                 |
|-----------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| BIT                                                                                                                               | BOOLEAN                                                                                                                                             |
| TINYINT<br/>TINYINT UNSIGNED<br/>SMALLINT<br/>SMALLINT UNSIGNED<br/>MEDIUMINT<br/>MEDIUMINT UNSIGNED<br/>INT<br/>INTEGER<br/>YEAR | INT                                                                                                                                                 |
| INT UNSIGNED<br/>INTEGER UNSIGNED<br/>BIGINT                                                                                      | LONG                                                                                                                                                |
| BIGINT UNSIGNED                                                                                                                   | DECIMAL(20,0)                                                                                                                                       |
| DECIMAL(x,y)(Get the designated column's specified column size.<38)                                                               | DECIMAL(x,y)                                                                                                                                        |
| DECIMAL(x,y)(Get the designated column's specified column size.>38)                                                               | DECIMAL(38,18)                                                                                                                                      |
| DECIMAL UNSIGNED                                                                                                                  | DECIMAL((Get the designated column's specified column size)+1,<br/>(Gets the designated column's number of digits to right of the decimal point.))) |
| FLOAT<br/>FLOAT UNSIGNED                                                                                                          | FLOAT                                                                                                                                               |
| DOUBLE<br/>DOUBLE UNSIGNED                                                                                                        | DOUBLE                                                                                                                                              |
| CHAR<br/>VARCHAR<br/>TINYTEXT<br/>MEDIUMTEXT<br/>TEXT<br/>LONGTEXT<br/>JSON                                                       | STRING                                                                                                                                              |
| DATE                                                                                                                              | DATE                                                                                                                                                |
| TIME                                                                                                                              | TIME                                                                                                                                                |
| DATETIME<br/>TIMESTAMP                                                                                                            | TIMESTAMP                                                                                                                                           |
| TINYBLOB<br/>MEDIUMBLOB<br/>BLOB<br/>LONGBLOB<br/>BINARY<br/>VARBINAR<br/>BIT(n)                                                  | BYTES                                                                                                                                               |
| GEOMETRY<br/>UNKNOWN                                                                                                              | Not supported yet                                                                                                                                   |

## Source Options

|             Name             |    Type    | Required |     Default     |                                                                                                                            Description                                                                                                                            |
|------------------------------|------------|----------|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| url                          | String     | Yes      | -               | The URL of the JDBC connection. Refer to a case: jdbc:vertica://localhost:5433/vertica                                                                                                                                                                            |
| driver                       | String     | Yes      | -               | The jdbc class name used to connect to the remote data source,<br/> if you use Vertica the value is `com.vertica.jdbc.Driver`.                                                                                                                                    |
| user                         | String     | No       | -               | Connection instance user name                                                                                                                                                                                                                                     |
| password                     | String     | No       | -               | Connection instance password                                                                                                                                                                                                                                      |
| query                        | String     | Yes      | -               | Query statement                                                                                                                                                                                                                                                   |
| connection_check_timeout_sec | Int        | No       | 30              | The time in seconds to wait for the database operation used to validate the connection to complete                                                                                                                                                                |
| partition_column             | String     | No       | -               | The column name for parallelism's partition, only support numeric type,Only support numeric type primary key, and only can config one column.                                                                                                                     |
| partition_lower_bound        | BigDecimal | No       | -               | The partition_column min value for scan, if not set SeaTunnel will query database get min value.                                                                                                                                                                  |
| partition_upper_bound        | BigDecimal | No       | -               | The partition_column max value for scan, if not set SeaTunnel will query database get max value.                                                                                                                                                                  |
| partition_num                | Int        | No       | job parallelism | The number of partition count, only support positive integer. default value is job parallelism                                                                                                                                                                    |
| fetch_size                   | Int        | No       | 0               | For queries that return a large number of objects,you can configure<br/> the row fetch size used in the query toimprove performance by<br/> reducing the number database hits required to satisfy the selection criteria.<br/> Zero means use jdbc default value. |
| properties                   | Map        | No       | -               | Additional connection configuration parameters,when properties and URL have the same parameters, the priority is determined by the <br/>specific implementation of the driver. For example, in MySQL, properties take precedence over the URL.                    |
| common-options               |            | No       | -               | Source plugin common parameters, please refer to [Source Common Options](common-options.md) for details                                                                                                                                                           |

### Tips

> If partition_column is not set, it will run in single concurrency, and if partition_column is set, it will be executed  in parallel according to the concurrency of tasks.

## Task Example

### Simple:

> This example queries type_bin 'table' 16 data in your test "database" in single parallel and queries all of its fields. You can also specify which fields to query for final output to the console.

```
# Defining the runtime environment
env {
  parallelism = 2
  job.mode = "BATCH"
}
source{
    Jdbc {
        url = "jdbc:vertica://localhost:5433/vertica"
        driver = "com.vertica.jdbc.Driver"
        connection_check_timeout_sec = 100
        user = "root"
        password = "123456"
        query = "select * from type_bin limit 16"
    }
}

transform {
    # If you would like to get more information about how to configure seatunnel and see full list of transform plugins,
    # please go to https://seatunnel.apache.org/docs/transform-v2/sql
}

sink {
    Console {}
}
```

### Parallel:

> Read your query table in parallel with the shard field you configured and the shard data  You can do this if you want to read the whole table

```
source {
    Jdbc {
        url = "jdbc:vertica://localhost:5433/vertica"
        driver = "com.vertica.jdbc.Driver"
        connection_check_timeout_sec = 100
        user = "root"
        password = "123456"
        # Define query logic as required
        query = "select * from type_bin"
        # Parallel sharding reads fields
        partition_column = "id"
        # Number of fragments
        partition_num = 10
    }
}
```

### Parallel Boundary:

> It is more efficient to specify the data within the upper and lower bounds of the query It is more efficient to read your data source according to the upper and lower boundaries you configured

```
source {
    Jdbc {
        url = "jdbc:vertica://localhost:5433/vertica"
        driver = "com.vertica.jdbc.Driver"
        connection_check_timeout_sec = 100
        user = "root"
        password = "123456"
        # Define query logic as required
        query = "select * from type_bin"
        partition_column = "id"
        # Read start boundary
        partition_lower_bound = 1
        # Read end boundary
        partition_upper_bound = 500
        partition_num = 10
    }
}
```

