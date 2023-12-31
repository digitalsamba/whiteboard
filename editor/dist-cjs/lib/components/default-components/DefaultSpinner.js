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
var DefaultSpinner_exports = {};
__export(DefaultSpinner_exports, {
  DefaultSpinner: () => DefaultSpinner
});
module.exports = __toCommonJS(DefaultSpinner_exports);
var import_jsx_runtime = require("react/jsx-runtime");
const DefaultSpinner = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: 16, height: 16, viewBox: "0 0 16 16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { strokeWidth: 2, fill: "none", fillRule: "evenodd", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { strokeOpacity: 0.25, cx: 8, cy: 8, r: 7, stroke: "var(--color-text-1)" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", d: "M15 8c0-4.5-4.5-7-7-7", stroke: "var(--color-text-1)", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "animateTransform",
      {
        attributeName: "transform",
        type: "rotate",
        from: "0 8 8",
        to: "360 8 8",
        dur: "1s",
        repeatCount: "indefinite"
      }
    ) })
  ] }) });
};
//# sourceMappingURL=DefaultSpinner.js.map
