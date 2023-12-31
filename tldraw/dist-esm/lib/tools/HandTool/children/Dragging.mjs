import { CAMERA_SLIDE_FRICTION, StateNode, Vec2d } from "@tldraw/editor";
class Dragging extends StateNode {
  static id = "dragging";
  onEnter = () => {
    this.update();
  };
  onPointerMove = () => {
    this.update();
  };
  onPointerUp = () => {
    this.complete();
  };
  onCancel = () => {
    this.complete();
  };
  onComplete = () => {
    this.complete();
  };
  update() {
    const { currentScreenPoint, previousScreenPoint } = this.editor.inputs;
    const delta = Vec2d.Sub(currentScreenPoint, previousScreenPoint);
    if (Math.abs(delta.x) > 0 || Math.abs(delta.y) > 0) {
      this.editor.pan(delta);
    }
  }
  complete() {
    this.editor.slideCamera({
      speed: Math.min(2, this.editor.inputs.pointerVelocity.len()),
      direction: this.editor.inputs.pointerVelocity,
      friction: CAMERA_SLIDE_FRICTION
    });
    this.parent.transition("idle", {});
  }
}
export {
  Dragging
};
//# sourceMappingURL=Dragging.mjs.map
