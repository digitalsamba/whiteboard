import { StateNode } from "@tldraw/editor";
class PointingHandle extends StateNode {
  static id = "pointing_handle";
  info = {};
  onEnter = (info) => {
    this.info = info;
    const initialTerminal = info.shape.props[info.handle.id];
    if (initialTerminal?.type === "binding") {
      this.editor.setHintingShapes([initialTerminal.boundShapeId]);
    }
    this.editor.updateInstanceState(
      { cursor: { type: "grabbing", rotation: 0 } },
      { ephemeral: true }
    );
  };
  onExit = () => {
    this.editor.setHintingShapes([]);
    this.editor.updateInstanceState(
      { cursor: { type: "default", rotation: 0 } },
      { ephemeral: true }
    );
  };
  onPointerUp = () => {
    this.parent.transition("idle", this.info);
  };
  onPointerMove = () => {
    if (this.editor.inputs.isDragging) {
      this.parent.transition("dragging_handle", this.info);
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
  PointingHandle
};
//# sourceMappingURL=PointingHandle.mjs.map
