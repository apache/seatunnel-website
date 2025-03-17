/**
 * 图片复制工具脚本
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

/** @type {string} 版本化文档目录 */
const versionedDir = path.join(SOURCE_PATH, "versioned_docs");
/** @type {string} 版本化中文文档目录 */
const versionedZHDir = path.join(
  SOURCE_PATH,
  "i18n/zh-CN/docusaurus-plugin-content-docs"
);

/**
 * 解析版本化图片目录
 * @param {string} version - 版本号
 * @returns {string} 版本化图片目录路径
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
