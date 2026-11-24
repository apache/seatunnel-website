import React from 'react';
import './index.less';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import data from './st_data.json'
import st_web_data from './st_web_data.json'
import st_edge_data from './st_edge_data.json'

const getLastPath = path => {
    if (!path) {
        return ''
    }

    return path.substring(path.lastIndexOf('/') + 1)
}

export default function () {
    const {i18n: {currentLocale}} = useDocusaurusContext();
    const isChinese = currentLocale === 'zh-CN';
    const advisoryUrl = 'https://www.openwall.com/lists/oss-security/2026/11/18/3';
    const cliUrl = '/docs/3.1.0/engines/zeta/user-command/';
    return (
        <Layout>
            <div className="main">
                <div>
                    <h1>Download the SeaTunnel releases</h1>
                    <p>Use the links below to download the Apache SeaTunnel from one of our mirrors.</p>
                    <h2>SeaTunnel</h2>
                    <table className="version-table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Version</th>
                            <th>Binary Distribution</th>
                            <th>Source Code</th>
                            <th>Release Notes</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map(st_item => {
                                return (
                                    <tr key={st_item.version}>
                                        <td>{st_item.date}</td>
                                        <td>{st_item.version}</td>
                                        <td>
                                            <a href={st_item.binaryDistribution.bin}>[bin] {getLastPath(st_item.binaryDistribution.bin)}</a>
                                            <a href={st_item.binaryDistribution.asc}>[asc] {getLastPath(st_item.binaryDistribution.asc)}</a>
                                            <hr/>
                                            <a href={st_item.binaryDistribution.sha512}>[sha512] {getLastPath(st_item.binaryDistribution.sha512)}</a>
                                        </td>
                                        <td>
                                            <a href={st_item.sourceCode.src}>[src] {getLastPath(st_item.sourceCode.src)}</a>
                                            <a href={st_item.sourceCode.asc}>[asc] {getLastPath(st_item.sourceCode.asc)}</a>
                                            <hr/>
                                            <a href={st_item.sourceCode.sha512}>[sha512] {getLastPath(st_item.sourceCode.sha512)}</a>
                                        </td>
                                        <td>
                                            {st_item.releaseNotes ?
                                                <a href={st_item.releaseNotes}>Release Notes</a> : '-'}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <h2>SeaTunnel Edge Agent</h2>
                    <table className="version-table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Version</th>
                            <th>Binary Distribution</th>
                            <th>Source Code</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            st_edge_data.map(st_edge_item => {
                                return (
                                    <tr key={st_edge_item.version}>
                                        <td>{st_edge_item.date}</td>
                                        <td>{st_edge_item.version}</td>
                                        <td>
                                            <a href={st_edge_item.binaryDistribution.bin}>[bin] {getLastPath(st_edge_item.binaryDistribution.bin)}</a>
                                            <a href={st_edge_item.binaryDistribution.asc}>[asc] {getLastPath(st_edge_item.binaryDistribution.asc)}</a>
                                            <hr/>
                                            <a href={st_edge_item.binaryDistribution.sha512}>[sha512] {getLastPath(st_edge_item.binaryDistribution.sha512)}</a>
                                        </td>
                                        <td>
                                            <a href={st_edge_item.sourceCode.src}>[src] {getLastPath(st_edge_item.sourceCode.src)}</a>
                                            <a href={st_edge_item.sourceCode.asc}>[asc] {getLastPath(st_edge_item.sourceCode.asc)}</a>
                                            <hr/>
                                            <a href={st_edge_item.sourceCode.sha512}>[sha512] {getLastPath(st_edge_item.sourceCode.sha512)}</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <h2>SeaTunnel Web</h2>
                    {isChinese ? (
                        <p>
                            <strong>Apache SeaTunnel Web 子仓库已退役，不再维护。</strong>
                            此变更不影响 Apache SeaTunnel 主项目。请使用 <a href={cliUrl}>SeaTunnel Engine 客户端命令行</a>管理同步作业。
                            以下版本仅供历史查阅。
                        </p>
                    ) : (
                        <p>
                            <strong>Apache SeaTunnel Web sub-project has been retired and is no longer maintained.</strong>
                            The Apache SeaTunnel project is not affected by this retirement.
                            Use the <a href={cliUrl}>SeaTunnel Engine client command line</a> to manage jobs.
                            Releases below are listed for historical reference only.
                        </p>
                    )}
                    <table className="version-table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Version</th>
                            <th>Binary Distribution</th>
                            <th>Source Code</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            st_web_data.map(st_web_item => {
                                return (
                                    <tr key={st_web_item.version}>
                                        <td>{st_web_item.date}</td>
                                        <td>{st_web_item.version}</td>
                                        <td>
                                            <a href={st_web_item.binaryDistribution.bin}>[bin] {getLastPath(st_web_item.binaryDistribution.bin)}</a>
                                            <a href={st_web_item.binaryDistribution.asc}>[asc] {getLastPath(st_web_item.binaryDistribution.asc)}</a>
                                            <hr/>
                                            <a href={st_web_item.binaryDistribution.sha512}>[sha512] {getLastPath(st_web_item.binaryDistribution.sha512)}</a>
                                        </td>
                                        <td>
                                            <a href={st_web_item.sourceCode.src}>[src] {getLastPath(st_web_item.sourceCode.src)}</a>
                                            <a href={st_web_item.sourceCode.asc}>[asc] {getLastPath(st_web_item.sourceCode.asc)}</a>
                                            <hr/>
                                            <a href={st_web_item.sourceCode.sha512}>[sha512] {getLastPath(st_web_item.sourceCode.sha512)}</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
