import { jsx } from "react/jsx-runtime";
import { EASINGS, getSvgPathFromPoints } from "@tldraw/editor";
import classNames from "classnames";
import { getStroke } from "../shapes/shared/freehand/getStroke.mjs";
const TldrawScribble = ({
  scribble,
  zoom,
  color,
  opacity,
  className
}) => {
  if (!scribble.points.length)
    return null;
  const stroke = getStroke(scribble.points, {
    size: scribble.size / zoom,
    start: { taper: true, easing: EASINGS.linear },
    last: scribble.state === "stopping",
    simulatePressure: false,
    streamline: 0.32
  });
  let d;
  if (stroke.length < 4) {
    const r = scribble.size / zoom / 2;
    const { x, y } = scribble.points[scribble.points.length - 1];
    d = `M ${x - r},${y} a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 ${-r * 2},0`;
  } else {
    d = getSvgPathFromPoints(stroke);
  }
  return /* @__PURE__ */ jsx("svg", { className: className ? classNames("tl-overlays__item", className) : className, children: /* @__PURE__ */ jsx(
    "path",
    {
      className: "tl-scribble",
      d,
      fill: color ?? `var(--color-${scribble.color})`,
      opacity: opacity ?? scribble.opacity
    }
  ) });
};
export {
  TldrawScribble
};
//# sourceMappingURL=TldrawScribble.mjs.map
