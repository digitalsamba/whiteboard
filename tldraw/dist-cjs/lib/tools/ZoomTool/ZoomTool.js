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
var ZoomTool_exports = {};
__export(ZoomTool_exports, {
  ZoomTool: () => ZoomTool
});
module.exports = __toCommonJS(ZoomTool_exports);
var import_editor = require("@tldraw/editor");
var import_Idle = require("./children/Idle");
var import_Pointing = require("./children/Pointing");
var import_ZoomBrushing = require("./children/ZoomBrushing");
class ZoomTool extends import_editor.StateNode {
  static id = "zoom";
  static initial = "idle";
  static children = () => [import_Idle.Idle, import_ZoomBrushing.ZoomBrushing, import_Pointing.Pointing];
  info = {};
  onEnter = (info) => {
    this.info = info;
    this.currentToolIdMask = info.onInteractionEnd;
    this.updateCursor();
  };
  onExit = () => {
    this.currentToolIdMask = void 0;
    this.editor.updateInstanceState(
      { zoomBrush: null, cursor: { type: "default", rotation: 0 } },
      { ephemeral: true }
    );
    this.currentToolIdMask = void 0;
  };
  onKeyDown = () => {
    this.updateCursor();
  };
  onKeyUp = (info) => {
    this.updateCursor();
    if (info.code === "KeyZ") {
      this.complete();
    }
  };
  onInterrupt = () => {
    this.complete();
  };
  complete() {
    if (this.info.onInteractionEnd && this.info.onInteractionEnd !== "select") {
      this.editor.setCurrentTool(this.info.onInteractionEnd, this.info);
    } else {
      this.parent.transition("select", {});
    }
  }
  updateCursor() {
    if (this.editor.inputs.altKey) {
      this.editor.updateInstanceState(
        { cursor: { type: "zoom-out", rotation: 0 } },
        { ephemeral: true }
      );
    } else {
      this.editor.updateInstanceState(
        { cursor: { type: "zoom-in", rotation: 0 } },
        { ephemeral: true }
      );
    }
  }
}
//# sourceMappingURL=ZoomTool.js.map
