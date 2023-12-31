import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import {
  BaseBoxShapeUtil,
  Rectangle2d,
  SVGContainer,
  canonicalizeRotation,
  frameShapeMigrations,
  frameShapeProps,
  getDefaultColorTheme,
  last,
  toDomPrecision
} from "@tldraw/editor";
import { useDefaultColorTheme } from "../shared/ShapeFill.mjs";
import { createTextSvgElementFromSpans } from "../shared/createTextSvgElementFromSpans.mjs";
import { FrameHeading } from "./components/FrameHeading.mjs";
function defaultEmptyAs(str, dflt) {
  if (str.match(/^\s*$/)) {
    return dflt;
  }
  return str;
}
class FrameShapeUtil extends BaseBoxShapeUtil {
  static type = "frame";
  static props = frameShapeProps;
  static migrations = frameShapeMigrations;
  canBind = () => true;
  canEdit = () => true;
  getDefaultProps() {
    return { w: 160 * 2, h: 90 * 2, name: "" };
  }
  getGeometry(shape) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: false
    });
  }
  component(shape) {
    const bounds = this.editor.getShapeGeometry(shape).bounds;
    const theme = useDefaultColorTheme();
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(SVGContainer, { children: /* @__PURE__ */ jsx(
        "rect",
        {
          className: "tl-frame__body",
          width: bounds.width,
          height: bounds.height,
          fill: theme.solid,
          stroke: theme.text
        }
      ) }),
      /* @__PURE__ */ jsx(
        FrameHeading,
        {
          id: shape.id,
          name: shape.props.name,
          width: bounds.width,
          height: bounds.height
        }
      )
    ] });
  }
  toSvg(shape) {
    const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.isDarkMode });
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", shape.props.w.toString());
    rect.setAttribute("height", shape.props.h.toString());
    rect.setAttribute("fill", theme.solid);
    rect.setAttribute("stroke", theme.black.solid);
    rect.setAttribute("stroke-width", "1");
    rect.setAttribute("rx", "1");
    rect.setAttribute("ry", "1");
    g.appendChild(rect);
    const pageRotation = canonicalizeRotation(
      this.editor.getShapePageTransform(shape.id).rotation()
    );
    const offsetRotation = pageRotation + Math.PI / 4;
    const scaledRotation = (offsetRotation * (2 / Math.PI) + 4) % 4;
    const labelSide = ["top", "left", "bottom", "right"][Math.floor(scaledRotation)];
    let labelTranslate;
    switch (labelSide) {
      case "top":
        labelTranslate = ``;
        break;
      case "right":
        labelTranslate = `translate(${toDomPrecision(shape.props.w)}px, 0px) rotate(90deg)`;
        break;
      case "bottom":
        labelTranslate = `translate(${toDomPrecision(shape.props.w)}px, ${toDomPrecision(
          shape.props.h
        )}px) rotate(180deg)`;
        break;
      case "left":
        labelTranslate = `translate(0px, ${toDomPrecision(shape.props.h)}px) rotate(270deg)`;
        break;
      default:
        labelTranslate = ``;
    }
    const opts = {
      fontSize: 12,
      fontFamily: "Inter, sans-serif",
      textAlign: "start",
      width: shape.props.w,
      height: 32,
      padding: 0,
      lineHeight: 1,
      fontStyle: "normal",
      fontWeight: "normal",
      overflow: "truncate-ellipsis",
      verticalTextAlign: "middle"
    };
    const spans = this.editor.textMeasure.measureTextSpans(
      defaultEmptyAs(shape.props.name, "Frame") + String.fromCharCode(8203),
      opts
    );
    const firstSpan = spans[0];
    const lastSpan = last(spans);
    const labelTextWidth = lastSpan.box.w + lastSpan.box.x - firstSpan.box.x;
    const text = createTextSvgElementFromSpans(this.editor, spans, {
      offsetY: -opts.height - 2,
      ...opts
    });
    text.style.setProperty("transform", labelTranslate);
    const textBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    textBg.setAttribute("x", "-8px");
    textBg.setAttribute("y", -opts.height - 4 + "px");
    textBg.setAttribute("width", labelTextWidth + 16 + "px");
    textBg.setAttribute("height", `${opts.height}px`);
    textBg.setAttribute("rx", "4px");
    textBg.setAttribute("ry", "4px");
    textBg.setAttribute("fill", theme.background);
    g.appendChild(textBg);
    g.appendChild(text);
    return g;
  }
  indicator(shape) {
    const bounds = this.editor.getShapeGeometry(shape).bounds;
    return /* @__PURE__ */ jsx(
      "rect",
      {
        width: toDomPrecision(bounds.width),
        height: toDomPrecision(bounds.height),
        className: `tl-frame-indicator`
      }
    );
  }
  canReceiveNewChildrenOfType = (shape, _type) => {
    return !shape.isLocked;
  };
  providesBackgroundForChildren() {
    return true;
  }
  canDropShapes = (shape, _shapes) => {
    return !shape.isLocked;
  };
  onDragShapesOver = (frame, shapes) => {
    if (!shapes.every((child) => child.parentId === frame.id)) {
      this.editor.reparentShapes(
        shapes.map((shape) => shape.id),
        frame.id
      );
      return { shouldHint: true };
    }
    return { shouldHint: false };
  };
  onDragShapesOut = (_shape, shapes) => {
    const parent = this.editor.getShape(_shape.parentId);
    const isInGroup = parent && this.editor.isShapeOfType(parent, "group");
    if (isInGroup) {
      this.editor.reparentShapes(shapes, parent.id);
    } else {
      this.editor.reparentShapes(shapes, this.editor.currentPageId);
    }
  };
  onResizeEnd = (shape) => {
    const bounds = this.editor.getShapePageBounds(shape);
    const children = this.editor.getSortedChildIdsForParent(shape.id);
    const shapesToReparent = [];
    for (const childId of children) {
      const childBounds = this.editor.getShapePageBounds(childId);
      if (!bounds.includes(childBounds)) {
        shapesToReparent.push(childId);
      }
    }
    if (shapesToReparent.length > 0) {
      this.editor.reparentShapes(shapesToReparent, this.editor.currentPageId);
    }
  };
}
export {
  FrameShapeUtil,
  defaultEmptyAs
};
//# sourceMappingURL=FrameShapeUtil.mjs.map
