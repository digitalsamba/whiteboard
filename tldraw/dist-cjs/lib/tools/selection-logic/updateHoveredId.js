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
var updateHoveredId_exports = {};
__export(updateHoveredId_exports, {
  updateHoveredId: () => updateHoveredId
});
module.exports = __toCommonJS(updateHoveredId_exports);
var import_editor = require("@tldraw/editor");
function updateHoveredId(editor) {
  const hitShape = editor.getShapeAtPoint(editor.inputs.currentPagePoint, {
    hitInside: false,
    hitLabels: false,
    margin: import_editor.HIT_TEST_MARGIN / editor.zoomLevel
  });
  if (!hitShape)
    return editor.setHoveredShape(null);
  let shapeToHover = void 0;
  const outermostShape = editor.getOutermostSelectableShape(hitShape);
  if (outermostShape === hitShape) {
    shapeToHover = hitShape;
  } else {
    if (outermostShape.id === editor.focusedGroupId || editor.selectedShapeIds.includes(outermostShape.id)) {
      shapeToHover = hitShape;
    } else {
      shapeToHover = outermostShape;
    }
  }
  return editor.setHoveredShape(shapeToHover.id);
}
//# sourceMappingURL=updateHoveredId.js.map
