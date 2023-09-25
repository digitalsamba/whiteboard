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
var Pointing_exports = {};
__export(Pointing_exports, {
  Pointing: () => Pointing
});
module.exports = __toCommonJS(Pointing_exports);
var import_editor = require("@tldraw/editor");
class Pointing extends import_editor.StateNode {
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
//# sourceMappingURL=Pointing.js.map
