/**
 * @typedef {Object} VersionConfig
 * @property {Array<string>} VERSION - Array of version numbers
 */

const path = require("path");
const fs = require("fs");
const { readJsonSync } = require("fs-extra");

// Set up constants
/** @type {string} Source code path */
const SOURCE_PATH = path.resolve(__dirname, "..");
/** @type {string} Version config file path */
const VERSION_FILE = path.resolve(
  SOURCE_PATH,
  "src",
  "pages",
  "versions",
  "config.json"
);
/** @type {string} Project name */
const PROJECT_NAME = "seatunnel";
/** @type {string} Project branch name */
const PROJECT_BRANCH_NAME = "dev";
/** @type {string} Swap directory path */
const SWAP_DIR = path.resolve(SOURCE_PATH, "swap");
/** @type {string} Project site English image directory */
const PROJECT_SITE_IMG_DIR = path.resolve(SOURCE_PATH, "static", "image_en");
/** @type {string} Project site Chinese image directory */
const PROJECT_SITE_ZH_IMG_DIR = path.resolve(SOURCE_PATH, "static", "image_zh");
/** @type {string} Project site document directory */
const PROJECT_SITE_DOC_DIR = path.resolve(SOURCE_PATH, "docs");
/** @type {string} Project site document image directory */
const PROJECT_SITE_DOC_IMG_DIR = path.resolve(PROJECT_SITE_DOC_DIR, "images");
/** @type {string} Project site Chinese document directory */
const PROJECT_SITE_ZH_DOC_DIR = path.resolve(
  SOURCE_PATH,
  "i18n",
  "zh-CN",
  "docusaurus-plugin-content-docs",
  "current"
);
/** @type {string} Project site Chinese document image directory */
const PROJECT_SITE_ZH_DOC_IMG_DIR = path.resolve(
  PROJECT_SITE_ZH_DOC_DIR,
  "images"
);
/** @type {string} Project directory */
const PROJECT_DIR = path.resolve(SWAP_DIR, PROJECT_NAME);
/** @type {string} Project image directory */
const PROJECT_IMG_DIR = path.resolve(PROJECT_DIR, "docs", "images");
/** @type {string} Project English document directory */
const PROJECT_DOC_DIR = path.resolve(PROJECT_DIR, "docs", "en");
/** @type {string} Project Chinese document directory */
const PROJECT_ZH_DOC_DIR = path.resolve(PROJECT_DIR, "docs", "zh");
/** @type {string} Project sidebar path */
const PROJECT_SIDEBAR_PATH = path.resolve(PROJECT_DIR, "docs", "sidebars.js");
/** @type {string} Docusaurus document sidebar file */
const DOCUSAURUS_DOC_SIDEBARS_FILE = path.resolve(SOURCE_PATH, "sidebars.js");
/** @type {Array<string>} Array of version numbers */
const VERSION = readJsonSync(path.resolve(SOURCE_PATH, "versions.json"));

/**
 * Utility function to replace image paths
 * @param {string} replaceDir - Directory to process
 * @param {string} [from="images"] - Original path
 * @param {string} [to="images"] - Target path
 */
function replaceImagesPath(replaceDir, from = "images", to = "images") {
  const regex = new RegExp(`../${from}`, "g");
  for (const fileName of fs.readdirSync(replaceDir)) {
    const filePath = path.resolve(replaceDir, fileName);
    if (fs.statSync(filePath).isDirectory()) {
      replaceImagesPath(filePath, from, to);
    } else if (filePath.endsWith(".md") || filePath.endsWith(".mdx")) {
      console.log(
        `  ---> Replace images path form ${regex} to ${to} in ${filePath}`
      );
      let content = fs.readFileSync(filePath, "utf-8");
      content = content.replace(regex, to);
      content = content.replace(new RegExp(`(\\.)${to}`, "g"), `.io/${to}`);
      fs.writeFileSync(filePath, content);
    }
  }
}

module.exports = {
  SOURCE_PATH,
  VERSION_FILE,
  PROJECT_NAME,
  PROJECT_BRANCH_NAME,
  SWAP_DIR,
  PROJECT_SITE_IMG_DIR,
  PROJECT_SITE_ZH_IMG_DIR,
  PROJECT_SITE_DOC_DIR,
  PROJECT_SITE_DOC_IMG_DIR,
  PROJECT_SITE_ZH_DOC_DIR,
  PROJECT_SITE_ZH_DOC_IMG_DIR,
  PROJECT_DIR,
  PROJECT_IMG_DIR,
  PROJECT_DOC_DIR,
  PROJECT_ZH_DOC_DIR,
  PROJECT_SIDEBAR_PATH,
  DOCUSAURUS_DOC_SIDEBARS_FILE,
  VERSION,
  replaceImagesPath,
};
