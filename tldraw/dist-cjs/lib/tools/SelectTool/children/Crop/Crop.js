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
var Crop_exports = {};
__export(Crop_exports, {
  Crop: () => Crop
});
module.exports = __toCommonJS(Crop_exports);
var import_editor = require("@tldraw/editor");
var import_Idle = require("./children/Idle");
var import_PointingCrop = require("./children/PointingCrop");
var import_TranslatingCrop = require("./children/TranslatingCrop");
class Crop extends import_editor.StateNode {
  static id = "crop";
  static initial = "idle";
  static children = () => [import_Idle.Idle, import_TranslatingCrop.TranslatingCrop, import_PointingCrop.PointingCrop];
}
//# sourceMappingURL=Crop.js.map
