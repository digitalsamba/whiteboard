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
var getPointerInfo_exports = {};
__export(getPointerInfo_exports, {
  getPointerInfo: () => getPointerInfo
});
module.exports = __toCommonJS(getPointerInfo_exports);
function getPointerInfo(e) {
  ;
  e.isKilled = true;
  return {
    point: {
      x: e.clientX,
      y: e.clientY,
      z: e.pressure
    },
    shiftKey: e.shiftKey,
    altKey: e.altKey,
    ctrlKey: e.metaKey || e.ctrlKey,
    pointerId: e.pointerId,
    button: e.button,
    isPen: e.pointerType === "pen"
  };
}
//# sourceMappingURL=getPointerInfo.js.map
