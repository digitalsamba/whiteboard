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
var TextShapeUtil_exports = {};
__export(TextShapeUtil_exports, {
  TextShapeUtil: () => TextShapeUtil
});
module.exports = __toCommonJS(TextShapeUtil_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_createTextSvgElementFromSpans = require("../shared/createTextSvgElementFromSpans");
var import_default_shape_constants = require("../shared/default-shape-constants");
var import_defaultStyleDefs = require("../shared/defaultStyleDefs");
var import_resizeScaled = require("../shared/resizeScaled");
var import_useEditableText = require("../shared/useEditableText");
const sizeCache = new import_editor.WeakMapCache();
class TextShapeUtil extends import_editor.ShapeUtil {
  static type = "text";
  static props = import_editor.textShapeProps;
  static migrations = import_editor.textShapeMigrations;
  getDefaultProps() {
    return {
      color: "black",
      size: "m",
      w: 8,
      text: "",
      font: "draw",
      align: "middle",
      autoSize: true,
      scale: 1
    };
  }
  getMinDimensions(shape) {
    return sizeCache.get(shape.props, (props) => getTextSize(this.editor, props));
  }
  getGeometry(shape) {
    const { scale } = shape.props;
    const { width, height } = this.getMinDimensions(shape);
    return new import_editor.Rectangle2d({
      width: width * scale,
      height: height * scale,
      isFilled: true
    });
  }
  canEdit = () => true;
  isAspectRatioLocked = () => true;
  component(shape) {
    const {
      id,
      type,
      props: { text, color }
    } = shape;
    const theme = (0, import_editor.getDefaultColorTheme)({ isDarkMode: this.editor.user.isDarkMode });
    const { width, height } = this.getMinDimensions(shape);
    const {
      rInput,
      isEmpty,
      isEditing,
      isEditingSameShapeType,
      handleFocus,
      handleChange,
      handleKeyDown,
      handleBlur,
      handleInputPointerDown
    } = (0, import_useEditableText.useEditableText)(id, type, text);
    const zoomLevel = (0, import_editor.useValue)("zoomLevel", () => this.editor.zoomLevel, [this.editor]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_editor.HTMLContainer, { id: shape.id, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "tl-text-shape__wrapper tl-text-shadow",
        "data-font": shape.props.font,
        "data-align": shape.props.align,
        "data-hastext": !isEmpty,
        "data-isediting": isEditing,
        "data-textwrap": true,
        style: {
          outline: isEditing ? `${1.5 / zoomLevel / shape.props.scale}px solid var(--color-selected)` : "",
          fontSize: import_default_shape_constants.FONT_SIZES[shape.props.size],
          lineHeight: import_default_shape_constants.FONT_SIZES[shape.props.size] * import_default_shape_constants.TEXT_PROPS.lineHeight + "px",
          transform: `scale(${shape.props.scale})`,
          transformOrigin: "top left",
          width: Math.max(1, width),
          height: Math.max(import_default_shape_constants.FONT_SIZES[shape.props.size] * import_default_shape_constants.TEXT_PROPS.lineHeight, height),
          color: theme[color].solid
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tl-text tl-text-content", dir: "ltr", children: text }),
          isEditing || isEditingSameShapeType ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "textarea",
            {
              ref: rInput,
              className: "tl-text tl-text-input",
              name: "text",
              tabIndex: -1,
              autoComplete: "false",
              autoCapitalize: "false",
              autoCorrect: "false",
              autoSave: "false",
              autoFocus: isEditing,
              placeholder: "",
              spellCheck: "true",
              wrap: "off",
              dir: "ltr",
              datatype: "wysiwyg",
              defaultValue: text,
              onFocus: handleFocus,
              onChange: handleChange,
              onKeyDown: handleKeyDown,
              onBlur: handleBlur,
              onTouchEnd: import_editor.stopEventPropagation,
              onContextMenu: import_editor.stopEventPropagation,
              onPointerDown: handleInputPointerDown
            }
          ) : null
        ]
      }
    ) });
  }
  indicator(shape) {
    const bounds = this.editor.getShapeGeometry(shape).bounds;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: (0, import_editor.toDomPrecision)(bounds.width), height: (0, import_editor.toDomPrecision)(bounds.height) });
  }
  toSvg(shape, ctx) {
    ctx.addExportDef((0, import_defaultStyleDefs.getFontDefForExport)(shape.props.font));
    const theme = (0, import_editor.getDefaultColorTheme)({ isDarkMode: this.editor.user.isDarkMode });
    const bounds = this.editor.getShapeGeometry(shape).bounds;
    const text = shape.props.text;
    const width = bounds.width / (shape.props.scale ?? 1);
    const height = bounds.height / (shape.props.scale ?? 1);
    const opts = {
      fontSize: import_default_shape_constants.FONT_SIZES[shape.props.size],
      fontFamily: import_editor.DefaultFontFamilies[shape.props.font],
      textAlign: shape.props.align,
      verticalTextAlign: "middle",
      width,
      height,
      padding: 0,
      // no padding?
      lineHeight: import_default_shape_constants.TEXT_PROPS.lineHeight,
      fontStyle: "normal",
      fontWeight: "normal",
      overflow: "wrap"
    };
    const color = theme[shape.props.color].solid;
    const groupEl = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const textBgEl = (0, import_createTextSvgElementFromSpans.createTextSvgElementFromSpans)(
      this.editor,
      this.editor.textMeasure.measureTextSpans(text, opts),
      {
        ...opts,
        stroke: theme.background,
        strokeWidth: 2,
        fill: theme.background,
        padding: 0
      }
    );
    const textElm = textBgEl.cloneNode(true);
    textElm.setAttribute("fill", color);
    textElm.setAttribute("stroke", "none");
    groupEl.append(textBgEl);
    groupEl.append(textElm);
    return groupEl;
  }
  onResize = (shape, info) => {
    const { initialBounds, initialShape, scaleX, handle } = info;
    if (info.mode === "scale_shape" || handle !== "right" && handle !== "left") {
      return {
        id: shape.id,
        type: shape.type,
        ...(0, import_resizeScaled.resizeScaled)(shape, info)
      };
    } else {
      const prevWidth = initialBounds.width;
      let nextWidth = prevWidth * scaleX;
      const offset = new import_editor.Vec2d(0, 0);
      nextWidth = Math.max(1, Math.abs(nextWidth));
      if (handle === "left") {
        offset.x = prevWidth - nextWidth;
        if (scaleX < 0) {
          offset.x += nextWidth;
        }
      } else {
        if (scaleX < 0) {
          offset.x -= nextWidth;
        }
      }
      const { x, y } = offset.rot(shape.rotation).add(initialShape);
      return {
        id: shape.id,
        type: shape.type,
        x,
        y,
        props: {
          w: nextWidth / initialShape.props.scale,
          autoSize: false
        }
      };
    }
  };
  onBeforeCreate = (shape) => {
    if (!shape.props.autoSize)
      return;
    if (shape.props.text.trim())
      return;
    const bounds = this.getMinDimensions(shape);
    return {
      ...shape,
      x: shape.x - bounds.width / 2,
      y: shape.y - bounds.height / 2
    };
  };
  onEditEnd = (shape) => {
    const {
      id,
      type,
      props: { text }
    } = shape;
    const trimmedText = shape.props.text.trimEnd();
    if (trimmedText.length === 0) {
      this.editor.deleteShapes([shape.id]);
    } else {
      if (trimmedText !== shape.props.text) {
        this.editor.updateShapes([
          {
            id,
            type,
            props: {
              text: text.trimEnd()
            }
          }
        ]);
      }
    }
  };
  onBeforeUpdate = (prev, next) => {
    if (!next.props.autoSize)
      return;
    const styleDidChange = prev.props.size !== next.props.size || prev.props.align !== next.props.align || prev.props.font !== next.props.font || prev.props.scale !== 1 && next.props.scale === 1;
    const textDidChange = prev.props.text !== next.props.text;
    if (!styleDidChange && !textDidChange)
      return;
    const boundsA = this.getMinDimensions(prev);
    const boundsB = getTextSize(this.editor, next.props);
    const wA = boundsA.width * prev.props.scale;
    const hA = boundsA.height * prev.props.scale;
    const wB = boundsB.width * next.props.scale;
    const hB = boundsB.height * next.props.scale;
    let delta;
    switch (next.props.align) {
      case "middle": {
        delta = new import_editor.Vec2d((wB - wA) / 2, textDidChange ? 0 : (hB - hA) / 2);
        break;
      }
      case "end": {
        delta = new import_editor.Vec2d(wB - wA, textDidChange ? 0 : (hB - hA) / 2);
        break;
      }
      default: {
        if (textDidChange)
          break;
        delta = new import_editor.Vec2d(0, (hB - hA) / 2);
        break;
      }
    }
    if (delta) {
      delta.rot(next.rotation);
      const { x, y } = next;
      return {
        ...next,
        x: x - delta.x,
        y: y - delta.y,
        props: { ...next.props, w: wB }
      };
    } else {
      return {
        ...next,
        props: { ...next.props, w: wB }
      };
    }
  };
  onDoubleClickEdge = (shape) => {
    if (!shape.props.autoSize) {
      return {
        id: shape.id,
        type: shape.type,
        props: {
          autoSize: true
        }
      };
    }
    if (shape.props.scale !== 1) {
      return {
        id: shape.id,
        type: shape.type,
        props: {
          scale: 1
        }
      };
    }
  };
}
function getTextSize(editor, props) {
  const { font, text, autoSize, size, w } = props;
  const minWidth = 16;
  const fontSize = import_default_shape_constants.FONT_SIZES[size];
  const cw = autoSize ? "fit-content" : (
    // `measureText` floors the number so we need to do the same here to avoid issues.
    Math.floor(Math.max(minWidth, w)) + "px"
  );
  const result = editor.textMeasure.measureText(text, {
    ...import_default_shape_constants.TEXT_PROPS,
    fontFamily: import_default_shape_constants.FONT_FAMILIES[font],
    fontSize,
    width: cw
  });
  if (autoSize) {
    result.w += 1;
  }
  return {
    width: Math.max(minWidth, result.w),
    height: Math.max(fontSize, result.h)
  };
}
//# sourceMappingURL=TextShapeUtil.js.map
