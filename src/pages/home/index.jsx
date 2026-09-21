/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {useEffect, useRef, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useBaseUrl from '@docusaurus/useBaseUrl';
import './index.less';
import systemConfiguration from '../../js/sysConfig';

const versions = require('../../../versions.json');

const SLACK_URL = 'https://s.apache.org/seatunnel-slack';
const EXAMPLES_URL = 'https://github.com/apache/seatunnel/tree/dev/seatunnel-examples';

const HERO_SOURCES = [
    {name: 'MySQL CDC', colorClass: 'orange'},
    {name: 'PostgreSQL', colorClass: 'blue'},
    {name: 'Apache Kafka', colorClass: 'green'},
    {name: 'Amazon S3', colorClass: 'yellow'},
    {name: 'MongoDB', colorClass: 'purple'},
];

const HERO_SINKS = [
    {name: 'ClickHouse', colorClass: 'teal'},
    {name: 'Apache Iceberg', colorClass: 'blue'},
    {name: 'Elasticsearch', colorClass: 'orange'},
    {name: 'Apache Doris', colorClass: 'green'},
    {name: 'Apache Paimon', colorClass: 'pink'},
];

const ARCHITECTURE_ROW_KEYS = ['top', 'mid', 'bot'];

// Keep the marquee aligned with connectors and integrations that already have
// public support pages in the current SeaTunnel documentation set.
const CONNECTOR_MARQUEE_ITEMS = [
    'MySQL',
    'PostgreSQL',
    'Oracle',
    'SQL Server',
    'TiDB',
    'MariaDB',
    'MongoDB',
    'DynamoDB',
    'Cassandra',
    'HBase',
    'Neo4j',
    'DB2',
    'Greenplum',
    'OceanBase',
    'Apache Kafka',
    'Apache Pulsar',
    'RabbitMQ',
    'RocketMQ',
    'ActiveMQ',
    'AWS SQS',
    'Elasticsearch',
    'Apache Druid',
    'Typesense',
    'ClickHouse',
    'Apache Doris',
    'StarRocks',
    'Snowflake',
    'Cloudberry',
    'Amazon Redshift',
    'Amazon S3',
    'HDFS',
    'Alibaba OSS',
    'LocalFile',
    'Apache Iceberg',
    'Apache Hudi',
    'Delta Lake',
    'Apache Paimon',
    'Apache Kudu',
    'Apache Hive',
    'InfluxDB',
    'Apache IoTDB',
    'TDengine',
    'Redis',
    'Aerospike',
    'FTP',
    'SFTP',
    'HTTP',
    'GraphQL',
    'Google Sheets',
    'Google Firestore',
    'Slack',
    'DingTalk',
    'Feishu',
    'Email',
    'MaxCompute',
    'TableStore',
    'SelectDB Cloud',
    'Milvus',
    'Qdrant',
    'Lance',
    'Apache Fluss',
    'HugeGraph',
    'Prometheus',
    'SLS',
    'Sentry',
    'SensorsData',
    'Web3j',
];

const stripArchitectureStageIndex = (value) => value.replace(/^\d+\s+/, '');

const HOME_COPY = {
    'en': {
        badge: `v${versions[0]} live / Apache Top-Level Project`,
        nav: {
            docs: 'Docs',
            connectors: 'Connectors',
            blog: 'Blog',
            community: 'Community',
            download: 'Download',
        },
        hero: {
            titleLead: 'High-performance',
            titleAccent: 'data integration',
            titleTail: 'for every workload.',
            subtitle: 'A production-grade integration layer for distributed data systems, with fault tolerance, schema evolution, and multi-engine execution across batch, streaming, CDC, multimodal, and AI workloads.',
            primaryButton: 'Quick Start',
            secondaryButton: 'Read the Docs',
            helperButton: 'View Connectors',
            localeButton: '简体中文',
            meta: [
                'Zeta Engine',
                'Apache Flink',
                'Apache Spark',
                'CDC / Exactly-Once',
                'Schema Evolution',
            ],
        },
        trust: {
            label: 'Used in production by',
        },
        stats: [
            {value: '9.4k+', label: 'GitHub Stars'},
            {value: '~200', label: 'Data Connectors'},
            {value: '3', label: 'Execution Engines'},
            {value: '2.3k+', label: 'GitHub Forks'},
        ],
        architecture: {
            eyebrow: 'Architecture Pattern',
            titleLead: 'Not ETL.',
            titleAccent: 'EtLT.',
            lead: 'SeaTunnel handles extract, lightweight transform, and load. Your warehouse or lakehouse can keep the heavy downstream transformation while SeaTunnel moves reliable, structured data between systems.',
            headers: {
                sources: '01 Upstream Sources',
                engine: '02 EtLT PATTERN',
                targets: '03 Downstream Targets',
            },
            rows: [
                {
                    source: {
                        title: 'Database',
                        tag: 'OLTP / CDC',
                        dotClass: 'orange',
                        chips: ['MySQL', 'PostgreSQL', 'Oracle', 'SQL Server', 'TiDB'],
                    },
                    target: {
                        title: 'Data Warehouse',
                        tag: 'OLAP',
                        dotClass: 'yellow',
                        chips: ['ClickHouse', 'Apache Doris', 'StarRocks', 'Snowflake'],
                    },
                },
                {
                    source: {
                        title: 'Streaming',
                        tag: 'Pub / Sub',
                        dotClass: 'blue',
                        chips: ['Apache Kafka', 'Apache Pulsar', 'RocketMQ', 'RabbitMQ'],
                    },
                    target: {
                        title: 'Lakehouse',
                        tag: 'Open Tables',
                        dotClass: 'green',
                        chips: ['Apache Iceberg', 'Apache Hudi', 'Apache Paimon', 'Delta Lake'],
                    },
                },
                {
                    source: {
                        title: 'Files & Lake',
                        tag: 'Object Storage',
                        dotClass: 'teal',
                        chips: ['Amazon S3', 'Alibaba OSS', 'HDFS', 'LocalFile'],
                    },
                    target: {
                        title: 'Search & Vectors',
                        tag: 'Retrieval',
                        dotClass: 'blue',
                        chips: ['Elasticsearch', 'Typesense', 'Milvus', 'Qdrant'],
                    },
                },
            ],
            enginePillars: [
                {label: 'Engines', value: 'Zeta / Flink / Spark'},
                {label: 'Modes', value: 'Batch / Streaming / CDC'},
                {label: 'Guarantees', value: 'Exactly-once / Schema evolution / Multi-engine scale'},
            ],
            engineFoot: [
                '200+ Connectors',
                'Structured Movement',
                'Production Ready',
            ],
        },
        features: {
            eyebrow: 'Why SeaTunnel',
            title: 'Production-grade from day one.',
            lead: 'Real fault tolerance, schema evolution, and multi-engine scale for production pipelines.',
            schema: {
                number: '01',
                icon: 'schema',
                accent: 'violet',
                title: 'Schema changes? Handled automatically.',
                description: 'SeaTunnel detects upstream schema changes and propagates them downstream in real time, so teams do not need to pause the pipeline for every column change.',
            },
            cards: [
                {
                    number: '02',
                    title: 'Real-Time CDC',
                    description: 'Low-latency change capture across major databases, with seamless batch-to-stream handoff and no lock-based cutover.',
                    icon: 'lightning',
                    accent: 'blue',
                    highlights: ['Low latency', 'Batch to stream', 'No lock cutover'],
                },
                {
                    number: '03',
                    title: 'Exactly-Once Semantics',
                    description: 'Checkpoint-backed fault tolerance keeps records consistent across failures, retries, and restarts.',
                    icon: 'shield',
                    accent: 'teal',
                    highlights: ['Checkpoint backed', 'Failure safe', 'Restart consistent'],
                },
                {
                    number: '04',
                    title: 'Multi-Engine Support',
                    description: 'Use the same pipeline definition on Zeta, Flink, or Spark without rewriting connector logic or delivery paths.',
                    icon: 'layers',
                    accent: 'amber',
                    highlights: ['One definition', 'Zeta / Flink / Spark', 'No connector rewrites'],
                    layout: 'wide',
                },
            ],
        },
        motion: {
            eyebrow: 'See it in motion',
            title: 'Six mechanisms. One integration layer.',
            lead: 'Explore independent examples of parallel reads, CDC, row transforms, table routing, schema evolution, and checkpoint recovery.',
            openButton: 'Open interactive demo',
            frameTitle: 'Interactive SeaTunnel data integration mechanisms demo',
            controls: {
                label: 'Motion demo controls',
                play: 'Play animation',
                pause: 'Pause animation',
                overview: 'All mechanisms',
            },
            mechanisms: [
                {title: 'Parallel reads', description: 'Assign independent source splits to parallel readers.'},
                {title: 'Snapshot + CDC', description: 'Start with a snapshot, then capture changes.'},
                {title: 'Row transforms', description: 'Apply expressions and filters to individual records.'},
                {title: 'Multi-table routing', description: 'Route each table identity to its matching destination.'},
                {title: 'Schema evolution', description: 'Apply supported schema changes before data moves downstream.'},
                {title: 'Checkpoint recovery', description: 'Resume from completed checkpoint state after a failure.'},
            ],
        },
        connectors: {
            eyebrow: '~200 Native Connectors',
            titleLead: 'If your data lives there,',
            titleAccent: 'SeaTunnel connects to it.',
            lead: 'Native connectors across databases, streams, lakehouses, search systems, and object stores.',
            categories: [
                {
                    label: 'OLTP Databases',
                    items: [
                        {name: 'MySQL / MySQL CDC', colorClass: 'orange'},
                        {name: 'PostgreSQL', colorClass: 'blue'},
                        {name: 'Oracle', colorClass: 'red'},
                        {name: 'SQL Server', colorClass: 'maroon'},
                        {name: 'TiDB / MariaDB', colorClass: 'cyan'},
                        {name: '+25 via JDBC', colorClass: 'green'},
                    ],
                },
                {
                    label: 'Streaming & Messaging',
                    items: [
                        {name: 'Apache Kafka', colorClass: 'black'},
                        {name: 'Apache Pulsar', colorClass: 'blue'},
                        {name: 'RabbitMQ', colorClass: 'orange'},
                        {name: 'RocketMQ', colorClass: 'red'},
                        {name: 'AWS SQS', colorClass: 'indigo'},
                        {name: 'ActiveMQ', colorClass: 'green'},
                    ],
                },
                {
                    label: 'OLAP & Analytics',
                    items: [
                        {name: 'ClickHouse', colorClass: 'yellow'},
                        {name: 'Apache Doris', colorClass: 'blue'},
                        {name: 'StarRocks', colorClass: 'indigo'},
                        {name: 'Snowflake', colorClass: 'sky'},
                        {name: 'Amazon Redshift', colorClass: 'blue'},
                        {name: 'Cloudberry', colorClass: 'purple'},
                    ],
                },
                {
                    label: 'Data Lakes & Storage',
                    items: [
                        {name: 'Amazon S3 / Hudi', colorClass: 'orange'},
                        {name: 'Alibaba OSS', colorClass: 'blue'},
                        {name: 'HDFS / LocalFile', colorClass: 'sky'},
                        {name: 'Apache Iceberg', colorClass: 'green'},
                        {name: 'Delta Lake', colorClass: 'orange'},
                        {name: 'Apache Paimon', colorClass: 'green'},
                    ],
                },
            ],
            more: 'Also: MongoDB / Redis / Elasticsearch / Neo4j / Cassandra / HBase / Druid / HugeGraph / IoTDB / InfluxDB / DynamoDB / Milvus / Qdrant ...',
        },
        code: {
            eyebrow: 'Simple by design',
            titleLead: 'A config file.',
            titleTail: "That's all it takes.",
            lead: 'Declare your source, transform, and sink in plain config, then deploy on any supported engine without rewriting the pipeline.',
            primaryButton: 'Read the Docs',
            secondaryButton: 'See Examples',
            fileName: 'mysql-cdc-to-clickhouse.conf',
        },
        cta: {
            titleLead: 'One pipeline definition.',
            titleAccent: 'Run it on Zeta, Flink, or Spark.',
            lead: 'SeaTunnel unifies CDC, schema evolution, multimodal movement, and production-grade reliability into one Apache-licensed integration layer.',
            primaryButton: 'Quick Start',
            secondaryButton: 'GitHub',
            tertiaryButton: 'Slack Access',
        },
        footer: {
            tagline: 'Distributed data integration for the modern data stack.',
            apache: 'An Apache Software Foundation Project',
            columns: [
                {
                    title: 'Product',
                    items: [
                        {label: 'Overview', hrefKey: 'docsOverview'},
                        {label: 'Connectors', hrefKey: 'connectors'},
                        {label: 'Transforms', hrefKey: 'transforms'},
                        {label: 'SeaTunnel Web', hrefKey: 'seatunnelWeb'},
                        {label: 'Changelog', hrefKey: 'releases'},
                    ],
                },
                {
                    title: 'Developers',
                    items: [
                        {label: 'Documentation', hrefKey: 'docsOverview'},
                        {label: 'Quick Start', hrefKey: 'quickStart'},
                        {label: 'API Reference', hrefKey: 'apiReference'},
                        {label: 'Contributing', hrefKey: 'community'},
                        {label: 'Roadmap', hrefKey: 'roadmap'},
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {label: 'GitHub', hrefKey: 'github'},
                        {label: 'Slack', hrefKey: 'slack'},
                        {label: 'Twitter / X', hrefKey: 'twitter'},
                        {label: 'Mailing List', hrefKey: 'mailingList'},
                        {label: 'Blog', hrefKey: 'blog'},
                    ],
                },
            ],
        },
        askAi: 'Ask AI',
    },
    'zh-CN': {
        badge: `v${versions[0]} 已发布 / Apache 顶级项目`,
        nav: {
            docs: '文档',
            connectors: '连接器',
            blog: '博客',
            community: '社区',
            download: '下载',
        },
        hero: {
            titleLead: '超高性能',
            titleAccent: '数据集成',
            titleTail: '工具',
            subtitle: '面向分布式生产系统的数据集成底座，具备容错、模式演进与多引擎执行能力，覆盖批处理、流处理、CDC、多模态与 AI 数据场景。',
            primaryButton: '快速开始',
            secondaryButton: '阅读文档',
            helperButton: '查看连接器',
            localeButton: 'English',
            meta: [
                'Zeta Engine',
                'Apache Flink',
                'Apache Spark',
                'CDC / Exactly-Once',
                'Schema Evolution',
            ],
        },
        trust: {
            label: '已被以下团队用于生产环境',
        },
        stats: [
            {value: '9.4k+', label: 'GitHub Stars'},
            {value: '~200', label: '数据连接器'},
            {value: '3', label: '执行引擎'},
            {value: '2.3k+', label: 'GitHub Forks'},
        ],
        architecture: {
            eyebrow: '架构模式',
            titleLead: '不是 ETL',
            titleAccent: '而是 EtLT',
            lead: 'SeaTunnel 负责抽取、轻量转换与装载，把重量级的下游转换保留给仓库或湖仓，让数据链路更清晰也更稳定。',
            headers: {
                sources: '01 上游数据源',
                engine: '02 EtLT 模式',
                targets: '03 下游目标',
            },
            rows: [
                {
                    source: {
                        title: '数据库',
                        tag: 'OLTP / CDC',
                        dotClass: 'orange',
                        chips: ['MySQL', 'PostgreSQL', 'Oracle', 'SQL Server', 'TiDB'],
                    },
                    target: {
                        title: '数仓',
                        tag: 'OLAP',
                        dotClass: 'yellow',
                        chips: ['ClickHouse', 'Apache Doris', 'StarRocks', 'Snowflake'],
                    },
                },
                {
                    source: {
                        title: '消息流',
                        tag: '发布 / 订阅',
                        dotClass: 'blue',
                        chips: ['Apache Kafka', 'Apache Pulsar', 'RocketMQ', 'RabbitMQ'],
                    },
                    target: {
                        title: '湖仓',
                        tag: 'Open Tables',
                        dotClass: 'green',
                        chips: ['Apache Iceberg', 'Apache Hudi', 'Apache Paimon', 'Delta Lake'],
                    },
                },
                {
                    source: {
                        title: '文件与数据湖',
                        tag: '对象存储',
                        dotClass: 'teal',
                        chips: ['Amazon S3', 'Alibaba OSS', 'HDFS', 'LocalFile'],
                    },
                    target: {
                        title: '搜索与向量',
                        tag: '检索',
                        dotClass: 'blue',
                        chips: ['Elasticsearch', 'Typesense', 'Milvus', 'Qdrant'],
                    },
                },
            ],
            enginePillars: [
                {label: '引擎', value: 'Zeta / Flink / Spark'},
                {label: '模式', value: '批处理 / 流处理 / CDC'},
                {label: '保障', value: 'Exactly-once / 模式演进 / 多引擎扩展'},
            ],
            engineFoot: [
                '200+ Connectors',
                'Structured Movement',
                'Production Ready',
            ],
        },
        features: {
            eyebrow: '为什么选择 SeaTunnel',
            title: '从第一天起就是生产级',
            lead: '容错、模式演进和多引擎扩展能力都按分布式生产环境要求设计。',
            schema: {
                number: '01',
                icon: 'schema',
                accent: 'violet',
                title: 'Schema 变化？自动处理',
                description: 'SeaTunnel 能检测上游 Schema 变化并实时同步到下游，减少因为字段变更带来的人工迁移与任务中断。',
            },
            cards: [
                {
                    number: '02',
                    title: '实时 CDC',
                    description: '面向主流数据库的低延迟变更捕获，同时支持从批到流无缝衔接，并避免锁式切换。',
                    icon: 'lightning',
                    accent: 'blue',
                    highlights: ['低延迟', '批流衔接', '无锁切换'],
                },
                {
                    number: '03',
                    title: 'Exactly-Once 语义',
                    description: '基于 checkpoint 的容错保证任务在失败、重试与重启场景下仍保持数据一致性。',
                    icon: 'shield',
                    accent: 'teal',
                    highlights: ['Checkpoint 保障', '失败可恢复', '重启仍一致'],
                },
                {
                    number: '04',
                    title: '多引擎支持',
                    description: '同一份 pipeline 定义可运行在 Zeta、Flink 或 Spark 上，无需重写连接器逻辑与交付链路。',
                    icon: 'layers',
                    accent: 'amber',
                    highlights: ['一份定义', 'Zeta / Flink / Spark', '无需重写连接器'],
                    layout: 'wide',
                },
            ],
        },
        motion: {
            eyebrow: 'See it in motion',
            title: 'Six mechanisms. One integration layer.',
            lead: 'Explore independent examples of parallel reads, CDC, row transforms, table routing, schema evolution, and checkpoint recovery.',
            openButton: 'Open interactive demo',
            frameTitle: 'Interactive SeaTunnel data integration mechanisms demo',
            controls: {
                label: 'Motion demo controls',
                play: 'Play animation',
                pause: 'Pause animation',
                overview: 'All mechanisms',
            },
            mechanisms: [
                {title: 'Parallel reads', description: 'Assign independent source splits to parallel readers.'},
                {title: 'Snapshot + CDC', description: 'Start with a snapshot, then capture changes.'},
                {title: 'Row transforms', description: 'Apply expressions and filters to individual records.'},
                {title: 'Multi-table routing', description: 'Route each table identity to its matching destination.'},
                {title: 'Schema evolution', description: 'Apply supported schema changes before data moves downstream.'},
                {title: 'Checkpoint recovery', description: 'Resume from completed checkpoint state after a failure.'},
            ],
        },
        connectors: {
            eyebrow: '约 200 个原生连接器',
            titleLead: '只要你的数据在那里，',
            titleAccent: 'SeaTunnel 就能连接',
            lead: '覆盖数据库、消息系统、湖仓、搜索系统与对象存储等主流数据系统。',
            categories: [
                {
                    label: 'OLTP 数据库',
                    items: [
                        {name: 'MySQL / MySQL CDC', colorClass: 'orange'},
                        {name: 'PostgreSQL', colorClass: 'blue'},
                        {name: 'Oracle', colorClass: 'red'},
                        {name: 'SQL Server', colorClass: 'maroon'},
                        {name: 'TiDB / MariaDB', colorClass: 'cyan'},
                        {name: '+25 via JDBC', colorClass: 'green'},
                    ],
                },
                {
                    label: '流式与消息系统',
                    items: [
                        {name: 'Apache Kafka', colorClass: 'black'},
                        {name: 'Apache Pulsar', colorClass: 'blue'},
                        {name: 'RabbitMQ', colorClass: 'orange'},
                        {name: 'RocketMQ', colorClass: 'red'},
                        {name: 'AWS SQS', colorClass: 'indigo'},
                        {name: 'ActiveMQ', colorClass: 'green'},
                    ],
                },
                {
                    label: 'OLAP 与分析',
                    items: [
                        {name: 'ClickHouse', colorClass: 'yellow'},
                        {name: 'Apache Doris', colorClass: 'blue'},
                        {name: 'StarRocks', colorClass: 'indigo'},
                        {name: 'Snowflake', colorClass: 'sky'},
                        {name: 'Amazon Redshift', colorClass: 'blue'},
                        {name: 'Cloudberry', colorClass: 'purple'},
                    ],
                },
                {
                    label: '数据湖与存储',
                    items: [
                        {name: 'Amazon S3 / Hudi', colorClass: 'orange'},
                        {name: 'Alibaba OSS', colorClass: 'blue'},
                        {name: 'HDFS / LocalFile', colorClass: 'sky'},
                        {name: 'Apache Iceberg', colorClass: 'green'},
                        {name: 'Delta Lake', colorClass: 'orange'},
                        {name: 'Apache Paimon', colorClass: 'green'},
                    ],
                },
            ],
            more: '还包括：MongoDB / Redis / Elasticsearch / Neo4j / Cassandra / HBase / Druid / HugeGraph / IoTDB / InfluxDB / DynamoDB / Milvus / Qdrant ...',
        },
        code: {
            eyebrow: '设计上就是简单',
            titleLead: '一份配置文件',
            titleTail: '就够了',
            lead: '用一份配置描述 source、transform 与 sink，然后在任意支持的执行引擎上运行，无需重复改写 pipeline。',
            primaryButton: '阅读文档',
            secondaryButton: '查看示例',
            fileName: 'mysql-cdc-to-clickhouse.conf',
        },
        cta: {
            titleLead: '一份 pipeline 定义',
            titleAccent: '运行在 Zeta、Flink 或 Spark 上',
            lead: 'SeaTunnel 把 CDC、模式演进、多模态数据流动与生产级可靠性统一到一个 Apache License 的集成层里。',
            primaryButton: '快速开始',
            secondaryButton: 'GitHub',
            tertiaryButton: 'Slack 入口',
        },
        footer: {
            tagline: '面向现代数据栈的分布式数据集成平台。',
            apache: 'Apache Software Foundation 项目',
            columns: [
                {
                    title: '产品',
                    items: [
                        {label: '概览', hrefKey: 'docsOverview'},
                        {label: '连接器', hrefKey: 'connectors'},
                        {label: '转换', hrefKey: 'transforms'},
                        {label: 'SeaTunnel Web', hrefKey: 'seatunnelWeb'},
                        {label: '变更记录', hrefKey: 'releases'},
                    ],
                },
                {
                    title: '开发者',
                    items: [
                        {label: '文档', hrefKey: 'docsOverview'},
                        {label: '快速开始', hrefKey: 'quickStart'},
                        {label: 'API 参考', hrefKey: 'apiReference'},
                        {label: '参与贡献', hrefKey: 'community'},
                        {label: 'Roadmap', hrefKey: 'roadmap'},
                    ],
                },
                {
                    title: '社区',
                    items: [
                        {label: 'GitHub', hrefKey: 'github'},
                        {label: 'Slack', hrefKey: 'slack'},
                        {label: 'Twitter / X', hrefKey: 'twitter'},
                        {label: '邮件列表', hrefKey: 'mailingList'},
                        {label: '博客', hrefKey: 'blog'},
                    ],
                },
            ],
        },
        askAi: 'Ask AI',
    },
};

function localizePath(language, path) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return language === 'zh-CN' ? `/zh-CN${normalizedPath}` : normalizedPath;
}

