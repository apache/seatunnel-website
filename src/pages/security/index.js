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
                <h1 className="team_title">Security Issues</h1>
                <h2 className="team_title">Apache SeaTunnel Security</h2>
                <p className="team_desc">{dataSource.info.security_p_one}<a
                    href="http://www.apache.org/security/">{dataSource.info.security_team}</a>{dataSource.info.security_p_two}<a
                    href="security@apache.org">security@apache.org</a>. {dataSource.info.security_p_three}
                </p>
                <p className="team_desc">{dataSource.info.securitylink}</p>
                <p className="team_desc">{dataSource.info.security_p_notice}</p>
                <p className="team_desc">{dataSource.info.security_p_seatunnel_web_notice}</p>
                <p className="team_desc">{dataSource.info.security_p_seatunnel_zeta_notice}</p>
                <p className="team_desc">{dataSource.info.tip}</p>
                <h2 className="team_title">Frequently Asked Questions</h2>
                <h3 className="team_title">{dataSource.info.faq_p_one}</h3>
                <p className="team_desc">{dataSource.info.faq_p_one_answer_1}</p>
                <p className="team_desc">{dataSource.info.faq_p_one_answer_2}</p>
                <p className="team_desc">{dataSource.info.faq_p_one_answer_3}</p>
            </div>
        </Layout>
    );
}
