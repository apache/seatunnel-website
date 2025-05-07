/**
 * Version management tool script
 * @module version
 */

const { readJSONSync, writeJSONSync } = require("fs-extra");
const { VERSION_FILE } = require("./common");
const color = require("picocolors");

/** @type {string} Version number */
const version = process.argv[2];

/**
 * Step Four: Update version configuration file
 * @async
 */
async function stepFour() {
  const json = readJSONSync(VERSION_FILE);
  const current = {
    versionLabel: version,
    docUrl: `/docs/${version}/about`,
    downloadUrl: `https://github.com/apache/seatunnel/releases/tag/${version}`,
    sourceTag: version,
  };
  json.en.table.latestData = [current];
  json.en.table.historyData = [current, ...json.en.table.historyData];

  json["zh-CN"].table.latestData = [current];
  json["zh-CN"].table.historyData = [
    current,
    ...json["zh-CN"].table.historyData,
  ];
  writeJSONSync(VERSION_FILE, json, { spaces: 2 });
}

/**
 * Main function
 * @async
 */
async function main() {
  // Dynamic import execa
  const { execa } = await import('execa');

  if (!version) {
    throw new Error("Missing version number");
  }
  //   step one
  const stepOne = execa("npm", ["run", "sync", version], {
    stdio: "pipe",
  });
  stepOne.stdout.on("data", (data) => {
    console.log(`sync: ${data}`);
  });
  stepOne.stderr.on("data", (data) => {
    console.error(color.red(`syncerr: ${data}`));
  });
  await stepOne;

  //  step two
  const stepTwo = execa("docusaurus", ["docs:version", version], {
    stdio: "pipe",
  });
  stepTwo.stdout.on("data", (data) => {
    console.log(`sync: ${data}`);
  });
  stepTwo.stderr.on("data", (data) => {
    console.error(color.red(`syncerr: ${data}`));
  });
  await stepTwo;

  //  step three
  const stepThree = execa("npm", ["run", "image-copy"], {
    stdio: "pipe",
  });
  stepThree.stdout.on("data", (data) => {
    console.log(`sync: ${data}`);
  });
  stepThree.stderr.on("data", (data) => {
    console.error(color.red(`syncerr: ${data}`));
  });
  await stepThree;

  await stepFour();
}

main().catch((e) => {
  console.error(color.red(e));
  process.exit(1);
});
