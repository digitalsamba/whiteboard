import {
  HIT_TEST_MARGIN,
  StateNode
} from "@tldraw/editor";
class PointingShape extends StateNode {
  static id = "pointing_shape";
  hitShape = {};
  hitShapeForPointerUp = {};
  didSelectOnEnter = false;
  onEnter = (info) => {
    const {
      selectedShapeIds,
      focusedGroupId,
      selectionRotatedPageBounds: selectionBounds,
      inputs: { currentPagePoint, shiftKey, altKey }
    } = this.editor;
    this.hitShape = info.shape;
    const outermostSelectingShape = this.editor.getOutermostSelectableShape(info.shape);
    if (
      // If the shape has an onClick handler
      this.editor.getShapeUtil(info.shape).onClick || // ...or if the shape is the focused layer (e.g. group)
      outermostSelectingShape.id === focusedGroupId || // ...or if the shape is within the selection
      selectedShapeIds.includes(outermostSelectingShape.id) || this.editor.isAncestorSelected(outermostSelectingShape.id) || // ...or if the current point is NOT within the selection bounds
      selectedShapeIds.length > 1 && selectionBounds?.containsPoint(currentPagePoint)
    ) {
      this.didSelectOnEnter = false;
      this.hitShapeForPointerUp = outermostSelectingShape;
      return;
    }
    this.didSelectOnEnter = true;
    if (shiftKey && !altKey) {
      this.editor.cancelDoubleClick();
      if (!selectedShapeIds.includes(outermostSelectingShape.id)) {
        this.editor.mark("shift selecting shape");
        this.editor.setSelectedShapes([...selectedShapeIds, outermostSelectingShape.id]);
      }
    } else {
      this.editor.mark("selecting shape");
      this.editor.setSelectedShapes([outermostSelectingShape.id]);
    }
  };
  onPointerUp = (info) => {
    const {
      zoomLevel,
      focusedGroupId,
      selectedShapeIds,
      inputs: { currentPagePoint, shiftKey }
    } = this.editor;
    const hitShape = this.editor.getShapeAtPoint(currentPagePoint, {
      margin: HIT_TEST_MARGIN / zoomLevel,
      hitInside: true
    }) ?? this.hitShape;
    const selectingShape = hitShape ? this.editor.getOutermostSelectableShape(hitShape) : this.hitShapeForPointerUp;
    if (selectingShape) {
      const util = this.editor.getShapeUtil(selectingShape);
      if (util.onClick) {
        const change = util.onClick?.(selectingShape);
        if (change) {
          this.editor.mark("shape on click");
          this.editor.updateShapes([change]);
          this.parent.transition("idle", info);
          return;
        }
      }
      if (selectingShape.id === focusedGroupId) {
        if (selectedShapeIds.length > 0) {
          this.editor.mark("clearing shape ids");
          this.editor.setSelectedShapes([]);
        } else {
          this.editor.popFocusedGroupId();
        }
        this.parent.transition("idle", info);
        return;
      }
    }
    if (!this.didSelectOnEnter) {
      const outermostSelectableShape = this.editor.getOutermostSelectableShape(
        hitShape,
        // if a group is selected, we want to stop before reaching that group
        // so we can drill down into the group
        (parent) => !selectedShapeIds.includes(parent.id)
      );
      if (selectedShapeIds.includes(outermostSelectableShape.id)) {
        if (shiftKey) {
          this.editor.mark("deselecting on pointer up");
          this.editor.deselect(selectingShape);
        } else {
          if (selectedShapeIds.includes(selectingShape.id)) {
            if (selectedShapeIds.length === 1 && (this.editor.isShapeOfType(selectingShape, "geo") || this.editor.isShapeOfType(selectingShape, "arrow"))) {
              const geometry = this.editor.getShapeGeometry(selectingShape);
              const labelGeometry = geometry.children[1];
              if (labelGeometry) {
                const pointInShapeSpace = this.editor.getPointInShapeSpace(
                  selectingShape,
                  currentPagePoint
                );
                if (labelGeometry.hitTestPoint(pointInShapeSpace)) {
                  this.editor.batch(() => {
                    this.editor.mark("editing on pointer up");
                    this.editor.select(selectingShape.id);
                    this.editor.setEditingShape(selectingShape.id);
                    this.editor.setCurrentTool("select.editing_shape");
                  });
                  return;
                }
              }
            }
            this.editor.mark("selecting on pointer up");
            this.editor.select(selectingShape.id);
          } else {
            this.editor.mark("selecting on pointer up");
            this.editor.select(selectingShape);
          }
        }
      } else if (shiftKey) {
        const ancestors = this.editor.getShapeAncestors(outermostSelectableShape);
        this.editor.mark("shift deselecting on pointer up");
        this.editor.setSelectedShapes([
          ...this.editor.selectedShapeIds.filter((id) => !ancestors.find((a) => a.id === id)),
          outermostSelectableShape.id
        ]);
      } else {
        this.editor.mark("selecting on pointer up");
        this.editor.setSelectedShapes([outermostSelectableShape.id]);
      }
    }
    this.parent.transition("idle", info);
  };
  onPointerMove = (info) => {
    if (this.editor.inputs.isDragging) {
      if (this.editor.instanceState.isReadonly)
        return;
      this.parent.transition("translating", info);
    }
  };
  onCancel = () => {
    this.cancel();
  };
  onComplete = () => {
    this.cancel();
  };
  onInterrupt = () => {
    this.cancel();
  };
  cancel() {
    this.parent.transition("idle", {});
  }
}
export {
  PointingShape
};
//# sourceMappingURL=PointingShape.mjs.map
