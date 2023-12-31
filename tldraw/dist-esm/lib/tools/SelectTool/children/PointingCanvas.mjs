import { StateNode } from "@tldraw/editor";
import { selectOnCanvasPointerUp } from "../../selection-logic/selectOnCanvasPointerUp.mjs";
class PointingCanvas extends StateNode {
  static id = "pointing_canvas";
  onEnter = () => {
    const { inputs } = this.editor;
    if (!inputs.shiftKey) {
      if (this.editor.selectedShapeIds.length > 0) {
        this.editor.mark("selecting none");
        this.editor.selectNone();
      }
    }
  };
  onPointerMove = (info) => {
    if (this.editor.inputs.isDragging) {
      this.parent.transition("brushing", info);
    }
  };
  onPointerUp = () => {
    selectOnCanvasPointerUp(this.editor);
    this.complete();
  };
  onComplete = () => {
    this.complete();
  };
  onInterrupt = () => {
    this.parent.transition("idle", {});
  };
  complete() {
    this.parent.transition("idle", {});
  }
}
export {
  PointingCanvas
};
//# sourceMappingURL=PointingCanvas.mjs.map
