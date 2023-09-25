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
var useForceSolid_exports = {};
__export(useForceSolid_exports, {
  useForceSolid: () => useForceSolid
});
module.exports = __toCommonJS(useForceSolid_exports);
var import_editor = require("@tldraw/editor");
function useForceSolid() {
  const editor = (0, import_editor.useEditor)();
  return (0, import_editor.useValue)("zoom", () => editor.zoomLevel < 0.35, [editor]);
}
//# sourceMappingURL=useForceSolid.js.map
