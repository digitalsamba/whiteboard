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
var Circle2d_exports = {};
__export(Circle2d_exports, {
  Circle2d: () => Circle2d
});
module.exports = __toCommonJS(Circle2d_exports);
var import_Box2d = require("../Box2d");
var import_Vec2d = require("../Vec2d");
var import_intersect = require("../intersect");
var import_utils = require("../utils");
var import_Geometry2d = require("./Geometry2d");
var import_geometry_constants = require("./geometry-constants");
class Circle2d extends import_Geometry2d.Geometry2d {
  constructor(config) {
    super({ isClosed: true, ...config });
    this.config = config;
    const { x = 0, y = 0, radius } = config;
    this.x = x;
    this.y = y;
    this._center = new import_Vec2d.Vec2d(radius + x, radius + y);
    this.radius = radius;
  }
  _center;
  radius;
  x;
  y;
  getBounds() {
    return new import_Box2d.Box2d(this.x, this.y, this.radius * 2, this.radius * 2);
  }
  getVertices() {
    const { _center, radius } = this;
    const perimeter = import_utils.PI2 * radius;
    const vertices = [];
    for (let i = 0, n = (0, import_geometry_constants.getVerticesCountForLength)(perimeter); i < n; i++) {
      const angle = i / n * import_utils.PI2;
      vertices.push(_center.clone().add(import_Vec2d.Vec2d.FromAngle(angle).mul(radius)));
    }
    return vertices;
  }
  nearestPoint(point) {
    const { _center, radius } = this;
    return _center.clone().add(point.clone().sub(_center).uni().mul(radius));
  }
  hitTestLineSegment(A, B, _zoom) {
    const { _center, radius } = this;
    return (0, import_intersect.intersectLineSegmentCircle)(A, B, _center, radius) !== null;
  }
}
//# sourceMappingURL=Circle2d.js.map
