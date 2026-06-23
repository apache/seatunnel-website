const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const REPO_OWNER = 'apache';
const REPO_NAME = 'seatunnel-website';
const ROOT_DIR = path.resolve(__dirname, '..');
const TEAM_CONFIG_PATH = path.join(ROOT_DIR, 'src/pages/team/languages.json');
const OUTPUT_PATH = path.join(ROOT_DIR, 'src/pages/team/pr-contributors.json');
const GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

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

async function graphqlRequest(token, query, variables) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'seatunnel-website-team-contributors-script',
    },
    body: JSON.stringify({query, variables}),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();

  if (payload.errors?.length) {
    throw new Error(
      `GitHub GraphQL errors: ${payload.errors.map((item) => item.message).join('; ')}`
    );
  }

  return payload.data;
}

function readExistingGithubIds() {
  const teamConfig = JSON.parse(fs.readFileSync(TEAM_CONFIG_PATH, 'utf8'));
  return new Set(
    [...teamConfig.pmc, ...teamConfig.committer]
      .map((member) => member.githubId.toLowerCase())
  );
}

async function fetchAllPullRequestAuthors(token) {
  const query = `
    query PullRequestAuthors($owner: String!, $name: String!, $cursor: String) {
      repository(owner: $owner, name: $name) {
        pullRequests(
          first: 100
          after: $cursor
          states: [OPEN, CLOSED, MERGED]
          orderBy: {field: CREATED_AT, direction: ASC}
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            author {
              __typename
              login
              avatarUrl(size: 240)
              url
              ... on User {
                name
              }
            }
          }
        }
      }
    }
  `;

  const authors = new Map();
  let cursor = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data = await graphqlRequest(token, query, {
      owner: REPO_OWNER,
      name: REPO_NAME,
      cursor,
    });
    const pullRequests = data.repository.pullRequests;

    for (const node of pullRequests.nodes) {
      const author = node.author;

      if (!author?.login) {
        continue;
      }

      const login = author.login.trim();
      const normalizedLogin = login.toLowerCase();

      if (normalizedLogin === 'ghost' || normalizedLogin.endsWith('[bot]')) {
        continue;
      }

      if (!authors.has(normalizedLogin)) {
        authors.set(normalizedLogin, {
          avatarUrl: author.avatarUrl,
          githubId: login,
          name: author.name || login,
          profileUrl: author.url,
        });
      }
    }

    hasNextPage = pullRequests.pageInfo.hasNextPage;
    cursor = pullRequests.pageInfo.endCursor;
  }

  return authors;
}

async function main() {
  const token = readGithubToken();
  const existingGithubIds = readExistingGithubIds();
  const authors = await fetchAllPullRequestAuthors(token);
  const contributors = [...authors.entries()]
    .filter(([githubId]) => !existingGithubIds.has(githubId))
    .map(([, contributor]) => contributor)
    .sort((left, right) => left.githubId.localeCompare(right.githubId, 'en', {sensitivity: 'base'}));

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(contributors, null, 2) + '\n');
  console.log(`Generated ${contributors.length} PR contributors in ${path.relative(ROOT_DIR, OUTPUT_PATH)}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
