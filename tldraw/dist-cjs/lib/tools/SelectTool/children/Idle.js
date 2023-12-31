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
  GRID_INCREMENT: () => GRID_INCREMENT,
  Idle: () => Idle,
  MAJOR_NUDGE_FACTOR: () => MAJOR_NUDGE_FACTOR,
  MINOR_NUDGE_FACTOR: () => MINOR_NUDGE_FACTOR
});
module.exports = __toCommonJS(Idle_exports);
var import_editor = require("@tldraw/editor");
var import_getHitShapeOnCanvasPointerDown = require("../../selection-logic/getHitShapeOnCanvasPointerDown");
var import_getShouldEnterCropModeOnPointerDown = require("../../selection-logic/getShouldEnterCropModeOnPointerDown");
var import_selectOnCanvasPointerUp = require("../../selection-logic/selectOnCanvasPointerUp");
var import_updateHoveredId = require("../../selection-logic/updateHoveredId");
class Idle extends import_editor.StateNode {
  static id = "idle";
  onEnter = () => {
    this.parent.currentToolIdMask = void 0;
    (0, import_updateHoveredId.updateHoveredId)(this.editor);
    this.editor.updateInstanceState(
      { cursor: { type: "default", rotation: 0 } },
      { ephemeral: true }
    );
  };
  onPointerMove = () => {
    (0, import_updateHoveredId.updateHoveredId)(this.editor);
  };
  onPointerDown = (info) => {
    if (this.editor.isMenuOpen)
      return;
    const shouldEnterCropMode = info.ctrlKey && (0, import_getShouldEnterCropModeOnPointerDown.getShouldEnterCropMode)(this.editor);
    if (info.ctrlKey && !shouldEnterCropMode) {
      if (info.target === "shape" && this.isDarwin && this.editor.inputs.keys.has("ControlLeft")) {
        if (!this.editor.isShapeOrAncestorLocked(info.shape)) {
          this.parent.transition("pointing_shape", info);
          return;
        }
      }
      this.parent.transition("brushing", info);
      return;
    }
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
        const {
          onlySelectedShape,
          selectedShapeIds,
          inputs: { currentPagePoint }
        } = this.editor;
        if (selectedShapeIds.length > 1 || onlySelectedShape && !this.editor.getShapeUtil(onlySelectedShape).hideSelectionBoundsBg(onlySelectedShape)) {
          if (isPointInRotatedSelectionBounds(this.editor, currentPagePoint)) {
            this.onPointerDown({
              ...info,
              target: "selection"
            });
            return;
          }
        }
        this.parent.transition("pointing_canvas", info);
        break;
      }
      case "shape": {
        if (this.editor.isShapeOrAncestorLocked(info.shape))
          break;
        this.parent.transition("pointing_shape", info);
        break;
      }
      case "handle": {
        if (this.editor.instanceState.isReadonly)
          break;
        if (this.editor.inputs.altKey) {
          this.parent.transition("pointing_shape", info);
        } else {
          this.parent.transition("pointing_handle", info);
        }
        break;
      }
      case "selection": {
        switch (info.handle) {
          case "mobile_rotate":
          case "top_left_rotate":
          case "top_right_rotate":
          case "bottom_left_rotate":
          case "bottom_right_rotate": {
            this.parent.transition("pointing_rotate_handle", info);
            break;
          }
          case "top":
          case "right":
          case "bottom":
          case "left": {
            if (shouldEnterCropMode) {
              this.parent.transition("pointing_crop_handle", info);
            } else {
              this.parent.transition("pointing_resize_handle", info);
            }
            break;
          }
          case "top_left":
          case "top_right":
          case "bottom_left":
          case "bottom_right": {
            if (shouldEnterCropMode) {
              this.parent.transition("pointing_crop_handle", info);
            } else {
              this.parent.transition("pointing_resize_handle", info);
            }
            break;
          }
          default: {
            const { hoveredShape } = this.editor;
            if (hoveredShape && !this.editor.selectedShapeIds.includes(hoveredShape.id)) {
              this.onPointerDown({
                ...info,
                shape: hoveredShape,
                target: "shape"
              });
              return;
            }
            this.parent.transition("pointing_selection", info);
          }
        }
        break;
      }
    }
  };
  onDoubleClick = (info) => {
    if (this.editor.inputs.shiftKey || info.phase !== "up")
      return;
    switch (info.target) {
      case "canvas": {
        const { hoveredShape } = this.editor;
        const hitShape = hoveredShape && !this.editor.isShapeOfType(hoveredShape, "group") ? hoveredShape : this.editor.getSelectedShapeAtPoint(this.editor.inputs.currentPagePoint) ?? this.editor.getShapeAtPoint(this.editor.inputs.currentPagePoint, {
          margin: import_editor.HIT_TEST_MARGIN / this.editor.zoomLevel,
          hitInside: false
        });
        const { focusedGroupId } = this.editor;
        if (hitShape) {
          if (this.editor.isShapeOfType(hitShape, "group")) {
            (0, import_selectOnCanvasPointerUp.selectOnCanvasPointerUp)(this.editor);
            return;
          } else {
            const parent = this.editor.getShape(hitShape.parentId);
            if (parent && this.editor.isShapeOfType(parent, "group")) {
              if (focusedGroupId && parent.id === focusedGroupId) {
              } else {
                (0, import_selectOnCanvasPointerUp.selectOnCanvasPointerUp)(this.editor);
                return;
              }
            }
          }
          this.onDoubleClick({
            ...info,
            shape: hitShape,
            target: "shape"
          });
          return;
        }
        if (!this.editor.inputs.shiftKey) {
          if (this.editor.instanceState.isReadonly)
            break;
          this.handleDoubleClickOnCanvas(info);
        }
        break;
      }
      case "selection": {
        if (this.editor.instanceState.isReadonly)
          break;
        const { onlySelectedShape } = this.editor;
        if (onlySelectedShape) {
          const util = this.editor.getShapeUtil(onlySelectedShape);
          if (info.handle === "right" || info.handle === "left" || info.handle === "top" || info.handle === "bottom") {
            const change = util.onDoubleClickEdge?.(onlySelectedShape);
            if (change) {
              this.editor.mark("double click edge");
              this.editor.updateShapes([change]);
              return;
            }
          }
          if (util.canCrop(onlySelectedShape) && !this.editor.isShapeOrAncestorLocked(onlySelectedShape)) {
            this.parent.transition("crop", info);
            return;
          }
          if (this.shouldStartEditingShape(onlySelectedShape)) {
            this.startEditingShape(onlySelectedShape, info);
          }
        }
        break;
      }
      case "shape": {
        const { shape } = info;
        const util = this.editor.getShapeUtil(shape);
        if (shape.type !== "video" && shape.type !== "embed" && this.editor.instanceState.isReadonly)
          break;
        if (util.onDoubleClick) {
          const change = util.onDoubleClick?.(shape);
          if (change) {
            this.editor.updateShapes([change]);
            return;
          } else if (util.canCrop(shape) && !this.editor.isShapeOrAncestorLocked(shape)) {
            this.editor.mark("select and crop");
            this.editor.select(info.shape?.id);
            this.parent.transition("crop", info);
            return;
          }
        }
        if (this.shouldStartEditingShape(shape)) {
          this.startEditingShape(shape, info);
        } else {
          this.handleDoubleClickOnCanvas(info);
        }
        break;
      }
      case "handle": {
        if (this.editor.instanceState.isReadonly)
          break;
        const { shape, handle } = info;
        const util = this.editor.getShapeUtil(shape);
        const changes = util.onDoubleClickHandle?.(shape, handle);
        if (changes) {
          this.editor.updateShapes([changes]);
        } else {
          if (this.shouldStartEditingShape(shape)) {
            this.startEditingShape(shape, info);
          }
        }
      }
    }
  };
  onRightClick = (info) => {
    switch (info.target) {
      case "canvas": {
        const { hoveredShape } = this.editor;
        const hitShape = hoveredShape && !this.editor.isShapeOfType(hoveredShape, "group") ? hoveredShape : this.editor.getShapeAtPoint(this.editor.inputs.currentPagePoint);
        if (hitShape) {
          this.onRightClick({
            ...info,
            shape: hitShape,
            target: "shape"
          });
          return;
        }
        this.editor.selectNone();
        break;
      }
      case "shape": {
        const { selectedShapeIds } = this.editor.currentPageState;
        const { shape } = info;
        const targetShape = this.editor.getOutermostSelectableShape(
          shape,
          (parent) => !selectedShapeIds.includes(parent.id)
        );
        if (!selectedShapeIds.includes(targetShape.id)) {
          this.editor.mark("selecting shape");
          this.editor.setSelectedShapes([targetShape.id]);
        }
        break;
      }
    }
  };
  onCancel = () => {
    if (this.editor.focusedGroupId !== this.editor.currentPageId && this.editor.selectedShapeIds.length > 0) {
      this.editor.popFocusedGroupId();
    } else {
      this.editor.mark("clearing selection");
      this.editor.selectNone();
    }
  };
  onKeyDown = (info) => {
    switch (info.code) {
      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowUp":
      case "ArrowDown": {
        this.nudgeSelectedShapes(false);
        break;
      }
    }
  };
  onKeyRepeat = (info) => {
    switch (info.code) {
      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowUp":
      case "ArrowDown": {
        this.nudgeSelectedShapes(true);
        break;
      }
    }
  };
  onKeyUp = (info) => {
    if (this.editor.instanceState.isReadonly) {
      switch (info.code) {
        case "Enter": {
          const { onlySelectedShape } = this.editor;
          if (onlySelectedShape && this.shouldStartEditingShape()) {
            this.startEditingShape(onlySelectedShape, {
              ...info,
              target: "shape",
              shape: onlySelectedShape
            });
            return;
          }
          break;
        }
      }
    } else {
      switch (info.code) {
        case "Enter": {
          const { selectedShapes } = this.editor;
          if (selectedShapes.every((shape) => this.editor.isShapeOfType(shape, "group"))) {
            this.editor.setSelectedShapes(
              selectedShapes.flatMap((shape) => this.editor.getSortedChildIdsForParent(shape.id))
            );
            return;
          }
          const { onlySelectedShape } = this.editor;
          if (onlySelectedShape && this.shouldStartEditingShape(onlySelectedShape)) {
            this.startEditingShape(onlySelectedShape, {
              ...info,
              target: "shape",
              shape: onlySelectedShape
            });
            return;
          }
          if ((0, import_getShouldEnterCropModeOnPointerDown.getShouldEnterCropMode)(this.editor)) {
            this.parent.transition("crop", info);
          }
          break;
        }
      }
    }
  };
  shouldStartEditingShape(shape = this.editor.onlySelectedShape) {
    if (!shape)
      return false;
    if (this.editor.isShapeOrAncestorLocked(shape) && shape.type !== "embed")
      return false;
    return this.editor.getShapeUtil(shape).canEdit(shape);
  }
  startEditingShape(shape, info) {
    if (this.editor.isShapeOrAncestorLocked(shape) && shape.type !== "embed")
      return;
    this.editor.mark("editing shape");
    this.editor.setEditingShape(shape.id);
    this.parent.transition("editing_shape", info);
  }
  isDarwin = window.navigator.userAgent.toLowerCase().indexOf("mac") > -1;
  handleDoubleClickOnCanvas(info) {
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
    ]);
    const shape = this.editor.getShape(id);
    if (!shape)
      return;
    this.editor.setEditingShape(id);
    this.editor.select(id);
    this.parent.transition("editing_shape", info);
  }
  nudgeSelectedShapes(ephemeral = false) {
    const {
      editor: {
        inputs: { keys }
      }
    } = this;
    const shiftKey = keys.has("ShiftLeft");
    const delta = new import_editor.Vec2d(0, 0);
    if (keys.has("ArrowLeft"))
      delta.x -= 1;
    if (keys.has("ArrowRight"))
      delta.x += 1;
    if (keys.has("ArrowUp"))
      delta.y -= 1;
    if (keys.has("ArrowDown"))
      delta.y += 1;
    if (delta.equals(new import_editor.Vec2d(0, 0)))
      return;
    if (!ephemeral)
      this.editor.mark("nudge shapes");
    const { gridSize } = this.editor.documentSettings;
    const step = this.editor.instanceState.isGridMode ? shiftKey ? gridSize * GRID_INCREMENT : gridSize : shiftKey ? MAJOR_NUDGE_FACTOR : MINOR_NUDGE_FACTOR;
    this.editor.nudgeShapes(this.editor.selectedShapeIds, delta.mul(step));
  }
}
const MAJOR_NUDGE_FACTOR = 10;
const MINOR_NUDGE_FACTOR = 1;
const GRID_INCREMENT = 5;
function isPointInRotatedSelectionBounds(editor, point) {
  const { selectionRotatedPageBounds: selectionBounds } = editor;
  if (!selectionBounds)
    return false;
  const { selectionRotation } = editor;
  if (!selectionRotation)
    return selectionBounds.containsPoint(point);
  return (0, import_editor.pointInPolygon)(
    point,
    selectionBounds.corners.map((c) => import_editor.Vec2d.RotWith(c, selectionBounds.point, selectionRotation))
  );
}
//# sourceMappingURL=Idle.js.map
