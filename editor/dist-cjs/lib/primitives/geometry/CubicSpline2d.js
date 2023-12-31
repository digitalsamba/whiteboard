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
var CubicSpline2d_exports = {};
__export(CubicSpline2d_exports, {
  CubicSpline2d: () => CubicSpline2d
});
module.exports = __toCommonJS(CubicSpline2d_exports);
var import_Vec2d = require("../Vec2d");
var import_CubicBezier2d = require("./CubicBezier2d");
var import_Geometry2d = require("./Geometry2d");
class CubicSpline2d extends import_Geometry2d.Geometry2d {
  points;
  constructor(config) {
    super({ ...config, isClosed: false, isFilled: false });
    const { points } = config;
    this.points = points;
  }
  _segments;
  get segments() {
    if (!this._segments) {
      this._segments = [];
      const { points } = this;
      const len = points.length;
      const last = len - 2;
      const k = 1.25;
      for (let i = 0; i < len - 1; i++) {
        const p0 = i === 0 ? points[0] : points[i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = i === last ? p2 : points[i + 2];
        const start = p1, cp1 = i === 0 ? p0 : new import_Vec2d.Vec2d(p1.x + (p2.x - p0.x) / 6 * k, p1.y + (p2.y - p0.y) / 6 * k), cp2 = i === last ? p2 : new import_Vec2d.Vec2d(p2.x - (p3.x - p1.x) / 6 * k, p2.y - (p3.y - p1.y) / 6 * k), end = p2;
        this._segments.push(new import_CubicBezier2d.CubicBezier2d({ start, cp1, cp2, end }));
      }
    }
    return this._segments;
  }
  _length;
  get length() {
    if (!this._length) {
      this._length = this.segments.reduce((acc, segment) => acc + segment.length, 0);
    }
    return this._length;
  }
  getVertices() {
    const vertices = this.segments.reduce((acc, segment) => {
      return acc.concat(segment.vertices);
    }, []);
    vertices.push(this.points[this.points.length - 1]);
    return vertices;
  }
  nearestPoint(A) {
    let nearest;
    let dist = Infinity;
    for (const segment of this.segments) {
      const p = segment.nearestPoint(A);
      const d = p.dist(A);
      if (d < dist) {
        nearest = p;
        dist = d;
      }
    }
    if (!nearest)
      throw Error("nearest point not found");
    return nearest;
  }
  hitTestLineSegment(A, B, zoom) {
    return this.segments.some((segment) => segment.hitTestLineSegment(A, B, zoom));
  }
}
//# sourceMappingURL=CubicSpline2d.js.map
