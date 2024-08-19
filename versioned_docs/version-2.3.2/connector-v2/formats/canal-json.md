# Canal Format

Changelog-Data-Capture Format Format: Serialization Schema Format: Deserialization Schema

Canal is a CDC (Changelog Data Capture) tool that can stream changes in real-time from MySQL into other systems. Canal provides a unified format schema for changelog and supports to serialize messages using JSON and protobuf (protobuf is the default format for Canal).

Seatunnel supports to interpret Canal JSON messages as INSERT/UPDATE/DELETE messages into seatunnel system. This is useful in many cases to leverage this feature, such as

        synchronizing incremental data from databases to other systems
        auditing logs
        real-time materialized views on databases
        temporal join changing history of a database table and so on.

Seatunnel also supports to encode the INSERT/UPDATE/DELETE messages in Seatunnel as Canal JSON messages, and emit to storage like Kafka. However, currently Seatunnel can’t combine UPDATE_BEFORE and UPDATE_AFTER into a single UPDATE message. Therefore, Seatunnel encodes UPDATE_BEFORE and UPDATE_AFTER as DELETE and INSERT Canal messages.

# Format Options

|             option             | default | required |                                                                                                Description                                                                                                 |
|--------------------------------|---------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| format                         | (none)  | yes      | Specify what format to use, here should be 'canal_json'.                                                                                                                                                   |
| canal_json.ignore-parse-errors | false   | no       | Skip fields and rows with parse errors instead of failing. Fields are set to null in case of errors.                                                                                                       |
| canal_json.database.include    | (none)  | no       | An optional regular expression to only read the specific databases changelog rows by regular matching the "database" meta field in the Canal record. The pattern string is compatible with Java's Pattern. |
| canal_json.table.include       | (none)  | no       | An optional regular expression to only read the specific tables changelog rows by regular matching the "table" meta field in the Canal record. The pattern string is compatible with Java's Pattern.       |

# How to use Canal format

## Kafka uses example

Canal provides a unified format for changelog, here is a simple example for an update operation captured from a MySQL products table:

```bash
{
  "data": [
    {
      "id": "111",
      "name": "scooter",
      "description": "Big 2-wheel scooter",
      "weight": "5.18"
    }
  ],
  "database": "inventory",
  "es": 1589373560000,
  "id": 9,
  "isDdl": false,
  "mysqlType": {
    "id": "INTEGER",
    "name": "VARCHAR(255)",
    "description": "VARCHAR(512)",
    "weight": "FLOAT"
  },
  "old": [
    {
      "weight": "5.15"
    }
  ],
  "pkNames": [
    "id"
  ],
  "sql": "",
  "sqlType": {
    "id": 4,
    "name": 12,
    "description": 12,
    "weight": 7
  },
  "table": "products",
  "ts": 1589373560798,
  "type": "UPDATE"
}
```

Note: please refer to Canal documentation about the meaning of each fields.

The MySQL products table has 4 columns (id, name, description and weight).
The above JSON message is an update change event on the products table where the weight value of the row with id = 111 is changed from 5.18 to 5.15.
Assuming the messages have been synchronized to Kafka topic products_binlog, then we can use the following Seatunnel to consume this topic and interpret the change events.

```bash
env {
    execution.parallelism = 1
    job.mode = "BATCH"
}

source {
  Kafka {
    bootstrap.servers = "kafkaCluster:9092"
    topic = "products_binlog"
    result_table_name = "kafka_name"
    start_mode = earliest
    schema = {
      fields {
           id = "int"
           name = "string"
           description = "string"
           weight = "string"
      }
    },
    format = canal_json
  }

}

transform {
}

sink {
  Kafka {
    bootstrap.servers = "localhost:9092"
    topic = "consume-binlog"
    format = canal_json
  }
}
```

