---
slug: mysql-cdc-snapshot-binlog-handoff
title: "MySQL CDC parallelism is set to 8. Why are all eight readers on the same table?"
tags: [SeaTunnel, MySQL, CDC, "Data Engineering"]
authors:
  - name: David Zollo
    title: Apache SeaTunnel Contributor
    url: https://github.com/davidzollo
    image_url: https://github.com/davidzollo.png
---

# MySQL CDC parallelism is set to 8. Why are all eight readers on the same table?

You set Apache SeaTunnel’s MySQL CDC parallelism to 8 and configure 12 tables, yet almost all the reads are coming from one large orders table. Is the split assigner broken? Not necessarily. **Parallelism tells you how many pieces of work readers can handle at once. It doesn’t tell you how many different tables those pieces come from. One large table can keep all eight readers busy.**

There are two separate things to understand: how snapshot splits are assigned, and how a split reconciles the table state it read with changes arriving in the binlog. The first determines whether you’re using the available capacity. The second determines whether you’re syncing the right data.

## Not eight tables, but up to eight splits being read

Given a suitable split key, the connector divides a table into key ranges such as `orders:[1,1000)` and `orders:[1000,2000)`. Each `SnapshotSplit` belongs to one table. Different readers can read different splits of the same table at the same time. On the source side, the number of distinct tables being read is bounded by the smaller of two numbers: the number of active snapshot readers and the number of tables to capture. How many tables are actually active depends on which splits are available, how they’re spread across tables, when readers finish their work, and how the scheduler assigns the next splits. This bound does not tell you how many tables the sink writes to at once. Writers route, buffer, and commit on their own schedule.

Here’s an example of how work might be assigned:

| Reader | At time A | At time B |
| --- | --- | --- |
| 1 | orders split 1 | orders split 4 |
| 2 | orders split 2 | customers split 1 |
| 3 | orders split 3 | products split 1 |

