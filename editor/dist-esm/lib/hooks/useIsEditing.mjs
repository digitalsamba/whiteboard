import { useValue } from "@tldraw/state";
import { useEditor } from "./useEditor.mjs";
function useIsEditing(shapeId) {
  const editor = useEditor();
  return useValue("isEditing", () => editor.editingShapeId === shapeId, [editor, shapeId]);
}
export {
  useIsEditing
};
//# sourceMappingURL=useIsEditing.mjs.map
