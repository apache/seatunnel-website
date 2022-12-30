# Doris

> Doris sink connector

## Description
Used to send data to Doris. Both support streaming and batch mode.
The internal implementation of Doris sink connector is cached and imported by stream load in batches.
## Key features

- [ ] [exactly-once](../../concept/connector-v2-features.md)
- [ ] [schema projection](../../concept/connector-v2-features.md)

## Options

| name                        | type                         | required | default value   |
|-----------------------------|------------------------------|----------|-----------------|
| node_urls                   | list                         | yes      | -               |
| username                    | string                       | yes      | -               |
| password                    | string                       | yes      | -               |
| database                    | string                       | yes      | -               |
| table                       | string                       | yes      | -               |
| labelPrefix                 | string                       | no       | -               |
| batch_max_rows              | long                         | no       | 1024            |
| batch_max_bytes             | int                          | no       | 5 * 1024 * 1024 |
| batch_interval_ms           | int                          | no       | 1000            |
| max_retries                 | int                          | no       | 1               |
| retry_backoff_multiplier_ms | int                          | no       | -               |
| max_retry_backoff_ms        | int                          | no       | -               |
| sink.properties.*           | doris stream load config     | no       | -               |

### node_urls [list]

`Doris` cluster address, the format is `["fe_ip:fe_http_port", ...]`

### username [string]

`Doris` user username

### password [string]

`Doris` user password

### database [string]

The name of `Doris` database

### table [string]

The name of `Doris` table

### labelPrefix [string]

The prefix of `Doris` stream load label

### batch_max_rows [long]

For batch writing, when the number of buffers reaches the number of `batch_max_rows` or the byte size of `batch_max_bytes` or the time reaches `batch_interval_ms`, the data will be flushed into the Doris

### batch_max_bytes [int]

For batch writing, when the number of buffers reaches the number of `batch_max_rows` or the byte size of `batch_max_bytes` or the time reaches `batch_interval_ms`, the data will be flushed into the Doris

### batch_interval_ms [int]

For batch writing, when the number of buffers reaches the number of `batch_max_rows` or the byte size of `batch_max_bytes` or the time reaches `batch_interval_ms`, the data will be flushed into the Doris

### max_retries [int]

The number of retries to flush failed

### retry_backoff_multiplier_ms [int]

Using as a multiplier for generating the next delay for backoff

### max_retry_backoff_ms [int]

The amount of time to wait before attempting to retry a request to `Doris`

### sink.properties.*  [doris stream load config]

The parameter of the stream load `data_desc`
The way to specify the parameter is to add the prefix `sink.properties.` to the original stream load parameter name 
For example, the way to specify `strip_outer_array` is: `sink.properties.strip_outer_array`

#### Supported import data formats

The supported formats include CSV and JSON. Default value: CSV

## Example

Use JSON format to import data

```
sink {
    Doris {
        nodeUrls = ["e2e_dorisdb:8030"]
        username = root
        password = ""
        database = "test"
        table = "e2e_table_sink"
        batch_max_rows = 100
        sink.properties.format = "JSON"
        sink.properties.strip_outer_array = true
    }
}

```

Use CSV format to import data

```
sink {
    Doris {
        nodeUrls = ["e2e_dorisdb:8030"]
        username = root
        password = ""
        database = "test"
        table = "e2e_table_sink"
        batch_max_rows = 100
        sink.properties.format = "CSV"
        sink.properties.column_separator = ","
    }
}
```

## Changelog

### 2.3.0 2022-12-30

- Add Doris Sink Connector