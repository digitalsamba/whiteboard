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
var useZoomCss_exports = {};
__export(useZoomCss_exports, {
  useZoomCss: () => useZoomCss
});
module.exports = __toCommonJS(useZoomCss_exports);
var import_state = require("@tldraw/state");
var import_utils = require("@tldraw/utils");
var React = __toESM(require("react"));
var import_useContainer = require("./useContainer");
var import_useEditor = require("./useEditor");
function useZoomCss() {
  const editor = (0, import_useEditor.useEditor)();
  const container = (0, import_useContainer.useContainer)();
  React.useEffect(() => {
    const setScale = (s) => container.style.setProperty("--tl-zoom", s.toString());
    const setScaleDebounced = (0, import_utils.debounce)(setScale, 100);
    const scheduler = new import_state.EffectScheduler("useZoomCss", () => {
      const numShapes = editor.currentPageShapeIds.size;
      if (numShapes < 300) {
        setScale(editor.zoomLevel);
      } else {
        setScaleDebounced(editor.zoomLevel);
      }
    });
    scheduler.attach();
    scheduler.execute();
    return () => {
      scheduler.detach();
    };
  }, [editor, container]);
}
//# sourceMappingURL=useZoomCss.js.map
