// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Apache SeaTunnel',
    tagline: 'Dinosaurs are cool',
    url: 'https://seatunnel.apache.org',
    baseUrl: '/',
    onBrokenLinks: 'ignore',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'Apache SeaTunnel',
    projectName: 'Apache SeaTunnel',
    i18n: {
        defaultLocale: "en",
        locales: ["en", "zh-CN"],
        localeConfigs: {
            en: {
                label: "English",
                direction: 'ltr',
            },
            'zh-CN': {
                label: "简体中文",
                direction: 'ltr',
            },
        },
    },
    presets: [
        [
            'classic',
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    sidebarCollapsible: true,
                    editLocalizedFiles: true,
                    // Please change this to your repo.
                    editUrl: 'https://github.com/apache/incubator-seatunnel-website/edit/dev/',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig: ({
        colorMode: {
            defaultMode: 'light',
            disableSwitch: true
        },
        navbar: {
            title: 'Apache SeaTunnel',
            logo: {
                alt: 'Apache SeaTunnel Logo',
                src: 'img/logo.png',
            },
            items: [
                {
                    to: '/',
                    position: 'right',
                    label: '首页',
                    activeBaseRegex: `^/$`,
                },
                {
                    position: 'right',
                    label: '文档',
                    items: [
                        {
                            "label": "1.x(Not apache release)",
                            "to": "https://interestinglab.github.io/seatunnel-docs"
                        }
                    ],
                },
                {
                    to: 'https://github.com/InterestingLab/seatunnel/releases',
                    position: 'right',
                    label: '下载'
                },
                {
                    to: 'https://github.com/InterestingLab/seatunnel/issues/686',
                    label: '用户',
                    position: 'right'
                },
                {
                    to: 'https://github.com/InterestingLab/seatunnel/issues/267',
                    position: 'right',
                    label: 'FAQ'
                },
                {
                    label: 'ASF',
                    position: 'right',
                    items: [
                        {
                            label: "Foundation",
                            to: "https://www.apache.org/",
                        },
                        {
                            label: "License",
                            to: "https://www.apache.org/licenses/",
                        },
                        {
                            label: "Events",
                            to: "https://www.apache.org/events/current-event",
                        },
                        {
                            label: "Security",
                            to: "https://www.apache.org/security/",
                        },
                        {
                            label: "Sponsorship",
                            to: "https://www.apache.org/foundation/sponsorship.html",
                        },
                        {
                            label: "Thanks",
                            to: "https://www.apache.org/foundation/thanks.html",
                        },
                    ],
                },

                {
                    href: 'https://github.com/apache/incubator-seatunnel',
                    label: 'GitHub',
                    position: 'right',
                },
                {
                    type: "localeDropdown",
                    position: "right",
                },
            ],
        },

        footer: {
            style: 'light',
            links: [
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/apache/incubator-seatunnel',
                        },
                        {
                            label: 'Issue Tracker',
                            href: 'https://github.com/apache/incubator-seatunnel/issues',
                        },
                        {
                            label: 'Pull Requests',
                            href: 'https://github.com/apache/incubator-seatunnel/pulls',
                        },
                    ],
                }
            ],
            copyright: `<div><img style="height:50px" alt="Apache Software Foundation" src="/img/incubator-logo.svg" /><p style="color: #999999;  padding: 0 20px 30px;font-weight:400;text-align:left">Apache SeaTunnel is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the Apache Incubator. Incubation is required of all newly accepted projects until a further review indicates that the infrastructure, communications, and decision making process have stabilized in a manner consistent with other successful ASF projects. While incubation status is not necessarily a reflection of the completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF.</p></p>
             <p style="padding: 0 20px 30px;color: #999999;font-weight: 400;"> Copyright © ${new Date().getFullYear()} The Apache Software Foundation. Licensed under the Apache License, Version 2.0. Apache SeaTunnel, Apache Incubator, Apache, the Apache feather logo, the Apache SeaTunnel Logo and the Apache Incubator project logo are trademarks of The Apache Software Foundation.</p>
             <div>`,
        },

        prism: {
            theme: require('prism-react-renderer/themes/dracula'),
            darkTheme: darkCodeTheme,
        }

    }),

    plugins: [
        'docusaurus-plugin-less'
    ]
};

module.exports = config;
