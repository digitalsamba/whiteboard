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
var useFixSafariDoubleTapZoomPencilEvents_exports = {};
__export(useFixSafariDoubleTapZoomPencilEvents_exports, {
  useFixSafariDoubleTapZoomPencilEvents: () => useFixSafariDoubleTapZoomPencilEvents
});
module.exports = __toCommonJS(useFixSafariDoubleTapZoomPencilEvents_exports);
var import_react = require("react");
var import_dom = require("../utils/dom");
var import_useEditor = require("./useEditor");
const IGNORED_TAGS = ["textarea", "input"];
function useFixSafariDoubleTapZoomPencilEvents(ref) {
  const editor = (0, import_useEditor.useEditor)();
  (0, import_react.useEffect)(() => {
    const elm = ref.current;
    if (!elm)
      return;
    const handleEvent = (e) => {
      if (e instanceof PointerEvent && e.pointerType === "pen") {
        ;
        e.isKilled = true;
        const { target } = e;
        if (IGNORED_TAGS.includes(target.tagName?.toLocaleLowerCase()) || editor.isIn("select.editing_shape")) {
          return;
        }
        (0, import_dom.preventDefault)(e);
      }
    };
    elm.addEventListener("touchstart", handleEvent);
    elm.addEventListener("touchend", handleEvent);
    return () => {
      elm.removeEventListener("touchstart", handleEvent);
      elm.addEventListener("touchend", handleEvent);
    };
  }, [editor, ref]);
}
//# sourceMappingURL=useFixSafariDoubleTapZoomPencilEvents.js.map