function handleFeatureGlow(event) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
}

function prepareMotionDemo(event) {
    const frameDocument = event.currentTarget.contentDocument;
    if (!frameDocument) {
        return;
    }

    frameDocument.querySelector('main')?.style.setProperty('padding', '0');
    frameDocument.querySelector('nav')?.setAttribute('hidden', '');
    frameDocument.querySelector('#hint')?.setAttribute('hidden', '');
}

function ArrowRightIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="m12 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function LightningIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3 5 6v6c0 5 3.5 8.5 7 9 3.5-.5 7-4 7-9V6l-7-3Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m9 12 2 2 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function LayersIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m3 12 9 4.5 9-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m3 16.5 9 4.5 9-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function SchemaIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 5.5h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 12h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 18.5h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="17.5" cy="18.5" r="1.5" fill="currentColor" />
        </svg>
    );
}

function FeatureIcon({icon}) {
    if (icon === 'lightning') {
        return <LightningIcon />;
    }
    if (icon === 'shield') {
        return <ShieldIcon />;
    }
    if (icon === 'schema') {
        return <SchemaIcon />;
    }
    return <LayersIcon />;
}

export default function Home() {
    const {i18n} = useDocusaurusContext();
    const isBrowser = useIsBrowser();
    const pageRef = useRef(null);
    const heroWarpCanvasRef = useRef(null);
    const ctaWarpCanvasRef = useRef(null);
    const flowCanvasRef = useRef(null);
    const architectureBoardRef = useRef(null);
    const architectureGridRef = useRef(null);
    const architectureSvgRef = useRef(null);
    const architectureEngineRef = useRef(null);
    const architectureSourceRefs = useRef([]);
    const architectureTargetRefs = useRef([]);
    const motionFrameRef = useRef(null);
    const [motionDemoReady, setMotionDemoReady] = useState(false);
    const [motionPlaying, setMotionPlaying] = useState(true);
    const [motionFocus, setMotionFocus] = useState(-1);

    const language = isBrowser
        ? (window.location.pathname.startsWith('/zh-CN/') ? 'zh-CN' : 'en')
        : (i18n.currentLocale === 'zh-CN' ? 'zh-CN' : 'en');
    const isChinese = language === 'zh-CN';
    const content = HOME_COPY[language] || HOME_COPY.en;
    const version = versions[0];
    const assetRoot = useBaseUrl('/');
    const docsOverviewPath = useBaseUrl(localizePath(language, `/docs/${version}/introduction/about`));
    const quickStartPath = useBaseUrl(localizePath(language, `/docs/${version}/getting-started/locally/quick-start-seatunnel-engine`));
    const connectorsPath = useBaseUrl(localizePath(language, `/docs/${version}/connectors/source`));
    const logoPath = `${assetRoot}image/logo.png`;
    const motionDemoPath = `${useBaseUrl('/home/seatunnel-motion.html')}?locale=${language}`;

    const getMotionDemo = () => motionFrameRef.current?.contentWindow?.SeaTunnelMotion;

    const syncMotionDemoState = () => {
        const motionDemo = getMotionDemo();
        if (!motionDemo) {
            return;
        }
        setMotionPlaying(motionDemo.state.playing);
        setMotionFocus(motionDemo.state.focus);
    };

    const handleMotionDemoLoad = (event) => {
        prepareMotionDemo(event);
        setMotionDemoReady(true);
        syncMotionDemoState();

        const frameDocument = event.currentTarget.contentDocument;
        const scheduleMotionDemoStateSync = () => window.requestAnimationFrame(syncMotionDemoState);
        frameDocument?.addEventListener('click', scheduleMotionDemoStateSync, true);
        frameDocument?.addEventListener('keydown', scheduleMotionDemoStateSync, true);
    };

    const toggleMotionDemoPlayback = () => {
        const motionDemo = getMotionDemo();
        if (!motionDemo) {
            return;
        }
        motionDemo.state.playing = !motionDemo.state.playing;
        setMotionPlaying(motionDemo.state.playing);
    };

    const focusMotionDemo = (index) => {
        const motionDemo = getMotionDemo();
        if (!motionDemo) {
            return;
        }
        motionDemo.setFocus(index);
        setMotionFocus(index);
    };

    useEffect(() => {
        if (!isBrowser || !pageRef.current) {
            return undefined;
        }

        document.body.classList.add('seatunnel-homepage-page');

        const root = pageRef.current;
        const revealElements = Array.from(root.querySelectorAll('.st-home-rv'));
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (!entry.isIntersecting) {
                    return;
                }
                window.setTimeout(() => {
                    entry.target.classList.add('in');
                    entry.target.querySelectorAll('.st-home-meteor-line').forEach((meteorNode) => {
                        meteorNode.classList.add('go');
                    });
                    if (entry.target.classList.contains('st-home-meteor-line')) {
                        entry.target.classList.add('go');
                    }
                }, index * 65);
                revealObserver.unobserve(entry.target);
            });
        }, {threshold: 0.08});

        // Tie reveal luminance to viewport position so copy brightens as it scrolls into focus.
        const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
        const updateRevealProgress = () => {
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            revealElements.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const start = viewportHeight;
                const end = viewportHeight * 0.28;
                const progress = clamp((start - rect.top) / Math.max(start - end, 1), 0, 1);
                element.style.setProperty('--rv-progress', progress.toFixed(3));
            });
        };
        let revealFrame = 0;
        const requestRevealProgressUpdate = () => {
            if (revealFrame) {
                return;
            }
            revealFrame = window.requestAnimationFrame(() => {
                revealFrame = 0;
                updateRevealProgress();
            });
        };
        revealElements.forEach((element) => revealObserver.observe(element));
        requestRevealProgressUpdate();
        window.addEventListener('scroll', requestRevealProgressUpdate, {passive: true});
        window.addEventListener('resize', requestRevealProgressUpdate);

        const heroTimer = window.setTimeout(() => {
            root.querySelector('#st-home-hero-meteor')?.classList.add('go');
        }, 1300);

        const visibilityHandlers = [];

        const startWarpCanvas = (canvasRef, options = {}) => {
            const canvas = canvasRef.current;
            if (!canvas) {
                return () => {};
            }
            const context = canvas.getContext('2d');
            if (!context) {
                return () => {};
            }

            const {
                alphaMultiplier = 1,
                centerYFactor = 0.45,
                lineCount = 90,
                opacity = 1,
                widthMultiplier = 1,
            } = options;
            const lines = Array.from({length: lineCount}, () => makeWarpLine());
            let frameId;

            function makeWarpLine() {
                return {
                    angle: Math.random() * Math.PI * 2,
                    progress: Math.random(),
                    speed: 0.003 + Math.random() * 0.007,
                    maxFraction: 0.25 + Math.random() * 0.55,
                    hue: 265 + Math.random() * 65,
                    alpha: Math.min((0.25 + Math.random() * 0.55) * alphaMultiplier, 1),
                    width: (0.4 + Math.random() * 1.2) * widthMultiplier,
                };
            }

            function resize() {
                const deviceRatio = window.devicePixelRatio || 1;
                canvas.width = canvas.offsetWidth * deviceRatio;
                canvas.height = canvas.offsetHeight * deviceRatio;
                context.setTransform(deviceRatio, 0, 0, deviceRatio, 0, 0);
            }

            function draw() {
                const width = canvas.offsetWidth;
                const height = canvas.offsetHeight;
                if (!width || !height) {
                    frameId = window.requestAnimationFrame(draw);
                    return;
                }
                context.clearRect(0, 0, width, height);
                context.save();
                context.globalAlpha = opacity;

                const centerX = width * 0.5;
                const centerY = height * centerYFactor;
                const diagonal = Math.hypot(width, height);

                lines.forEach((line) => {
                    line.progress += line.speed;
                    if (line.progress > 1) {
                        Object.assign(line, makeWarpLine());
                        line.progress = 0;
                    }

                    const maxLength = diagonal * line.maxFraction;
                    const tailDistance = maxLength * line.progress * 0.6;
                    const headDistance = maxLength * line.progress;
                    const cosAngle = Math.cos(line.angle);
                    const sinAngle = Math.sin(line.angle);
                    const x1 = centerX + cosAngle * tailDistance;
                    const y1 = centerY + sinAngle * tailDistance;
                    const x2 = centerX + cosAngle * headDistance;
                    const y2 = centerY + sinAngle * headDistance;
                    const gradient = context.createLinearGradient(x1, y1, x2, y2);

                    gradient.addColorStop(0, `hsla(${line.hue},80%,65%,0)`);
                    gradient.addColorStop(0.6, `hsla(${line.hue},80%,68%,${line.alpha * 0.6})`);
                    gradient.addColorStop(1, `hsla(${line.hue},85%,75%,${line.alpha})`);

                    context.beginPath();
                    context.moveTo(x1, y1);
                    context.lineTo(x2, y2);
                    context.strokeStyle = gradient;
                    context.lineWidth = line.width;
                    context.stroke();
                });
                context.restore();

                frameId = window.requestAnimationFrame(draw);
            }

            const visibilityHandler = () => {
                if (document.hidden) {
                    window.cancelAnimationFrame(frameId);
                } else {
                    frameId = window.requestAnimationFrame(draw);
                }
            };

            resize();
            window.addEventListener('resize', resize);
            document.addEventListener('visibilitychange', visibilityHandler);
            visibilityHandlers.push(() => document.removeEventListener('visibilitychange', visibilityHandler));
            frameId = window.requestAnimationFrame(draw);

            return () => {
                window.cancelAnimationFrame(frameId);
                window.removeEventListener('resize', resize);
            };
        };

        const startFlowCanvas = () => {
            const canvas = flowCanvasRef.current;
            if (!canvas) {
                return () => {};
            }
            const context = canvas.getContext('2d');
            if (!context) {
                return () => {};
            }

            let frame = 0;
            let frameId;

            const smoothStep = (value) => {
                const clamped = Math.min(Math.max(value, 0), 1);
                return clamped * clamped * (3 - (2 * clamped));
            };

            function resize() {
                const deviceRatio = window.devicePixelRatio || 1;
                canvas.width = canvas.offsetWidth * deviceRatio;
                canvas.height = canvas.offsetHeight * deviceRatio;
                context.setTransform(deviceRatio, 0, 0, deviceRatio, 0, 0);
            }

            function draw() {
                frame += 1;
                const width = canvas.offsetWidth;
                const height = canvas.offsetHeight;
                if (!width || !height) {
                    frameId = window.requestAnimationFrame(draw);
                    return;
                }
                const centerY = height / 2;
                const dash = 10;
                const gap = 8;
                const period = dash + gap;
                const edgeSoftness = Math.min(width * 0.09, 116);
                const travelPadding = edgeSoftness + 34;
                // Keep the divider motion readable instead of turning it into a noisy scan line.
                const offset = -(frame * 0.13) % period;
                const gradient = context.createLinearGradient(0, 0, width, 0);

                gradient.addColorStop(0, 'rgba(66,184,236,0)');
                gradient.addColorStop(0.06, 'rgba(66,184,236,.75)');
                gradient.addColorStop(0.52, 'rgba(124,58,237,.75)');
                gradient.addColorStop(0.94, 'rgba(240,24,138,.75)');
                gradient.addColorStop(1, 'rgba(240,24,138,0)');

                context.clearRect(0, 0, width, height);
                context.save();
                context.setLineDash([dash, gap]);
                context.lineDashOffset = offset;
                context.beginPath();
                context.moveTo(0, centerY);
                context.lineTo(width, centerY);
                context.strokeStyle = gradient;
                context.lineWidth = 2.5;
                context.stroke();
                context.restore();

                const pulseCount = 5;
                for (let index = 0; index < pulseCount; index += 1) {
                    const phase = ((frame / 760) + (index / pulseCount)) % 1;
                    const pulseX = (-travelPadding) + (phase * (width + (travelPadding * 2)));
                    const edgeAlpha = Math.min(
                        smoothStep(pulseX / edgeSoftness),
                        smoothStep((width - pulseX) / edgeSoftness),
                    );
                    if (edgeAlpha <= 0.001) {
                        continue;
                    }
                    const hueRatio = width > 0 ? (pulseX / width) : 0;
                    const hue = 197 + (hueRatio * 130);
                    const radius = 11 + (Math.sin((frame * 0.022) + index) * 2);
                    const pulseGradient = context.createRadialGradient(pulseX, centerY, 0, pulseX, centerY, radius * 2.2);
                    pulseGradient.addColorStop(0, `hsla(${hue},90%,78%,${edgeAlpha})`);
                    pulseGradient.addColorStop(0.35, `hsla(${hue},85%,68%,${edgeAlpha * 0.55})`);
                    pulseGradient.addColorStop(1, `hsla(${hue},85%,65%,0)`);

                    context.beginPath();
                    context.arc(pulseX, centerY, radius * 2.2, 0, Math.PI * 2);
                    context.fillStyle = pulseGradient;
                    context.fill();
                }

                frameId = window.requestAnimationFrame(draw);
            }

            const visibilityHandler = () => {
                if (document.hidden) {
                    window.cancelAnimationFrame(frameId);
                } else {
                    frameId = window.requestAnimationFrame(draw);
                }
            };

            resize();
            window.addEventListener('resize', resize);
            document.addEventListener('visibilitychange', visibilityHandler);
            visibilityHandlers.push(() => document.removeEventListener('visibilitychange', visibilityHandler));
            frameId = window.requestAnimationFrame(draw);

            return () => {
                window.cancelAnimationFrame(frameId);
                window.removeEventListener('resize', resize);
            };
        };

        const startArchitecturePipelines = () => {
            const grid = architectureGridRef.current;
            const svg = architectureSvgRef.current;
            const engine = architectureEngineRef.current;
            const engineCard = engine?.querySelector('.st-home-architecture-engine-box');
            if (!grid || !svg || !engine || !engineCard) {
                return () => {};
            }

            let syncFrame = 0;
            let resizeObserver;
            const pipeIds = [
                'left-top',
                'left-mid',
                'left-bot',
                'left-core-top',
                'left-core-mid',
                'left-core-bot',
                'right-top',
                'right-mid',
                'right-bot',
                'right-core-top',
                'right-core-mid',
                'right-core-bot',
                'flow-top',
                'flow-mid',
                'flow-bot',
            ];

            const setPath = (id, d) => {
                const path = svg.querySelector(`#${id}`);
                if (path) {
                    path.setAttribute('d', d);
                }
            };

            const clearPaths = () => {
                pipeIds.forEach((id) => setPath(id, 'M 0 0 H 0'));
            };

            const buildHorizontalPath = (fromX, toX, y) => `M ${fromX} ${y} H ${toX}`;

            const buildCenteredConnectorPath = (gapStart, gapEnd, y, ratio, minLength, maxLength) => {
                const availableWidth = gapEnd - gapStart;
                if (availableWidth <= 0) {
                    return 'M 0 0 H 0';
                }
                const connectorLength = Math.min(maxLength, Math.max(minLength, availableWidth * ratio));
                const connectorOffset = (availableWidth - connectorLength) / 2;
                return buildHorizontalPath(gapStart + connectorOffset, gapEnd - connectorOffset, y);
            };

            const syncPipelines = () => {
                syncFrame = 0;
                const layoutRect = grid.getBoundingClientRect();
                if (!layoutRect.width || !layoutRect.height) {
                    clearPaths();
                    return;
                }

                svg.setAttribute('viewBox', `0 0 ${layoutRect.width} ${layoutRect.height}`);

                if (window.innerWidth <= 1024) {
                    clearPaths();
                    return;
                }

                const engineRect = engineCard.getBoundingClientRect();
                if (!engineRect.width || !engineRect.height) {
                    clearPaths();
                    return;
                }

                const toLocal = (rect) => ({
                    left: rect.left - layoutRect.left,
                    right: rect.right - layoutRect.left,
                    top: rect.top - layoutRect.top,
                    bottom: rect.bottom - layoutRect.top,
                    centerY: rect.top - layoutRect.top + (rect.height / 2),
                });

                const engineLocal = toLocal(engineRect);
                const pipeGlobalShift = 2;

                ARCHITECTURE_ROW_KEYS.forEach((key, index) => {
                    const sourceEl = architectureSourceRefs.current[index];
                    const targetEl = architectureTargetRefs.current[index];
                    if (!sourceEl || !targetEl) {
                        setPath(`left-${key}`, 'M 0 0 H 0');
                        setPath(`right-${key}`, 'M 0 0 H 0');
                        setPath(`flow-${key}`, 'M 0 0 H 0');
                        return;
                    }

                    const sourceLocal = toLocal(sourceEl.getBoundingClientRect());
                    const targetLocal = toLocal(targetEl.getBoundingClientRect());
                    const leftGapStart = sourceLocal.right + pipeGlobalShift;
                    const leftGapEnd = engineLocal.left + pipeGlobalShift;
                    const rightGapStart = engineLocal.right + pipeGlobalShift;
                    const rightGapEnd = targetLocal.left + pipeGlobalShift;
                    setPath(
                        `left-${key}`,
                        buildCenteredConnectorPath(
                            leftGapStart,
                            leftGapEnd,
                            sourceLocal.centerY,
                            0.52,
                            22,
                            28,
                        ),
                    );
                    setPath(
                        `left-core-${key}`,
                        buildCenteredConnectorPath(leftGapStart, leftGapEnd, sourceLocal.centerY, 0.3, 12, 16),
                    );
                    setPath(
                        `right-${key}`,
                        buildCenteredConnectorPath(
                            rightGapStart,
                            rightGapEnd,
                            targetLocal.centerY,
                            0.52,
                            22,
                            28,
                        ),
                    );
                    setPath(
                        `right-core-${key}`,
                        buildCenteredConnectorPath(rightGapStart, rightGapEnd, targetLocal.centerY, 0.3, 12, 16),
                    );

                    const laneY = ((sourceLocal.centerY + targetLocal.centerY) / 2).toFixed(2);
                    const sourceRight = (sourceLocal.right + 6 + pipeGlobalShift).toFixed(2);
                    const targetLeft = (targetLocal.left - 6 + pipeGlobalShift).toFixed(2);
                    // Keep the motion path continuous so a single pulse can pass behind the center card.
                    setPath(`flow-${key}`, buildHorizontalPath(sourceRight, targetLeft, laneY));
                });
            };

            const requestSync = () => {
                if (syncFrame) {
                    window.cancelAnimationFrame(syncFrame);
                }
                syncFrame = window.requestAnimationFrame(syncPipelines);
            };

            const observedElements = [
                grid,
                engineCard,
                ...architectureSourceRefs.current,
                ...architectureTargetRefs.current,
            ].filter(Boolean);

            if (window.ResizeObserver) {
                resizeObserver = new ResizeObserver(requestSync);
                observedElements.forEach((element) => resizeObserver.observe(element));
            }

            clearPaths();
            requestSync();
            window.addEventListener('resize', requestSync);

            return () => {
                if (syncFrame) {
                    window.cancelAnimationFrame(syncFrame);
                }
                window.removeEventListener('resize', requestSync);
                if (resizeObserver) {
                    resizeObserver.disconnect();
                }
            };
        };

        const startArchitectureHover = () => {
            const board = architectureBoardRef.current;
            const engine = architectureEngineRef.current;
            const engineCard = engine?.querySelector('.st-home-architecture-engine-box');
            if (!board || !engine || !engineCard) {
                return () => {};
            }

            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            const resetBoard = () => {
                board.classList.remove('is-hovering');
                board.style.setProperty('--tilt-x', '0deg');
                board.style.setProperty('--tilt-y', '0deg');
                board.style.setProperty('--spot-x', '50%');
                board.style.setProperty('--spot-y', '50%');
            };

            const resetEngine = () => {
                engine.classList.remove('is-hovering');
                engineCard.style.setProperty('--engine-shift-x', '0px');
                engineCard.style.setProperty('--engine-shift-y', '0px');
                engineCard.style.setProperty('--engine-spot-x', '50%');
                engineCard.style.setProperty('--engine-spot-y', '12%');
            };

            if (reduceMotion) {
                resetBoard();
                resetEngine();
                return () => {};
            }

            const handleBoardMove = (event) => {
                const rect = board.getBoundingClientRect();
                const px = (event.clientX - rect.left) / rect.width;
                const py = (event.clientY - rect.top) / rect.height;
                const tiltY = (px - 0.5) * 7.5;
                const tiltX = (0.5 - py) * 6.5;

                board.classList.add('is-hovering');
                board.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
                board.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
                board.style.setProperty('--spot-x', `${(px * 100).toFixed(2)}%`);
                board.style.setProperty('--spot-y', `${(py * 100).toFixed(2)}%`);
            };

            const handleEngineMove = (event) => {
                const rect = engine.getBoundingClientRect();
                const px = (event.clientX - rect.left) / rect.width;
                const py = (event.clientY - rect.top) / rect.height;
                const shiftX = (px - 0.5) * 12;
                const shiftY = (py - 0.5) * 10;

                engine.classList.add('is-hovering');
                engineCard.style.setProperty('--engine-shift-x', `${shiftX.toFixed(2)}px`);
                engineCard.style.setProperty('--engine-shift-y', `${shiftY.toFixed(2)}px`);
                engineCard.style.setProperty('--engine-spot-x', `${(px * 100).toFixed(2)}%`);
                engineCard.style.setProperty('--engine-spot-y', `${(py * 100).toFixed(2)}%`);
            };

            board.addEventListener('pointermove', handleBoardMove);
            board.addEventListener('pointerleave', resetBoard);
            engine.addEventListener('pointermove', handleEngineMove);
            engine.addEventListener('pointerleave', resetEngine);
            resetBoard();
            resetEngine();

            return () => {
                board.removeEventListener('pointermove', handleBoardMove);
                board.removeEventListener('pointerleave', resetBoard);
                engine.removeEventListener('pointermove', handleEngineMove);
                engine.removeEventListener('pointerleave', resetEngine);
                resetBoard();
                resetEngine();
            };
        };

        const stopHeroWarpCanvas = startWarpCanvas(heroWarpCanvasRef, {
            alphaMultiplier: 0.48,
            lineCount: 84,
            opacity: 0.88,
            widthMultiplier: 0.88,
        });
        const stopCtaWarpCanvas = startWarpCanvas(ctaWarpCanvasRef);
        const stopFlowCanvas = startFlowCanvas();
        const stopArchitecturePipelines = startArchitecturePipelines();
        const stopArchitectureHover = startArchitectureHover();

        return () => {
            document.body.classList.remove('seatunnel-homepage-page');
            window.clearTimeout(heroTimer);
            revealObserver.disconnect();
            window.removeEventListener('scroll', requestRevealProgressUpdate);
            window.removeEventListener('resize', requestRevealProgressUpdate);
            if (revealFrame) {
                window.cancelAnimationFrame(revealFrame);
            }
            stopHeroWarpCanvas();
            stopCtaWarpCanvas();
            stopFlowCanvas();
            stopArchitecturePipelines();
            stopArchitectureHover();
            visibilityHandlers.forEach((cleanup) => cleanup());
        };
    }, [isBrowser]);

    const schemaExample = [
        '# Before -> After (detected automatically)',
        '',
        '-- v1 schema -------------------------',
        'id       BIGINT',
        'name     VARCHAR(255)',
        '',
        '-- v2 schema (auto-propagated) ------',
        'id       BIGINT',
        'name     VARCHAR(255)',
        'email    VARCHAR(512)    NEW',
        'phone    VARCHAR(32)     ADDED',
    ].join('\n');

    const codeExample = `
<span class="st-home-code-comment"># Real-time: MySQL CDC -&gt; ClickHouse</span>

<span class="st-home-code-keyword">env</span> <span class="st-home-code-punctuation">{</span>
  <span class="st-home-code-key">parallelism</span> <span class="st-home-code-punctuation">=</span> <span class="st-home-code-value">4</span>
  <span class="st-home-code-key">job.mode</span> <span class="st-home-code-punctuation">=</span> <span class="st-home-code-string">"STREAMING"</span>
  <span class="st-home-code-key">checkpoint.interval</span> <span class="st-home-code-punctuation">=</span> <span class="st-home-code-value">10000</span>
<span class="st-home-code-punctuation">}</span>

<span class="st-home-code-keyword">source</span> <span class="st-home-code-punctuation">{</span>
  <span class="st-home-code-keyword">MySQL-CDC</span> <span class="st-home-code-punctuation">{</span>
    <span class="st-home-code-key">hostname</span> <span class="st-home-code-punctuation">=</span> <span class="st-home-code-string">"db.prod.internal"</span>
    <span class="st-home-code-key">username</span> <span class="st-home-code-punctuation">=</span> <span class="st-home-code-string">"reader"</span>
    <span class="st-home-code-key">password</span> <span class="st-home-code-punctuation">=</span> <span class="st-home-code-string">"\${DB_PASS}"</span>
    <span class="st-home-code-key">database-names</span> <span class="st-home-code-punctuation">=</span> <span class="st-home-code-string">["orders"]</span>
    <span class="st-home-code-key">table-names</span> <span class="st-home-code-punctuation">=</span> <span class="st-home-code-string">["orders.events"]</span>
    <span class="st-home-code-key">base-url</span> <span class="st-home-code-punctuation">=</span> <span class="st-home-code-string">"jdbc:mysql://db.prod.internal:3306"</span>
  <span class="st-home-code-punctuation">}</span>
<span class="st-home-code-punctuation">}</span>

<span class="st-home-code-keyword">transform</span> <span class="st-home-code-punctuation">{</span>
  <span class="st-home-code-keyword">Sql</span> <span class="st-home-code-punctuation">{</span>
    <span class="st-home-code-key">query</span> <span class="st-home-code-punctuation">=</span> <span class="st-home-code-string">"""</span>
<span class="st-home-code-string">      SELECT *, NOW() AS synced_at</span>
<span class="st-home-code-string">      FROM events WHERE status != 'deleted'</span>
<span class="st-home-code-string">    """</span>
  <span class="st-home-code-punctuation">}</span>
<span class="st-home-code-punctuation">}</span>

<span class="st-home-code-keyword">sink</span> <span class="st-home-code-punctuation">{</span>
  <span class="st-home-code-keyword">ClickHouse</span> <span class="st-home-code-punctuation">{</span>
    <span class="st-home-code-key">host</span> <span class="st-home-code-punctuation">=</span> <span class="st-home-code-string">"ch.analytics:8123"</span>
    <span class="st-home-code-key">database</span> <span class="st-home-code-punctuation">=</span> <span class="st-home-code-string">"analytics"</span>
    <span class="st-home-code-key">table</span> <span class="st-home-code-punctuation">=</span> <span class="st-home-code-identifier">events_realtime</span>
    <span class="st-home-code-key">primary_key</span> <span class="st-home-code-punctuation">=</span> <span class="st-home-code-string">["id"]</span>
  <span class="st-home-code-punctuation">}</span>
<span class="st-home-code-punctuation">}</span>`;

    return (
        <div className="st-home" ref={pageRef}>
            <section className="st-home-hero">
                <div className="st-home-orb st-home-orb-1"></div>
                <div className="st-home-orb st-home-orb-2"></div>
                <div className="st-home-orb st-home-orb-3"></div>
                <canvas ref={heroWarpCanvasRef} className="st-home-hero-warp-canvas"></canvas>

                <div className="st-home-hero-content">
                    <div className="st-home-hero-badge">
                        <span className="st-home-badge-dot"></span>
                        <span>{content.badge}</span>
                    </div>

                    <h1 className={`st-home-hero-title${isChinese ? ' st-home-hero-title-zh' : ''}`}>
                        {isChinese ? (
                            <>
                                <span className="st-home-hero-title-line">{content.hero.titleLead}</span>
                                <span className="st-home-hero-title-line st-home-hero-title-line-zh">
                                    <span className="st-home-gradient" id="st-home-hero-meteor">{content.hero.titleAccent}</span>
                                    {content.hero.titleTail}
                                </span>
                            </>
                        ) : (
                            <>
                                {content.hero.titleLead}<br />
                                <span className="st-home-gradient" id="st-home-hero-meteor">{content.hero.titleAccent}</span>
                                <br />
                                {content.hero.titleTail}
                            </>
                        )}
                    </h1>

                    <p className="st-home-hero-subtitle">{content.hero.subtitle}</p>

                    <div className="st-home-hero-buttons">
                        <a href={quickStartPath} className="st-home-btn st-home-btn-primary st-home-btn-lg">
                            <span>{content.hero.primaryButton}</span>
                            <ArrowRightIcon />
                        </a>
                        <a href={docsOverviewPath} className="st-home-btn st-home-btn-outline st-home-btn-lg">{content.hero.secondaryButton}</a>
                        <a href={connectorsPath} className="st-home-btn st-home-btn-outline st-home-btn-lg">{content.hero.helperButton}</a>
                    </div>

                    <div className="st-home-hero-meta">
                        {content.hero.meta.map((item) => (
                            <span key={item} className="st-home-meta-tag">{item}</span>
                        ))}
                    </div>
                </div>

                <div className="st-home-hero-fade"></div>
            </section>

            <section className="st-home-stats-band">
                <div className="st-home-container">
                    <div className="st-home-stats-divider">
                        <canvas ref={flowCanvasRef} className="st-home-flow-canvas"></canvas>
                    </div>

                    <div className="st-home-stats st-home-rv">
                        {content.stats.map((stat) => (
                            <div key={stat.label} className="st-home-stat">
                                <div className="st-home-stat-number">{stat.value}</div>
                                <div className="st-home-stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="st-home-section st-home-architecture">
                <div className="st-home-container">
                    <p className="st-home-eyebrow st-home-rv">{content.architecture.eyebrow}</p>
                    <h2 className="st-home-section-title st-home-rv">
                        {content.architecture.titleLead} <span className="st-home-gradient">{content.architecture.titleAccent}</span>
                    </h2>
                    <p className="st-home-section-lead st-home-rv">{content.architecture.lead}</p>

                    <div className="st-home-architecture-board st-home-rv" ref={architectureBoardRef}>
                        <div className="st-home-architecture-board-inner">
                            <div className="st-home-architecture-header">
                                <div className="st-home-architecture-stage">
                                    <span className="st-home-architecture-stage-index">01</span>
                                    <span className="st-home-architecture-stage-label">
                                        {stripArchitectureStageIndex(content.architecture.headers.sources)}
                                    </span>
                                </div>
                                <div className="st-home-architecture-stage st-home-architecture-stage-center">
                                    <span className="st-home-architecture-stage-index">02</span>
                                    <span className="st-home-architecture-stage-label st-home-architecture-stage-label-engine">
                                        {stripArchitectureStageIndex(content.architecture.headers.engine)}
                                    </span>
                                </div>
                                <div className="st-home-architecture-stage st-home-architecture-stage-right">
                                    <span className="st-home-architecture-stage-index">03</span>
                                    <span className="st-home-architecture-stage-label">
                                        {stripArchitectureStageIndex(content.architecture.headers.targets)}
                                    </span>
                                </div>
                            </div>

                            <div className="st-home-architecture-grid" ref={architectureGridRef}>
                                <div className="st-home-architecture-pipelines" aria-hidden="true">
                                    <svg ref={architectureSvgRef} preserveAspectRatio="none" role="presentation">
                                        <defs>
                                            <path id="left-top"></path>
                                            <path id="left-mid"></path>
                                            <path id="left-bot"></path>
                                            <path id="left-core-top"></path>
                                            <path id="left-core-mid"></path>
                                            <path id="left-core-bot"></path>
                                            <path id="right-top"></path>
                                            <path id="right-mid"></path>
                                            <path id="right-bot"></path>
                                            <path id="right-core-top"></path>
                                            <path id="right-core-mid"></path>
                                            <path id="right-core-bot"></path>
                                            <path id="flow-top"></path>
                                            <path id="flow-mid"></path>
                                            <path id="flow-bot"></path>
                                        </defs>

                                        {ARCHITECTURE_ROW_KEYS.map((key) => (
                                            <React.Fragment key={`pipe-left-${key}`}>
                                                <use href={`#left-${key}`} className="st-home-architecture-pipe-base"></use>
                                                <use href={`#left-core-${key}`} className="st-home-architecture-pipe-core-centered"></use>
                                            </React.Fragment>
                                        ))}

                                        {ARCHITECTURE_ROW_KEYS.map((key) => (
                                            <React.Fragment key={`pipe-right-${key}`}>
                                                <use href={`#right-${key}`} className="st-home-architecture-pipe-base"></use>
                                                <use href={`#right-core-${key}`} className="st-home-architecture-pipe-core-centered"></use>
                                            </React.Fragment>
                                        ))}

                                        {ARCHITECTURE_ROW_KEYS.map((key, index) => {
                                            const duration = `${6.5 + (index * 0.3)}s`;
                                            const begin = `${[-1.45, -4.15, -5.7][index]}s`;
                                            return (
                                                <React.Fragment key={`pulse-${key}`}>
                                                    <circle r="7" className="st-home-architecture-pulse st-home-architecture-pulse-ring">
                                                        <animateMotion dur={duration} begin={begin} repeatCount="indefinite">
                                                            <mpath href={`#flow-${key}`}></mpath>
                                                        </animateMotion>
                                                    </circle>
                                                    <circle r="4" className="st-home-architecture-pulse st-home-architecture-pulse-core">
                                                        <animateMotion dur={duration} begin={begin} repeatCount="indefinite">
                                                            <mpath href={`#flow-${key}`}></mpath>
                                                        </animateMotion>
                                                    </circle>
                                                </React.Fragment>
                                            );
                                        })}
                                    </svg>
                                </div>

                                <div className="st-home-architecture-column">
                                    {content.architecture.rows.map((row, index) => (
                                        <div
                                            key={`source-${row.source.title}`}
                                            className="st-home-architecture-card"
                                            data-pipe-source={ARCHITECTURE_ROW_KEYS[index]}
                                            ref={(node) => {
                                                architectureSourceRefs.current[index] = node;
                                            }}>
                                            <div className="st-home-architecture-card-head">
                                                <span className={`st-home-architecture-card-dot st-home-dot-${row.source.dotClass}`}></span>
                                                <span>{row.source.title}</span>
                                                <span className="st-home-architecture-card-tag">{row.source.tag}</span>
                                            </div>
                                            <div className="st-home-architecture-chip-list">
                                                {row.source.chips.map((chip) => (
                                                    <span key={chip} className="st-home-architecture-chip">{chip}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="st-home-architecture-engine" ref={architectureEngineRef}>
                                    <div className="st-home-architecture-engine-box">
                                        <div className="st-home-architecture-engine-logo">
                                            <img src={logoPath} alt="SeaTunnel" />
                                        </div>
                                        <div className="st-home-architecture-engine-name">SeaTunnel</div>
                                        <div className="st-home-architecture-engine-word">
                                            <span className="st-home-architecture-engine-e">E</span>
                                            <span className="st-home-architecture-engine-t-small">t</span>
                                            <span className="st-home-architecture-engine-l">L</span>
                                            <span className="st-home-architecture-engine-t">T</span>
                                        </div>
                                        <div className="st-home-architecture-engine-pillars">
                                            {content.architecture.enginePillars.map((item) => (
                                                <div key={item.label} className="st-home-architecture-engine-pillar">
                                                    <strong>{item.label}</strong>
                                                    <span>{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="st-home-architecture-column">
                                    {content.architecture.rows.map((row, index) => (
                                        <div
                                            key={`target-${row.target.title}`}
                                            className="st-home-architecture-card"
                                            data-pipe-target={ARCHITECTURE_ROW_KEYS[index]}
                                            ref={(node) => {
                                                architectureTargetRefs.current[index] = node;
                                            }}>
                                            <div className="st-home-architecture-card-head">
                                                <span className={`st-home-architecture-card-dot st-home-dot-${row.target.dotClass}`}></span>
                                                <span>{row.target.title}</span>
                                                <span className="st-home-architecture-card-tag">{row.target.tag}</span>
                                            </div>
                                            <div className="st-home-architecture-chip-list">
                                                {row.target.chips.map((chip) => (
                                                    <span key={chip} className="st-home-architecture-chip">{chip}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="st-home-section st-home-features-section">
                <div className="st-home-container">
                    <p className="st-home-eyebrow st-home-rv">{content.features.eyebrow}</p>
                    <h2 className="st-home-section-title st-home-rv">{content.features.title}</h2>
                    <p className="st-home-section-lead st-home-rv">{content.features.lead}</p>

                    <div className="st-home-feature-grid">
                        <article className="st-home-feature-card st-home-feature-card-wide st-home-rv" onMouseMove={handleFeatureGlow}>
                            <div className="st-home-feature-copy st-home-feature-copy-wide">
                                <div className="st-home-feature-number">{content.features.schema.number}</div>
                                <div className={`st-home-feature-icon st-home-feature-icon-${content.features.schema.accent}`}>
                                    <FeatureIcon icon={content.features.schema.icon} />
                                </div>
                                <h3 className="st-home-feature-title st-home-feature-title-large">{content.features.schema.title}</h3>
                                <p className="st-home-feature-description st-home-feature-description-large">{content.features.schema.description}</p>
                            </div>
                            <pre className="st-home-schema-demo">{schemaExample}</pre>
                        </article>

                        {content.features.cards.map((card) => (
                            <article
                                key={card.number}
                                className={`st-home-feature-card st-home-rv${card.layout === 'wide' ? ' st-home-feature-card-span-2' : ''}`}
                                onMouseMove={handleFeatureGlow}>
                                <div className="st-home-feature-number">{card.number}</div>
                                <div className={`st-home-feature-icon st-home-feature-icon-${card.accent}`}>
                                    <FeatureIcon icon={card.icon} />
                                </div>
                                <h3 className="st-home-feature-title">{card.title}</h3>
                                <p className="st-home-feature-description">{card.description}</p>
                                {card.highlights?.length ? (
                                    <div className="st-home-feature-highlights">
                                        {card.highlights.map((item) => (
                                            <span key={item} className="st-home-feature-highlight">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                ) : null}
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="st-home-section st-home-motion-section">
                <div className="st-home-container">
                    <p className="st-home-eyebrow st-home-rv">{content.motion.eyebrow}</p>
                    <h2 className="st-home-section-title st-home-rv">{content.motion.title}</h2>
                    <p className="st-home-section-lead st-home-rv">{content.motion.lead}</p>
                    <a
                        href={motionDemoPath}
                        className="st-home-motion-open st-home-rv"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {content.motion.openButton} <ArrowRightIcon />
                    </a>
                    <div className="st-home-motion-controls st-home-rv" role="group" aria-label={content.motion.controls.label}>
                        <button
                            type="button"
                            className="st-home-motion-control"
                            disabled={!motionDemoReady}
                            onClick={toggleMotionDemoPlayback}
                        >
                            {motionPlaying ? content.motion.controls.pause : content.motion.controls.play}
                        </button>
                        <button
                            type="button"
                            className={`st-home-motion-control${motionFocus === -1 ? ' is-active' : ''}`}
                            disabled={!motionDemoReady}
                            aria-pressed={motionFocus === -1}
                            onClick={() => focusMotionDemo(-1)}
                        >
                            {content.motion.controls.overview}
                        </button>
                        {content.motion.mechanisms.map((mechanism, index) => (
                            <button
                                type="button"
                                className={`st-home-motion-control${motionFocus === index ? ' is-active' : ''}`}
                                disabled={!motionDemoReady}
                                aria-pressed={motionFocus === index}
                                key={mechanism.title}
                                onClick={() => focusMotionDemo(index)}
                            >
                                {mechanism.title}
                            </button>
                        ))}
                    </div>
                    <div className="st-home-motion-frame st-home-rv">
                        <iframe
                            ref={motionFrameRef}
                            className="st-home-motion-iframe"
                            src={motionDemoPath}
                            title={content.motion.frameTitle}
                            loading="lazy"
                            allowFullScreen
                            onLoad={handleMotionDemoLoad}
                        ></iframe>
                    </div>
                    <ul className="st-home-motion-mobile-grid">
                        {content.motion.mechanisms.map((mechanism, index) => (
                            <li className="st-home-motion-mobile-card" key={mechanism.title}>
                                <span>{String(index + 1).padStart(2, '0')}</span>
                                <h3>{mechanism.title}</h3>
                                <p>{mechanism.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="st-home-section st-home-connectors-section">
                <div className="st-home-container">
                    <p className="st-home-eyebrow st-home-eyebrow-blue st-home-rv">{content.connectors.eyebrow}</p>
                    <h2 className="st-home-section-title st-home-rv">
                        {content.connectors.titleLead}<br />
                        <span className="st-home-gradient">{content.connectors.titleAccent}</span>
                    </h2>
                    <p className="st-home-section-lead st-home-rv">{content.connectors.lead}</p>

                    <div className="st-home-connector-categories st-home-rv">
                        {content.connectors.categories.map((category) => (
                            <article key={category.label} className="st-home-connector-category">
                                <div className="st-home-connector-category-label">{category.label}</div>
                                <div className="st-home-connector-list">
                                    {category.items.map((item) => (
                                        <div key={item.name} className="st-home-connector-item">
                                            <span className={`st-home-connector-item-dot st-home-dot-${item.colorClass}`}></span>
                                            <span>{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="st-home-marquee st-home-rv">
                        <div className="st-home-marquee-fade"></div>
                        <div className="st-home-marquee-track">
                            {[...CONNECTOR_MARQUEE_ITEMS, ...CONNECTOR_MARQUEE_ITEMS].map((item, index) => (
                                <span key={`${item}-${index}`} className="st-home-marquee-chip">{item}</span>
                            ))}
                        </div>
                    </div>

                    <div className="st-home-connector-more st-home-rv">{content.connectors.more}</div>
                </div>
            </section>

            <section className="st-home-section st-home-code-section">
                <div className="st-home-container st-home-code-layout">
                    <div className="st-home-code-copy st-home-rv">
                        <p className="st-home-eyebrow">{content.code.eyebrow}</p>
                        <h2 className="st-home-section-title st-home-code-title">
                            {content.code.titleLead}<br />
                            {content.code.titleTail}
                        </h2>
                        <p className="st-home-section-lead st-home-code-lead">{content.code.lead}</p>
                        <div className="st-home-code-actions">
                            <a href={docsOverviewPath} className="st-home-btn st-home-btn-primary">
                                <span>{content.code.primaryButton}</span>
                                <ArrowRightIcon />
                            </a>
                            <a href={EXAMPLES_URL} className="st-home-btn st-home-btn-dark" target="_blank" rel="noreferrer">{content.code.secondaryButton}</a>
                        </div>
                    </div>

                    <div className="st-home-code-box st-home-rv">
                        <div className="st-home-code-topbar">
                            <div className="st-home-code-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span className="st-home-code-filename">{content.code.fileName}</span>
                            <span></span>
                        </div>
                        <pre className="st-home-code-body">
                            <code dangerouslySetInnerHTML={{__html: codeExample}} />
                        </pre>
                    </div>
                </div>
            </section>

            <section className="st-home-cta-section">
                <canvas ref={ctaWarpCanvasRef} className="st-home-warp-canvas"></canvas>
                <div className="st-home-cta-orb st-home-cta-orb-1"></div>
                <div className="st-home-cta-orb st-home-cta-orb-2"></div>
                <div className="st-home-cta-grid"></div>
                <div className="st-home-cta-inner st-home-rv">
                    <h2 className="st-home-cta-title">
                        {content.cta.titleLead}<br />
                        <span className="st-home-gradient">{content.cta.titleAccent}</span>
                    </h2>
                    <p className="st-home-cta-subtitle">{content.cta.lead}</p>
                    <div className="st-home-cta-actions">
                        <a href={quickStartPath} className="st-home-btn st-home-btn-primary st-home-btn-lg">
                            <span>{content.cta.primaryButton}</span>
                            <ArrowRightIcon />
                        </a>
                        <a href={systemConfiguration.github.projectUrl} className="st-home-btn st-home-btn-outline st-home-btn-lg" target="_blank" rel="noreferrer">{content.cta.secondaryButton}</a>
                        <a href={SLACK_URL} className="st-home-btn st-home-btn-outline st-home-btn-lg" target="_blank" rel="noreferrer">{content.cta.tertiaryButton}</a>
                    </div>
                </div>
            </section>

        </div>
    );
}
