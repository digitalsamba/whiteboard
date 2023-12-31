import {
  StateNode
} from "@tldraw/editor";
const CursorTypeMap = {
  bottom: "ns-resize",
  top: "ns-resize",
  left: "ew-resize",
  right: "ew-resize",
  bottom_left: "nesw-resize",
  bottom_right: "nwse-resize",
  top_left: "nwse-resize",
  top_right: "nesw-resize",
  bottom_left_rotate: "swne-rotate",
  bottom_right_rotate: "senw-rotate",
  top_left_rotate: "nwse-rotate",
  top_right_rotate: "nesw-rotate",
  mobile_rotate: "grabbing"
};
class PointingResizeHandle extends StateNode {
  static id = "pointing_resize_handle";
  info = {};
  updateCursor() {
    const selected = this.editor.selectedShapes;
    const cursorType = CursorTypeMap[this.info.handle];
    this.editor.updateInstanceState({
      cursor: { type: cursorType, rotation: selected.length === 1 ? selected[0].rotation : 0 }
    });
  }
  onEnter = (info) => {
    this.info = info;
    this.updateCursor();
  };
  onPointerMove = () => {
    const isDragging = this.editor.inputs.isDragging;
    if (isDragging) {
      this.parent.transition("resizing", this.info);
    }
  };
  onPointerUp = () => {
    this.complete();
  };
  // override onPinchStart: TLEventHandlers['onPinchStart'] = (info) => {
  // 	this.parent.transition('pinching', info)
  // }
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
  CursorTypeMap,
  PointingResizeHandle
};
//# sourceMappingURL=PointingResizeHandle.mjs.map
