import { StateNode } from "@tldraw/editor";
class PointingCrop extends StateNode {
  static id = "pointing_crop";
  onCancel = () => {
    this.editor.setCurrentTool("select.crop.idle", {});
  };
  onPointerMove = (info) => {
    if (this.editor.inputs.isDragging) {
      this.editor.setCurrentTool("select.crop.translating_crop", info);
    }
  };
  onPointerUp = (info) => {
    this.editor.setCurrentTool("select.crop.idle", info);
  };
}
export {
  PointingCrop
};
//# sourceMappingURL=PointingCrop.mjs.map
