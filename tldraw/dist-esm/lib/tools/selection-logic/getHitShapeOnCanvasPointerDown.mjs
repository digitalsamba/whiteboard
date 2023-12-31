import { HIT_TEST_MARGIN } from "@tldraw/editor";
function getHitShapeOnCanvasPointerDown(editor) {
  const {
    zoomLevel,
    inputs: { currentPagePoint }
  } = editor;
  return (
    // hovered shape at point
    (// selected shape at point
    editor.getShapeAtPoint(currentPagePoint, {
      hitInside: false,
      hitLabels: false,
      margin: HIT_TEST_MARGIN / zoomLevel
    }) ?? editor.getSelectedShapeAtPoint(currentPagePoint))
  );
}
export {
  getHitShapeOnCanvasPointerDown
};
//# sourceMappingURL=getHitShapeOnCanvasPointerDown.mjs.map
