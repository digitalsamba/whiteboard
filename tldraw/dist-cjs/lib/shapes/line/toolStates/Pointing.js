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
  shape = {};
  markId;
  onEnter = (info) => {
    const { inputs } = this.editor;
    const { currentPagePoint } = inputs;
    this.markId = void 0;
    const shape = info.shapeId && this.editor.getShape(info.shapeId);
    if (shape && inputs.shiftKey) {
      this.markId = `creating:${shape.id}`;
      this.editor.mark(this.markId);
      this.shape = shape;
      const handles = this.editor.getShapeHandles(this.shape);
      if (!handles)
        return;
      const vertexHandles = handles.filter((h) => h.type === "vertex").sort(import_editor.sortByIndex);
      const endHandle = vertexHandles[vertexHandles.length - 1];
      const shapePagePoint = import_editor.Matrix2d.applyToPoint(
        this.editor.getShapeParentTransform(this.shape),
        new import_editor.Vec2d(this.shape.x, this.shape.y)
      );
      let nextEndHandleIndex, nextEndHandleId, nextEndHandle;
      if (vertexHandles.length === 2 && vertexHandles[1].x === 1 && vertexHandles[1].y === 1) {
        nextEndHandleIndex = vertexHandles[1].index;
        nextEndHandleId = vertexHandles[1].id;
        nextEndHandle = {
          ...vertexHandles[1],
          x: currentPagePoint.x - shapePagePoint.x,
          y: currentPagePoint.y - shapePagePoint.y
        };
      } else {
        nextEndHandleIndex = (0, import_editor.getIndexAbove)(endHandle.index);
        nextEndHandleId = "handle:" + nextEndHandleIndex;
        nextEndHandle = {
          x: currentPagePoint.x - shapePagePoint.x,
          y: currentPagePoint.y - shapePagePoint.y,
          index: nextEndHandleIndex,
          canBind: false,
          type: "vertex",
          id: nextEndHandleId
        };
      }
      const nextHandles = (0, import_editor.structuredClone)(this.shape.props.handles);
      nextHandles[nextEndHandle.id] = nextEndHandle;
      this.editor.updateShapes([
        {
          id: this.shape.id,
          type: this.shape.type,
          props: {
            handles: nextHandles
          }
        }
      ]);
    } else {
      const id = (0, import_editor.createShapeId)();
      this.markId = `creating:${id}`;
      this.editor.mark(this.markId);
      this.editor.createShapes([
        {
          id,
          type: "line",
          x: currentPagePoint.x,
          y: currentPagePoint.y
        }
      ]);
      this.editor.select(id);
      this.shape = this.editor.getShape(id);
    }
  };
  onPointerMove = () => {
    if (!this.shape)
      return;
    if (this.editor.inputs.isDragging) {
      const handles = this.editor.getShapeHandles(this.shape);
      if (!handles) {
        if (this.markId)
          this.editor.bailToMark(this.markId);
        throw Error("No handles found");
      }
      this.editor.setCurrentTool("select.dragging_handle", {
        shape: this.shape,
        isCreating: true,
        handle: (0, import_editor.last)(handles),
        onInteractionEnd: "line"
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
    this.parent.transition("idle", {});
    if (this.markId)
      this.editor.bailToMark(this.markId);
    this.editor.snaps.clear();
  };
  complete() {
    this.parent.transition("idle", { shapeId: this.shape.id });
    this.editor.snaps.clear();
  }
  cancel() {
    if (this.markId)
      this.editor.bailToMark(this.markId);
    this.parent.transition("idle", { shapeId: this.shape.id });
    this.editor.snaps.clear();
  }
}
//# sourceMappingURL=Pointing.js.map
