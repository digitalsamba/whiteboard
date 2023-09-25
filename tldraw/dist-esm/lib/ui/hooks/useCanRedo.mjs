import { useEditor, useValue } from "@tldraw/editor";
function useCanRedo() {
  const editor = useEditor();
  return useValue("useCanRedo", () => editor.canRedo, [editor]);
}
export {
  useCanRedo
};
//# sourceMappingURL=useCanRedo.mjs.map
