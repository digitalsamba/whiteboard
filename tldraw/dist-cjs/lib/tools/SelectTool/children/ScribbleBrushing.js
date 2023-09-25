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
var ScribbleBrushing_exports = {};
__export(ScribbleBrushing_exports, {
  ScribbleBrushing: () => ScribbleBrushing
});
module.exports = __toCommonJS(ScribbleBrushing_exports);
var import_editor = require("@tldraw/editor");
var import_ScribbleManager = require("../../../shapes/shared/ScribbleManager");
class ScribbleBrushing extends import_editor.StateNode {
  static id = "scribble_brushing";
  hits = /* @__PURE__ */ new Set();
  size = 0;
  scribble = {};
  initialSelectedShapeIds = /* @__PURE__ */ new Set();
  newlySelectedShapeIds = /* @__PURE__ */ new Set();
  onEnter = () => {
    this.initialSelectedShapeIds = new Set(
      this.editor.inputs.shiftKey ? this.editor.selectedShapeIds : []
    );
    this.newlySelectedShapeIds = /* @__PURE__ */ new Set();
    this.size = 0;
    this.hits.clear();
    this.startScribble();
    this.updateScribbleSelection(true);
    requestAnimationFrame(() => {
      this.editor.updateInstanceState({ brush: null });
    });
  };
  onExit = () => {
    this.scribble.stop();
  };
  onPointerMove = () => {
    this.updateScribbleSelection(true);
  };
  onPointerUp = () => {
    this.complete();
  };
  onKeyDown = () => {
    this.updateScribbleSelection(false);
  };
  onKeyUp = () => {
    if (!this.editor.inputs.altKey) {
      this.parent.transition("brushing", {});
    } else {
      this.updateScribbleSelection(false);
    }
  };
  onCancel = () => {
    this.cancel();
  };
  onComplete = () => {
    this.complete();
  };
  startScribble = () => {
    if (this.scribble.tick) {
      this.editor.off("tick", this.scribble?.tick);
    }
    this.scribble = new import_ScribbleManager.ScribbleManager({
      onUpdate: this.onScribbleUpdate,
      onComplete: this.onScribbleComplete,
      color: "selection-stroke",
      opacity: 0.32,
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
  updateScribbleSelection(addPoint) {
    const {
      zoomLevel,
      currentPageShapes,
      inputs: { shiftKey, originPagePoint, previousPagePoint, currentPagePoint }
    } = this.editor;
    const { newlySelectedShapeIds, initialSelectedShapeIds } = this;
    if (addPoint) {
      this.pushPointToScribble();
    }
    const shapes = currentPageShapes;
    let shape, geometry, A, B;
    for (let i = 0, n = shapes.length; i < n; i++) {
      shape = shapes[i];
      geometry = this.editor.getShapeGeometry(shape);
      if (this.editor.isShapeOfType(shape, "group") || newlySelectedShapeIds.has(shape.id) || this.editor.isShapeOfType(shape, "frame") && geometry.hitTestPoint(
        this.editor.getPointInShapeSpace(shape, originPagePoint),
        0,
        false
      ) || this.editor.isShapeOrAncestorLocked(shape)) {
        continue;
      }
      A = this.editor.getPointInShapeSpace(shape, previousPagePoint);
      B = this.editor.getPointInShapeSpace(shape, currentPagePoint);
      if (geometry.hitTestLineSegment(A, B, import_editor.HIT_TEST_MARGIN / zoomLevel)) {
        const outermostShape = this.editor.getOutermostSelectableShape(shape);
        const pageMask = this.editor.getShapeMask(outermostShape.id);
        if (pageMask) {
          const intersection = (0, import_editor.intersectLineSegmentPolyline)(
            previousPagePoint,
            currentPagePoint,
            pageMask
          );
          if (intersection !== null) {
            const isInMask = (0, import_editor.pointInPolygon)(currentPagePoint, pageMask);
            if (!isInMask)
              continue;
          }
        }
        newlySelectedShapeIds.add(outermostShape.id);
      }
    }
    this.editor.setSelectedShapes(
      [
        ...new Set(
          shiftKey ? [...newlySelectedShapeIds, ...initialSelectedShapeIds] : [...newlySelectedShapeIds]
        )
      ],
      { squashing: true }
    );
  }
  complete() {
    this.parent.transition("idle", {});
  }
  cancel() {
    this.editor.setSelectedShapes([...this.initialSelectedShapeIds], { squashing: true });
    this.parent.transition("idle", {});
  }
}
//# sourceMappingURL=ScribbleBrushing.js.map
