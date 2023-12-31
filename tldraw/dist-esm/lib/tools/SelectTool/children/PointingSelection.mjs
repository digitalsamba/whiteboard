import {
  StateNode
} from "@tldraw/editor";
import { selectOnCanvasPointerUp } from "../../selection-logic/selectOnCanvasPointerUp.mjs";
class PointingSelection extends StateNode {
  static id = "pointing_selection";
  info = {};
  onEnter = (info) => {
    this.info = info;
  };
  onPointerUp = (info) => {
    selectOnCanvasPointerUp(this.editor);
    this.parent.transition("idle", info);
  };
  onPointerMove = (info) => {
    if (this.editor.inputs.isDragging) {
      if (this.editor.instanceState.isReadonly)
        return;
      this.parent.transition("translating", info);
    }
  };
  onDoubleClick = (info) => {
    const { hoveredShape } = this.editor;
    const hitShape = hoveredShape && !this.editor.isShapeOfType(hoveredShape, "group") ? hoveredShape : this.editor.getShapeAtPoint(this.editor.inputs.currentPagePoint, {
      hitInside: true,
      margin: 0
    });
    if (hitShape) {
      this.parent.transition("idle", {});
      this.parent.onDoubleClick?.({
        ...info,
        target: "shape",
        shape: this.editor.getShape(hitShape)
      });
      return;
    }
  };
  onCancel = () => {
    this.cancel();
  };
  onComplete = () => {
    this.cancel();
  };
  onInterrupt = () => {
    this.cancel();
  };
  cancel() {
    this.parent.transition("idle", {});
  }
}
export {
  PointingSelection
};
//# sourceMappingURL=PointingSelection.mjs.map
