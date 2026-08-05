import React from 'react';
import './index.less';
import Layout from '@theme/Layout';
import data from './st_data.json'
import st_web_data from './st_web_data.json'

const getLastPath = path => {
    if (!path) { return '' }

    return path.substring(path.lastIndexOf('/') + 1)
}

export default function () {
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
                                            {st_item.releaseNotes ? <a href={st_item.releaseNotes}>Release Notes</a> : '-'}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <h2>SeaTunnel Web</h2>
                    <p>WARNING: SeaTunnel Web is an experimental project and is not yet production ready.</p>
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
