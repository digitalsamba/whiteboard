import {
  HIT_TEST_MARGIN,
  StateNode,
  pointInPolygon
} from "@tldraw/editor";
import { ScribbleManager } from "../../../shapes/shared/ScribbleManager.mjs";
class Erasing extends StateNode {
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
    this.scribble = new ScribbleManager({
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
      if (pageMask && !pointInPolygon(currentPagePoint, pageMask)) {
        continue;
      }
      const geometry = this.editor.getShapeGeometry(shape);
      const A = this.editor.getPointInShapeSpace(shape, previousPagePoint);
      const B = this.editor.getPointInShapeSpace(shape, currentPagePoint);
      if (geometry.hitTestLineSegment(A, B, HIT_TEST_MARGIN / zoomLevel)) {
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
export {
  Erasing
};
//# sourceMappingURL=Erasing.mjs.map
