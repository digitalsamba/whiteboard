import { useValue } from "@tldraw/state";
import { useEffect } from "react";
import { preventDefault } from "../utils/dom.mjs";
import { useContainer } from "./useContainer.mjs";
import { useEditor } from "./useEditor.mjs";
function useDocumentEvents() {
  const editor = useEditor();
  const container = useContainer();
  const isAppFocused = useValue("isFocused", () => editor.instanceState.isFocused, [editor]);
  useEffect(() => {
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
  useEffect(() => {
    if (!isAppFocused)
      return;
    const handleKeyDown = (e) => {
      if (e.altKey && // todo: When should we allow the alt key to be used? Perhaps states should declare which keys matter to them?
      (editor.isIn("zoom") || !editor.root.path.value.endsWith(".idle")) && !isFocusingInput()) {
        preventDefault(e);
      }
      if (e.isKilled)
        return;
      e.isKilled = true;
      switch (e.key) {
        case "=":
        case "-":
        case "0": {
          if (e.metaKey || e.ctrlKey) {
            preventDefault(e);
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
            preventDefault(e);
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
          preventDefault(e);
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
          preventDefault(e);
        }
      }
    }
    const handleWheel = (e) => {
      if (container.contains(e.target) && (e.ctrlKey || e.metaKey)) {
        preventDefault(e);
      }
    };
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("gesturestart", preventDefault);
    document.addEventListener("gesturechange", preventDefault);
    document.addEventListener("gestureend", preventDefault);
    container.addEventListener("keydown", handleKeyDown);
    container.addEventListener("keyup", handleKeyUp);
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("wheel", handleWheel);
      document.removeEventListener("gesturestart", preventDefault);
      document.removeEventListener("gesturechange", preventDefault);
      document.removeEventListener("gestureend", preventDefault);
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
export {
  useDocumentEvents
};
//# sourceMappingURL=useDocumentEvents.mjs.map
