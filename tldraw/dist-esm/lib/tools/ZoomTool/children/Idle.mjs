import { StateNode } from "@tldraw/editor";
class Idle extends StateNode {
  static id = "idle";
  info = {};
  onEnter = (info) => {
    this.info = info;
  };
  onPointerDown = () => {
    this.parent.transition("pointing", this.info);
  };
}
export {
  Idle
};
//# sourceMappingURL=Idle.mjs.map
