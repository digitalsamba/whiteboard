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
var curved_arrow_exports = {};
__export(curved_arrow_exports, {
  getArcBoundingBox: () => getArcBoundingBox,
  getArcInfo: () => getArcInfo,
  getCurvedArrowHandlePath: () => getCurvedArrowHandlePath,
  getCurvedArrowInfo: () => getCurvedArrowInfo,
  getPointOnArc: () => getPointOnArc,
  getSolidCurvedArrowPath: () => getSolidCurvedArrowPath
});
module.exports = __toCommonJS(curved_arrow_exports);
var import_Box2d = require("../../../../primitives/Box2d");
var import_Matrix2d = require("../../../../primitives/Matrix2d");
var import_Vec2d = require("../../../../primitives/Vec2d");
var import_intersect = require("../../../../primitives/intersect");
var import_utils = require("../../../../primitives/utils");
var import_shared = require("./shared");
var import_straight_arrow = require("./straight-arrow");
function getCurvedArrowInfo(editor, shape, extraBend = 0) {
  const { arrowheadEnd, arrowheadStart } = shape.props;
  const bend = shape.props.bend + extraBend;
  if (Math.abs(bend) > Math.abs(shape.props.bend * import_shared.WAY_TOO_BIG_ARROW_BEND_FACTOR)) {
    return (0, import_straight_arrow.getStraightArrowInfo)(editor, shape);
  }
  const terminalsInArrowSpace = (0, import_shared.getArrowTerminalsInArrowSpace)(editor, shape);
  const med = import_Vec2d.Vec2d.Med(terminalsInArrowSpace.start, terminalsInArrowSpace.end);
  const u = import_Vec2d.Vec2d.Sub(terminalsInArrowSpace.end, terminalsInArrowSpace.start).uni();
  const middle = import_Vec2d.Vec2d.Add(med, u.per().mul(-bend));
  const startShapeInfo = (0, import_shared.getBoundShapeInfoForTerminal)(editor, shape.props.start);
  const endShapeInfo = (0, import_shared.getBoundShapeInfoForTerminal)(editor, shape.props.end);
  const a = terminalsInArrowSpace.start.clone();
  const b = terminalsInArrowSpace.end.clone();
  const c = middle.clone();
  const handleArc = getArcInfo(a, b, c);
  if (handleArc.length === 0 || handleArc.size === 0 || !(0, import_utils.isSafeFloat)(handleArc.length) || !(0, import_utils.isSafeFloat)(handleArc.size)) {
    return (0, import_straight_arrow.getStraightArrowInfo)(editor, shape);
  }
  const arrowPageTransform = editor.getShapePageTransform(shape);
  if (startShapeInfo && !startShapeInfo.isExact) {
    const startInPageSpace = import_Matrix2d.Matrix2d.applyToPoint(arrowPageTransform, a);
    const endInPageSpace = import_Matrix2d.Matrix2d.applyToPoint(arrowPageTransform, b);
    const centerInPageSpace = import_Matrix2d.Matrix2d.applyToPoint(arrowPageTransform, handleArc.center);
    const inverseTransform = import_Matrix2d.Matrix2d.Inverse(startShapeInfo.transform);
    const startInStartShapeLocalSpace = import_Matrix2d.Matrix2d.applyToPoint(inverseTransform, startInPageSpace);
    const endInStartShapeLocalSpace = import_Matrix2d.Matrix2d.applyToPoint(inverseTransform, endInPageSpace);
    const centerInStartShapeLocalSpace = import_Matrix2d.Matrix2d.applyToPoint(inverseTransform, centerInPageSpace);
    const { isClosed } = startShapeInfo;
    const fn = isClosed ? import_intersect.intersectCirclePolygon : import_intersect.intersectCirclePolyline;
    let point;
    let intersections = fn(
      centerInStartShapeLocalSpace,
      handleArc.radius,
      editor.getShapeGeometry(startShapeInfo.shape).vertices
    );
    if (intersections) {
      intersections = intersections.filter(
        (pt) => +import_Vec2d.Vec2d.Clockwise(startInStartShapeLocalSpace, pt, endInStartShapeLocalSpace) === handleArc.sweepFlag
      );
      const angleToMiddle = import_Vec2d.Vec2d.Angle(handleArc.center, middle);
      const angleToStart = import_Vec2d.Vec2d.Angle(handleArc.center, terminalsInArrowSpace.start);
      const comparisonAngle = (0, import_utils.lerpAngles)(angleToMiddle, angleToStart, 0.5);
      intersections.sort(
        (p0, p1) => Math.abs((0, import_utils.shortAngleDist)(comparisonAngle, centerInStartShapeLocalSpace.angle(p0))) - Math.abs((0, import_utils.shortAngleDist)(comparisonAngle, centerInStartShapeLocalSpace.angle(p1)))
      );
      point = intersections[0] ?? (isClosed ? void 0 : startInStartShapeLocalSpace);
    } else {
      point = isClosed ? void 0 : startInStartShapeLocalSpace;
    }
    if (point) {
      a.setTo(
        editor.getPointInShapeSpace(shape, import_Matrix2d.Matrix2d.applyToPoint(startShapeInfo.transform, point))
      );
      startShapeInfo.didIntersect = true;
      if (arrowheadStart !== "none") {
        const offset = import_shared.BOUND_ARROW_OFFSET + import_shared.STROKE_SIZES[shape.props.size] / 2 + ("size" in startShapeInfo.shape.props ? import_shared.STROKE_SIZES[startShapeInfo.shape.props.size] / 2 : 0);
        a.setTo(
          (0, import_utils.getPointOnCircle)(
            handleArc.center.x,
            handleArc.center.y,
            handleArc.radius,
            (0, import_utils.lerpAngles)(
              import_Vec2d.Vec2d.Angle(handleArc.center, a),
              import_Vec2d.Vec2d.Angle(handleArc.center, middle),
              offset / Math.abs((0, import_utils.getArcLength)(handleArc.center, handleArc.radius, a, middle))
            )
          )
        );
      }
    }
  }
  if (endShapeInfo && !endShapeInfo.isExact) {
    const startInPageSpace = import_Matrix2d.Matrix2d.applyToPoint(arrowPageTransform, a);
    const endInPageSpace = import_Matrix2d.Matrix2d.applyToPoint(arrowPageTransform, b);
    const centerInPageSpace = import_Matrix2d.Matrix2d.applyToPoint(arrowPageTransform, handleArc.center);
    const inverseTransform = import_Matrix2d.Matrix2d.Inverse(endShapeInfo.transform);
    const startInEndShapeLocalSpace = import_Matrix2d.Matrix2d.applyToPoint(inverseTransform, startInPageSpace);
    const endInEndShapeLocalSpace = import_Matrix2d.Matrix2d.applyToPoint(inverseTransform, endInPageSpace);
    const centerInEndShapeLocalSpace = import_Matrix2d.Matrix2d.applyToPoint(inverseTransform, centerInPageSpace);
    const isClosed = endShapeInfo.isClosed;
    const fn = isClosed ? import_intersect.intersectCirclePolygon : import_intersect.intersectCirclePolyline;
    const angleToMiddle = import_Vec2d.Vec2d.Angle(handleArc.center, middle);
    const angleToEnd = import_Vec2d.Vec2d.Angle(handleArc.center, terminalsInArrowSpace.end);
    const comparisonAngle = (0, import_utils.lerpAngles)(angleToMiddle, angleToEnd, 0.5);
    let point;
    let intersections = fn(
      centerInEndShapeLocalSpace,
      handleArc.radius,
      editor.getShapeGeometry(endShapeInfo.shape).vertices
    );
    if (intersections) {
      intersections = intersections.filter(
        (pt) => +import_Vec2d.Vec2d.Clockwise(startInEndShapeLocalSpace, pt, endInEndShapeLocalSpace) === handleArc.sweepFlag
      );
      intersections.sort(
        (p0, p1) => Math.abs((0, import_utils.shortAngleDist)(comparisonAngle, centerInEndShapeLocalSpace.angle(p0))) - Math.abs((0, import_utils.shortAngleDist)(comparisonAngle, centerInEndShapeLocalSpace.angle(p1)))
      );
      point = intersections[0] ?? (isClosed ? void 0 : endInEndShapeLocalSpace);
    } else {
      point = isClosed ? void 0 : endInEndShapeLocalSpace;
    }
    if (point) {
      b.setTo(
        editor.getPointInShapeSpace(shape, import_Matrix2d.Matrix2d.applyToPoint(endShapeInfo.transform, point))
      );
      endShapeInfo.didIntersect = true;
      if (arrowheadEnd !== "none") {
        let offset = import_shared.BOUND_ARROW_OFFSET + import_shared.STROKE_SIZES[shape.props.size] / 2 + ("size" in endShapeInfo.shape.props ? import_shared.STROKE_SIZES[endShapeInfo.shape.props.size] / 2 : 0);
        if (import_Vec2d.Vec2d.Dist(a, b) < import_shared.MIN_ARROW_LENGTH) {
          offset *= -2;
        }
        b.setTo(
          (0, import_utils.getPointOnCircle)(
            handleArc.center.x,
            handleArc.center.y,
            handleArc.radius,
            (0, import_utils.lerpAngles)(
              import_Vec2d.Vec2d.Angle(handleArc.center, b),
              import_Vec2d.Vec2d.Angle(handleArc.center, middle),
              offset / Math.abs((0, import_utils.getArcLength)(handleArc.center, handleArc.radius, b, middle))
            )
          )
        );
      }
    }
  }
  const length = Math.abs((0, import_utils.getArcLength)(handleArc.center, handleArc.radius, a, b));
  if (length < import_shared.MIN_ARROW_LENGTH / 2) {
    a.setTo(terminalsInArrowSpace.start);
    b.setTo(terminalsInArrowSpace.end);
  }
  if (startShapeInfo && endShapeInfo && startShapeInfo.shape !== endShapeInfo.shape && !startShapeInfo.isExact && !endShapeInfo.isExact) {
    const startAngle = import_Vec2d.Vec2d.Angle(handleArc.center, a);
    const endAngle = import_Vec2d.Vec2d.Angle(handleArc.center, b);
    const offset = handleArc.sweepFlag ? import_shared.MIN_ARROW_LENGTH : -import_shared.MIN_ARROW_LENGTH;
    const arcLength = (0, import_utils.getArcLength)(handleArc.center, handleArc.radius, b, a);
    const {
      center: { x, y },
      radius
    } = handleArc;
    if (startShapeInfo && !startShapeInfo.didIntersect) {
      a.setTo((0, import_utils.getPointOnCircle)(x, y, radius, (0, import_utils.lerpAngles)(startAngle, endAngle, offset / arcLength)));
    }
    if (endShapeInfo && !endShapeInfo.didIntersect) {
      b.setTo((0, import_utils.getPointOnCircle)(x, y, radius, (0, import_utils.lerpAngles)(startAngle, endAngle, -offset / arcLength)));
    }
  }
  let midAngle = (0, import_utils.lerpAngles)(import_Vec2d.Vec2d.Angle(handleArc.center, a), import_Vec2d.Vec2d.Angle(handleArc.center, b), 0.5);
  let midPoint = (0, import_utils.getPointOnCircle)(
    handleArc.center.x,
    handleArc.center.y,
    handleArc.radius,
    midAngle
  );
  if (+import_Vec2d.Vec2d.Clockwise(a, midPoint, b) !== handleArc.sweepFlag) {
    midAngle += import_utils.PI;
    midPoint = (0, import_utils.getPointOnCircle)(handleArc.center.x, handleArc.center.y, handleArc.radius, midAngle);
  }
  c.setTo(midPoint);
  const bodyArc = getArcInfo(a, b, c);
  return {
    isStraight: false,
    start: {
      point: a,
      handle: terminalsInArrowSpace.start,
      arrowhead: shape.props.arrowheadStart
    },
    end: {
      point: b,
      handle: terminalsInArrowSpace.end,
      arrowhead: shape.props.arrowheadEnd
    },
    middle: c,
    handleArc,
    bodyArc,
    isValid: bodyArc.length !== 0 && isFinite(bodyArc.center.x) && isFinite(bodyArc.center.y)
  };
}
function getCurvedArrowHandlePath(info) {
  const {
    start,
    end,
    handleArc: { radius, largeArcFlag, sweepFlag }
  } = info;
  return `M${start.handle.x},${start.handle.y} A${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.handle.x},${end.handle.y}`;
}
function getSolidCurvedArrowPath(info) {
  const {
    start,
    end,
    bodyArc: { radius, largeArcFlag, sweepFlag }
  } = info;
  return `M${start.point.x},${start.point.y} A${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.point.x},${end.point.y}`;
}
function getPointOnArc(center, radius, startAngle, size, t) {
  const angle = startAngle + size * t;
  return new import_Vec2d.Vec2d(center.x + radius * Math.cos(angle), center.y + radius * Math.sin(angle));
}
function getArcBoundingBox(center, radius, start, size) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const startAngle = import_Vec2d.Vec2d.Angle(center, start);
  for (let i = 0; i < 20; i++) {
    const angle = startAngle + size * (i / 19);
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);
    minX = Math.min(x, minX);
    minY = Math.min(y, minY);
    maxX = Math.max(x, maxX);
    maxY = Math.max(y, maxY);
  }
  return new import_Box2d.Box2d(minX, minY, maxX - minX, maxY - minY);
}
function getArcInfo(a, b, c) {
  const u = -2 * (a.x * (b.y - c.y) - a.y * (b.x - c.x) + b.x * c.y - c.x * b.y);
  const center = {
    x: ((a.x * a.x + a.y * a.y) * (c.y - b.y) + (b.x * b.x + b.y * b.y) * (a.y - c.y) + (c.x * c.x + c.y * c.y) * (b.y - a.y)) / u,
    y: ((a.x * a.x + a.y * a.y) * (b.x - c.x) + (b.x * b.x + b.y * b.y) * (c.x - a.x) + (c.x * c.x + c.y * c.y) * (a.x - b.x)) / u
  };
  const radius = import_Vec2d.Vec2d.Dist(center, a);
  const sweepFlag = +import_Vec2d.Vec2d.Clockwise(a, c, b);
  const ab = Math.hypot(a.y - b.y, a.x - b.x);
  const bc = Math.hypot(b.y - c.y, b.x - c.x);
  const ca = Math.hypot(c.y - a.y, c.x - a.x);
  const theta = Math.acos((bc * bc + ca * ca - ab * ab) / (2 * bc * ca)) * 2;
  const largeArcFlag = +(import_utils.PI > theta);
  const size = (import_utils.PI2 - theta) * (sweepFlag ? 1 : -1);
  const length = size * radius;
  return {
    center,
    radius,
    size,
    length,
    largeArcFlag,
    sweepFlag
  };
}
//# sourceMappingURL=curved-arrow.js.map
