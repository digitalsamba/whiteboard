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
var DrawShapeUtil_exports = {};
__export(DrawShapeUtil_exports, {
  DrawShapeUtil: () => DrawShapeUtil
});
module.exports = __toCommonJS(DrawShapeUtil_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_ShapeFill = require("../shared/ShapeFill");
var import_default_shape_constants = require("../shared/default-shape-constants");
var import_defaultStyleDefs = require("../shared/defaultStyleDefs");
var import_getStrokeOutlinePoints = require("../shared/freehand/getStrokeOutlinePoints");
var import_getStrokePoints = require("../shared/freehand/getStrokePoints");
var import_setStrokePointRadii = require("../shared/freehand/setStrokePointRadii");
var import_svg = require("../shared/freehand/svg");
var import_useForceSolid = require("../shared/useForceSolid");
var import_getPath = require("./getPath");
class DrawShapeUtil extends import_editor.ShapeUtil {
  static type = "draw";
  static props = import_editor.drawShapeProps;
  static migrations = import_editor.drawShapeMigrations;
  hideResizeHandles = (shape) => getIsDot(shape);
  hideRotateHandle = (shape) => getIsDot(shape);
  hideSelectionBoundsFg = (shape) => getIsDot(shape);
  getDefaultProps() {
    return {
      segments: [],
      color: "black",
      fill: "none",
      dash: "draw",
      size: "m",
      isComplete: false,
      isClosed: false,
      isPen: false
    };
  }
  getGeometry(shape) {
    const points = (0, import_getPath.getPointsFromSegments)(shape.props.segments);
    const strokeWidth = import_default_shape_constants.STROKE_SIZES[shape.props.size];
    if (shape.props.segments.length === 1) {
      const box = import_editor.Box2d.FromPoints(points);
      if (box.width < strokeWidth * 2 && box.height < strokeWidth * 2) {
        return new import_editor.Circle2d({
          x: -strokeWidth,
          y: -strokeWidth,
          radius: strokeWidth,
          isFilled: true
        });
      }
    }
    const strokePoints = (0, import_getStrokePoints.getStrokePoints)(
      points,
      (0, import_getPath.getFreehandOptions)(shape.props, strokeWidth, true, true)
    ).map((p) => p.point);
    if (shape.props.isClosed) {
      return new import_editor.Polygon2d({
        points: strokePoints,
        isFilled: shape.props.fill !== "none"
      });
    }
    return new import_editor.Polyline2d({
      points: strokePoints
    });
  }
  component(shape) {
    const theme = (0, import_ShapeFill.useDefaultColorTheme)();
    const forceSolid = (0, import_useForceSolid.useForceSolid)();
    const strokeWidth = import_default_shape_constants.STROKE_SIZES[shape.props.size];
    const allPointsFromSegments = (0, import_getPath.getPointsFromSegments)(shape.props.segments);
    const showAsComplete = shape.props.isComplete || (0, import_editor.last)(shape.props.segments)?.type === "straight";
    let sw = strokeWidth;
    if (!forceSolid && !shape.props.isPen && shape.props.dash === "draw" && allPointsFromSegments.length === 1) {
      sw += (0, import_editor.rng)(shape.id)() * (strokeWidth / 6);
    }
    const options = (0, import_getPath.getFreehandOptions)(shape.props, sw, showAsComplete, forceSolid);
    const strokePoints = (0, import_getStrokePoints.getStrokePoints)(allPointsFromSegments, options);
    const solidStrokePath = strokePoints.length > 1 ? (0, import_svg.getSvgPathFromStrokePoints)(strokePoints, shape.props.isClosed) : getDot(allPointsFromSegments[0], sw);
    if (!forceSolid && shape.props.dash === "draw" || strokePoints.length < 2) {
      (0, import_setStrokePointRadii.setStrokePointRadii)(strokePoints, options);
      const strokeOutlinePoints = (0, import_getStrokeOutlinePoints.getStrokeOutlinePoints)(strokePoints, options);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_editor.SVGContainer, { id: shape.id, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_ShapeFill.ShapeFill,
          {
            theme,
            fill: shape.props.isClosed ? shape.props.fill : "none",
            color: shape.props.color,
            d: solidStrokePath
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: (0, import_editor.getSvgPathFromPoints)(strokeOutlinePoints, true),
            strokeLinecap: "round",
            fill: theme[shape.props.color].solid
          }
        )
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_editor.SVGContainer, { id: shape.id, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_ShapeFill.ShapeFill,
        {
          theme,
          color: shape.props.color,
          fill: shape.props.isClosed ? shape.props.fill : "none",
          d: solidStrokePath
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: solidStrokePath,
          strokeLinecap: "round",
          fill: "none",
          stroke: theme[shape.props.color].solid,
          strokeWidth,
          strokeDasharray: (0, import_getPath.getDrawShapeStrokeDashArray)(shape, strokeWidth),
          strokeDashoffset: "0"
        }
      )
    ] });
  }
  indicator(shape) {
    const forceSolid = (0, import_useForceSolid.useForceSolid)();
    const strokeWidth = import_default_shape_constants.STROKE_SIZES[shape.props.size];
    const allPointsFromSegments = (0, import_getPath.getPointsFromSegments)(shape.props.segments);
    let sw = strokeWidth;
    if (!forceSolid && !shape.props.isPen && shape.props.dash === "draw" && allPointsFromSegments.length === 1) {
      sw += (0, import_editor.rng)(shape.id)() * (strokeWidth / 6);
    }
    const showAsComplete = shape.props.isComplete || (0, import_editor.last)(shape.props.segments)?.type === "straight";
    const options = (0, import_getPath.getFreehandOptions)(shape.props, sw, showAsComplete, true);
    const strokePoints = (0, import_getStrokePoints.getStrokePoints)(allPointsFromSegments, options);
    const solidStrokePath = strokePoints.length > 1 ? (0, import_svg.getSvgPathFromStrokePoints)(strokePoints, shape.props.isClosed) : getDot(allPointsFromSegments[0], sw);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: solidStrokePath });
  }
  toSvg(shape, ctx) {
    const theme = (0, import_editor.getDefaultColorTheme)({ isDarkMode: this.editor.user.isDarkMode });
    ctx.addExportDef((0, import_defaultStyleDefs.getFillDefForExport)(shape.props.fill, theme));
    const { color } = shape.props;
    const strokeWidth = import_default_shape_constants.STROKE_SIZES[shape.props.size];
    const allPointsFromSegments = (0, import_getPath.getPointsFromSegments)(shape.props.segments);
    const showAsComplete = shape.props.isComplete || (0, import_editor.last)(shape.props.segments)?.type === "straight";
    let sw = strokeWidth;
    if (!shape.props.isPen && shape.props.dash === "draw" && allPointsFromSegments.length === 1) {
      sw += (0, import_editor.rng)(shape.id)() * (strokeWidth / 6);
    }
    const options = (0, import_getPath.getFreehandOptions)(shape.props, sw, showAsComplete, false);
    const strokePoints = (0, import_getStrokePoints.getStrokePoints)(allPointsFromSegments, options);
    const solidStrokePath = strokePoints.length > 1 ? (0, import_svg.getSvgPathFromStrokePoints)(strokePoints, shape.props.isClosed) : getDot(allPointsFromSegments[0], sw);
    let foregroundPath;
    if (shape.props.dash === "draw" || strokePoints.length < 2) {
      (0, import_setStrokePointRadii.setStrokePointRadii)(strokePoints, options);
      const strokeOutlinePoints = (0, import_getStrokeOutlinePoints.getStrokeOutlinePoints)(strokePoints, options);
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", (0, import_editor.getSvgPathFromPoints)(strokeOutlinePoints, true));
      p.setAttribute("fill", theme[color].solid);
      p.setAttribute("stroke-linecap", "round");
      foregroundPath = p;
    } else {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", solidStrokePath);
      p.setAttribute("stroke", theme[color].solid);
      p.setAttribute("fill", "none");
      p.setAttribute("stroke-linecap", "round");
      p.setAttribute("stroke-width", strokeWidth.toString());
      p.setAttribute("stroke-dasharray", (0, import_getPath.getDrawShapeStrokeDashArray)(shape, strokeWidth));
      p.setAttribute("stroke-dashoffset", "0");
      foregroundPath = p;
    }
    const fillPath = (0, import_ShapeFill.getShapeFillSvg)({
      fill: shape.props.isClosed ? shape.props.fill : "none",
      d: solidStrokePath,
      color: shape.props.color,
      theme
    });
    if (fillPath) {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.appendChild(fillPath);
      g.appendChild(foregroundPath);
      return g;
    }
    return foregroundPath;
  }
  getCanvasSvgDefs() {
    return [(0, import_defaultStyleDefs.getFillDefForCanvas)()];
  }
  onResize = (shape, info) => {
    const { scaleX, scaleY } = info;
    const newSegments = [];
    for (const segment of shape.props.segments) {
      newSegments.push({
        ...segment,
        points: segment.points.map(({ x, y, z }) => {
          return {
            x: (0, import_editor.toFixed)(scaleX * x),
            y: (0, import_editor.toFixed)(scaleY * y),
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
  expandSelectionOutlinePx(shape) {
    const multiplier = shape.props.dash === "draw" ? 1.6 : 1;
    return import_default_shape_constants.STROKE_SIZES[shape.props.size] * multiplier / 2;
  }
}
function getDot(point, sw) {
  const r = (sw + 1) * 0.5;
  return `M ${point.x} ${point.y} m -${r}, 0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
}
function getIsDot(shape) {
  return shape.props.segments.length === 1 && shape.props.segments[0].points.length < 2;
}
//# sourceMappingURL=DrawShapeUtil.js.map
