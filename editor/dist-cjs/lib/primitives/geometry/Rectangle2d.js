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
var Rectangle2d_exports = {};
__export(Rectangle2d_exports, {
  Rectangle2d: () => Rectangle2d
});
module.exports = __toCommonJS(Rectangle2d_exports);
var import_Box2d = require("../Box2d");
var import_Vec2d = require("../Vec2d");
var import_Polygon2d = require("./Polygon2d");
class Rectangle2d extends import_Polygon2d.Polygon2d {
  x;
  y;
  w;
  h;
  constructor(config) {
    const { x = 0, y = 0, width, height } = config;
    super({
      ...config,
      points: [
        new import_Vec2d.Vec2d(x, y),
        new import_Vec2d.Vec2d(x + width, y),
        new import_Vec2d.Vec2d(x + width, y + height),
        new import_Vec2d.Vec2d(x, y + height)
      ]
    });
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
  }
  getBounds() {
    return new import_Box2d.Box2d(this.x, this.y, this.w, this.h);
  }
}
//# sourceMappingURL=Rectangle2d.js.map
