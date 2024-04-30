# JsonPath

> JsonPath transform plugin

## Description

> Support use jsonpath select data

## Options

|  name   | type  | required | default value |
|---------|-------|----------|---------------|
| Columns | Array | Yes      |               |

### common options [string]

Transform plugin common parameters, please refer to [Transform Plugin](common-options.md) for details

### fields[array]

#### option

|    name    |  type  | required | default value |
|------------|--------|----------|---------------|
| src_field  | String | Yes      |               |
| dest_field | String | Yes      |               |
| path       | String | Yes      |               |
| dest_type  | String | No       | String        |

#### src_field

> the json source field you want to parse

Support SeatunnelDateType

* STRING
* BYTES
* ARRAY
* MAP
* ROW

#### dest_field

> after use jsonpath output field

#### dest_type

> the type of dest field

#### path

> Jsonpath

## Read Json Example

The data read from source is a table like this json:

```json
{
  "data": {
    "c_string": "this is a string",
    "c_boolean": true,
    "c_integer": 42,
    "c_float": 3.14,
    "c_double": 3.14,
    "c_decimal": 10.55,
    "c_date": "2023-10-29",
    "c_datetime": "16:12:43.459",
    "c_array":["item1", "item2", "item3"]
  }
}
```

Assuming we want to use JsonPath to extract properties.

```json
transform {
  JsonPath {
    source_table_name = "fake"
    result_table_name = "fake1"
    columns = [
     {
        "src_field" = "data"
        "path" = "$.data.c_string"
        "dest_field" = "c1_string"
     },
     {
        "src_field" = "data"
        "path" = "$.data.c_boolean"
        "dest_field" = "c1_boolean"
        "dest_type" = "boolean"
     },
     {
        "src_field" = "data"
        "path" = "$.data.c_integer"
        "dest_field" = "c1_integer"
        "dest_type" = "int"
     },
     {
        "src_field" = "data"
        "path" = "$.data.c_float"
        "dest_field" = "c1_float"
        "dest_type" = "float"
     },
     {
        "src_field" = "data"
        "path" = "$.data.c_double"
        "dest_field" = "c1_double"
        "dest_type" = "double"
     },
      {
         "src_field" = "data"
         "path" = "$.data.c_decimal"
         "dest_field" = "c1_decimal"
         "dest_type" = "decimal(4,2)"
      },
      {
         "src_field" = "data"
         "path" = "$.data.c_date"
         "dest_field" = "c1_date"
         "dest_type" = "date"
      },
      {
         "src_field" = "data"
         "path" = "$.data.c_datetime"
         "dest_field" = "c1_datetime"
         "dest_type" = "time"
      },
			{
         "src_field" = "data"
         "path" = "$.data.c_array"
         "dest_field" = "c1_array"
         "dest_type" = "array<string>"        
      }
    ]
  }
}
```

Then the data result table `fake1` will like this

|             data             |    c1_string     | c1_boolean | c1_integer | c1_float | c1_double | c1_decimal |  c1_date   | c1_datetime  |          c1_array           |
|------------------------------|------------------|------------|------------|----------|-----------|------------|------------|--------------|-----------------------------|
| too much content not to show | this is a string | true       | 42         | 3.14     | 3.14      | 10.55      | 2023-10-29 | 16:12:43.459 | ["item1", "item2", "item3"] |

## Read SeatunnelRow Example

Suppose a column in a row of data is of type SeatunnelRow and that the name of the column is col

<table>
<tr><th colspan="2">SeatunnelRow(col)</th><th>other</th></tr>
<tr><td>name</td><td>age</td><td>....</td></tr>
<tr><td>a</td><td>18</td><td>....</td></tr>
</table>

The JsonPath transform converts the values of seatunnel into an array,

```json
transform {
  JsonPath {
    source_table_name = "fake"
    result_table_name = "fake1"
    columns = [
     {
        "src_field" = "col"
        "path" = "$[0]"
        "dest_field" = "name"
  			"dest_type" = "string"
     },
		{
        "src_field" = "col"
        "path" = "$[1]"
        "dest_field" = "age"
  			"dest_type" = "int"
     }
    ]
  }
}
```

Then the data result table `fake1` will like this

| name | age |   col    | other |
|------|-----|----------|-------|
| a    | 18  | ["a",18] | ...   |

## Changelog

* Add JsonPath Transform

