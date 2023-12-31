import { jsx, jsxs } from "react/jsx-runtime";
import {
  DefaultFontFamilies,
  HTMLContainer,
  Rectangle2d,
  ShapeUtil,
  Vec2d,
  WeakMapCache,
  getDefaultColorTheme,
  stopEventPropagation,
  textShapeMigrations,
  textShapeProps,
  toDomPrecision,
  useValue
} from "@tldraw/editor";
import { createTextSvgElementFromSpans } from "../shared/createTextSvgElementFromSpans.mjs";
import { FONT_FAMILIES, FONT_SIZES, TEXT_PROPS } from "../shared/default-shape-constants.mjs";
import { getFontDefForExport } from "../shared/defaultStyleDefs.mjs";
import { resizeScaled } from "../shared/resizeScaled.mjs";
import { useEditableText } from "../shared/useEditableText.mjs";
const sizeCache = new WeakMapCache();
class TextShapeUtil extends ShapeUtil {
  static type = "text";
  static props = textShapeProps;
  static migrations = textShapeMigrations;
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
    return new Rectangle2d({
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
    const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.isDarkMode });
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
    } = useEditableText(id, type, text);
    const zoomLevel = useValue("zoomLevel", () => this.editor.zoomLevel, [this.editor]);
    return /* @__PURE__ */ jsx(HTMLContainer, { id: shape.id, children: /* @__PURE__ */ jsxs(
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
          fontSize: FONT_SIZES[shape.props.size],
          lineHeight: FONT_SIZES[shape.props.size] * TEXT_PROPS.lineHeight + "px",
          transform: `scale(${shape.props.scale})`,
          transformOrigin: "top left",
          width: Math.max(1, width),
          height: Math.max(FONT_SIZES[shape.props.size] * TEXT_PROPS.lineHeight, height),
          color: theme[color].solid
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "tl-text tl-text-content", dir: "ltr", children: text }),
          isEditing || isEditingSameShapeType ? /* @__PURE__ */ jsx(
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
              onTouchEnd: stopEventPropagation,
              onContextMenu: stopEventPropagation,
              onPointerDown: handleInputPointerDown
            }
          ) : null
        ]
      }
    ) });
  }
  indicator(shape) {
    const bounds = this.editor.getShapeGeometry(shape).bounds;
    return /* @__PURE__ */ jsx("rect", { width: toDomPrecision(bounds.width), height: toDomPrecision(bounds.height) });
  }
  toSvg(shape, ctx) {
    ctx.addExportDef(getFontDefForExport(shape.props.font));
    const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.isDarkMode });
    const bounds = this.editor.getShapeGeometry(shape).bounds;
    const text = shape.props.text;
    const width = bounds.width / (shape.props.scale ?? 1);
    const height = bounds.height / (shape.props.scale ?? 1);
    const opts = {
      fontSize: FONT_SIZES[shape.props.size],
      fontFamily: DefaultFontFamilies[shape.props.font],
      textAlign: shape.props.align,
      verticalTextAlign: "middle",
      width,
      height,
      padding: 0,
      // no padding?
      lineHeight: TEXT_PROPS.lineHeight,
      fontStyle: "normal",
      fontWeight: "normal",
      overflow: "wrap"
    };
    const color = theme[shape.props.color].solid;
    const groupEl = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const textBgEl = createTextSvgElementFromSpans(
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
        ...resizeScaled(shape, info)
      };
    } else {
      const prevWidth = initialBounds.width;
      let nextWidth = prevWidth * scaleX;
      const offset = new Vec2d(0, 0);
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
        delta = new Vec2d((wB - wA) / 2, textDidChange ? 0 : (hB - hA) / 2);
        break;
      }
      case "end": {
        delta = new Vec2d(wB - wA, textDidChange ? 0 : (hB - hA) / 2);
        break;
      }
      default: {
        if (textDidChange)
          break;
        delta = new Vec2d(0, (hB - hA) / 2);
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
  const fontSize = FONT_SIZES[size];
  const cw = autoSize ? "fit-content" : (
    // `measureText` floors the number so we need to do the same here to avoid issues.
    (Math.floor(Math.max(minWidth, w)) + "px")
  );
  const result = editor.textMeasure.measureText(text, {
    ...TEXT_PROPS,
    fontFamily: FONT_FAMILIES[font],
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
export {
  TextShapeUtil
};
//# sourceMappingURL=TextShapeUtil.mjs.map
