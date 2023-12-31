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
var utils_exports = {};
__export(utils_exports, {
  EPSILON: () => EPSILON,
  PI: () => PI,
  PI2: () => PI2,
  SIN: () => SIN,
  TAU: () => TAU,
  angleDelta: () => angleDelta,
  approximately: () => approximately,
  areAnglesCompatible: () => areAnglesCompatible,
  average: () => average,
  canonicalizeRotation: () => canonicalizeRotation,
  clamp: () => clamp,
  clampRadians: () => clampRadians,
  degreesToRadians: () => degreesToRadians,
  getArcLength: () => getArcLength,
  getHeight: () => getHeight,
  getMaxX: () => getMaxX,
  getMaxY: () => getMaxY,
  getMidX: () => getMidX,
  getMidY: () => getMidY,
  getMinX: () => getMinX,
  getMinY: () => getMinY,
  getPointOnCircle: () => getPointOnCircle,
  getPolygonVertices: () => getPolygonVertices,
  getStarBounds: () => getStarBounds,
  getSweep: () => getSweep,
  getWidth: () => getWidth,
  isAngleBetween: () => isAngleBetween,
  isSafeFloat: () => isSafeFloat,
  lerpAngles: () => lerpAngles,
  longAngleDist: () => longAngleDist,
  perimeterOfEllipse: () => perimeterOfEllipse,
  pointInBounds: () => pointInBounds,
  pointInCircle: () => pointInCircle,
  pointInEllipse: () => pointInEllipse,
  pointInPolygon: () => pointInPolygon,
  pointInPolyline: () => pointInPolyline,
  pointInRect: () => pointInRect,
  pointNearToLineSegment: () => pointNearToLineSegment,
  pointNearToPolyline: () => pointNearToPolyline,
  precise: () => precise,
  radiansToDegrees: () => radiansToDegrees,
  rangeIntersection: () => rangeIntersection,
  rangesOverlap: () => rangesOverlap,
  shortAngleDist: () => shortAngleDist,
  simplify: () => simplify,
  simplify2: () => simplify2,
  snapAngle: () => snapAngle,
  toDomPrecision: () => toDomPrecision,
  toFixed: () => toFixed,
  toPrecision: () => toPrecision
});
module.exports = __toCommonJS(utils_exports);
var import_Box2d = require("./Box2d");
var import_Vec2d = require("./Vec2d");
function precise(A) {
  return `${toDomPrecision(A.x)},${toDomPrecision(A.y)} `;
}
function average(A, B) {
  return `${toDomPrecision((A.x + B.x) / 2)},${toDomPrecision((A.y + B.y) / 2)} `;
}
const PI = Math.PI;
const TAU = PI / 2;
const PI2 = PI * 2;
const EPSILON = Math.PI / 180;
const SIN = Math.sin;
function clamp(n, min, max) {
  return Math.max(min, typeof max !== "undefined" ? Math.min(n, max) : n);
}
function toPrecision(n, precision = 1e10) {
  if (!n)
    return 0;
  return Math.round(n * precision) / precision;
}
function approximately(a, b, precision = 1e-6) {
  return Math.abs(a - b) <= precision;
}
function perimeterOfEllipse(rx, ry) {
  const h = Math.pow(rx - ry, 2) / Math.pow(rx + ry, 2);
  const p = PI * (rx + ry) * (1 + 3 * h / (10 + Math.sqrt(4 - 3 * h)));
  return p;
}
function canonicalizeRotation(a) {
  a = a % PI2;
  if (a < 0) {
    a = a + PI2;
  } else if (a === 0) {
    a = 0;
  }
  return a;
}
function shortAngleDist(a0, a1) {
  const da = (a1 - a0) % PI2;
  return 2 * da % PI2 - da;
}
function longAngleDist(a0, a1) {
  return PI2 - shortAngleDist(a0, a1);
}
function lerpAngles(a0, a1, t) {
  return a0 + shortAngleDist(a0, a1) * t;
}
function angleDelta(a0, a1) {
  return shortAngleDist(a0, a1);
}
function getSweep(C, A, B) {
  return angleDelta(import_Vec2d.Vec2d.Angle(C, A), import_Vec2d.Vec2d.Angle(C, B));
}
function clampRadians(r) {
  return (PI2 + r) % PI2;
}
function snapAngle(r, segments) {
  const seg = PI2 / segments;
  let ang = Math.floor((clampRadians(r) + seg / 2) / seg) * seg % PI2;
  if (ang < PI)
    ang += PI2;
  if (ang > PI)
    ang -= PI2;
  return ang;
}
function areAnglesCompatible(a, b) {
  return a === b || approximately(a % (Math.PI / 2) - b % (Math.PI / 2), 0);
}
function isAngleBetween(a, b, c) {
  if (c === a || c === b)
    return true;
  const AB = (b - a + TAU) % TAU;
  const AC = (c - a + TAU) % TAU;
  return AB <= PI !== AC > AB;
}
function degreesToRadians(d) {
  return d * PI / 180;
}
function radiansToDegrees(r) {
  return r * 180 / PI;
}
function getArcLength(C, r, A, B) {
  const sweep = getSweep(C, A, B);
  return r * PI2 * (sweep / PI2);
}
function getPointOnCircle(cx, cy, r, a) {
  return new import_Vec2d.Vec2d(cx + r * Math.cos(a), cy + r * Math.sin(a));
}
function getPolygonVertices(width, height, sides) {
  const cx = width / 2;
  const cy = height / 2;
  const pointsOnPerimeter = [];
  for (let i = 0; i < sides; i++) {
    const step = PI2 / sides;
    const t = -TAU + i * step;
    pointsOnPerimeter.push(new import_Vec2d.Vec2d(cx + cx * Math.cos(t), cy + cy * Math.sin(t)));
  }
  return pointsOnPerimeter;
}
function rangesOverlap(a0, a1, b0, b1) {
  return a0 < b1 && b0 < a1;
}
function rangeIntersection(a0, a1, b0, b1) {
  const min = Math.max(a0, b0);
  const max = Math.min(a1, b1);
  if (min <= max) {
    return [min, max];
  }
  return null;
}
const getStarBounds = (sides, w, h) => {
  const step = PI2 / sides / 2;
  const rightMostIndex = Math.floor(sides / 4) * 2;
  const leftMostIndex = sides * 2 - rightMostIndex;
  const topMostIndex = 0;
  const bottomMostIndex = Math.floor(sides / 2) * 2;
  const maxX = Math.cos(-TAU + rightMostIndex * step) * w / 2;
  const minX = Math.cos(-TAU + leftMostIndex * step) * w / 2;
  const minY = Math.sin(-TAU + topMostIndex * step) * h / 2;
  const maxY = Math.sin(-TAU + bottomMostIndex * step) * h / 2;
  return new import_Box2d.Box2d(0, 0, maxX - minX, maxY - minY);
};
function cross(x, y, z) {
  return (y.x - x.x) * (z.y - x.y) - (z.x - x.x) * (y.y - x.y);
}
function pointInCircle(A, C, r) {
  return import_Vec2d.Vec2d.Dist(A, C) <= r;
}
function pointInEllipse(A, C, rx, ry, rotation = 0) {
  rotation = rotation || 0;
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  const delta = import_Vec2d.Vec2d.Sub(A, C);
  const tdx = cos * delta.x + sin * delta.y;
  const tdy = sin * delta.x - cos * delta.y;
  return tdx * tdx / (rx * rx) + tdy * tdy / (ry * ry) <= 1;
}
function pointInRect(A, point, size) {
  return !(A.x < point.x || A.x > point.x + size.x || A.y < point.y || A.y > point.y + size.y);
}
function pointInPolygon(A, points) {
  let windingNumber = 0;
  let a;
  let b;
  for (let i = 0; i < points.length; i++) {
    a = points[i];
    b = points[(i + 1) % points.length];
    if (a.y <= A.y) {
      if (b.y > A.y && cross(a, b, A) > 0) {
        windingNumber += 1;
      }
    } else if (b.y <= A.y && cross(a, b, A) < 0) {
      windingNumber -= 1;
    }
  }
  return windingNumber !== 0;
}
function pointInBounds(A, b) {
  return !(A.x < b.minX || A.x > b.maxX || A.y < b.minY || A.y > b.maxY);
}
function pointInPolyline(A, points, distance = 3) {
  for (let i = 1; i < points.length; i++) {
    if (import_Vec2d.Vec2d.DistanceToLineSegment(points[i - 1], points[i], A) < distance) {
      return true;
    }
  }
  return false;
}
function pointNearToPolyline(A, points, distance = 8) {
  const len = points.length;
  for (let i = 1; i < len; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];
    const d = import_Vec2d.Vec2d.DistanceToLineSegment(p1, p2, A);
    if (d < distance)
      return true;
  }
  return false;
}
function pointNearToLineSegment(A, p1, p2, distance = 8) {
  const d = import_Vec2d.Vec2d.DistanceToLineSegment(p1, p2, A);
  if (d < distance)
    return true;
  return false;
}
function simplify(points, tolerance = 1) {
  const len = points.length;
  const a = points[0];
  const b = points[len - 1];
  const { x: x1, y: y1 } = a;
  const { x: x2, y: y2 } = b;
  if (len > 2) {
    let distance = 0;
    let index = 0;
    const max = new import_Vec2d.Vec2d(y2 - y1, x2 - x1).len2();
    for (let i = 1; i < len - 1; i++) {
      const { x: x0, y: y0 } = points[i];
      const d = Math.pow(x0 * (y2 - y1) + x1 * (y0 - y2) + x2 * (y1 - y0), 2) / max;
      if (distance > d)
        continue;
      distance = d;
      index = i;
    }
    if (distance > tolerance) {
      const l0 = simplify(points.slice(0, index + 1), tolerance);
      const l1 = simplify(points.slice(index + 1), tolerance);
      return l0.concat(l1.slice(1));
    }
  }
  return [a, b];
}
function _getSqSegDist(p, p1, p2) {
  let x = p1.x;
  let y = p1.y;
  let dx = p2.x - x;
  let dy = p2.y - y;
  if (dx !== 0 || dy !== 0) {
    const t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      x = p2.x;
      y = p2.y;
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }
  dx = p.x - x;
  dy = p.y - y;
  return dx * dx + dy * dy;
}
function _simplifyStep(points, first, last, sqTolerance, result) {
  let maxSqDist = sqTolerance;
  let index = -1;
  for (let i = first + 1; i < last; i++) {
    const sqDist = _getSqSegDist(points[i], points[first], points[last]);
    if (sqDist > maxSqDist) {
      index = i;
      maxSqDist = sqDist;
    }
  }
  if (index > -1 && maxSqDist > sqTolerance) {
    if (index - first > 1)
      _simplifyStep(points, first, index, sqTolerance, result);
    result.push(points[index]);
    if (last - index > 1)
      _simplifyStep(points, index, last, sqTolerance, result);
  }
}
function simplify2(points, tolerance = 1) {
  if (points.length <= 2)
    return points;
  const sqTolerance = tolerance * tolerance;
  let A = points[0];
  let B = points[1];
  const newPoints = [A];
  for (let i = 1, len = points.length; i < len; i++) {
    B = points[i];
    if ((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y) > sqTolerance) {
      newPoints.push(B);
      A = B;
    }
  }
  if (A !== B)
    newPoints.push(B);
  const last = newPoints.length - 1;
  const result = [newPoints[0]];
  _simplifyStep(newPoints, 0, last, sqTolerance, result);
  result.push(newPoints[last], points[points.length - 1]);
  return result;
}
function getMinX(pts) {
  let top = pts[0];
  for (let i = 1; i < pts.length; i++) {
    if (pts[i].x < top.x) {
      top = pts[i];
    }
  }
  return top.x;
}
function getMinY(pts) {
  let top = pts[0];
  for (let i = 1; i < pts.length; i++) {
    if (pts[i].y < top.y) {
      top = pts[i];
    }
  }
  return top.y;
}
function getMaxX(pts) {
  let top = pts[0];
  for (let i = 1; i < pts.length; i++) {
    if (pts[i].x > top.x) {
      top = pts[i];
    }
  }
  return top.x;
}
function getMaxY(pts) {
  let top = pts[0];
  for (let i = 1; i < pts.length; i++) {
    if (pts[i].y > top.y) {
      top = pts[i];
    }
  }
  return top.y;
}
function getMidX(pts) {
  const a = getMinX(pts);
  const b = getMaxX(pts);
  return a + (b - a) / 2;
}
function getMidY(pts) {
  const a = getMinY(pts);
  const b = getMaxY(pts);
  return a + (b - a) / 2;
}
function getWidth(pts) {
  const a = getMinX(pts);
  const b = getMaxX(pts);
  return b - a;
}
function getHeight(pts) {
  const a = getMinY(pts);
  const b = getMaxY(pts);
  return b - a;
}
function toDomPrecision(v) {
  return +v.toFixed(4);
}
function toFixed(v) {
  return +v.toFixed(2);
}
const isSafeFloat = (n) => {
  return Math.abs(n) < Number.MAX_SAFE_INTEGER;
};
//# sourceMappingURL=utils.js.map
