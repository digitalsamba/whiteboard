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
var useHandleEvents_exports = {};
__export(useHandleEvents_exports, {
  useHandleEvents: () => useHandleEvents
});
module.exports = __toCommonJS(useHandleEvents_exports);
var React = __toESM(require("react"));
var import_dom = require("../utils/dom");
var import_getPointerInfo = require("../utils/getPointerInfo");
var import_useEditor = require("./useEditor");
function getHandle(editor, id, handleId) {
  const shape = editor.getShape(id);
  const handles = editor.getShapeHandles(shape);
  return { shape, handle: handles.find((h) => h.id === handleId) };
}
function useHandleEvents(id, handleId) {
  const editor = (0, import_useEditor.useEditor)();
  return React.useMemo(() => {
    const onPointerDown = (e) => {
      if (e.isKilled)
        return;
      const target = (0, import_dom.loopToHtmlElement)(e.currentTarget);
      (0, import_dom.setPointerCapture)(target, e);
      const { shape, handle } = getHandle(editor, id, handleId);
      if (!handle)
        return;
      editor.dispatch({
        type: "pointer",
        target: "handle",
        handle,
        shape,
        name: "pointer_down",
        ...(0, import_getPointerInfo.getPointerInfo)(e)
      });
    };
    let lastX, lastY;
    const onPointerMove = (e) => {
      if (e.isKilled)
        return;
      if (e.clientX === lastX && e.clientY === lastY)
        return;
      lastX = e.clientX;
      lastY = e.clientY;
      const { shape, handle } = getHandle(editor, id, handleId);
      if (!handle)
        return;
      editor.dispatch({
        type: "pointer",
        target: "handle",
        handle,
        shape,
        name: "pointer_move",
        ...(0, import_getPointerInfo.getPointerInfo)(e)
      });
    };
    const onPointerUp = (e) => {
      if (e.isKilled)
        return;
      const target = (0, import_dom.loopToHtmlElement)(e.currentTarget);
      (0, import_dom.releasePointerCapture)(target, e);
      const { shape, handle } = getHandle(editor, id, handleId);
      if (!handle)
        return;
      editor.dispatch({
        type: "pointer",
        target: "handle",
        handle,
        shape,
        name: "pointer_up",
        ...(0, import_getPointerInfo.getPointerInfo)(e)
      });
    };
    return {
      onPointerDown,
      onPointerMove,
      onPointerUp
    };
  }, [editor, id, handleId]);
}
//# sourceMappingURL=useHandleEvents.js.map
