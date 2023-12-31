import { jsx, jsxs } from "react/jsx-runtime";
import {
  CubicSpline2d,
  Polyline2d,
  SVGContainer,
  ShapeUtil,
  Vec2d,
  WeakMapCache,
  deepCopy,
  getDefaultColorTheme,
  getIndexBetween,
  lineShapeMigrations,
  lineShapeProps,
  sortByIndex
} from "@tldraw/editor";
import { ShapeFill, useDefaultColorTheme } from "../shared/ShapeFill.mjs";
import { STROKE_SIZES } from "../shared/default-shape-constants.mjs";
import { getPerfectDashProps } from "../shared/getPerfectDashProps.mjs";
import { getDrawLinePathData } from "../shared/polygon-helpers.mjs";
import { getLineDrawPath, getLineIndicatorPath } from "./components/getLinePath.mjs";
import {
  getSvgPathForBezierCurve,
  getSvgPathForCubicSpline,
  getSvgPathForEdge,
  getSvgPathForLineGeometry
} from "./components/svg.mjs";
const handlesCache = new WeakMapCache();
class LineShapeUtil extends ShapeUtil {
  static type = "line";
  static props = lineShapeProps;
  static migrations = lineShapeMigrations;
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
      const sortedHandles = Object.values(handles).sort(sortByIndex);
      const results = sortedHandles.slice();
      for (let i = 0; i < spline.segments.length; i++) {
        const segment = spline.segments[i];
        const point = segment.midPoint();
        const index = getIndexBetween(sortedHandles[i].index, sortedHandles[i + 1].index);
        results.push({
          id: `mid-${i}`,
          type: "create",
          index,
          x: point.x,
          y: point.y
        });
      }
      return results.sort(sortByIndex);
    });
  }
  getOutlineSegments(shape) {
    const spline = this.editor.getShapeGeometry(shape);
    return spline.segments.map((s) => s.vertices);
  }
  //   Events
  onResize = (shape, info) => {
    const { scaleX, scaleY } = info;
    const handles = deepCopy(shape.props.handles);
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
    const next = deepCopy(shape);
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
    const theme = useDefaultColorTheme();
    const spline = getGeometryForLineShape(shape);
    const strokeWidth = STROKE_SIZES[shape.props.size];
    const { dash, color } = shape.props;
    if (shape.props.spline === "line") {
      if (dash === "solid") {
        const outline = spline.points;
        const pathData = "M" + outline[0] + "L" + outline.slice(1);
        return /* @__PURE__ */ jsxs(SVGContainer, { id: shape.id, children: [
          /* @__PURE__ */ jsx(ShapeFill, { d: pathData, fill: "none", color, theme }),
          /* @__PURE__ */ jsx("path", { d: pathData, stroke: theme[color].solid, strokeWidth, fill: "none" })
        ] });
      }
      if (dash === "dashed" || dash === "dotted") {
        const outline = spline.points;
        const pathData = "M" + outline[0] + "L" + outline.slice(1);
        return /* @__PURE__ */ jsxs(SVGContainer, { id: shape.id, children: [
          /* @__PURE__ */ jsx(ShapeFill, { d: pathData, fill: "none", color, theme }),
          /* @__PURE__ */ jsx("g", { stroke: theme[color].solid, strokeWidth, children: spline.segments.map((segment, i) => {
            const { strokeDasharray, strokeDashoffset } = getPerfectDashProps(
              segment.length,
              strokeWidth,
              {
                style: dash,
                start: i > 0 ? "outset" : "none",
                end: i < spline.segments.length - 1 ? "outset" : "none"
              }
            );
            return /* @__PURE__ */ jsx(
              "path",
              {
                strokeDasharray,
                strokeDashoffset,
                d: getSvgPathForEdge(segment, true),
                fill: "none"
              },
              i
            );
          }) })
        ] });
      }
      if (dash === "draw") {
        const outline = spline.points;
        const [innerPathData, outerPathData] = getDrawLinePathData(shape.id, outline, strokeWidth);
        return /* @__PURE__ */ jsxs(SVGContainer, { id: shape.id, children: [
          /* @__PURE__ */ jsx(ShapeFill, { d: innerPathData, fill: "none", color, theme }),
          /* @__PURE__ */ jsx(
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
      const splinePath = getSvgPathForLineGeometry(spline);
      if (dash === "solid") {
        return /* @__PURE__ */ jsxs(SVGContainer, { id: shape.id, children: [
          /* @__PURE__ */ jsx(ShapeFill, { d: splinePath, fill: "none", color, theme }),
          /* @__PURE__ */ jsx(
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
        return /* @__PURE__ */ jsxs(SVGContainer, { id: shape.id, children: [
          /* @__PURE__ */ jsx(ShapeFill, { d: splinePath, fill: "none", color, theme }),
          /* @__PURE__ */ jsx("g", { stroke: theme[color].solid, strokeWidth, children: spline.segments.map((segment, i) => {
            const { strokeDasharray, strokeDashoffset } = getPerfectDashProps(
              segment.length,
              strokeWidth,
              {
                style: dash,
                start: i > 0 ? "outset" : "none",
                end: i < spline.segments.length - 1 ? "outset" : "none"
              }
            );
            return /* @__PURE__ */ jsx(
              "path",
              {
                strokeDasharray,
                strokeDashoffset,
                d: getSvgPathForBezierCurve(segment, true),
                fill: "none"
              },
              i
            );
          }) })
        ] });
      }
      if (dash === "draw") {
        return /* @__PURE__ */ jsxs(SVGContainer, { id: shape.id, children: [
          /* @__PURE__ */ jsx(ShapeFill, { d: splinePath, fill: "none", color, theme }),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: getLineDrawPath(shape, spline, strokeWidth),
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
    const strokeWidth = STROKE_SIZES[shape.props.size];
    const spline = getGeometryForLineShape(shape);
    const { dash } = shape.props;
    let path;
    if (shape.props.spline === "line") {
      const outline = spline.points;
      if (dash === "solid" || dash === "dotted" || dash === "dashed") {
        path = "M" + outline[0] + "L" + outline.slice(1);
      } else {
        const [innerPathData] = getDrawLinePathData(shape.id, outline, strokeWidth);
        path = innerPathData;
      }
    } else {
      path = getLineIndicatorPath(shape, spline, strokeWidth);
    }
    return /* @__PURE__ */ jsx("path", { d: path });
  }
  toSvg(shape) {
    const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.isDarkMode });
    const color = theme[shape.props.color].solid;
    const spline = getGeometryForLineShape(shape);
    const strokeWidth = STROKE_SIZES[shape.props.size];
    switch (shape.props.dash) {
      case "draw": {
        let pathData;
        if (spline instanceof CubicSpline2d) {
          pathData = getLineDrawPath(shape, spline, strokeWidth);
        } else {
          const [_, outerPathData] = getDrawLinePathData(shape.id, spline.points, strokeWidth);
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
        if (spline instanceof CubicSpline2d) {
          pathData = getSvgPathForCubicSpline(spline, false);
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
        const fn = spline instanceof CubicSpline2d ? getSvgPathForBezierCurve : getSvgPathForEdge;
        segments.forEach((segment, i) => {
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          const { strokeDasharray, strokeDashoffset } = getPerfectDashProps(
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
  const handlePoints = Object.values(handles).sort(sortByIndex).map(Vec2d.From);
  switch (spline) {
    case "cubic": {
      return new CubicSpline2d({ points: handlePoints });
    }
    case "line": {
      return new Polyline2d({ points: handlePoints });
    }
  }
}
export {
  LineShapeUtil,
  getGeometryForLineShape
};
//# sourceMappingURL=LineShapeUtil.mjs.map
