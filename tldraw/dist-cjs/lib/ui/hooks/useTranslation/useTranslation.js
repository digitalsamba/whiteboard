"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var useTranslation_exports = {};
__export(useTranslation_exports, {
  TranslationProvider: () => TranslationProvider,
  useTranslation: () => useTranslation
});
module.exports = __toCommonJS(useTranslation_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var React = __toESM(require("react"));
var import_useAssetUrls = require("../useAssetUrls");
var import_defaultTranslation = require("./defaultTranslation");
var import_translations = require("./translations");
const TranslationsContext = React.createContext(
  {}
);
const useCurrentTranslation = () => React.useContext(TranslationsContext);
const TranslationProvider = (0, import_editor.track)(function TranslationProvider2({
  overrides,
  children
}) {
  const editor = (0, import_editor.useEditor)();
  const locale = editor.user.locale;
  const getAssetUrl = (0, import_useAssetUrls.useAssetUrls)();
  const [currentTranslation, setCurrentTranslation] = React.useState(() => {
    if (overrides && overrides["en"]) {
      return {
        locale: "en",
        label: "English",
        messages: { ...import_defaultTranslation.DEFAULT_TRANSLATION, ...overrides["en"] }
      };
    }
    return {
      locale: "en",
      label: "English",
      messages: import_defaultTranslation.DEFAULT_TRANSLATION
    };
  });
  React.useEffect(() => {
    let isCancelled = false;
    async function loadTranslation() {
      const translation = await (0, import_translations.fetchTranslation)(locale, getAssetUrl);
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranslationsContext.Provider, { value: currentTranslation, children });
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
//# sourceMappingURL=useTranslation.js.map
