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
var Idle_exports = {};
__export(Idle_exports, {
  Idle: () => Idle
});
module.exports = __toCommonJS(Idle_exports);
var import_editor = require("@tldraw/editor");
var import_updateHoveredId = require("../../../tools/selection-logic/updateHoveredId");
class Idle extends import_editor.StateNode {
  static id = "idle";
  onPointerMove = (info) => {
    switch (info.target) {
      case "shape":
      case "canvas": {
        (0, import_updateHoveredId.updateHoveredId)(this.editor);
      }
    }
  };
  onPointerDown = (info) => {
    const { hoveredShape } = this.editor;
    const hitShape = hoveredShape && !this.editor.isShapeOfType(hoveredShape, "group") ? hoveredShape : this.editor.getShapeAtPoint(this.editor.inputs.currentPagePoint);
    if (hitShape) {
      if (this.editor.isShapeOfType(hitShape, "text")) {
        requestAnimationFrame(() => {
          this.editor.setSelectedShapes([hitShape.id]);
          this.editor.setEditingShape(hitShape.id);
          this.editor.setCurrentTool("select.editing_shape", {
            ...info,
            target: "shape",
            shape: hitShape
          });
        });
        return;
      }
    }
    this.parent.transition("pointing", info);
  };
  onEnter = () => {
    this.editor.setCursor({ type: "cross", rotation: 0 });
  };
  onKeyDown = (info) => {
    if (info.key === "Enter") {
      const { onlySelectedShape } = this.editor;
      if (onlySelectedShape && this.editor.getShapeUtil(onlySelectedShape).canEdit(onlySelectedShape)) {
        this.editor.setCurrentTool("select");
        this.editor.setEditingShape(onlySelectedShape.id);
        this.editor.root.current.value.transition("editing_shape", {
          ...info,
          target: "shape",
          shape: onlySelectedShape
        });
      }
    }
  };
  onCancel = () => {
    this.editor.setCurrentTool("select");
  };
}
//# sourceMappingURL=Idle.js.map
