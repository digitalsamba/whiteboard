import { StateNode } from "@tldraw/editor";
class Pointing extends StateNode {
  static id = "pointing";
  info = {};
  onEnter = (info) => {
    this.info = info;
  };
  onPointerUp = () => {
    this.complete();
  };
  onPointerMove = () => {
    if (this.editor.inputs.isDragging) {
      this.parent.transition("zoom_brushing", this.info);
    }
  };
  onCancel = () => {
    this.cancel();
  };
  complete() {
    const { currentScreenPoint } = this.editor.inputs;
    if (this.editor.inputs.altKey) {
      this.editor.zoomOut(currentScreenPoint, { duration: 220 });
    } else {
      this.editor.zoomIn(currentScreenPoint, { duration: 220 });
    }
    this.parent.transition("idle", this.info);
  }
  cancel() {
    this.parent.transition("idle", this.info);
  }
}
export {
  Pointing
};
//# sourceMappingURL=Pointing.mjs.map
