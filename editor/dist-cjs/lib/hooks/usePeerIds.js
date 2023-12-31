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
var usePeerIds_exports = {};
__export(usePeerIds_exports, {
  usePeerIds: () => usePeerIds
});
module.exports = __toCommonJS(usePeerIds_exports);
var import_state = require("@tldraw/state");
var import_react = require("react");
var import_uniq = require("../utils/uniq");
var import_useEditor = require("./useEditor");
function usePeerIds() {
  const editor = (0, import_useEditor.useEditor)();
  const $presences = (0, import_react.useMemo)(() => {
    return editor.store.query.records("instance_presence", () => ({
      userId: { neq: editor.user.id }
    }));
  }, [editor]);
  const $userIds = (0, import_state.useComputed)(
    "userIds",
    () => (0, import_uniq.uniq)($presences.value.map((p) => p.userId)).sort(),
    { isEqual: (a, b) => a.join(",") === b.join?.(",") },
    [$presences]
  );
  return (0, import_state.useValue)($userIds);
}
//# sourceMappingURL=usePeerIds.js.map
