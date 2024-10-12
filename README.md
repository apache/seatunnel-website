# Apache SeaTunnel Website

[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)

[English](README.md) | [中文](README_ZH.md)

This is the repository containing all the source code of `https://seatunnel.apache.org`.
This guide will guide you how to contribute to the SeaTunnel website.

## Branch

main is the default branch. For all modifications, please fork first, and then proceed on the main branch.

```
main #default branch
asf-site   #The official environment of asf-site official website is accessed through https://seatunnel.apache.org
asf-staging #The asf-staging official website test environment is accessed through https://seatunnel.staged.apache.org
```

## 1. Preview and generate static files

This website is compiled using node, using Docusaurus framework components

1. Download and install nodejs (version>14)
2. Clone the code to the local `git clone git@github.com:apache/incubator-seatunnel-website.git`
3. Run `./tools/build-docs.sh` to fetch and prepare docs form **apache/incubator-seatunnel**, for more information you could see [how our document work](HOW_DOC_WORK.md)
4. Run `npm install` to install the required dependent libraries.
5. Run `npm run start` in the root directory, you can visit http://localhost:3000 to view the English mode preview of the site
6. Run `npm run start-zh` in the root directory, you can visit http://localhost:3000 to view the Chinese mode preview of the site
7. To generate static website resource files, run `npm run build`. The static resources of the build are in the build directory.

## 2. Directory structure

```
├── LICENSE
├── Logo.png
├── README.md
├── README_ZH.md
├── babel.config.js
├── blog
├── user_cases
├── community  // Community
├── docusaurus.config.js
|-- download  // Download
├── faq  // Q&A
├── i18n
│       └── zh-CN  // Internationalized Chinese
│           ├── docusaurus-plugin-content-blog
│           ├── docusaurus-plugin-content-docs
│           ├── docusaurus-plugin-content-docs-community
│           ├── docusaurus-plugin-content-docs-download
│           ├── docusaurus-plugin-content-docs-faq
│           └── docusaurus-theme-classic
├── package.json
├── sidebars.js
├── sidebarsCommunity.js
├── src
│       ├── components
│       ├── css
│       ├── js
│       ├── pages
│       │       ├── home
│       │       ├── index.tsx
│       │       ├── team
│       │       ├── user
│       │       └── versions
│       └── styles
├── static  // static resources
│       ├── doc  // Static resources for documentation
│       │       ├── image  // Document common image
│       │       ├── image_en  // English document picture
│       │       └── image_zh  // Chinese document picture
│       ├── home  // Homepage pictures
│       ├── image  // Module common pictures
│       └── user  // user picture
├── tools
        │└── build-docs.sh  // Document sync script
├── tsconfig.json
├── versioned_docs  // Version documentation
│       ├── version-2.0.5
├── versioned_sidebars  // Version sidebars
│       ├── version-2.0.5-sidebars.json
├── versions.json  // Version
```

## 3. Specification

### 3.1 Directory naming convention

Use all lowercase, separated by underscores. If there is a plural structure, use plural nomenclature, and do not use plural abbreviations

Positive example: `scripts / styles / components / images / utils / layouts / demo_styles / demo-scripts / img / doc`

Counter example: `script / style / demoStyles / imgs / docs`

### 3.2 javascript and the naming convention of static resource files

All lowercase, separated by a dash

Positive example: `render-dom.js / signup.css / index.html / company-logo.png`

Counter example: `renderDom.js / UserManagement.html`

### 3.3 Resource Path

Image resources are unified under `static/{module name}`

css and other style files are placed in the `src/css` directory

### 3.4 Page content modification

> Except for the homepage, team, user, Docs>All Version module page, all other pages can be directly jumped to the corresponding github resource modification page through the'Edit this page' button at the bottom

### 3.5 Home page modification

Visit the page https://seatunnel.apache.org

Located in `src/pages/home`

```
├── home
        ├── index.jsx
        ├── index.less
        └── languages.json
```

### 3.6 Team page modification

Visit the page https://seatunnel.apache.org/team

Located in `src/pages/team`

```
├── team
        ├── index.js
        ├── index.less
        └── languages.json
```

### 3.7 User list page modification

Visit the page https://seatunnel.apache.org/user

Located in `src/pages/user`

```
├── user
        ├── data.json
        ├── images.json
        ├── index.js
        ├── index.less
        └── languages.json
```

### 3.8 version List page modification

Visit the page https://seatunnel.apache.org/versions

Located in `src/pages/versions`

```
└── versions
        ├── config.json
        ├── index.js
        └── index.less
```

### 3.9 add a new version for documents

- 1、Run `npm run version replace_by_target_version` locally to copy a document.
- 2、Modify `/src/pages/download/st_data.json` for the latest download link address.
