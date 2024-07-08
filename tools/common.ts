import * as path from "path";
import * as fs from "fs";
import { readJsonSync } from "fs-extra";

// Set up constants
export const SOURCE_PATH = path.join(__dirname, "..");
export const PROJECT_NAME = "seatunnel";
export const PROJECT_BRANCH_NAME = "dev";
export const SWAP_DIR = path.join(SOURCE_PATH, "swap");
export const PROJECT_SITE_IMG_DIR = path.join(
  SOURCE_PATH,
  "static",
  "image_en"
);
export const PROJECT_SITE_ZH_IMG_DIR = path.join(
  SOURCE_PATH,
  "static",
  "image_zh"
);
export const PROJECT_SITE_DOC_DIR = path.join(SOURCE_PATH, "docs");
export const PROJECT_SITE_ZH_DOC_DIR = path.join(
  SOURCE_PATH,
  "i18n",
  "zh-CN",
  "docusaurus-plugin-content-docs",
  "current"
);
export const PROJECT_DIR = path.join(SWAP_DIR, PROJECT_NAME);
export const PROJECT_IMG_DIR = path.join(PROJECT_DIR, "docs", "images");
export const PROJECT_DOC_DIR = path.join(PROJECT_DIR, "docs", "en");
export const PROJECT_ZH_DOC_DIR = path.join(PROJECT_DIR, "docs", "zh");
export const PROJECT_SIDEBAR_PATH = path.join(
  PROJECT_DIR,
  "docs",
  "sidebars.js"
);
export const DOCUSAURUS_DOC_SIDEBARS_FILE = path.join(
  SOURCE_PATH,
  "sidebars.js"
);
export const VERSION = readJsonSync(path.join(SOURCE_PATH, "versions.json"));

// Utility function to replace image paths
export function replaceImagesPath(
  replaceDir: string,
  to: string = "/image_en",
  from: string = "images"
) {
  const regex = new RegExp(`(\\.\\.\\/)*${from}`, "g");
  for (const fileName of fs.readdirSync(replaceDir)) {
    const filePath = path.join(replaceDir, fileName);
    if (fs.statSync(filePath).isDirectory()) {
      replaceImagesPath(filePath, to, from);
    } else if (filePath.endsWith(".md") || filePath.endsWith(".mdx")) {
      console.log(
        `  ---> Replace images path form ${from} to ${to} in ${filePath}`
      );
      let content = fs.readFileSync(filePath, "utf-8");
      content = content.replace(regex, to);
      fs.writeFileSync(filePath, content);
    }
  }
}
