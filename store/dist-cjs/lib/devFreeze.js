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
var devFreeze_exports = {};
__export(devFreeze_exports, {
  devFreeze: () => devFreeze
});
module.exports = __toCommonJS(devFreeze_exports);
function devFreeze(object) {
  if (process.env.NODE_ENV === "production") {
    return object;
  }
  const proto = Object.getPrototypeOf(object);
  if (proto && !(proto === Array.prototype || proto === Object.prototype)) {
    console.error("cannot include non-js data in a record", object);
    throw new Error("cannot include non-js data in a record");
  }
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      devFreeze(value);
    }
  }
  return Object.freeze(object);
}
//# sourceMappingURL=devFreeze.js.map
