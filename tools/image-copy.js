/**
 * Image copy tool script
 * @module image-copy
 */

const path = require("path");
const { copySync } = require("fs-extra");
const {
  VERSION,
  PROJECT_SITE_IMG_DIR,
  PROJECT_SITE_ZH_IMG_DIR,
  SOURCE_PATH,
  replaceImagesPath,
} = require("./common");

/** @type {string} Versioned docs directory */
const versionedDir = path.join(SOURCE_PATH, "versioned_docs");
/** @type {string} Versioned Chinese docs directory */
const versionedZHDir = path.join(
  SOURCE_PATH,
  "i18n/zh-CN/docusaurus-plugin-content-docs"
);

/**
 * Parse versioned image directory
 * @param {string} version - Version number
 * @returns {string} Versioned image directory path
 */
const resolveVersionedImageDir = (version) =>
  path.join(versionedDir, `version-${version}`);

/**
 * 解析版本化中文图片目录
 * @param {string} version - 版本号
 * @returns {string} 版本化中文图片目录路径
 */
const resolveVersionedZHImageDir = (version) =>
  path.join(versionedZHDir, `version-${version}`);

/** @type {string} 图片目录名称 */
const IMAGEDIR = "images";

/**
 * 复制并替换图片路径
 */
function copyAndReplaceImagesPath() {
  const newVersion = VERSION[0];
  const newVersionedDir = resolveVersionedImageDir(newVersion);
  const newVersionedZHDir = resolveVersionedZHImageDir(newVersion);
  // copy static images to versioned directory
  copySync(PROJECT_SITE_IMG_DIR, path.resolve(newVersionedDir, IMAGEDIR), {});
  copySync(
    PROJECT_SITE_ZH_IMG_DIR,
    path.resolve(newVersionedZHDir, IMAGEDIR),
    {}
  );

  // replace images path in versioned docs
  // replaceImagesPath(newVersionedDir, `${IMAGEDIR}`, "/image_en");
  // replaceImagesPath(newVersionedZHDir, `${IMAGEDIR}`, "/image_zh");
}

copyAndReplaceImagesPath();
