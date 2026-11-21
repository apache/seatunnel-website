---
slug: mysql-cdc-snapshot-binlog-handoff
title: "MySQL CDC 并行度开到 8，为什么 8 个 reader 都在读同一张表？"
tags: [SeaTunnel, MySQL, CDC, "Data Engineering"]
authors:
  - name: David Zollo
    title: Apache SeaTunnel Contributor
    url: https://github.com/davidzollo
    image_url: https://github.com/davidzollo.png
---

# MySQL CDC 并行度开到 8，为什么 8 个 reader 都在读同一张表？

把 Apache SeaTunnel 的 MySQL CDC 并行度设成 8，配置了 12 张表，然后发现正在读取的几乎都是同一张订单大表。是不是分配器坏了？未必。**并行度描述读者能同时做多少份工作；它不承诺这些工作来自多少张不同的表。同一张大表完全可能把 8 路跑满。**

理解这句话，要画两张图：一张是快照分片如何分配，另一张是单个分片如何把读到的表状态和正在发生的 binlog 变更接起来。第一张图决定你是否跑满资源，第二张图决定你有没有同步错。

## 不是 8 张表，而是最多 8 个正在读取的分片

有合适的切分键时，连接器把一张表拆成若干键范围，形如 `orders:[1,1000)` 和 `orders:[1000,2000)`。一个 `SnapshotSplit` 隶属一张表；不同 reader 可以同时读同一张表的不同分片。只计算源端正在读取的不同表，其上界是活跃快照 reader 数和待捕获表数二者的较小值。在它之下，具体会有几张表同时活跃，要看可分配分片、表的分片分布、reader 完成时机和实际调度。这个上界不是目标端同时写表数；writer 的路由、缓存和提交有自己的时序。

举个调度示意：

| Reader | 时刻 A | 时刻 B |
| --- | --- | --- |
| 1 | orders 分片 1 | orders 分片 4 |
| 2 | orders 分片 2 | customers 分片 1 |
| 3 | orders 分片 3 | products 分片 1 |

