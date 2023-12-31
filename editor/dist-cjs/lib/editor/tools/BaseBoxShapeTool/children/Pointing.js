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
var import_tlschema = require("@tldraw/tlschema");
var import_Vec2d = require("../../../../primitives/Vec2d");
var import_StateNode = require("../../StateNode");
class Pointing extends import_StateNode.StateNode {
  static id = "pointing";
  markId = "";
  wasFocusedOnEnter = false;
  onEnter = () => {
    const { isMenuOpen } = this.editor;
    this.wasFocusedOnEnter = !isMenuOpen;
  };
  onPointerMove = (info) => {
    if (this.editor.inputs.isDragging) {
      const { originPagePoint } = this.editor.inputs;
      const shapeType = this.parent.shapeType;
      const id = (0, import_tlschema.createShapeId)();
      this.markId = `creating:${id}`;
      this.editor.mark(this.markId);
      this.editor.createShapes([
        {
          id,
          type: shapeType,
          x: originPagePoint.x,
          y: originPagePoint.y,
          props: {
            w: 1,
            h: 1
          }
        }
      ]).select(id);
      this.editor.setCurrentTool("select.resizing", {
        ...info,
        target: "selection",
        handle: "bottom_right",
        isCreating: true,
        creationCursorOffset: { x: 1, y: 1 },
        onInteractionEnd: this.parent.id
      });
    }
  };
  onPointerUp = () => {
    this.complete();
  };
  onCancel = () => {
    this.cancel();
  };
  onComplete = () => {
    this.complete();
  };
  onInterrupt = () => {
    this.cancel();
  };
  complete() {
    const { originPagePoint } = this.editor.inputs;
    if (!this.wasFocusedOnEnter) {
      return;
    }
    this.editor.mark(this.markId);
    const shapeType = this.parent.shapeType;
    const id = (0, import_tlschema.createShapeId)();
    this.editor.mark(this.markId);
    this.editor.createShapes([
      {
        id,
        type: shapeType,
        x: originPagePoint.x,
        y: originPagePoint.y
      }
    ]);
    const shape = this.editor.getShape(id);
    const { w, h } = this.editor.getShapeUtil(shape).getDefaultProps();
    const delta = new import_Vec2d.Vec2d(w / 2, h / 2);
    const parentTransform = this.editor.getShapeParentTransform(shape);
    if (parentTransform)
      delta.rot(-parentTransform.rotation());
    this.editor.updateShapes([
      {
        id,
        type: shapeType,
        x: shape.x - delta.x,
        y: shape.y - delta.y
      }
    ]);
    this.editor.setSelectedShapes([id]);
    if (this.editor.instanceState.isToolLocked) {
      this.parent.transition("idle", {});
    } else {
      this.editor.setCurrentTool("select.idle");
    }
  }
  cancel() {
    this.parent.transition("idle", {});
  }
}
//# sourceMappingURL=Pointing.js.map
