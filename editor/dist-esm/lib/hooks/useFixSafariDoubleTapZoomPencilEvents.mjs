import { useEffect } from "react";
import { preventDefault } from "../utils/dom.mjs";
import { useEditor } from "./useEditor.mjs";
const IGNORED_TAGS = ["textarea", "input"];
function useFixSafariDoubleTapZoomPencilEvents(ref) {
  const editor = useEditor();
  useEffect(() => {
    const elm = ref.current;
    if (!elm)
      return;
    const handleEvent = (e) => {
      if (e instanceof PointerEvent && e.pointerType === "pen") {
        ;
        e.isKilled = true;
        const { target } = e;
        if (IGNORED_TAGS.includes(target.tagName?.toLocaleLowerCase()) || editor.isIn("select.editing_shape")) {
          return;
        }
        preventDefault(e);
      }
    };
    elm.addEventListener("touchstart", handleEvent);
    elm.addEventListener("touchend", handleEvent);
    return () => {
      elm.removeEventListener("touchstart", handleEvent);
      elm.addEventListener("touchend", handleEvent);
    };
  }, [editor, ref]);
}
export {
  useFixSafariDoubleTapZoomPencilEvents
};
//# sourceMappingURL=useFixSafariDoubleTapZoomPencilEvents.mjs.map
