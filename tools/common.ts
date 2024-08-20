import * as path from "path";
import * as fs from "fs";
import { readJsonSync } from "fs-extra";

// Set up constants
export const SOURCE_PATH = path.resolve(__dirname, "..");
export const VERSION_FILE = path.resolve(
  SOURCE_PATH,
  "src",
  "pages",
  "versions",
  "config.json"
);
export const PROJECT_NAME = "seatunnel";
export const PROJECT_BRANCH_NAME = "dev";
export const SWAP_DIR = path.resolve(SOURCE_PATH, "swap");
export const PROJECT_SITE_IMG_DIR = path.resolve(
  SOURCE_PATH,
  "static",
  "image_en"
);
export const PROJECT_SITE_ZH_IMG_DIR = path.resolve(
  SOURCE_PATH,
  "static",
  "image_zh"
);
export const PROJECT_SITE_DOC_DIR = path.resolve(SOURCE_PATH, "docs");
export const PROJECT_SITE_DOC_IMG_DIR = path.resolve(SOURCE_PATH, "docs", "images");
export const PROJECT_SITE_ZH_DOC_DIR = path.resolve(
  SOURCE_PATH,
  "i18n",
  "zh-CN",
  "docusaurus-plugin-content-docs",
  "current"
);
export const PROJECT_DIR = path.resolve(SWAP_DIR, PROJECT_NAME);
export const PROJECT_IMG_DIR = path.resolve(PROJECT_DIR, "docs", "images");
export const PROJECT_DOC_DIR = path.resolve(PROJECT_DIR, "docs", "en");
export const PROJECT_ZH_DOC_DIR = path.resolve(PROJECT_DIR, "docs", "zh");
export const PROJECT_SIDEBAR_PATH = path.resolve(
  PROJECT_DIR,
  "docs",
  "sidebars.js"
);
export const DOCUSAURUS_DOC_SIDEBARS_FILE = path.resolve(
  SOURCE_PATH,
  "sidebars.js"
);
export const VERSION = readJsonSync(path.resolve(SOURCE_PATH, "versions.json"));

// Utility function to replace image paths
export function replaceImagesPath(
  replaceDir: string,
  from: string = "images",
  to: string = "images"
) {
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
      content = content.replace(regex, to)
      content = content.replace(new RegExp(`(\\.)${to}`, "g"), `.io/${to}`);
      fs.writeFileSync(filePath, content);
    }
  }
}
