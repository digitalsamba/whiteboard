import { jsx } from "react/jsx-runtime";
import { track, useEditor } from "@tldraw/editor";
import * as React from "react";
import { useAssetUrls } from "../useAssetUrls.mjs";
import { DEFAULT_TRANSLATION } from "./defaultTranslation.mjs";
import { fetchTranslation } from "./translations.mjs";
const TranslationsContext = React.createContext(
  {}
);
const useCurrentTranslation = () => React.useContext(TranslationsContext);
const TranslationProvider = track(function TranslationProvider2({
  overrides,
  children
}) {
  const editor = useEditor();
  const locale = editor.user.locale;
  const getAssetUrl = useAssetUrls();
  const [currentTranslation, setCurrentTranslation] = React.useState(() => {
    if (overrides && overrides["en"]) {
      return {
        locale: "en",
        label: "English",
        messages: { ...DEFAULT_TRANSLATION, ...overrides["en"] }
      };
    }
    return {
      locale: "en",
      label: "English",
      messages: DEFAULT_TRANSLATION
    };
  });
  React.useEffect(() => {
    let isCancelled = false;
    async function loadTranslation() {
      const translation = await fetchTranslation(locale, getAssetUrl);
      if (translation && !isCancelled) {
        if (overrides && overrides[locale]) {
          setCurrentTranslation({
            ...translation,
            messages: { ...translation.messages, ...overrides[locale] }
          });
        } else {
          setCurrentTranslation(translation);
        }
      }
    }
    loadTranslation();
    return () => {
      isCancelled = true;
    };
  }, [getAssetUrl, locale, overrides]);
  return /* @__PURE__ */ jsx(TranslationsContext.Provider, { value: currentTranslation, children });
});
function useTranslation() {
  const translation = useCurrentTranslation();
  return React.useCallback(
    function msg(id) {
      return translation.messages[id] ?? id;
    },
    [translation]
  );
}
export {
  TranslationProvider,
  useTranslation
};
//# sourceMappingURL=useTranslation.mjs.map
