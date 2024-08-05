# Apache SeaTunnel Website

[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)

[English](README.md) | [中文](README_ZH.md) | [日本語](README_JP.md)

これは、 `https://seatunnel.apache.org` のすべてのソースコードを含むリポジトリです。
このガイドでは、SeaTunnel のウェブサイトに貢献する方法を説明します。

## ブランチ

main はデフォルトのブランチです。変更を加える場合は、まず自分のリポジトリにフォークし、main ブランチで開発を行ってください。

```
main #デフォルトブランチ
asf-site   #公式サイトの本番環境は https://seatunnel.apache.org でアクセスできます
asf-staging #公式サイトのテスト環境は https://seatunnel.staged.apache.org でアクセスできます
```

## 1. プレビューと静的ファイルの生成

このウェブサイトは、Docusaurus フレームワークコンポーネントを使用して node でコンパイルされています。

1. nodejs (version>14) をダウンロードしてインストールします。
2. コードをローカルにクローンします `git clone git@github.com:apache/incubator-seatunnel-website.git`
3. `./tools/build-docs.sh` を実行して **apache/incubator-seatunnel** からドキュメントを取得し、準備します。詳細については [ドキュメントの動作方法](HOW_DOC_WORK.md) を参照してください。
4. 必要な依存ライブラリをインストールするために `npm install` を実行します。
5. ルートディレクトリで `npm run start` を実行し、http://localhost:3000 でサイトの英語モードのプレビューを確認できます。
6. ルートディレクトリで `npm run start-zh` を実行し、http://localhost:3000 でサイトの中国語モードのプレビューを確認できます。
7. 静的なウェブサイトリソースファイルを生成するには、`npm run build` を実行します。ビルドされた静的リソースは build ディレクトリにあります。

## 2. ディレクトリ構造

```
├── LICENSE
├── Logo.png
├── README.md
├── README_ZH.md
├── babel.config.js
├── blog
├── user_cases
├── community  // コミュニティ
├── docusaurus.config.js
|-- download  // ダウンロード
├── faq  // Q&A
├── i18n
│       └── zh-CN  // 国際化中国語
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
├── static  // 静的リソース
│       ├── doc  // ドキュメントの静的リソース
│       │       ├── image  // ドキュメント共通画像
│       │       ├── image_en  // 英語ドキュメント画像
│       │       └── image_zh  // 中国語ドキュメント画像
│       ├── home  // ホームページの画像
│       ├── image  // モジュール共通画像
│       └── user  // ユーザーの画像
├── tools
        │└── build-docs.sh  // ドキュメント同期スクリプト
├── tsconfig.json
├── versioned_docs  // バージョンドキュメント
│       ├── version-2.0.5
├── versioned_sidebars  // バージョンのサイドバー
│       ├── version-2.0.5-sidebars.json
├── versions.json  // バージョン
```

## 3. 規範

### 3.1 ディレクトリ命名規則

すべて小文字で、アンダースコアで区切ります。複数形の構造がある場合は、複数形の命名法を使用し、略語には複数形を使用しません。

正例： `scripts / styles / components / images / utils / layouts / demo_styles / demo-scripts / img / doc`

反例： `script / style / demoStyles / imgs / docs`

### 3.2 javascript および静的リソースファイルの命名規則

すべて小文字で、ダッシュで区切ります。

正例： `render-dom.js / signup.css / index.html / company-logo.png`

反例： `renderDom.js / UserManagement.html`

### 3.3 リソースパス

画像リソースは `static/{module name}` に統一します。

css などのスタイルファイルは `src/css` ディレクトリに配置します。

### 3.4 ページ内容の変更

> ホームページ、チーム、ユーザー、Docs>All Version モジュールページを除き、他のすべてのページは、下部の「Edit this page」ボタンをクリックして、対応する github リソース変更ページに直接ジャンプできます。

### 3.5 ホームページの変更

ページにアクセス https://seatunnel.apache.org/

`src/pages/home` にあります。

```
├── home
        ├── index.jsx
        ├── index.less
        └── languages.json
```

### 3.6 チームページの変更

ページにアクセス https://seatunnel.apache.org/team

`src/pages/team` にあります。

```
├── team
        ├── index.js
        ├── index.less
        └── languages.json
```

### 3.7 ユーザーリストページの変更

ページにアクセス https://seatunnel.apache.org/user

`src/pages/user` にあります。

```
├── user
        ├── data.json
        ├── images.json
        ├── index.js
        ├── index.less
        └── languages.json
```

### 3.8 バージョンリストページの変更

ページにアクセス https://seatunnel.apache.org/versions

`src/pages/versions` にあります。

```
└── versions
        ├── config.json
        ├── index.js
        └── index.less
```

### 3.9 ドキュメントに新しいバージョンを追加する

- 1、ローカルで `npm run docusaurus docs:version replace_by_target_version` を実行してドキュメントをコピーします。
- 2、最新バージョンと履歴バージョンのために `/src/pages/version/config.json` を変更します。
