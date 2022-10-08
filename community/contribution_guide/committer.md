# Become Apache SeaTunnel Committer
SeaTunnel Podling Project Management Committee (PPMC) is responsible for assessing the contributions of candidates.

Like many Apache projects, SeaTunnel welcome all contributions, including code contributions, blog entries, guides for new users, public speeches, and enhancement of the project in various ways.

Becoming a committer
To get started contributing to SeaTunnel, learn how to contribute – anyone can submit patches, documentation and examples to the project.

The PPMC regularly adds new committers from the active contributors, based on their contributions to SeaTunnel. The qualifications for new committers include:

Sustained contributions to SeaTunnel: Committers should have a history of major contributions to SeaTunnel. An ideal committer will have contributed broadly throughout the project, and have contributed at least one major component where they have taken an “ownership” role. An ownership role means that existing contributors feel that they should run patches for this component by this person.
Quality of contributions: Committers more than any other community member should submit simple, well-tested, and well-designed patches. In addition, they should show sufficient expertise to be able to review patches, including making sure they fit within SeaTunnel’s engineering practices (testability, documentation, API stability, code style, etc). The committership is collectively responsible for the software quality and maintainability of SeaTunnel. Note that contributions to critical parts of SeaTunnel, like its core and SQL modules, will be held to a higher standard when assessing quality. Contributors to these areas will face more review of their changes.
Community involvement: Committers should have a constructive and friendly attitude in all community interactions. They should also be active on the dev and user list and help mentor newer contributors and users. In design discussions, committers should maintain a professional and diplomatic approach, even in the face of disagreement.

## Committer
### Nominate new committer
In SeaTunnel, **new committer nomination** could only be officially started by existing PPMC members. If a new committer feels that he/she is qualified, he/she should contact any existing PPMC member and discuss. If this is agreed among some members of the PPMC, the process will kick off.

The following steps are recommended (to be initiated only by an existing PPMC member):
1. Send an email titled `[DISCUSS] Promote xxx as new committer` to `private@seatunnel.apache.org`. List the important contributions of the candidate,
   so you could gather support from other PPMC members for your proposal.
1. Keep the discussion open for more than 3 days but no more than 1 week, unless there is any express objection or concern.
1. If the PPMC generally agrees to the proposal, send an email titled `[VOTE] Promote xxx as new committer` to `private@seatunnel.apache.org`.
1. Keep the voting process open for more than 3 days, but no more than 1 week. Consider the result as `Consensus Approval` if there are three +1 votes and
   +1 votes > -1 votes.
1. Send an email titled `[RESULT][VOTE] Promote xxx as new committer` to `private@seatunnel.apache.org`, and list the voting details, including who the voters are.

### Invite new committer
The PPMC member who starts the promotion is responsible for sending an invitation to the new committer and guiding him/her to set up the ASF env.

The PPMC member should send an email using the following template to the new committer:
```
To: <invitee name>@gmail.com
Cc: private@seatunnel.apache.org
Subject: Invitation to become SeaTunnel committer: <invitee name>

Hello <invitee name>,

The SeaTunnel Project Management Committee] (PPMC) 
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
    This will allow the Secretary to notify the PPMC 
    when your iCLA has been recorded.

When recording of your iCLA is noticed, you will 
receive a follow-up message with the next steps for 
establishing you as a committer.
```

### Invitation acceptance process
The new committer should reply to `private@seatunnel.apache.org` (choose `reply all`), and express his/her intention to accept the invitation.
Then, this invitation will be treated as accepted by the project's PPMC. Of course, the new committer may also choose to decline the invitation.

