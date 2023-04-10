import React, {useState} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useBaseUrl from '@docusaurus/useBaseUrl';
import config from './languages.json';
import './index.less';
import systemConfiguration from '../../js/sysConfig'
import GitHub from './img/GitHub.svg'
import GoogleSheets from './img/GoogleSheets.svg'
import Elasticsearch from './img/Elasticsearch.svg'
import S3 from './img/S3.svg'
import Lemlist from './img/Lemlist.svg'
import Notion from './img/Notion.svg'
import MongoDB from './img/MongoDB.svg'
import MySQL from './img/MySQL.svg'
import OneSignal from './img/OneSignal.svg'
import Persistlq from './img/Persistlq.svg'
import ApacheKafka from './img/ApacheKafka.svg'
import Sentry from './img/Sentry.svg'
import Slack from './img/Slack.svg'
import ClickHouse from './img/ClickHouse.svg'
import DynamoDB from './img/DynamoDB.svg'
import GitLab from './img/GitLab.svg'
import Jira from './img/Jira.svg'
import Doris from './img/Doris.svg'

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
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/source/MySQL-CDC'}>
                                <MySQL />
                            </div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/source/OneSignal'}>
                                <OneSignal />
                            </div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/source/Notion'}>
                                <Notion />
                            </div>
                        </div>
                        <div className="connector_row">
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/source/GoogleSheets'}>
                                <GoogleSheets />
                            </div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/source/Lemlist'}>
                                <Lemlist />
                            </div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/source/Jira'}>
                                <Jira />
                            </div>
                        </div>
                        <div className="connector_row">
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/source/Persistiq'}>
                                <Persistlq />
                            </div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/source/Github'}>
                                <GitHub />
                            </div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/source/Gitlab'}>
                                <GitLab />
                            </div>
                        </div>
                    </div>
                    <div className="connector_transforms">
                        <h3>Transforms</h3>
                        <div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/transform-v2/copy'}>Copy</div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/transform-v2/field-mapper'}>FieldMapper</div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/transform-v2/filter-rowkind'}>FilterRowKind</div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/transform-v2/filter'}>Filter</div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/transform-v2/replace'}>Replace</div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/transform-v2/split'}>Split</div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/Connector-v2-release-state'}>Show More</div>
                        </div>
                    </div>
                    <div className="connector_box">
                        <h3>Sink</h3>
                        <div className="connector_row">
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/sink/Sentry'}>
                                <Sentry />
                            </div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/sink/Kafka'}>
                                <ApacheKafka />
                            </div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/sink/Slack'}>
                                <Slack />
                            </div>
                        </div>
                        <div className="connector_row">
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/sink/Doris'}>
                                <Doris />
                            </div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/sink/Clickhouse'}>
                                <ClickHouse />
                            </div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/sink/AmazonDynamoDB'}>
                                <DynamoDB />
                            </div>
                        </div>
                        <div className="connector_row">
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/sink/S3File'}>
                                <S3 />
                            </div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/sink/Elasticsearch'}>
                                <Elasticsearch />
                            </div>
                            <div onClick={() => window.location.href = 'https://seatunnel.apache.org/docs/2.3.1/connector-v2/sink/MongoDB'}>
                                <MongoDB />
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
