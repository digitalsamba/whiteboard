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
var useFocusEvents_exports = {};
__export(useFocusEvents_exports, {
  useFocusEvents: () => useFocusEvents
});
module.exports = __toCommonJS(useFocusEvents_exports);
var import_utils = require("@tldraw/utils");
var import_react = require("react");
var import_useContainer = require("./useContainer");
var import_useEditor = require("./useEditor");
function useFocusEvents(autoFocus) {
  const editor = (0, import_useEditor.useEditor)();
  const container = (0, import_useContainer.useContainer)();
  (0, import_react.useLayoutEffect)(() => {
    if (!container)
      return;
    const updateFocus = (0, import_utils.debounce)(() => {
      const { activeElement } = document;
      const { isFocused: wasFocused } = editor.instanceState;
      const isFocused = document.hasFocus() && (container === activeElement || container.contains(activeElement));
      if (wasFocused !== isFocused) {
        editor.updateInstanceState({ isFocused });
        editor.updateViewportScreenBounds();
        if (!isFocused) {
          editor.complete();
        }
      }
    }, 32);
    container.addEventListener("focusin", updateFocus);
    container.addEventListener("focus", updateFocus);
    container.addEventListener("focusout", updateFocus);
    container.addEventListener("blur", updateFocus);
    return () => {
      container.removeEventListener("focusin", updateFocus);
      container.removeEventListener("focus", updateFocus);
      container.removeEventListener("focusout", updateFocus);
      container.removeEventListener("blur", updateFocus);
    };
  }, [container, editor]);
  (0, import_react.useLayoutEffect)(() => {
    if (autoFocus) {
      editor.getContainer().focus();
    }
  }, [editor, autoFocus]);
}
//# sourceMappingURL=useFocusEvents.js.map
