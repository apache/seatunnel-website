# Code Review Guidance

In order to continuously improve the quality of Apache SeaTunnel code, we have compiled a code review guide.

We hope that code reviewers strictly adhere to this guidance, especially in terms of document and e2e inspections.

1. Is the title of PR in compliance with regulations and the correct expression of meaning
2. Is there any issue link related to bugs in the description of PR, and is there a design document link for major modifications.
3. Check if documents have been added/changed, and if the document description is correct. A good example is https://github.com/apache/incubator-seatunnel/pull/4590
4. Check whether to add e2e and the correctness of e2e test (function coverage and result data validation, including whether to cover all supported data types, check whether the columns between the source and target should be aligned, the number of rows should be aligned, and the data in each row should also be aligned). A good example is https://github.com/apache/incubator-seatunnel/tree/dev/seatunnel-e2e/seatunnel-connector-v2-e2e/connector-clickhouse-e2e
5. Check if there are any incompatible changes (especially modifications to parameters, with special attention paid. If incompatible changes are indeed needed, they need to be discussed by email)
6. Check CI results, license updates, etc
7. Enumerator update, check if the split snapshot and restore are correct, including whether the split allocation strategy is stable
8. Reader update, check split snapshot and checkpoint lock range and various end conditions in pollnext
9. Sink update, check for two-stage submission of XXXCommitter (if any)
10. Writer updates, checking data refresh frequency, interval, memory like batch size, etc
11. After passing the above functional checks, please review the code style (ensuring that the functionality is based on the code style), and the style is related to personal preferences. You can also refer to this: https://shardingsphere.apache.org/community/cn/involved/conduct/code/