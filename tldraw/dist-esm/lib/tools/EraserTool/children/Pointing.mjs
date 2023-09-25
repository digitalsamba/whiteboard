import {
  HIT_TEST_MARGIN,
  StateNode
} from "@tldraw/editor";
class Pointing extends StateNode {
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
        margin: HIT_TEST_MARGIN / zoomLevel
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
export {
  Pointing
};
//# sourceMappingURL=Pointing.mjs.map
