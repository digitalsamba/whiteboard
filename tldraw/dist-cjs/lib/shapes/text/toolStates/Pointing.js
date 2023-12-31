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
  shape;
  markId = "";
  onExit = () => {
    this.editor.setHintingShapes([]);
  };
  onPointerMove = (info) => {
    if (this.editor.inputs.isDragging) {
      const {
        inputs: { originPagePoint }
      } = this.editor;
      const id = (0, import_editor.createShapeId)();
      this.markId = `creating:${id}`;
      this.editor.mark(this.markId);
      this.editor.createShapes([
        {
          id,
          type: "text",
          x: originPagePoint.x,
          y: originPagePoint.y,
          props: {
            text: "",
            autoSize: false,
            w: 20
          }
        }
      ]);
      this.editor.select(id);
      this.shape = this.editor.getShape(id);
      if (!this.shape)
        return;
      this.editor.setCurrentTool("select.resizing", {
        ...info,
        target: "selection",
        handle: "right",
        isCreating: true,
        creationCursorOffset: { x: 1, y: 1 },
        editAfterComplete: true,
        onInteractionEnd: "text"
      });
    }
  };
  onPointerUp = () => {
    this.complete();
  };
  onComplete = () => {
    this.cancel();
  };
  onCancel = () => {
    this.cancel();
  };
  onInterrupt = () => {
    this.cancel();
  };
  complete() {
    this.editor.mark("creating text shape");
    const id = (0, import_editor.createShapeId)();
    const { x, y } = this.editor.inputs.currentPagePoint;
    this.editor.createShapes([
      {
        id,
        type: "text",
        x,
        y,
        props: {
          text: "",
          autoSize: true
        }
      }
    ]).select(id);
    this.editor.setEditingShape(id);
    this.editor.setCurrentTool("select");
    this.editor.root.current.value?.transition("editing_shape", {});
  }
  cancel() {
    this.parent.transition("idle", {});
    this.editor.bailToMark(this.markId);
  }
}
//# sourceMappingURL=Pointing.js.map
