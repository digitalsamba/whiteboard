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
  onEnter = () => {
    this.didTimeout = false;
    const target = this.editor.getShapeAtPoint(this.editor.inputs.currentPagePoint, {
      filter: (targetShape) => {
        return !targetShape.isLocked && this.editor.getShapeUtil(targetShape).canBind(targetShape);
      },
      margin: 0,
      hitInside: true
    });
    if (!target) {
      this.createArrowShape();
    } else {
      this.editor.setHintingShapes([target.id]);
    }
    this.startPreciseTimeout();
  };
  onExit = () => {
    this.shape = void 0;
    this.editor.setHintingShapes([]);
    this.clearPreciseTimeout();
  };
  onPointerMove = () => {
    if (this.editor.inputs.isDragging) {
      if (!this.shape) {
        this.createArrowShape();
      }
      if (!this.shape)
        throw Error(`expected shape`);
      this.updateArrowShapeEndHandle();
      this.editor.setCurrentTool("select.dragging_handle", {
        shape: this.shape,
        handle: this.editor.getShapeHandles(this.shape).find((h) => h.id === "end"),
        isCreating: true,
        onInteractionEnd: "arrow"
      });
    }
  };
  onPointerUp = () => {
    this.cancel();
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
    if (this.shape) {
      this.editor.bailToMark(this.markId);
    }
    this.editor.setHintingShapes([]);
    this.parent.transition("idle", {});
  }
  createArrowShape() {
    const { originPagePoint } = this.editor.inputs;
    const id = (0, import_editor.createShapeId)();
    this.markId = `creating:${id}`;
    this.editor.mark(this.markId);
    this.editor.createShapes([
      {
        id,
        type: "arrow",
        x: originPagePoint.x,
        y: originPagePoint.y
      }
    ]);
    const shape = this.editor.getShape(id);
    if (!shape)
      throw Error(`expected shape`);
    const handles = this.editor.getShapeHandles(shape);
    if (!handles)
      throw Error(`expected handles for arrow`);
    const util = this.editor.getShapeUtil("arrow");
    const startHandle = handles.find((h) => h.id === "start");
    const change = util.onHandleChange?.(shape, {
      handle: { ...startHandle, x: 0, y: 0 },
      isPrecise: true
    });
    if (change) {
      const startTerminal = change.props?.start;
      if (startTerminal?.type === "binding") {
        this.editor.setHintingShapes([startTerminal.boundShapeId]);
      }
      this.editor.updateShapes([change], { squashing: true });
    }
    this.shape = this.editor.getShape(id);
    this.editor.select(id);
  }
  updateArrowShapeEndHandle() {
    const shape = this.shape;
    if (!shape)
      throw Error(`expected shape`);
    const handles = this.editor.getShapeHandles(shape);
    if (!handles)
      throw Error(`expected handles for arrow`);
    {
      const util = this.editor.getShapeUtil("arrow");
      const point = this.editor.getPointInShapeSpace(shape, this.editor.inputs.currentPagePoint);
      const endHandle = handles.find((h) => h.id === "end");
      const change = util.onHandleChange?.(shape, {
        handle: { ...endHandle, x: point.x, y: point.y },
        isPrecise: false
        // sure about that?
      });
      if (change) {
        const endTerminal = change.props?.end;
        if (endTerminal?.type === "binding") {
          this.editor.setHintingShapes([endTerminal.boundShapeId]);
        }
        this.editor.updateShapes([change], { squashing: true });
      }
    }
    {
      const util = this.editor.getShapeUtil("arrow");
      const startHandle = handles.find((h) => h.id === "start");
      const change = util.onHandleChange?.(shape, {
        handle: { ...startHandle, x: 0, y: 0 },
        isPrecise: this.didTimeout
        // sure about that?
      });
      if (change) {
        this.editor.updateShapes([change], { squashing: true });
      }
    }
    this.shape = this.editor.getShape(shape.id);
  }
  preciseTimeout = -1;
  didTimeout = false;
  startPreciseTimeout() {
    this.preciseTimeout = window.setTimeout(() => {
      if (!this.isActive)
        return;
      this.didTimeout = true;
    }, 320);
  }
  clearPreciseTimeout() {
    clearTimeout(this.preciseTimeout);
  }
}
//# sourceMappingURL=Pointing.js.map
