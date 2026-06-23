const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const REPO_OWNER = 'apache';
const REPO_NAME = 'seatunnel';
const ROOT_DIR = path.resolve(__dirname, '..');
const TEAM_CONFIG_PATH = path.join(ROOT_DIR, 'src/pages/team/languages.json');
const OUTPUT_PATH = path.join(ROOT_DIR, 'src/pages/team/pr-contributors.json');
const CONTRIBUTORS_ENDPOINT = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`;

function readGithubToken() {
  const envToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

  if (envToken) {
    return envToken.trim();
  }

  try {
    return execSync('gh auth token', {
      cwd: ROOT_DIR,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch (error) {
    throw new Error(
      'GitHub token not found. Set GITHUB_TOKEN/GH_TOKEN or run `gh auth login` first.'
    );
  }
}

async function githubRequest(token, url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'seatunnel-website-team-contributors-script',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function readExistingGithubIds() {
  const teamConfig = JSON.parse(fs.readFileSync(TEAM_CONFIG_PATH, 'utf8'));
  return new Set(
    [...teamConfig.pmc, ...teamConfig.committer]
      .map((member) => member.githubId.toLowerCase())
  );
}

function createUserContributor(contributor) {
  return {
    avatarUrl: contributor.avatar_url,
    githubId: contributor.login,
    key: `github:${contributor.login.toLowerCase()}`,
    name: contributor.login,
    profileUrl: contributor.html_url,
    type: 'User',
  };
}

async function fetchAllContributors(token, existingGithubIds) {
  const contributors = [];
  let excludedExistingTeam = 0;
  let page = 1;

  while (true) {
    const pageContributors = await githubRequest(
      token,
      `${CONTRIBUTORS_ENDPOINT}?per_page=100&page=${page}`
    );

    if (!pageContributors.length) {
      break;
    }

    for (const contributor of pageContributors) {
      const login = contributor.login?.trim();

      if (login) {
        const normalizedLogin = login.toLowerCase();

        if (existingGithubIds.has(normalizedLogin)) {
          excludedExistingTeam += 1;
          continue;
        }

        contributors.push(createUserContributor(contributor));
      }
    }

    page += 1;
  }

  return {
    contributors,
    summary: {
      displayedContributors: contributors.length,
      existingTeamContributors: excludedExistingTeam,
      repository: `${REPO_OWNER}/${REPO_NAME}`,
      totalContributors: contributors.length + excludedExistingTeam,
    },
  };
}

async function main() {
  const token = readGithubToken();
  const existingGithubIds = readExistingGithubIds();
  const contributorData = await fetchAllContributors(token, existingGithubIds);

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(contributorData, null, 2) + '\n');
  console.log(
    `Generated ${contributorData.summary.displayedContributors} contributors from ${contributorData.summary.repository} in ${path.relative(ROOT_DIR, OUTPUT_PATH)}.`
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
