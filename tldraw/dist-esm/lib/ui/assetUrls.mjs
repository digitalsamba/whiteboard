import { EMBED_DEFINITIONS, LANGUAGES } from "@tldraw/editor";
import { version } from "../ui/version.mjs";
import { defaultEditorAssetUrls } from "../utils/assetUrls.mjs";
import { iconTypes } from "./icon-types.mjs";
let defaultUiAssetUrls = {
  ...defaultEditorAssetUrls,
  icons: Object.fromEntries(
    iconTypes.map((name) => [
      name,
      `https://unpkg.com/@tldraw/assets@${version}/icons/icon/${name}.svg`
    ])
  ),
  translations: Object.fromEntries(
    LANGUAGES.map((lang) => [
      lang.locale,
      `https://unpkg.com/@tldraw/assets@${version}/translations/${lang.locale}.json`
    ])
  ),
  embedIcons: Object.fromEntries(
    EMBED_DEFINITIONS.map((def) => [
      def.type,
      `https://unpkg.com/@tldraw/assets@${version}/embed-icons/${def.type}.png`
    ])
  )
};
function setDefaultUiAssetUrls(urls) {
  defaultUiAssetUrls = urls;
}
function useDefaultUiAssetUrlsWithOverrides(overrides) {
  if (!overrides)
    return defaultUiAssetUrls;
  return {
    fonts: Object.assign({ ...defaultUiAssetUrls.fonts }, { ...overrides?.fonts }),
    icons: Object.assign({ ...defaultUiAssetUrls.icons }, { ...overrides?.icons }),
    embedIcons: Object.assign({ ...defaultUiAssetUrls.embedIcons }, { ...overrides?.embedIcons }),
    translations: Object.assign(
      { ...defaultUiAssetUrls.translations },
      { ...overrides?.translations }
    )
  };
}
export {
  defaultUiAssetUrls,
  setDefaultUiAssetUrls,
  useDefaultUiAssetUrlsWithOverrides
};
//# sourceMappingURL=assetUrls.mjs.map
