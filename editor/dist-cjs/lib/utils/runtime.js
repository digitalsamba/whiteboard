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
var runtime_exports = {};
__export(runtime_exports, {
  runtime: () => runtime,
  setRuntimeOverrides: () => setRuntimeOverrides
});
module.exports = __toCommonJS(runtime_exports);
const runtime = {
  openWindow: (url, target) => window.open(url, target, "noopener noreferrer"),
  refreshPage: () => window.location.reload(),
  hardReset: async () => await window.__tldraw__hardReset?.()
};
function setRuntimeOverrides(input) {
  Object.assign(runtime, input);
}
//# sourceMappingURL=runtime.js.map
