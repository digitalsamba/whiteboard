"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var useScreenBounds_exports = {};
__export(useScreenBounds_exports, {
  useScreenBounds: () => useScreenBounds
});
module.exports = __toCommonJS(useScreenBounds_exports);
var import_lodash = __toESM(require("lodash.throttle"));
var import_react = require("react");
var import_useEditor = require("./useEditor");
function useScreenBounds() {
  const editor = (0, import_useEditor.useEditor)();
  (0, import_react.useLayoutEffect)(() => {
    const updateBounds = (0, import_lodash.default)(
      () => {
        if (editor.instanceState.isFocused) {
          editor.updateViewportScreenBounds();
        }
      },
      200,
      {
        trailing: true
      }
    );
    updateBounds();
    const interval = setInterval(updateBounds, 1e3);
    window.addEventListener("resize", updateBounds);
    window.addEventListener("scroll", updateBounds);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", updateBounds);
    };
  });
}
//# sourceMappingURL=useScreenBounds.js.map
