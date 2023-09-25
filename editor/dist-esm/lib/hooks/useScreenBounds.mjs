import throttle from "lodash.throttle";
import { useLayoutEffect } from "react";
import { useEditor } from "./useEditor.mjs";
function useScreenBounds() {
  const editor = useEditor();
  useLayoutEffect(() => {
    const updateBounds = throttle(
      () => {
        if (editor.instanceState.isFocused) {
          editor.updateViewportScreenBounds();
        }
      },
      200,
      {
        trailing: true
      }
    );
    updateBounds();
    const interval = setInterval(updateBounds, 1e3);
    window.addEventListener("resize", updateBounds);
    window.addEventListener("scroll", updateBounds);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", updateBounds);
    };
  });
}
export {
  useScreenBounds
};
//# sourceMappingURL=useScreenBounds.mjs.map
