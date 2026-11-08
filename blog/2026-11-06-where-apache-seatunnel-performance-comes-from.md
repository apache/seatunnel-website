---
slug: where-apache-seatunnel-performance-comes-from
title: "Where Apache SeaTunnel Performance Comes From: From One Record to Tens of Thousands of Jobs"
description: "How Apache SeaTunnel combines efficient execution, shared CDC resources, parallelism, and recovery, illustrated by Tongcheng Travel's production architecture."
tags: [SeaTunnel, Zeta, Performance, CDC, Data Integration]
---

Tongcheng Travel put Apache SeaTunnel at the center of its unified data channel.

The consolidation covered tens of thousands of existing synchronization jobs across batch transfers and real-time integration. Application teams would keep their familiar submission interfaces. The platform would translate their configurations, submit jobs through a common service, and execute them on SeaTunnel's native Zeta Engine. [Tongcheng Travel's published case study](https://seatunnel.apache.org/blog/tongcheng-travel-unified-data-channel-with-apache-seatunnel/) describes that architecture and its migration process.

At that scale, several aspects of SeaTunnel's design become especially useful. A large table needs to finish its initial load promptly. Many low-volume tables need their changes captured continuously. Destinations have different write capacities, and long-running jobs need to recover after interruptions. The platform must bring these workloads into one execution and operations model while putting its resources to work moving data.

SeaTunnel addresses these needs at several levels: a shorter execution path for each record, shared work across multi-table synchronization, lower per-task execution overhead, and parallelism and recovery mechanisms that support sustained data delivery.

Understanding those mechanisms is more useful than reading a throughput figure in isolation. It shows an engineering team where SeaTunnel can improve its own production workload, and which conditions determine the result.

<!-- truncate -->

<div style={{position: "relative", background: "#fff", paddingTop: "6%", marginBottom: "1rem"}}>
  <img src="/blog/seatunnel_performance/apache-seatunnel-logo.png" alt="" style={{position: "absolute", top: "0", right: "1%", width: "5.5%", height: "auto"}} />
  <img src="/blog/seatunnel_performance/mysql-history-and-changes.png" alt="MySQL history and binlog changes flow through an Apache SeaTunnel MySQL CDC source, optional transforms, and a selected target connector." style={{display: "block", width: "100%", height: "auto"}} />
</div>

*Figure 1. Historical data and ongoing changes share a connector-based synchronization lifecycle. The destinations are examples, not an automatic broadcast to every target. Delivery semantics depend on the selected connectors and configuration.*

## 1. A shorter path leaves more resources for useful work

SeaTunnel describes a synchronization job through three logical roles: Source, Transform, and Sink. They define where records come from, how they are processed, and where they go. Zeta turns this logical description into tasks that can be deployed and executed.

That separation also creates room for execution optimization. Before a record reaches its destination, it may spend a considerable amount of time simply moving between execution stages.

Cross-node transfer typically involves serialization, buffering, network transmission, reception, and deserialization. For relatively small operations such as field mapping, type conversion, and filtering, moving the record can account for a meaningful share of the work. Reducing those intermediate steps leaves more CPU and network capacity for reading, processing, and writing data.

Zeta's [execution-plan design](https://github.com/apache/seatunnel/blob/v3.0.0/docs/en/engines/zeta/about.md) explicitly aims to reduce network transfer. Where the execution plan permits it, adjacent tasks can be grouped into a TaskGroup and pass data locally. The actual grouping depends on the topology, parallelism, and any need to redistribute records.

This preserves the logical distinction between Source, Transform, and Sink while making the physical execution path more compact. It does not imply that every job runs without network transfer or that every operator can be fused into one group.

The benefit accumulates with data volume. Saving a small amount of work on a frequently traversed path matters when that path is used by every batch and every record. For an engineer investigating performance, this suggests a concrete next step: when both the source and destination have spare capacity, examine internal transfers, serialization, and task placement to find where the engine spends its resources.

<div style={{position: "relative", background: "#fff", paddingTop: "6%", marginBottom: "1rem"}}>
  <img src="/blog/seatunnel_performance/apache-seatunnel-logo.png" alt="" style={{position: "absolute", top: "0", right: "1%", width: "5.5%", height: "auto"}} />
  <img src="/blog/seatunnel_performance/zeta-parallel-execution.png" alt="A logical Source, Transform, and Sink flow is planned and scheduled into illustrative parallel execution instances." style={{display: "block", width: "100%", height: "auto"}} />
</div>

*Figure 2. The three lanes illustrate parallel execution, not a fixed thread layout, guaranteed scaling, or three concurrent MySQL binlog readers. Placement, task grouping, and parallelism follow the actual execution plan.*

## 2. Moving from one table to a database changes the resource equation

A large synchronization platform usually serves two different kinds of load: a smaller number of continuously busy jobs and many jobs whose tables change only intermittently.

The first group needs throughput. The second tests how many synchronization tasks the platform can sustain. That capacity depends partly on the threads, connections, and runtime state each task retains even when it has little data to process.

SeaTunnel addresses this through shared execution threads and CDC resource reuse.

### Share execution threads across tasks

Zeta's task execution service supports cooperative execution. Tasks suitable for shared execution enter a queue. A worker invokes a task's execution method, and once that call returns, the worker can serve another task. A task that has not finished can be scheduled again.

This allows many tasks to share execution threads rather than each retaining a dedicated thread for its entire lifetime.

Different tasks still have different execution requirements. In v3.0.0, [TaskExecutionService](https://github.com/apache/seatunnel/blob/v3.0.0/seatunnel-engine/seatunnel-engine-server/src/main/java/org/apache/seatunnel/engine/server/TaskExecutionService.java) also provides a blocking execution path with dedicated threads. It measures task invocation duration to manage long-running calls in cooperative execution. The design makes the relationship between task count and execution-thread count more flexible; it does not make every task nonblocking.

This is useful when table activity is uneven. Shared execution resources can serve tasks with work to do, giving a platform more control over thread-management overhead as its task count grows.

### Share log-reading work across tables

A database log contains changes from multiple tables. Building a completely independent synchronization job for every table can repeat log-reading, parsing, and related runtime work.

With MySQL CDC, one Source can select multiple tables and assign them to incremental reading tasks. In v3.0.0, `incremental.parallelism` defaults to `1`, so the selected tables can share one incremental log-reading path. Increasing that setting groups tables across incremental tasks; it does not split a single table's binlog stream across readers. This reuse is within the configured Source; independent jobs do not automatically share a global binlog reader.

For database-wide synchronization, this offers a practical way to organize related tables together, reuse common log-processing work, and route their records to the appropriate downstream processing paths.

### Keep the initial load and ongoing changes in one lifecycle

The MySQL CDC `initial` startup mode supports an initial snapshot followed by ongoing change capture. Snapshot work can be divided into splits, allowing the historical data to be read in parallel.

The subtle part is that the database continues to change while those splits are being read.

Consider the v3.0.0 path with the Source option `exactly_once=true`. Each snapshot split records binlog watermarks before and after reading its range. Changes between those watermarks are reconciled by key with the snapshot results. Subsequent incremental reading uses completed-split watermark information to identify overlapping events already covered by the snapshot phase.

This gives snapshot chunking and the transition to streaming explicit progress state. It lets engineers reason about both the speed of the initial load and how updates made during that load enter the resulting data.

The configuration boundary matters: **the MySQL CDC Source's `exactly_once` option defaults to `false` in v3.0.0**. That default path skips the snapshot backfill step described above. Source-side reconciliation, engine checkpoints, and sink commit semantics serve different purposes. An end-to-end consistency guarantee requires the appropriate combination to be configured and verified. Per-split reconciliation also does not constitute one globally atomic snapshot across the entire database.

<div style={{position: "relative", background: "#fff", paddingTop: "6%", marginBottom: "1rem"}}>
  <img src="/blog/seatunnel_performance/apache-seatunnel-logo.png" alt="" style={{position: "absolute", top: "0", right: "1%", width: "5.5%", height: "auto"}} />
  <img src="/blog/seatunnel_performance/mysql-cdc-handoff-and-recovery.png" alt="MySQL CDC v3.0.0 with exactly_once enabled uses per-split low and high watermarks, reconciles overlapping binlog changes, and restores split state and offsets from completed checkpoints." style={{display: "block", width: "100%", height: "auto"}} />
</div>

*Figure 3. The illustrated reconciliation path is specific to MySQL CDC v3.0.0 with Source `exactly_once=true`. Unfinished work may replay after recovery, and sink delivery guarantees require separate configuration.*

Together, these capabilities make SeaTunnel's value concrete: multi-table organization, shared log-processing work, parallel snapshot reads, and snapshot-to-streaming reconciliation are parts of the same integration framework.

## 3. Match parallelism to the work the whole pipeline can complete

SeaTunnel provides parallel execution. A production platform still has to decide how much parallelism each job should use.

Tongcheng Travel's implementation illustrates that distinction. Before submission, its platform probes source characteristics such as table row counts, directory sizes, and partition or bucket counts. It combines those observations with available cluster resources and sink-side rate limits to estimate task parallelism.

This estimation belongs to Tongcheng Travel's platform layer. SeaTunnel supplies the execution foundation; the surrounding platform uses its knowledge of data volume and capacity to generate suitable configurations. The case study should not be read as a claim that every SeaTunnel deployment automatically applies the same policy.

A useful parallelism choice has to fit three constraints.

**How much source work can run in parallel?** Splitting strategy, data distribution, and indexes influence read efficiency. Configuring more parallelism does not eliminate skew. If most of the remaining data sits in a few splits, the job can still wait for those slow splits to finish.

**How much execution capacity is available?** Reads and transformations consume CPU, memory, and network bandwidth. More concurrent tasks improve throughput only while the cluster can support the additional work.

**How quickly can the destination complete writes?** Batch sizes, connection counts, index maintenance, and commit behavior all affect the destination's capacity. Accounting for that capacity helps the entire pipeline operate at a balanced rate.

<div style={{position: "relative", background: "#fff", paddingTop: "6%", marginBottom: "1rem"}}>
  <img src="/blog/seatunnel_performance/apache-seatunnel-logo.png" alt="" style={{position: "absolute", top: "0", right: "1%", width: "5.5%", height: "auto"}} />
  <img src="/blog/seatunnel_performance/end-to-end-throughput.png" alt="Source capacity, execution capacity, and sink capacity jointly constrain throughput, with backpressure propagating upstream." style={{display: "block", width: "100%", height: "auto"}} />
</div>

*Figure 4. Tune the constrained stage instead of increasing parallelism blindly. This is a qualitative model, not a benchmark or a claim of linear scaling.*

During tuning, observe source reads, successful destination commits, and end-to-end latency together. These measurements show whether additional resources produce more successfully delivered data or merely move the queue to another part of the system.

Tongcheng Travel's approach also shows why a common job model helps platform teams. They can improve parallelism estimation centrally while application teams continue submitting work through existing interfaces.

## 4. Recovery cost is part of production performance

Once synchronization runs in production, performance includes what happens after an interruption.

How much data must be reread? Which state must be restored? How many writes must be repeated? Those costs affect both completion time and how much cluster capacity remains available for new data.

SeaTunnel uses the Pipeline as an important checkpoint and recovery boundary. Pipelines in the physical execution plan can have separate checkpoint coordination. For recoverable task-level failures, recovery can be scoped to the affected Pipeline instead of rolling back unrelated healthy Pipelines. Wider failures and exhausted retry policies can still affect the job or cluster.

The actual execution topology determines this boundary. A table is not automatically an independent Pipeline. A Source branching to several Sinks does not necessarily create separate recovery units either. Understanding how the plan is divided into Pipelines helps a platform team relate its business organization to its recovery scope.

Checkpoints preserve the progress information required by participating connectors, including read positions, split state, and write state. Recovery restores state from a completed checkpoint. With a Sink that supports the corresponding commit protocol, checkpoints can also coordinate destination commits and recovery.

These mechanisms help sustain useful throughput by containing recovery work and limiting how much data needs to be reprocessed. They do not remove recovery cost.

Checkpointing itself consumes resources. More frequent checkpoints generally require more state processing and storage work while providing a more recent recovery point. A production configuration should account for state size, checkpoint completion time, and the recovery time the workload can tolerate.

Tongcheng Travel monitors this operational layer explicitly. Its platform observes checkpoint end-to-end duration, state size, and failure frequency, alongside master election and failover metrics. That makes it easier to distinguish task-processing problems from control-plane problems.

The performance picture is therefore continuous: use resources efficiently during normal operation, constrain repeated work after failures, and use measurements to determine whether both goals are being met.

## From engine design to an evolving data platform

Tongcheng Travel's experience also shows how SeaTunnel can fit into a platform that has been running for years.

Existing tasks are translated centrally into SeaTunnel configurations. During migration, the legacy job remains the production baseline while the translated SeaTunnel job writes to an isolated destination. Output validation gates the cutover. The platform team can then improve connector integration, resource policies, and observability around a common runtime without replacing every application team's submission workflow.

At the record level, SeaTunnel reduces unnecessary transfer work. At the task level, shared execution and CDC resource reuse control overhead. At the platform level, a common configuration and batch-and-streaming execution model provide a foundation for centralized resource management, monitoring, and migration.

These layers explain where SeaTunnel's performance potential comes from. To evaluate it on a real workload, trace the execution boundaries a record crosses, identify the work shared across tables, test whether source and destination capacity support the proposed parallelism, and measure how much work recovery repeats.

The answers turn a general claim of high performance into an engineering assessment grounded in a specific deployment, configuration, and observed result.

## Sources and version scope

The implementation discussion in this article is scoped to Apache SeaTunnel **v3.0.0**, using its documentation and source code. It is not a claim about every release or connector, and this article does not report a new performance benchmark or fault-injection test.

The Tongcheng Travel case study summarizes a public Meetup presentation. **Tens of thousands refers to existing jobs in the migration scope, not a measured number of concurrently running jobs.** The published case does not provide a complete before-and-after performance dataset, so no throughput or resource-saving multiplier is inferred here.

- [Tongcheng Travel: a unified data channel with Apache SeaTunnel](https://seatunnel.apache.org/blog/tongcheng-travel-unified-data-channel-with-apache-seatunnel/)
- [Zeta Engine design, v3.0.0](https://github.com/apache/seatunnel/blob/v3.0.0/docs/en/engines/zeta/about.md)
- [TaskExecutionService, v3.0.0](https://github.com/apache/seatunnel/blob/v3.0.0/seatunnel-engine/seatunnel-engine-server/src/main/java/org/apache/seatunnel/engine/server/TaskExecutionService.java)
- [MySQL CDC configuration, v3.0.0](https://github.com/apache/seatunnel/blob/v3.0.0/docs/en/connectors/source/MySQL-CDC.md)
- [Snapshot split low and high watermarks, v3.0.0](https://github.com/apache/seatunnel/blob/v3.0.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-mysql/src/main/java/org/apache/seatunnel/connectors/seatunnel/cdc/mysql/source/reader/fetch/scan/MySqlSnapshotSplitReadTask.java#L137-L159)
- [Snapshot backfill and the exactly_once branch, v3.0.0](https://github.com/apache/seatunnel/blob/v3.0.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-mysql/src/main/java/org/apache/seatunnel/connectors/seatunnel/cdc/mysql/source/reader/fetch/scan/MySqlSnapshotFetchTask.java#L83-L123)

- [TaskGroup fusion and Pipeline recovery boundaries](https://github.com/apache/seatunnel/blob/v3.0.0/docs/en/architecture/engine/dag-execution.md)
- [Incremental parallelism configuration](https://github.com/apache/seatunnel/blob/v3.0.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-base/src/main/java/org/apache/seatunnel/connectors/cdc/base/option/SourceOptions.java#L75-L118)
- [Table grouping and incremental split watermarks](https://github.com/apache/seatunnel/blob/v3.0.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-base/src/main/java/org/apache/seatunnel/connectors/cdc/base/source/enumerator/IncrementalSplitAssigner.java#L213-L277)
- [Checkpoint coordination per Pipeline](https://github.com/apache/seatunnel/blob/v3.0.0/seatunnel-engine/seatunnel-engine-server/src/main/java/org/apache/seatunnel/engine/server/checkpoint/CheckpointManager.java#L119-L168)
