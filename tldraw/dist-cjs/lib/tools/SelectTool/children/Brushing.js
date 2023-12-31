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
var Brushing_exports = {};
__export(Brushing_exports, {
  Brushing: () => Brushing
});
module.exports = __toCommonJS(Brushing_exports);
var import_editor = require("@tldraw/editor");
class Brushing extends import_editor.StateNode {
  static id = "brushing";
  info = {};
  brush = new import_editor.Box2d();
  initialSelectedShapeIds = [];
  excludedShapeIds = /* @__PURE__ */ new Set();
  // The shape that the brush started on
  initialStartShape = null;
  onEnter = (info) => {
    const { altKey, currentPagePoint } = this.editor.inputs;
    if (altKey) {
      this.parent.transition("scribble_brushing", info);
      return;
    }
    this.excludedShapeIds = new Set(
      this.editor.currentPageShapes.filter(
        (shape) => this.editor.isShapeOfType(shape, "group") || this.editor.isShapeOrAncestorLocked(shape)
      ).map((shape) => shape.id)
    );
    this.info = info;
    this.initialSelectedShapeIds = this.editor.selectedShapeIds.slice();
    this.initialStartShape = this.editor.getShapesAtPoint(currentPagePoint)[0];
    this.onPointerMove();
  };
  onExit = () => {
    this.initialSelectedShapeIds = [];
    this.editor.updateInstanceState({ brush: null });
  };
  onPointerMove = () => {
    this.hitTestShapes();
  };
  onPointerUp = () => {
    this.complete();
  };
  onComplete = () => {
    this.complete();
  };
  onCancel = (info) => {
    this.editor.setSelectedShapes(this.initialSelectedShapeIds, { squashing: true });
    this.parent.transition("idle", info);
  };
  onKeyDown = (info) => {
    if (this.editor.inputs.altKey) {
      this.parent.transition("scribble_brushing", info);
    } else {
      this.hitTestShapes();
    }
  };
  onKeyUp = () => {
    this.hitTestShapes();
  };
  complete() {
    this.parent.transition("idle", {});
  }
  hitTestShapes() {
    const {
      zoomLevel,
      currentPageId,
      currentPageShapes,
      inputs: { originPagePoint, currentPagePoint, shiftKey, ctrlKey }
    } = this.editor;
    this.brush.setTo(import_editor.Box2d.FromPoints([originPagePoint, currentPagePoint]));
    const results = new Set(shiftKey ? this.initialSelectedShapeIds : []);
    let A, B, shape, pageBounds, pageTransform, localCorners;
    const { corners } = this.brush;
    const { excludedShapeIds } = this;
    testAllShapes:
      for (let i = 0, n = currentPageShapes.length; i < n; i++) {
        shape = currentPageShapes[i];
        if (excludedShapeIds.has(shape.id))
          continue testAllShapes;
        if (results.has(shape.id))
          continue testAllShapes;
        pageBounds = this.editor.getShapePageBounds(shape);
        if (!pageBounds)
          continue testAllShapes;
        if (this.brush.contains(pageBounds)) {
          this.handleHit(shape, currentPagePoint, currentPageId, results, corners);
          continue testAllShapes;
        }
        if (ctrlKey || this.editor.isShapeOfType(shape, "frame")) {
          continue testAllShapes;
        }
        if (this.brush.collides(pageBounds)) {
          const geometry = this.editor.getShapeGeometry(shape);
          pageTransform = this.editor.getShapePageTransform(shape);
          if (!pageTransform) {
            continue testAllShapes;
          }
          localCorners = pageTransform.clone().invert().applyToPoints(corners);
          hitTestBrushEdges:
            for (let i2 = 0; i2 < localCorners.length; i2++) {
              A = localCorners[i2];
              B = localCorners[(i2 + 1) % localCorners.length];
              if (geometry.hitTestLineSegment(A, B, import_editor.HIT_TEST_MARGIN / zoomLevel)) {
                this.handleHit(shape, currentPagePoint, currentPageId, results, corners);
                break hitTestBrushEdges;
              }
            }
        }
      }
    this.editor.updateInstanceState({ brush: { ...this.brush.toJson() } });
    this.editor.setSelectedShapes(Array.from(results), { squashing: true });
  }
  onInterrupt = () => {
    this.editor.updateInstanceState({ brush: null });
  };
  handleHit(shape, currentPagePoint, currentPageId, results, corners) {
    if (shape.parentId === currentPageId) {
      results.add(shape.id);
      return;
    }
    const selectedShape = this.editor.getOutermostSelectableShape(shape);
    const pageMask = this.editor.getShapeMask(selectedShape.id);
    if (pageMask && !(0, import_editor.polygonsIntersect)(pageMask, corners) && !(0, import_editor.pointInPolygon)(currentPagePoint, pageMask)) {
      return;
    }
    results.add(selectedShape.id);
  }
}
//# sourceMappingURL=Brushing.js.map
