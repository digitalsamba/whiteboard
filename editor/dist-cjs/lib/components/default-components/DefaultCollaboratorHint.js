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
var DefaultCollaboratorHint_exports = {};
__export(DefaultCollaboratorHint_exports, {
  DefaultCollaboratorHint: () => DefaultCollaboratorHint
});
module.exports = __toCommonJS(DefaultCollaboratorHint_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_classnames = __toESM(require("classnames"));
var import_react = require("react");
var import_useTransform = require("../../hooks/useTransform");
var import_Vec2d = require("../../primitives/Vec2d");
var import_utils = require("../../primitives/utils");
const DefaultCollaboratorHint = ({
  className,
  zoom,
  point,
  color,
  viewport,
  opacity = 1
}) => {
  const rSvg = (0, import_react.useRef)(null);
  (0, import_useTransform.useTransform)(
    rSvg,
    (0, import_utils.clamp)(point.x, viewport.minX + 5 / zoom, viewport.maxX - 5 / zoom),
    (0, import_utils.clamp)(point.y, viewport.minY + 5 / zoom, viewport.maxY - 5 / zoom),
    1 / zoom,
    import_Vec2d.Vec2d.Angle(viewport.center, point)
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ref: rSvg, className: (0, import_classnames.default)("tl-overlays__item", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("use", { href: "#cursor_hint", color, strokeWidth: 3, stroke: "var(--color-background)" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("use", { href: "#cursor_hint", color, opacity })
  ] });
};
//# sourceMappingURL=DefaultCollaboratorHint.js.map
