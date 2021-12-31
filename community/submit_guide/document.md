---
title: Documentation Notice
sidebar_position: 1
---

# Documentation Notice

Good documentation is critical for any type of software. Any contribution that can improve the Seatunnel documentation is welcome.

##  Get the document project

Documentation for the Seatunnel project is maintained in a separate [git repository](https://github.com/apache/incubator-seatunnel-website).

First you need to fork the document project into your own github repository, and then clone the document to your local computer.

```shell
git clone https://github.com/<your-github-user-name>/incubator-seatunnel-website
```

## Preview and generate static files

This website is compiled using node, using Docusaurus framework components

1. Download and install nodejs (version>12.5.0)
2. Clone the code to the local `git clone git@github.com:apache/incubator-seatunnel-website.git`
2. Run `npm install` to install the required dependent libraries.
3. Run `npm run start` in the root directory, you can visit http://localhost:3000 to view the English mode preview of the site
4. Run `npm run start-zh` in the root directory, you can visit http://localhost:3000 to view the Chinese mode preview of the site
5. To generate static website resource files, run `npm run build`. The static resources of the build are in the build directory.

## Directory structure
```html
|-- community 
|-- docs     // The next version of the document that will be released soon
|-- download 
|-- faq      // Q&A
|-- i18n    
|   `-- zh-CN  //Internationalized Chinese
|       |-- code.json
|       |-- docusaurus-plugin-content-docs
|       |-- docusaurus-plugin-content-docs-community
|       |-- docusaurus-plugin-content-docs-download
|       |-- docusaurus-plugin-content-docs-faq
|       `-- docusaurus-theme-classic
|-- resource  // Original project files for architecture/timing diagram/flow chart, etc.
|-- src
|   |-- components
|   |-- css
|   |-- js
|   |-- pages
|   |   |-- home
|   |   |-- index.jsx
|   |   |-- team
|   |   |-- user
|   |   `-- versions
|   |-- styles
|-- static // Picture static resource
|   |-- doc  // document picture
|   |-- user // users picture
|   |-- home // homepage picture
|   |-- img  // common picture
|-- docusaurus.config.js

```

## Specification

### Directory naming convention

Use all lowercase, separated by underscores. If there is a plural structure, use plural nomenclature, and do not use plural abbreviations

Positive example: `scripts / styles / components / images / utils / layouts / demo_styles / demo-scripts / img / doc`

Counter example: `script / style / demoStyles / imgs / docs`

### Vue and the naming convention of static resource files

All lowercase, separated by a dash

Positive example: `render-dom.js / signup.css / index.html / company-logo.png`

Counter example: `renderDom.js / UserManagement.html`

### Resource Path

Image resources are unified under `static/{module name}`

css and other style files are placed in the `src/css` directory

### Page content modification
> Except for the homepage, team, user, Docs>All Version module page, all other pages can be directly jumped to the corresponding github resource modification page through the'Edit this page' button at the bottom

### Home page modification
Visit the page https://seatunnel.apache.org
Located in `src/pages/home`

```
├─home
│ languages.json // Home page Chinese and English configuration
│ index.less     // homepage style
```
### Team page modification
Visit the page https://seatunnel.apache.org/team
Located in `src/pages/team`
```
├─team
│ languages.json
│ index.js
│ index.less
```
### User list page modification
Visit the page https://seatunnel.apache.org/user
```
Located in `src/pages/user`
└─versions
        data.json
        images.json
        index.js
        index.less
        languages.json
```

### version List page modification
Visit the page https://seatunnel.apache.org/versions
```
Located in `src/pages/versions`
└─versions
        languages.json
        index.jsorchestrator/overview.md
        index.less
```
