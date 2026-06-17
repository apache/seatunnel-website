/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {useEffect} from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme-original/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const ASK_AI_TRIGGER_ID = 'st-global-ask-ai-trigger';
const KAPA_PROJECT_COLOR = '#7db9f5';
const KAPA_SHADOW_STYLE_ID = 'st-kapa-shadow-overrides';

const KAPA_SHADOW_OVERRIDES = `
  #kapa-widget-root [data-modal-content],
  #kapa-widget-root #kapa-modal-content {
    width: min(1120px, calc(100vw - 28px)) !important;
    min-width: min(1120px, calc(100vw - 28px)) !important;
    max-width: 1120px !important;
    min-height: min(780px, calc(100vh - 32px)) !important;
    border-radius: 34px !important;
    border: 1px solid rgba(160, 202, 240, 0.92) !important;
    background:
      radial-gradient(circle at 12% 10%, rgba(125, 185, 245, 0.16) 0%, rgba(125, 185, 245, 0) 34%),
      radial-gradient(circle at 88% 92%, rgba(107, 118, 214, 0.12) 0%, rgba(107, 118, 214, 0) 30%),
      linear-gradient(180deg, rgba(251, 254, 255, 0.985) 0%, rgba(241, 248, 255, 0.985) 100%) !important;
    box-shadow: 0 32px 86px rgba(125, 185, 245, 0.24) !important;
  }

  #kapa-widget-root #kapa-modal-content {
    width: min(1120px, calc(100vw - 28px)) !important;
    min-width: min(1120px, calc(100vw - 28px)) !important;
    max-width: 1120px !important;
  }

  #kapa-widget-root [data-modal-body] {
    padding: 24px 24px 18px !important;
  }

  #kapa-widget-root [data-modal-header] {
    padding: 22px 24px 18px !important;
  }

  #kapa-widget-root textarea,
  #kapa-widget-root input[type='text'],
  #kapa-widget-root input:not([type]) {
    min-height: 112px !important;
    padding: 18px 22px !important;
    box-sizing: border-box !important;
    border-radius: 22px !important;
    border: 1px solid rgba(160, 202, 240, 0.78) !important;
    background: rgba(248, 252, 255, 0.97) !important;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72) !important;
    color: #1b2b3d !important;
    caret-color: #1b2b3d !important;
    line-height: 1.55 !important;
  }

  #kapa-widget-root textarea::placeholder,
  #kapa-widget-root input[type='text']::placeholder,
  #kapa-widget-root input:not([type])::placeholder {
    color: #91a4b9 !important;
  }

  #kapa-widget-root button {
    border-radius: 18px !important;
  }

  #kapa-widget-root [data-modal-disclaimer] {
    border-radius: 16px !important;
    background: linear-gradient(135deg, rgba(247, 251, 255, 0.96) 0%, rgba(235, 245, 255, 0.96) 100%) !important;
    border: 1px solid rgba(160, 202, 240, 0.44) !important;
  }

  #kapa-widget-root [data-modal-close-button] {
    width: 44px !important;
    height: 44px !important;
  }

  #kapa-widget-root [data-query-input-container] {
    border-radius: 24px !important;
    border: 1px solid rgba(160, 202, 240, 0.5) !important;
    background: rgba(255, 255, 255, 0.9) !important;
  }

  /*
   * Avoid affecting Kapa internal dropdown/popover dialogs.
   * Deep thinking may create an internal Mantine dropdown on hover.
   */
  #kapa-widget-root [id*='dropdown'],
  #kapa-widget-root [class*='Popover-dropdown'],
  #kapa-widget-root [class*='mantine-Popover-dropdown'] {
    width: auto !important;
    min-width: unset !important;
    max-width: 360px !important;
    min-height: unset !important;
    border-radius: 14px !important;
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12) !important;
  }
`;

/**
 * Apply site-specific widget overrides inside Kapa's shadow root.
 */
function applyKapaWidgetOverrides(shadowRoot) {
  if (!shadowRoot) {
    return;
  }

  let styleElement = shadowRoot.getElementById(KAPA_SHADOW_STYLE_ID);
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = KAPA_SHADOW_STYLE_ID;
    styleElement.textContent = KAPA_SHADOW_OVERRIDES;
    shadowRoot.appendChild(styleElement);
  }

  const root = shadowRoot.querySelector('#kapa-widget-root');
  if (!root) {
    return;
  }

  root.style.setProperty('--mantine-radius-md', '18px');
  root.style.setProperty('--mantine-radius-lg', '22px');
  root.style.setProperty('--mantine-radius-xl', '30px');
  root.style.setProperty('--mantine-color-anchor', '#2f77bb');
  root.style.setProperty('--mantine-color-default-border', '#d9e8f5');
  root.style.setProperty('--mantine-color-default', '#f8fcff');
}

