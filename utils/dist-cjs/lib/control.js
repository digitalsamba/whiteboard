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
var control_exports = {};
__export(control_exports, {
  Result: () => Result,
  assert: () => assert,
  assertExists: () => assertExists,
  exhaustiveSwitchError: () => exhaustiveSwitchError,
  promiseWithResolve: () => promiseWithResolve
});
module.exports = __toCommonJS(control_exports);
var import_function = require("./function");
const Result = {
  ok(value) {
    return { ok: true, value };
  },
  err(error) {
    return { ok: false, error };
  }
};
function exhaustiveSwitchError(value, property) {
  const debugValue = property && value && typeof value === "object" && property in value ? value[property] : value;
  throw new Error(`Unknown switch case ${debugValue}`);
}
const assert = (0, import_function.omitFromStackTrace)(
  (value, message) => {
    if (!value) {
      throw new Error(message || "Assertion Error");
    }
  }
);
const assertExists = (0, import_function.omitFromStackTrace)((value, message) => {
  if (value == null) {
    throw new Error(message ?? "value must be defined");
  }
  return value;
});
function promiseWithResolve() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return Object.assign(promise, {
    resolve,
    reject
  });
}
//# sourceMappingURL=control.js.map
