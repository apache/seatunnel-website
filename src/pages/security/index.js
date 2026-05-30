import React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import config from "./languages.json";
import Layout from '@theme/Layout';
import './index.less';

export default function () {
    const isBrowser = useIsBrowser();
    const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en';
    const dataSource = config?.[language] || config?.en;
    const info = dataSource.info;

    const renderList = (items) => (
        <ul className="security_list">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );

    return (
        <Layout>
            <div className="block team_page">
                <h1 className="team_title">Security Issues</h1>
                <h2 className="team_title">Apache SeaTunnel Security</h2>
                <p className="team_desc">{info.security_p_one}<a
                    href="https://www.apache.org/security/">{info.security_team}</a>{info.security_p_two}<a
                    href="mailto:security@apache.org">security@apache.org</a>. {info.security_p_three}
                </p>
                <p className="team_desc">{info.security_p_notice}</p>

                <h2 className="team_title">{info.security_model_title}</h2>
                <p className="team_desc">{info.security_model_intro}</p>
                <h3 className="team_title">{info.security_model_seatunnel_web_title}</h3>
                <p className="team_desc">{info.security_p_seatunnel_web_notice}</p>
                <h3 className="team_title">{info.security_model_seatunnel_zeta_title}</h3>
                <p className="team_desc">{info.security_p_seatunnel_zeta_notice}</p>
                {renderList(info.security_model_items)}

                <h2 className="team_title">{info.deployment_title}</h2>
                {renderList(info.deployment_items)}

                <p className="team_desc">{info.tip}</p>

                <h2 className="team_title">Frequently Asked Questions</h2>
                <h3 className="team_title">{info.faq_p_one}</h3>
                <p className="team_desc">{info.faq_p_one_answer_1}</p>
                <p className="team_desc">{info.faq_p_one_answer_2}</p>
                <p className="team_desc">{info.faq_p_one_answer_3}</p>
                <h3 className="team_title">{info.faq_p_two}</h3>
                <p className="team_desc">{info.faq_p_two_answer_1}</p>
                <p className="team_desc">{info.faq_p_two_answer_2}</p>
                <h3 className="team_title">{info.faq_p_three}</h3>
                <p className="team_desc">{info.faq_p_three_answer_1}</p>
                <p className="team_desc">{info.faq_p_three_answer_2}</p>
            </div>
        </Layout>
    );
}
