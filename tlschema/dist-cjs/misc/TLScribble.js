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
var TLScribble_exports = {};
__export(TLScribble_exports, {
  TL_SCRIBBLE_STATES: () => TL_SCRIBBLE_STATES,
  scribbleValidator: () => scribbleValidator
});
module.exports = __toCommonJS(TLScribble_exports);
var import_validate = require("@tldraw/validate");
var import_TLColor = require("./TLColor");
var import_geometry_types = require("./geometry-types");
const TL_SCRIBBLE_STATES = /* @__PURE__ */ new Set(["starting", "paused", "active", "stopping"]);
const scribbleValidator = import_validate.T.object({
  points: import_validate.T.arrayOf(import_geometry_types.vec2dModelValidator),
  size: import_validate.T.positiveNumber,
  color: import_TLColor.canvasUiColorTypeValidator,
  opacity: import_validate.T.number,
  state: import_validate.T.setEnum(TL_SCRIBBLE_STATES),
  delay: import_validate.T.number
});
//# sourceMappingURL=TLScribble.js.map
