import { useEditor, useValue } from "@tldraw/editor";
function useReadonly() {
  const editor = useEditor();
  return useValue("isReadonlyMode", () => editor.instanceState.isReadonly, [editor]);
}
export {
  useReadonly
};
//# sourceMappingURL=useReadonly.mjs.map