function KapaWidgetOverrides() {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    let hostObserver;
    let shadowObserver;

    const bindShadowRoot = () => {
      const shadowRoot = document.querySelector('#kapa-widget-container')?.shadowRoot;
      if (!shadowRoot) {
        return false;
      }

      applyKapaWidgetOverrides(shadowRoot);

      shadowObserver?.disconnect();
      shadowObserver = new MutationObserver(() => applyKapaWidgetOverrides(shadowRoot));
      shadowObserver.observe(shadowRoot, {childList: true, subtree: true});

      return true;
    };

    if (!bindShadowRoot()) {
      hostObserver = new MutationObserver(() => {
        if (bindShadowRoot()) {
          hostObserver.disconnect();
        }
      });

      hostObserver.observe(document.body, {childList: true, subtree: true});
    }

    return () => {
      hostObserver?.disconnect();
      shadowObserver?.disconnect();
    };
  }, []);

  return null;
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5.833 14.167 2.5 17.5V4.167C2.5 3.246 3.246 2.5 4.167 2.5h11.666c.921 0 1.667.746 1.667 1.667v8.333c0 .921-.746 1.667-1.667 1.667H5.833Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.667 7.083h6.666M6.667 10.417h4.166"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GlobalAskAi() {
  return (
    <button
      id={ASK_AI_TRIGGER_ID}
      type="button"
      className="st-global-ask-ai"
      aria-label="Ask AI"
      title="Ask AI"
    >
      <span className="st-global-ask-ai-button">
        <MessageIcon />
        <span>Ask AI</span>
      </span>
      <span className="st-global-ask-ai-dot" aria-hidden="true"></span>
    </button>
  );
}

export default function LayoutWrapper(props) {
  const {i18n} = useDocusaurusContext();

  const widgetLanguage =
    typeof window !== 'undefined'
      ? window.location.pathname.startsWith('/zh-CN/')
        ? 'zh'
        : 'en'
      : i18n.currentLocale === 'zh-CN'
        ? 'zh'
        : 'en';

  // Inject the global Ask AI shortcut once so docs pages and custom pages stay consistent.
  return (
    <>
      <Head>
        <script
          async
          id="st-kapa-widget-script"
          src="https://widget.kapa.ai/kapa-widget.bundle.js"
          data-website-id="3a335e8d-d400-4c7d-baad-d820ee0600a7"
          data-project-name="Apache SeaTunnel"
          data-project-logo="https://seatunnel.apache.org/image/logo.png"
          data-project-color={KAPA_PROJECT_COLOR}
          data-language={widgetLanguage}
          data-button-hide="true"
          data-modal-border-radius="34px"
          data-modal-override-open-id-ask-ai={ASK_AI_TRIGGER_ID}
          data-modal-disclaimer="This is a custom LLM with access to all [SeaTunnel documentation](https://seatunnel.apache.org/docs/introduction/about)."
          data-modal-disclaimer-bg-color="#f4fbff"
          data-modal-disclaimer-text-color="#5b6b7e"
          data-query-input-border-color="#d9e8f5"
          data-query-input-text-color="#0f172a"
          data-query-input-placeholder-text-color="#9aa7b8"
          data-deep-thinking-button-bg-color="#f4fbff"
          data-deep-thinking-button-hover-bg-color="#ebf6ff"
          data-deep-thinking-button-text-color="#233445"
          data-deep-thinking-button-active-bg-color="#dceeff"
          data-deep-thinking-button-active-hover-bg-color="#d2e9ff"
          data-deep-thinking-button-active-text-color="#1d6db4"
          data-example-question-button-bg-color="#f8fcff"
          data-example-question-button-border="1px solid #d9e8f5"
          data-example-question-button-hover-bg-color="#eef7ff"
          data-example-question-button-text-color="#233445"
          data-consent-required="true"
          data-consent-screen-disclaimer="By clicking &quot;I agree, let's chat&quot;, you consent to the use of the AI assistant in accordance with kapa.ai's [Privacy Policy](https://www.kapa.ai/content/privacy-policy). This service uses reCAPTCHA, which requires your consent to Google's [Privacy Policy](https://policies.google.com/privacy) and [Terms of Service](https://policies.google.com/terms). By proceeding, you explicitly agree to both kapa.ai's and Google's privacy policies."
          data-bot-protection-mechanism="hcaptcha"
        ></script>
      </Head>

      <Layout {...props} />
      <KapaWidgetOverrides />
      <GlobalAskAi />
    </>
  );
}