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
var getPath_exports = {};
__export(getPath_exports, {
  getDrawShapeStrokeDashArray: () => getDrawShapeStrokeDashArray,
  getFreehandOptions: () => getFreehandOptions,
  getHighlightFreehandSettings: () => getHighlightFreehandSettings,
  getPointsFromSegments: () => getPointsFromSegments
});
module.exports = __toCommonJS(getPath_exports);
var import_editor = require("@tldraw/editor");
const PEN_EASING = (t) => t * 0.65 + (0, import_editor.SIN)(t * import_editor.PI / 2) * 0.35;
const simulatePressureSettings = (strokeWidth) => {
  return {
    size: 1 + strokeWidth,
    thinning: 0.5,
    streamline: 0.62 + (1 + strokeWidth) / 8 * 0.06,
    smoothing: 0.62,
    easing: import_editor.EASINGS.easeOutSine,
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
    easing: import_editor.EASINGS.linear
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
    easing: isPen ? PEN_EASING : import_editor.EASINGS.easeOutSine,
    last: showAsComplete
  };
}
function getFreehandOptions(shapeProps, strokeWidth, forceComplete, forceSolid) {
  return {
    ...forceSolid ? solidSettings(strokeWidth) : shapeProps.dash === "draw" ? shapeProps.isPen ? realPressureSettings(strokeWidth) : simulatePressureSettings(strokeWidth) : solidSettings(strokeWidth),
    last: shapeProps.isComplete || forceComplete
  };
}
function getPointsFromSegments(segments) {
  const points = [];
  for (const segment of segments) {
    if (segment.type === "free" || segment.points.length < 2) {
      points.push(...segment.points.map(import_editor.Vec2d.Cast));
    } else {
      const pointsToInterpolate = Math.max(
        4,
        Math.floor(import_editor.Vec2d.Dist(segment.points[0], segment.points[1]) / 16)
      );
      points.push(...import_editor.Vec2d.PointsBetween(segment.points[0], segment.points[1], pointsToInterpolate));
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
//# sourceMappingURL=getPath.js.map
