import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import {
  DefaultFontFamilies,
  Rectangle2d,
  ShapeUtil,
  getDefaultColorTheme,
  noteShapeMigrations,
  noteShapeProps,
  toDomPrecision
} from "@tldraw/editor";
import { HyperlinkButton } from "../shared/HyperlinkButton.mjs";
import { useDefaultColorTheme } from "../shared/ShapeFill.mjs";
import { TextLabel } from "../shared/TextLabel.mjs";
import { FONT_FAMILIES, LABEL_FONT_SIZES, TEXT_PROPS } from "../shared/default-shape-constants.mjs";
import { getFontDefForExport } from "../shared/defaultStyleDefs.mjs";
import { getTextLabelSvgElement } from "../shared/getTextLabelSvgElement.mjs";
const NOTE_SIZE = 200;
class NoteShapeUtil extends ShapeUtil {
  static type = "note";
  static props = noteShapeProps;
  static migrations = noteShapeMigrations;
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
    return new Rectangle2d({ width: NOTE_SIZE, height, isFilled: true });
  }
  component(shape) {
    const {
      id,
      type,
      props: { color, font, size, align, text, verticalAlign }
    } = shape;
    const theme = useDefaultColorTheme();
    const adjustedColor = color === "black" ? "yellow" : color;
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            position: "absolute",
            width: NOTE_SIZE,
            height: this.getHeight(shape)
          },
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "tl-note__container",
              style: {
                color: theme[adjustedColor].solid,
                backgroundColor: theme[adjustedColor].solid
              },
              children: [
                /* @__PURE__ */ jsx("div", { className: "tl-note__scrim" }),
                /* @__PURE__ */ jsx(
                  TextLabel,
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
      "url" in shape.props && shape.props.url && /* @__PURE__ */ jsx(HyperlinkButton, { url: shape.props.url, zoomLevel: this.editor.zoomLevel })
    ] });
  }
  indicator(shape) {
    return /* @__PURE__ */ jsx(
      "rect",
      {
        rx: "7",
        width: toDomPrecision(NOTE_SIZE),
        height: toDomPrecision(this.getHeight(shape))
      }
    );
  }
  toSvg(shape, ctx) {
    ctx.addExportDef(getFontDefForExport(shape.props.font));
    const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.isDarkMode });
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
    const textElm = getTextLabelSvgElement({
      editor: this.editor,
      shape,
      font: DefaultFontFamilies[shape.props.font],
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
    ...TEXT_PROPS,
    fontFamily: FONT_FAMILIES[shape.props.font],
    fontSize: LABEL_FONT_SIZES[shape.props.size],
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
export {
  NoteShapeUtil
};
//# sourceMappingURL=NoteShapeUtil.mjs.map
