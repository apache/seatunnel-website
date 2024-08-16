# Filter plugin

### Filter plugin general parameters

| name | type | required | default value |
| --- | --- | --- | --- |
| [source_table_name](#source_table_name-string) | string | no | - |
| [result_table_name](#result_table_name-string) | string | no | - |


##### source_table_name [string]

When `source_table_name` is not specified, the current plugin processes the dataset output by the previous plugin in the configuration file;

When `source_table_name` is specified, the current plugin processes the dataset corresponding to this parameter.

##### result_table_name [string]

When `result_table_name is not specified`, the data processed by this plugin will not be registered as a dataset that can be directly accessed by other plugins, or called a temporary table;

When `result_table_name` is specified, the data processed by this plugin will be registered as a dataset that can be directly accessed by other plugins, or called a temporary table. The dataset registered here, other plugins can directly access by specifying `source_table_name`.

### Usage example

````
split {
    source_table_name = "view_table_1"
    source_field = "message"
    delimiter = "&"
    fields = ["field1", "field2"]
    result_table_name = "view_table_2"
}
````

> The `Split` plugin will process the data in the temporary table `view_table_1` and register the processing result as a temporary table named `view_table_2`, this temporary table can be specified by any subsequent `Filter` or `Output` plugins `source_table_name` is used.

````
split {
    source_field = "message"
    delimiter = "&"
    fields = ["field1", "field2"]
}
````

> Without `source_table_name` configured, the `Split` plugin will read the dataset passed by the previous plugin and pass it to the next plugin.