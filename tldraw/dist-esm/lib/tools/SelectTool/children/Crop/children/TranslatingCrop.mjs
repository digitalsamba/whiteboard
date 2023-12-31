import { StateNode } from "@tldraw/editor";
import { getTranslateCroppedImageChange } from "./crop_helpers.mjs";
class TranslatingCrop extends StateNode {
  static id = "translating_crop";
  info = {};
  markId = "translating crop";
  snapshot = {};
  onEnter = (info) => {
    this.info = info;
    this.snapshot = this.createSnapshot();
    this.editor.mark(this.markId);
    this.editor.setCursor({ type: "move", rotation: 0 });
    this.updateShapes();
  };
  onExit = () => {
    this.editor.updateInstanceState(
      { cursor: { type: "default", rotation: 0 } },
      { ephemeral: true }
    );
  };
  onPointerMove = () => {
    this.updateShapes();
  };
  onPointerUp = () => {
    this.complete();
  };
  onComplete = () => {
    this.complete();
  };
  onCancel = () => {
    this.cancel();
  };
  onKeyDown = (info) => {
    switch (info.key) {
      case "Alt":
      case "Shift": {
        this.updateShapes();
        return;
      }
    }
  };
  onKeyUp = (info) => {
    switch (info.key) {
      case "Enter": {
        this.complete();
        return;
      }
      case "Alt":
      case "Shift": {
        this.updateShapes();
      }
    }
  };
  complete() {
    this.updateShapes();
    this.editor.setCurrentTool("select.crop.idle", this.info);
  }
  cancel() {
    this.editor.bailToMark(this.markId);
    this.editor.setCurrentTool("select.crop.idle", this.info);
  }
  createSnapshot() {
    const shape = this.editor.onlySelectedShape;
    return { shape };
  }
  updateShapes() {
    const shape = this.snapshot.shape;
    if (!shape)
      return;
    const { originPagePoint, currentPagePoint } = this.editor.inputs;
    const delta = currentPagePoint.clone().sub(originPagePoint);
    const partial = getTranslateCroppedImageChange(this.editor, shape, delta);
    if (partial) {
      this.editor.updateShapes([partial], { squashing: true });
    }
  }
}
export {
  TranslatingCrop
};
//# sourceMappingURL=TranslatingCrop.mjs.map
