import { StateNode } from "@tldraw/editor";
import { updateHoveredId } from "../../../tools/selection-logic/updateHoveredId.mjs";
class Idle extends StateNode {
  static id = "idle";
  onPointerMove = (info) => {
    switch (info.target) {
      case "shape":
      case "canvas": {
        updateHoveredId(this.editor);
      }
    }
  };
  onPointerDown = (info) => {
    const { hoveredShape } = this.editor;
    const hitShape = hoveredShape && !this.editor.isShapeOfType(hoveredShape, "group") ? hoveredShape : this.editor.getShapeAtPoint(this.editor.inputs.currentPagePoint);
    if (hitShape) {
      if (this.editor.isShapeOfType(hitShape, "text")) {
        requestAnimationFrame(() => {
          this.editor.setSelectedShapes([hitShape.id]);
          this.editor.setEditingShape(hitShape.id);
          this.editor.setCurrentTool("select.editing_shape", {
            ...info,
            target: "shape",
            shape: hitShape
          });
        });
        return;
      }
    }
    this.parent.transition("pointing", info);
  };
  onEnter = () => {
    this.editor.setCursor({ type: "cross", rotation: 0 });
  };
  onKeyDown = (info) => {
    if (info.key === "Enter") {
      const { onlySelectedShape } = this.editor;
      if (onlySelectedShape && this.editor.getShapeUtil(onlySelectedShape).canEdit(onlySelectedShape)) {
        this.editor.setCurrentTool("select");
        this.editor.setEditingShape(onlySelectedShape.id);
        this.editor.root.current.value.transition("editing_shape", {
          ...info,
          target: "shape",
          shape: onlySelectedShape
        });
      }
    }
  };
  onCancel = () => {
    this.editor.setCurrentTool("select");
  };
}
export {
  Idle
};
//# sourceMappingURL=Idle.mjs.map
