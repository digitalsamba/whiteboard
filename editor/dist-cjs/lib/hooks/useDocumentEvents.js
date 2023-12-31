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
var useDocumentEvents_exports = {};
__export(useDocumentEvents_exports, {
  useDocumentEvents: () => useDocumentEvents
});
module.exports = __toCommonJS(useDocumentEvents_exports);
var import_state = require("@tldraw/state");
var import_react = require("react");
var import_dom = require("../utils/dom");
var import_useContainer = require("./useContainer");
var import_useEditor = require("./useEditor");
function useDocumentEvents() {
  const editor = (0, import_useEditor.useEditor)();
  const container = (0, import_useContainer.useContainer)();
  const isAppFocused = (0, import_state.useValue)("isFocused", () => editor.instanceState.isFocused, [editor]);
  (0, import_react.useEffect)(() => {
    if (typeof matchMedia === void 0)
      return;
    let remove = null;
    const updatePixelRatio = () => {
      if (remove != null) {
        remove();
      }
      const mqString = `(resolution: ${window.devicePixelRatio}dppx)`;
      const media = matchMedia(mqString);
      media.addEventListener("change", updatePixelRatio);
      remove = () => {
        media.removeEventListener("change", updatePixelRatio);
      };
      editor.updateInstanceState({ devicePixelRatio: window.devicePixelRatio });
    };
    updatePixelRatio();
    return () => {
      remove?.();
    };
  }, [editor]);
  (0, import_react.useEffect)(() => {
    if (!isAppFocused)
      return;
    const handleKeyDown = (e) => {
      if (e.altKey && // todo: When should we allow the alt key to be used? Perhaps states should declare which keys matter to them?
      (editor.isIn("zoom") || !editor.root.path.value.endsWith(".idle")) && !isFocusingInput()) {
        (0, import_dom.preventDefault)(e);
      }
      if (e.isKilled)
        return;
      e.isKilled = true;
      switch (e.key) {
        case "=":
        case "-":
        case "0": {
          if (e.metaKey || e.ctrlKey) {
            (0, import_dom.preventDefault)(e);
            return;
          }
          break;
        }
        case "Tab": {
          if (isFocusingInput() || editor.isMenuOpen) {
            return;
          }
          break;
        }
        case ",": {
          if (!isFocusingInput()) {
            (0, import_dom.preventDefault)(e);
            if (!editor.inputs.keys.has("Comma")) {
              const { x, y, z } = editor.inputs.currentScreenPoint;
              editor.inputs.keys.add("Comma");
              const info2 = {
                type: "pointer",
                name: "pointer_down",
                point: { x, y, z },
                shiftKey: e.shiftKey,
                altKey: e.altKey,
                ctrlKey: e.metaKey || e.ctrlKey,
                pointerId: 0,
                button: 0,
                isPen: editor.instanceState.isPenMode,
                target: "canvas"
              };
              editor.dispatch(info2);
              return;
            }
          }
          break;
        }
        case "Escape": {
          if (!editor.inputs.keys.has("Escape")) {
            editor.inputs.keys.add("Escape");
            editor.cancel();
            container.focus();
          }
          return;
        }
        default: {
          if (isFocusingInput() || editor.isMenuOpen) {
            return;
          }
        }
      }
      const info = {
        type: "keyboard",
        name: editor.inputs.keys.has(e.code) ? "key_repeat" : "key_down",
        key: e.key,
        code: e.code,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        ctrlKey: e.metaKey || e.ctrlKey
      };
      editor.dispatch(info);
    };
    const handleKeyUp = (e) => {
      if (e.isKilled)
        return;
      e.isKilled = true;
      if (isFocusingInput() || editor.isMenuOpen) {
        return;
      }
      if (e.key === ",") {
        if (document.activeElement?.ELEMENT_NODE)
          (0, import_dom.preventDefault)(e);
        if (editor.inputs.keys.has(e.code)) {
          const { x, y, z } = editor.inputs.currentScreenPoint;
          editor.inputs.keys.delete(e.code);
          const info2 = {
            type: "pointer",
            name: "pointer_up",
            point: { x, y, z },
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            ctrlKey: e.metaKey || e.ctrlKey,
            pointerId: 0,
            button: 0,
            isPen: editor.instanceState.isPenMode,
            target: "canvas"
          };
          editor.dispatch(info2);
          return;
        }
      }
      const info = {
        type: "keyboard",
        name: "key_up",
        key: e.key,
        code: e.code,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        ctrlKey: e.metaKey || e.ctrlKey
      };
      editor.dispatch(info);
    };
    function handleTouchStart(e) {
      if (container.contains(e.target)) {
        const touchXPosition = e.touches[0].pageX;
        const touchXRadius = e.touches[0].radiusX || 0;
        if (touchXPosition - touchXRadius < 10 || touchXPosition + touchXRadius > editor.viewportScreenBounds.width - 10) {
          if (e.target?.tagName === "BUTTON") {
            ;
            e.target?.click();
          }
          (0, import_dom.preventDefault)(e);
        }
      }
    }
    const handleWheel = (e) => {
      if (container.contains(e.target) && (e.ctrlKey || e.metaKey)) {
        (0, import_dom.preventDefault)(e);
      }
    };
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("gesturestart", import_dom.preventDefault);
    document.addEventListener("gesturechange", import_dom.preventDefault);
    document.addEventListener("gestureend", import_dom.preventDefault);
    container.addEventListener("keydown", handleKeyDown);
    container.addEventListener("keyup", handleKeyUp);
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("wheel", handleWheel);
      document.removeEventListener("gesturestart", import_dom.preventDefault);
      document.removeEventListener("gesturechange", import_dom.preventDefault);
      document.removeEventListener("gestureend", import_dom.preventDefault);
      container.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("keyup", handleKeyUp);
    };
  }, [editor, container, isAppFocused]);
}
const INPUTS = ["input", "select", "button", "textarea"];
function isFocusingInput() {
  const { activeElement } = document;
  if (activeElement && (activeElement.getAttribute("contenteditable") || INPUTS.indexOf(activeElement.tagName.toLowerCase()) > -1)) {
    return true;
  }
  return false;
}
//# sourceMappingURL=useDocumentEvents.js.map
