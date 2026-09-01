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

/**
 * Returns the embedded avatar for listed team members and a bounded GitHub thumbnail for
 * generated contributors. The size constraint prevents the network view from downloading
 * hundreds of original-resolution images when it enters the viewport.
 */
function getAvatarUrl(member) {
    const avatarUrl = avatarByUserId.get(member.userId) || member.avatarUrl || "";

    if (!avatarUrl.startsWith("https://avatars.githubusercontent.com/")) {
        return avatarUrl;
    }
    return avatarUrl + (avatarUrl.includes("?") ? "&" : "?") + "s=64";
}

const NETWORK_COLUMNS_PER_SIDE = 12;

/**
 * Produces a stable, evenly distributed position for each contributor around the project mark.
 * Keeping this calculation deterministic prevents profiles from shifting between renders and
 * preserves a clear central area for the SeaTunnel identity.
 */
function getContributorNetworkPosition(index, total) {
    const contributorsPerSide = Math.ceil(total / 2);
    const isLeftSide = index < contributorsPerSide;
    const sideIndex = isLeftSide ? index : index - contributorsPerSide;
    const rowCount = Math.ceil(contributorsPerSide / NETWORK_COLUMNS_PER_SIDE);
    const column = sideIndex % NETWORK_COLUMNS_PER_SIDE;
    const row = Math.floor(sideIndex / NETWORK_COLUMNS_PER_SIDE);
    const columnProgress = column / (NETWORK_COLUMNS_PER_SIDE - 1);
    const rowProgress = rowCount === 1 ? 0.5 : row / (rowCount - 1);
    const x = isLeftSide ? 2 + columnProgress * 40 : 58 + columnProgress * 40;
    const y = 8 + rowProgress * 84;
    const drift = Math.sin((row + 1) * (column + 2)) * 0.7;
    const size = index % 23 === 0 ? "large" : index % 7 === 0 ? "medium" : "small";

    return {x: x + drift, y: y - drift, size};
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

/**
 * Renders the generated GitHub contributor list as an explorable relationship map.
 * Every contributor remains an individual, keyboard-accessible link to their GitHub profile.
 */
function ContributorNetwork({contributors, countLabel}) {
    const positionedContributors = contributors.map((member, index) => ({
        member,
        position: getContributorNetworkPosition(index, contributors.length),
    }));

    return (
        <section className="contributor_network" aria-labelledby="contributors-title">
            <svg className="contributor_network_lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {positionedContributors.map(({member, position}) => (
                    <line
                        className="contributor_network_line"
                        key={member.key || member.githubId}
                        x1="50"
                        y1="50"
                        x2={position.x}
                        y2={position.y}
                    />
                ))}
            </svg>
            <div className="contributor_network_count">{countLabel.replace('{count}', String(contributors.length))}</div>
            <div className="contributor_network_identity">
                <img src="/image/logo.png" alt="Apache SeaTunnel" />
            </div>
            <ul className="contributor_network_list">
                {positionedContributors.map(({member, position}) => (
                    <li
                        className={'contributor_network_member contributor_network_member--' + position.size}
                        key={member.key || member.githubId}
                        style={{left: position.x + '%', top: position.y + '%'}}
                    >
                        <a href={member.profileUrl || "https://github.com/" + member.githubId} target="_blank" rel="noreferrer">
                            <img src={getAvatarUrl(member)} alt={member.name || member.githubId} loading="lazy" />
                            <span className="contributor_network_tooltip" aria-hidden="true">{member.githubId}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
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
            <div className="team_page">
                <div className="block">
                    <h3 className="team_title">SeaTunnel Team</h3>
                    <p className="team_desc" dangerouslySetInnerHTML={ { __html: dataSource.info.desc } }/>

                    <TeamSection title="PMC" description={dataSource.info.tip} members={config.pmc}/>

                    <TeamSection title="Committer" description={dataSource.info.tip} members={config.committer}/>
                    <h3 className="team_title" id="contributors-title">{dataSource.info.prContributorTitle}</h3>
                    <p className="team_desc">{contributorDesc}</p>
                </div>
                <ContributorNetwork
                    contributors={contributors}
                    countLabel={dataSource.info.prContributorNetworkCount}
                />
            </div>
        </Layout>
    );
}
