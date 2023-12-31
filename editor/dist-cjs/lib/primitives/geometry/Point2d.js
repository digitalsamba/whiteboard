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
var Point2d_exports = {};
__export(Point2d_exports, {
  Point2d: () => Point2d
});
module.exports = __toCommonJS(Point2d_exports);
var import_Vec2d = require("../Vec2d");
var import_Geometry2d = require("./Geometry2d");
class Point2d extends import_Geometry2d.Geometry2d {
  point;
  constructor(config) {
    super({ ...config, isClosed: true, isFilled: true });
    const { point } = config;
    this.point = point;
  }
  getVertices() {
    return [this.point];
  }
  nearestPoint() {
    return this.point;
  }
  hitTestLineSegment(A, B, margin) {
    return import_Vec2d.Vec2d.DistanceToLineSegment(A, B, this.point) < margin;
  }
}
//# sourceMappingURL=Point2d.js.map
