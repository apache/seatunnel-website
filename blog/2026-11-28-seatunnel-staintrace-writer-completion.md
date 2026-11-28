---
slug: seatunnel-staintrace-writer-completion
title: "CDC Is Slow. What Can SeaTunnel's Row Trace Actually Prove?"
description: "A six-record Apache SeaTunnel 3.1.0 lab that shows where a Zeta trace ends and why writer completion is not database visibility."
tags: [SeaTunnel, Zeta, CDC, Observability]
---

A SeaTunnel job is running, but a paid order still looks unpaid. Before adding more dashboards, separate two questions: where does a record spend time **inside the engine**, and has the new value become visible **in the target**? StainTrace can help with the first question. For the second, query the database or the actual application read path.

<!-- truncate -->

## Reproduce the trace on a six-row job

I ran Apache SeaTunnel 3.1.0 in local Zeta mode with JDK 11, one worker, and a disposable `FakeSource → Console` job. There is no database, Transform, or second worker in this test. Use an isolated installation with the 3.1.0 FakeSource and Console connectors available.

Add these settings under the existing `seatunnel.engine` section in `config/seatunnel.yaml`. Use an empty writable directory for traces. An interval of 1 tries to sample every record in this tiny run; do not copy that setting into a production job.

```yaml
seatunnel:
  engine:
    stain-trace-enabled: true
    stain-trace-sample-interval: 1
    stain-trace-file-base-path: /tmp/seatunnel-article-traces
    stain-trace-file-flush-interval-seconds: 1
```

Save this job as `stain-trace.conf` in the SeaTunnel installation directory.

```hocon
env {
  job.mode = "BATCH"
  parallelism = 1
  stain_trace {
    enabled = true
    sample_interval = 1
  }
}
source {
  FakeSource {
    row.num = 6
    schema {
      fields {
        probe = "string"
      }
    }
  }
}
sink {
  Console {}
}
```

Run it from that directory:

```bash
bin/seatunnel.sh -DJvmOption='-Xms256m -Xmx768m' -m local -c stain-trace.conf
```

When the job finishes, inspect the new JSON Lines file under the configured path. I counted the stage names inside the span events, not the number of log lines the job printed. The local result:

```text
trace files: 1
spans: 6
SOURCE_EMIT: 6
QUEUE_IN: 6
QUEUE_OUT: 6
SINK_WRITE_DONE: 6
SINK_COMMIT_END: 0
```

## Read the last event before drawing a conclusion

All six spans contain source emission, queue entry, queue exit, and sink write completion. There are no Transform stages in this job. The [SeaTunnel 3.1.0 stage reference](https://seatunnel.apache.org/docs/3.1.0/engines/zeta/stain-trace/) places `SINK_WRITE_DONE` after the writer call. It lists `SINK_COMMIT_END` as a stage that is defined but not instrumented in this release.

A span ending at `SINK_WRITE_DONE` therefore cannot tell you when a database committed, or what an application could read. This Console test does not validate either. It also does not measure overhead, cross-worker timing, or trace coverage on failed and replayed jobs. In a production incident, no trace for a particular business key is not proof the row was lost. Sampling can miss it.

If the time between `QUEUE_IN` and `QUEUE_OUT` dominates across several samples from the same worker, check queue depth, backpressure, and whether downstream operators can keep up. If the time is concentrated near the sink, inspect the connector's buffering and the target's waits before blaming storage. Once you need to know whether **this order** arrived, query its key and expected new value on the destination primary. If those match but the application still shows the old value, follow the application's read path.

Keep this distinction in the incident notes: *the writer call returned* is engine evidence; *the application read the paid order* is a separate observation.
