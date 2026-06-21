import React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import config from './languages';
import './index.less';
import img from './images';
import additionalUsers from './additionalUsers';
import Layout from '@theme/Layout';

const users = [...img, ...additionalUsers];

export default function UserPage() {
    const isBrowser = useIsBrowser();
    const {withBaseUrl} = useBaseUrlUtils();
    const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en';
    const dataSource = config?.[language];

    return (
        <Layout>
            <div>
                <div className="main" style={{padding: "10px 0 30px"}}>
                    <div className="block">
                        <h1 className="main_title text_center">{dataSource.common.ourUsers}</h1>
                        <div className="desc" dangerouslySetInnerHTML={{__html: dataSource.common.tip}}>
                        </div>
                        <div className="user_case home_block">
                            {
                                users.map((item, i) => (
                                    <div
                                        key={`${item.label}-${i}`}
                                        index={i}
                                        className="case_item case_item--text-logo"
                                        title={item.title || item.label || item.alt || 'User logo'}
                                    >
                                        <img
                                            className="case_icon"
                                            src={withBaseUrl('/user/' + item.icon)}
                                            alt={item.alt || item.label || 'User logo'}
                                        />
                                        <span className="case_label">{item.label}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
