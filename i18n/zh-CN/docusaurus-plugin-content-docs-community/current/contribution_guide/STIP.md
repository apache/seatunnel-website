# SeaTunnel 改进提案（STIP）

## 什么是 STIP？

**SeaTunnel 改进提案（SeaTunnel Improvement Proposal，简称 STIP）** 是向 Apache SeaTunnel
提出重大新功能、架构变更或重要改进的标准流程。每个 STIP 以 GitHub Issue 的形式存在，Issue
标题带有递增的序号前缀（例如 `[STIP-23] ...`）。

STIP 是记录"为什么要做这个功能"、"应该如何设计"以及"预期产出是什么"的唯一可信来源。它让社区对
计划中的工作保持可见性，留下设计决策的永久记录，帮助新贡献者了解项目的发展方向。

## 什么时候需要创建 STIP？

当你的提案涉及以下一项或多项时，请创建 STIP：

- 新的核心功能，或对现有行为的重大变更
- 对 SeaTunnel API 或 Connector SPI 的修改
- 新的引擎集成，或引擎层面的重大变更
- 影响多个模块的架构决策
- 需要社区达成共识才能开始实施的变更

以下情况**不需要** STIP：

- Bug 修复
- 文档更新
- 小幅改进或重构
- 新增连接器（除非涉及 API 或 SPI 的改动）

## STIP 的生命周期

每个 STIP 会经历以下状态：

| 状态              | 含义                                                                                      |
|-----------------|-------------------------------------------------------------------------------------------|
| **草稿（Draft）**   | 提案正在撰写中，尚未准备好供社区讨论。                                                         |
| **审议中（Under Review）** | Issue 已开启，社区正在 GitHub 和/或邮件列表上讨论。                                        |
| **已接受（Accepted）** | 社区已达成共识，可以开始实施。                                                               |
| **已拒绝（Rejected）** | 社区决定不推进该提案，Issue 已关闭并附有明确说明。                                           |
| **已实现（Implemented）** | 功能已合并，对应 Issue 已关闭。                                                           |

提案作者应在提案推进过程中及时更新 Issue 的当前状态。

## STIP 编号规则

STIP 按创建顺序依次编号。要确认当前最大编号并计算下一个编号，请浏览完整列表：

> https://github.com/apache/seatunnel/issues?q=is%3Aissue+label%3Adesign+sort%3Acreated-asc

以下是几个有代表性的参考示例：

| 编号     | 标题                                                               | Issue                                                                 | 状态         |
|---------|--------------------------------------------------------------------|-----------------------------------------------------------------------|--------------|
| STIP-1  | 将连接器与计算引擎解耦                                                | [#1608](https://github.com/apache/seatunnel/issues/1608)             | 已实现        |
| STIP-5  | ST-Engine 设计与任务跟踪                                              | [#2272](https://github.com/apache/seatunnel/issues/2272)             | 已实现        |
| STIP-12 | CDC 连接器设计                                                       | [#3175](https://github.com/apache/seatunnel/issues/3175)             | 已实现        |
| STIP-15 | 脏数据收集设计                                                        | [#4587](https://github.com/apache/seatunnel/issues/4587)             | 已接受        |
| STIP-21 | 支持流量染色（采样）与上下文感知指标                                      | [#10305](https://github.com/apache/seatunnel/issues/10305)           | 审议中        |

下一个新提案应编号为 **STIP-23**。

## 如何提交 STIP

### 第一步 — 在邮件列表预沟通

在正式开启 STIP 之前，建议先向 `dev@seatunnel.apache.org`
发一封简短的邮件，描述你要解决的问题及大致思路。
提前获取反馈有助于避免在社区不会接受的方向上浪费时间，也可能发现你尚不了解的相关工作。

### 第二步 — 确认下一个可用编号

浏览 [STIP 完整列表](https://github.com/apache/seatunnel/issues?q=is%3Aissue+label%3Adesign+sort%3Acreated-asc)，
确认当前最大编号，加一即为新编号。

### 第三步 — 开启 GitHub Issue

前往 [apache/seatunnel Issues](https://github.com/apache/seatunnel/issues/new/choose)，
创建一个新 Issue，要求：

- **标题：** `[STIP-N] [模块] 简短描述`
  （例如：`[STIP-23] [Connector] 支持多 Catalog 数据源`）

按照下方的 [STIP 内容模板](#stip-内容模板) 填写 Issue 正文。

### 第四步 — 推动讨论达成共识

及时回复评论，随设计演进更新提案，最终推动提案进入终态：**已接受** 或 **已拒绝**。
对于影响范围较大或存在争议的提案，建议在标记为"已接受"之前先在
`dev@seatunnel.apache.org` 上进行显式讨论。

### 第五步 — 在 PR 中关联 STIP

提交实现 PR 时，在 PR 描述中引用 STIP Issue 编号
（例如 `Closes #NNNN` 或 `Part of STIP-N`）。

## STIP 内容模板

创建 STIP Issue 时，请使用以下结构填写正文。
不适用的章节可删除，但不要留空。

```markdown
## 背景（Background）

<!-- 描述本提案要解决的问题或机会。提供足够的上下文，使不熟悉该领域的
     读者也能理解其重要性。 -->

## 动机（Motivation）

<!-- 说明当前状态为何不足，以及解决这个问题对项目的价值所在。 -->

## 目标（Goals）

<!-- 列出本提案希望达成的具体结果，每条以动词开头：
       - 支持在 Kafka Source 中读取嵌套 Schema
       - ...                                    -->

## 非目标（Non-Goals）

<!-- 明确说明本提案不打算覆盖的范围，防止评审过程中出现范围蔓延。 -->

## 设计方案（Design）

<!-- 以足够的细节描述提议的解决方案，使有经验的贡献者能够据此实施。包括：
       - 新增或修改的关键接口 / API / 配置项
       - 必要时提供数据流图或时序图
       - 与现有组件的交互方式                            -->

## 兼容性、废弃与迁移计划（Compatibility, Deprecation, and Migration Plan）

<!-- 描述任何不向后兼容的变更，以及现有用户应如何迁移。
     若完全向后兼容，请明确声明。 -->

## 测试计划（Test Plan）

<!-- 说明如何对本次变更进行测试：单元测试、集成测试、性能基准等。 -->

## 备选方案（Alternatives Considered）

<!-- 描述你评估过的其他方案，并解释为何最终选择了本提案的设计。 -->

## 参考资料（References）

<!-- 相关 Issue、PR、论文或已有工作的链接。 -->
```
