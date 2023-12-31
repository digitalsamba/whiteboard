"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var assetUrls_exports = {};
__export(assetUrls_exports, {
  defaultEditorAssetUrls: () => defaultEditorAssetUrls,
  setDefaultEditorAssetUrls: () => setDefaultEditorAssetUrls,
  useDefaultEditorAssetsWithOverrides: () => useDefaultEditorAssetsWithOverrides
});
module.exports = __toCommonJS(assetUrls_exports);
var import_react = require("react");
var import_version = require("../ui/version");
let defaultEditorAssetUrls = {
  fonts: {
    draw: `https://unpkg.com/@tldraw/assets@${import_version.version}/fonts/Shantell_Sans-Normal-SemiBold.woff2`,
    serif: `https://unpkg.com/@tldraw/assets@${import_version.version}/fonts/IBMPlexSerif-Medium.woff2`,
    sansSerif: `https://unpkg.com/@tldraw/assets@${import_version.version}/fonts/IBMPlexSans-Medium.woff2`,
    monospace: `https://unpkg.com/@tldraw/assets@${import_version.version}/fonts/IBMPlexMono-Medium.woff2`
  }
};
function setDefaultEditorAssetUrls(assetUrls) {
  defaultEditorAssetUrls = assetUrls;
}
function useDefaultEditorAssetsWithOverrides(overrides) {
  return (0, import_react.useMemo)(() => {
    if (!overrides)
      return defaultEditorAssetUrls;
    return {
      fonts: { ...defaultEditorAssetUrls.fonts, ...overrides?.fonts }
    };
  }, [overrides]);
}
//# sourceMappingURL=assetUrls.js.map
