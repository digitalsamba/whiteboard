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
var selectOnCanvasPointerUp_exports = {};
__export(selectOnCanvasPointerUp_exports, {
  selectOnCanvasPointerUp: () => selectOnCanvasPointerUp
});
module.exports = __toCommonJS(selectOnCanvasPointerUp_exports);
var import_editor = require("@tldraw/editor");
function selectOnCanvasPointerUp(editor) {
  const { selectedShapeIds } = editor;
  const { shiftKey, altKey, currentPagePoint } = editor.inputs;
  const hitShape = editor.getShapeAtPoint(currentPagePoint, {
    hitInside: false,
    margin: import_editor.HIT_TEST_MARGIN / editor.zoomLevel,
    hitLabels: true
  });
  if (hitShape) {
    const outermostSelectableShape = editor.getOutermostSelectableShape(hitShape);
    if (shiftKey && !altKey) {
      editor.cancelDoubleClick();
      if (selectedShapeIds.includes(outermostSelectableShape.id)) {
        editor.mark("deselecting shape");
        editor.deselect(outermostSelectableShape);
      } else {
        editor.mark("shift selecting shape");
        editor.setSelectedShapes([...selectedShapeIds, outermostSelectableShape.id]);
      }
    } else {
      let shapeToSelect = void 0;
      if (outermostSelectableShape === hitShape) {
        shapeToSelect = hitShape;
      } else {
        if (outermostSelectableShape.id === editor.focusedGroupId || selectedShapeIds.includes(outermostSelectableShape.id)) {
          shapeToSelect = hitShape;
        } else {
          shapeToSelect = outermostSelectableShape;
        }
      }
      if (shapeToSelect && !selectedShapeIds.includes(shapeToSelect.id)) {
        editor.mark("selecting shape");
        editor.select(shapeToSelect.id);
      }
    }
  } else {
    if (shiftKey) {
      return;
    } else {
      if (selectedShapeIds.length > 0) {
        editor.mark("selecting none");
        editor.selectNone();
      }
      const { focusedGroupId } = editor;
      if ((0, import_editor.isShapeId)(focusedGroupId)) {
        const groupShape = editor.getShape(focusedGroupId);
        if (!editor.isPointInShape(groupShape, currentPagePoint, { margin: 0, hitInside: true })) {
          editor.setFocusedGroup(null);
        }
      }
    }
  }
}
//# sourceMappingURL=selectOnCanvasPointerUp.js.map
