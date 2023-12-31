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
var EditingShape_exports = {};
__export(EditingShape_exports, {
  EditingShape: () => EditingShape
});
module.exports = __toCommonJS(EditingShape_exports);
var import_editor = require("@tldraw/editor");
var import_getHitShapeOnCanvasPointerDown = require("../../selection-logic/getHitShapeOnCanvasPointerDown");
var import_updateHoveredId = require("../../selection-logic/updateHoveredId");
class EditingShape extends import_editor.StateNode {
  static id = "editing_shape";
  onEnter = () => {
    const { editingShape } = this.editor;
    if (!editingShape)
      throw Error("Entered editing state without an editing shape");
    (0, import_updateHoveredId.updateHoveredId)(this.editor);
    this.editor.select(editingShape);
  };
  onExit = () => {
    const { editingShapeId } = this.editor.currentPageState;
    if (!editingShapeId)
      return;
    this.editor.setEditingShape(null);
    const shape = this.editor.getShape(editingShapeId);
    const util = this.editor.getShapeUtil(shape);
    util.onEditEnd?.(shape);
  };
  onPointerMove = (info) => {
    switch (info.target) {
      case "shape":
      case "canvas": {
        (0, import_updateHoveredId.updateHoveredId)(this.editor);
        return;
      }
    }
  };
  onPointerDown = (info) => {
    switch (info.target) {
      case "canvas": {
        const hitShape = (0, import_getHitShapeOnCanvasPointerDown.getHitShapeOnCanvasPointerDown)(this.editor);
        if (hitShape) {
          this.onPointerDown({
            ...info,
            shape: hitShape,
            target: "shape"
          });
          return;
        }
        break;
      }
      case "shape": {
        const { shape } = info;
        const { editingShape } = this.editor;
        if (!editingShape) {
          throw Error("Expected an editing shape!");
        }
        if (shape.type === editingShape.type) {
          if (this.editor.isShapeOfType(shape, "geo") || this.editor.isShapeOfType(shape, "arrow")) {
            const geometry = this.editor.getShapeUtil(shape).getGeometry(shape);
            const labelGeometry = geometry.children[1];
            if (labelGeometry) {
              const pointInShapeSpace = this.editor.getPointInShapeSpace(
                shape,
                this.editor.inputs.currentPagePoint
              );
              if (labelGeometry.bounds.containsPoint(pointInShapeSpace)) {
                if (shape.id === editingShape.id) {
                  return;
                } else {
                  this.editor.setEditingShape(shape);
                  this.editor.select(shape);
                  return;
                }
              }
            }
          } else {
            if (shape.id === editingShape.id) {
            } else {
              this.editor.setEditingShape(shape);
              this.editor.select(shape);
            }
            return;
          }
        } else {
        }
        break;
      }
    }
    this.parent.transition("idle", info);
    this.editor.root.handleEvent(info);
  };
  onComplete = (info) => {
    this.parent.transition("idle", info);
  };
  onCancel = (info) => {
    this.parent.transition("idle", info);
  };
}
//# sourceMappingURL=EditingShape.js.map
