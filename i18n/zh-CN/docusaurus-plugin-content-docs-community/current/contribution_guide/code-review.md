# 代码评审指南

为了持续提升 Apache SeaTunnel 的代码质量，我们整理了这份代码评审指南。

我们希望 reviewer 和 committer 在评审过程中持续遵循这些要求，尤其是在文档、e2e 覆盖以及兼容性敏感改动方面。

## 面向 `dev` 分支 PR 的审批规则

GitHub 对 `dev` 分支的分支保护要求合并前至少有 1 个 approval。所有模块都遵循同一合并基线，包括 `seatunnel-api` 和 `seatunnel-engine` 等 core 模块：

1. **1 个 committer approval**
2. 自动化检查通过，例如 CI、代码风格检查和许可证校验

如果 reviewer 认为某个改动风险较高，可以要求**第二位 committer 进行 review**。这取决于 reviewer 的判断，而不是 PR 修改了哪些模块。例如：

- checkpoint 或序列化格式的变更
- `seatunnel-api` 中公开 API 的变更
- 通过 [STIP](./STIP.md) 提出的功能
- 不兼容变更

如果已经要求了第二位 committer review，在该 review 完成之前不要合并，即使 GitHub 显示 review check 已经通过。

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
