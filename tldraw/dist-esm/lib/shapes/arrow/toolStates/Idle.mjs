import { StateNode } from "@tldraw/editor";
class Idle extends StateNode {
  static id = "idle";
  onPointerDown = (info) => {
    this.parent.transition("pointing", info);
  };
  onEnter = () => {
    this.editor.setCursor({ type: "cross", rotation: 0 });
  };
  onCancel = () => {
    this.editor.setCurrentTool("select");
  };
  onKeyUp = (info) => {
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
}
export {
  Idle
};
//# sourceMappingURL=Idle.mjs.map
