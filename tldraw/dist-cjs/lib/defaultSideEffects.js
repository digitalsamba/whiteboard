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
var defaultSideEffects_exports = {};
__export(defaultSideEffects_exports, {
  registerDefaultSideEffects: () => registerDefaultSideEffects
});
module.exports = __toCommonJS(defaultSideEffects_exports);
function registerDefaultSideEffects(editor) {
  return editor.sideEffects.registerAfterChangeHandler("instance_page_state", (prev, next) => {
    if (prev.croppingShapeId !== next.croppingShapeId) {
      const isInCroppingState = editor.isInAny(
        "select.crop",
        "select.pointing_crop_handle",
        "select.cropping"
      );
      if (!prev.croppingShapeId && next.croppingShapeId) {
        if (!isInCroppingState) {
          editor.setCurrentTool("select.crop.idle");
        }
      } else if (prev.croppingShapeId && !next.croppingShapeId) {
        if (isInCroppingState) {
          editor.setCurrentTool("select.idle");
        }
      }
    }
    if (prev.editingShapeId !== next.editingShapeId) {
      if (!prev.editingShapeId && next.editingShapeId) {
        if (!editor.isIn("select.editing_shape")) {
          editor.setCurrentTool("select.editing_shape");
        }
      } else if (prev.editingShapeId && !next.editingShapeId) {
        if (editor.isIn("select.editing_shape")) {
          editor.setCurrentTool("select.idle");
        }
      }
    }
  });
}
//# sourceMappingURL=defaultSideEffects.js.map
