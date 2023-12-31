import { StateNode, Vec2d } from "@tldraw/editor";
import { getHitShapeOnCanvasPointerDown } from "../../../../selection-logic/getHitShapeOnCanvasPointerDown.mjs";
import { getTranslateCroppedImageChange } from "./crop_helpers.mjs";
class Idle extends StateNode {
  static id = "idle";
  onEnter = () => {
    this.editor.updateInstanceState(
      { cursor: { type: "default", rotation: 0 } },
      { ephemeral: true }
    );
    const { onlySelectedShape } = this.editor;
    this.editor.on("change-history", this.cleanupCroppingState);
    if (onlySelectedShape) {
      this.editor.mark("crop");
      this.editor.setCroppingShape(onlySelectedShape.id);
    }
  };
  onExit = () => {
    this.editor.updateInstanceState(
      { cursor: { type: "default", rotation: 0 } },
      { ephemeral: true }
    );
    this.editor.off("change-history", this.cleanupCroppingState);
  };
  onCancel = () => {
    this.editor.setCroppingShape(null);
    this.editor.setCurrentTool("select.idle", {});
  };
  onPointerDown = (info) => {
    if (this.editor.isMenuOpen)
      return;
    if (info.ctrlKey) {
      this.cancel();
      this.editor.root.handleEvent(info);
      return;
    }
    switch (info.target) {
      case "canvas": {
        const hitShape = getHitShapeOnCanvasPointerDown(this.editor);
        if (hitShape && !this.editor.isShapeOfType(hitShape, "group")) {
          this.onPointerDown({
            ...info,
            shape: hitShape,
            target: "shape"
          });
          return;
        }
        this.cancel();
        this.editor.root.handleEvent(info);
        break;
      }
      case "shape": {
        if (info.shape.id === this.editor.croppingShapeId) {
          this.editor.setCurrentTool("select.crop.pointing_crop", info);
          return;
        } else {
          if (this.editor.getShapeUtil(info.shape)?.canCrop(info.shape)) {
            this.editor.setCroppingShape(info.shape.id);
            this.editor.setSelectedShapes([info.shape.id]);
            this.editor.setCurrentTool("select.crop.pointing_crop", info);
          } else {
            this.cancel();
            this.editor.root.handleEvent(info);
          }
        }
        break;
      }
      case "selection": {
        switch (info.handle) {
          case "mobile_rotate":
          case "top_left_rotate":
          case "top_right_rotate":
          case "bottom_left_rotate":
          case "bottom_right_rotate": {
            this.editor.setCurrentTool("select.pointing_rotate_handle", {
              ...info,
              onInteractionEnd: "select.crop"
            });
            break;
          }
          case "top":
          case "right":
          case "bottom":
          case "left": {
            this.editor.setCurrentTool("select.pointing_crop_handle", {
              ...info,
              onInteractionEnd: "select.crop"
            });
            break;
          }
          case "top_left":
          case "top_right":
          case "bottom_left":
          case "bottom_right": {
            this.editor.setCurrentTool("select.pointing_crop_handle", {
              ...info,
              onInteractionEnd: "select.crop"
            });
            break;
          }
          default: {
            this.cancel();
          }
        }
        break;
      }
    }
  };
  onDoubleClick = (info) => {
    if (this.editor.inputs.shiftKey || info.phase !== "up")
      return;
    if (!this.editor.croppingShapeId)
      return;
    const shape = this.editor.getShape(this.editor.croppingShapeId);
    if (!shape)
      return;
    const util = this.editor.getShapeUtil(shape);
    if (!util)
      return;
    if (info.target === "selection") {
      util.onDoubleClickEdge?.(shape);
    }
  };
  onKeyDown = () => {
    this.nudgeCroppingImage(false);
  };
  onKeyRepeat = () => {
    this.nudgeCroppingImage(true);
  };
  onKeyUp = (info) => {
    switch (info.code) {
      case "Enter": {
        this.editor.setCroppingShape(null);
        this.editor.setCurrentTool("select.idle", {});
        break;
      }
    }
  };
  cancel() {
    this.editor.setCroppingShape(null);
    this.editor.setCurrentTool("select.idle", {});
  }
  cleanupCroppingState = () => {
    if (!this.editor.croppingShapeId) {
      this.editor.setCurrentTool("select.idle", {});
    }
  };
  nudgeCroppingImage(ephemeral = false) {
    const {
      editor: {
        inputs: { keys }
      }
    } = this;
    const shiftKey = keys.has("ShiftLeft");
    const delta = new Vec2d(0, 0);
    if (keys.has("ArrowLeft"))
      delta.x += 1;
    if (keys.has("ArrowRight"))
      delta.x -= 1;
    if (keys.has("ArrowUp"))
      delta.y += 1;
    if (keys.has("ArrowDown"))
      delta.y -= 1;
    if (delta.equals(new Vec2d(0, 0)))
      return;
    if (shiftKey)
      delta.mul(10);
    const shape = this.editor.getShape(this.editor.croppingShapeId);
    if (!shape)
      return;
    const partial = getTranslateCroppedImageChange(this.editor, shape, delta);
    if (partial) {
      if (!ephemeral) {
        this.editor.mark("translate crop");
      }
      this.editor.updateShapes([partial]);
    }
  }
}
export {
  Idle
};
//# sourceMappingURL=Idle.mjs.map
