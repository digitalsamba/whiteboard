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
var useInsertMedia_exports = {};
__export(useInsertMedia_exports, {
  useInsertMedia: () => useInsertMedia
});
module.exports = __toCommonJS(useInsertMedia_exports);
var import_editor = require("@tldraw/editor");
var import_react = require("react");
function useInsertMedia() {
  const editor = (0, import_editor.useEditor)();
  const inputRef = (0, import_react.useRef)();
  (0, import_react.useEffect)(() => {
    const input = window.document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/gif,image/svg+xml,video/mp4,video/quicktime";
    input.multiple = true;
    inputRef.current = input;
    async function onchange(e) {
      const fileList = e.target.files;
      if (!fileList || fileList.length === 0)
        return;
      await editor.putExternalContent({
        type: "files",
        files: Array.from(fileList),
        point: editor.viewportPageBounds.center,
        ignoreParent: false
      });
      input.value = "";
    }
    input.addEventListener("change", onchange);
    return () => {
      inputRef.current = void 0;
      input.removeEventListener("change", onchange);
    };
  }, [editor]);
  return (0, import_react.useCallback)(() => {
    inputRef.current?.click();
  }, [inputRef]);
}
//# sourceMappingURL=useInsertMedia.js.map
