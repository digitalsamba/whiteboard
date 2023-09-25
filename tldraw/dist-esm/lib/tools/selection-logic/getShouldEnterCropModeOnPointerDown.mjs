function getShouldEnterCropMode(editor) {
  const { onlySelectedShape } = editor;
  return !!(onlySelectedShape && !editor.isShapeOrAncestorLocked(onlySelectedShape) && editor.getShapeUtil(onlySelectedShape).canCrop(onlySelectedShape));
}
export {
  getShouldEnterCropMode
};
//# sourceMappingURL=getShouldEnterCropModeOnPointerDown.mjs.map
