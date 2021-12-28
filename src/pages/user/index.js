import React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useBaseUrl from '@docusaurus/useBaseUrl';
import config from './languages';
import './index.less';
import img from './images';
import Layout from '@theme/Layout';

export default function () {
    const isBrowser = useIsBrowser();
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
                                img.map((item, i) => (
                                    <div key={i} index={i} className="case_item">
                                        <img src={useBaseUrl('/user/' + item.url)} alt="name"/>
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
