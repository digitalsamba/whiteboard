import { StateNode } from "@tldraw/editor";
import { Idle } from "./children/Idle.mjs";
import { Pointing } from "./children/Pointing.mjs";
import { ZoomBrushing } from "./children/ZoomBrushing.mjs";
class ZoomTool extends StateNode {
  static id = "zoom";
  static initial = "idle";
  static children = () => [Idle, ZoomBrushing, Pointing];
  info = {};
  onEnter = (info) => {
    this.info = info;
    this.currentToolIdMask = info.onInteractionEnd;
    this.updateCursor();
  };
  onExit = () => {
    this.currentToolIdMask = void 0;
    this.editor.updateInstanceState(
      { zoomBrush: null, cursor: { type: "default", rotation: 0 } },
      { ephemeral: true }
    );
    this.currentToolIdMask = void 0;
  };
  onKeyDown = () => {
    this.updateCursor();
  };
  onKeyUp = (info) => {
    this.updateCursor();
    if (info.code === "KeyZ") {
      this.complete();
    }
  };
  onInterrupt = () => {
    this.complete();
  };
  complete() {
    if (this.info.onInteractionEnd && this.info.onInteractionEnd !== "select") {
      this.editor.setCurrentTool(this.info.onInteractionEnd, this.info);
    } else {
      this.parent.transition("select", {});
    }
  }
  updateCursor() {
    if (this.editor.inputs.altKey) {
      this.editor.updateInstanceState(
        { cursor: { type: "zoom-out", rotation: 0 } },
        { ephemeral: true }
      );
    } else {
      this.editor.updateInstanceState(
        { cursor: { type: "zoom-in", rotation: 0 } },
        { ephemeral: true }
      );
    }
  }
}
export {
  ZoomTool
};
//# sourceMappingURL=ZoomTool.mjs.map
