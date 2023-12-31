"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ShapeUtil_exports = {};
__export(ShapeUtil_exports, {
  ShapeUtil: () => ShapeUtil
});
module.exports = __toCommonJS(ShapeUtil_exports);
class ShapeUtil {
  constructor(editor) {
    this.editor = editor;
  }
  static props;
  static migrations;
  /**
   * The type of the shape util, which should match the shape's type.
   *
   * @public
   */
  static type;
  /**
   * Whether the shape can be snapped to by another shape.
   *
   * @public
   */
  canSnap = () => true;
  /**
   * Whether the shape can be scrolled while editing.
   *
   * @public
   */
  canScroll = () => false;
  /**
   * Whether the shape should unmount when not visible in the editor. Consider keeping this to false if the shape's `component` has local state.
   *
   * @public
   */
  canUnmount = () => true;
  /**
   * Whether the shape can be bound to by an arrow.
   *
   * @param _otherShape - The other shape attempting to bind to this shape.
   * @public
   */
  canBind = (_shape, _otherShape) => true;
  /**
   * Whether the shape can be double clicked to edit.
   *
   * @public
   */
  canEdit = () => false;
  /**
   * Whether the shape can be resized.
   *
   * @public
   */
  canResize = () => true;
  /**
   * Whether the shape can be cropped.
   *
   * @public
   */
  canCrop = () => false;
  /**
   * Does this shape provide a background for its children? If this is true,
   * then any children with a `renderBackground` method will have their
   * backgrounds rendered _above_ this shape. Otherwise, the children's
   * backgrounds will be rendered above either the next ancestor that provides
   * a background, or the canvas background.
   *
   * @internal
   */
  providesBackgroundForChildren(shape) {
    return false;
  }
  /**
   * Whether the shape should hide its resize handles when selected.
   *
   * @public
   */
  hideResizeHandles = () => false;
  /**
   * Whether the shape should hide its resize handles when selected.
   *
   * @public
   */
  hideRotateHandle = () => false;
  /**
   * Whether the shape should hide its selection bounds background when selected.
   *
   * @public
   */
  hideSelectionBoundsBg = () => false;
  /**
   * Whether the shape should hide its selection bounds foreground when selected.
   *
   * @public
   */
  hideSelectionBoundsFg = () => false;
  /**
   * Whether the shape's aspect ratio is locked.
   *
   * @public
   */
  isAspectRatioLocked = () => false;
  /**
   * Get an array of outline segments for the shape. For most shapes,
   * this will be a single segment that includes the entire outline.
   * For shapes with handles, this might be segments of the outline
   * between each handle.
   *
   * @example
   *
   * ```ts
   * util.getOutlineSegments(myShape)
   * ```
   *
   * @param shape - The shape.
   * @public
   */
  getOutlineSegments(shape) {
    return [this.editor.getShapeGeometry(shape).vertices];
  }
  /**
   * Get whether the shape can receive children of a given type.
   *
   * @param type - The shape type.
   * @public
   */
  canReceiveNewChildrenOfType(shape, type) {
    return false;
  }
  /**
   * Get whether the shape can receive children of a given type.
   *
   * @param shape - The shape type.
   * @param shapes - The shapes that are being dropped.
   * @public
   */
  canDropShapes(shape, shapes) {
    return false;
  }
  /** @internal */
  expandSelectionOutlinePx(shape) {
    return 0;
  }
  /**
   * Return elements to be added to the \<defs\> section of the canvases SVG context. This can be
   * used to define SVG content (e.g. patterns & masks) that can be referred to by ID from svg
   * elements returned by `component`.
   *
   * Each def should have a unique `key`. If multiple defs from different shapes all have the same
   * key, only one will be used.
   */
  getCanvasSvgDefs() {
    return [];
  }
  //  Events
  /**
   * A callback called just before a shape is created. This method provides a last chance to modify
   * the created shape.
   *
   * @example
   *
   * ```ts
   * onBeforeCreate = (next) => {
   * 	return { ...next, x: next.x + 1 }
   * }
   * ```
   *
   * @param next - The next shape.
   * @returns The next shape or void.
   * @public
   */
  onBeforeCreate;
  /**
   * A callback called just before a shape is updated. This method provides a last chance to modify
   * the updated shape.
   *
   * @example
   *
   * ```ts
   * onBeforeUpdate = (prev, next) => {
   * 	if (prev.x === next.x) {
   * 		return { ...next, x: next.x + 1 }
   * 	}
   * }
   * ```
   *
   * @param prev - The previous shape.
   * @param next - The next shape.
   * @returns The next shape or void.
   * @public
   */
  onBeforeUpdate;
  /**
   * A callback called when some other shapes are dragged over this one.
   *
   * @example
   *
   * ```ts
   * onDragShapesOver = (shape, shapes) => {
   * 	return { shouldHint: true }
   * }
   * ```
   *
   * @param shape - The shape.
   * @param shapes - The shapes that are being dragged over this one.
   * @returns An object specifying whether the shape should hint that it can receive the dragged shapes.
   * @public
   */
  onDragShapesOver;
  /**
   * A callback called when some other shapes are dragged out of this one.
   *
   * @param shape - The shape.
   * @param shapes - The shapes that are being dragged out.
   * @public
   */
  onDragShapesOut;
  /**
   * A callback called when some other shapes are dropped over this one.
   *
   * @param shape - The shape.
   * @param shapes - The shapes that are being dropped over this one.
   * @public
   */
  onDropShapesOver;
  /**
   * A callback called when a shape starts being resized.
   *
   * @param shape - The shape.
   * @returns A change to apply to the shape, or void.
   * @public
   */
  onResizeStart;
  /**
   * A callback called when a shape changes from a resize.
   *
   * @param shape - The shape at the start of the resize.
   * @param info - Info about the resize.
   * @returns A change to apply to the shape, or void.
   * @public
   */
  onResize;
  /**
   * A callback called when a shape finishes resizing.
   *
   * @param initial - The shape at the start of the resize.
   * @param current - The current shape.
   * @returns A change to apply to the shape, or void.
   * @public
   */
  onResizeEnd;
  /**
   * A callback called when a shape starts being translated.
   *
   * @param shape - The shape.
   * @returns A change to apply to the shape, or void.
   * @public
   */
  onTranslateStart;
  /**
   * A callback called when a shape changes from a translation.
   *
   * @param initial - The shape at the start of the translation.
   * @param current - The current shape.
   * @returns A change to apply to the shape, or void.
   * @public
   */
  onTranslate;
  /**
   * A callback called when a shape finishes translating.
   *
   * @param initial - The shape at the start of the translation.
   * @param current - The current shape.
   * @returns A change to apply to the shape, or void.
   * @public
   */
  onTranslateEnd;
  /**
   * A callback called when a shape starts being rotated.
   *
   * @param shape - The shape.
   * @returns A change to apply to the shape, or void.
   * @public
   */
  onRotateStart;
  /**
   * A callback called when a shape changes from a rotation.
   *
   * @param initial - The shape at the start of the rotation.
   * @param current - The current shape.
   * @returns A change to apply to the shape, or void.
   * @public
   */
  onRotate;
  /**
   * A callback called when a shape finishes rotating.
   *
   * @param initial - The shape at the start of the rotation.
   * @param current - The current shape.
   * @returns A change to apply to the shape, or void.
   * @public
   */
  onRotateEnd;
  /**
   * A callback called when a shape's handle changes.
   *
   * @param shape - The shape.
   * @param info - An object containing the handle and whether the handle is 'precise' or not.
   * @returns A change to apply to the shape, or void.
   * @public
   */
  onHandleChange;
  /**
   * Not currently used.
   *
   * @internal
   */
  onBindingChange;
  /**
   * A callback called when a shape's children change.
   *
   * @param shape - The shape.
   * @returns An array of shape updates, or void.
   * @public
   */
  onChildrenChange;
  /**
   * A callback called when a shape's handle is double clicked.
   *
   * @param shape - The shape.
   * @param handle - The handle that is double-clicked.
   * @returns A change to apply to the shape, or void.
   * @public
   */
  onDoubleClickHandle;
  /**
   * A callback called when a shape's edge is double clicked.
   *
   * @param shape - The shape.
   * @returns A change to apply to the shape, or void.
   * @public
   */
  onDoubleClickEdge;
  /**
   * A callback called when a shape is double clicked.
   *
   * @param shape - The shape.
   * @returns A change to apply to the shape, or void.
   * @public
   */
  onDoubleClick;
  /**
   * A callback called when a shape is clicked.
   *
   * @param shape - The shape.
   * @returns A change to apply to the shape, or void.
   * @public
   */
  onClick;
  /**
   * A callback called when a shape finishes being editing.
   *
   * @param shape - The shape.
   * @public
   */
  onEditEnd;
}
//# sourceMappingURL=ShapeUtil.js.map
