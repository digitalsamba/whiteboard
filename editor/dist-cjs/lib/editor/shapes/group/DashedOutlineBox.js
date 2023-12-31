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
var DashedOutlineBox_exports = {};
__export(DashedOutlineBox_exports, {
  DashedOutlineBox: () => DashedOutlineBox
});
module.exports = __toCommonJS(DashedOutlineBox_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_getPerfectDashProps = require("../shared/getPerfectDashProps");
function DashedOutlineBox({
  bounds,
  zoomLevel,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { className, pointerEvents: "none", strokeLinecap: "round", strokeLinejoin: "round", children: bounds.sides.map((side, i) => {
    const { strokeDasharray, strokeDashoffset } = (0, import_getPerfectDashProps.getPerfectDashProps)(
      side[0].dist(side[1]),
      1 / zoomLevel,
      {
        style: "dashed",
        lengthRatio: 4
      }
    );
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
//# sourceMappingURL=DashedOutlineBox.js.map
