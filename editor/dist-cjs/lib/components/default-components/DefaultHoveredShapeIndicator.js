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
var DefaultHoveredShapeIndicator_exports = {};
__export(DefaultHoveredShapeIndicator_exports, {
  DefaultHoveredShapeIndicator: () => DefaultHoveredShapeIndicator
});
module.exports = __toCommonJS(DefaultHoveredShapeIndicator_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_ShapeIndicator = require("../ShapeIndicator");
const DefaultHoveredShapeIndicator = ({ shapeId }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeIndicator.ShapeIndicator, { className: "tl-user-indicator__hovered", id: shapeId });
};
//# sourceMappingURL=DefaultHoveredShapeIndicator.js.map
