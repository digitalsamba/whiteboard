import { StateNode } from "@tldraw/editor";
class Idle extends StateNode {
  static id = "idle";
  onPointerDown = (info) => {
    this.parent.transition("lasering", info);
  };
}
export {
  Idle
};
//# sourceMappingURL=Idle.mjs.map
