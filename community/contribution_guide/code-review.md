# Code Review Guidance

To continuously improve the quality of Apache SeaTunnel code, we have compiled this code review guide.

We expect reviewers and committers to follow this guidance consistently, especially for documentation, e2e coverage, and compatibility-sensitive changes.

## Approval policy for PRs targeting `dev`

GitHub currently shows the `dev` branch as requiring only one approval before merge. This is only the global branch protection baseline.

For PRs that **do not** touch core modules, the merge baseline is:

1. **One committer approval**
2. Passing automated bot checks, such as CI, code style, and license validation
3. At least one collaborator or AI bot review, where applicable

The following modules are considered core and therefore still require **two committer approvals** before merge:

- `seatunnel-api`
- `seatunnel-engine/seatunnel-engine-core`
- `seatunnel-engine/seatunnel-engine-server`
- `seatunnel-engine/seatunnel-engine-client`
- `seatunnel-engine/seatunnel-engine-common`
- `seatunnel-engine/seatunnel-engine-serializer`
- `seatunnel-engine/seatunnel-engine-storage`

All other modules, including connectors, transforms, e2e tests, documentation, and tooling, follow the relaxed baseline above as long as they do not modify any of the core modules listed here.

This policy is determined by **module scope**, not by the number of changed files or lines of code. If a PR touches any core module, the stricter **two committer approvals** rule applies to the whole PR.

GitHub cannot enforce this per-module rule automatically today, so reviewers and committers must inspect the changed files manually. If a PR touches core modules but does not yet have two committer approvals, do not merge it even if GitHub reports that the required review check has passed.

## General review checklist

1. Check whether the PR title follows project conventions and accurately describes the change.
2. Check whether bug fixes link the related issue, and whether major changes link a design document.
3. Check whether documentation has been added or updated when needed, and whether the documentation is correct. A good example is [PR #4590](https://github.com/apache/seatunnel/pull/4590).
4. Check whether e2e tests should be added, and whether the e2e coverage is correct. Review both function coverage and result validation, including supported data types, source and target column alignment, row counts, and row-level data correctness. A good example is the [ClickHouse e2e case](https://github.com/apache/seatunnel/tree/dev/seatunnel-e2e/seatunnel-connector-v2-e2e/connector-clickhouse-e2e).
5. Check whether the change introduces incompatible behavior, especially parameter changes. If an incompatible change is really necessary, it should be discussed on the mailing list first.
6. Check CI results, license updates, and other release-readiness signals.

## Component-specific review checklist

7. For enumerator changes, check whether split snapshot and restore are correct, and whether the split allocation strategy remains stable.
8. For reader changes, check split snapshot handling, checkpoint lock scope, and all end conditions in `pollNext`.
9. For sink changes, check whether two-phase commit logic in `XXXCommitter` (if any) is still correct.
10. For writer changes, check data flush frequency, flush interval, memory usage, batch size, and other resource-sensitive behavior.
11. After the functional checks above pass, review the code style. Code style should support readability without weakening functional correctness. For additional style references, see [ShardingSphere's code conduct guide](https://shardingsphere.apache.org/community/cn/involved/conduct/code/).
