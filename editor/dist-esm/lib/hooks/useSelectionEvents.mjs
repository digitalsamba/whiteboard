import { useMemo } from "react";
import { loopToHtmlElement, releasePointerCapture, setPointerCapture } from "../utils/dom.mjs";
import { getPointerInfo } from "../utils/getPointerInfo.mjs";
import { useEditor } from "./useEditor.mjs";
function useSelectionEvents(handle) {
  const editor = useEditor();
  const events = useMemo(
    function selectionEvents() {
      const onPointerDown = (e) => {
        if (e.isKilled)
          return;
        if (e.button !== 0)
          return;
        const elm = loopToHtmlElement(e.currentTarget);
        function releaseCapture() {
          elm.removeEventListener("pointerup", releaseCapture);
          releasePointerCapture(elm, e);
        }
        setPointerCapture(elm, e);
        elm.addEventListener("pointerup", releaseCapture);
        editor.dispatch({
          name: "pointer_down",
          type: "pointer",
          target: "selection",
          handle,
          ...getPointerInfo(e)
        });
        e.stopPropagation();
      };
      let lastX, lastY;
      function onPointerMove(e) {
        if (e.isKilled)
          return;
        if (e.button !== 0)
          return;
        if (e.clientX === lastX && e.clientY === lastY)
          return;
        lastX = e.clientX;
        lastY = e.clientY;
        editor.dispatch({
          name: "pointer_move",
          type: "pointer",
          target: "selection",
          handle,
          ...getPointerInfo(e)
        });
      }
      const onPointerUp = (e) => {
        if (e.isKilled)
          return;
        if (e.button !== 0)
          return;
        editor.dispatch({
          name: "pointer_up",
          type: "pointer",
          target: "selection",
          handle,
          ...getPointerInfo(e)
        });
      };
      return {
        onPointerDown,
        onPointerMove,
        onPointerUp
      };
    },
    [editor, handle]
  );
  return events;
}
export {
  useSelectionEvents
};
//# sourceMappingURL=useSelectionEvents.mjs.map
