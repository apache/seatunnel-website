import React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import config from "./languages.json";
import Layout from '@theme/Layout';
import './index.less';

export default function () {
    const isBrowser = useIsBrowser();
    const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en';
    const dataSource = config?.[language];

    return (
        <Layout>
            <div className="block team_page">
                <h3 className="team_title">security issues</h3>
                <h3 className="team_title">Apache SeaTunnel Security</h3>
                <p className="team_desc">{dataSource.info.desc}</p>
                <p className="team_desc">{dataSource.info.securitylink}</p>
                <p className="team_desc">{dataSource.info.tip}</p>
            </div>
        </Layout>
    );
}
