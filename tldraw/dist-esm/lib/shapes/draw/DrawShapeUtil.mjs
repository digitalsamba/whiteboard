import { jsx, jsxs } from "react/jsx-runtime";
import {
  Box2d,
  Circle2d,
  Polygon2d,
  Polyline2d,
  SVGContainer,
  ShapeUtil,
  drawShapeMigrations,
  drawShapeProps,
  getDefaultColorTheme,
  getSvgPathFromPoints,
  last,
  rng,
  toFixed
} from "@tldraw/editor";
import { ShapeFill, getShapeFillSvg, useDefaultColorTheme } from "../shared/ShapeFill.mjs";
import { STROKE_SIZES } from "../shared/default-shape-constants.mjs";
import { getFillDefForCanvas, getFillDefForExport } from "../shared/defaultStyleDefs.mjs";
import { getStrokeOutlinePoints } from "../shared/freehand/getStrokeOutlinePoints.mjs";
import { getStrokePoints } from "../shared/freehand/getStrokePoints.mjs";
import { setStrokePointRadii } from "../shared/freehand/setStrokePointRadii.mjs";
import { getSvgPathFromStrokePoints } from "../shared/freehand/svg.mjs";
import { useForceSolid } from "../shared/useForceSolid.mjs";
import { getDrawShapeStrokeDashArray, getFreehandOptions, getPointsFromSegments } from "./getPath.mjs";
class DrawShapeUtil extends ShapeUtil {
  static type = "draw";
  static props = drawShapeProps;
  static migrations = drawShapeMigrations;
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
    const points = getPointsFromSegments(shape.props.segments);
    const strokeWidth = STROKE_SIZES[shape.props.size];
    if (shape.props.segments.length === 1) {
      const box = Box2d.FromPoints(points);
      if (box.width < strokeWidth * 2 && box.height < strokeWidth * 2) {
        return new Circle2d({
          x: -strokeWidth,
          y: -strokeWidth,
          radius: strokeWidth,
          isFilled: true
        });
      }
    }
    const strokePoints = getStrokePoints(
      points,
      getFreehandOptions(shape.props, strokeWidth, true, true)
    ).map((p) => p.point);
    if (shape.props.isClosed) {
      return new Polygon2d({
        points: strokePoints,
        isFilled: shape.props.fill !== "none"
      });
    }
    return new Polyline2d({
      points: strokePoints
    });
  }
  component(shape) {
    const theme = useDefaultColorTheme();
    const forceSolid = useForceSolid();
    const strokeWidth = STROKE_SIZES[shape.props.size];
    const allPointsFromSegments = getPointsFromSegments(shape.props.segments);
    const showAsComplete = shape.props.isComplete || last(shape.props.segments)?.type === "straight";
    let sw = strokeWidth;
    if (!forceSolid && !shape.props.isPen && shape.props.dash === "draw" && allPointsFromSegments.length === 1) {
      sw += rng(shape.id)() * (strokeWidth / 6);
    }
    const options = getFreehandOptions(shape.props, sw, showAsComplete, forceSolid);
    const strokePoints = getStrokePoints(allPointsFromSegments, options);
    const solidStrokePath = strokePoints.length > 1 ? getSvgPathFromStrokePoints(strokePoints, shape.props.isClosed) : getDot(allPointsFromSegments[0], sw);
    if (!forceSolid && shape.props.dash === "draw" || strokePoints.length < 2) {
      setStrokePointRadii(strokePoints, options);
      const strokeOutlinePoints = getStrokeOutlinePoints(strokePoints, options);
      return /* @__PURE__ */ jsxs(SVGContainer, { id: shape.id, children: [
        /* @__PURE__ */ jsx(
          ShapeFill,
          {
            theme,
            fill: shape.props.isClosed ? shape.props.fill : "none",
            color: shape.props.color,
            d: solidStrokePath
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: getSvgPathFromPoints(strokeOutlinePoints, true),
            strokeLinecap: "round",
            fill: theme[shape.props.color].solid
          }
        )
      ] });
    }
    return /* @__PURE__ */ jsxs(SVGContainer, { id: shape.id, children: [
      /* @__PURE__ */ jsx(
        ShapeFill,
        {
          theme,
          color: shape.props.color,
          fill: shape.props.isClosed ? shape.props.fill : "none",
          d: solidStrokePath
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: solidStrokePath,
          strokeLinecap: "round",
          fill: "none",
          stroke: theme[shape.props.color].solid,
          strokeWidth,
          strokeDasharray: getDrawShapeStrokeDashArray(shape, strokeWidth),
          strokeDashoffset: "0"
        }
      )
    ] });
  }
  indicator(shape) {
    const forceSolid = useForceSolid();
    const strokeWidth = STROKE_SIZES[shape.props.size];
    const allPointsFromSegments = getPointsFromSegments(shape.props.segments);
    let sw = strokeWidth;
    if (!forceSolid && !shape.props.isPen && shape.props.dash === "draw" && allPointsFromSegments.length === 1) {
      sw += rng(shape.id)() * (strokeWidth / 6);
    }
    const showAsComplete = shape.props.isComplete || last(shape.props.segments)?.type === "straight";
    const options = getFreehandOptions(shape.props, sw, showAsComplete, true);
    const strokePoints = getStrokePoints(allPointsFromSegments, options);
    const solidStrokePath = strokePoints.length > 1 ? getSvgPathFromStrokePoints(strokePoints, shape.props.isClosed) : getDot(allPointsFromSegments[0], sw);
    return /* @__PURE__ */ jsx("path", { d: solidStrokePath });
  }
  toSvg(shape, ctx) {
    const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.isDarkMode });
    ctx.addExportDef(getFillDefForExport(shape.props.fill, theme));
    const { color } = shape.props;
    const strokeWidth = STROKE_SIZES[shape.props.size];
    const allPointsFromSegments = getPointsFromSegments(shape.props.segments);
    const showAsComplete = shape.props.isComplete || last(shape.props.segments)?.type === "straight";
    let sw = strokeWidth;
    if (!shape.props.isPen && shape.props.dash === "draw" && allPointsFromSegments.length === 1) {
      sw += rng(shape.id)() * (strokeWidth / 6);
    }
    const options = getFreehandOptions(shape.props, sw, showAsComplete, false);
    const strokePoints = getStrokePoints(allPointsFromSegments, options);
    const solidStrokePath = strokePoints.length > 1 ? getSvgPathFromStrokePoints(strokePoints, shape.props.isClosed) : getDot(allPointsFromSegments[0], sw);
    let foregroundPath;
    if (shape.props.dash === "draw" || strokePoints.length < 2) {
      setStrokePointRadii(strokePoints, options);
      const strokeOutlinePoints = getStrokeOutlinePoints(strokePoints, options);
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", getSvgPathFromPoints(strokeOutlinePoints, true));
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
      p.setAttribute("stroke-dasharray", getDrawShapeStrokeDashArray(shape, strokeWidth));
      p.setAttribute("stroke-dashoffset", "0");
      foregroundPath = p;
    }
    const fillPath = getShapeFillSvg({
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
    return [getFillDefForCanvas()];
  }
  onResize = (shape, info) => {
    const { scaleX, scaleY } = info;
    const newSegments = [];
    for (const segment of shape.props.segments) {
      newSegments.push({
        ...segment,
        points: segment.points.map(({ x, y, z }) => {
          return {
            x: toFixed(scaleX * x),
            y: toFixed(scaleY * y),
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
    return STROKE_SIZES[shape.props.size] * multiplier / 2;
  }
}
function getDot(point, sw) {
  const r = (sw + 1) * 0.5;
  return `M ${point.x} ${point.y} m -${r}, 0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
}
function getIsDot(shape) {
  return shape.props.segments.length === 1 && shape.props.segments[0].points.length < 2;
}
export {
  DrawShapeUtil
};
//# sourceMappingURL=DrawShapeUtil.mjs.map
