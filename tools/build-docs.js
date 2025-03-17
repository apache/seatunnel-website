/**
 * 构建文档的工具脚本
 * @module build-docs
 */

const child_process = require("child_process");
const fs = require("fs");
const { copySync } = require("fs-extra");
const {
  PROJECT_NAME,
  SWAP_DIR,
  PROJECT_SITE_DOC_DIR,
  PROJECT_SITE_IMG_DIR,
  DOCUSAURUS_DOC_SIDEBARS_FILE,
  PROJECT_BRANCH_NAME,
  PROJECT_DIR,
  PROJECT_SIDEBAR_PATH,
  PROJECT_IMG_DIR,
  PROJECT_SITE_ZH_IMG_DIR,
  PROJECT_DOC_DIR,
  PROJECT_SITE_DOC_IMG_DIR,
  PROJECT_ZH_DOC_DIR,
  PROJECT_SITE_ZH_DOC_DIR,
  PROJECT_SITE_ZH_DOC_IMG_DIR,
  replaceImagesPath,
} = require("./common");

const PROJECT_TAG_NAME = process.argv[2];
// Determine protocol mode
const PROTOCOL_MODE = process.env.PROTOCOL_MODE || "HTTP";
let PROJECT_REPO =
  PROTOCOL_MODE === "ssh"
    ? `git@github.com:apache/${PROJECT_NAME}.git`
    : `https://github.com/apache/${PROJECT_NAME}.git`;

/**
 * 重建目录的工具函数
 * @param {...string} dirs - 需要重建的目录路径
 */
function rebuildDirs(...dirs) {
  for (const dir of dirs) {
    console.log(`  ---> Rebuild directory ${dir}`);
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true });
    }
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * 删除已存在文件的工具函数
 * @param {...string} files - 需要删除的文件路径
 */
function rmExistsFiles(...files) {
  for (const file of files) {
    console.log(`  ---> Remove exists ${file}`);
    if (fs.existsSync(file)) {
      fs.rmSync(file);
    }
  }
}

/**
 * 克隆仓库的工具函数
 * @param {string} repo - 仓库地址
 * @param {string} branch - 分支名称
 * @param {string} targetPath - 目标路径
 */
function cloneRepo(repo, branch, targetPath) {
  console.log(
    `  ---> Start clone repository ${repo} branch ${branch} to directory ${targetPath}`
  );
  child_process.execSync(
    `git clone --depth 1 --branch ${branch} ${repo} ${targetPath}`
  );
}

/**
 * 准备文档的主函数
 */
function prepareDocs() {
  console.log("===>>>: Start documents sync.");

  console.log("===>>>: Rebuild directory swap, docs, static/image_en.");
  rebuildDirs(SWAP_DIR, PROJECT_SITE_DOC_DIR, PROJECT_SITE_IMG_DIR);

  console.log("===>>>: Remove exists file sidebars.js.");
  rmExistsFiles(DOCUSAURUS_DOC_SIDEBARS_FILE);

  console.log("===>>>: Clone project main codebase repositories.");
  cloneRepo(
    PROJECT_REPO,
    PROJECT_TAG_NAME ? PROJECT_TAG_NAME : PROJECT_BRANCH_NAME,
    PROJECT_DIR
  );

  console.log(`===>>>: Rsync sidebars.js to ${DOCUSAURUS_DOC_SIDEBARS_FILE}`);
  fs.copyFileSync(PROJECT_SIDEBAR_PATH, DOCUSAURUS_DOC_SIDEBARS_FILE);

  console.log(`===>>>: Rsync en images to ${PROJECT_SITE_IMG_DIR}`);
  copySync(PROJECT_IMG_DIR, PROJECT_SITE_IMG_DIR, {});

  console.log(`===>>>: Rsync zh images to ${PROJECT_SITE_ZH_IMG_DIR}`);
  copySync(PROJECT_IMG_DIR, PROJECT_SITE_ZH_IMG_DIR, {});

  console.log(
    `===>>>: Rsync documents exclude images to ${PROJECT_SITE_DOC_DIR}`
  );
  copySync(PROJECT_DOC_DIR, PROJECT_SITE_DOC_DIR, {
    filter: (src) => !src.endsWith("images"),
  });

  console.log(`===>>>: Rsync en images to ${PROJECT_SITE_DOC_IMG_DIR}`);
  copySync(PROJECT_IMG_DIR, PROJECT_SITE_DOC_IMG_DIR, {});

  console.log(`===>>>: Rsync zh documents to ${PROJECT_SITE_ZH_DOC_DIR}`);
  copySync(PROJECT_ZH_DOC_DIR, PROJECT_SITE_ZH_DOC_DIR, {
    filter: (src) => !src.endsWith("images"),
  });

  console.log(`===>>>: Rsync zh images to ${PROJECT_SITE_ZH_DOC_IMG_DIR}`);
  copySync(PROJECT_IMG_DIR, PROJECT_SITE_ZH_DOC_IMG_DIR, {});

  console.log(`===>>>: Replace images path in ${PROJECT_SITE_DOC_DIR}`);
  replaceImagesPath(PROJECT_SITE_DOC_DIR, "images", "images");

  console.log(`===>>>: Replace images path in ${PROJECT_SITE_ZH_DOC_DIR}`);
  replaceImagesPath(PROJECT_SITE_ZH_DOC_DIR, "images", "images");

  console.log("===>>>: End documents sync");
}

// Execute the main function
prepareDocs();
