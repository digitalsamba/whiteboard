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
var DefaultSelectionBackground_exports = {};
__export(DefaultSelectionBackground_exports, {
  DefaultSelectionBackground: () => DefaultSelectionBackground
});
module.exports = __toCommonJS(DefaultSelectionBackground_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var React = __toESM(require("react"));
var import_useTransform = require("../../hooks/useTransform");
var import_utils = require("../../primitives/utils");
const DefaultSelectionBackground = ({
  bounds,
  rotation
}) => {
  const rDiv = React.useRef(null);
  (0, import_useTransform.useTransform)(rDiv, bounds.x, bounds.y, 1, rotation);
  React.useLayoutEffect(() => {
    const div = rDiv.current;
    if (!div)
      return;
    div.style.width = (0, import_utils.toDomPrecision)(Math.max(1, bounds.width)) + "px";
    div.style.height = (0, import_utils.toDomPrecision)(Math.max(1, bounds.height)) + "px";
  }, [bounds.width, bounds.height]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: rDiv, className: "tl-selection__bg", draggable: false });
};
//# sourceMappingURL=DefaultSelectionBackground.js.map
