---
title: 文档须知
sidebar_position: 1
---

# 文档须知

良好的使用文档对任何类型的软件都是至关重要的。欢迎任何可以改进 Seatunnel 文档的贡献。

## 获取文档项目

Seatunnel 项目的文档维护在独立的 [git 仓库] (https://github.com/apache/incubator-seatunnel-website) 中。

首先你需要先将文档项目 fork 到自己的 github 仓库中，然后将 fork 的文档克隆到本地计算机中。

```
git clone https://github.com/<your-github-user-name>/incubator-seatunnel-website
```

## 预览并生成静态文件

本网站是使用node编译的，使用的是Docusaurus框架组件

1. 下载并安装 nodejs(version>12.5.0)
2. 克隆代码到本地 `git clone  git@github.com:apache/incubator-seatunnel-website.git`
2. 运行 `npm install` 来安装所需的依赖库。
3. 在根目录运行`npm run start`，可以访问http://localhost:3000查看站点英文模式预览
4. 在根目录运行`npm run start-zh`，可以访问http://localhost:3000查看站点的中文模式预览
5. 要生成静态网站资源文件，运行 `npm run build`。构建的静态资源在build目录中。

## 目录结构
```html

|-- community //社区
|-- docs     //文档  存方下一个即将发布的版本
|-- download //下载
|-- faq      //Q&A
|-- i18n    
|   -- zh-CN  //国际化中文
|       |-- code.json
|       |-- docusaurus-plugin-content-docs
|       |-- docusaurus-plugin-content-docs-community
|       |-- docusaurus-plugin-content-docs-download
|       |-- docusaurus-plugin-content-docs-faq
|       `-- docusaurus-theme-classic
|-- resource // 架构/时序/流程图等的原始工程文件
|-- src
|   |-- components
|   |-- css
|   |-- js
|   |-- pages
|   |   |-- home
|   |   |-- index.jsx
|   |   |-- team
|   |   |-- user
|   |-- styles
|-- static //图片静态资源
|   |-- doc  //文档的图片
|   |-- user //用户的图片
|   |-- home //首页的图片
|   |-- img  //公用图片
|-- docusaurus.config.js

```

## 规范

### 目录命名规范

全部采用小写方式， 以中下划线分隔，有复数结构时，要采用复数命名法， 缩写不用复数

正例： `scripts / styles / components / images / utils / layouts / demo_styles / demo-scripts / img / doc`

反例： `script / style / demoStyles / imgs / docs`

### vue以及静态资源文件命名规范

全部采用小写方式， 以中划线分隔

正例： `render-dom.js / signup.css / index.html / company-logo.png`

反例： `renderDom.js / UserManagement.html`

### 资源路径

图片资源统一放在`static/{模块名}`下

css等样式文件放在`src/css`目录下

### 页面内容修改
> 除了首页、团队、用户、Docs>All Version 模块页面外，其余页面都能通过底部的'Edit this page'按钮 直接跳转至对应的github的资源修改页

### 首页页面修改
访问页面  https://seatunnel.apache.org/
位于 `src/pages/home`

```
├─home
│      languages.json 首页中英文的配置  
│      index.less  首页样式
```
### 团队页面修改
访问页面  https://seatunnel.apache.org/zh-CN/team
位于 `src/pages/team`
```
├─team
│ languages.json
│ index.js
│ index.less
```
### 用户 列表页面修改
访问页面  https://seatunnel.apache.org/zh-CN/user/
```
位于 `src/pages/user`
└─versions
        data.json
        images.json
        index.js
        index.less
        languages.json
```

### version 列表页面修改
访问页面  https://seatunnel.apache.org/zh-CN/versions/
```
位于 `src/pages/versions`
└─versions
        languages.json
        index.jsorchestrator/overview.md
        index.less
```
