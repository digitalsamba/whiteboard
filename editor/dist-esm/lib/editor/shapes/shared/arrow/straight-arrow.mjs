import { Box2d } from "../../../../primitives/Box2d.mjs";
import { Matrix2d } from "../../../../primitives/Matrix2d.mjs";
import { Vec2d } from "../../../../primitives/Vec2d.mjs";
import {
  intersectLineSegmentPolygon,
  intersectLineSegmentPolyline
} from "../../../../primitives/intersect.mjs";
import {
  BOUND_ARROW_OFFSET,
  MIN_ARROW_LENGTH,
  STROKE_SIZES,
  getArrowTerminalsInArrowSpace,
  getBoundShapeInfoForTerminal
} from "./shared.mjs";
function getStraightArrowInfo(editor, shape) {
  const { start, end, arrowheadStart, arrowheadEnd } = shape.props;
  const terminalsInArrowSpace = getArrowTerminalsInArrowSpace(editor, shape);
  const a = terminalsInArrowSpace.start.clone();
  const b = terminalsInArrowSpace.end.clone();
  const c = Vec2d.Med(a, b);
  const uAB = Vec2d.Sub(b, a).uni();
  const startShapeInfo = getBoundShapeInfoForTerminal(editor, start);
  const endShapeInfo = getBoundShapeInfoForTerminal(editor, end);
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
  let minDist = MIN_ARROW_LENGTH;
  const isSelfIntersection = startShapeInfo && endShapeInfo && startShapeInfo.shape === endShapeInfo.shape;
  if (startShapeInfo && endShapeInfo && !isSelfIntersection && !startShapeInfo.isExact && !endShapeInfo.isExact) {
    if (endShapeInfo.didIntersect && !startShapeInfo.didIntersect) {
      if (startShapeInfo.isClosed) {
        a.setTo(Vec2d.Nudge(b, a, minDist));
      }
    } else if (!endShapeInfo.didIntersect) {
      if (endShapeInfo.isClosed) {
        b.setTo(Vec2d.Nudge(a, b, minDist));
      }
    }
  }
  const u = Vec2d.Sub(b, a).uni();
  const didFlip = !Vec2d.Equals(u, uAB);
  if (!isSelfIntersection) {
    if (startShapeInfo && arrowheadStart !== "none" && !startShapeInfo.isExact) {
      const offset = BOUND_ARROW_OFFSET + STROKE_SIZES[shape.props.size] / 2 + ("size" in startShapeInfo.shape.props ? STROKE_SIZES[startShapeInfo.shape.props.size] / 2 : 0);
      minDist -= offset;
      a.nudge(b, offset * (didFlip ? -1 : 1));
    }
    if (endShapeInfo && arrowheadEnd !== "none" && !endShapeInfo.isExact) {
      const offset = BOUND_ARROW_OFFSET + STROKE_SIZES[shape.props.size] / 2 + ("size" in endShapeInfo.shape.props ? STROKE_SIZES[endShapeInfo.shape.props.size] / 2 : 0);
      minDist -= offset;
      b.nudge(a, offset * (didFlip ? -1 : 1));
    }
  }
  if (startShapeInfo && endShapeInfo) {
    if (didFlip) {
      b.setTo(Vec2d.Add(a, u.mul(-minDist)));
    } else if (Vec2d.Dist(a, b) < MIN_ARROW_LENGTH / 2) {
      b.setTo(Vec2d.Add(a, u.mul(MIN_ARROW_LENGTH / 2)));
    }
  }
  if (didFlip) {
    c.setTo(Vec2d.Med(terminalsInArrowSpace.start, terminalsInArrowSpace.end));
  } else {
    c.setTo(Vec2d.Med(a, b));
  }
  const length = Vec2d.Dist(a, b);
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
  const pageFrom = Matrix2d.applyToPoint(arrowPageTransform, opposite);
  const pageTo = Matrix2d.applyToPoint(arrowPageTransform, point);
  const targetFrom = Matrix2d.applyToPoint(Matrix2d.Inverse(targetShapeInfo.transform), pageFrom);
  const targetTo = Matrix2d.applyToPoint(Matrix2d.Inverse(targetShapeInfo.transform), pageTo);
  const isClosed = targetShapeInfo.isClosed;
  const fn = isClosed ? intersectLineSegmentPolygon : intersectLineSegmentPolyline;
  const intersection = fn(targetFrom, targetTo, targetShapeInfo.outline);
  let targetInt;
  if (intersection !== null) {
    targetInt = intersection.sort((p1, p2) => Vec2d.Dist(p1, targetFrom) - Vec2d.Dist(p2, targetFrom))[0] ?? (isClosed ? void 0 : targetTo);
  }
  if (targetInt === void 0) {
    return;
  }
  const pageInt = Matrix2d.applyToPoint(targetShapeInfo.transform, targetInt);
  const arrowInt = Matrix2d.applyToPoint(Matrix2d.Inverse(arrowPageTransform), pageInt);
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
  return new Box2d(
    Math.min(start.x, end.x),
    Math.min(start.y, end.y),
    Math.abs(start.x - end.x),
    Math.abs(start.y - end.y)
  );
}
export {
  getSolidStraightArrowPath,
  getStraightArrowBoundingBox,
  getStraightArrowHandlePath,
  getStraightArrowInfo
};
//# sourceMappingURL=straight-arrow.mjs.map
