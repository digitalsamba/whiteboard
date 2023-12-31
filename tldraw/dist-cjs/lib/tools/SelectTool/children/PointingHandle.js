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
var PointingHandle_exports = {};
__export(PointingHandle_exports, {
  PointingHandle: () => PointingHandle
});
module.exports = __toCommonJS(PointingHandle_exports);
var import_editor = require("@tldraw/editor");
class PointingHandle extends import_editor.StateNode {
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
//# sourceMappingURL=PointingHandle.js.map
