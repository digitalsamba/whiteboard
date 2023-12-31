import { jsx } from "react/jsx-runtime";
import {
  Circle2d,
  Polyline2d,
  SVGContainer,
  ShapeUtil,
  getDefaultColorTheme,
  highlightShapeMigrations,
  highlightShapeProps,
  last,
  rng
} from "@tldraw/editor";
import { getHighlightFreehandSettings, getPointsFromSegments } from "../draw/getPath.mjs";
import { useDefaultColorTheme } from "../shared/ShapeFill.mjs";
import { FONT_SIZES } from "../shared/default-shape-constants.mjs";
import { getStrokePoints } from "../shared/freehand/getStrokePoints.mjs";
import { getSvgPathFromStrokePoints } from "../shared/freehand/svg.mjs";
import { useColorSpace } from "../shared/useColorSpace.mjs";
import { useForceSolid } from "../shared/useForceSolid.mjs";
const OVERLAY_OPACITY = 0.35;
const UNDERLAY_OPACITY = 0.82;
class HighlightShapeUtil extends ShapeUtil {
  static type = "highlight";
  static props = highlightShapeProps;
  static migrations = highlightShapeMigrations;
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
      return new Circle2d({
        x: -strokeWidth / 2,
        y: -strokeWidth / 2,
        radius: strokeWidth / 2,
        isFilled: true
      });
    }
    return new Polyline2d({
      points: getPointsFromSegments(shape.props.segments)
    });
  }
  component(shape) {
    return /* @__PURE__ */ jsx(
      HighlightRenderer,
      {
        strokeWidth: getStrokeWidth(shape),
        shape,
        opacity: OVERLAY_OPACITY
      }
    );
  }
  backgroundComponent(shape) {
    return /* @__PURE__ */ jsx(
      HighlightRenderer,
      {
        strokeWidth: getStrokeWidth(shape),
        shape,
        opacity: UNDERLAY_OPACITY
      }
    );
  }
  indicator(shape) {
    const forceSolid = useForceSolid();
    const strokeWidth = getStrokeWidth(shape);
    const allPointsFromSegments = getPointsFromSegments(shape.props.segments);
    let sw = strokeWidth;
    if (!forceSolid && !shape.props.isPen && allPointsFromSegments.length === 1) {
      sw += rng(shape.id)() * (strokeWidth / 6);
    }
    const showAsComplete = shape.props.isComplete || last(shape.props.segments)?.type === "straight";
    const options = getHighlightFreehandSettings({
      strokeWidth,
      showAsComplete,
      isPen: shape.props.isPen
    });
    const strokePoints = getStrokePoints(allPointsFromSegments, options);
    let strokePath;
    if (strokePoints.length < 2) {
      strokePath = getIndicatorDot(allPointsFromSegments[0], sw);
    } else {
      strokePath = getSvgPathFromStrokePoints(strokePoints, false);
    }
    return /* @__PURE__ */ jsx("path", { d: strokePath });
  }
  expandSelectionOutlinePx(shape) {
    return getStrokeWidth(shape) / 2;
  }
  toSvg(shape) {
    const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.isDarkMode });
    return highlighterToSvg(getStrokeWidth(shape), shape, OVERLAY_OPACITY, theme);
  }
  toBackgroundSvg(shape) {
    const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.isDarkMode });
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
  const allPointsFromSegments = getPointsFromSegments(shape.props.segments);
  const showAsComplete = shape.props.isComplete || last(shape.props.segments)?.type === "straight";
  let sw = strokeWidth;
  if (!forceSolid && !shape.props.isPen && allPointsFromSegments.length === 1) {
    sw += rng(shape.id)() * (strokeWidth / 6);
  }
  const options = getHighlightFreehandSettings({
    strokeWidth: sw,
    showAsComplete,
    isPen: shape.props.isPen
  });
  const strokePoints = getStrokePoints(allPointsFromSegments, options);
  const solidStrokePath = strokePoints.length > 1 ? getSvgPathFromStrokePoints(strokePoints, false) : getShapeDot(allPointsFromSegments[0]);
  return { solidStrokePath, sw };
}
function HighlightRenderer({
  strokeWidth,
  shape,
  opacity
}) {
  const theme = useDefaultColorTheme();
  const forceSolid = useForceSolid();
  const { solidStrokePath, sw } = getHighlightSvgPath(shape, strokeWidth, forceSolid);
  const colorSpace = useColorSpace();
  const color = theme[shape.props.color].highlight[colorSpace];
  return /* @__PURE__ */ jsx(SVGContainer, { id: shape.id, style: { opacity }, children: /* @__PURE__ */ jsx(
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
  return FONT_SIZES[shape.props.size] * 1.12;
}
function getIsDot(shape) {
  return shape.props.segments.length === 1 && shape.props.segments[0].points.length < 2;
}
export {
  HighlightShapeUtil
};
//# sourceMappingURL=HighlightShapeUtil.mjs.map
