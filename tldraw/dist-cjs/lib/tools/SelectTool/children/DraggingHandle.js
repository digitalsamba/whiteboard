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
var DraggingHandle_exports = {};
__export(DraggingHandle_exports, {
  DraggingHandle: () => DraggingHandle
});
module.exports = __toCommonJS(DraggingHandle_exports);
var import_editor = require("@tldraw/editor");
class DraggingHandle extends import_editor.StateNode {
  static id = "dragging_handle";
  shapeId = "";
  initialHandle = {};
  initialAdjacentHandle = null;
  initialPagePoint = {};
  markId = "";
  initialPageTransform;
  initialPageRotation;
  info = {};
  isPrecise = false;
  isPreciseId = null;
  pointingId = null;
  onEnter = (info) => {
    const { shape, isCreating, handle } = info;
    this.info = info;
    this.parent.currentToolIdMask = info.onInteractionEnd;
    this.shapeId = shape.id;
    this.markId = isCreating ? `creating:${shape.id}` : "dragging handle";
    if (!isCreating)
      this.editor.mark(this.markId);
    this.initialHandle = (0, import_editor.deepCopy)(handle);
    this.initialPageTransform = this.editor.getShapePageTransform(shape);
    this.initialPageRotation = this.initialPageTransform.rotation();
    this.initialPagePoint = this.editor.inputs.originPagePoint.clone();
    this.editor.updateInstanceState(
      { cursor: { type: isCreating ? "cross" : "grabbing", rotation: 0 } },
      { ephemeral: true }
    );
    const handles = this.editor.getShapeHandles(shape).sort(import_editor.sortByIndex);
    const index = handles.findIndex((h) => h.id === info.handle.id);
    this.initialAdjacentHandle = null;
    for (let i = index + 1; i < handles.length; i++) {
      const handle2 = handles[i];
      if (handle2.type === "vertex" && handle2.id !== "middle" && handle2.id !== info.handle.id) {
        this.initialAdjacentHandle = handle2;
        break;
      }
    }
    if (!this.initialAdjacentHandle) {
      for (let i = handles.length - 1; i >= 0; i--) {
        const handle2 = handles[i];
        if (handle2.type === "vertex" && handle2.id !== "middle" && handle2.id !== info.handle.id) {
          this.initialAdjacentHandle = handle2;
          break;
        }
      }
    }
    const initialTerminal = shape.props[info.handle.id];
    this.isPrecise = false;
    if (initialTerminal?.type === "binding") {
      this.editor.setHintingShapes([initialTerminal.boundShapeId]);
      this.isPrecise = !import_editor.Vec2d.Equals(initialTerminal.normalizedAnchor, { x: 0.5, y: 0.5 });
      if (this.isPrecise) {
        this.isPreciseId = initialTerminal.boundShapeId;
      } else {
        this.resetExactTimeout();
      }
    } else {
      this.editor.setHintingShapes([]);
    }
    this.update();
    this.editor.select(this.shapeId);
  };
  // Only relevant to arrows
  exactTimeout = -1;
  // Only relevant to arrows
  resetExactTimeout() {
    if (this.exactTimeout !== -1) {
      this.clearExactTimeout();
    }
    this.exactTimeout = setTimeout(() => {
      if (this.isActive && !this.isPrecise) {
        this.isPrecise = true;
        this.isPreciseId = this.pointingId;
        this.update();
      }
      this.exactTimeout = -1;
    }, 750);
  }
  // Only relevant to arrows
  clearExactTimeout() {
    if (this.exactTimeout !== -1) {
      clearTimeout(this.exactTimeout);
      this.exactTimeout = -1;
    }
  }
  onPointerMove = () => {
    this.update();
  };
  onKeyDown = () => {
    this.update();
  };
  onKeyUp = () => {
    this.update();
  };
  onPointerUp = () => {
    this.complete();
  };
  onComplete = () => {
    this.complete();
  };
  onCancel = () => {
    this.cancel();
  };
  onExit = () => {
    this.parent.currentToolIdMask = void 0;
    this.editor.setHintingShapes([]);
    this.editor.snaps.clear();
    this.editor.updateInstanceState(
      { cursor: { type: "default", rotation: 0 } },
      { ephemeral: true }
    );
  };
  complete() {
    this.editor.snaps.clear();
    const { onInteractionEnd } = this.info;
    if (this.editor.instanceState.isToolLocked && onInteractionEnd) {
      this.editor.setCurrentTool(onInteractionEnd, { shapeId: this.shapeId });
      return;
    }
    this.parent.transition("idle", {});
  }
  cancel() {
    this.editor.bailToMark(this.markId);
    this.editor.snaps.clear();
    const { onInteractionEnd } = this.info;
    if (onInteractionEnd) {
      this.editor.setCurrentTool(onInteractionEnd, { shapeId: this.shapeId });
      return;
    }
    this.parent.transition("idle", {});
  }
  update() {
    const { editor, shapeId, initialPagePoint } = this;
    const { initialHandle, initialPageRotation, initialAdjacentHandle } = this;
    const {
      user: { isSnapMode },
      hintingShapeIds,
      snaps,
      inputs: { currentPagePoint, shiftKey, ctrlKey, altKey, pointerVelocity }
    } = editor;
    const shape = editor.getShape(shapeId);
    if (!shape)
      return;
    const util = editor.getShapeUtil(shape);
    let point = currentPagePoint.clone().sub(initialPagePoint).rot(-initialPageRotation).add(initialHandle);
    if (shiftKey && initialAdjacentHandle && initialHandle.id !== "middle") {
      const angle = import_editor.Vec2d.Angle(initialAdjacentHandle, point);
      const snappedAngle = (0, import_editor.snapAngle)(angle, 24);
      const angleDifference = snappedAngle - angle;
      point = import_editor.Vec2d.RotWith(point, initialAdjacentHandle, angleDifference);
    }
    editor.snaps.clear();
    if (initialHandle.canSnap && (isSnapMode ? !ctrlKey : ctrlKey)) {
      const pageTransform = editor.getShapePageTransform(shape.id);
      if (!pageTransform)
        throw Error("Expected a page transform");
      const handleIndex = editor.getShapeHandles(shape).filter(({ type }) => type === "vertex").sort(import_editor.sortByIndex).findIndex(({ index }) => initialHandle.index === index);
      const additionalSegments = util.getOutlineSegments(shape).map((segment) => import_editor.Matrix2d.applyToPoints(pageTransform, segment)).filter((_segment, i) => i !== handleIndex - 1 && i !== handleIndex);
      const snapDelta = snaps.getSnappingHandleDelta({
        additionalSegments,
        handlePoint: import_editor.Matrix2d.applyToPoint(pageTransform, point)
      });
      if (snapDelta) {
        snapDelta.rot(-editor.getShapeParentTransform(shape).rotation());
        point.add(snapDelta);
      }
    }
    const changes = util.onHandleChange?.(shape, {
      handle: {
        ...initialHandle,
        x: point.x,
        y: point.y
      },
      isPrecise: this.isPrecise || altKey
    });
    const next = { ...shape, ...changes };
    if (initialHandle.canBind) {
      const bindingAfter = next.props[initialHandle.id];
      if (bindingAfter?.type === "binding") {
        if (hintingShapeIds[0] !== bindingAfter.boundShapeId) {
          editor.setHintingShapes([bindingAfter.boundShapeId]);
          this.pointingId = bindingAfter.boundShapeId;
          this.isPrecise = pointerVelocity.len() < 0.5 || altKey;
          this.isPreciseId = this.isPrecise ? bindingAfter.boundShapeId : null;
          this.resetExactTimeout();
        }
      } else {
        if (hintingShapeIds.length > 0) {
          editor.setHintingShapes([]);
          this.pointingId = null;
          this.isPrecise = false;
          this.isPreciseId = null;
          this.resetExactTimeout();
        }
      }
    }
    if (changes) {
      editor.updateShapes([next], { squashing: true });
    }
  }
}
//# sourceMappingURL=DraggingHandle.js.map
