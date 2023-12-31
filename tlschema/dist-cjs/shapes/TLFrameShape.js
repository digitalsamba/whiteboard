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
var TLFrameShape_exports = {};
__export(TLFrameShape_exports, {
  frameShapeMigrations: () => frameShapeMigrations,
  frameShapeProps: () => frameShapeProps
});
module.exports = __toCommonJS(TLFrameShape_exports);
var import_store = require("@tldraw/store");
var import_validate = require("@tldraw/validate");
const frameShapeProps = {
  w: import_validate.T.nonZeroNumber,
  h: import_validate.T.nonZeroNumber,
  name: import_validate.T.string
};
const frameShapeMigrations = (0, import_store.defineMigrations)({});
//# sourceMappingURL=TLFrameShape.js.map
