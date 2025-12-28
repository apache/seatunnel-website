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

    // Clear Google Translate cookie if we are on a native locale page
    React.useEffect(() => {
        if (currentLocale === 'en' || currentLocale === 'zh-CN') {
            const clearCookie = (name) => {
                document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/seatunnel-website;';
                document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.' + document.domain + '; path=/;';
            };
            clearCookie('googtrans');
            const frame = document.querySelector('.goog-te-banner-frame');
            if (frame) {
                frame.style.display = 'none';
            }
        }
    }, [currentLocale]);

    // Detect if we're on a versioned documentation page
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const versionMatch = currentPath.match(/^\/docs\/([^/]+)\//);
    const isVersionedDoc = versionMatch && versionMatch[1] !== '';

    // Helper function to trigger Google Translate programmatically
    const handleGoogleTranslate = (langCode) => {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = langCode;
            select.dispatchEvent(new Event('change'));
        }
    };

    const localeItems = locales.map((locale) => {
        const baseTo = `pathname://${alternatePageUtils.createUrl({
            locale,
            fullyQualified: false,
        })}`;
        const to = `${baseTo}${search}${hash}`;

        return {
            label: localeConfigs[locale].label,
            lang: localeConfigs[locale].htmlLang,
            to,
            target: '_self',
            autoAddBaseUrl: false,
            className:
                locale === currentLocale
                    ? mobile
                        ? 'menu__link--active'
                        : 'dropdown__link--active'
                    : '',
            onClick: () => {
                // Clear Google Translate cookie when switching to native locales
                document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            }
        };
    });

    const googleItems = GOOGLE_LANGUAGES.map((lang) => ({
        label: lang.label,
        to: '#',
        onClick: (e) => {
            e.preventDefault();
            handleGoogleTranslate(lang.code);
        },
    }));

    const items = [...dropdownItemsBefore, ...localeItems, ...googleItems, ...dropdownItemsAfter];
    const dropdownLabel = mobile
        ? translate({
            message: 'Languages',
            id: 'theme.navbar.mobileLanguageDropdown.label',
            description: 'The label for the mobile language switcher dropdown',
        })
        : localeConfigs[currentLocale].label;

    return (
        <DropdownNavbarItem
            {...props}
            mobile={mobile}
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
