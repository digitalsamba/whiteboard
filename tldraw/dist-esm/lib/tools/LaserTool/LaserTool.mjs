import { StateNode } from "@tldraw/editor";
import { Idle } from "./children/Idle.mjs";
import { Lasering } from "./children/Lasering.mjs";
class LaserTool extends StateNode {
  static id = "laser";
  static initial = "idle";
  static children = () => [Idle, Lasering];
  onEnter = () => {
    this.editor.setCursor({ type: "cross", rotation: 0 });
  };
}
export {
  LaserTool
};
//# sourceMappingURL=LaserTool.mjs.map
