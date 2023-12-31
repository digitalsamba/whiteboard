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
var useKeyboardShortcuts_exports = {};
__export(useKeyboardShortcuts_exports, {
  useKeyboardShortcuts: () => useKeyboardShortcuts
});
module.exports = __toCommonJS(useKeyboardShortcuts_exports);
var import_editor = require("@tldraw/editor");
var import_hotkeys_js = __toESM(require("hotkeys-js"));
var import_react = require("react");
var import_useActions = require("./useActions");
var import_useReadonly = require("./useReadonly");
var import_useTools = require("./useTools");
const SKIP_KBDS = [
  // we set these in useNativeClipboardEvents instead
  "copy",
  "cut",
  "paste",
  // There's also an upload asset action, so we don't want to set the kbd twice
  "asset"
];
function useKeyboardShortcuts() {
  const editor = (0, import_editor.useEditor)();
  const isReadonly = (0, import_useReadonly.useReadonly)();
  const actions = (0, import_useActions.useActions)();
  const tools = (0, import_useTools.useTools)();
  const isFocused = (0, import_editor.useValue)("is focused", () => editor.instanceState.isFocused, [editor]);
  (0, import_react.useEffect)(() => {
    if (!isFocused)
      return;
    const container = editor.getContainer();
    import_hotkeys_js.default.setScope(editor.store.id);
    const hot = (keys, callback) => {
      (0, import_hotkeys_js.default)(keys, { element: container, scope: editor.store.id }, callback);
    };
    const areShortcutsDisabled = () => editor.isMenuOpen || editor.editingShapeId !== null || editor.crashingError;
    for (const action of Object.values(actions)) {
      if (!action.kbd)
        continue;
      if (isReadonly && !action.readonlyOk)
        continue;
      if (SKIP_KBDS.includes(action.id))
        continue;
      hot(getHotkeysStringFromKbd(action.kbd), (event) => {
        if (areShortcutsDisabled())
          return;
        (0, import_editor.preventDefault)(event);
        action.onSelect("kbd");
      });
    }
    for (const tool of Object.values(tools)) {
      if (!tool.kbd || !tool.readonlyOk && editor.instanceState.isReadonly) {
        continue;
      }
      if (SKIP_KBDS.includes(tool.id))
        continue;
      hot(getHotkeysStringFromKbd(tool.kbd), (event) => {
        if (areShortcutsDisabled())
          return;
        (0, import_editor.preventDefault)(event);
        tool.onSelect("kbd");
      });
    }
    return () => {
      import_hotkeys_js.default.deleteScope(editor.store.id);
    };
  }, [actions, tools, isReadonly, editor, isFocused]);
}
function getHotkeysStringFromKbd(kbd) {
  return getKeys(kbd).map((kbd2) => {
    let str = "";
    const chars = kbd2.split("");
    if (chars.length === 1) {
      str = chars[0];
    } else {
      if (chars[0] === "!") {
        str = `shift+${chars[1]}`;
      } else if (chars[0] === "?") {
        str = `alt+${chars[1]}`;
      } else if (chars[0] === "$") {
        if (chars[1] === "!") {
          str = `cmd+shift+${chars[2]},ctrl+shift+${chars[2]}`;
        } else if (chars[1] === "?") {
          str = `cmd+\u2325+${chars[2]},ctrl+alt+${chars[2]}`;
        } else {
          str = `cmd+${chars[1]},ctrl+${chars[1]}`;
        }
      } else {
        str = kbd2;
      }
    }
    return str;
  }).join(",");
}
function getKeys(key) {
  if (typeof key !== "string")
    key = "";
  key = key.replace(/\s/g, "");
  const keys = key.split(",");
  let index = keys.lastIndexOf("");
  for (; index >= 0; ) {
    keys[index - 1] += ",";
    keys.splice(index, 1);
    index = keys.lastIndexOf("");
  }
  return keys;
}
//# sourceMappingURL=useKeyboardShortcuts.js.map
