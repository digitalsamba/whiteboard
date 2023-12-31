import { StateNode } from "@tldraw/editor";
import { CursorTypeMap } from "./PointingResizeHandle.mjs";
class PointingCropHandle extends StateNode {
  static id = "pointing_crop_handle";
  info = {};
  updateCursor(shape) {
    const cursorType = CursorTypeMap[this.info.handle];
    this.editor.updateInstanceState({
      cursor: {
        type: cursorType,
        rotation: shape.rotation
      }
    });
  }
  onEnter = (info) => {
    this.info = info;
    this.parent.currentToolIdMask = info.onInteractionEnd;
    const selectedShape = this.editor.selectedShapes[0];
    if (!selectedShape)
      return;
    this.updateCursor(selectedShape);
    this.editor.setCroppingShape(selectedShape.id);
  };
  onExit = () => {
    this.editor.updateInstanceState(
      { cursor: { type: "default", rotation: 0 } },
      { ephemeral: true }
    );
    this.parent.currentToolIdMask = void 0;
  };
  onPointerMove = () => {
    const isDragging = this.editor.inputs.isDragging;
    if (isDragging) {
      this.parent.transition("cropping", {
        ...this.info,
        onInteractionEnd: this.info.onInteractionEnd
      });
    }
  };
  onPointerUp = () => {
    if (this.info.onInteractionEnd) {
      this.editor.setCurrentTool(this.info.onInteractionEnd, this.info);
    } else {
      this.editor.setCroppingShape(null);
      this.parent.transition("idle", {});
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
    if (this.info.onInteractionEnd) {
      this.editor.setCurrentTool(this.info.onInteractionEnd, this.info);
    } else {
      this.editor.setCroppingShape(null);
      this.parent.transition("idle", {});
    }
  }
}
export {
  PointingCropHandle
};
//# sourceMappingURL=PointingCropHandle.mjs.map
