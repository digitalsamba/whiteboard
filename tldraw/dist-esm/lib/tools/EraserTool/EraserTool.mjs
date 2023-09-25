import { StateNode } from "@tldraw/editor";
import { Erasing } from "./children/Erasing.mjs";
import { Idle } from "./children/Idle.mjs";
import { Pointing } from "./children/Pointing.mjs";
class EraserTool extends StateNode {
  static id = "eraser";
  static initial = "idle";
  static children = () => [Idle, Pointing, Erasing];
  onEnter = () => {
    this.editor.setCursor({ type: "cross", rotation: 0 });
  };
}
export {
  EraserTool
};
//# sourceMappingURL=EraserTool.mjs.map
