import React, {useState} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useBaseUrl from '@docusaurus/useBaseUrl';
import config from './languages.json';
import './index.less';
import systemConfiguration from '../../js/sysConfig'
import Airtable from './img/Airtable.svg'
import AppStore from './img/AppStore.svg'
import Elasticsearch from './img/Elasticsearch.svg'
import S3 from './img/S3.svg'
import Clockify from './img/Clockify.svg'
import HubSpot from './img/HubSpot.svg'
import BingAds from './img/BingAds.svg'
import MongoDB from './img/MongoDB.svg'
import MySQL from './img/MySQL.svg'
import PostgreSQL from './img/PostgreSQL.svg'
import SalesForce from './img/SalesForce.svg'
import TiDB from './img/TiDB.svg'
import Redshift from './img/Redshift.svg'
import Kyriba from './img/Kyriba.svg'
import Flexport from './img/Flexport.svg'
import ClickHouse from './img/ClickHouse.svg'
import Courier from './img/Courier.svg'
import DynamoDB from './img/DynamoDB.svg'
import Firebase from './img/Firebase.svg'
import ConvertKit from './img/ConvertKit.svg'
import GitLab from './img/GitLab.svg'
import Jira from './img/Jira.svg'
import Doris from './img/Doris.svg'
import Convex from './img/Convex.svg'

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
                            <a href={'/docs/' + versions[0] + '/about'} className="corner_button blue_fill">{dataSource.common.getStart}</a>
                            <a href={systemConfiguration.github.projectUrl} target="_blank"
                               className="corner_button blue" onMouseOver={() => changeFlag(1)} onMouseOut={() => changeFlag(2)}>
                                <img className="button_icon github1" src={useBaseUrl('/home/icons/github' + flag + '.svg')} alt="github"/>
                                <span>GitHub</span>
                            </a>
                            <a href="https://join.slack.com/t/apacheseatunnel/shared_invite/zt-123jmewxe-RjB_DW3M3gV~xL91pZ0oVQ"
                               target="_blank"
                               className="corner_button blue"
                            >
                                <img className="button_icon" src={useBaseUrl('/home/icons/slack.svg')} alt="slack"/>
                                <span>Slack</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="connector">
                <h1>Architecture Design</h1>
                <p>
                    <span>Currently Supported Quantity</span>
                    <span>100+</span>
                </p>
                <div>
                    <div className="connector_box">
                        <h3>Source</h3>
                        <div className="connector_row">
                            <div>
                                <MySQL />
                            </div>
                            <div>
                                <PostgreSQL />
                            </div>
                            <div>
                                <BingAds />
                            </div>
                        </div>
                        <div className="connector_row">
                            <div>
                                <MongoDB />
                            </div>
                            <div>
                                <Elasticsearch />
                            </div>
                            <div>
                                <TiDB />
                            </div>
                        </div>
                        <div className="connector_row">
                            <div>
                                <S3 />
                            </div>
                            <div>
                                <HubSpot />
                            </div>
                            <div>
                                <SalesForce />
                            </div>
                        </div>
                        <div className="connector_row">
                            <div>
                                <Airtable />
                            </div>
                            <div>
                                <AppStore />
                            </div>
                            <div>
                                <Clockify />
                            </div>
                        </div>
                    </div>
                    <div className="connector_transforms">
                        <h3>Transforms</h3>
                        <div>
                            <div>Copy</div>
                            <div>FieldMapper</div>
                            <div>FilterRowKind</div>
                            <div>Filter</div>
                            <div>Replace</div>
                            <div>Split</div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/Connector-v2-release-state'}>Show More</div>
                        </div>
                    </div>
                    <div className="connector_box">
                        <h3>Sink</h3>
                        <div className="connector_row">
                            <div>
                                <Redshift />
                            </div>
                            <div>
                                <Jira />
                            </div>
                            <div>
                                <Kyriba />
                            </div>
                        </div>
                        <div className="connector_row">
                            <div>
                                <Doris />
                            </div>
                            <div>
                                <ClickHouse />
                            </div>
                            <div>
                                <Courier />
                            </div>
                        </div>
                        <div className="connector_row">
                            <div>
                                <Convex />
                            </div>
                            <div>
                                <Firebase />
                            </div>
                            <div>
                                <ConvertKit />
                            </div>
                        </div>
                        <div className="connector_row">
                            <div>
                                <Flexport />
                            </div>
                            <div>
                                <DynamoDB />
                            </div>
                            <div>
                                <GitLab />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main feature">
                <div className="block">
                    <h1 className="main_subtitle text_center">{dataSource.common.coreFeatures}</h1>
                    <div className="features item_block text_center">

                        <div className="feature_item components">
                            <h3 className="item-title">{dataSource.common.components}</h3>
                            <p className="item-desc">{dataSource.home.feature.components}</p>
                        </div>

                        <div className="feature_item scalability">
                            <h3 className="item-title">{dataSource.common.scalability}</h3>
                            <p className="item-desc">{dataSource.home.feature.scalability}</p>
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
        </div>

    );
}
