import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Home from './home'
import useIsBrowser from '@docusaurus/useIsBrowser';
import Head from '@docusaurus/Head';

export default function() {
    const isBrowser = useIsBrowser();
    const {siteConfig} = useDocusaurusContext();

    const pathname = isBrowser && location.pathname

    useEffect(() => {
        if (isBrowser) {
            const nav = document.getElementsByTagName('nav')[0];
            const classList = nav &&  nav.classList;
            if(!classList) return;
            if (pathname === '/' || pathname === '/zh-CN/') {
                classList.add('index-nav');
            } else {
                classList.remove('index-nav');
            }
        }
    }, [isBrowser, pathname])

    return (
        <Layout
            title={siteConfig.title}
            description="Description will go into a meta tag in <head />">
            <Head>
                <script async src="https://widget.kapa.ai/kapa-widget.bundle.js" data-website-id="3a335e8d-d400-4c7d-baad-d820ee0600a7" data-project-name="Apache SeaTunnel" data-project-logo="https://seatunnel.apache.org/image/logo.png" data-project-color="#444FD9" data-modal-disclaimer="This is a custom LLM with access to all [SeaTunnel documentation](https://seatunnel.apache.org/docs/about)." data-consent-required data-consent-screen-disclaimer="By clicking &amp;quot;I agree, let's chat&amp;quot;, you consent to the use of the AI assistant in accordance with kapa.ai's [Privacy Policy](https://www.kapa.ai/content/privacy-policy). This service uses reCAPTCHA, which requires your consent to Google's [Privacy Policy](https://policies.google.com/privacy) and [Terms of Service](https://policies.google.com/terms). By proceeding, you explicitly agree to both kapa.ai's and Google's privacy policies." data-bot-protection-mechanism="hcaptcha"></script>
            </Head>
            <main>
                <Home/>
            </main>
        </Layout>
    );
}
