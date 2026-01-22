# 成为 Apache SeaTunnel Committer

SeaTunnel Project Management Committee (PMC) 负责评估候选人的贡献。

与许多 Apache 项目一样，SeaTunnel 欢迎所有贡献，包括代码贡献、博客文章、新用户指南、公开演讲以及以各种方式增强项目。

## 成为 Committer
要开始为 SeaTunnel 做贡献，请了解如何贡献——任何人都可以向项目提交补丁、文档和示例。

PMC 会根据积极贡献者对 SeaTunnel 的贡献定期增加新的 Committer。新 Committer 的资格包括：

* **持续为 SeaTunnel 做贡献**：Committer 应该有对 SeaTunnel 做主要贡献的历史。理想的 Committer 应该在整个项目中都有广泛的贡献，并且至少贡献了一个主要组件，并在其中扮演了“所有者”的角色。所有者角色意味着现有贡献者认为他们应该让这个人来运行这个组件的补丁。
* **贡献质量**：Committer 比任何其他社区成员都更应该提交简单、经过良好测试和设计良好的补丁。此外，他们应该表现出足够的专业知识来审查补丁，包括确保它们符合 SeaTunnel 的工程实践（可测试性、文档、API 稳定性、代码风格等）。Committer 团队集体负责 SeaTunnel 的软件质量和可维护性。请注意，对 SeaTunnel 关键部分（如核心和 SQL 模块）的贡献在评估质量时将有更高的标准。这些领域的贡献者将面临对其更改的更多审查。
* **社区参与**：Committer 在所有社区互动中都应该有建设性和友好的态度。他们还应该活跃在开发和用户列表中，并帮助指导新的贡献者和用户。在设计讨论中，即使面对分歧，Committer 也应该保持专业和外交的态度。

## Committer

### 提名新 Committer
在 SeaTunnel 中，**新 Committer 提名**只能由现有的 PMC 成员正式启动。如果新 Committer 觉得他/她有资格，他/她应该联系任何现有的 PMC 成员并进行讨论。如果在 PMC 的一些成员之间达成一致，该过程将启动。

建议采取以下步骤（仅由现有 PMC 成员发起）：
1. 发送标题为 `[DISCUSS] Promote xxx as new committer` 的电子邮件到 `private@seatunnel.apache.org`。列出候选人的重要贡献，以便你可以为你的提案收集其他 PMC 成员的支持。
2. 保持讨论开放超过 3 天但不超过 1 周，除非有任何明确的反对或担忧。
3. 如果 PMC 普遍同意该提案，请发送标题为 `[VOTE] Promote xxx as new committer` 的电子邮件到 `private@seatunnel.apache.org`。
4. 保持投票过程开放超过 3 天，但不超过 1 周。如果有三个 +1 票且 +1 票 > -1 票，则视为 `Consensus Approval`。
5. 发送标题为 `[RESULT][VOTE] Promote xxx as new committer` 的电子邮件到 `private@seatunnel.apache.org`，并列出投票详情，包括选民是谁。

### 邀请新 Committer
发起晋升的 PMC 成员负责向新 Committer 发送邀请，并指导他/她设置 ASF 环境。

PMC 成员应使用以下模板向新 Committer 发送电子邮件：

```
To: <invitee name>@gmail.com
Cc: private@seatunnel.apache.org
Subject: Invitation to become SeaTunnel committer: <invitee name>

Hello <invitee name>,

The SeaTunnel Project Management Committee (PMC) 
hereby offers you committer privileges to the project. These privileges are
offered on the understanding that you'll use them
reasonably and with common sense. We like to work on trust
rather than unnecessary constraints.

Being a committer enables you to more easily make 
changes without needing to go through the patch 
submission process. 

Being a committer does not require you to 
participate any more than you already do. It does 
tend to make one even more committed.  You will 
probably find that you spend more time here.

Of course, you can decline and instead remain as a 
contributor, participating as you do now.

A. This personal invitation is a chance for you to 
accept or decline in private.  Either way, please 
let us know in reply to the [private@SeaTunnel.apache.org] 
address only.

B. If you accept, the next step is to register an iCLA:
    1. Details of the iCLA and the forms are found 
    through this link: http://www.apache.org/licenses/#clas

    2. Instructions for its completion and return to 
    the Secretary of the ASF are found at
    http://www.apache.org/licenses/#submitting

    3. When you transmit the completed iCLA, request 
    to notify the Apache SeaTunnel and choose a 
    unique Apache id. Look to see if your preferred 
    id is already taken at 
    http://people.apache.org/committer-index.html     
    This will allow the Secretary to notify the PMC 
    when your iCLA has been recorded.

When recording of your iCLA is noticed, you will 
receive a follow-up message with the next steps for 
establishing you as a committer.
```

### 邀请接受流程
新 Committer 应回复 `private@seatunnel.apache.org`（选择“回复所有人”），并表达他/她接受邀请的意愿。然后，此邀请将被视为项目 PMC 已接受。当然，新 Committer 也可以选择拒绝邀请。

