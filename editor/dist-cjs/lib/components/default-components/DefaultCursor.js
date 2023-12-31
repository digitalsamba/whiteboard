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
var DefaultCursor_exports = {};
__export(DefaultCursor_exports, {
  DefaultCursor: () => DefaultCursor
});
module.exports = __toCommonJS(DefaultCursor_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_classnames = __toESM(require("classnames"));
var import_react = require("react");
var import_useTransform = require("../../hooks/useTransform");
const _Cursor = ({ className, zoom, point, color, name, chatMessage }) => {
  const rCursor = (0, import_react.useRef)(null);
  (0, import_useTransform.useTransform)(rCursor, point?.x, point?.y, 1 / zoom);
  if (!point)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: rCursor, className: (0, import_classnames.default)("tl-overlays__item", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: "tl-cursor", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("use", { href: "#cursor", color }) }),
    chatMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tl-nametag-title", style: { color }, children: name }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tl-nametag-chat", style: { backgroundColor: color }, children: chatMessage })
    ] }) : name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tl-nametag", style: { backgroundColor: color }, children: name })
  ] });
};
const DefaultCursor = (0, import_react.memo)(_Cursor);
//# sourceMappingURL=DefaultCursor.js.map
