## Filter plugin : Grok

* Author: InterestingLab
* Homepage: https://interestinglab.github.io/seatunnel-docs
* Version: 1.0.0

### Description

Parse arbitrary text into structured data with columns  using Grok Pattern. Please have a look at [available grok pattern](https://github.com/InterestingLab/seatunnel/blob/master/plugins/grok/files/grok-patterns/grok-patterns).

You can also go to [http://grokdebug.herokuapp.com](http://grokdebug.herokuapp.com) to debug grok patterns if you need some hint for grok pattern syntax.



### Options

| name | type | required | default value |
| --- | --- | --- | --- |
| [named_captures_only](#named_captures_only-boolean) | boolean | no | true |
| [pattern](#pattern-string) | string | yes | - |
| [patterns_dir](#patterns_dir-string) | string | no | - |
| [source_field](#source_field-string) | string | no | raw_message |
| [target_field](#target_field-string) | string | no | __root__ |

##### named_captures_only [boolean]

If true, only store named captures from grok.

##### pattern [string]

Grok pattern.

##### patterns_dir [string]

The directory of pattern files. seatunnel ships by default with a bunch of [patterns]([grok-patterns文件](https://github.com/InterestingLab/seatunnel/tree/master/plugins/grok/files/grok-patterns)), so you don’t necessarily need to configure this unless you want to add additional patterns.


##### source_field [string]

Source field.

##### target_field [string]

Target field.

### Example

```
grok {
    source_field = "raw_message"
    pattern = "%{WORD:name} is %{WORD:gender}, %{NUMBER:age} years old and weighs %{NUMBER:weight} kilograms"
    target_field = "info_detail"
}
```

* **Input**

```
+----------------------------------------------------+
|raw_message                                         |
+----------------------------------------------------+
|gary is male, 25 years old and weighs 68.5 kilograms|
|gary is male, 25 years old and weighs 68.5 kilograms|
+----------------------------------------------------+
```

* **Output**

```
+----------------------------------------------------+------------------------------------------------------------+
|raw_message                                         |info_detail                                                 |
+----------------------------------------------------+------------------------------------------------------------+
|gary is male, 25 years old and weighs 68.5 kilograms|Map(age -> 25, gender -> male, name -> gary, weight -> 68.5)|
|gary is male, 25 years old and weighs 68.5 kilograms|Map(age -> 25, gender -> male, name -> gary, weight -> 68.5)|
+----------------------------------------------------+------------------------------------------------------------+

```
