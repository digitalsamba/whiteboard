"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var DashStyleCloud_exports = {};
__export(DashStyleCloud_exports, {
  DashStyleCloud: () => DashStyleCloud,
  DashStyleCloudSvg: () => DashStyleCloudSvg
});
module.exports = __toCommonJS(DashStyleCloud_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var React = __toESM(require("react"));
var import_ShapeFill = require("../../shared/ShapeFill");
var import_getPerfectDashProps = require("../../shared/getPerfectDashProps");
var import_cloudOutline = require("../cloudOutline");
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
  const theme = (0, import_ShapeFill.useDefaultColorTheme)();
  const innerPath = (0, import_cloudOutline.cloudSvgPath)(w, h, id, size);
  const arcs = (0, import_cloudOutline.getCloudArcs)(w, h, id, size);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeFill.ShapeFill, { theme, d: innerPath, fill, color }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { strokeWidth, stroke: theme[color].solid, fill: "none", pointerEvents: "all", children: arcs.map(({ leftPoint, rightPoint, center, radius }, i) => {
      const angle = (0, import_editor.canonicalizeRotation)(
        (0, import_editor.canonicalizeRotation)(import_editor.Vec2d.Angle(center, rightPoint)) - (0, import_editor.canonicalizeRotation)(import_editor.Vec2d.Angle(center, leftPoint))
      );
      const arcLength = radius * angle;
      const { strokeDasharray, strokeDashoffset } = (0, import_getPerfectDashProps.getPerfectDashProps)(
        arcLength,
        strokeWidth,
        {
          style: dash,
          start: "outset",
          end: "outset"
        }
      );
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  const innerPath = (0, import_cloudOutline.cloudSvgPath)(w, h, id, size);
  const arcs = (0, import_cloudOutline.getCloudArcs)(w, h, id, size);
  const strokeElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
  strokeElement.setAttribute("stroke-width", strokeWidth.toString());
  strokeElement.setAttribute("stroke", theme[color].solid);
  strokeElement.setAttribute("fill", "none");
  for (const { leftPoint, rightPoint, center, radius } of arcs) {
    const angle = (0, import_editor.canonicalizeRotation)(
      (0, import_editor.canonicalizeRotation)(import_editor.Vec2d.Angle(center, rightPoint)) - (0, import_editor.canonicalizeRotation)(import_editor.Vec2d.Angle(center, leftPoint))
    );
    const arcLength = radius * angle;
    const { strokeDasharray, strokeDashoffset } = (0, import_getPerfectDashProps.getPerfectDashProps)(arcLength, strokeWidth, {
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
  const fillElement = (0, import_ShapeFill.getShapeFillSvg)({
    d: innerPath,
    fill,
    color,
    theme
  });
  return (0, import_ShapeFill.getSvgWithShapeFill)(strokeElement, fillElement);
}
//# sourceMappingURL=DashStyleCloud.js.map
