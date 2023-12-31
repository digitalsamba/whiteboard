import { preventDefault, useEditor, useValue } from "@tldraw/editor";
import hotkeys from "hotkeys-js";
import { useEffect } from "react";
import { useActions } from "./useActions.mjs";
import { useReadonly } from "./useReadonly.mjs";
import { useTools } from "./useTools.mjs";
const SKIP_KBDS = [
  // we set these in useNativeClipboardEvents instead
  "copy",
  "cut",
  "paste",
  // There's also an upload asset action, so we don't want to set the kbd twice
  "asset"
];
function useKeyboardShortcuts() {
  const editor = useEditor();
  const isReadonly = useReadonly();
  const actions = useActions();
  const tools = useTools();
  const isFocused = useValue("is focused", () => editor.instanceState.isFocused, [editor]);
  useEffect(() => {
    if (!isFocused)
      return;
    const container = editor.getContainer();
    hotkeys.setScope(editor.store.id);
    const hot = (keys, callback) => {
      hotkeys(keys, { element: container, scope: editor.store.id }, callback);
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
        preventDefault(event);
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
        preventDefault(event);
        tool.onSelect("kbd");
      });
    }
    return () => {
      hotkeys.deleteScope(editor.store.id);
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
export {
  useKeyboardShortcuts
};
//# sourceMappingURL=useKeyboardShortcuts.mjs.map
