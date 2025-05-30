import ChangeLog from '../changelog/connector-socket.md';

# Socket

> Socket sink connector

## Support Those Engines

> Spark<br/>
> Flink<br/>
> SeaTunnel Zeta<br/>

## Key features

- [ ] [exactly-once](../../concept/connector-v2-features.md)

## Description

Used to send data to Socket Server. Both support streaming and batch mode.

> For example, if the data from upstream is [`age: 12, name: jared`], the content send to socket server is the following: `{"name":"jared","age":17}`

## Sink Options

|      Name      |  Type   | Required | Default |                                                   Description                                                   |
|----------------|---------|----------|---------|-----------------------------------------------------------------------------------------------------------------|
| host           | String  | Yes      |         | socket server host                                                                                              |
| port           | Integer | Yes      |         | socket server port                                                                                              |
| max_retries    | Integer | No       | 3       | The number of retries to send record failed                                                                     |
| common-options |         | No       | -       | Source plugin common parameters, please refer to [Source Common Options](../sink-common-options.md) for details |

## Task Example

> This is randomly generated data written to the Socket side

```hocon
env {
  parallelism = 1
  job.mode = "STREAMING"
}

source {
  FakeSource {
    plugin_output = "fake"
    schema = {
      fields {
        name = "string"
        age = "int"
      }
    }
  }
}

sink {
  Socket {
    host = "localhost"
    port = 9999
  }
}
```

* Start a port listening

```shell
nc -l -v 9999
```

* Start a SeaTunnel task

* Socket Server Console print data

```text
{"name":"jared","age":17}
```

## Changelog

<ChangeLog />

