import { StateNode } from "./StateNode.mjs";
class RootState extends StateNode {
  static id = "root";
  static initial = "";
  static children = () => [];
  onKeyDown = (info) => {
    switch (info.code) {
      case "KeyZ": {
        if (!(info.shiftKey || info.ctrlKey)) {
          const currentTool = this.current.value;
          if (currentTool && currentTool.current.value?.id === "idle") {
            if (this.children["zoom"]) {
              this.editor.setCurrentTool("zoom", { ...info, onInteractionEnd: currentTool.id });
            }
          }
        }
        break;
      }
    }
  };
}
export {
  RootState
};
//# sourceMappingURL=RootState.mjs.map