Once the invitation has been accepted, the new committer has to take the following steps:
1. Subscribe to `dev@seatunnel.apache.org`. Usually this is already done.
1. Choose a Apache ID that is not on the [apache committers list page](http://people.apache.org/committer-index.html).
1. Download the [ICLA](https://www.apache.org/licenses/icla.pdf)  (If the new committer contributes to the project as a day job, [CCLA](http://www.apache.org/licenses/cla-corporate.pdf)  is expected).
1. After filling in the `icla.pdf` (or `ccla.pdf`) with the correct information, print, sign it by hand,  scan it as an PDF, and send it as an attachment to [secretary@apache.org](mailto:secretary@apache.org). (If electronic signature is preferred, please follow the steps on [this page](http://www.apache.org/licenses/contributor-agreements.html#submitting))
1. The PPMC will wait for the Apache secretary to confirm the ICLA (or CCLA) filed. The new committer and PPMC will receive the following email:

```
Dear XXX,

This message acknowledges receipt of your ICLA, which has been filed in the Apache Software Foundation records.

Your account has been requested for you and you should receive email with next steps
within the next few days (can take up to a week).

Please refer to https://www.apache.org/foundation/how-it-works.html#developers
for more information about roles at Apache.
```

In the unlikely event that the account has not yet been requested, the PPMC member should contact the project V.P..
The V.P. could request through the [Apache Account Submission Helper Form](https://whimsy.apache.org/officers/acreq).

After several days, the new committer will receive an email confirming creation of the account, titled `Welcome to the Apache Software Foundation (ASF)!`.
Congratulations! The new committer now has an official Apache ID.

The PPMC member should add the new committer to the official committer list through [roster](https://whimsy.apache.org/roster/ppmc/seatunnel).

### Set up the Apache ID and dev env
1. Go to [Apache Account Utility Platform](https://id.apache.org/), create your password, set up your personal mailbox (`Forwarding email address`) and GitHub account(`Your GitHub Username`). An organizational invite will be sent to you via email shortly thereafter (within 2 hours).
1. If you would like to use the `xxx@apache.org` email service, please refer to [here](https://infra.apache.org/committer-email.html). Gmail is recommended, because this forwarding mode is not easy to find in most mailbox service settings.
1. Follow the [authorized GitHub 2FA wiki](https://help.github.com/articles/configuring-two-factor-authentication-via-a-totp-mobile-app/) to enable two-factor authorization (2FA) on [Github](http://github.com/). When you set 2FA to "off", it will be delisted by the corresponding Apache committer write permission group until you set it up again. (**NOTE: Treat your recovery codes with the same level of attention as you would your password!**)
1. Use [GitBox Account Linking Utility](https://gitbox.apache.org/setup/) to obtain write permission of the SeaTunnel project.
1. Follow this [doc](https://github.com/apache/SeaTunnel-website#how-to-add-a-new-committer) to update the website.

If you would like to show up publicly in the Apache GitHub org, you need to go to the [Apache GitHub org people page](https://github.com/orgs/apache/people),
search for yourself, and choose `Organization visibility` to `Public`.

### Committer rights, duties, and responsibilities
The SeaTunnel project doesn't require continuing contributions from you after you have become a committer, but we truly hope that you will continue to play a part in our community!

As a committer, you could
1. Review and merge the pull request to the master branch in the Apache repo. A pull request often contains multiple commits. Those commits **must be squashed and merged** into a single commit **with explanatory comments**. It is recommended for new committers to request recheck of the pull request from senior committers.
1. Create and push codes to the new branch in the Apache repo.
1. Follow the [release process](../How-to-release.md) to prepare a new release. Remember to confirm with the committer team
   that it is the right time to create the release.

The PPMC hopes that the new committer will take part in the release process as well as release voting, even though their vote will be regarded as `+1 no binding`.
Being familiar with the release process is key to being promoted to the role of PPMC member.

## Project Management Committee
The Project Management Committee (PPMC) member does not have any special rights in code contributions.
They simply oversee the project and make sure that it follows the Apache requirements. Its functions include:
1. Binding voting for releases and license checks;
1. New committer and PPMC member recognition;
1. Identification of branding issues and brand protection; and
1. Responding to questions raised by the ASF board, and taking necessary actions.

The V.P. and chair of the PPMC is the secretary, who is responsible for initializing the board report.

In most cases, a new PPMC member is nominated from the committer team. But it is also possible to become a PPMC member directly, so long as the PPMC agrees to the nomination and is confident that the candidate is ready. For instance, this can be demonstrated by the fact that he/she has been an Apache member, an Apache officer, or a PPMC member of another project.

The new PPMC voting process should also follow the `[DISCUSS]`, `[VOTE]` and `[RESULT][VOTE]` procedures using a private mail list, just like the [voting process for new committers](#new-committer-nomination).
Before sending the invitation, the PPMC [must also send a NOTICE mail to the Apache Incubator](http://www.apache.org/dev/PPMC.html#newPPMC).
```
To: private@incubator.apache.org
Cc: private@seatunnel.apache.org
Subject: [NOTICE] Jane Doe for SeaTunnel PPMC

SeaTunnel proposes to invite Jane Doe (janedoe) to join the PPMC.

(include if a vote was held) The vote result is available here: https://lists.apache.org/...
```

After 72 hours, if the board doesn't object to the nomination (which it won't most cases), an invitation may then be sent to the candidate.

Once the invitation is accepted, a PPMC member should add the new member to the official PPMC list through [roster](https://whimsy.apache.org/roster/ppmc/seatunnel).
