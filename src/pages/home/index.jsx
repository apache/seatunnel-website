import React, {useState} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useBaseUrl from '@docusaurus/useBaseUrl';
import config from './languages.json';
import './index.less';
import systemConfiguration from '../../js/sysConfig'

const versions = require('../../../versions.json');

export default function () {
    const [flag, setFlag] = useState(1)
    const isBrowser = useIsBrowser();

    const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en';
    const dataSource = config?.[language];

    function changeFlag(val) {
        setFlag(val == 1 ? 2 : 1)
    }

    return (
        <div>
            <div className="main slogan">
                <div className="block">

                    <div className="banner text_center">
                        <h1 className="main_title"><span className="apache">Apache</span> <span
                            className="seatunnel">SeaTunnel</span>
                            <span className="badge">Incubating</span>
                        </h1>

                        <p className="main_slogan">{dataSource.home.banner.slogan}</p>
                        
                        <div className="button_row center">
                            {/* TODO next release should be change to /category/start */}
                            <a href={'/docs/' + versions[0] + '/about'} className="corner_button link_btn blue_fill">{dataSource.common.getStart}</a>
                            <a href={systemConfiguration.github.projectUrl} target="_blank"
                            className="corner_button link_btn blue" onMouseOver={() => changeFlag(1)} onMouseOut={() => changeFlag(2)}>
                                <img className="button_icon github1" src={useBaseUrl('/home/icons/github' + flag + '.svg')} alt="github"/>
                                <span>GitHub</span>
                            </a>
                            <a href="https://the-asf.slack.com/archives/C053HND1D6X"
                            target="_blank"
                            className="corner_button link_btn blue"
                            >
                                <img className="button_icon" src={useBaseUrl('/home/icons/slack.svg')} alt="slack"/>
                                <span>Slack</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main introduction">
                <div className="block">
                    <div className="main_intro">
                        <img src={useBaseUrl('/home/intro_en.png')} alt="" />
                    </div>
                
                </div>
            </div>

            <div className="main feature">
                <div className="block">
                    <h1 className="main_subtitle text_center">{dataSource.home.feature.mainTitle}</h1>
                    <h2 className="sub_subtitle text_center">{dataSource.home.feature.subTitle}</h2>
                    
                    <div className="features item_block text_center">

                        <div className="feature_item components">
                            <h3 className="item-title">{dataSource.common.reduceComplexity}</h3>
                            <p className="item-desc">{dataSource.home.feature.reduceComplexity}</p>
                        </div>

                        <div className="feature_item scalability">
                            <h3 className="item-title">{dataSource.common.lesstime}</h3>
                            <p className="item-desc">{dataSource.home.feature.lesstime}</p>
                        </div>

                        <div className="feature_item simplicity">
                            <h3 className="item-title">{dataSource.common.simplicity}</h3>
                            <p className="item-desc">{dataSource.home.feature.simplicity}</p>
                        </div>

                        <div className="feature_item stable">
                            <h3 className="item-title">{dataSource.common.stable}</h3>
                            <p className="item-desc">{dataSource.home.feature.stable}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main fun_feature">
                <div className="block">
                    <div className="feature_list">
                        {
                            dataSource.home.featureList.map((item, index) => {
                                return (
                                    <div className="feat_item" key={index}>
                                        {
                                            item.leftImg && 
                                            <div className="feature_img">
                                                <img src={useBaseUrl(item.imgSrc || `/home/introduction${ index + 1}.png`)} alt="" />
                                            </div>
                                        }

                                        <div className="img_explain">
                                            {
                                                item.features.map(feature => {
                                                    return (
                                                        <div className="explain_item" key={feature.title}>
                                                          {
                                                            feature.link ? <a className="see_more" href={`/docs/${versions[0]}${feature.link}`} target="_blank">
                                                                <h3 className="explain_title">{feature.title}</h3>
                                                            </a>
                                                            :
                                                            <h3 className="explain_title">{feature.title}</h3>

                                                          }
                                                            <p className="explain_desc">{feature.desc}</p>
                                                        </div>
                                                    )
                                                })                                                
                                            }
                                        </div>

                                        {
                                            !item.leftImg && 
                                            <div className="feature_img">
                                                <img src={useBaseUrl(item.imgSrc || `/home/introduction${ index + 1}.png`)} alt="" />
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
