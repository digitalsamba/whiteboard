import { HIT_TEST_MARGIN } from "@tldraw/editor";
function updateHoveredId(editor) {
  const hitShape = editor.getShapeAtPoint(editor.inputs.currentPagePoint, {
    hitInside: false,
    hitLabels: false,
    margin: HIT_TEST_MARGIN / editor.zoomLevel
  });
  if (!hitShape)
    return editor.setHoveredShape(null);
  let shapeToHover = void 0;
  const outermostShape = editor.getOutermostSelectableShape(hitShape);
  if (outermostShape === hitShape) {
    shapeToHover = hitShape;
  } else {
    if (outermostShape.id === editor.focusedGroupId || editor.selectedShapeIds.includes(outermostShape.id)) {
      shapeToHover = hitShape;
    } else {
      shapeToHover = outermostShape;
    }
  }
  return editor.setHoveredShape(shapeToHover.id);
}
export {
  updateHoveredId
};
//# sourceMappingURL=updateHoveredId.mjs.map
