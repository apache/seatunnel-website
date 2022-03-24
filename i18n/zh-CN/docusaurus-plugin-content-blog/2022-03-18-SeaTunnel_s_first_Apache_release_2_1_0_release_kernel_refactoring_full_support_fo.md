---
slug: Apache SeaTunnel(Incubating) 首个Apache 版本 2.1.0 发布，内核重构，全面支持Flink
title: Apache SeaTunnel(Incubating) 首个Apache 版本 2.1.0 发布，内核重构，全面支持Flink
tags: [2.1.0, Release]
---
# Apache SeaTunnel(Incubating) 首个Apache 版本 2.1.0 发布，内核重构，全面支持Flink
 
2021 年 12 月 9 日，Apache SeaTunnel(Incubating) 进入 Apache 孵化器，在经过社区各位贡献者近四个月的努力下，我们于2022年3月18日发布了首个Apache版本，并且保证了首个版本一次性通过检查。这意味着 2.1.0 版本，是经过 Apache SeaTunnel(Incubating) 社区和 Apache 孵化器投票检查发布的官方版本，企业和个人用户可以放心安全使用。

**Note：** **软件许可协议**是一种具有法律性质的合同或指导，目的在于规范受著作权保护的软件的使用或散布行为。通常的许可方式会允许用户来使用单一或多份该软件的复制，因为若无许可而径予使用该软件，将违反著作权法给予该软件开发者的专属保护。效用上来说，软件许可是软件开发者与其用户之间的一份合约，用来保证在符合许可范围的情况下，用户将不会受到控告。进入孵化器前后，我们花费了大量的时间来梳理整个项目的外部依赖以确保整个项目的合规性。需要说明的是，开源软件选择怎样的License并不意外着项目本身就一定合规。而ASF严苛的版本检查最大程度地保证了软件License的合规性，以及软件合理合法的流通分发。
## 本次发布版本说明
### 本次发布我们主要带来了以下特性：
* 对微内核插件化的架构内核部分进行了大量优化，内核以 Java 为主，并对命令行参数解析，插件加载等做了大量改进，同时插件扩展可根据用户（或贡献者）所擅长的语言去做开发，极大程度地降低了插件开发门槛。
* 全面支持 Flink ，但同时用户也可自由选择底层引擎，本次更新也为大家带来了大量的Flink插件，也欢迎大家后续贡献相关插件。
* 提供本地开发极速启动环境支持（example），贡献者或用户可以在不更改任何代码的情况下快速丝滑启动，方便本地快速开发调试体验。对于需要自定义插件的贡献者或者用户来讲，这无疑是个令人激动的好消息。事实上，我们在发布前的测试中，也有大量贡献者采用这种方式快速对插件进行测试。
* 提供了Docker容器安装，用户可以极快地通过Docker部署安装使用Apache SeaTunnel，未来我们也会围绕Docker&K8s做出大量迭代，欢迎大家讨论交流。
 
 
具体发布说明：
[Feature]
* 使用 JCommander来做命令行参数解析，使得开发者更关注逻辑本身。
* Flink从1.9升级至1.13.5，保持兼容旧版本，同时为后续CDC做好铺垫。
* 支持 Doris 、Hudi、Phoenix、Druid等Connector 插件，完整的插件支持你可以在这里找到  [plugins-supported-by-seatunnel]([https://github.com/apache/incubator-seatunnel#plugins-supported-by-seatunnel](https://github.com/apache/incubator-seatunnel#plugins-supported-by-seatunnel)).
* 本地开发极速启动环境支持，你可以在使用example模块，不修改任何代码的前提下快速启动，方便开发者本地调试体验。
* 支持通过 Docker 容器安装和试用 Apache SeaTunnel。
* Sql 组件支持 SET语句，支持配置变量。
* Config模块重构，减少贡献者理解成本，同时保证项目的代码合规（License）。
* 项目结构重新调整，以适应新的Roadmap。
* CI&CD的支持，代码质量自动化管控，（后续会有更多的计划来支持CI&CD开发）。
 
## 【致谢】
感谢以下参与贡献的同学(为GitHub ID，排名不分先后)：
 
Al-assad, BenJFan, CalvinKirs, JNSimba, JiangTChen, Rianico, TyrantLucifer, Yves-yuan, ZhangchengHu0923, agendazhang, an-shi-chi-fan, asdf2014, bigdataf, chaozwn, choucmei, dailidong, dongzl, felix-thinkingdata, fengyuceNv, garyelephant, kalencaya, kezhenxu94, legendtkl, leo65535, liujinhui1994, mans2singh, marklightning, mosence, nielifeng, ououtt, ruanwenjun, simon824, totalo, wntp, wolfboys, wuchunfu, xbkaishui, xtr1993, yx91490, zhangbutao, zhaomin1423, zhongjiajie, zhuangchong, zixi0825.
 
同时也诚挚的感谢我们的Mentor：Zhenxu Ke，Willem Jiang， William Guo，LiDong Dai ，Ted Liu, Kevin，JB 在这个过程中给予的帮助
## 未来几个版本的规划：
* CDC的支持；
* 监控体系的支持；
* UI系统的支持；
* 更多的 Connector 支持，以及更高效的Sink支持，如ClickHouse，很快会在下个版本跟大家见面。
 
后续Feature是由社区共同决定的，我们也在这里呼吁大家一同参与社区后续建设。
欢迎大家关注以及贡献：）
 
## 社区发展
### 【近期概况】
自进入Apache孵化器以来，贡献者从13 人增长至 55 人，且持续保持上升趋势，平均周commits维持在20+，来自不同公司的三位贡献者（Lei Xie, HuaJie Wang,Chunfu Wu,）通过他们对社区的贡献被邀请成为Committer。我们举办了两场MeetUp，来自B站，OPPO、唯品会等企业讲师分享了SeaTunnel在他们在企业中的大规模生产落地实践(后续我们也会保持每月一次的meetup，欢迎各位使用SeaTunnel的用户或者贡献者分享SeaTunnel和你们的故事)。
### 【Apache SeaTunnel(Incubating)的用户】
Note:仅包含已登记用户
Apache SeaTunnel(Incubating) 目前登记用户如下，如果您也在使用Apache SeaTunnel，欢迎在[Who is using SeaTunne](https://github.com/apache/incubator-seatunnel/issues/686)! 中登记！
 <div align="center">

<img src="/image/20220321/1.png"/>

</div>

 
## 【PPMC感言】
Apache SeaTunnel(Incubating) PPMC LiFeng Nie在谈及首个Apache版本发布的时候说，从进入Apache Incubator的第一天，我们就一直在努力学习Apache Way以及各种Apache政策，第一个版本发布的过程花费了大量的时间（主要是合规性），但我们认为这种时间是值得花费的，这也是我们选择进入Apache的一个很重要的原因，我们需要让用户用得放心，而Apache无疑是最佳选择，其 License 近乎苛刻的检查会让用户尽可能地避免相关的合规性问题，保证软件合理合法的流通。另外，其践行Apache Way，例如公益使命、实用主义、社区胜于代码、公开透明与共识决策、任人唯贤等，可以帮助 SeaTunnel 社区更加开放、透明，向多元化方向发展。
 