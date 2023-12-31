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
var Dragging_exports = {};
__export(Dragging_exports, {
  Dragging: () => Dragging
});
module.exports = __toCommonJS(Dragging_exports);
var import_editor = require("@tldraw/editor");
class Dragging extends import_editor.StateNode {
  static id = "dragging";
  onEnter = () => {
    this.update();
  };
  onPointerMove = () => {
    this.update();
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
  update() {
    const { currentScreenPoint, previousScreenPoint } = this.editor.inputs;
    const delta = import_editor.Vec2d.Sub(currentScreenPoint, previousScreenPoint);
    if (Math.abs(delta.x) > 0 || Math.abs(delta.y) > 0) {
      this.editor.pan(delta);
    }
  }
  complete() {
    this.editor.slideCamera({
      speed: Math.min(2, this.editor.inputs.pointerVelocity.len()),
      direction: this.editor.inputs.pointerVelocity,
      friction: import_editor.CAMERA_SLIDE_FRICTION
    });
    this.parent.transition("idle", {});
  }
}
//# sourceMappingURL=Dragging.js.map
