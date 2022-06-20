---
slug: 2.1.0-Released-Apache-SeaTunnel-Incubating-First-Apache-Release-Refactors-Kernel-and-Supports-Flink-Overall
title: 2.1.0 Released! Apache SeaTunnel(Incubating) First Apache Release Refactors Kernel and Supports Flink Overall
tags: [2.1.0, Release]
---

# 2.1.0 Released! Apache SeaTunnel(Incubating) First Apache Release Refactors Kernel and Supports Flink Overall

On December 9, 2021, Apache SeaTunnel(Incubating) entered the Apache Incubator, and after nearly four months of endeavor by the community contributors, we passed the first Apache version control in one go and released it on March 18, 2022. This means that version 2.1.0 is an official release that is safe for corporate and individual users to use, which has been voted on by the Apache SeaTunnel(Incubating) community and the Apache Incubator.

**Note:** A **software license** is a legal instrument governing the use or redistribution of software. A typical software license grants the licensee, typically an end-user, permission to use one or more copies of the software in ways where such a use would otherwise potentially constitute copyright infringement of the software owner's exclusive rights under copyright. Effectively, a software license is a contract between the software developer and the user that guarantees the user will not be sued within the scope of the license. 

Before and after entering the incubator, we spent a lot of time sorting through the external dependencies of the entire project to ensure compliance. It is important to note that the choice of License for open source software does not necessarily mean that the project itself is compliant. While the stringent version control process of ASF ensures compliance and legal distribution of the software license maximumly.

## Release Note

We bring the following **key features**to this release:

1. The kernel of the microkernel plug-in architecture is overall optimized, which is mainly in Java. And a lot of improvements are made to command line parameter parsing, plug-in loading, etc. At the same time, the users (or contributors) can choose the language to develop plug-in extensions, which greatly reduces the development threshold of plug-ins.
2. Overall support for Flink, while the users are free to choose the underlying engine. This version also brings a large number of Flink plug-ins and welcomes anyone to contribute more.
3. Provide local development fast startup environment support (example), allow contributors or users quickly and smoothly start without changing any code to facilitate rapid local development debugging. This is certainly exciting news for contributors or users who need to customize their plugins. In fact, we've had a large number of contributors use this approach to quickly test the plugin in our pre-release testing.
4. With Docker container installation provided, users can deploy and install Apache SeaTunnel(Incubating) via Docker extremely fast, and we will iterate around Docker & K8s in the future, any interesting proposal on this is welcomed.
## Specific release notes：

### [Features]

* Use JCommander to do command line parameter parsing, making developers focus on the logic itself.
* Flink is upgraded from 1.9 to 1.13.5, keeping compatibility with older versions and preparing for subsequent CDC.
* Support for Doris, Hudi, Phoenix, Druid, and other Connector plugins, and you can find complete plugin support here [plugins-supported-by-seatunnel]([https://github.com/apache/incubator-seatunnel#plugins-supported-by-seatunnel](https://github.com/apache/incubator-seatunnel#plugins-supported-by-seatunnel)).
* Local development extremely fast starts environment support. It can be achieved by using the example module without modifying any code, which is convenient for local debugging.
* Support for installing and trying out Apache SeaTunnel(Incubating) via Docker containers.
* SQL component supports SET statements and configuration variables.
* Config module refactoring to facilitate understanding for the contributors while ensuring code compliance (License) of the project.
* Project structure realigned to fit the new Roadmap.
* CI&CD support, code quality automation control (more plans will be carried out to support CI&CD development).

## Acknowledgments

Thanks to the following contributors who participated in this version release (GitHub IDs, in no particular order).

Al-assad, BenJFan, CalvinKirs, JNSimba, JiangTChen, Rianico, TyrantLucifer, Yves-yuan, ZhangchengHu0923, agendazhang, an-shi-chi-fan, asdf2014, bigdataf, chaozwn, choucmei, dailidong, dongzl, felix-thinkingdata, fengyuceNv, garyelephant, kalencaya, kezhenxu94, legendtkl, leo65535, liujinhui1994, mans2singh, marklightning, mosence, nielifeng, ououtt, ruanwenjun, simon824, totalo, wntp, wolfboys, wuchunfu, xbkaishui, xtr1993, yx91490, zhangbutao, zhaomin1423, zhongjiajie, zhuangchong, zixi0825.

Also sincere gratitude to our Mentors: Zhenxu Ke, Willem Jiang, William Guo, LiDong Dai, Ted Liu, Kevin, JB for their help!

## Planning for the next few releases:

* CDC support.
* Support for the monitoring system.
* UI system support.
* More Connector and efficient Sink support, such as ClickHouse support will be available in the next release soon.
The follow-up **Features** are decided by the community consensus, and we sincerely appeal to more participation in the community construction.

We need your attention and contributions:)

## Community Status

### Recent Development

Since entering the Apache incubator, the contributor group has grown from 13 to 55 and continues to grow, with the average weekly community commits remaining at 20+. 

Three contributors from different companies (Lei Xie, HuaJie Wang, Chunfu Wu) have been invited to become Committers on account of their contributions to the community. 

We held two Meetups, where instructors from Bilibili, OPPO, Vipshop, and other companies shared their large-scale production practices based on SeaTunnel in their companies (we will hold one meetup monthly in the future, and welcome SeaTunnel users or contributors to come and share their stories about SeaTunnel).

### Users of Apache SeaTunnel(Incubating)

Note: Only registered users are included.

Registered users of Apache SeaTunnel(Incubating) are shown below. If you are also using Apache SeaTunnel(Incubating), too, welcome to register on [Who is using SeaTunne](https://github.com/apache/incubator-seatunnel/issues/686)!

<div align="center">

<img src="/image/20220321/1.png"/>

</div>

## PPMC's Word

LiFeng Nie, PPMC of Apache SeaTunnel(Incubating), commented on the first Apache version release. 

From the first day entering Apache Incubating, we have been working hard to learn the Apache Way and various Apache policies. Although the first release took a lot of time (mainly for compliance), we think it was well worth it, and that's one of the reasons we chose to enter Apache. We need to give our users peace of mind, and Apache is certainly the best choice, with its almost demanding license control that allows users to avoid compliance issues as much as possible and ensure that the software is circulating reasonably and legally. In addition, its practice of the Apache Way, such as public service mission, pragmatism, community over code, openness and consensus decision-making, and meritocracy, can drive the Apache SeaTunnel(Incubating) community to become more open, transparent, and diverse.

