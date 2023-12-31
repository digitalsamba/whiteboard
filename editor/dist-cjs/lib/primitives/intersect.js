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
var intersect_exports = {};
__export(intersect_exports, {
  intersectCircleCircle: () => intersectCircleCircle,
  intersectCirclePolygon: () => intersectCirclePolygon,
  intersectCirclePolyline: () => intersectCirclePolyline,
  intersectLineSegmentCircle: () => intersectLineSegmentCircle,
  intersectLineSegmentLineSegment: () => intersectLineSegmentLineSegment,
  intersectLineSegmentPolygon: () => intersectLineSegmentPolygon,
  intersectLineSegmentPolyline: () => intersectLineSegmentPolyline,
  intersectPolygonBounds: () => intersectPolygonBounds,
  intersectPolygonPolygon: () => intersectPolygonPolygon,
  linesIntersect: () => linesIntersect,
  polygonsIntersect: () => polygonsIntersect
});
module.exports = __toCommonJS(intersect_exports);
var import_utils = require("./utils");
var import_Vec2d = require("./Vec2d");
function intersectLineSegmentLineSegment(a1, a2, b1, b2) {
  const ABx = a1.x - b1.x;
  const ABy = a1.y - b1.y;
  const BVx = b2.x - b1.x;
  const BVy = b2.y - b1.y;
  const AVx = a2.x - a1.x;
  const AVy = a2.y - a1.y;
  const ua_t = BVx * ABy - BVy * ABx;
  const ub_t = AVx * ABy - AVy * ABx;
  const u_b = BVy * AVx - BVx * AVy;
  if (ua_t === 0 || ub_t === 0)
    return null;
  if (u_b === 0)
    return null;
  if (u_b !== 0) {
    const ua = ua_t / u_b;
    const ub = ub_t / u_b;
    if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
      return import_Vec2d.Vec2d.AddXY(a1, ua * AVx, ua * AVy);
    }
  }
  return null;
}
function intersectLineSegmentCircle(a1, a2, c, r) {
  const a = (a2.x - a1.x) * (a2.x - a1.x) + (a2.y - a1.y) * (a2.y - a1.y);
  const b = 2 * ((a2.x - a1.x) * (a1.x - c.x) + (a2.y - a1.y) * (a1.y - c.y));
  const cc = c.x * c.x + c.y * c.y + a1.x * a1.x + a1.y * a1.y - 2 * (c.x * a1.x + c.y * a1.y) - r * r;
  const deter = b * b - 4 * a * cc;
  if (deter < 0)
    return null;
  if (deter === 0)
    return null;
  const e = Math.sqrt(deter);
  const u1 = (-b + e) / (2 * a);
  const u2 = (-b - e) / (2 * a);
  if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
    return null;
  }
  const result = [];
  if (0 <= u1 && u1 <= 1)
    result.push(import_Vec2d.Vec2d.Lrp(a1, a2, u1));
  if (0 <= u2 && u2 <= 1)
    result.push(import_Vec2d.Vec2d.Lrp(a1, a2, u2));
  if (result.length === 0)
    return null;
  return result;
}
function intersectLineSegmentPolyline(a1, a2, points) {
  const result = [];
  let segmentIntersection;
  for (let i = 0, n = points.length - 1; i < n; i++) {
    segmentIntersection = intersectLineSegmentLineSegment(a1, a2, points[i], points[i + 1]);
    if (segmentIntersection)
      result.push(segmentIntersection);
  }
  if (result.length === 0)
    return null;
  return result;
}
function intersectLineSegmentPolygon(a1, a2, points) {
  const result = [];
  let segmentIntersection;
  for (let i = 1, n = points.length; i < n + 1; i++) {
    segmentIntersection = intersectLineSegmentLineSegment(
      a1,
      a2,
      points[i - 1],
      points[i % points.length]
    );
    if (segmentIntersection)
      result.push(segmentIntersection);
  }
  if (result.length === 0)
    return null;
  return result;
}
function intersectCircleCircle(c1, r1, c2, r2) {
  let dx = c2.x - c1.x;
  let dy = c2.y - c1.y;
  const d = Math.sqrt(dx * dx + dy * dy), x = (d * d - r2 * r2 + r1 * r1) / (2 * d), y = Math.sqrt(r1 * r1 - x * x);
  dx /= d;
  dy /= d;
  return [
    new import_Vec2d.Vec2d(c1.x + dx * x - dy * y, c1.y + dy * x + dx * y),
    new import_Vec2d.Vec2d(c1.x + dx * x + dy * y, c1.y + dy * x - dx * y)
  ];
}
function intersectCirclePolygon(c, r, points) {
  const result = [];
  let a, b, int;
  for (let i = 0, n = points.length; i < n; i++) {
    a = points[i];
    b = points[(i + 1) % points.length];
    int = intersectLineSegmentCircle(a, b, c, r);
    if (int)
      result.push(...int);
  }
  if (result.length === 0)
    return null;
  return result;
}
function intersectCirclePolyline(c, r, points) {
  const result = [];
  let a, b, int;
  for (let i = 1, n = points.length; i < n; i++) {
    a = points[i - 1];
    b = points[i];
    int = intersectLineSegmentCircle(a, b, c, r);
    if (int)
      result.push(...int);
  }
  if (result.length === 0)
    return null;
  return result;
}
function intersectPolygonBounds(points, bounds) {
  const result = [];
  let segmentIntersection;
  for (const side of bounds.sides) {
    segmentIntersection = intersectLineSegmentPolygon(side[0], side[1], points);
    if (segmentIntersection)
      result.push(...segmentIntersection);
  }
  if (result.length === 0)
    return null;
  return result;
}
function ccw(A, B, C) {
  return (C.y - A.y) * (B.x - A.x) > (B.y - A.y) * (C.x - A.x);
}
function linesIntersect(A, B, C, D) {
  return ccw(A, C, D) !== ccw(B, C, D) && ccw(A, B, C) !== ccw(A, B, D);
}
function intersectPolygonPolygon(polygonA, polygonB) {
  const result = [];
  let a, b, c, d;
  for (let i = 0, n = polygonA.length; i < n; i++) {
    a = polygonA[i];
    if ((0, import_utils.pointInPolygon)(a, polygonB)) {
      result.push(a);
    }
  }
  for (let i = 0, n = polygonB.length; i < n; i++) {
    a = polygonB[i];
    if ((0, import_utils.pointInPolygon)(a, polygonA)) {
      result.push(a);
    }
  }
  for (let i = 0, n = polygonA.length; i < n; i++) {
    a = polygonA[i];
    b = polygonA[(i + 1) % polygonA.length];
    for (let j = 0, m = polygonB.length; j < m; j++) {
      c = polygonB[j];
      d = polygonB[(j + 1) % polygonB.length];
      const intersection = intersectLineSegmentLineSegment(a, b, c, d);
      if (intersection !== null) {
        result.push(intersection);
      }
    }
  }
  if (result.length === 0)
    return null;
  return orderClockwise(result);
}
function orderClockwise(points) {
  const C = import_Vec2d.Vec2d.Average(points);
  return points.sort((A, B) => import_Vec2d.Vec2d.Angle(C, A) - import_Vec2d.Vec2d.Angle(C, B));
}
function polygonsIntersect(a, b) {
  let a0, a1, b0, b1;
  for (let i = 0, n = a.length; i < n; i++) {
    a0 = a[i];
    a1 = a[(i + 1) % n];
    for (let j = 0, m = b.length; j < m; j++) {
      b0 = b[j];
      b1 = b[(j + 1) % m];
      if (linesIntersect(a0, a1, b0, b1))
        return true;
    }
  }
  return false;
}
//# sourceMappingURL=intersect.js.map
