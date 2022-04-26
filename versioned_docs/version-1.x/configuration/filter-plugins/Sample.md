## Filter plugin : Sample

* Author: InterestingLab
* Homepage: https://interestinglab.github.io/seatunnel-docs
* Version: 1.0.0

### Description

Taking Samples from the events.

### Options

| name | type | required | default value |
| --- | --- | --- | --- |
| [fraction](#fraction-number) | number | no | 0.1 |
| [limit](#limit-number) | number | no | -1 |

##### fraction [number]

The fraction of sampling. For example, `fraction=0.8` represents to extract `80%` data from the events.

##### limit [number]

The number of Rows after sampling, where `-1` represents no limit.

### Examples

```
sample {
    fraction = 0.8
}
```

> Extract 80% of events.
