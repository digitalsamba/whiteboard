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
var Rotating_exports = {};
__export(Rotating_exports, {
  Rotating: () => Rotating
});
module.exports = __toCommonJS(Rotating_exports);
var import_editor = require("@tldraw/editor");
var import_PointingResizeHandle = require("./PointingResizeHandle");
class Rotating extends import_editor.StateNode {
  static id = "rotating";
  snapshot = {};
  info = {};
  markId = "";
  onEnter = (info) => {
    this.info = info;
    this.parent.currentToolIdMask = info.onInteractionEnd;
    this.markId = "rotate start";
    this.editor.mark(this.markId);
    const snapshot = (0, import_editor.getRotationSnapshot)({ editor: this.editor });
    if (!snapshot)
      return this.parent.transition("idle", this.info);
    this.snapshot = snapshot;
    this.handleStart();
  };
  onExit = () => {
    this.editor.setCursor({ type: "default", rotation: 0 });
    this.parent.currentToolIdMask = void 0;
    this.snapshot = {};
  };
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
  // ---
  update = () => {
    const newSelectionRotation = this._getRotationFromPointerPosition({
      snapToNearestDegree: false
    });
    (0, import_editor.applyRotationToSnapshotShapes)({
      editor: this.editor,
      delta: newSelectionRotation,
      snapshot: this.snapshot,
      stage: "update"
    });
    this.editor.updateInstanceState({
      cursor: {
        type: import_PointingResizeHandle.CursorTypeMap[this.info.handle],
        rotation: newSelectionRotation + this.snapshot.initialSelectionRotation
      }
    });
  };
  cancel = () => {
    this.editor.bailToMark(this.markId);
    if (this.info.onInteractionEnd) {
      this.editor.setCurrentTool(this.info.onInteractionEnd, this.info);
    } else {
      this.parent.transition("idle", this.info);
    }
  };
  complete = () => {
    (0, import_editor.applyRotationToSnapshotShapes)({
      editor: this.editor,
      delta: this._getRotationFromPointerPosition({ snapToNearestDegree: true }),
      snapshot: this.snapshot,
      stage: "end"
    });
    if (this.info.onInteractionEnd) {
      this.editor.setCurrentTool(this.info.onInteractionEnd, this.info);
    } else {
      this.parent.transition("idle", this.info);
    }
  };
  handleStart() {
    const newSelectionRotation = this._getRotationFromPointerPosition({
      snapToNearestDegree: false
    });
    (0, import_editor.applyRotationToSnapshotShapes)({
      editor: this.editor,
      delta: this._getRotationFromPointerPosition({ snapToNearestDegree: false }),
      snapshot: this.snapshot,
      stage: "start"
    });
    this.editor.updateInstanceState({
      cursor: {
        type: import_PointingResizeHandle.CursorTypeMap[this.info.handle],
        rotation: newSelectionRotation + this.snapshot.initialSelectionRotation
      }
    });
  }
  _getRotationFromPointerPosition({ snapToNearestDegree }) {
    const {
      selectionRotatedPageBounds: selectionBounds,
      selectionRotation,
      inputs: { shiftKey, currentPagePoint }
    } = this.editor;
    const { initialCursorAngle, initialSelectionRotation } = this.snapshot;
    if (!selectionBounds)
      return initialSelectionRotation;
    const selectionPageCenter = selectionBounds.center.clone().rotWith(selectionBounds.point, selectionRotation);
    const preSnapRotationDelta = selectionPageCenter.angle(currentPagePoint) - initialCursorAngle;
    let newSelectionRotation = initialSelectionRotation + preSnapRotationDelta;
    if (shiftKey) {
      newSelectionRotation = (0, import_editor.snapAngle)(newSelectionRotation, 24);
    } else if (snapToNearestDegree) {
      newSelectionRotation = Math.round(newSelectionRotation / import_editor.EPSILON) * import_editor.EPSILON;
      if (this.editor.instanceState.isCoarsePointer) {
        const snappedToRightAngle = (0, import_editor.snapAngle)(newSelectionRotation, 4);
        const angleToRightAngle = (0, import_editor.angleDelta)(newSelectionRotation, snappedToRightAngle);
        if (Math.abs(angleToRightAngle) < (0, import_editor.degreesToRadians)(5)) {
          newSelectionRotation = snappedToRightAngle;
        }
      }
    }
    return newSelectionRotation - initialSelectionRotation;
  }
}
//# sourceMappingURL=Rotating.js.map
