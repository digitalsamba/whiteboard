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
var NoteShapeUtil_exports = {};
__export(NoteShapeUtil_exports, {
  NoteShapeUtil: () => NoteShapeUtil
});
module.exports = __toCommonJS(NoteShapeUtil_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_HyperlinkButton = require("../shared/HyperlinkButton");
var import_ShapeFill = require("../shared/ShapeFill");
var import_TextLabel = require("../shared/TextLabel");
var import_default_shape_constants = require("../shared/default-shape-constants");
var import_defaultStyleDefs = require("../shared/defaultStyleDefs");
var import_getTextLabelSvgElement = require("../shared/getTextLabelSvgElement");
const NOTE_SIZE = 200;
class NoteShapeUtil extends import_editor.ShapeUtil {
  static type = "note";
  static props = import_editor.noteShapeProps;
  static migrations = import_editor.noteShapeMigrations;
  canEdit = () => true;
  hideResizeHandles = () => true;
  hideSelectionBoundsFg = () => true;
  getDefaultProps() {
    return {
      color: "black",
      size: "m",
      text: "",
      font: "draw",
      align: "middle",
      verticalAlign: "middle",
      growY: 0,
      url: ""
    };
  }
  getHeight(shape) {
    return NOTE_SIZE + shape.props.growY;
  }
  getGeometry(shape) {
    const height = this.getHeight(shape);
    return new import_editor.Rectangle2d({ width: NOTE_SIZE, height, isFilled: true });
  }
  component(shape) {
    const {
      id,
      type,
      props: { color, font, size, align, text, verticalAlign }
    } = shape;
    const theme = (0, import_ShapeFill.useDefaultColorTheme)();
    const adjustedColor = color === "black" ? "yellow" : color;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          style: {
            position: "absolute",
            width: NOTE_SIZE,
            height: this.getHeight(shape)
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              className: "tl-note__container",
              style: {
                color: theme[adjustedColor].solid,
                backgroundColor: theme[adjustedColor].solid
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tl-note__scrim" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_TextLabel.TextLabel,
                  {
                    id,
                    type,
                    font,
                    size,
                    align,
                    verticalAlign,
                    text,
                    labelColor: "black",
                    wrap: true
                  }
                )
              ]
            }
          )
        }
      ),
      "url" in shape.props && shape.props.url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_HyperlinkButton.HyperlinkButton, { url: shape.props.url, zoomLevel: this.editor.zoomLevel })
    ] });
  }
  indicator(shape) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "rect",
      {
        rx: "7",
        width: (0, import_editor.toDomPrecision)(NOTE_SIZE),
        height: (0, import_editor.toDomPrecision)(this.getHeight(shape))
      }
    );
  }
  toSvg(shape, ctx) {
    ctx.addExportDef((0, import_defaultStyleDefs.getFontDefForExport)(shape.props.font));
    const theme = (0, import_editor.getDefaultColorTheme)({ isDarkMode: this.editor.user.isDarkMode });
    const bounds = this.editor.getShapeGeometry(shape).bounds;
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const adjustedColor = shape.props.color === "black" ? "yellow" : shape.props.color;
    const rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect1.setAttribute("rx", "10");
    rect1.setAttribute("width", NOTE_SIZE.toString());
    rect1.setAttribute("height", bounds.height.toString());
    rect1.setAttribute("fill", theme[adjustedColor].solid);
    rect1.setAttribute("stroke", theme[adjustedColor].solid);
    rect1.setAttribute("stroke-width", "1");
    g.appendChild(rect1);
    const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect2.setAttribute("rx", "10");
    rect2.setAttribute("width", NOTE_SIZE.toString());
    rect2.setAttribute("height", bounds.height.toString());
    rect2.setAttribute("fill", theme.background);
    rect2.setAttribute("opacity", ".28");
    g.appendChild(rect2);
    const textElm = (0, import_getTextLabelSvgElement.getTextLabelSvgElement)({
      editor: this.editor,
      shape,
      font: import_editor.DefaultFontFamilies[shape.props.font],
      bounds
    });
    textElm.setAttribute("fill", theme.text);
    textElm.setAttribute("stroke", "none");
    g.appendChild(textElm);
    return g;
  }
  onBeforeCreate = (next) => {
    return getGrowY(this.editor, next, next.props.growY);
  };
  onBeforeUpdate = (prev, next) => {
    if (prev.props.text === next.props.text && prev.props.font === next.props.font && prev.props.size === next.props.size) {
      return;
    }
    return getGrowY(this.editor, next, prev.props.growY);
  };
  onEditEnd = (shape) => {
    const {
      id,
      type,
      props: { text }
    } = shape;
    if (text.trimEnd() !== shape.props.text) {
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
  };
}
function getGrowY(editor, shape, prevGrowY = 0) {
  const PADDING = 17;
  const nextTextSize = editor.textMeasure.measureText(shape.props.text, {
    ...import_default_shape_constants.TEXT_PROPS,
    fontFamily: import_default_shape_constants.FONT_FAMILIES[shape.props.font],
    fontSize: import_default_shape_constants.LABEL_FONT_SIZES[shape.props.size],
    width: NOTE_SIZE - PADDING * 2 + "px"
  });
  const nextHeight = nextTextSize.h + PADDING * 2;
  let growY = null;
  if (nextHeight > NOTE_SIZE) {
    growY = nextHeight - NOTE_SIZE;
  } else {
    if (prevGrowY) {
      growY = 0;
    }
  }
  if (growY !== null) {
    return {
      ...shape,
      props: {
        ...shape.props,
        growY
      }
    };
  }
}
//# sourceMappingURL=NoteShapeUtil.js.map
