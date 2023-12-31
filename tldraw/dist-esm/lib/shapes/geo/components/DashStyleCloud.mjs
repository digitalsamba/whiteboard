import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import {
  Vec2d,
  canonicalizeRotation
} from "@tldraw/editor";
import * as React from "react";
import {
  ShapeFill,
  getShapeFillSvg,
  getSvgWithShapeFill,
  useDefaultColorTheme
} from "../../shared/ShapeFill.mjs";
import { getPerfectDashProps } from "../../shared/getPerfectDashProps.mjs";
import { cloudSvgPath, getCloudArcs } from "../cloudOutline.mjs";
const DashStyleCloud = React.memo(function DashStylePolygon({
  dash,
  fill,
  color,
  strokeWidth,
  w,
  h,
  id,
  size
}) {
  const theme = useDefaultColorTheme();
  const innerPath = cloudSvgPath(w, h, id, size);
  const arcs = getCloudArcs(w, h, id, size);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ShapeFill, { theme, d: innerPath, fill, color }),
    /* @__PURE__ */ jsx("g", { strokeWidth, stroke: theme[color].solid, fill: "none", pointerEvents: "all", children: arcs.map(({ leftPoint, rightPoint, center, radius }, i) => {
      const angle = canonicalizeRotation(
        canonicalizeRotation(Vec2d.Angle(center, rightPoint)) - canonicalizeRotation(Vec2d.Angle(center, leftPoint))
      );
      const arcLength = radius * angle;
      const { strokeDasharray, strokeDashoffset } = getPerfectDashProps(
        arcLength,
        strokeWidth,
        {
          style: dash,
          start: "outset",
          end: "outset"
        }
      );
      return /* @__PURE__ */ jsx(
        "path",
        {
          d: `M${leftPoint.x},${leftPoint.y}A${radius},${radius},0,0,1,${rightPoint.x},${rightPoint.y}`,
          strokeDasharray,
          strokeDashoffset
        },
        i
      );
    }) })
  ] });
});
function DashStyleCloudSvg({
  dash,
  fill,
  color,
  theme,
  strokeWidth,
  w,
  h,
  id,
  size
}) {
  const innerPath = cloudSvgPath(w, h, id, size);
  const arcs = getCloudArcs(w, h, id, size);
  const strokeElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
  strokeElement.setAttribute("stroke-width", strokeWidth.toString());
  strokeElement.setAttribute("stroke", theme[color].solid);
  strokeElement.setAttribute("fill", "none");
  for (const { leftPoint, rightPoint, center, radius } of arcs) {
    const angle = canonicalizeRotation(
      canonicalizeRotation(Vec2d.Angle(center, rightPoint)) - canonicalizeRotation(Vec2d.Angle(center, leftPoint))
    );
    const arcLength = radius * angle;
    const { strokeDasharray, strokeDashoffset } = getPerfectDashProps(arcLength, strokeWidth, {
      style: dash,
      start: "outset",
      end: "outset"
    });
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `M${leftPoint.x},${leftPoint.y}A${radius},${radius},0,0,1,${rightPoint.x},${rightPoint.y}`
    );
    path.setAttribute("stroke-dasharray", strokeDasharray.toString());
    path.setAttribute("stroke-dashoffset", strokeDashoffset.toString());
    strokeElement.appendChild(path);
  }
  const fillElement = getShapeFillSvg({
    d: innerPath,
    fill,
    color,
    theme
  });
  return getSvgWithShapeFill(strokeElement, fillElement);
}
export {
  DashStyleCloud,
  DashStyleCloudSvg
};
//# sourceMappingURL=DashStyleCloud.mjs.map
