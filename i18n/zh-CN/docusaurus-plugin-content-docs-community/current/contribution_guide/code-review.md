# 代码评审指南

为了持续提升 Apache SeaTunnel 的代码质量，我们整理了这份代码评审指南。

我们希望 reviewer 和 committer 在评审过程中持续遵循这些要求，尤其是在文档、e2e 覆盖以及兼容性敏感改动方面。

## 面向 `dev` 分支 PR 的审批规则

GitHub 当前展示的 `dev` 分支合并门槛是只需要 1 个 approval。但这只是全局分支保护的基础要求。

对于**不涉及 core 模块**的 PR，合并基线为：

1. **1 个 committer approval**
2. 自动化检查通过，例如 CI、代码风格检查和许可证校验
3. 在适用的情况下，至少有 1 个 collaborator 或 AI bot review

以下模块被视为 core 模块，因此仍然要求 **2 个 committer approvals** 后才能合并：

- `seatunnel-api`
- `seatunnel-engine/seatunnel-engine-core`
- `seatunnel-engine/seatunnel-engine-server`
- `seatunnel-engine/seatunnel-engine-client`
- `seatunnel-engine/seatunnel-engine-common`
- `seatunnel-engine/seatunnel-engine-serializer`
- `seatunnel-engine/seatunnel-engine-storage`

其他模块，包括 connectors、transforms、e2e tests、documentation 和 tooling，只要没有修改上面列出的任何 core 模块，就遵循前面的放宽基线。

这条规则按**模块范围**判断，而不是按修改文件数或代码行数判断。只要一个 PR 触及任意 core 模块，整条 PR 就必须遵循 **2 个 committer approvals** 的更严格规则。

由于 GitHub 当前还不能自动按模块范围强制执行这条规则，因此 reviewer 和 committer 需要手动检查改动文件。如果一个 PR 触及了 core 模块，但还没有拿到 2 个 committer approvals，即使 GitHub 显示 review check 已经通过，也不要合并。

## 通用评审检查项

1. 检查 PR 标题是否符合项目规范，是否准确表达了改动内容。
2. 检查 bug 修复类 PR 是否关联了对应 issue，重大改动是否附带了设计文档。
3. 检查是否需要补充或更新文档，以及文档内容是否正确。一个较好的参考示例是 [PR #4590](https://github.com/apache/seatunnel/pull/4590)。
4. 检查是否需要补充 e2e 测试，以及 e2e 覆盖是否正确。这里不仅要看功能覆盖，还要看结果校验是否充分，包括支持的数据类型、源端和目标端字段对齐、行数对齐，以及逐行数据内容是否正确。一个较好的参考示例是 [ClickHouse e2e 用例](https://github.com/apache/seatunnel/tree/dev/seatunnel-e2e/seatunnel-connector-v2-e2e/connector-clickhouse-e2e)。
5. 检查这次改动是否引入了不兼容行为，尤其是参数变更。如果确实需要做不兼容改动，应先通过邮件列表讨论。
6. 检查 CI 结果、许可证更新以及其他发布准备信号。

## 组件维度评审检查项

7. 对于 enumerator 改动，要检查 split snapshot 和 restore 是否正确，以及 split 分配策略是否仍然稳定。
8. 对于 reader 改动，要检查 split snapshot 处理、checkpoint lock 的作用范围，以及 `pollNext` 中的各种结束条件。
9. 对于 sink 改动，要检查 `XXXCommitter`（如果存在）中的两阶段提交逻辑是否仍然正确。
10. 对于 writer 改动，要检查数据刷新频率、刷新间隔、内存占用、batch size 以及其他资源敏感行为。
11. 在以上功能性检查通过后，再检查代码风格。代码风格应当服务于可读性，但不能削弱功能正确性。更多风格参考可见 [ShardingSphere 的代码规范说明](https://shardingsphere.apache.org/community/cn/involved/conduct/code/)。
