import * as React from "react";
import { loopToHtmlElement, releasePointerCapture, setPointerCapture } from "../utils/dom.mjs";
import { getPointerInfo } from "../utils/getPointerInfo.mjs";
import { useEditor } from "./useEditor.mjs";
function getHandle(editor, id, handleId) {
  const shape = editor.getShape(id);
  const handles = editor.getShapeHandles(shape);
  return { shape, handle: handles.find((h) => h.id === handleId) };
}
function useHandleEvents(id, handleId) {
  const editor = useEditor();
  return React.useMemo(() => {
    const onPointerDown = (e) => {
      if (e.isKilled)
        return;
      const target = loopToHtmlElement(e.currentTarget);
      setPointerCapture(target, e);
      const { shape, handle } = getHandle(editor, id, handleId);
      if (!handle)
        return;
      editor.dispatch({
        type: "pointer",
        target: "handle",
        handle,
        shape,
        name: "pointer_down",
        ...getPointerInfo(e)
      });
    };
    let lastX, lastY;
    const onPointerMove = (e) => {
      if (e.isKilled)
        return;
      if (e.clientX === lastX && e.clientY === lastY)
        return;
      lastX = e.clientX;
      lastY = e.clientY;
      const { shape, handle } = getHandle(editor, id, handleId);
      if (!handle)
        return;
      editor.dispatch({
        type: "pointer",
        target: "handle",
        handle,
        shape,
        name: "pointer_move",
        ...getPointerInfo(e)
      });
    };
    const onPointerUp = (e) => {
      if (e.isKilled)
        return;
      const target = loopToHtmlElement(e.currentTarget);
      releasePointerCapture(target, e);
      const { shape, handle } = getHandle(editor, id, handleId);
      if (!handle)
        return;
      editor.dispatch({
        type: "pointer",
        target: "handle",
        handle,
        shape,
        name: "pointer_up",
        ...getPointerInfo(e)
      });
    };
    return {
      onPointerDown,
      onPointerMove,
      onPointerUp
    };
  }, [editor, id, handleId]);
}
export {
  useHandleEvents
};
//# sourceMappingURL=useHandleEvents.mjs.map
