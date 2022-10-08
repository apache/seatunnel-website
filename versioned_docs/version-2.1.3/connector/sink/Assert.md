# Assert

> # Sink plugin: Assert [Flink]

## Description

A flink sink plugin which can assert illegal data by user defined rules

:::tip

Engine Supported and plugin name

* [x] Spark：Assert
* [x] Flink: Assert

:::

## Options

| name                          | type        | required | default value |
| ----------------------------- | ----------  | -------- | ------------- |
|rules                          | ConfigList  | yes      | -             |
|rules.field_name               | string      | yes      | -             |
|rules.field_type               | string      | no       | -             |
|rules.field_value              | ConfigList  | no       | -             |
|rules.field_value.rule_type    | string      | no       | -             |
|rules.field_value.rule_value   | double      | no       | -             |


### rules [ConfigList]

Rule definition of user's available data.  Each rule represents one field validation.

### field_name [string]

field name（string）

### field_type [string]

field type (string),  e.g. `string,boolean,byte,short,int,long,float,double,char,void,BigInteger,BigDecimal,Instant`

### field_value [ConfigList]

A list value rule define the data value validation

### rule_type [string]

The following rules are supported for now
`
NOT_NULL,   // value can't be null
MIN,        // define the minimum value of data
MAX,        // define the maximum value of data
MIN_LENGTH, // define the minimum string length of a string data
MAX_LENGTH  // define the maximum string length of a string data
`

### rule_value [double]

the value related to rule type


## Example
the whole config obey with `hocon` style

```hocon

Assert {
   rules = 
        [{
            field_name = name
            field_type = string
            field_value = [
                {
                    rule_type = NOT_NULL
                },
                {
                    rule_type = MIN_LENGTH
                    rule_value = 3
                },
                {
                     rule_type = MAX_LENGTH
                     rule_value = 5
                }
            ]
        },{
            field_name = age
            field_type = int
            field_value = [
                {
                    rule_type = NOT_NULL
                },
                {
                    rule_type = MIN
                    rule_value = 10
                },
                {
                     rule_type = MAX
                     rule_value = 20
                }
            ]
        }
        ]
    
}

```
