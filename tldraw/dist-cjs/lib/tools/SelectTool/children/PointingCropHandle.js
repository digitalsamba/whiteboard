"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var PointingCropHandle_exports = {};
__export(PointingCropHandle_exports, {
  PointingCropHandle: () => PointingCropHandle
});
module.exports = __toCommonJS(PointingCropHandle_exports);
var import_editor = require("@tldraw/editor");
var import_PointingResizeHandle = require("./PointingResizeHandle");
class PointingCropHandle extends import_editor.StateNode {
  static id = "pointing_crop_handle";
  info = {};
  updateCursor(shape) {
    const cursorType = import_PointingResizeHandle.CursorTypeMap[this.info.handle];
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
//# sourceMappingURL=PointingCropHandle.js.map
