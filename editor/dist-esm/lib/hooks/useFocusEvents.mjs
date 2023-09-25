import { debounce } from "@tldraw/utils";
import { useLayoutEffect } from "react";
import { useContainer } from "./useContainer.mjs";
import { useEditor } from "./useEditor.mjs";
function useFocusEvents(autoFocus) {
  const editor = useEditor();
  const container = useContainer();
  useLayoutEffect(() => {
    if (!container)
      return;
    const updateFocus = debounce(() => {
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
  useLayoutEffect(() => {
    if (autoFocus) {
      editor.getContainer().focus();
    }
  }, [editor, autoFocus]);
}
export {
  useFocusEvents
};
//# sourceMappingURL=useFocusEvents.mjs.map
