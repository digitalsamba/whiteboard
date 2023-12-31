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
  dragged = false;
  info = {};
  wasFocusedOnEnter = false;
  markId = "";
  shape = {};
  onEnter = () => {
    this.wasFocusedOnEnter = !this.editor.isMenuOpen;
    if (this.wasFocusedOnEnter) {
      this.shape = this.createShape();
    }
  };
  onPointerMove = (info) => {
    if (this.editor.inputs.isDragging) {
      if (!this.wasFocusedOnEnter) {
        this.shape = this.createShape();
      }
      this.editor.setCurrentTool("select.translating", {
        ...info,
        target: "shape",
        shape: this.shape,
        isCreating: true,
        editAfterComplete: true,
        onInteractionEnd: "note"
      });
    }
  };
  onPointerUp = () => {
    this.complete();
  };
  onInterrupt = () => {
    this.cancel();
  };
  onComplete = () => {
    this.complete();
  };
  onCancel = () => {
    this.cancel();
  };
  complete() {
    if (this.wasFocusedOnEnter) {
      if (this.editor.instanceState.isToolLocked) {
        this.parent.transition("idle", {});
      } else {
        this.editor.setEditingShape(this.shape.id);
        this.editor.setCurrentTool("select.editing_shape", {
          ...this.info,
          target: "shape",
          shape: this.shape
        });
      }
    }
  }
  cancel() {
    this.editor.bailToMark(this.markId);
    this.parent.transition("idle", this.info);
  }
  createShape() {
    const {
      inputs: { originPagePoint }
    } = this.editor;
    const id = (0, import_editor.createShapeId)();
    this.markId = `creating:${id}`;
    this.editor.mark(this.markId);
    this.editor.createShapes([
      {
        id,
        type: "note",
        x: originPagePoint.x,
        y: originPagePoint.y
      }
    ]).select(id);
    const shape = this.editor.getShape(id);
    const bounds = this.editor.getShapeGeometry(shape).bounds;
    this.editor.updateShapes([
      {
        id,
        type: "note",
        x: shape.x - bounds.width / 2,
        y: shape.y - bounds.height / 2
      }
    ]);
    return this.editor.getShape(id);
  }
}
//# sourceMappingURL=Pointing.js.map
