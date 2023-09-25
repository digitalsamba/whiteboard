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
var Erasing_exports = {};
__export(Erasing_exports, {
  Erasing: () => Erasing
});
module.exports = __toCommonJS(Erasing_exports);
var import_editor = require("@tldraw/editor");
var import_ScribbleManager = require("../../../shapes/shared/ScribbleManager");
class Erasing extends import_editor.StateNode {
  static id = "erasing";
  info = {};
  scribble = {};
  markId = "";
  excludedShapeIds = /* @__PURE__ */ new Set();
  onEnter = (info) => {
    this.markId = "erase scribble begin";
    this.editor.mark(this.markId);
    this.info = info;
    const { originPagePoint } = this.editor.inputs;
    this.excludedShapeIds = new Set(
      this.editor.currentPageShapes.filter((shape) => {
        if (this.editor.isShapeOrAncestorLocked(shape) || this.editor.isShapeOfType(shape, "group") || this.editor.isShapeOfType(shape, "frame")) {
          const pointInShapeShape = this.editor.getPointInShapeSpace(shape, originPagePoint);
          const geometry = this.editor.getShapeGeometry(shape);
          return geometry.bounds.containsPoint(pointInShapeShape);
        }
        return false;
      }).map((shape) => shape.id)
    );
    this.startScribble();
    this.update();
  };
  startScribble = () => {
    if (this.scribble.tick) {
      this.editor.off("tick", this.scribble?.tick);
    }
    this.scribble = new import_ScribbleManager.ScribbleManager({
      onUpdate: this.onScribbleUpdate,
      onComplete: this.onScribbleComplete,
      color: "muted-1",
      size: 12
    });
    this.editor.on("tick", this.scribble.tick);
  };
  pushPointToScribble = () => {
    const { x, y } = this.editor.inputs.currentPagePoint;
    this.scribble.addPoint(x, y);
  };
  onScribbleUpdate = (scribble) => {
    this.editor.updateInstanceState({ scribble });
  };
  onScribbleComplete = () => {
    this.editor.off("tick", this.scribble.tick);
    this.editor.updateInstanceState({ scribble: null });
  };
  onExit = () => {
    this.scribble.stop();
  };
  onPointerMove = () => {
    this.update();
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
  update() {
    const {
      zoomLevel,
      currentPageShapes,
      erasingShapeIds,
      inputs: { currentPagePoint, previousPagePoint }
    } = this.editor;
    const { excludedShapeIds } = this;
    this.pushPointToScribble();
    const erasing = new Set(erasingShapeIds);
    for (const shape of currentPageShapes) {
      if (this.editor.isShapeOfType(shape, "group"))
        continue;
      const pageMask = this.editor.getShapeMask(shape.id);
      if (pageMask && !(0, import_editor.pointInPolygon)(currentPagePoint, pageMask)) {
        continue;
      }
      const geometry = this.editor.getShapeGeometry(shape);
      const A = this.editor.getPointInShapeSpace(shape, previousPagePoint);
      const B = this.editor.getPointInShapeSpace(shape, currentPagePoint);
      if (geometry.hitTestLineSegment(A, B, import_editor.HIT_TEST_MARGIN / zoomLevel)) {
        erasing.add(this.editor.getOutermostSelectableShape(shape).id);
      }
    }
    this.editor.setErasingShapes([...erasing].filter((id) => !excludedShapeIds.has(id)));
  }
  complete() {
    this.editor.deleteShapes(this.editor.currentPageState.erasingShapeIds);
    this.editor.setErasingShapes([]);
    this.parent.transition("idle", {});
  }
  cancel() {
    this.editor.setErasingShapes([]);
    this.editor.bailToMark(this.markId);
    this.parent.transition("idle", this.info);
  }
}
//# sourceMappingURL=Erasing.js.map
