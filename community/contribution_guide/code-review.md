# Code Review Guidance

To continuously improve the quality of Apache SeaTunnel code, we have compiled this code review guide.

We expect reviewers and committers to follow this guidance consistently, especially for documentation, e2e coverage, and compatibility-sensitive changes.

## Approval policy for PRs targeting `dev`

GitHub currently shows the `dev` branch as requiring only one approval before merge. This is only the global branch protection baseline.

By community consensus, PRs that modify core modules still require **two committer approvals** before merge. GitHub cannot enforce this per-module rule automatically today, so reviewers and committers must inspect the changed files manually. If a PR touches core modules but does not yet have two committer approvals, do not merge it even if GitHub reports that the required review check has passed.

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
