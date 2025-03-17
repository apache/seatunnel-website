/**
 * @typedef {Object} VersionConfig
 * @property {Array<string>} VERSION - 版本号数组
 */

const path = require("path");
const fs = require("fs");
const { readJsonSync } = require("fs-extra");

// Set up constants
/** @type {string} 源代码路径 */
const SOURCE_PATH = path.resolve(__dirname, "..");
/** @type {string} 版本配置文件路径 */
const VERSION_FILE = path.resolve(
  SOURCE_PATH,
  "src",
  "pages",
  "versions",
  "config.json"
);
/** @type {string} 项目名称 */
const PROJECT_NAME = "seatunnel";
/** @type {string} 项目分支名称 */
const PROJECT_BRANCH_NAME = "dev";
/** @type {string} 交换目录路径 */
const SWAP_DIR = path.resolve(SOURCE_PATH, "swap");
/** @type {string} 项目站点英文图片目录 */
const PROJECT_SITE_IMG_DIR = path.resolve(SOURCE_PATH, "static", "image_en");
/** @type {string} 项目站点中文图片目录 */
const PROJECT_SITE_ZH_IMG_DIR = path.resolve(SOURCE_PATH, "static", "image_zh");
/** @type {string} 项目站点文档目录 */
const PROJECT_SITE_DOC_DIR = path.resolve(SOURCE_PATH, "docs");
/** @type {string} 项目站点文档图片目录 */
const PROJECT_SITE_DOC_IMG_DIR = path.resolve(PROJECT_SITE_DOC_DIR, "images");
/** @type {string} 项目站点中文文档目录 */
const PROJECT_SITE_ZH_DOC_DIR = path.resolve(
  SOURCE_PATH,
  "i18n",
  "zh-CN",
  "docusaurus-plugin-content-docs",
  "current"
);
/** @type {string} 项目站点中文文档图片目录 */
const PROJECT_SITE_ZH_DOC_IMG_DIR = path.resolve(
  PROJECT_SITE_ZH_DOC_DIR,
  "images"
);
/** @type {string} 项目目录 */
const PROJECT_DIR = path.resolve(SWAP_DIR, PROJECT_NAME);
/** @type {string} 项目图片目录 */
const PROJECT_IMG_DIR = path.resolve(PROJECT_DIR, "docs", "images");
/** @type {string} 项目英文文档目录 */
const PROJECT_DOC_DIR = path.resolve(PROJECT_DIR, "docs", "en");
/** @type {string} 项目中文文档目录 */
const PROJECT_ZH_DOC_DIR = path.resolve(PROJECT_DIR, "docs", "zh");
/** @type {string} 项目侧边栏路径 */
const PROJECT_SIDEBAR_PATH = path.resolve(PROJECT_DIR, "docs", "sidebars.js");
/** @type {string} Docusaurus 文档侧边栏文件 */
const DOCUSAURUS_DOC_SIDEBARS_FILE = path.resolve(SOURCE_PATH, "sidebars.js");
/** @type {Array<string>} 版本号数组 */
const VERSION = readJsonSync(path.resolve(SOURCE_PATH, "versions.json"));

/**
 * 替换图片路径的工具函数
 * @param {string} replaceDir - 需要替换的目录
 * @param {string} [from="images"] - 原始路径
 * @param {string} [to="images"] - 目标路径
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
