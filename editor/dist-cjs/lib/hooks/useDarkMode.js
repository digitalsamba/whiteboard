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
var useDarkMode_exports = {};
__export(useDarkMode_exports, {
  useDarkMode: () => useDarkMode
});
module.exports = __toCommonJS(useDarkMode_exports);
var import_state = require("@tldraw/state");
var import_react = __toESM(require("react"));
var import_debug_flags = require("../utils/debug-flags");
var import_useContainer = require("./useContainer");
var import_useEditor = require("./useEditor");
var import_useIsDarkMode = require("./useIsDarkMode");
function useDarkMode() {
  const editor = (0, import_useEditor.useEditor)();
  const container = (0, import_useContainer.useContainer)();
  const isDarkMode = (0, import_useIsDarkMode.useIsDarkMode)();
  const forceSrgb = (0, import_state.useValue)(import_debug_flags.debugFlags.forceSrgb);
  import_react.default.useEffect(() => {
    if (isDarkMode) {
      container.setAttribute("data-color-mode", "dark");
      container.classList.remove("tl-theme__light");
      container.classList.add("tl-theme__dark");
    } else {
      container.setAttribute("data-color-mode", "light");
      container.classList.remove("tl-theme__dark");
      container.classList.add("tl-theme__light");
    }
    if (forceSrgb) {
      container.classList.add("tl-theme__force-sRGB");
    } else {
      container.classList.remove("tl-theme__force-sRGB");
    }
  }, [editor, container, forceSrgb, isDarkMode]);
}
//# sourceMappingURL=useDarkMode.js.map
