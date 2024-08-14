# Input plugin

### Input plugin general parameters

| name | type | required | default value |
| --- | --- | --- | --- |
| [result_table_name](#result_table_name-string) | string | yes | - |
| [table_name](#table_name-string) | string | no | - |


##### result_table_name [string]

When `result_table_name is not specified`, the data processed by this plugin will not be registered as a dataset that can be directly accessed by other plugins, or called a temporary table;

When `result_table_name` is specified, the data processed by this plugin will be registered as a dataset that can be directly accessed by other plugins, or called a temporary table. The dataset registered here, other plugins can directly access by specifying `source_table_name`.


##### table_name [string]

**\[Deprecated from v1.4\]** The function is the same as `result_table_name`, this parameter will be deleted in subsequent Release versions, it is recommended to use the `result_table_name` parameter


### Usage example

````
fake {
    result_table_name = "view_table_2"
}
````

> The result of the data source `fake` will be registered as a temporary table named `view_table_2`. This temporary table can be used by any `Filter` or `Output` plugin by specifying `source_table_name`.