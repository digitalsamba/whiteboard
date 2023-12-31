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
var LineShapeUtil_exports = {};
__export(LineShapeUtil_exports, {
  LineShapeUtil: () => LineShapeUtil,
  getGeometryForLineShape: () => getGeometryForLineShape
});
module.exports = __toCommonJS(LineShapeUtil_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_ShapeFill = require("../shared/ShapeFill");
var import_default_shape_constants = require("../shared/default-shape-constants");
var import_getPerfectDashProps = require("../shared/getPerfectDashProps");
var import_polygon_helpers = require("../shared/polygon-helpers");
var import_getLinePath = require("./components/getLinePath");
var import_svg = require("./components/svg");
const handlesCache = new import_editor.WeakMapCache();
class LineShapeUtil extends import_editor.ShapeUtil {
  static type = "line";
  static props = import_editor.lineShapeProps;
  static migrations = import_editor.lineShapeMigrations;
  hideResizeHandles = () => true;
  hideRotateHandle = () => true;
  hideSelectionBoundsFg = () => true;
  hideSelectionBoundsBg = () => true;
  getDefaultProps() {
    return {
      dash: "draw",
      size: "m",
      color: "black",
      spline: "line",
      handles: {
        start: {
          id: "start",
          type: "vertex",
          canBind: false,
          canSnap: true,
          index: "a1",
          x: 0,
          y: 0
        },
        end: {
          id: "end",
          type: "vertex",
          canBind: false,
          canSnap: true,
          index: "a2",
          x: 0,
          y: 0
        }
      }
    };
  }
  getGeometry(shape) {
    return getGeometryForLineShape(shape);
  }
  getHandles(shape) {
    return handlesCache.get(shape.props, () => {
      const handles = shape.props.handles;
      const spline = getGeometryForLineShape(shape);
      const sortedHandles = Object.values(handles).sort(import_editor.sortByIndex);
      const results = sortedHandles.slice();
      for (let i = 0; i < spline.segments.length; i++) {
        const segment = spline.segments[i];
        const point = segment.midPoint();
        const index = (0, import_editor.getIndexBetween)(sortedHandles[i].index, sortedHandles[i + 1].index);
        results.push({
          id: `mid-${i}`,
          type: "create",
          index,
          x: point.x,
          y: point.y
        });
      }
      return results.sort(import_editor.sortByIndex);
    });
  }
  getOutlineSegments(shape) {
    const spline = this.editor.getShapeGeometry(shape);
    return spline.segments.map((s) => s.vertices);
  }
  //   Events
  onResize = (shape, info) => {
    const { scaleX, scaleY } = info;
    const handles = (0, import_editor.deepCopy)(shape.props.handles);
    Object.values(shape.props.handles).forEach(({ id, x, y }) => {
      handles[id].x = x * scaleX;
      handles[id].y = y * scaleY;
    });
    return {
      props: {
        handles
      }
    };
  };
  onHandleChange = (shape, { handle }) => {
    const next = (0, import_editor.deepCopy)(shape);
    switch (handle.id) {
      case "start":
      case "end": {
        next.props.handles[handle.id] = {
          ...next.props.handles[handle.id],
          x: handle.x,
          y: handle.y
        };
        break;
      }
      default: {
        const id = "handle:" + handle.index;
        const existing = shape.props.handles[id];
        if (existing) {
          next.props.handles[id] = {
            ...existing,
            x: handle.x,
            y: handle.y
          };
        } else {
          next.props.handles[id] = {
            id,
            type: "vertex",
            canBind: false,
            index: handle.index,
            x: handle.x,
            y: handle.y
          };
        }
        break;
      }
    }
    return next;
  };
  component(shape) {
    const theme = (0, import_ShapeFill.useDefaultColorTheme)();
    const spline = getGeometryForLineShape(shape);
    const strokeWidth = import_default_shape_constants.STROKE_SIZES[shape.props.size];
    const { dash, color } = shape.props;
    if (shape.props.spline === "line") {
      if (dash === "solid") {
        const outline = spline.points;
        const pathData = "M" + outline[0] + "L" + outline.slice(1);
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_editor.SVGContainer, { id: shape.id, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeFill.ShapeFill, { d: pathData, fill: "none", color, theme }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: pathData, stroke: theme[color].solid, strokeWidth, fill: "none" })
        ] });
      }
      if (dash === "dashed" || dash === "dotted") {
        const outline = spline.points;
        const pathData = "M" + outline[0] + "L" + outline.slice(1);
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_editor.SVGContainer, { id: shape.id, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeFill.ShapeFill, { d: pathData, fill: "none", color, theme }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { stroke: theme[color].solid, strokeWidth, children: spline.segments.map((segment, i) => {
            const { strokeDasharray, strokeDashoffset } = (0, import_getPerfectDashProps.getPerfectDashProps)(
              segment.length,
              strokeWidth,
              {
                style: dash,
                start: i > 0 ? "outset" : "none",
                end: i < spline.segments.length - 1 ? "outset" : "none"
              }
            );
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "path",
              {
                strokeDasharray,
                strokeDashoffset,
                d: (0, import_svg.getSvgPathForEdge)(segment, true),
                fill: "none"
              },
              i
            );
          }) })
        ] });
      }
      if (dash === "draw") {
        const outline = spline.points;
        const [innerPathData, outerPathData] = (0, import_polygon_helpers.getDrawLinePathData)(shape.id, outline, strokeWidth);
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_editor.SVGContainer, { id: shape.id, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeFill.ShapeFill, { d: innerPathData, fill: "none", color, theme }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: outerPathData,
              stroke: theme[color].solid,
              strokeWidth,
              fill: "none"
            }
          )
        ] });
      }
    }
    if (shape.props.spline === "cubic") {
      const splinePath = (0, import_svg.getSvgPathForLineGeometry)(spline);
      if (dash === "solid") {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_editor.SVGContainer, { id: shape.id, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeFill.ShapeFill, { d: splinePath, fill: "none", color, theme }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              strokeWidth,
              stroke: theme[color].solid,
              fill: "none",
              d: splinePath
            }
          )
        ] });
      }
      if (dash === "dashed" || dash === "dotted") {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_editor.SVGContainer, { id: shape.id, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeFill.ShapeFill, { d: splinePath, fill: "none", color, theme }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { stroke: theme[color].solid, strokeWidth, children: spline.segments.map((segment, i) => {
            const { strokeDasharray, strokeDashoffset } = (0, import_getPerfectDashProps.getPerfectDashProps)(
              segment.length,
              strokeWidth,
              {
                style: dash,
                start: i > 0 ? "outset" : "none",
                end: i < spline.segments.length - 1 ? "outset" : "none"
              }
            );
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "path",
              {
                strokeDasharray,
                strokeDashoffset,
                d: (0, import_svg.getSvgPathForBezierCurve)(segment, true),
                fill: "none"
              },
              i
            );
          }) })
        ] });
      }
      if (dash === "draw") {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_editor.SVGContainer, { id: shape.id, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeFill.ShapeFill, { d: splinePath, fill: "none", color, theme }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: (0, import_getLinePath.getLineDrawPath)(shape, spline, strokeWidth),
              strokeWidth: 1,
              stroke: theme[color].solid,
              fill: theme[color].solid
            }
          )
        ] });
      }
    }
  }
  indicator(shape) {
    const strokeWidth = import_default_shape_constants.STROKE_SIZES[shape.props.size];
    const spline = getGeometryForLineShape(shape);
    const { dash } = shape.props;
    let path;
    if (shape.props.spline === "line") {
      const outline = spline.points;
      if (dash === "solid" || dash === "dotted" || dash === "dashed") {
        path = "M" + outline[0] + "L" + outline.slice(1);
      } else {
        const [innerPathData] = (0, import_polygon_helpers.getDrawLinePathData)(shape.id, outline, strokeWidth);
        path = innerPathData;
      }
    } else {
      path = (0, import_getLinePath.getLineIndicatorPath)(shape, spline, strokeWidth);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: path });
  }
  toSvg(shape) {
    const theme = (0, import_editor.getDefaultColorTheme)({ isDarkMode: this.editor.user.isDarkMode });
    const color = theme[shape.props.color].solid;
    const spline = getGeometryForLineShape(shape);
    const strokeWidth = import_default_shape_constants.STROKE_SIZES[shape.props.size];
    switch (shape.props.dash) {
      case "draw": {
        let pathData;
        if (spline instanceof import_editor.CubicSpline2d) {
          pathData = (0, import_getLinePath.getLineDrawPath)(shape, spline, strokeWidth);
        } else {
          const [_, outerPathData] = (0, import_polygon_helpers.getDrawLinePathData)(shape.id, spline.points, strokeWidth);
          pathData = outerPathData;
        }
        const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
        p.setAttribute("stroke-width", strokeWidth + "px");
        p.setAttribute("stroke", color);
        p.setAttribute("fill", "none");
        p.setAttribute("d", pathData);
        return p;
      }
      case "solid": {
        let pathData;
        if (spline instanceof import_editor.CubicSpline2d) {
          pathData = (0, import_svg.getSvgPathForCubicSpline)(spline, false);
        } else {
          const outline = spline.points;
          pathData = "M" + outline[0] + "L" + outline.slice(1);
        }
        const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
        p.setAttribute("stroke-width", strokeWidth + "px");
        p.setAttribute("stroke", color);
        p.setAttribute("fill", "none");
        p.setAttribute("d", pathData);
        return p;
      }
      default: {
        const { segments } = spline;
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("stroke", color);
        g.setAttribute("stroke-width", strokeWidth.toString());
        const fn = spline instanceof import_editor.CubicSpline2d ? import_svg.getSvgPathForBezierCurve : import_svg.getSvgPathForEdge;
        segments.forEach((segment, i) => {
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          const { strokeDasharray, strokeDashoffset } = (0, import_getPerfectDashProps.getPerfectDashProps)(
            segment.length,
            strokeWidth,
            {
              style: shape.props.dash,
              start: i > 0 ? "outset" : "none",
              end: i < segments.length - 1 ? "outset" : "none"
            }
          );
          path.setAttribute("stroke-dasharray", strokeDasharray.toString());
          path.setAttribute("stroke-dashoffset", strokeDashoffset.toString());
          path.setAttribute("d", fn(segment, true));
          path.setAttribute("fill", "none");
          g.appendChild(path);
        });
        return g;
      }
    }
  }
}
function getGeometryForLineShape(shape) {
  const { spline, handles } = shape.props;
  const handlePoints = Object.values(handles).sort(import_editor.sortByIndex).map(import_editor.Vec2d.From);
  switch (spline) {
    case "cubic": {
      return new import_editor.CubicSpline2d({ points: handlePoints });
    }
    case "line": {
      return new import_editor.Polyline2d({ points: handlePoints });
    }
  }
}
//# sourceMappingURL=LineShapeUtil.js.map
