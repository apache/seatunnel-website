import * as path from "path";
import { copySync } from "fs-extra";
import {
  VERSION,
  PROJECT_SITE_IMG_DIR,
  PROJECT_SITE_ZH_IMG_DIR,
  SOURCE_PATH,
  replaceImagesPath,
} from "./common";

const versionedDir = path.join(SOURCE_PATH, "versioned_docs");
const versionedZHDir = path.join(
  SOURCE_PATH,
  "i18n/zh-CN/docusaurus-plugin-content-docs"
);

const resolveVersionedImageDir = (version: string) =>
  path.join(versionedDir, `version-${version}`);

const resolveVersionedZHImageDir = (version: string) =>
  path.join(versionedZHDir, `version-${version}`);

const IMAGEDIR = "images";

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
//   replaceImagesPath(newVersionedDir, `${IMAGEDIR}`, "/image_en");
//   replaceImagesPath(newVersionedZHDir, `${IMAGEDIR}`, "/image_zh");
}

copyAndReplaceImagesPath();
