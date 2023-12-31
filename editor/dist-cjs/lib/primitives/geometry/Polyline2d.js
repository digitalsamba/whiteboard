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
var Polyline2d_exports = {};
__export(Polyline2d_exports, {
  Polyline2d: () => Polyline2d
});
module.exports = __toCommonJS(Polyline2d_exports);
var import_Edge2d = require("./Edge2d");
var import_Geometry2d = require("./Geometry2d");
class Polyline2d extends import_Geometry2d.Geometry2d {
  points;
  constructor(config) {
    super({ isClosed: false, isFilled: false, ...config });
    const { points } = config;
    this.points = points;
  }
  _segments;
  get segments() {
    if (!this._segments) {
      this._segments = [];
      const { vertices } = this;
      for (let i = 0, n = vertices.length - 1; i < n; i++) {
        const start = vertices[i];
        const end = vertices[i + 1];
        this._segments.push(new import_Edge2d.Edge2d({ start, end }));
      }
      if (this.isClosed) {
        this._segments.push(new import_Edge2d.Edge2d({ start: vertices[vertices.length - 1], end: vertices[0] }));
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
    return this.points;
  }
  nearestPoint(A) {
    let nearest;
    let dist = Infinity;
    if (this.points.length === 1) {
      return this.points[0];
    }
    for (const edge of this.segments) {
      const p = edge.nearestPoint(A);
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
    return this.segments.some((edge) => edge.hitTestLineSegment(A, B, zoom));
  }
}
//# sourceMappingURL=Polyline2d.js.map
