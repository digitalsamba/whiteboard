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
var Pointing_exports = {};
__export(Pointing_exports, {
  Pointing: () => Pointing
});
module.exports = __toCommonJS(Pointing_exports);
var import_editor = require("@tldraw/editor");
class Pointing extends import_editor.StateNode {
  static id = "pointing";
  onEnter = () => {
    const {
      inputs: { currentPagePoint },
      currentPageShapesSorted: sortedShapesOnCurrentPage,
      zoomLevel
    } = this.editor;
    const erasing = /* @__PURE__ */ new Set();
    const initialSize = erasing.size;
    for (let n = sortedShapesOnCurrentPage.length, i = n - 1; i >= 0; i--) {
      const shape = sortedShapesOnCurrentPage[i];
      if (this.editor.isShapeOfType(shape, "group")) {
        continue;
      }
      if (this.editor.isPointInShape(shape, currentPagePoint, {
        hitInside: false,
        margin: import_editor.HIT_TEST_MARGIN / zoomLevel
      })) {
        const hitShape = this.editor.getOutermostSelectableShape(shape);
        if (this.editor.isShapeOfType(hitShape, "frame") && erasing.size > initialSize) {
          break;
        }
        erasing.add(hitShape.id);
      }
    }
    this.editor.setErasingShapes([...erasing]);
  };
  onPointerMove = (info) => {
    if (this.editor.inputs.isDragging) {
      this.parent.transition("erasing", info);
    }
  };
  onPointerUp = () => {
    this.complete();
  };
  onCancel = () => {
    this.cancel();
  };
  onComplete = () => {
    this.complete();
  };
  onInterrupt = () => {
    this.cancel();
  };
  complete() {
    const { erasingShapeIds } = this.editor;
    if (erasingShapeIds.length) {
      this.editor.mark("erase end");
      this.editor.deleteShapes(erasingShapeIds);
    }
    this.editor.setErasingShapes([]);
    this.parent.transition("idle", {});
  }
  cancel() {
    this.editor.setErasingShapes([]);
    this.parent.transition("idle", {});
  }
}
//# sourceMappingURL=Pointing.js.map
