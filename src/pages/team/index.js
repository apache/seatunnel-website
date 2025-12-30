import React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import config from "./languages.json";
import avatarSrc from "./github-avatars.json";
import Layout from '@theme/Layout';
import './index.less';

// Get avatar URL by user ID from Base64 data
function avatarUrl(id) {
    const avatarObj = avatarSrc.find((item) => item.id === id);
    if (avatarObj) {
        return "data:image/png;base64," + avatarObj.avatar_base64;
    }
    return "";
}

export default function () {
    const isBrowser = useIsBrowser();
    const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en';
    const dataSource = config?.[language];

    return (
        <Layout>
            <div className="block team_page">
                <h3 className="team_title">SeaTunnel Team</h3>
                <p className="team_desc" dangerouslySetInnerHTML={ { __html: dataSource.info.desc } }/>

                <h3 className="team_title">PMC</h3>
                <p className="team_desc">{dataSource.info.tip}</p>
                <ul className="character_list">
                    {
                        config.pmc.map((item, i) => (
                            <a href={'https://github.com/' + item.githubId} key={i} target="_blank">
                                <li className="character_item text_center" style={{'listStyle': 'none'}}>
                                    <img className="character_avatar" src={avatarUrl(item.userId)} alt={item.name}/>
                                    <div className="character_desc">
                                        <h3 className="character_id"><span className="githubId">githubId:</span>{item.githubId}</h3>
                                    </div>
                                </li>
                            </a>
                        ))
                    }
                </ul>

                <h3 className="team_title">Committer</h3>
                <p className="team_desc">{dataSource.info.tip}</p>
                <ul className="character_list">
                  {
                      config.committer.map((item, i) => (
                      <a href={'https://github.com/' + item.githubId} key={i} target="_blank">
                        <li className="character_item text_center" style={{'listStyle': 'none'}}>
                          <img className="character_avatar" src={avatarUrl(item.userId)} alt={item.name}/>
                          <div className="character_desc">
                            <h3 className="character_id"><span className="githubId">githubId:</span>{item.githubId}</h3>
                          </div>
                        </li>
                      </a>
                    ))
                  }
                </ul>
            </div>
        </Layout>
    );
}
