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
var useExportAs_exports = {};
__export(useExportAs_exports, {
  useExportAs: () => useExportAs
});
module.exports = __toCommonJS(useExportAs_exports);
var import_editor = require("@tldraw/editor");
var import_react = require("react");
var import_export = require("../../utils/export");
var import_useToastsProvider = require("./useToastsProvider");
var import_useTranslation = require("./useTranslation/useTranslation");
function useExportAs() {
  const editor = (0, import_editor.useEditor)();
  const { addToast } = (0, import_useToastsProvider.useToasts)();
  const msg = (0, import_useTranslation.useTranslation)();
  return (0, import_react.useCallback)(
    async function exportAs(ids = editor.selectedShapeIds, format = "png") {
      if (ids.length === 0) {
        ids = [...editor.currentPageShapeIds];
      }
      if (ids.length === 0) {
        return;
      }
      const svg = await editor.getSvg(ids, {
        scale: 1,
        background: editor.instanceState.exportBackground
      });
      if (!svg)
        throw new Error("Could not construct SVG.");
      let name = "shapes";
      if (ids.length === 1) {
        const first = editor.getShape(ids[0]);
        if (editor.isShapeOfType(first, "frame")) {
          name = first.props.name ?? "frame";
        } else {
          name = first.id.replace(/:/, "_");
        }
      }
      switch (format) {
        case "svg": {
          const dataURL = await (0, import_export.getSvgAsDataUrl)(svg);
          (0, import_export.downloadDataURLAsFile)(dataURL, `${name || "shapes"}.svg`);
          return;
        }
        case "webp":
        case "png": {
          const image = await (0, import_export.getSvgAsImage)(svg, {
            type: format,
            quality: 1,
            scale: 2
          });
          if (!image) {
            addToast({
              id: "export-fail",
              // icon: 'error',
              title: msg("toast.error.export-fail.title"),
              description: msg("toast.error.export-fail.desc")
            });
            return;
          }
          const dataURL = URL.createObjectURL(image);
          (0, import_export.downloadDataURLAsFile)(dataURL, `${name || "shapes"}.${format}`);
          URL.revokeObjectURL(dataURL);
          return;
        }
        case "json": {
          const data = editor.getContentFromCurrentPage(ids);
          const dataURL = URL.createObjectURL(
            new Blob([JSON.stringify(data, null, 4)], { type: "application/json" })
          );
          (0, import_export.downloadDataURLAsFile)(dataURL, `${name || "shapes"}.json`);
          URL.revokeObjectURL(dataURL);
          return;
        }
        default:
          throw new Error(`Export type ${format} not supported.`);
      }
    },
    [editor, addToast, msg]
  );
}
//# sourceMappingURL=useExportAs.js.map
