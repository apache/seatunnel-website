import React, {useState} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useBaseUrl from '@docusaurus/useBaseUrl';
import config from './languages.json';
import './index.less';
import systemConfiguration from '../../js/sysConfig'

const versions = require('../../../versions.json');

const connectorImgs = [
    { key: 'MySQL-CDC', path: 'MySQL-CDC', imgSrc: 'MySQL-CDC.svg', type: 'source' },
    { key: 'PostgreSql', path: 'Jdbc#appendix', imgSrc: 'PostgreSql.svg', type: 'source' },
    { key: 'Neo4j', path: 'Neo4j', imgSrc: 'Neo4j.jpeg', type: 'source' },
    { key: 'Clickhouse', path: 'Clickhouse', imgSrc: 'Clickhouse.png', type: 'source' },
    { key: 'InfluxDB', path: 'InfluxDB', imgSrc: 'InfluxDB.png', type: 'source' },
    { key: 'MongoDB', path: 'MongoDB', imgSrc: 'MongoDB.png', type: 'source' },
    { key: 'Hive', path: 'Hive', imgSrc: 'Hive.png', type: 'source' },
    { key: 'Greenplum', path: 'Greenplum', imgSrc: 'Greenplum.jpeg', type: 'source' },
    { key: 'Hudi', path: 'Hudi', imgSrc: 'Hudi.png', type: 'source' },
    { key: 'Iceberg', path: 'Iceberg', imgSrc: 'Iceberg.png', type: 'source' },
    { key: 'oracle', path: 'Jdbc#appendix', imgSrc: 'oracle.png', type: 'source' },
    { key: 'db2', path: 'Jdbc#appendix', imgSrc: 'db2.svg', type: 'source' },
    { key: 'SqlServer-CDC', path: 'SqlServer-CDC', imgSrc: 'SqlServer-CDC.svg', type: 'source' },
    { key: 'S3File', path: 'S3File', imgSrc: 'S3File.svg', type: 'source' },
    { key: 'S3-Redshift', path: 'S3-Redshift', imgSrc: 'S3-Redshift.png', type: 'sink' },
    { key: 'kafka', path: 'kafka', imgSrc: 'kafka.svg', type: 'source' },
    { key: 'GoogleSheets', path: 'GoogleSheets', imgSrc: 'GoogleSheets.svg', type: 'source' },
    { key: 'Notion', path: 'Notion', imgSrc: 'Notion.svg', type: 'source' },
    { key: 'Doris', path: 'Doris', imgSrc: 'Doris.png', type: 'sink' },
    { key: 'Datahub', path: 'Datahub', imgSrc: 'Datahub.jpeg', type: 'sink' },
    { key: 'SftpFile', path: 'SftpFile', imgSrc: 'SftpFile.png', type: 'source' },
    { key: 'Github', path: 'Github', imgSrc: 'Github.svg', type: 'source' },
    { key: 'excel', path: 'Jdbc#appendix', imgSrc: 'excel.png', type: 'source' },
    { key: 'Elasticsearch', path: 'Elasticsearch', imgSrc: 'Elasticsearch.svg', type: 'source' },
];

// postgreSql db2 excel oracle => jdbc
const Connector =  function(){
    return (
        <div className="connector_img_wrap">
            {
                connectorImgs.map(connector => {
                    return (
                                <div className="connector_img_item" key={connector.key}>
                                    <a href={`/docs/${versions[0]}/connector-v2/${connector.type}/${connector.path}`} target="_blank" className="connector_link">
                                        <img src={useBaseUrl(`/home/connector/${connector.imgSrc}`)} alt="" />
                                    </a>
                                </div>
                            )
                })
            }
        </div>
    )

} 

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
                                                {
                                                    item.name === 'connector' 
                                                    ? <Connector/>
                                                    : <img src={useBaseUrl(item.imgSrc || `/home/introduction${ index + 1}.png`)} alt="" />
                                                }
                                                
                                            </div>
                                        }

                                        <div className="img_explain">
                                            {
                                                item.features.map(feature => {
                                                    return (
                                                        <div className="explain_item" key={feature.title}>
                                                          
                                                            <a className="see_more" href={`/docs/${versions[0]}${feature.link || '/about'}`} target="_blank">
                                                                <h3 className="explain_title">{feature.title}</h3>
                                                            </a>
                                                            
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
