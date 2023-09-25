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
var DefaultScribble_exports = {};
__export(DefaultScribble_exports, {
  DefaultScribble: () => DefaultScribble
});
module.exports = __toCommonJS(DefaultScribble_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_classnames = __toESM(require("classnames"));
var import_getSvgPathFromPoints = require("../../utils/getSvgPathFromPoints");
const DefaultScribble = ({
  scribble,
  zoom,
  color,
  opacity,
  className
}) => {
  if (!scribble.points.length)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: className ? (0, import_classnames.default)("tl-overlays__item", className) : className, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      className: "tl-scribble",
      d: (0, import_getSvgPathFromPoints.getSvgPathFromPoints)(scribble.points, false),
      stroke: color ?? `var(--color-${scribble.color})`,
      fill: "none",
      strokeWidth: 8 / zoom,
      opacity: opacity ?? scribble.opacity
    }
  ) });
};
//# sourceMappingURL=DefaultScribble.js.map
