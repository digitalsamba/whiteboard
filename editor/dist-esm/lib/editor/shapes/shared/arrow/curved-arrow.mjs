import { Box2d } from "../../../../primitives/Box2d.mjs";
import { Matrix2d } from "../../../../primitives/Matrix2d.mjs";
import { Vec2d } from "../../../../primitives/Vec2d.mjs";
import { intersectCirclePolygon, intersectCirclePolyline } from "../../../../primitives/intersect.mjs";
import {
  PI,
  PI2,
  getArcLength,
  getPointOnCircle,
  isSafeFloat,
  lerpAngles,
  shortAngleDist
} from "../../../../primitives/utils.mjs";
import {
  BOUND_ARROW_OFFSET,
  MIN_ARROW_LENGTH,
  STROKE_SIZES,
  WAY_TOO_BIG_ARROW_BEND_FACTOR,
  getArrowTerminalsInArrowSpace,
  getBoundShapeInfoForTerminal
} from "./shared.mjs";
import { getStraightArrowInfo } from "./straight-arrow.mjs";
function getCurvedArrowInfo(editor, shape, extraBend = 0) {
  const { arrowheadEnd, arrowheadStart } = shape.props;
  const bend = shape.props.bend + extraBend;
  if (Math.abs(bend) > Math.abs(shape.props.bend * WAY_TOO_BIG_ARROW_BEND_FACTOR)) {
    return getStraightArrowInfo(editor, shape);
  }
  const terminalsInArrowSpace = getArrowTerminalsInArrowSpace(editor, shape);
  const med = Vec2d.Med(terminalsInArrowSpace.start, terminalsInArrowSpace.end);
  const u = Vec2d.Sub(terminalsInArrowSpace.end, terminalsInArrowSpace.start).uni();
  const middle = Vec2d.Add(med, u.per().mul(-bend));
  const startShapeInfo = getBoundShapeInfoForTerminal(editor, shape.props.start);
  const endShapeInfo = getBoundShapeInfoForTerminal(editor, shape.props.end);
  const a = terminalsInArrowSpace.start.clone();
  const b = terminalsInArrowSpace.end.clone();
  const c = middle.clone();
  const handleArc = getArcInfo(a, b, c);
  if (handleArc.length === 0 || handleArc.size === 0 || !isSafeFloat(handleArc.length) || !isSafeFloat(handleArc.size)) {
    return getStraightArrowInfo(editor, shape);
  }
  const arrowPageTransform = editor.getShapePageTransform(shape);
  if (startShapeInfo && !startShapeInfo.isExact) {
    const startInPageSpace = Matrix2d.applyToPoint(arrowPageTransform, a);
    const endInPageSpace = Matrix2d.applyToPoint(arrowPageTransform, b);
    const centerInPageSpace = Matrix2d.applyToPoint(arrowPageTransform, handleArc.center);
    const inverseTransform = Matrix2d.Inverse(startShapeInfo.transform);
    const startInStartShapeLocalSpace = Matrix2d.applyToPoint(inverseTransform, startInPageSpace);
    const endInStartShapeLocalSpace = Matrix2d.applyToPoint(inverseTransform, endInPageSpace);
    const centerInStartShapeLocalSpace = Matrix2d.applyToPoint(inverseTransform, centerInPageSpace);
    const { isClosed } = startShapeInfo;
    const fn = isClosed ? intersectCirclePolygon : intersectCirclePolyline;
    let point;
    let intersections = fn(
      centerInStartShapeLocalSpace,
      handleArc.radius,
      editor.getShapeGeometry(startShapeInfo.shape).vertices
    );
    if (intersections) {
      intersections = intersections.filter(
        (pt) => +Vec2d.Clockwise(startInStartShapeLocalSpace, pt, endInStartShapeLocalSpace) === handleArc.sweepFlag
      );
      const angleToMiddle = Vec2d.Angle(handleArc.center, middle);
      const angleToStart = Vec2d.Angle(handleArc.center, terminalsInArrowSpace.start);
      const comparisonAngle = lerpAngles(angleToMiddle, angleToStart, 0.5);
      intersections.sort(
        (p0, p1) => Math.abs(shortAngleDist(comparisonAngle, centerInStartShapeLocalSpace.angle(p0))) - Math.abs(shortAngleDist(comparisonAngle, centerInStartShapeLocalSpace.angle(p1)))
      );
      point = intersections[0] ?? (isClosed ? void 0 : startInStartShapeLocalSpace);
    } else {
      point = isClosed ? void 0 : startInStartShapeLocalSpace;
    }
    if (point) {
      a.setTo(
        editor.getPointInShapeSpace(shape, Matrix2d.applyToPoint(startShapeInfo.transform, point))
      );
      startShapeInfo.didIntersect = true;
      if (arrowheadStart !== "none") {
        const offset = BOUND_ARROW_OFFSET + STROKE_SIZES[shape.props.size] / 2 + ("size" in startShapeInfo.shape.props ? STROKE_SIZES[startShapeInfo.shape.props.size] / 2 : 0);
        a.setTo(
          getPointOnCircle(
            handleArc.center.x,
            handleArc.center.y,
            handleArc.radius,
            lerpAngles(
              Vec2d.Angle(handleArc.center, a),
              Vec2d.Angle(handleArc.center, middle),
              offset / Math.abs(getArcLength(handleArc.center, handleArc.radius, a, middle))
            )
          )
        );
      }
    }
  }
  if (endShapeInfo && !endShapeInfo.isExact) {
    const startInPageSpace = Matrix2d.applyToPoint(arrowPageTransform, a);
    const endInPageSpace = Matrix2d.applyToPoint(arrowPageTransform, b);
    const centerInPageSpace = Matrix2d.applyToPoint(arrowPageTransform, handleArc.center);
    const inverseTransform = Matrix2d.Inverse(endShapeInfo.transform);
    const startInEndShapeLocalSpace = Matrix2d.applyToPoint(inverseTransform, startInPageSpace);
    const endInEndShapeLocalSpace = Matrix2d.applyToPoint(inverseTransform, endInPageSpace);
    const centerInEndShapeLocalSpace = Matrix2d.applyToPoint(inverseTransform, centerInPageSpace);
    const isClosed = endShapeInfo.isClosed;
    const fn = isClosed ? intersectCirclePolygon : intersectCirclePolyline;
    const angleToMiddle = Vec2d.Angle(handleArc.center, middle);
    const angleToEnd = Vec2d.Angle(handleArc.center, terminalsInArrowSpace.end);
    const comparisonAngle = lerpAngles(angleToMiddle, angleToEnd, 0.5);
    let point;
    let intersections = fn(
      centerInEndShapeLocalSpace,
      handleArc.radius,
      editor.getShapeGeometry(endShapeInfo.shape).vertices
    );
    if (intersections) {
      intersections = intersections.filter(
        (pt) => +Vec2d.Clockwise(startInEndShapeLocalSpace, pt, endInEndShapeLocalSpace) === handleArc.sweepFlag
      );
      intersections.sort(
        (p0, p1) => Math.abs(shortAngleDist(comparisonAngle, centerInEndShapeLocalSpace.angle(p0))) - Math.abs(shortAngleDist(comparisonAngle, centerInEndShapeLocalSpace.angle(p1)))
      );
      point = intersections[0] ?? (isClosed ? void 0 : endInEndShapeLocalSpace);
    } else {
      point = isClosed ? void 0 : endInEndShapeLocalSpace;
    }
    if (point) {
      b.setTo(
        editor.getPointInShapeSpace(shape, Matrix2d.applyToPoint(endShapeInfo.transform, point))
      );
      endShapeInfo.didIntersect = true;
      if (arrowheadEnd !== "none") {
        let offset = BOUND_ARROW_OFFSET + STROKE_SIZES[shape.props.size] / 2 + ("size" in endShapeInfo.shape.props ? STROKE_SIZES[endShapeInfo.shape.props.size] / 2 : 0);
        if (Vec2d.Dist(a, b) < MIN_ARROW_LENGTH) {
          offset *= -2;
        }
        b.setTo(
          getPointOnCircle(
            handleArc.center.x,
            handleArc.center.y,
            handleArc.radius,
            lerpAngles(
              Vec2d.Angle(handleArc.center, b),
              Vec2d.Angle(handleArc.center, middle),
              offset / Math.abs(getArcLength(handleArc.center, handleArc.radius, b, middle))
            )
          )
        );
      }
    }
  }
  const length = Math.abs(getArcLength(handleArc.center, handleArc.radius, a, b));
  if (length < MIN_ARROW_LENGTH / 2) {
    a.setTo(terminalsInArrowSpace.start);
    b.setTo(terminalsInArrowSpace.end);
  }
  if (startShapeInfo && endShapeInfo && startShapeInfo.shape !== endShapeInfo.shape && !startShapeInfo.isExact && !endShapeInfo.isExact) {
    const startAngle = Vec2d.Angle(handleArc.center, a);
    const endAngle = Vec2d.Angle(handleArc.center, b);
    const offset = handleArc.sweepFlag ? MIN_ARROW_LENGTH : -MIN_ARROW_LENGTH;
    const arcLength = getArcLength(handleArc.center, handleArc.radius, b, a);
    const {
      center: { x, y },
      radius
    } = handleArc;
    if (startShapeInfo && !startShapeInfo.didIntersect) {
      a.setTo(getPointOnCircle(x, y, radius, lerpAngles(startAngle, endAngle, offset / arcLength)));
    }
    if (endShapeInfo && !endShapeInfo.didIntersect) {
      b.setTo(getPointOnCircle(x, y, radius, lerpAngles(startAngle, endAngle, -offset / arcLength)));
    }
  }
  let midAngle = lerpAngles(Vec2d.Angle(handleArc.center, a), Vec2d.Angle(handleArc.center, b), 0.5);
  let midPoint = getPointOnCircle(
    handleArc.center.x,
    handleArc.center.y,
    handleArc.radius,
    midAngle
  );
  if (+Vec2d.Clockwise(a, midPoint, b) !== handleArc.sweepFlag) {
    midAngle += PI;
    midPoint = getPointOnCircle(handleArc.center.x, handleArc.center.y, handleArc.radius, midAngle);
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
  return new Vec2d(center.x + radius * Math.cos(angle), center.y + radius * Math.sin(angle));
}
function getArcBoundingBox(center, radius, start, size) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const startAngle = Vec2d.Angle(center, start);
  for (let i = 0; i < 20; i++) {
    const angle = startAngle + size * (i / 19);
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);
    minX = Math.min(x, minX);
    minY = Math.min(y, minY);
    maxX = Math.max(x, maxX);
    maxY = Math.max(y, maxY);
  }
  return new Box2d(minX, minY, maxX - minX, maxY - minY);
}
function getArcInfo(a, b, c) {
  const u = -2 * (a.x * (b.y - c.y) - a.y * (b.x - c.x) + b.x * c.y - c.x * b.y);
  const center = {
    x: ((a.x * a.x + a.y * a.y) * (c.y - b.y) + (b.x * b.x + b.y * b.y) * (a.y - c.y) + (c.x * c.x + c.y * c.y) * (b.y - a.y)) / u,
    y: ((a.x * a.x + a.y * a.y) * (b.x - c.x) + (b.x * b.x + b.y * b.y) * (c.x - a.x) + (c.x * c.x + c.y * c.y) * (a.x - b.x)) / u
  };
  const radius = Vec2d.Dist(center, a);
  const sweepFlag = +Vec2d.Clockwise(a, c, b);
  const ab = Math.hypot(a.y - b.y, a.x - b.x);
  const bc = Math.hypot(b.y - c.y, b.x - c.x);
  const ca = Math.hypot(c.y - a.y, c.x - a.x);
  const theta = Math.acos((bc * bc + ca * ca - ab * ab) / (2 * bc * ca)) * 2;
  const largeArcFlag = +(PI > theta);
  const size = (PI2 - theta) * (sweepFlag ? 1 : -1);
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
export {
  getArcBoundingBox,
  getArcInfo,
  getCurvedArrowHandlePath,
  getCurvedArrowInfo,
  getPointOnArc,
  getSolidCurvedArrowPath
};
//# sourceMappingURL=curved-arrow.mjs.map