两个时刻的并行读数都能是 3；活跃表数却可以从 1 变成 3。反过来，在默认的并发读分析路径里，如果一张表找不到合适的切分列，源端 `exactly_once = false` 才会回退成单个全表分片；若设为 `true`，该分支直接报错，不是退化运行（[分片器实现](https://github.com/apache/seatunnel/blob/3.1.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-base/src/main/java/org/apache/seatunnel/connectors/cdc/base/source/enumerator/splitter/AbstractJdbcSourceChunkSplitter.java#L67-L101)）。对适合单分片的表，多配 reader 并不会自动把该分片切开。[SeaTunnel 3.1.0 FAQ](https://seatunnel.apache.org/docs/3.1.0/faq/) 还区分了切分键和行身份：能读出一行，不等于目标能够唯一定位这一行来更新或删除。可空的唯一索引尤其不能直接视为 CDC 主键。

## SELECT 扫过以后被删掉的行，不能再被快照写回来

假设 `orders:[1000,2000)` 的 SQL SELECT 已读到 1042 号订单，随后业务事务删除了它，而且删除发生在该分片快照窗口内。如果系统任由快照行晚于删除事件落入目标，1042 就会被“复活”。这个问题用更快的 SELECT 缩小了概率，却没有改变正确性条件。

理解合并边界的好办法，是把分片画在日志位置上：

```text
LOW（读前位置） → SELECT 该键区间 → HIGH（读后位置） → 后续 binlog
                  └── 取窗口内相关变更，与分片快照对账 ──┘
```

以 **SeaTunnel 3.1.0、首次 `initial` 启动并启用源端 `exactly_once`** 为例，[MySQL 快照读取](https://github.com/apache/seatunnel/blob/3.1.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-mysql/src/main/java/org/apache/seatunnel/connectors/seatunnel/cdc/mysql/source/reader/fetch/scan/MySqlSnapshotSplitReadTask.java#L137-L159) 在查询前后记录 LOW、HIGH；[MySQL 快照任务](https://github.com/apache/seatunnel/blob/3.1.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-mysql/src/main/java/org/apache/seatunnel/connectors/seatunnel/cdc/mysql/source/reader/fetch/scan/MySqlSnapshotFetchTask.java#L76-L130) 用这对位置创建有限范围的 binlog 补读任务；若 LOW 与 HIGH 相同，直接发结束标记，不额外读日志。[快照 fetcher](https://github.com/apache/seatunnel/blob/3.1.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-base/src/main/java/org/apache/seatunnel/connectors/cdc/base/source/reader/external/IncrementalSourceScanFetcher.java#L148-L202) 把快照行放入按键索引的缓冲区，把区间内的变更合进去，等到 END 再输出归并后的分片。1042 在窗口结束时已被删除，就不应作为有效快照行输出。

从快照接到增量还有两个条件。先是调度门槛：在 3.1.0 的混合读取路径里，单 reader 收齐分片完成上报即可标记快照阶段完成；多 reader 需要等到所有快照分片完成后有一次成功的 checkpoint，才能把增量 split 发下去。**快照分片都读完、binlog reader 还没启动时，先查 checkpoint**，再判断是不是日志读取太慢。这个门槛控制引擎阶段切换，不是数据库提交保证。见[快照完成判定](https://github.com/apache/seatunnel/blob/3.1.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-base/src/main/java/org/apache/seatunnel/connectors/cdc/base/source/enumerator/SnapshotSplitAssigner.java#L200-L225)和[增量发放条件](https://github.com/apache/seatunnel/blob/3.1.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-base/src/main/java/org/apache/seatunnel/connectors/cdc/base/source/enumerator/HybridSplitAssigner.java#L98-L117)。

再是日志过滤。对于首次快照后的每个增量分组，[分配器](https://github.com/apache/seatunnel/blob/3.1.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-base/src/main/java/org/apache/seatunnel/connectors/cdc/base/source/enumerator/IncrementalSplitAssigner.java#L252-L337) 从其覆盖分片的最早 HIGH 起读，并把各分片的键范围和水位一起交给读者。例如，分片 A 的 HIGH 是 100，B 是 160：A 在位置 120 有一条变更，不能因为 B 已扫到 160 就丢掉。反过来，落在 B 范围内、位置 120 的记录，已反映在 B 输出的分片状态中，不应作为同一阶段的新变更再发一次。[增量 fetcher](https://github.com/apache/seatunnel/blob/3.1.0/seatunnel-connectors-v2/connector-cdc/connector-cdc-base/src/main/java/org/apache/seatunnel/connectors/cdc/base/source/reader/external/IncrementalSourceStreamFetcher.java#L266-L318) 在到达对应表的快照高水位上界前执行分片范围和水位判断，达到该表各分片的最大 HIGH（代码是大于等于）时进入纯增量路径。这个比较用的是连接器 offset 对象，不是对时间戳或跨文件 position 作减法。这里的 100、120、160 是同一日志序列上的示意，不是实际日志。

若关闭源端 `exactly_once`，3.1.0 跳过这种分片内补读，首次衔接从相关分片的最早 LOW 起步；不能把两种模式的中间输出、重放和下游可见性视为一样。两种情况也都不是跨库跨表的同一时点原子快照，更不是 JDBC sink 的提交保证。Netflix 的 [DBLog 论文](https://arxiv.org/abs/2010.12597) 用 watermark 解决同类竞争，具体标记和调度方式与 SeaTunnel 不同。

## 怎样知道该调哪个参数？

1. **提高快照并行度前，先看分片完成时间分布。** 读者大多在等且只剩一个长尾分片，优先查切分键与数据倾斜；如果读者都忙，先看 MySQL 查询负载、复制延迟和目标端吞吐。
2. **区分分片大小和每次抓取大小。** `snapshot.split.size` 控制快照的切分粒度。`snapshot.fetch.size` 为正时，SeaTunnel 会把该值传给 JDBC 的 `setFetchSize`。使用 MySQL Connector/J 时，只有启用了 [`useCursorFetch`](https://dev.mysql.com/doc/connector-j/en/connector-j-connp-props-performance-extensions.html)，正的 fetch size 才会控制游标每次取多少行；驱动默认不开这个选项。缩小分片可能缩短长尾，也会增加分片开销。不要仅凭 fetch size 推断网络往返或内存变化；在相同连接和负载下，一次只改一项再对比。
3. **单独量 binlog 追平速度。** 3.1.0 把 binlog 读并行度单列为 `incremental.parallelism`，默认 1；分配器把待捕获的表轮转分组，跳过空组，不是按主键范围拆一张热表的 binlog。它描述的是分组数，不会替作业增加 Source reader；验证时同时核对实际 Source 并行度、可用 reader 和 MySQL 复制客户端 ID 范围。只同步一张表时，提高这个值不会把该表拆成多个增量组；多组也不等于跨组全局事务顺序。先确认瓶颈在日志读取、转换还是目标提交。
4. **把日志保留当成时间预算。** 保留窗口要覆盖全量时间、可预见的停机恢复时间和追平的余量，同时监控最旧所需位点和日志磁盘占用。不允许等到 binlog 清掉才决定是从可用位点恢复，还是重建目标。
5. **用对抗性写入验收。** 在受控测试里用 phase 日志或测试钩子确认写入落在预定窗口，再修改或删除当前分片中的键，同时新增另一范围中的键。追平后按主键核对结果；条件允许时对快照中断恢复再做一次。只是在任务启动后随手写一行，不能证明碰到了水位边界。总行数不变，是真正有效的测试条件之一，因为它能绕过最容易误判的监控。

快照优化的目标不是所有 reader 都显示忙，而是在源端负载允许的范围内尽早完成最慢分片，并且在接入 binlog 时没有跳过或倒写业务状态。把这两条分别测量，才能知道调优做对了哪一半。
