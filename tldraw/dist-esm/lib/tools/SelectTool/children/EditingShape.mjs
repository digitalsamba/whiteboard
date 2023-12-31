import { StateNode } from "@tldraw/editor";
import { getHitShapeOnCanvasPointerDown } from "../../selection-logic/getHitShapeOnCanvasPointerDown.mjs";
import { updateHoveredId } from "../../selection-logic/updateHoveredId.mjs";
class EditingShape extends StateNode {
  static id = "editing_shape";
  onEnter = () => {
    const { editingShape } = this.editor;
    if (!editingShape)
      throw Error("Entered editing state without an editing shape");
    updateHoveredId(this.editor);
    this.editor.select(editingShape);
  };
  onExit = () => {
    const { editingShapeId } = this.editor.currentPageState;
    if (!editingShapeId)
      return;
    this.editor.setEditingShape(null);
    const shape = this.editor.getShape(editingShapeId);
    const util = this.editor.getShapeUtil(shape);
    util.onEditEnd?.(shape);
  };
  onPointerMove = (info) => {
    switch (info.target) {
      case "shape":
      case "canvas": {
        updateHoveredId(this.editor);
        return;
      }
    }
  };
  onPointerDown = (info) => {
    switch (info.target) {
      case "canvas": {
        const hitShape = getHitShapeOnCanvasPointerDown(this.editor);
        if (hitShape) {
          this.onPointerDown({
            ...info,
            shape: hitShape,
            target: "shape"
          });
          return;
        }
        break;
      }
      case "shape": {
        const { shape } = info;
        const { editingShape } = this.editor;
        if (!editingShape) {
          throw Error("Expected an editing shape!");
        }
        if (shape.type === editingShape.type) {
          if (this.editor.isShapeOfType(shape, "geo") || this.editor.isShapeOfType(shape, "arrow")) {
            const geometry = this.editor.getShapeUtil(shape).getGeometry(shape);
            const labelGeometry = geometry.children[1];
            if (labelGeometry) {
              const pointInShapeSpace = this.editor.getPointInShapeSpace(
                shape,
                this.editor.inputs.currentPagePoint
              );
              if (labelGeometry.bounds.containsPoint(pointInShapeSpace)) {
                if (shape.id === editingShape.id) {
                  return;
                } else {
                  this.editor.setEditingShape(shape);
                  this.editor.select(shape);
                  return;
                }
              }
            }
          } else {
            if (shape.id === editingShape.id) {
            } else {
              this.editor.setEditingShape(shape);
              this.editor.select(shape);
            }
            return;
          }
        } else {
        }
        break;
      }
    }
    this.parent.transition("idle", info);
    this.editor.root.handleEvent(info);
  };
  onComplete = (info) => {
    this.parent.transition("idle", info);
  };
  onCancel = (info) => {
    this.parent.transition("idle", info);
  };
}
export {
  EditingShape
};
//# sourceMappingURL=EditingShape.mjs.map
