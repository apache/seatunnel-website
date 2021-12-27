# Output plugin : **Hive**

* Author: InterestingLab
* Homepage: https://interestinglab.github.io/seatunnel-docs
* Version: 1.5.1

### Description

写入数据到[Apache Hive](https://hive.apache.org)表中

### Options

| name                                    | type          | required | default value |
| --------------------------------------- | ------------- | -------- | ------------- |
| [sql](#hql)                             | string        | no       | -             |
| [source_table_name](#source_table_name) | string        | No       | -             |
| [result_table_name](#result_table_name) | string        | no       | -             |
| [sink_columns](#sink_columns)           | string        | no       | -             |
| [save_mode](#save_mode)                 | string        | no       | -             |
| [partition_by](#partition_by)           | Array[string] | no       | -             |

##### sql[string]

标准的hql语句：insert into/overwrite $table  select * from xxx_table

如果有这个option，会忽略其他的option

##### Source_table_name [string]

准备输出到hive的表名

##### result_table_name [string]

结果在hive中的存储表名

##### save_mode [string]

写入spark中采取的模式，与spark.mode语义相同

##### sink_columns[string]

选择source_table_name中的需要的字段，存储在result_table_name中,字段间逗号分隔

##### partition_by[Array[string]]

hive分区

### Example

```conf
output {
  Hive {
    sql = "insert overwrite table seatunnel.test1 partition(province) select name,age,province from myTable2"
  }
}
```





```conf
output {
  Hive {
    source_table_name = "myTable2"
    result_table_name = "seatunnel.test1"
    save_mode = "overwrite"
    sink_columns = "name,age,province"
    partition_by = ["province"]
  }
}
```

