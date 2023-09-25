import { useEditor, useValue } from "@tldraw/editor";
function useCanUndo() {
  const editor = useEditor();
  return useValue("useCanUndo", () => editor.canUndo, [editor]);
}
export {
  useCanUndo
};
//# sourceMappingURL=useCanUndo.mjs.map
