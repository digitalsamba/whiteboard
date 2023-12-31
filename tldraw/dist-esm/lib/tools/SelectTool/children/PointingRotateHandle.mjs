import { StateNode } from "@tldraw/editor";
import { CursorTypeMap } from "./PointingResizeHandle.mjs";
class PointingRotateHandle extends StateNode {
  static id = "pointing_rotate_handle";
  info = {};
  updateCursor() {
    const { selectionRotation } = this.editor;
    this.editor.updateInstanceState({
      cursor: {
        type: CursorTypeMap[this.info.handle],
        rotation: selectionRotation
      }
    });
  }
  onEnter = (info) => {
    this.parent.currentToolIdMask = info.onInteractionEnd;
    this.info = info;
    this.updateCursor();
  };
  onExit = () => {
    this.parent.currentToolIdMask = void 0;
    this.editor.updateInstanceState(
      { cursor: { type: "default", rotation: 0 } },
      { ephemeral: true }
    );
  };
  onPointerMove = () => {
    const { isDragging } = this.editor.inputs;
    if (isDragging) {
      this.parent.transition("rotating", this.info);
    }
  };
  onPointerUp = () => {
    this.complete();
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
  complete() {
    if (this.info.onInteractionEnd) {
      this.editor.setCurrentTool(this.info.onInteractionEnd, {});
    } else {
      this.parent.transition("idle", {});
    }
  }
  cancel() {
    if (this.info.onInteractionEnd) {
      this.editor.setCurrentTool(this.info.onInteractionEnd, {});
    } else {
      this.parent.transition("idle", {});
    }
  }
}
export {
  PointingRotateHandle
};
//# sourceMappingURL=PointingRotateHandle.mjs.map
