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
var pasteUrl_exports = {};
__export(pasteUrl_exports, {
  pasteUrl: () => pasteUrl
});
module.exports = __toCommonJS(pasteUrl_exports);
var import_pasteFiles = require("./pasteFiles");
async function pasteUrl(editor, url, point, sources) {
  try {
    const resp = await fetch(url);
    if (resp.headers.get("content-type")?.match(/^image\//)) {
      editor.mark("paste");
      (0, import_pasteFiles.pasteFiles)(editor, [url]);
      return;
    }
  } catch (err) {
    if (err.message !== "Failed to fetch") {
      console.error(err);
    }
  }
  editor.mark("paste");
  return await editor.putExternalContent({
    type: "url",
    point,
    url,
    sources
  });
}
//# sourceMappingURL=pasteUrl.js.map
