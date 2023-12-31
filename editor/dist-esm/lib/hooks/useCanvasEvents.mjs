import { useMemo } from "react";
import { preventDefault, releasePointerCapture, setPointerCapture } from "../utils/dom.mjs";
import { getPointerInfo } from "../utils/getPointerInfo.mjs";
import { useEditor } from "./useEditor.mjs";
function useCanvasEvents() {
  const editor = useEditor();
  const events = useMemo(
    function canvasEvents() {
      let lastX, lastY;
      function onPointerDown(e) {
        if (e.isKilled)
          return;
        if (e.button === 2) {
          editor.dispatch({
            type: "pointer",
            target: "canvas",
            name: "right_click",
            ...getPointerInfo(e)
          });
          return;
        }
        if (e.button !== 0 && e.button !== 1 && e.button !== 5)
          return;
        setPointerCapture(e.currentTarget, e);
        editor.dispatch({
          type: "pointer",
          target: "canvas",
          name: "pointer_down",
          ...getPointerInfo(e)
        });
      }
      function onPointerMove(e) {
        if (e.isKilled)
          return;
        if (e.clientX === lastX && e.clientY === lastY)
          return;
        lastX = e.clientX;
        lastY = e.clientY;
        editor.dispatch({
          type: "pointer",
          target: "canvas",
          name: "pointer_move",
          ...getPointerInfo(e)
        });
      }
      function onPointerUp(e) {
        if (e.isKilled)
          return;
        if (e.button !== 0 && e.button !== 1 && e.button !== 2 && e.button !== 5)
          return;
        lastX = e.clientX;
        lastY = e.clientY;
        releasePointerCapture(e.currentTarget, e);
        editor.dispatch({
          type: "pointer",
          target: "canvas",
          name: "pointer_up",
          ...getPointerInfo(e)
        });
      }
      function onTouchStart(e) {
        ;
        e.isKilled = true;
        document.body.click();
        preventDefault(e);
      }
      function onTouchEnd(e) {
        ;
        e.isKilled = true;
        if (e.target.tagName !== "A" && e.target.tagName !== "TEXTAREA") {
          preventDefault(e);
        }
      }
      function onDragOver(e) {
        preventDefault(e);
      }
      async function onDrop(e) {
        preventDefault(e);
        if (!e.dataTransfer?.files?.length)
          return;
        const files = Array.from(e.dataTransfer.files);
        await editor.putExternalContent({
          type: "files",
          files,
          point: editor.screenToPage({ x: e.clientX, y: e.clientY }),
          ignoreParent: false
        });
      }
      return {
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onDragOver,
        onDrop,
        onTouchStart,
        onTouchEnd
      };
    },
    [editor]
  );
  return events;
}
export {
  useCanvasEvents
};
//# sourceMappingURL=useCanvasEvents.mjs.map
