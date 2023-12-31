import { jsx } from "react/jsx-runtime";
import classNames from "classnames";
import { getSvgPathFromPoints } from "../../utils/getSvgPathFromPoints.mjs";
const DefaultScribble = ({
  scribble,
  zoom,
  color,
  opacity,
  className
}) => {
  if (!scribble.points.length)
    return null;
  return /* @__PURE__ */ jsx("svg", { className: className ? classNames("tl-overlays__item", className) : className, children: /* @__PURE__ */ jsx(
    "path",
    {
      className: "tl-scribble",
      d: getSvgPathFromPoints(scribble.points, false),
      stroke: color ?? `var(--color-${scribble.color})`,
      fill: "none",
      strokeWidth: 8 / zoom,
      opacity: opacity ?? scribble.opacity
    }
  ) });
};
export {
  DefaultScribble
};
//# sourceMappingURL=DefaultScribble.mjs.map
