import { useValue } from "@tldraw/state";
import { useEditor } from "./useEditor.mjs";
function useIsCropping(shapeId) {
  const editor = useEditor();
  return useValue("isCropping", () => editor.croppingShapeId === shapeId, [editor, shapeId]);
}
export {
  useIsCropping
};
//# sourceMappingURL=useIsCropping.mjs.map
