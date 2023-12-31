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
var useSelectionEvents_exports = {};
__export(useSelectionEvents_exports, {
  useSelectionEvents: () => useSelectionEvents
});
module.exports = __toCommonJS(useSelectionEvents_exports);
var import_react = require("react");
var import_dom = require("../utils/dom");
var import_getPointerInfo = require("../utils/getPointerInfo");
var import_useEditor = require("./useEditor");
function useSelectionEvents(handle) {
  const editor = (0, import_useEditor.useEditor)();
  const events = (0, import_react.useMemo)(
    function selectionEvents() {
      const onPointerDown = (e) => {
        if (e.isKilled)
          return;
        if (e.button !== 0)
          return;
        const elm = (0, import_dom.loopToHtmlElement)(e.currentTarget);
        function releaseCapture() {
          elm.removeEventListener("pointerup", releaseCapture);
          (0, import_dom.releasePointerCapture)(elm, e);
        }
        (0, import_dom.setPointerCapture)(elm, e);
        elm.addEventListener("pointerup", releaseCapture);
        editor.dispatch({
          name: "pointer_down",
          type: "pointer",
          target: "selection",
          handle,
          ...(0, import_getPointerInfo.getPointerInfo)(e)
        });
        e.stopPropagation();
      };
      let lastX, lastY;
      function onPointerMove(e) {
        if (e.isKilled)
          return;
        if (e.button !== 0)
          return;
        if (e.clientX === lastX && e.clientY === lastY)
          return;
        lastX = e.clientX;
        lastY = e.clientY;
        editor.dispatch({
          name: "pointer_move",
          type: "pointer",
          target: "selection",
          handle,
          ...(0, import_getPointerInfo.getPointerInfo)(e)
        });
      }
      const onPointerUp = (e) => {
        if (e.isKilled)
          return;
        if (e.button !== 0)
          return;
        editor.dispatch({
          name: "pointer_up",
          type: "pointer",
          target: "selection",
          handle,
          ...(0, import_getPointerInfo.getPointerInfo)(e)
        });
      };
      return {
        onPointerDown,
        onPointerMove,
        onPointerUp
      };
    },
    [editor, handle]
  );
  return events;
}
//# sourceMappingURL=useSelectionEvents.js.map
