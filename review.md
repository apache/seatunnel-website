# PR Review: Support Google Translate #429

## Overview
This PR introduces Google Translate integration to support additional languages (Japanese, Korean, French, Spanish, Russian, German) alongside the native English and Chinese support. It functions by manipulating the `googtrans` cookie and reloading the page to trigger the translation layer.

## Technical Assessment

### 1. Architecture & Design
*   **Approach**: The client-side "Cookie + Reload" strategy is a cost-effective way to support many languages without translating content manually.
*   **Hybrid Logic**: The logic to switch between native Docusaurus i18n (en/zh-CN) and Google Translate is generally sound, ensuring that switching to a "machine-translated" language eventually routes through the English version for better translation accuracy.
*   **Maintainability**: Swizzling `NavbarItem/LocaleDropdownNavbarItem` is necessary for this custom behavior but increases the maintenance burden when upgrading Docusaurus in the future.

### 2. Detailed Code Review

#### 🔴 High Severity: Hardcoded Deployment Path
*   **File**: `src/theme/NavbarItem/LocaleDropdownNavbarItem/index.js`
*   **Location**: Line ~140
    ```javascript
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/seatunnel-website;';
    ```
*   **Issue**: The path `/seatunnel-website` is hardcoded. This assumes the website will always be hosted on this specific subpath. If the website is deployed to a root domain (e.g., `seatunnel.apache.org`) or a different subpath, this cookie deletion will fail. Users will be stuck in "Google Translate mode" and unable to switch back to native English/Chinese.
*   **Recommendation**: Retrieve the `baseUrl` dynamically using the Docusaurus context.
    ```javascript
    const { siteConfig: { baseUrl } } = useDocusaurusContext();
    // ...
    document.cookie = name + '=; ... path=' + baseUrl + ';';
    ```

#### 🟡 Medium Severity: Unnecessary Performance Overhead
*   **File**: `src/theme/NavbarItem/LocaleDropdownNavbarItem/index.js`
*   **Location**: Line ~74
    ```javascript
    const interval = setInterval(updateLabel, 1000);
    ```
*   **Issue**: Using `setInterval` to poll for cookie changes every second is inefficient and wastes main thread resources.
*   **Recommendation**:
    1.  Update the state (`setCurrentLangLabel`) immediately within the `onClick` handlers when the user changes the language.
    2.  Keep the `window.addEventListener('storage', ...)` for cross-tab synchronization.
    3.  Remove the `setInterval` entirely.

#### 🟢 Low Severity: Code Quality & Best Practices
1.  **Function Definition inside Loop**:
    *   **File**: `src/theme/NavbarItem/LocaleDropdownNavbarItem/index.js` (Line ~136)
    *   **Issue**: `clearCookie` is defined inside `locales.map`. This creates a new function instance for every locale item on every render.
    *   **Recommendation**: Extract `clearCookie` to be a helper function outside the component or at least outside the loop.

2.  **Redundant Configuration**:
    *   **File**: `static/js/google_translate_init.js`
    *   **Issue**: `includedLanguages: "zh-CN,..."`.
    *   **Recommendation**: Since `zh-CN` is natively supported, consider removing it from this list to ensure the Google Translate UI never attempts to override the native Chinese version.

## Conclusion
**Status: Request Changes**

The requested feature provides significant value for international accessibility. However, the **hardcoded path** issue presents a significant risk to site reliability across different deployment environments. Please address the hardcoded path and the polling performance issue before merging.
