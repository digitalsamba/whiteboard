import { useEditor, useValue } from "@tldraw/editor";
function useForceSolid() {
  const editor = useEditor();
  return useValue("zoom", () => editor.zoomLevel < 0.35, [editor]);
}
export {
  useForceSolid
};
//# sourceMappingURL=useForceSolid.mjs.map
