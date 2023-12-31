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
var shared_exports = {};
__export(shared_exports, {
  BOUND_ARROW_OFFSET: () => BOUND_ARROW_OFFSET,
  MIN_ARROW_LENGTH: () => MIN_ARROW_LENGTH,
  STROKE_SIZES: () => STROKE_SIZES,
  WAY_TOO_BIG_ARROW_BEND_FACTOR: () => WAY_TOO_BIG_ARROW_BEND_FACTOR,
  getArrowTerminalInArrowSpace: () => getArrowTerminalInArrowSpace,
  getArrowTerminalsInArrowSpace: () => getArrowTerminalsInArrowSpace,
  getBoundShapeInfoForTerminal: () => getBoundShapeInfoForTerminal,
  getIsArrowStraight: () => getIsArrowStraight
});
module.exports = __toCommonJS(shared_exports);
var import_Matrix2d = require("../../../../primitives/Matrix2d");
var import_Vec2d = require("../../../../primitives/Vec2d");
function getIsArrowStraight(shape) {
  return Math.abs(shape.props.bend) < 8;
}
function getBoundShapeInfoForTerminal(editor, terminal) {
  if (terminal.type === "point") {
    return;
  }
  const shape = editor.getShape(terminal.boundShapeId);
  const transform = editor.getShapePageTransform(shape);
  const geometry = editor.getShapeGeometry(shape);
  return {
    shape,
    transform,
    isClosed: geometry.isClosed,
    isExact: terminal.isExact,
    didIntersect: false,
    outline: geometry.outerVertices
  };
}
function getArrowTerminalInArrowSpace(editor, arrowPageTransform, terminal) {
  if (terminal.type === "point") {
    return import_Vec2d.Vec2d.From(terminal);
  }
  const boundShape = editor.getShape(terminal.boundShapeId);
  if (!boundShape) {
    return new import_Vec2d.Vec2d(0, 0);
  } else {
    const { point, size } = editor.getShapeGeometry(boundShape).bounds;
    const shapePoint = import_Vec2d.Vec2d.Add(point, import_Vec2d.Vec2d.MulV(terminal.normalizedAnchor, size));
    const pagePoint = import_Matrix2d.Matrix2d.applyToPoint(editor.getShapePageTransform(boundShape), shapePoint);
    const arrowPoint = import_Matrix2d.Matrix2d.applyToPoint(import_Matrix2d.Matrix2d.Inverse(arrowPageTransform), pagePoint);
    return arrowPoint;
  }
}
function getArrowTerminalsInArrowSpace(editor, shape) {
  const arrowPageTransform = editor.getShapePageTransform(shape);
  const start = getArrowTerminalInArrowSpace(editor, arrowPageTransform, shape.props.start);
  const end = getArrowTerminalInArrowSpace(editor, arrowPageTransform, shape.props.end);
  return { start, end };
}
const MIN_ARROW_LENGTH = 48;
const BOUND_ARROW_OFFSET = 10;
const WAY_TOO_BIG_ARROW_BEND_FACTOR = 10;
const STROKE_SIZES = {
  s: 2,
  m: 3.5,
  l: 5,
  xl: 10
};
//# sourceMappingURL=shared.js.map
