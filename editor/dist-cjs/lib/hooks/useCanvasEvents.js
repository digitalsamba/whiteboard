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
var useCanvasEvents_exports = {};
__export(useCanvasEvents_exports, {
  useCanvasEvents: () => useCanvasEvents
});
module.exports = __toCommonJS(useCanvasEvents_exports);
var import_react = require("react");
var import_dom = require("../utils/dom");
var import_getPointerInfo = require("../utils/getPointerInfo");
var import_useEditor = require("./useEditor");
function useCanvasEvents() {
  const editor = (0, import_useEditor.useEditor)();
  const events = (0, import_react.useMemo)(
    function canvasEvents() {
      let lastX, lastY;
      function onPointerDown(e) {
        if (e.isKilled)
          return;
        if (e.button === 2) {
          editor.dispatch({
            type: "pointer",
            target: "canvas",
            name: "right_click",
            ...(0, import_getPointerInfo.getPointerInfo)(e)
          });
          return;
        }
        if (e.button !== 0 && e.button !== 1 && e.button !== 5)
          return;
        (0, import_dom.setPointerCapture)(e.currentTarget, e);
        editor.dispatch({
          type: "pointer",
          target: "canvas",
          name: "pointer_down",
          ...(0, import_getPointerInfo.getPointerInfo)(e)
        });
      }
      function onPointerMove(e) {
        if (e.isKilled)
          return;
        if (e.clientX === lastX && e.clientY === lastY)
          return;
        lastX = e.clientX;
        lastY = e.clientY;
        editor.dispatch({
          type: "pointer",
          target: "canvas",
          name: "pointer_move",
          ...(0, import_getPointerInfo.getPointerInfo)(e)
        });
      }
      function onPointerUp(e) {
        if (e.isKilled)
          return;
        if (e.button !== 0 && e.button !== 1 && e.button !== 2 && e.button !== 5)
          return;
        lastX = e.clientX;
        lastY = e.clientY;
        (0, import_dom.releasePointerCapture)(e.currentTarget, e);
        editor.dispatch({
          type: "pointer",
          target: "canvas",
          name: "pointer_up",
          ...(0, import_getPointerInfo.getPointerInfo)(e)
        });
      }
      function onTouchStart(e) {
        ;
        e.isKilled = true;
        document.body.click();
        (0, import_dom.preventDefault)(e);
      }
      function onTouchEnd(e) {
        ;
        e.isKilled = true;
        if (e.target.tagName !== "A" && e.target.tagName !== "TEXTAREA") {
          (0, import_dom.preventDefault)(e);
        }
      }
      function onDragOver(e) {
        (0, import_dom.preventDefault)(e);
      }
      async function onDrop(e) {
        (0, import_dom.preventDefault)(e);
        if (!e.dataTransfer?.files?.length)
          return;
        const files = Array.from(e.dataTransfer.files);
        await editor.putExternalContent({
          type: "files",
          files,
          point: editor.screenToPage({ x: e.clientX, y: e.clientY }),
          ignoreParent: false
        });
      }
      return {
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onDragOver,
        onDrop,
        onTouchStart,
        onTouchEnd
      };
    },
    [editor]
  );
  return events;
}
//# sourceMappingURL=useCanvasEvents.js.map
