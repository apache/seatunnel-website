# Apache SeaTunnel Website

[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)

[English](README.md) | [中文](README_ZH.md)

这是包含 `https://seatunnel.apache.org` 的所有源代码的存储库。
本指南将指导您如何为SeaTunnel的网站做出贡献。

## 分支

main为默认主分支，修改请先fork到自己的仓库，然后在main分支上进行开发修改。

```
main  默认分支
asf-site    官网正式环境  通过https://seatunnel.apache.org 访问
asf-staging 官网测试环境  通过https://seatunnel.staged.apache.org 访问
```

## 1.预览并生成静态文件

本网站是使用node编译的，使用的是Docusaurus框架组件

1. 下载并安装 nodejs(version>12.5.0)
2. 克隆代码到本地 `git clone  git@github.com:apache/incubator-seatunnel-website.git`
3. 运行 `./tools/build-docs.sh` 从 **apache/incubator-seatunnel** 中拉取、准备文档。如果想要了解更多细节和操作请阅读[文档如何工作](HOW_DOC_WORK.md)
4. 运行 `npm install` 来安装所需的依赖库。
5. 在根目录运行`npm run start`，可以访问http://localhost:3000查看站点英文模式预览
6. 在根目录运行`npm run start-zh`，可以访问http://localhost:3000查看站点的中文模式预览
7. 要生成静态网站资源文件，运行 `npm run build`。构建的静态资源在build目录中。

## 2.目录结构

```
├── LICENSE
├── Logo.png
├── README.md
├── README_ZH.md
├── babel.config.js
├── blog
├── community  // 社区
├── docusaurus.config.js
|-- download  // 下载
├── faq  // Q&A
├── i18n
│       └── zh-CN  // 国际化中文
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
├── static  // 静态资源
│       ├── doc  // 文档的静态资源
│       │       ├── image  // 文档通用图片
│       │       ├── image_en  // 英文文档图片
│       │       └── image_zh  // 中文文档图片
│       ├── home  // 首页的图片
│       ├── image  // 模块公用图片
│       └── user  // 用户的图片
├── tools
        │└── build-docs.sh  // 文档同步脚本
├── tsconfig.json
├── versioned_docs  // 版本文档
│       ├── version-2.0.5
├── versioned_sidebars  // 版本 sidebars
│       ├── version-2.0.5-sidebars.json
├── versions.json  // 版本
```

## 3.规范

### 3.1 目录命名规范

全部采用小写方式， 以中下划线分隔，有复数结构时，要采用复数命名法， 缩写不用复数

正例： `scripts / styles / components / images / utils / layouts / demo_styles / demo-scripts / img / doc`

反例： `script / style / demoStyles / imgs / docs`

### 3.2 javascript 以及静态资源文件命名规范

全部采用小写方式， 以中划线分隔

正例： `render-dom.js / signup.css / index.html / company-logo.png`

反例： `renderDom.js / UserManagement.html`

### 3.3 资源路径

图片资源统一放在`static/{模块名}`下

css等样式文件放在`src/css`目录下

### 3.4 页面内容修改

> 除了首页、团队、用户、Docs>All Version 模块页面外，其余页面都能通过底部的'Edit this page'按钮 直接跳转至对应的github的资源修改页

### 3.5 首页页面修改

访问页面  https://seatunnel.apache.org/

位于 `src/pages/home`

```
├── home
        ├── index.jsx
        ├── index.less
        └── languages.json
```

### 3.6 团队页面修改

访问页面  https://seatunnel.apache.org/zh-CN/team

位于 `src/pages/team`

```
├── team
        ├── index.js
        ├── index.less
        └── languages.json
```

### 3.7  用户 列表页面修改

访问页面  https://seatunnel.apache.org/zh-CN/user/

位于 `src/pages/user`

```
├── user
        ├── data.json
        ├── images.json
        ├── index.js
        ├── index.less
        └── languages.json
```

### 3.8 version 列表页面修改

访问页面  https://seatunnel.apache.org/zh-CN/versions/

位于 `src/pages/versions`

```
└── versions
        ├── config.json
        ├── index.js
        └── index.less
```

### 3.9 为文档添加新版本

- 1、在本地运行 npm run docusaurus docs:version replace_by_target_version 以复制文档。
- 2、修改 `/src/pages/version/config.json` 中的最新的版本以及历史版本。
