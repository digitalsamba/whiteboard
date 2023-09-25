import { HIT_TEST_MARGIN, isShapeId } from "@tldraw/editor";
function selectOnCanvasPointerUp(editor) {
  const { selectedShapeIds } = editor;
  const { shiftKey, altKey, currentPagePoint } = editor.inputs;
  const hitShape = editor.getShapeAtPoint(currentPagePoint, {
    hitInside: false,
    margin: HIT_TEST_MARGIN / editor.zoomLevel,
    hitLabels: true
  });
  if (hitShape) {
    const outermostSelectableShape = editor.getOutermostSelectableShape(hitShape);
    if (shiftKey && !altKey) {
      editor.cancelDoubleClick();
      if (selectedShapeIds.includes(outermostSelectableShape.id)) {
        editor.mark("deselecting shape");
        editor.deselect(outermostSelectableShape);
      } else {
        editor.mark("shift selecting shape");
        editor.setSelectedShapes([...selectedShapeIds, outermostSelectableShape.id]);
      }
    } else {
      let shapeToSelect = void 0;
      if (outermostSelectableShape === hitShape) {
        shapeToSelect = hitShape;
      } else {
        if (outermostSelectableShape.id === editor.focusedGroupId || selectedShapeIds.includes(outermostSelectableShape.id)) {
          shapeToSelect = hitShape;
        } else {
          shapeToSelect = outermostSelectableShape;
        }
      }
      if (shapeToSelect && !selectedShapeIds.includes(shapeToSelect.id)) {
        editor.mark("selecting shape");
        editor.select(shapeToSelect.id);
      }
    }
  } else {
    if (shiftKey) {
      return;
    } else {
      if (selectedShapeIds.length > 0) {
        editor.mark("selecting none");
        editor.selectNone();
      }
      const { focusedGroupId } = editor;
      if (isShapeId(focusedGroupId)) {
        const groupShape = editor.getShape(focusedGroupId);
        if (!editor.isPointInShape(groupShape, currentPagePoint, { margin: 0, hitInside: true })) {
          editor.setFocusedGroup(null);
        }
      }
    }
  }
}
export {
  selectOnCanvasPointerUp
};
//# sourceMappingURL=selectOnCanvasPointerUp.mjs.map
