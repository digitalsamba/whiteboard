import { useValue } from "@tldraw/state";
import { useEditor } from "./useEditor.mjs";
function useIsDarkMode() {
  const editor = useEditor();
  return useValue("isDarkMode", () => editor.user.isDarkMode, [editor]);
}
export {
  useIsDarkMode
};
//# sourceMappingURL=useIsDarkMode.mjs.map