Three readers can be busy at both times, while the number of active tables goes from one to three. Conversely, in the default parallel snapshot path, if a table has no suitable split column, the source falls back to a single whole-table split only when `exactly_once = false`. With `true`, that branch fails rather than running in a degraded mode (see the [splitter implementation](https://github.com/apache/seatunnel/blob/3.1.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-base/src/main/java/org/apache/seatunnel/connectors/cdc/base/source/enumerator/splitter/AbstractJdbcSourceChunkSplitter.java#L67-L101)). Adding readers won’t subdivide a table that is read as a single split. The [SeaTunnel 3.1.0 FAQ](https://seatunnel.apache.org/docs/3.1.0/faq/) also distinguishes split keys from row identity: being able to read a row doesn’t mean the sink can uniquely identify it for an update or delete. In particular, a nullable unique index should not automatically be treated as a CDC primary key.

## A row deleted after the SELECT must not be brought back by the snapshot

Say the SQL SELECT for `orders:[1000,2000)` reads order 1042. A business transaction then deletes it while that split’s snapshot window is still open. If the snapshot row lands in the sink after the delete event, order 1042 comes back. A faster SELECT makes the race less likely, but it doesn’t change what the connector has to get right.

One way to see the reconciliation boundary is to place the split on the log timeline. LOW is the offset before reading the key range and HIGH is the offset after reading it. Changes for the range within that window are reconciled with the snapshot before the handoff to the binlog.

```text
LOW (before scan) → SELECT key range → HIGH (after scan) → later binlog
                  └── Apply window changes to the snapshot split ──┘
```

Take **SeaTunnel 3.1.0 on its first `initial` startup with source-side `exactly_once` enabled**. The [MySQL snapshot reader](https://github.com/apache/seatunnel/blob/3.1.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-mysql/src/main/java/org/apache/seatunnel/connectors/seatunnel/cdc/mysql/source/reader/fetch/scan/MySqlSnapshotSplitReadTask.java#L137-L159) records LOW and HIGH before and after the query. The [MySQL snapshot task](https://github.com/apache/seatunnel/blob/3.1.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-mysql/src/main/java/org/apache/seatunnel/connectors/seatunnel/cdc/mysql/source/reader/fetch/scan/MySqlSnapshotFetchTask.java#L76-L130) uses those offsets to create a bounded binlog backfill. If LOW and HIGH are equal, it emits the end marker without reading the log again. The [snapshot fetcher](https://github.com/apache/seatunnel/blob/3.1.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-base/src/main/java/org/apache/seatunnel/connectors/cdc/base/source/reader/external/IncrementalSourceScanFetcher.java#L148-L202) buffers snapshot rows by key, applies the changes from the window, and emits the reconciled split at END. If 1042 was already deleted by the end of the window, it should not be emitted as a snapshot row.

Two more conditions govern the handoff to incremental reads. First, there’s a scheduling gate. In the 3.1.0 hybrid read path, with one reader the snapshot phase can be marked complete once all split completion reports are in. With multiple readers, a checkpoint must succeed after all snapshot splits finish before the incremental split can be assigned. **If all snapshot splits are done but the binlog reader hasn’t started, check the checkpoint first.** Don’t assume the log is slow. This gate controls an engine phase transition. It does not guarantee a database commit. See [how the snapshot is marked complete](https://github.com/apache/seatunnel/blob/3.1.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-base/src/main/java/org/apache/seatunnel/connectors/cdc/base/source/enumerator/SnapshotSplitAssigner.java#L200-L225) and [when the incremental split is assigned](https://github.com/apache/seatunnel/blob/3.1.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-base/src/main/java/org/apache/seatunnel/connectors/cdc/base/source/enumerator/HybridSplitAssigner.java#L98-L117).

The second condition is log filtering. For each incremental group after the initial snapshot, the [assigner](https://github.com/apache/seatunnel/blob/3.1.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-base/src/main/java/org/apache/seatunnel/connectors/cdc/base/source/enumerator/IncrementalSplitAssigner.java#L252-L337) starts at the earliest HIGH among its splits and passes their key ranges and watermarks to the reader. Suppose split A has HIGH 100 and split B has HIGH 160. A change in A at position 120 can’t be dropped just because B’s snapshot went through 160. On the other hand, a record at 120 in B’s key range is already reflected in B’s emitted snapshot state. It should not be emitted again as a new change during the same phase. The [incremental fetcher](https://github.com/apache/seatunnel/blob/3.1.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-base/src/main/java/org/apache/seatunnel/connectors/cdc/base/source/reader/external/IncrementalSourceStreamFetcher.java#L266-L318) checks split ranges and watermarks until it reaches the table’s highest snapshot watermark. At or beyond the largest HIGH for that table, it switches to pure incremental processing. The comparison uses the connector’s offset objects, not subtraction between timestamps or positions in different log files. The numbers 100, 120, and 160 are illustrative positions in one log sequence, not actual log data.

With source-side `exactly_once` disabled, 3.1.0 skips the per-split backfill and starts the initial handoff at the earliest LOW among the relevant splits. Don’t assume the two modes have the same intermediate output, replay behavior, or downstream visibility. Neither mode provides an atomic point-in-time snapshot across tables and databases, much less a JDBC sink commit guarantee. Netflix’s [DBLog paper](https://arxiv.org/abs/2010.12597) uses watermarks to address a similar race, but its markers and scheduling differ from SeaTunnel’s.

## What should you tune first?

1. **Look at the distribution of split completion times before raising snapshot parallelism.** If most readers are waiting and one slow split is left, look at the split key and data skew first. If they’re all busy, check MySQL query load, replication lag, and sink throughput.
2. **Distinguish split size from fetch size.** `snapshot.split.size` changes how finely the work is divided. `snapshot.fetch.size` changes the number of rows fetched per batch during snapshot reads. Smaller splits may shorten the tail, but they create more overhead. Larger fetches may cut round trips, but increase memory pressure on the reader. Change one setting at a time and compare the same workload.
3. **Measure binlog catch-up separately.** In 3.1.0, `incremental.parallelism` controls binlog reader parallelism separately and defaults to 1. The assigner distributes captured tables round-robin across groups and skips empty groups. It doesn’t partition the binlog of one hot table by primary key range. The setting specifies a group count; it doesn’t add source readers to the job. Check the actual source parallelism, available readers, and MySQL replication client ID range together. If you capture one table, increasing the setting won’t split it across multiple incremental groups. Multiple groups also don’t imply global transaction order across groups. First determine whether log reading, transformation, or sink commits are the bottleneck.
4. **Treat binlog retention as a time budget.** Keep logs long enough for the initial snapshot, foreseeable downtime and recovery, and some catch-up headroom. Monitor the oldest required offset and disk usage. Don’t wait until the binlog has been purged to decide whether to recover from a usable offset or rebuild the sink.
5. **Test with writes that can expose a race.** In a controlled test, use phase logs or test hooks to confirm that writes land in the intended window. Then update or delete a key in the active split and insert a key in a different range. After catch-up, check the results by primary key. If possible, repeat with an interrupted snapshot and recovery. Writing a row sometime after startup doesn’t prove you hit a watermark boundary. A test that leaves the total row count unchanged is useful precisely because a count-based check can miss the bug.

The goal isn’t to see every reader marked busy. It’s to get the slowest snapshot split finished as early as the source can handle, and then hand off to the binlog without skipping changes or overwriting a newer state with an older one. Measure those two things separately so you know which part your tuning actually improved.
