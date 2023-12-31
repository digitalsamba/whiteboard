import { LANGUAGES } from "@tldraw/editor";
import { DEFAULT_TRANSLATION } from "./defaultTranslation.mjs";
const EN_TRANSLATION = {
  locale: "en",
  label: "English",
  messages: DEFAULT_TRANSLATION
};
async function fetchTranslation(locale, assetUrls) {
  const mainRes = await fetch(assetUrls.translations.en);
  if (!mainRes.ok) {
    console.warn(`No main translations found.`);
    return EN_TRANSLATION;
  }
  if (locale === "en") {
    return EN_TRANSLATION;
  }
  const language = LANGUAGES.find((t) => t.locale === locale);
  if (!language) {
    console.warn(`No translation found for locale ${locale}`);
    return EN_TRANSLATION;
  }
  const res = await fetch(assetUrls.translations[language.locale]);
  const messages = await res.json();
  if (!messages) {
    console.warn(`No messages found for locale ${locale}`);
    return EN_TRANSLATION;
  }
  const missing = [];
  for (const key in EN_TRANSLATION) {
    if (!messages[key]) {
      missing.push(key);
    }
  }
  if (missing.length > 0 && process.env.NODE_ENV === "development") {
    console.warn(`Language ${locale}: missing messages for keys:
${missing.join("\n")}`);
  }
  return {
    locale,
    label: language.label,
    messages: { ...EN_TRANSLATION.messages, ...messages }
  };
}
export {
  fetchTranslation
};
//# sourceMappingURL=translations.mjs.map
