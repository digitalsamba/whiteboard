import {
  EASINGS,
  PI,
  SIN,
  Vec2d
} from "@tldraw/editor";
const PEN_EASING = (t) => t * 0.65 + SIN(t * PI / 2) * 0.35;
const simulatePressureSettings = (strokeWidth) => {
  return {
    size: 1 + strokeWidth,
    thinning: 0.5,
    streamline: 0.62 + (1 + strokeWidth) / 8 * 0.06,
    smoothing: 0.62,
    easing: EASINGS.easeOutSine,
    simulatePressure: true
  };
};
const realPressureSettings = (strokeWidth) => {
  return {
    size: 1 + strokeWidth * 1.2,
    thinning: 0.62,
    streamline: 0.62,
    smoothing: 0.62,
    simulatePressure: false,
    easing: PEN_EASING
  };
};
const solidSettings = (strokeWidth) => {
  return {
    size: 1 + strokeWidth,
    thinning: 0,
    streamline: 0.62 + (1 + strokeWidth) / 8 * 0.06,
    smoothing: 0.62,
    simulatePressure: false,
    easing: EASINGS.linear
  };
};
function getHighlightFreehandSettings({
  strokeWidth,
  showAsComplete,
  isPen
}) {
  return {
    size: 1 + strokeWidth,
    thinning: 0.1,
    streamline: 0.5,
    smoothing: 0.5,
    simulatePressure: !isPen,
    easing: isPen ? PEN_EASING : EASINGS.easeOutSine,
    last: showAsComplete
  };
}
function getFreehandOptions(shapeProps, strokeWidth, forceComplete, forceSolid) {
  return {
    ...(forceSolid ? solidSettings(strokeWidth) : shapeProps.dash === "draw" ? shapeProps.isPen ? realPressureSettings(strokeWidth) : simulatePressureSettings(strokeWidth) : solidSettings(strokeWidth)),
    last: shapeProps.isComplete || forceComplete
  };
}
function getPointsFromSegments(segments) {
  const points = [];
  for (const segment of segments) {
    if (segment.type === "free" || segment.points.length < 2) {
      points.push(...segment.points.map(Vec2d.Cast));
    } else {
      const pointsToInterpolate = Math.max(
        4,
        Math.floor(Vec2d.Dist(segment.points[0], segment.points[1]) / 16)
      );
      points.push(...Vec2d.PointsBetween(segment.points[0], segment.points[1], pointsToInterpolate));
    }
  }
  return points;
}
function getDrawShapeStrokeDashArray(shape, strokeWidth) {
  return {
    draw: "none",
    solid: `none`,
    dotted: `0.1 ${strokeWidth * 2}`,
    dashed: `${strokeWidth * 2} ${strokeWidth * 2}`
  }[shape.props.dash];
}
export {
  getDrawShapeStrokeDashArray,
  getFreehandOptions,
  getHighlightFreehandSettings,
  getPointsFromSegments
};
//# sourceMappingURL=getPath.mjs.map
