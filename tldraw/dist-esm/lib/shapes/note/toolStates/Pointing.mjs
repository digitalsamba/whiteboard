import {
  StateNode,
  createShapeId
} from "@tldraw/editor";
class Pointing extends StateNode {
  static id = "pointing";
  dragged = false;
  info = {};
  wasFocusedOnEnter = false;
  markId = "";
  shape = {};
  onEnter = () => {
    this.wasFocusedOnEnter = !this.editor.isMenuOpen;
    if (this.wasFocusedOnEnter) {
      this.shape = this.createShape();
    }
  };
  onPointerMove = (info) => {
    if (this.editor.inputs.isDragging) {
      if (!this.wasFocusedOnEnter) {
        this.shape = this.createShape();
      }
      this.editor.setCurrentTool("select.translating", {
        ...info,
        target: "shape",
        shape: this.shape,
        isCreating: true,
        editAfterComplete: true,
        onInteractionEnd: "note"
      });
    }
  };
  onPointerUp = () => {
    this.complete();
  };
  onInterrupt = () => {
    this.cancel();
  };
  onComplete = () => {
    this.complete();
  };
  onCancel = () => {
    this.cancel();
  };
  complete() {
    if (this.wasFocusedOnEnter) {
      if (this.editor.instanceState.isToolLocked) {
        this.parent.transition("idle", {});
      } else {
        this.editor.setEditingShape(this.shape.id);
        this.editor.setCurrentTool("select.editing_shape", {
          ...this.info,
          target: "shape",
          shape: this.shape
        });
      }
    }
  }
  cancel() {
    this.editor.bailToMark(this.markId);
    this.parent.transition("idle", this.info);
  }
  createShape() {
    const {
      inputs: { originPagePoint }
    } = this.editor;
    const id = createShapeId();
    this.markId = `creating:${id}`;
    this.editor.mark(this.markId);
    this.editor.createShapes([
      {
        id,
        type: "note",
        x: originPagePoint.x,
        y: originPagePoint.y
      }
    ]).select(id);
    const shape = this.editor.getShape(id);
    const bounds = this.editor.getShapeGeometry(shape).bounds;
    this.editor.updateShapes([
      {
        id,
        type: "note",
        x: shape.x - bounds.width / 2,
        y: shape.y - bounds.height / 2
      }
    ]);
    return this.editor.getShape(id);
  }
}
export {
  Pointing
};
//# sourceMappingURL=Pointing.mjs.map
