/**
 * Fetch team avatars from GitHub and convert to Base64
 * This script downloads avatars and creates github-avatars.json
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// File paths
const LANGUAGES_JSON_PATH = path.resolve(__dirname, '..', 'src', 'pages', 'team', 'languages.json');
const AVATARS_JSON_PATH = path.resolve(__dirname, '..', 'src', 'pages', 'team', 'github-avatars.json');

/**
 * Extract GitHub user ID from avatar URL
 * @param {string} avatarUrl - GitHub avatar URL (e.g., https://avatars.githubusercontent.com/u/219644?v=4)
 * @returns {string|null} - GitHub user ID or null
 */
function extractUserId(avatarUrl) {
  const match = avatarUrl.match(/\/u\/(\d+)/);
  return match ? match[1] : null;
}

/**
 * Download image and convert to Base64
 * @param {string} url - Image URL
 * @returns {Promise<string>} - Base64 encoded image
 */
function downloadAndConvertToBase64(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const base64 = buffer.toString('base64');
        resolve(base64);
      });
    }).on('error', reject);
  });
}

/**
 * Main function
 */
async function main() {
  console.log('📥 Fetching team avatars from GitHub...\n');

  // Read languages.json
  const languagesData = JSON.parse(fs.readFileSync(LANGUAGES_JSON_PATH, 'utf-8'));

  // Collect all unique user IDs
  const userIds = new Set();
  [...languagesData.pmc, ...languagesData.committer].forEach(member => {
    let userId = member.userId;
    if (!userId && member.avatarUrl) {
      userId = extractUserId(member.avatarUrl);
    }
    if (userId) {
      userIds.add(userId);
    }
  });

  console.log(`📊 Found ${userIds.size} unique team members\n`);

  // Download avatars
  const avatars = [];
  let successCount = 0;
  let failCount = 0;

  for (const userId of userIds) {
    const avatarUrl = `https://avatars.githubusercontent.com/u/${userId}?v=4`;
    process.stdout.write(`⏳ Downloading avatar for user ${userId}... `);

    try {
      const base64 = await downloadAndConvertToBase64(avatarUrl);
      avatars.push({
        id: userId,
        avatar_base64: base64
      });
      successCount++;
      console.log('✅');
    } catch (error) {
      failCount++;
      console.log(`❌ Error: ${error.message}`);
    }
  }

  console.log(`\n📈 Summary: ${successCount} succeeded, ${failCount} failed\n`);

  // Write github-avatars.json
  fs.writeFileSync(AVATARS_JSON_PATH, JSON.stringify(avatars, null, 2), 'utf-8');
  console.log(`✅ Avatars saved to: ${AVATARS_JSON_PATH}`);
  console.log(`📁 File size: ${(fs.statSync(AVATARS_JSON_PATH).size / 1024).toFixed(2)} KB\n`);

  // Update languages.json to use userId instead of avatarUrl
  // If userId already exists, skip re-extraction (support re-run)
  languagesData.pmc = languagesData.pmc.map(member => {
    const userId = member.userId || extractUserId(member.avatarUrl);
    const { avatarUrl, ...rest } = member;
    return { ...rest, userId };
  });

  languagesData.committer = languagesData.committer.map(member => {
    const userId = member.userId || extractUserId(member.avatarUrl);
    const { avatarUrl, ...rest } = member;
    return { ...rest, userId };
  });

  // Write updated languages.json
  fs.writeFileSync(LANGUAGES_JSON_PATH, JSON.stringify(languagesData, null, 2), 'utf-8');
  console.log(`✅ Updated languages.json with userId fields\n`);

  console.log('🎉 Done! You can now use the avatarUrl() function in index.js');
}

main().catch(console.error);
