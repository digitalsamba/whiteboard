import { StateNode } from "@tldraw/editor";
class Pointing extends StateNode {
  static id = "pointing";
  onEnter = () => {
    this.editor.stopCameraAnimation();
    this.editor.updateInstanceState(
      { cursor: { type: "grabbing", rotation: 0 } },
      { ephemeral: true }
    );
  };
  onPointerMove = (info) => {
    if (this.editor.inputs.isDragging) {
      this.parent.transition("dragging", info);
    }
  };
  onPointerUp = () => {
    this.complete();
  };
  onCancel = () => {
    this.complete();
  };
  onComplete = () => {
    this.complete();
  };
  onInterrupt = () => {
    this.complete();
  };
  complete() {
    this.parent.transition("idle", {});
  }
}
export {
  Pointing
};
//# sourceMappingURL=Pointing.mjs.map
