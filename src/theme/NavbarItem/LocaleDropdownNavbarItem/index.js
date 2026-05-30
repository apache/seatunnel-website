/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import { useLocation } from '@docusaurus/router';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import IconLanguage from '@theme/Icon/Language';
import styles from './styles.module.css';

const GOOGLE_LANGUAGES = [
    { label: '日本語', code: 'ja' },
    { label: '한국어', code: 'ko' },
    { label: 'Français', code: 'fr' },
    { label: 'Español', code: 'es' },
    { label: 'Русский', code: 'ru' },
    { label: 'Deutsch', code: 'de' },
];

/**
 * Google Translate may persist the same cookie on multiple domain scopes
 * such as the host, the parent domain, and the current page host-only scope.
 * Enumerating all reachable variants lets us clear stale cookies before
 * writing the next target language.
 */
function getGoogleTranslateCookieDomains(hostname) {
    if (!hostname || hostname === 'localhost' || hostname === '127.0.0.1') {
        return [''];
    }

    const domains = new Set(['', hostname, `.${hostname}`]);
    const parts = hostname.split('.').filter(Boolean);

    for (let index = 1; index < parts.length - 1; index += 1) {
        const parentDomain = parts.slice(index).join('.');
        if (!parentDomain.includes('.')) {
            continue;
        }
        domains.add(parentDomain);
        domains.add(`.${parentDomain}`);
    }

    return Array.from(domains);
}

function writeGoogleTranslateCookie(name, value, hostname, expires) {
    const domainCandidates = getGoogleTranslateCookieDomains(hostname);

    domainCandidates.forEach((domain) => {
        const domainAttribute = domain ? `; domain=${domain}` : '';
        const expiresAttribute = expires ? `; expires=${expires}` : '';
        document.cookie = `${name}=${value}${expiresAttribute}; path=/${domainAttribute}`;
    });
}

export default function LocaleDropdownNavbarItem({
    mobile,
    dropdownItemsBefore,
    dropdownItemsAfter,
    ...props
}) {
    const {
        i18n: { currentLocale, locales, localeConfigs },
    } = useDocusaurusContext();
    const alternatePageUtils = useAlternatePageUtils();
    const { search, hash } = useLocation();

    // Helper function to get current Google Translate language code from cookie
    const getGoogleTranslateLangCode = () => {
        if (typeof document === 'undefined') return null;

        const cookies = document.cookie
            .split('; ')
            .filter((row) => row.startsWith('googtrans='));

        for (let index = cookies.length - 1; index >= 0; index -= 1) {
            const match = cookies[index].match(/googtrans=\/[^\/]+\/([^;]+)/);
            if (match) {
                return match[1];
            }
        }

        return null;
    };

    // Helper function to get language label from cookie
    const getLanguageLabelFromCookie = () => {
        const langCode = getGoogleTranslateLangCode();
        if (langCode) {
            const googleLang = GOOGLE_LANGUAGES.find(lang => lang.code === langCode);
            if (googleLang) {
                return googleLang.label;
            }
        }
        return localeConfigs[currentLocale]?.label || 'English';
    };

    // State to track current language label
    const [currentLangLabel, setCurrentLangLabel] = React.useState(getLanguageLabelFromCookie());

    // Update language label based on Google Translate cookie
    React.useEffect(() => {
        const updateLabel = () => {
            setCurrentLangLabel(getLanguageLabelFromCookie());
        };

        // Initial update
        updateLabel();

        // Listen for storage events (from other tabs/windows)
        window.addEventListener('storage', updateLabel);

        return () => {
            window.removeEventListener('storage', updateLabel);
        };
    }, [currentLocale, localeConfigs]);

    // Hide Google Translate banner frame if present
    React.useEffect(() => {
        const frame = document.querySelector('.goog-te-banner-frame');
        if (frame) {
            frame.style.display = 'none';
        }
    }, []);

    // Helper function to trigger Google Translate programmatically
    const handleGoogleTranslate = (langCode) => {
        const cookieValue = '/en/' + langCode;
        writeGoogleTranslateCookie('googtrans', '', window.location.hostname, 'Thu, 01 Jan 1970 00:00:00 UTC');
        writeGoogleTranslateCookie('googtrans', cookieValue, window.location.hostname);

        // If currently on a /zh-CN/ page, redirect to English version first
        const currentPath = window.location.pathname;
        if (currentPath.startsWith('/zh-CN/')) {
            // Remove /zh-CN prefix to go to English version
            const englishPath = currentPath.replace(/^\/zh-CN/, '') || '/';
            window.location.href = englishPath + window.location.search + window.location.hash;
        } else {
            // Reload the page to apply translation
            window.location.reload();
        }
    };

    const activeGoogleLang = getGoogleTranslateLangCode();
    const activeClass = mobile ? 'menu__link--active' : 'dropdown__link--active';

    const localeItems = locales.map((locale) => {
        const baseTo = `pathname://${alternatePageUtils.createUrl({
            locale,
            fullyQualified: false,
        })}`;
        const to = `${baseTo}${search}${hash}`;

        // Native locale is only active if no Google Translate is active AND locale matches
        const isActive = !activeGoogleLang && locale === currentLocale;

        return {
            label: localeConfigs[locale].label,
            lang: localeConfigs[locale].htmlLang,
            to,
            target: '_self',
            autoAddBaseUrl: false,
            className: `notranslate ${isActive ? activeClass : ''}`.trim(),
            onClick: () => {
                writeGoogleTranslateCookie('googtrans', '', window.location.hostname, 'Thu, 01 Jan 1970 00:00:00 UTC');
                // Update the label immediately
                setCurrentLangLabel(localeConfigs[locale].label);
            }
        };
    });

    const googleItems = GOOGLE_LANGUAGES.map((lang) => {
        const isActive = activeGoogleLang === lang.code;
        return {
            label: lang.label,
            to: '#',
            className: `notranslate ${isActive ? activeClass : ''}`.trim(),
            onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                // Update the label immediately
                setCurrentLangLabel(lang.label);
                handleGoogleTranslate(lang.code);
                return false;
            },
        };
    });

    const items = [...dropdownItemsBefore, ...localeItems, ...googleItems, ...dropdownItemsAfter];

    const dropdownLabel = mobile
        ? translate({
            message: 'Languages',
            id: 'theme.navbar.mobileLanguageDropdown.label',
            description: 'The label for the mobile language switcher dropdown',
        })
        : currentLangLabel;

    return (
        <DropdownNavbarItem
            {...props}
            mobile={mobile}
            className="notranslate"
            label={
                <>
                    <div id="google_translate_element" style={{ visibility: 'hidden', height: 0, overflow: 'hidden', position: 'absolute' }} />
                    <IconLanguage className={styles.iconLanguage} />
                    {dropdownLabel}
                </>
            }
            items={items}
        />
    );
}
