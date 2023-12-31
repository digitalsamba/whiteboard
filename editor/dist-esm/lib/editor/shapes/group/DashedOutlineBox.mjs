import { jsx } from "react/jsx-runtime";
import { getPerfectDashProps } from "../shared/getPerfectDashProps.mjs";
function DashedOutlineBox({
  bounds,
  zoomLevel,
  className
}) {
  return /* @__PURE__ */ jsx("g", { className, pointerEvents: "none", strokeLinecap: "round", strokeLinejoin: "round", children: bounds.sides.map((side, i) => {
    const { strokeDasharray, strokeDashoffset } = getPerfectDashProps(
      side[0].dist(side[1]),
      1 / zoomLevel,
      {
        style: "dashed",
        lengthRatio: 4
      }
    );
    return /* @__PURE__ */ jsx(
      "line",
      {
        x1: side[0].x,
        y1: side[0].y,
        x2: side[1].x,
        y2: side[1].y,
        strokeDasharray,
        strokeDashoffset
      },
      i
    );
  }) });
}
export {
  DashedOutlineBox
};
//# sourceMappingURL=DashedOutlineBox.mjs.map
