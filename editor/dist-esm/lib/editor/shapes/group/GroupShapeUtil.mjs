import { jsx } from "react/jsx-runtime";
import { groupShapeMigrations, groupShapeProps } from "@tldraw/tlschema";
import { SVGContainer } from "../../../components/SVGContainer.mjs";
import { Group2d } from "../../../primitives/geometry/Group2d.mjs";
import { Polygon2d } from "../../../primitives/geometry/Polygon2d.mjs";
import { Polyline2d } from "../../../primitives/geometry/Polyline2d.mjs";
import { Rectangle2d } from "../../../primitives/geometry/Rectangle2d.mjs";
import { ShapeUtil } from "../ShapeUtil.mjs";
import { DashedOutlineBox } from "./DashedOutlineBox.mjs";
class GroupShapeUtil extends ShapeUtil {
  static type = "group";
  static props = groupShapeProps;
  static migrations = groupShapeMigrations;
  hideSelectionBoundsFg = () => true;
  canBind = () => false;
  getDefaultProps() {
    return {};
  }
  getGeometry(shape) {
    const children = this.editor.getSortedChildIdsForParent(shape.id);
    if (children.length === 0) {
      return new Rectangle2d({ width: 1, height: 1, isFilled: false });
    }
    return new Group2d({
      children: children.map((childId) => {
        const shape2 = this.editor.getShape(childId);
        const geometry = this.editor.getShapeGeometry(childId);
        const points = this.editor.getShapeLocalTransform(shape2).applyToPoints(geometry.vertices);
        if (geometry.isClosed) {
          return new Polygon2d({
            points,
            isFilled: true
          });
        }
        return new Polyline2d({
          points
        });
      })
    });
  }
  component(shape) {
    const {
      erasingShapeIds,
      currentPageState: { hintingShapeIds, focusedGroupId },
      zoomLevel
    } = this.editor;
    const isErasing = erasingShapeIds.includes(shape.id);
    const isHintingOtherGroup = hintingShapeIds.length > 0 && hintingShapeIds.some(
      (id) => id !== shape.id && this.editor.isShapeOfType(this.editor.getShape(id), "group")
    );
    if (
      // always show the outline while we're erasing the group
      !isErasing && // show the outline while the group is focused unless something outside of the group is being hinted
      // this happens dropping shapes from a group onto some outside group
      (shape.id !== focusedGroupId || isHintingOtherGroup)
    ) {
      return null;
    }
    const bounds = this.editor.getShapeGeometry(shape).bounds;
    return /* @__PURE__ */ jsx(SVGContainer, { id: shape.id, children: /* @__PURE__ */ jsx(DashedOutlineBox, { className: "tl-group", bounds, zoomLevel }) });
  }
  indicator(shape) {
    const {
      camera: { z: zoomLevel }
    } = this.editor;
    const bounds = this.editor.getShapeGeometry(shape).bounds;
    return /* @__PURE__ */ jsx(DashedOutlineBox, { className: "", bounds, zoomLevel });
  }
  onChildrenChange = (group) => {
    const children = this.editor.getSortedChildIdsForParent(group.id);
    if (children.length === 0) {
      if (this.editor.currentPageState.focusedGroupId === group.id) {
        this.editor.popFocusedGroupId();
      }
      this.editor.deleteShapes([group.id]);
      return;
    } else if (children.length === 1) {
      if (this.editor.currentPageState.focusedGroupId === group.id) {
        this.editor.popFocusedGroupId();
      }
      this.editor.reparentShapes(children, group.parentId);
      this.editor.deleteShapes([group.id]);
      return;
    }
  };
}
export {
  GroupShapeUtil
};
//# sourceMappingURL=GroupShapeUtil.mjs.map
