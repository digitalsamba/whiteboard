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
var HighlightShapeUtil_exports = {};
__export(HighlightShapeUtil_exports, {
  HighlightShapeUtil: () => HighlightShapeUtil
});
module.exports = __toCommonJS(HighlightShapeUtil_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_getPath = require("../draw/getPath");
var import_ShapeFill = require("../shared/ShapeFill");
var import_default_shape_constants = require("../shared/default-shape-constants");
var import_getStrokePoints = require("../shared/freehand/getStrokePoints");
var import_svg = require("../shared/freehand/svg");
var import_useColorSpace = require("../shared/useColorSpace");
var import_useForceSolid = require("../shared/useForceSolid");
const OVERLAY_OPACITY = 0.35;
const UNDERLAY_OPACITY = 0.82;
class HighlightShapeUtil extends import_editor.ShapeUtil {
  static type = "highlight";
  static props = import_editor.highlightShapeProps;
  static migrations = import_editor.highlightShapeMigrations;
  hideResizeHandles = (shape) => getIsDot(shape);
  hideRotateHandle = (shape) => getIsDot(shape);
  hideSelectionBoundsFg = (shape) => getIsDot(shape);
  getDefaultProps() {
    return {
      segments: [],
      color: "black",
      size: "m",
      isComplete: false,
      isPen: false
    };
  }
  getGeometry(shape) {
    if (getIsDot(shape)) {
      const strokeWidth = getStrokeWidth(shape);
      return new import_editor.Circle2d({
        x: -strokeWidth / 2,
        y: -strokeWidth / 2,
        radius: strokeWidth / 2,
        isFilled: true
      });
    }
    return new import_editor.Polyline2d({
      points: (0, import_getPath.getPointsFromSegments)(shape.props.segments)
    });
  }
  component(shape) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      HighlightRenderer,
      {
        strokeWidth: getStrokeWidth(shape),
        shape,
        opacity: OVERLAY_OPACITY
      }
    );
  }
  backgroundComponent(shape) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      HighlightRenderer,
      {
        strokeWidth: getStrokeWidth(shape),
        shape,
        opacity: UNDERLAY_OPACITY
      }
    );
  }
  indicator(shape) {
    const forceSolid = (0, import_useForceSolid.useForceSolid)();
    const strokeWidth = getStrokeWidth(shape);
    const allPointsFromSegments = (0, import_getPath.getPointsFromSegments)(shape.props.segments);
    let sw = strokeWidth;
    if (!forceSolid && !shape.props.isPen && allPointsFromSegments.length === 1) {
      sw += (0, import_editor.rng)(shape.id)() * (strokeWidth / 6);
    }
    const showAsComplete = shape.props.isComplete || (0, import_editor.last)(shape.props.segments)?.type === "straight";
    const options = (0, import_getPath.getHighlightFreehandSettings)({
      strokeWidth,
      showAsComplete,
      isPen: shape.props.isPen
    });
    const strokePoints = (0, import_getStrokePoints.getStrokePoints)(allPointsFromSegments, options);
    let strokePath;
    if (strokePoints.length < 2) {
      strokePath = getIndicatorDot(allPointsFromSegments[0], sw);
    } else {
      strokePath = (0, import_svg.getSvgPathFromStrokePoints)(strokePoints, false);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: strokePath });
  }
  expandSelectionOutlinePx(shape) {
    return getStrokeWidth(shape) / 2;
  }
  toSvg(shape) {
    const theme = (0, import_editor.getDefaultColorTheme)({ isDarkMode: this.editor.user.isDarkMode });
    return highlighterToSvg(getStrokeWidth(shape), shape, OVERLAY_OPACITY, theme);
  }
  toBackgroundSvg(shape) {
    const theme = (0, import_editor.getDefaultColorTheme)({ isDarkMode: this.editor.user.isDarkMode });
    return highlighterToSvg(getStrokeWidth(shape), shape, UNDERLAY_OPACITY, theme);
  }
  onResize = (shape, info) => {
    const { scaleX, scaleY } = info;
    const newSegments = [];
    for (const segment of shape.props.segments) {
      newSegments.push({
        ...segment,
        points: segment.points.map(({ x, y, z }) => {
          return {
            x: scaleX * x,
            y: scaleY * y,
            z
          };
        })
      });
    }
    return {
      props: {
        segments: newSegments
      }
    };
  };
}
function getShapeDot(point) {
  const r = 0.1;
  return `M ${point.x} ${point.y} m -${r}, 0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
}
function getIndicatorDot(point, sw) {
  const r = sw / 2;
  return `M ${point.x} ${point.y} m -${r}, 0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
}
function getHighlightSvgPath(shape, strokeWidth, forceSolid) {
  const allPointsFromSegments = (0, import_getPath.getPointsFromSegments)(shape.props.segments);
  const showAsComplete = shape.props.isComplete || (0, import_editor.last)(shape.props.segments)?.type === "straight";
  let sw = strokeWidth;
  if (!forceSolid && !shape.props.isPen && allPointsFromSegments.length === 1) {
    sw += (0, import_editor.rng)(shape.id)() * (strokeWidth / 6);
  }
  const options = (0, import_getPath.getHighlightFreehandSettings)({
    strokeWidth: sw,
    showAsComplete,
    isPen: shape.props.isPen
  });
  const strokePoints = (0, import_getStrokePoints.getStrokePoints)(allPointsFromSegments, options);
  const solidStrokePath = strokePoints.length > 1 ? (0, import_svg.getSvgPathFromStrokePoints)(strokePoints, false) : getShapeDot(allPointsFromSegments[0]);
  return { solidStrokePath, sw };
}
function HighlightRenderer({
  strokeWidth,
  shape,
  opacity
}) {
  const theme = (0, import_ShapeFill.useDefaultColorTheme)();
  const forceSolid = (0, import_useForceSolid.useForceSolid)();
  const { solidStrokePath, sw } = getHighlightSvgPath(shape, strokeWidth, forceSolid);
  const colorSpace = (0, import_useColorSpace.useColorSpace)();
  const color = theme[shape.props.color].highlight[colorSpace];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_editor.SVGContainer, { id: shape.id, style: { opacity }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      d: solidStrokePath,
      strokeLinecap: "round",
      fill: "none",
      pointerEvents: "all",
      stroke: color,
      strokeWidth: sw
    }
  ) });
}
function highlighterToSvg(strokeWidth, shape, opacity, theme) {
  const { solidStrokePath, sw } = getHighlightSvgPath(shape, strokeWidth, false);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", solidStrokePath);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", theme[shape.props.color].highlight.srgb);
  path.setAttribute("stroke-width", `${sw}`);
  path.setAttribute("opacity", `${opacity}`);
  return path;
}
function getStrokeWidth(shape) {
  return import_default_shape_constants.FONT_SIZES[shape.props.size] * 1.12;
}
function getIsDot(shape) {
  return shape.props.segments.length === 1 && shape.props.segments[0].points.length < 2;
}
//# sourceMappingURL=HighlightShapeUtil.js.map
