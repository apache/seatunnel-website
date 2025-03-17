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
 * Parse versioned Chinese image directory
 * @param {string} version - Version number
 * @returns {string} Versioned Chinese image directory path
 */
const resolveVersionedZHImageDir = (version) =>
  path.join(versionedZHDir, `version-${version}`);

/** @type {string} Image directory name */
const IMAGEDIR = "images";

/**
 * Copy and replace image paths
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
