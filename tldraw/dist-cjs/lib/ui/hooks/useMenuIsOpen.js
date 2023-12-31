"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var useMenuIsOpen_exports = {};
__export(useMenuIsOpen_exports, {
  useMenuIsOpen: () => useMenuIsOpen
});
module.exports = __toCommonJS(useMenuIsOpen_exports);
var import_editor = require("@tldraw/editor");
var import_react = require("react");
var import_useEventsProvider = require("./useEventsProvider");
function useMenuIsOpen(id, cb) {
  const editor = (0, import_editor.useEditor)();
  const rIsOpen = (0, import_react.useRef)(false);
  const trackEvent = (0, import_useEventsProvider.useUiEvents)();
  const onOpenChange = (0, import_react.useCallback)(
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
  (0, import_react.useEffect)(() => {
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
  const isOpen = (0, import_editor.useValue)("is menu open", () => editor.openMenus.includes(id), [editor, id]);
  return [isOpen, onOpenChange];
}
//# sourceMappingURL=useMenuIsOpen.js.map
