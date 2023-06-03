const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const versions = require('./versions.json');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Apache SeaTunnel',
    tagline: 'Dinosaurs are cool',
    url: 'https://seatunnel.apache.org',
    baseUrl: '/',
    onBrokenLinks: 'ignore',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'image/favicon.ico',
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
                    path: 'docs',
                    routeBasePath: 'docs',
                    sidebarPath: require.resolve('./sidebars.js'),
                    sidebarCollapsible: true,
                    editLocalizedFiles: true,
                    // Please change this to your repo.
                    editUrl: 'https://github.com/apache/incubator-seatunnel-website/edit/main/',
                    versions: {
                        current: {
                            path: '',
                        },
                        [versions[0]]: {
                            path: versions[0],
                        }
                    }
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/apache/incubator-seatunnel-website/edit/main/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],
    themeConfig: ({
        announcementBar: {
            id: 'announcementBar', // Increment on change
            content: `🤔 Have queries regarding Apache SeaTunnel, Join Slack channel to discuss them join <a target="_blank" rel="noopener noreferrer" href="https://the-asf.slack.com/archives/C053HND1D6X">#SeaTunnel</a> channel! 🌟`,
            backgroundColor: "rgb(70, 125, 175, 0.8)",
            isCloseable: false,
        },
        hideOnScroll: false, // Whether to hide the sidebar on scroll
        hideableSidebar: true, // Whether to hide the sidebar in mobile
        colorMode: {
            defaultMode: 'light',
            disableSwitch: true
        },
        navbar: {
            title: 'Apache SeaTunnel',
            logo: {
                alt: 'Apache SeaTunnel Logo',
                src: 'image/logo.png',
            },
            items: [
                {
                    to: '/',
                    position: 'right',
                    label: 'Home',
                    activeBaseRegex: `^/$`,
                },
                {
                    position: 'right',
                    label: 'Document',
                    items: [
                        ...versions.slice(0, versions.length - 2).map((version) => ({
                            label: version,
                            to: (version >= '2.3.0') ? `docs/${version}/about` : `docs/${version}/intro/about`,
                        })),
                        ...versions.slice(versions.length - 2, versions.length).map((version) => ({
                            label: (version === "1.x") ? "1.x(Not Apache Release)" : version,
                            to: `docs/${version}/introduction`,
                        })),
                        {
                            label: "Next",
                            to: "/docs/about",
                        },
                        {
                            label: "All versions",
                            to: "/versions/",
                        }
                    ]
                },
                {
                    to: '/download',
                    position: 'right',
                    label: 'Download',
                    activeBaseRegex: `/download`,
                },
                {
                    label: 'Community',
                    position: 'right',
                    to: '/community/contribution_guide/contribute'
                },
                {
                    to: '/blog',
                    label: 'Blog',
                    position: 'right',
                    activeBaseRegex: `/blog`,
                },
                {
                    to: '/user_cases',
                    label: 'UserCases',
                    position: 'right',
                    activeBaseRegex: `/user_cases`,
                },
                {
                    to: '/team',
                    label: 'Team',
                    position: 'right',
                    activeBaseRegex: `/team`,
                },
                {
                    to: '/user',
                    label: 'Users',
                    position: 'right',
                    activeBaseRegex: `/user/`,
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
                        {
                            label: "Privacy",
                            to: "https://apache.org/foundation/policies/privacy.html",
                        },
                    ],
                },

                {
                    href: 'https://github.com/apache/incubator-seatunnel',
                    label: 'GitHub',
                    position: 'right',
                },

                {
                    to: '/security',
                    label: 'Security',
                    position: 'right',
                    activeBaseRegex: `/security`,
                },
                // {
                //     type: "localeDropdown",
                //     position: "right",
                // },
            ],
        },

        footer: {
            style: 'light',
            links: [
                {
                    title: 'SeaTunnel',
                    items: [
                        {
                            label: 'FAQ',
                            href: '/docs/faq',
                        },
                        {
                            label: 'Releases',
                            href: 'https://github.com/apache/incubator-seatunnel/releases',
                        },
                    ],
                },
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
                },
                {
                    title: 'Subscribe Mailing List',
                    items: [
                        {
                            label: 'How to Subscribe',
                            to: '/community/contribution_guide/subscribe',
                        },
                        {
                            label: 'Subscribe Mail',
                            href: 'mailto:dev-subscribe@seatunnel.apache.org',
                        },
                        {
                            label: 'Mail Archive',
                            href: 'https://lists.apache.org/list.html?dev@seatunnel.apache.org',
                        },
                    ],
                },

            ],
            copyright: `
            <div style="margin-top: 20px;background: #f4f8fa">
                <img style="height:50px;margin: 30px 0 10px;" alt="Apache Software Foundation" src="/image/asf_logo_wide.svg" />
                <div style="border-top: 1px solid #ccc;min-height: 60px;line-height: 20px;text-align: center;font-family: Avenir-Medium;font-size: 14px;color: #999;display: flex;align-items: center;"><span>Copyright © 2021-${new Date().getFullYear()} The Apache Software Foundation. Apache SeaTunnel, SeaTunnel, and its feather logo are trademarks of The Apache Software Foundation.</span></div>
                <div style="text-align: center;">
                    <a href="https://twitter.com/asfseatunnel?s=21" target="_blank" title="Twitter" ><svg t="1644553365083" class="icon" viewBox="0 0 1260 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7015" width="38" height="38"><path d="M1259.846921 121.148242c-46.524504 20.728739-96.273478 34.547899-148.325646 40.536201 53.434084-31.784067 94.430924-82.454319 113.777747-142.797982-50.209613 29.480874-105.486251 51.13089-164.447999 62.646857A257.584528 257.584528 0 0 0 872.449815 0.000276c-142.797982 0-258.418284 115.620302-258.418284 258.418284 0 20.268101 2.303193 40.075563 6.909579 58.961748C405.82286 306.32498 215.579097 203.602561 87.98219 47.446058c-22.110655 38.233008-35.008538 82.454319-35.008538 129.900099 0 89.824537 45.603227 168.593747 115.159663 215.118251-42.378756-1.381916-81.99368-12.897882-117.002217-32.244706v3.224471c0 125.293713 88.90326 229.398049 207.287393 253.351259-21.650017 5.988302-44.681949 9.212773-68.17452 9.212773-16.582991 0-32.705344-1.842555-48.827697-4.606387 32.705344 102.722419 128.518184 177.345881 241.374653 179.649074-88.442621 69.095798-199.917175 110.553277-321.06514 110.553277-20.728739 0-41.457479-1.381916-61.72558-3.685109 114.238386 73.241546 250.126788 116.08094 396.149241 116.08094 475.379089 0 735.179289-393.846048 735.179289-735.179289 0-11.055328-0.460639-22.571294-0.921277-33.626621 51.13089-36.851092 94.891562-82.454319 129.439461-134.045848z" fill="#909094" p-id="7016"></path></svg></a> 
                    <a href="https://the-asf.slack.com/archives/C053HND1D6X" target="_blank" title="Slack" style="margin-left: 20px;"><svg t="1644553076784" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3088" width="36" height="36"><path d="M215.125333 647.04a107.861333 107.861333 0 0 1-107.52 107.648A107.861333 107.861333 0 0 1 0 647.04a107.818667 107.818667 0 0 1 107.605333-107.52h107.52v107.52z m54.229334 0a107.818667 107.818667 0 0 1 107.562666-107.52 107.818667 107.818667 0 0 1 107.562667 107.52v269.354667A107.861333 107.861333 0 0 1 376.917333 1024a107.861333 107.861333 0 0 1-107.562666-107.605333v-269.354667zM376.917333 215.125333a107.861333 107.861333 0 0 1-107.562666-107.52A107.861333 107.861333 0 0 1 376.917333 0a107.861333 107.861333 0 0 1 107.562667 107.605333v107.52H376.917333z m0 54.229334a107.861333 107.861333 0 0 1 107.562667 107.562666 107.861333 107.861333 0 0 1-107.562667 107.562667H107.605333A107.861333 107.861333 0 0 1 0 376.917333a107.861333 107.861333 0 0 1 107.605333-107.562666h269.312z m431.872 107.562666a107.861333 107.861333 0 0 1 107.605334-107.562666A107.861333 107.861333 0 0 1 1024 376.917333a107.861333 107.861333 0 0 1-107.605333 107.562667h-107.605334V376.917333z m-54.101333 0a107.861333 107.861333 0 0 1-107.648 107.562667 107.818667 107.818667 0 0 1-107.52-107.562667V107.605333A107.818667 107.818667 0 0 1 647.04 0a107.861333 107.861333 0 0 1 107.648 107.605333v269.312z m-107.648 431.872a107.861333 107.861333 0 0 1 107.648 107.605334A107.861333 107.861333 0 0 1 647.04 1024a107.818667 107.818667 0 0 1-107.52-107.605333v-107.605334h107.52z m0-54.101333a107.818667 107.818667 0 0 1-107.52-107.648 107.776 107.776 0 0 1 107.52-107.52h269.354667A107.818667 107.818667 0 0 1 1024 647.04a107.861333 107.861333 0 0 1-107.605333 107.648h-269.354667z" p-id="3089" fill="#909094"></path></svg></a> 
                    <a href="https://lists.apache.org/list.html?dev@seatunnel.apache.org" target="_blank" title="Mailing list" style="margin-left: 20px;"><svg t="1644553175467" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5304" width="39" height="39"><path d="M853.333333 170.666667H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v512c0 46.933333 38.4 85.333333 85.333334 85.333333h682.666666c46.933333 0 85.333333-38.4 85.333334-85.333333V256c0-46.933333-38.4-85.333333-85.333334-85.333333z m0 170.666666l-341.333333 213.333334-341.333333-213.333334V256l341.333333 213.333333 341.333333-213.333333v85.333333z" p-id="5305" fill="#909094"></path></svg></a> 
                    <a href="https://github.com/apache/incubator-seatunnel" target="_blank" title="GitHub" style="margin-left: 20px;"><svg t="1644553223000" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6156" width="36" height="36"><path d="M512 12.64c-282.752 0-512 229.216-512 512 0 226.208 146.72 418.144 350.144 485.824 25.6 4.736 35.008-11.104 35.008-24.64 0-12.192-0.48-52.544-0.704-95.328-142.464 30.976-172.512-60.416-172.512-60.416-23.296-59.168-56.832-74.912-56.832-74.912-46.464-31.776 3.52-31.136 3.52-31.136 51.392 3.616 78.464 52.768 78.464 52.768 45.664 78.272 119.776 55.648 148.992 42.56 4.576-33.088 17.856-55.68 32.512-68.48-113.728-12.928-233.28-56.864-233.28-253.024 0-55.904 20-101.568 52.768-137.44-5.312-12.896-22.848-64.96 4.96-135.488 0 0 43.008-13.76 140.832 52.48a491.296 491.296 0 0 1 128.16-17.248c43.488 0.192 87.328 5.888 128.256 17.248 97.728-66.24 140.64-52.48 140.64-52.48 27.872 70.528 10.336 122.592 5.024 135.488 32.832 35.84 52.704 81.536 52.704 137.44 0 196.64-119.776 239.936-233.792 252.64 18.368 15.904 34.72 47.04 34.72 94.816 0 68.512-0.608 123.648-0.608 140.512 0 13.632 9.216 29.6 35.168 24.576C877.472 942.624 1024 750.784 1024 524.64c0-282.784-229.248-512-512-512z" p-id="6157" fill="#909094"></path></svg></a> 
                </div>
            <div>`,
        },

        prism: {
            theme: require('prism-react-renderer/themes/dracula'),
            darkTheme: darkCodeTheme,
        },

        // would collapse all sibling categories when expanding one category
        autoCollapseSidebarCategories: true,

    }),
    plugins: [
        'docusaurus-plugin-less',
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'community',
                path: 'community',
                routeBasePath: 'community',
                editUrl: ({locale, versionDocsDirPath, docPath}) => {
                    if (locale !== 'en') {
                        return `https://github.com/apache/incubator-seatunnel-website/edit/main/i18n/${locale}/${docPath}`;
                    }
                    return `https://github.com/apache/incubator-seatunnel-website/edit/main/${versionDocsDirPath}/${docPath}`;
                },
                sidebarPath: require.resolve('./sidebarsCommunity.js'),
            },
        ],
        [
            '@docusaurus/plugin-content-blog',
            {
                id: 'user_cases',
                path: 'user_cases',
                routeBasePath: 'user_cases',
            },
        ],
    ],
};

module.exports = config;
