function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {
            pageLanguage: "en",
            // Only languages NOT provided by native Docusaurus i18n
            includedLanguages: "zh-CN,ja,ko,fr,es,ru,de",
            autoDisplay: false,
        },
        "google_translate_element"
    );
}
