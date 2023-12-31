import { useMemo } from "react";
import { version } from "../ui/version.mjs";
let defaultEditorAssetUrls = {
  fonts: {
    draw: `https://unpkg.com/@tldraw/assets@${version}/fonts/Shantell_Sans-Normal-SemiBold.woff2`,
    serif: `https://unpkg.com/@tldraw/assets@${version}/fonts/IBMPlexSerif-Medium.woff2`,
    sansSerif: `https://unpkg.com/@tldraw/assets@${version}/fonts/IBMPlexSans-Medium.woff2`,
    monospace: `https://unpkg.com/@tldraw/assets@${version}/fonts/IBMPlexMono-Medium.woff2`
  }
};
function setDefaultEditorAssetUrls(assetUrls) {
  defaultEditorAssetUrls = assetUrls;
}
function useDefaultEditorAssetsWithOverrides(overrides) {
  return useMemo(() => {
    if (!overrides)
      return defaultEditorAssetUrls;
    return {
      fonts: { ...defaultEditorAssetUrls.fonts, ...overrides?.fonts }
    };
  }, [overrides]);
}
export {
  defaultEditorAssetUrls,
  setDefaultEditorAssetUrls,
  useDefaultEditorAssetsWithOverrides
};
//# sourceMappingURL=assetUrls.mjs.map
