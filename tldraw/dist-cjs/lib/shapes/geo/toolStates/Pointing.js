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
  markId = "";
  onPointerUp = () => {
    this.complete();
  };
  onPointerMove = (info) => {
    if (this.editor.inputs.isDragging) {
      const { originPagePoint } = this.editor.inputs;
      const id = (0, import_editor.createShapeId)();
      this.markId = `creating:${id}`;
      this.editor.mark(this.markId);
      this.editor.createShapes([
        {
          id,
          type: "geo",
          x: originPagePoint.x,
          y: originPagePoint.y,
          props: {
            w: 1,
            h: 1,
            geo: this.editor.getStyleForNextShape(import_editor.GeoShapeGeoStyle)
          }
        }
      ]).select(id).setCurrentTool("select.resizing", {
        ...info,
        target: "selection",
        handle: "bottom_right",
        isCreating: true,
        creationCursorOffset: { x: 1, y: 1 },
        onInteractionEnd: "geo"
      });
    }
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
    const id = (0, import_editor.createShapeId)();
    this.markId = `creating:${id}`;
    this.editor.mark(this.markId);
    this.editor.createShapes([
      {
        id,
        type: "geo",
        x: originPagePoint.x,
        y: originPagePoint.y,
        props: {
          geo: this.editor.getStyleForNextShape(import_editor.GeoShapeGeoStyle),
          w: 1,
          h: 1
        }
      }
    ]);
    const shape = this.editor.getShape(id);
    if (!shape)
      return;
    const bounds = shape.props.geo === "star" ? (0, import_editor.getStarBounds)(5, 200, 200) : shape.props.geo === "cloud" ? new import_editor.Box2d(0, 0, 300, 180) : new import_editor.Box2d(0, 0, 200, 200);
    const delta = bounds.center;
    const parentTransform = this.editor.getShapeParentTransform(shape);
    if (parentTransform)
      delta.rot(-parentTransform.rotation());
    this.editor.select(id);
    this.editor.updateShapes([
      {
        id: shape.id,
        type: "geo",
        x: shape.x - delta.x,
        y: shape.y - delta.y,
        props: {
          geo: this.editor.getStyleForNextShape(import_editor.GeoShapeGeoStyle),
          w: bounds.width,
          h: bounds.height
        }
      }
    ]);
    if (this.editor.instanceState.isToolLocked) {
      this.parent.transition("idle", {});
    } else {
      this.editor.setCurrentTool("select", {});
    }
  }
  cancel() {
    this.parent.transition("idle", {});
  }
}
//# sourceMappingURL=Pointing.js.map