一旦邀请被接受，新 Committer 必须采取以下步骤：
1. 订阅 `dev@seatunnel.apache.org`。通常这已经完成。
2. 选择一个未在 [apache committers list page](http://people.apache.org/committer-index.html) 上的 Apache ID。
3. 下载 [ICLA](https://www.apache.org/licenses/icla.pdf)（如果新 Committer 作为日常工作为项目做出贡献，则需要 [CCLA](http://www.apache.org/licenses/cla-corporate.pdf)）。
4. 用正确的信息填写 `icla.pdf`（或 `ccla.pdf`）后，打印并手写签​​名，扫描为 PDF，并作为附件发送到 [secretary@apache.org](mailto:secretary@apache.org)。（如果首选电子签名，请按照 [此页面](http://www.apache.org/licenses/contributor-agreements.html#submitting) 上的步骤操作）
5. PMC 将等待 Apache 秘书确认已提交的 ICLA（或 CCLA）。新 Committer 和 PMC 将收到以下电子邮件：

```
Dear XXX,

This message acknowledges receipt of your ICLA, which has been filed in the Apache Software Foundation records.

Your account has been requested for you and you should receive email with next steps
within the next few days (can take up to a week).

Please refer to https://www.apache.org/foundation/how-it-works.html#developers
for more information about roles at Apache.
```

如果帐户尚未被请求，PMC 成员应联系项目 V.P.。V.P.可以通过 [Apache Account Submission Helper Form](https://whimsy.apache.org/officers/acreq) 请求。

几天后，新 Committer 将收到确认创建帐户的电子邮件，标题为 `Welcome to the Apache Software Foundation (ASF)!`。恭喜！新 Committer 现在拥有正式的 Apache ID。

PMC 成员应通过 [roster](https://whimsy.apache.org/roster/pmc/seatunnel) 将新 Committer 添加到官方 Committer 列表中。

### 设置 Apache ID 和开发环境
1. 前往 [Apache Account Utility Platform](https://id.apache.org/)，创建你的密码，设置你的个人邮箱（`Forwarding email address`）和 GitHub 帐户（`Your GitHub Username`）。之后不久（2 小时内），你将通过电子邮件收到组织邀请。
2. 如果你想使用 `xxx@apache.org` 电子邮件服务，请参阅 [此处](https://infra.apache.org/committer-email.html)。建议使用 Gmail，因为这种转发模式在大多数邮箱服务设置中不容易找到。
3. 按照 [authorized GitHub 2FA wiki](https://help.github.com/articles/configuring-two-factor-authentication-via-a-totp-mobile-app/) 启用 [Github](http://github.com/) 上的双因素认证 (2FA)。当你将 2FA 设置为“关”时，你将被相应的 Apache committer 写权限组除名，直到你再次设置它。（**注意：像对待密码一样对待你的恢复代码！**）
4. 使用 [GitBox Account Linking Utility](https://gitbox.apache.org/setup/) 获取 SeaTunnel 项目的写权限。
5. 按照此 [doc](https://github.com/apache/SeaTunnel-website#how-to-add-a-new-committer) 更新网站。

如果你想在 Apache GitHub 组织中公开显示，你需要转到 [Apache GitHub org people page](https://github.com/orgs/apache/people)，搜索你自己，并将 `Organization visibility` 选择为 `Public`。

### Committer 权利、义务和责任
SeaTunnel 项目不要求你在成为 Committer 后继续做出贡献，但我们真诚地希望你继续在我们的社区中发挥作用！

作为 Committer，你可以：
1. 审查并将拉取请求合并到 Apache 存储库中的 master 分支。拉取请求通常包含多个提交。这些提交**必须压缩并合并**为**带有解释性评论**的单个提交。建议新 Committer 请求高级 Committer 重新检查拉取请求。
2. 创建并将代码推送到 Apache 存储库中的新分支。
3. 按照 [发布流程](../How-to-release.md) 准备新版本。记得与 Committer 团队确认现在是创建发布的合适时机。

PMC 希望新 Committer 参与发布过程以及发布投票，即使他们的投票将被视为 `+1 no binding`。熟悉发布过程是晋升为 PMC 成员角色的关键。

## 项目管理委员会 (PMC)
项目管理委员会 (PMC) 成员在代码贡献方面没有任何特殊权利。
他们只是监督项目并确保其符合 Apache 要求。其职能包括：
1. 发布的绑定投票和许可证检查；
2. 新 Committer 和 PMC 成员认可；
3. 品牌问题的识别和品牌保护；以及
4. 回答 ASF 董事会提出的问题，并采取必要行动。

PMC 的 V.P. 和主席是秘书，负责初始化董事会报告。

在大多数情况下，新 PMC 成员是从 Committer 团队提名的。但也有可能直接成为 PMC 成员，只要 PMC 同意提名并确信候选人已准备好。例如，这可以通过他/她已经是 Apache 成员、Apache 官员或其他项目的 PMC 成员这一事实来证明。

新 PMC 投票过程也应遵循 `[DISCUSS]`、`[VOTE]` 和 `[RESULT][VOTE]` 程序，使用私人邮件列表，就像 [新 Committer 投票过程](#new-committer-nomination) 一样。

一旦邀请被接受，PMC 成员应通过 [roster](https://whimsy.apache.org/roster/pmc/seatunnel) 将新成员添加到官方 PMC 列表中。
