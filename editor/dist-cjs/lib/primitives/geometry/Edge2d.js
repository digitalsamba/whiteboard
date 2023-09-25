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
var Edge2d_exports = {};
__export(Edge2d_exports, {
  Edge2d: () => Edge2d
});
module.exports = __toCommonJS(Edge2d_exports);
var import_intersect = require("../intersect");
var import_Geometry2d = require("./Geometry2d");
class Edge2d extends import_Geometry2d.Geometry2d {
  start;
  end;
  d;
  u;
  length;
  constructor(config) {
    super({ ...config, isClosed: false, isFilled: false });
    const { start, end } = config;
    this.start = start;
    this.end = end;
    this.d = start.clone().sub(end);
    this.u = this.d.clone().uni();
    this.length = this.d.len();
  }
  midPoint() {
    return this.start.lrp(this.end, 0.5);
  }
  getVertices() {
    return [this.start, this.end];
  }
  nearestPoint(point) {
    const { start, end, u } = this;
    if (start.equals(end))
      return start.clone();
    const C = start.clone().add(u.clone().mul(point.clone().sub(start).pry(u)));
    if (C.x < Math.min(start.x, end.x))
      return start.x < end.x ? start : end;
    if (C.x > Math.max(start.x, end.x))
      return start.x > end.x ? start : end;
    if (C.y < Math.min(start.y, end.y))
      return start.y < end.y ? start : end;
    if (C.y > Math.max(start.y, end.y))
      return start.y > end.y ? start : end;
    return C;
  }
  hitTestLineSegment(A, B, _zoom) {
    return (0, import_intersect.linesIntersect)(A, B, this.start, this.end);
  }
}
//# sourceMappingURL=Edge2d.js.map
