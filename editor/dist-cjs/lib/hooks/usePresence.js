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
var usePresence_exports = {};
__export(usePresence_exports, {
  usePresence: () => usePresence
});
module.exports = __toCommonJS(usePresence_exports);
var import_state = require("@tldraw/state");
var import_react = require("react");
var import_useEditor = require("./useEditor");
function usePresence(userId) {
  const editor = (0, import_useEditor.useEditor)();
  const $presences = (0, import_react.useMemo)(() => {
    return editor.store.query.records("instance_presence", () => ({
      userId: { eq: userId }
    }));
  }, [editor, userId]);
  const latestPresence = (0, import_state.useValue)(
    `latestPresence:${userId}`,
    () => {
      return $presences.value.slice().sort((a, b) => b.lastActivityTimestamp - a.lastActivityTimestamp)[0];
    },
    []
  );
  return latestPresence ?? null;
}
//# sourceMappingURL=usePresence.js.map
