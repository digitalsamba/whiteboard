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
var straight_arrow_exports = {};
__export(straight_arrow_exports, {
  getSolidStraightArrowPath: () => getSolidStraightArrowPath,
  getStraightArrowBoundingBox: () => getStraightArrowBoundingBox,
  getStraightArrowHandlePath: () => getStraightArrowHandlePath,
  getStraightArrowInfo: () => getStraightArrowInfo
});
module.exports = __toCommonJS(straight_arrow_exports);
var import_Box2d = require("../../../../primitives/Box2d");
var import_Matrix2d = require("../../../../primitives/Matrix2d");
var import_Vec2d = require("../../../../primitives/Vec2d");
var import_intersect = require("../../../../primitives/intersect");
var import_shared = require("./shared");
function getStraightArrowInfo(editor, shape) {
  const { start, end, arrowheadStart, arrowheadEnd } = shape.props;
  const terminalsInArrowSpace = (0, import_shared.getArrowTerminalsInArrowSpace)(editor, shape);
  const a = terminalsInArrowSpace.start.clone();
  const b = terminalsInArrowSpace.end.clone();
  const c = import_Vec2d.Vec2d.Med(a, b);
  const uAB = import_Vec2d.Vec2d.Sub(b, a).uni();
  const startShapeInfo = (0, import_shared.getBoundShapeInfoForTerminal)(editor, start);
  const endShapeInfo = (0, import_shared.getBoundShapeInfoForTerminal)(editor, end);
  const arrowPageTransform = editor.getShapePageTransform(shape);
  updateArrowheadPointWithBoundShape(
    b,
    // <-- will be mutated
    terminalsInArrowSpace.start,
    arrowPageTransform,
    endShapeInfo
  );
  updateArrowheadPointWithBoundShape(
    a,
    // <-- will be mutated
    terminalsInArrowSpace.end,
    arrowPageTransform,
    startShapeInfo
  );
  let minDist = import_shared.MIN_ARROW_LENGTH;
  const isSelfIntersection = startShapeInfo && endShapeInfo && startShapeInfo.shape === endShapeInfo.shape;
  if (startShapeInfo && endShapeInfo && !isSelfIntersection && !startShapeInfo.isExact && !endShapeInfo.isExact) {
    if (endShapeInfo.didIntersect && !startShapeInfo.didIntersect) {
      if (startShapeInfo.isClosed) {
        a.setTo(import_Vec2d.Vec2d.Nudge(b, a, minDist));
      }
    } else if (!endShapeInfo.didIntersect) {
      if (endShapeInfo.isClosed) {
        b.setTo(import_Vec2d.Vec2d.Nudge(a, b, minDist));
      }
    }
  }
  const u = import_Vec2d.Vec2d.Sub(b, a).uni();
  const didFlip = !import_Vec2d.Vec2d.Equals(u, uAB);
  if (!isSelfIntersection) {
    if (startShapeInfo && arrowheadStart !== "none" && !startShapeInfo.isExact) {
      const offset = import_shared.BOUND_ARROW_OFFSET + import_shared.STROKE_SIZES[shape.props.size] / 2 + ("size" in startShapeInfo.shape.props ? import_shared.STROKE_SIZES[startShapeInfo.shape.props.size] / 2 : 0);
      minDist -= offset;
      a.nudge(b, offset * (didFlip ? -1 : 1));
    }
    if (endShapeInfo && arrowheadEnd !== "none" && !endShapeInfo.isExact) {
      const offset = import_shared.BOUND_ARROW_OFFSET + import_shared.STROKE_SIZES[shape.props.size] / 2 + ("size" in endShapeInfo.shape.props ? import_shared.STROKE_SIZES[endShapeInfo.shape.props.size] / 2 : 0);
      minDist -= offset;
      b.nudge(a, offset * (didFlip ? -1 : 1));
    }
  }
  if (startShapeInfo && endShapeInfo) {
    if (didFlip) {
      b.setTo(import_Vec2d.Vec2d.Add(a, u.mul(-minDist)));
    } else if (import_Vec2d.Vec2d.Dist(a, b) < import_shared.MIN_ARROW_LENGTH / 2) {
      b.setTo(import_Vec2d.Vec2d.Add(a, u.mul(import_shared.MIN_ARROW_LENGTH / 2)));
    }
  }
  if (didFlip) {
    c.setTo(import_Vec2d.Vec2d.Med(terminalsInArrowSpace.start, terminalsInArrowSpace.end));
  } else {
    c.setTo(import_Vec2d.Vec2d.Med(a, b));
  }
  const length = import_Vec2d.Vec2d.Dist(a, b);
  return {
    isStraight: true,
    start: {
      handle: terminalsInArrowSpace.start,
      point: a,
      arrowhead: shape.props.arrowheadStart
    },
    end: {
      handle: terminalsInArrowSpace.end,
      point: b,
      arrowhead: shape.props.arrowheadEnd
    },
    middle: c,
    isValid: length > 0,
    length
  };
}
function updateArrowheadPointWithBoundShape(point, opposite, arrowPageTransform, targetShapeInfo) {
  if (targetShapeInfo === void 0) {
    return;
  }
  if (targetShapeInfo.isExact) {
    return;
  }
  const pageFrom = import_Matrix2d.Matrix2d.applyToPoint(arrowPageTransform, opposite);
  const pageTo = import_Matrix2d.Matrix2d.applyToPoint(arrowPageTransform, point);
  const targetFrom = import_Matrix2d.Matrix2d.applyToPoint(import_Matrix2d.Matrix2d.Inverse(targetShapeInfo.transform), pageFrom);
  const targetTo = import_Matrix2d.Matrix2d.applyToPoint(import_Matrix2d.Matrix2d.Inverse(targetShapeInfo.transform), pageTo);
  const isClosed = targetShapeInfo.isClosed;
  const fn = isClosed ? import_intersect.intersectLineSegmentPolygon : import_intersect.intersectLineSegmentPolyline;
  const intersection = fn(targetFrom, targetTo, targetShapeInfo.outline);
  let targetInt;
  if (intersection !== null) {
    targetInt = intersection.sort((p1, p2) => import_Vec2d.Vec2d.Dist(p1, targetFrom) - import_Vec2d.Vec2d.Dist(p2, targetFrom))[0] ?? (isClosed ? void 0 : targetTo);
  }
  if (targetInt === void 0) {
    return;
  }
  const pageInt = import_Matrix2d.Matrix2d.applyToPoint(targetShapeInfo.transform, targetInt);
  const arrowInt = import_Matrix2d.Matrix2d.applyToPoint(import_Matrix2d.Matrix2d.Inverse(arrowPageTransform), pageInt);
  point.setTo(arrowInt);
  targetShapeInfo.didIntersect = true;
}
function getStraightArrowHandlePath(info) {
  return getArrowPath(info.start.handle, info.end.handle);
}
function getSolidStraightArrowPath(info) {
  return getArrowPath(info.start.point, info.end.point);
}
function getArrowPath(start, end) {
  return `M${start.x},${start.y}L${end.x},${end.y}`;
}
function getStraightArrowBoundingBox(start, end) {
  return new import_Box2d.Box2d(
    Math.min(start.x, end.x),
    Math.min(start.y, end.y),
    Math.abs(start.x - end.x),
    Math.abs(start.y - end.y)
  );
}
//# sourceMappingURL=straight-arrow.js.map
