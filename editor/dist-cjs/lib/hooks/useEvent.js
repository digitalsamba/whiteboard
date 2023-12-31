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
var useEvent_exports = {};
__export(useEvent_exports, {
  useEvent: () => useEvent
});
module.exports = __toCommonJS(useEvent_exports);
var import_utils = require("@tldraw/utils");
var import_react = require("react");
function useEvent(handler) {
  const handlerRef = (0, import_react.useRef)();
  (0, import_react.useLayoutEffect)(() => {
    handlerRef.current = handler;
  });
  (0, import_react.useDebugValue)(handler);
  return (0, import_react.useCallback)((...args) => {
    const fn = handlerRef.current;
    (0, import_utils.assert)(fn, "fn does not exist");
    return fn(...args);
  }, []);
}
//# sourceMappingURL=useEvent.js.map
