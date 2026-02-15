function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {
            pageLanguage: "en",
            // Only languages NOT provided by native Docusaurus i18n
            // en and zh-CN are handled by Docusaurus natively
            includedLanguages: "ja,ko,fr,es,ru,de",
            autoDisplay: false,
        },
        "google_translate_element"
    );
}
