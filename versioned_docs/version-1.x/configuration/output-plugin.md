# Output plugin

### Output plugin common parameters

| name | type | required | default value |
| --- | --- | --- | --- |
| [source_table_name](#source_table_name-string) | string | no | - |



##### source_table_name [string]

When `source_table_name` is not specified, the current plugin processes the dataset output by the previous plugin in the configuration file;

When `source_table_name` is specified, the current plugin processes the dataset corresponding to this parameter.


### Usage example

````
stdout {
     source_table_name = "view_table_2"
}
````

> Output a temporary table named `view_table_2`.

````
stdout {}
````

> If `source_table_name` is not configured, output the processing result of the last `Filter` plugin in the configuration file