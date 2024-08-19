# Performance Test Report: SeaTunnel Synchronizes data in batches 420% Faster than GLUE!


cover

SeaTunnel Zeta has been officially released with the joint efforts of the community. After comparing the performance of SeaTunnel with DataX and Airbyte, we also compared the performance of SeaTunnel with the popular data synchronization tool AWS GLUE.

The results showed that SeaTunnel batch syncs MySQL data to MySQL 420% faster than GLUE.

To ensure the accuracy of the test, we took on the test under the same test environment: under the same resource conditions, we tested SeaTunnel and AWS GLUE to synchronize data from MySQL to MySQL in batches and compared the time required for the two tools.

![1](/image/202303311452/1.png)


We created a table in MySQL containing 31 fields, with the primary key selected as an incrementing ID, and all other fields generated randomly, without setting any indexes. The table creation statement is as follows:

```plain
create table test.type_source_table
(
    id                   int auto_increment
        primary key,
    f_binary             binary(64)          null,
    f_blob               blob                null,
    f_long_varbinary     mediumblob          null,
    f_longblob           longblob            null,
    f_tinyblob           tinyblob            null,
    f_varbinary          varbinary(100)      null,
    f_smallint           smallint            null,
    f_smallint_unsigned  smallint unsigned   null,
    f_mediumint          mediumint           null,
    f_mediumint_unsigned mediumint unsigned  null,
    f_int                int                 null,
    f_int_unsigned       int unsigned        null,
    f_integer            int                 null,
    f_integer_unsigned   int unsigned        null,
    f_bigint             bigint              null,
    f_bigint_unsigned    bigint unsigned     null,
    f_numeric            decimal             null,
    f_decimal            decimal             null,
    f_float              float               null,
    f_double             double              null,
    f_double_precision   double              null,
    f_longtext           longtext            null,
    f_mediumtext         mediumtext          null,
    f_text               text                null,
    f_tinytext           tinytext            null,
    f_varchar            varchar(100)        null,
    f_date               date                null,
    f_datetime           datetime            null,
    f_time               time                null,
    f_timestamp          timestamp           null
);
```
# SeaTunnel Task Configuration

In SeaTunnel, we split the data according to the ID field and process it in multiple sub-tasks. Here is the configuration file for SeaTunnel:

```plain
env {
    job.mode = "BATCH"
    checkpoint.interval = 300000
}
source {
    Jdbc {
        url = "jdbc:mysql://XXX:3306/test"
        driver = "com.mysql.cj.jdbc.Driver"
        user = "root"
        password = "password"
        connection_check_timeout_sec = 100
        query = "select id, f_binary, f_blob, f_long_varbinary, f_longblob, f_tinyblob, f_varbinary, f_smallint, f_smallint_unsigned, f_mediumint, f_mediumint_unsigned, f_int, f_int_unsigned, f_integer, f_integer_unsigned, f_bigint, f_bigint_unsigned, f_numeric, f_decimal, f_float, f_double, f_double_precision, f_longtext, f_mediumtext, f_text, f_tinytext, f_varchar, f_date, f_datetime, f_time, f_timestamp from test"
        partition_column = "id"
        partition_num = 40
        parallelism = 2
    }
}
sink {
Jdbc {
          url = "jdbc:mysql://XXX:3306/test"
         driver = "com.mysql.cj.jdbc.Driver" 
        user = "root"
        password = "password"
         query = "insert into test_1 values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    }
}
```
Under fixed JVM memory of 4G and parallelism of 2, SeaTunnel completed the synchronization in 1965 seconds. Based on this conclusion, we tested the speed of GLUE under the same memory and concurrency settings.
# GLUE Task Configuration

We created a MySQL-to-MySQL job as follows:

![2](/image/202303311452/2.png)


Configuration source connect with the target:

![3](/image/202303311452/3.png)

Job configuration:

![4](/image/202303311452/4.png)


![5](/image/202303311452/5.png)


Adjust the memory: job parameters configuration

![6](/image/202303311452/6-1.png)


— conf spark.yarn.executor.memory=4g

Under this configuration, GLUE took 8191 seconds to complete the synchronization.

# Conclusion

After comparing the best configurations, we conducted a more in-depth comparison for different memory sizes. The following chart shows the comparison results obtained through repeated testing under the same environment.

![7](/image/202303311452/7.png)


The unit is seconds.

![8](/image/202303311452/8.png)

Note: This comparison is based on SeaTunnel: commit ID f57b897, and we welcome to download and test it!

