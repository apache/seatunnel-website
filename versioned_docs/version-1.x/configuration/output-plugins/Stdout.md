## Output plugin : Stdout

* Author: InterestingLab
* Homepage: https://interestinglab.github.io/seatunnel-docs
* Version: 1.0.0

### Description

Output Rows to console, it is always used for debugging.

### Options

| name | type | required | default value | engine |
| --- | --- | --- | --- | --- |
| [limit](#limit-number) | number | no | 100 | batch/spark streaming |
| [format](#format-string) | string | no | plain | batch/spark streaming |

##### limit [number]

Limit number of output. `-1` means no limit.

##### format [string]

The format used for output, the allowed formats are `json`, `plain` and `schema`

### Example

```
stdout {
    limit = 10
    format = "json"
}
```
