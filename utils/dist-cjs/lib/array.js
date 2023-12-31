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
var array_exports = {};
__export(array_exports, {
  compact: () => compact,
  dedupe: () => dedupe,
  last: () => last,
  minBy: () => minBy,
  partition: () => partition,
  rotateArray: () => rotateArray
});
module.exports = __toCommonJS(array_exports);
function rotateArray(arr, offset) {
  return arr.map((_, i) => arr[(i + offset) % arr.length]);
}
function dedupe(input, equals) {
  const result = [];
  mainLoop:
    for (const item of input) {
      for (const existing of result) {
        if (equals ? equals(item, existing) : item === existing) {
          continue mainLoop;
        }
      }
      result.push(item);
    }
  return result;
}
function compact(arr) {
  return arr.filter((i) => i !== void 0 && i !== null);
}
function last(arr) {
  return arr[arr.length - 1];
}
function minBy(arr, fn) {
  let min;
  let minVal = Infinity;
  for (const item of arr) {
    const val = fn(item);
    if (val < minVal) {
      min = item;
      minVal = val;
    }
  }
  return min;
}
function partition(arr, predicate) {
  const satisfies = [];
  const doesNotSatisfy = [];
  for (const item of arr) {
    if (predicate(item)) {
      satisfies.push(item);
    } else {
      doesNotSatisfy.push(item);
    }
  }
  return [satisfies, doesNotSatisfy];
}
//# sourceMappingURL=array.js.map
