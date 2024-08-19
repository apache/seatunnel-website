import * as child_process from "child_process";
import * as fs from "fs";
import { copySync } from "fs-extra";
import {
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
  PROJECT_ZH_DOC_DIR,
  PROJECT_SITE_ZH_DOC_DIR,
  replaceImagesPath,
} from "./common";
const PROJECT_TAG_NAME = process.argv[2];
// Determine protocol mode
const PROTOCOL_MODE = process.env.PROTOCOL_MODE || "HTTP";
let PROJECT_REPO =
  PROTOCOL_MODE === "ssh"
    ? `git@github.com:apache/${PROJECT_NAME}.git`
    : `https://github.com/apache/${PROJECT_NAME}.git`;

// Utility function to rebuild directories
function rebuildDirs(...dirs: string[]) {
  for (const dir of dirs) {
    console.log(`  ---> Rebuild directory ${dir}`);
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true });
    }
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Utility function to remove existing files
function rmExistsFiles(...files: string[]) {
  for (const file of files) {
    console.log(`  ---> Remove exists ${file}`);
    if (fs.existsSync(file)) {
      fs.rmSync(file);
    }
  }
}

// Utility function to clone repository
function cloneRepo(repo: string, branch: string, targetPath: string) {
  console.log(
    `  ---> Start clone repository ${repo} branch ${branch} to directory ${targetPath}`
  );
  child_process.execSync(
    `git clone --depth 1 --branch ${branch} ${repo} ${targetPath}`
  );
}

// Main function to prepare docs
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

  console.log(`===>>>: Rsync images to ${PROJECT_SITE_IMG_DIR}`);
  copySync(PROJECT_IMG_DIR, PROJECT_SITE_IMG_DIR, {});

  console.log(`===>>>: Rsync images to ${PROJECT_SITE_ZH_IMG_DIR}`);
  copySync(PROJECT_IMG_DIR, PROJECT_SITE_ZH_IMG_DIR, {});

  console.log(
    `===>>>: Rsync documents exclude images to ${PROJECT_SITE_DOC_DIR}`
  );
  copySync(PROJECT_DOC_DIR, PROJECT_SITE_DOC_DIR, {
    filter: (src) => !src.endsWith("images"),
  });

  console.log(`===>>>: Rsync zh documents to ${PROJECT_ZH_DOC_DIR}`);
  copySync(PROJECT_ZH_DOC_DIR, PROJECT_SITE_ZH_DOC_DIR, {
    filter: (src) => !src.endsWith("images"),
  });

  console.log(`===>>>: Replace images path in ${PROJECT_SITE_DOC_DIR}`);
  replaceImagesPath(PROJECT_SITE_DOC_DIR);

  console.log(`===>>>: Replace images path in ${PROJECT_SITE_ZH_DOC_DIR}`);
  replaceImagesPath(PROJECT_SITE_ZH_DOC_DIR, "/image_zh");

  console.log("===>>>: End documents sync");
}

// Execute the main function
prepareDocs();
