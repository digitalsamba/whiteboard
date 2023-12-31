import { useEditor, useValue } from "@tldraw/editor";
import { useCallback, useEffect, useRef } from "react";
import { useUiEvents } from "./useEventsProvider.mjs";
function useMenuIsOpen(id, cb) {
  const editor = useEditor();
  const rIsOpen = useRef(false);
  const trackEvent = useUiEvents();
  const onOpenChange = useCallback(
    (isOpen2) => {
      rIsOpen.current = isOpen2;
      editor.batch(() => {
        if (isOpen2) {
          editor.complete();
          editor.addOpenMenu(id);
        } else {
          editor.deleteOpenMenu(id);
          editor.openMenus.forEach((menuId) => {
            if (menuId.startsWith(id)) {
              editor.deleteOpenMenu(menuId);
            }
          });
        }
        cb?.(isOpen2);
      });
    },
    [editor, id, cb]
  );
  useEffect(() => {
    if (rIsOpen.current) {
      trackEvent("open-menu", { source: "unknown", id });
      editor.addOpenMenu(id);
    }
    return () => {
      if (rIsOpen.current) {
        editor.deleteOpenMenu(id);
        editor.openMenus.forEach((menuId) => {
          if (menuId.startsWith(id)) {
            trackEvent("close-menu", { source: "unknown", id });
            editor.deleteOpenMenu(menuId);
          }
        });
        rIsOpen.current = false;
      }
    };
  }, [editor, id, trackEvent]);
  const isOpen = useValue("is menu open", () => editor.openMenus.includes(id), [editor, id]);
  return [isOpen, onOpenChange];
}
export {
  useMenuIsOpen
};
//# sourceMappingURL=useMenuIsOpen.mjs.map
