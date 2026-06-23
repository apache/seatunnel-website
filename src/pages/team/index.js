import React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import config from "./languages.json";
import avatarSrc from "./github-avatars.json";
import contributorData from "./pr-contributors.json";
import Layout from '@theme/Layout';
import './index.less';

const avatarByUserId = new Map(
    avatarSrc.map((item) => [item.id, "data:image/png;base64," + item.avatar_base64])
);

function getAvatarUrl(member) {
    return avatarByUserId.get(member.userId) || member.avatarUrl || "";
}

function TeamSection({title, description, members}) {
    return (
        <>
            <h3 className="team_title">{title}</h3>
            <p className="team_desc">{description}</p>
            <ul className="character_list">
                {
                    members.map((item) => (
                        <li className="character_item text_center" key={item.key || item.githubId} style={{listStyle: "none"}}>
                            <a href={item.profileUrl || "https://github.com/" + item.githubId} target="_blank" rel="noreferrer">
                                <img className="character_avatar" src={getAvatarUrl(item)} alt={item.name}/>
                                <div className="character_desc">
                                    <h3 className="character_id"><span className="githubId">githubId:</span>{item.githubId}</h3>
                                </div>
                            </a>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}

export default function () {
    const isBrowser = useIsBrowser();
    const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en';
    const dataSource = config?.[language];
    const contributors = contributorData.contributors || contributorData;
    const contributorSummary = contributorData.summary || {
        displayedContributors: contributors.length,
        existingTeamContributors: 0,
        totalContributors: contributors.length,
    };
    const contributorDesc = dataSource.info.prContributorDesc
        .replace('{count}', String(contributorSummary.displayedContributors))
        .replace('{existingCount}', String(contributorSummary.existingTeamContributors))
        .replace('{totalCount}', String(contributorSummary.totalContributors));

    return (
        <Layout>
            <div className="block team_page">
                <h3 className="team_title">SeaTunnel Team</h3>
                <p className="team_desc" dangerouslySetInnerHTML={ { __html: dataSource.info.desc } }/>

                <TeamSection title="PMC" description={dataSource.info.tip} members={config.pmc}/>

                <TeamSection title="Committer" description={dataSource.info.tip} members={config.committer}/>
                <TeamSection title={dataSource.info.prContributorTitle} description={contributorDesc} members={contributors}/>
            </div>
        </Layout>
    );
}
