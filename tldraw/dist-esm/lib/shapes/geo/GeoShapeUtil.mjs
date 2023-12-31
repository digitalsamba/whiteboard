import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import {
  BaseBoxShapeUtil,
  DefaultFontFamilies,
  Ellipse2d,
  Group2d,
  PI2,
  Polygon2d,
  Polyline2d,
  Rectangle2d,
  SVGContainer,
  Stadium2d,
  TAU,
  Vec2d,
  geoShapeMigrations,
  geoShapeProps,
  getDefaultColorTheme,
  getPolygonVertices
} from "@tldraw/editor";
import { HyperlinkButton } from "../shared/HyperlinkButton.mjs";
import { TextLabel } from "../shared/TextLabel.mjs";
import {
  FONT_FAMILIES,
  LABEL_FONT_SIZES,
  STROKE_SIZES,
  TEXT_PROPS
} from "../shared/default-shape-constants.mjs";
import {
  getFillDefForCanvas,
  getFillDefForExport,
  getFontDefForExport
} from "../shared/defaultStyleDefs.mjs";
import { getTextLabelSvgElement } from "../shared/getTextLabelSvgElement.mjs";
import { getRoundedInkyPolygonPath, getRoundedPolygonPoints } from "../shared/polygon-helpers.mjs";
import { cloudOutline, cloudSvgPath } from "./cloudOutline.mjs";
import { DashStyleCloud, DashStyleCloudSvg } from "./components/DashStyleCloud.mjs";
import { DashStyleEllipse, DashStyleEllipseSvg } from "./components/DashStyleEllipse.mjs";
import { DashStyleOval, DashStyleOvalSvg } from "./components/DashStyleOval.mjs";
import { DashStylePolygon, DashStylePolygonSvg } from "./components/DashStylePolygon.mjs";
import { DrawStyleCloud, DrawStyleCloudSvg } from "./components/DrawStyleCloud.mjs";
import { DrawStyleEllipseSvg, getEllipseIndicatorPath } from "./components/DrawStyleEllipse.mjs";
import { DrawStylePolygon, DrawStylePolygonSvg } from "./components/DrawStylePolygon.mjs";
import { SolidStyleCloud, SolidStyleCloudSvg } from "./components/SolidStyleCloud.mjs";
import { SolidStyleEllipse, SolidStyleEllipseSvg } from "./components/SolidStyleEllipse.mjs";
import {
  SolidStyleOval,
  SolidStyleOvalSvg,
  getOvalIndicatorPath
} from "./components/SolidStyleOval.mjs";
import { SolidStylePolygon, SolidStylePolygonSvg } from "./components/SolidStylePolygon.mjs";
const LABEL_PADDING = 16;
const MIN_SIZE_WITH_LABEL = 17 * 3;
class GeoShapeUtil extends BaseBoxShapeUtil {
  static type = "geo";
  static props = geoShapeProps;
  static migrations = geoShapeMigrations;
  canEdit = () => true;
  getDefaultProps() {
    return {
      w: 100,
      h: 100,
      geo: "rectangle",
      color: "black",
      labelColor: "black",
      fill: "none",
      dash: "draw",
      size: "m",
      font: "draw",
      text: "",
      align: "middle",
      verticalAlign: "middle",
      growY: 0,
      url: ""
    };
  }
  getGeometry(shape) {
    const w = Math.max(1, shape.props.w);
    const h = Math.max(1, shape.props.h + shape.props.growY);
    const cx = w / 2;
    const cy = h / 2;
    const strokeWidth = STROKE_SIZES[shape.props.size];
    const isFilled = shape.props.fill !== "none";
    let body;
    switch (shape.props.geo) {
      case "cloud": {
        body = new Polygon2d({
          points: cloudOutline(w, h, shape.id, shape.props.size),
          isFilled
        });
        break;
      }
      case "triangle": {
        body = new Polygon2d({
          points: [new Vec2d(cx, 0), new Vec2d(w, h), new Vec2d(0, h)],
          isFilled
        });
        break;
      }
      case "diamond": {
        body = new Polygon2d({
          points: [new Vec2d(cx, 0), new Vec2d(w, cy), new Vec2d(cx, h), new Vec2d(0, cy)],
          isFilled
        });
        break;
      }
      case "pentagon": {
        body = new Polygon2d({
          points: getPolygonVertices(w, h, 5),
          isFilled
        });
        break;
      }
      case "hexagon": {
        body = new Polygon2d({
          points: getPolygonVertices(w, h, 6),
          isFilled
        });
        break;
      }
      case "octagon": {
        body = new Polygon2d({
          points: getPolygonVertices(w, h, 8),
          isFilled
        });
        break;
      }
      case "ellipse": {
        body = new Ellipse2d({
          width: w,
          height: h,
          isFilled
        });
        break;
      }
      case "oval": {
        body = new Stadium2d({
          width: w,
          height: h,
          isFilled
        });
        break;
      }
      case "star": {
        const sides = 5;
        const step = PI2 / sides / 2;
        const rightMostIndex = Math.floor(sides / 4) * 2;
        const leftMostIndex = sides * 2 - rightMostIndex;
        const topMostIndex = 0;
        const bottomMostIndex = Math.floor(sides / 2) * 2;
        const maxX = Math.cos(-TAU + rightMostIndex * step) * w / 2;
        const minX = Math.cos(-TAU + leftMostIndex * step) * w / 2;
        const minY = Math.sin(-TAU + topMostIndex * step) * h / 2;
        const maxY = Math.sin(-TAU + bottomMostIndex * step) * h / 2;
        const diffX = w - Math.abs(maxX - minX);
        const diffY = h - Math.abs(maxY - minY);
        const offsetX = w / 2 + minX - (w / 2 - maxX);
        const offsetY = h / 2 + minY - (h / 2 - maxY);
        const ratio = 1;
        const cx2 = (w - offsetX) / 2;
        const cy2 = (h - offsetY) / 2;
        const ox = (w + diffX) / 2;
        const oy = (h + diffY) / 2;
        const ix = ox * ratio / 2;
        const iy = oy * ratio / 2;
        body = new Polygon2d({
          points: Array.from(Array(sides * 2)).map((_, i) => {
            const theta = -TAU + i * step;
            return new Vec2d(
              cx2 + (i % 2 ? ix : ox) * Math.cos(theta),
              cy2 + (i % 2 ? iy : oy) * Math.sin(theta)
            );
          }),
          isFilled
        });
        break;
      }
      case "rhombus": {
        const offset = Math.min(w * 0.38, h * 0.38);
        body = new Polygon2d({
          points: [
            new Vec2d(offset, 0),
            new Vec2d(w, 0),
            new Vec2d(w - offset, h),
            new Vec2d(0, h)
          ],
          isFilled
        });
        break;
      }
      case "rhombus-2": {
        const offset = Math.min(w * 0.38, h * 0.38);
        body = new Polygon2d({
          points: [
            new Vec2d(0, 0),
            new Vec2d(w - offset, 0),
            new Vec2d(w, h),
            new Vec2d(offset, h)
          ],
          isFilled
        });
        break;
      }
      case "trapezoid": {
        const offset = Math.min(w * 0.38, h * 0.38);
        body = new Polygon2d({
          points: [
            new Vec2d(offset, 0),
            new Vec2d(w - offset, 0),
            new Vec2d(w, h),
            new Vec2d(0, h)
          ],
          isFilled
        });
        break;
      }
      case "arrow-right": {
        const ox = Math.min(w, h) * 0.38;
        const oy = h * 0.16;
        body = new Polygon2d({
          points: [
            new Vec2d(0, oy),
            new Vec2d(w - ox, oy),
            new Vec2d(w - ox, 0),
            new Vec2d(w, h / 2),
            new Vec2d(w - ox, h),
            new Vec2d(w - ox, h - oy),
            new Vec2d(0, h - oy)
          ],
          isFilled
        });
        break;
      }
      case "arrow-left": {
        const ox = Math.min(w, h) * 0.38;
        const oy = h * 0.16;
        body = new Polygon2d({
          points: [
            new Vec2d(ox, 0),
            new Vec2d(ox, oy),
            new Vec2d(w, oy),
            new Vec2d(w, h - oy),
            new Vec2d(ox, h - oy),
            new Vec2d(ox, h),
            new Vec2d(0, h / 2)
          ],
          isFilled
        });
        break;
      }
      case "arrow-up": {
        const ox = w * 0.16;
        const oy = Math.min(w, h) * 0.38;
        body = new Polygon2d({
          points: [
            new Vec2d(w / 2, 0),
            new Vec2d(w, oy),
            new Vec2d(w - ox, oy),
            new Vec2d(w - ox, h),
            new Vec2d(ox, h),
            new Vec2d(ox, oy),
            new Vec2d(0, oy)
          ],
          isFilled
        });
        break;
      }
      case "arrow-down": {
        const ox = w * 0.16;
        const oy = Math.min(w, h) * 0.38;
        body = new Polygon2d({
          points: [
            new Vec2d(ox, 0),
            new Vec2d(w - ox, 0),
            new Vec2d(w - ox, h - oy),
            new Vec2d(w, h - oy),
            new Vec2d(w / 2, h),
            new Vec2d(0, h - oy),
            new Vec2d(ox, h - oy)
          ],
          isFilled
        });
        break;
      }
      case "check-box":
      case "x-box":
      case "rectangle": {
        body = new Rectangle2d({
          width: w,
          height: h,
          isFilled,
          isSnappable: true
        });
        break;
      }
    }
    const labelSize = getLabelSize(this.editor, shape);
    const labelWidth = Math.min(w, Math.max(labelSize.w, Math.min(32, Math.max(1, w - 8))));
    const labelHeight = Math.min(h, Math.max(labelSize.h, Math.min(32, Math.max(1, w - 8))));
    const lines = getLines(shape.props, strokeWidth);
    const edges = lines ? lines.map((line) => new Polyline2d({ points: line })) : [];
    return new Group2d({
      children: [
        body,
        new Rectangle2d({
          x: shape.props.align === "start" ? 0 : shape.props.align === "end" ? w - labelWidth : (w - labelWidth) / 2,
          y: shape.props.verticalAlign === "start" ? 0 : shape.props.verticalAlign === "end" ? h - labelHeight : (h - labelHeight) / 2,
          width: labelWidth,
          height: labelHeight,
          isFilled: true,
          isSnappable: false,
          isLabel: true
        }),
        ...edges
      ],
      isSnappable: false
    });
  }
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
  component(shape) {
    const { id, type, props } = shape;
    const strokeWidth = STROKE_SIZES[props.size];
    const { w, color, labelColor, fill, dash, growY, font, align, verticalAlign, size, text } = props;
    const getShape = () => {
      const h = props.h + growY;
      switch (props.geo) {
        case "cloud": {
          if (dash === "solid") {
            return /* @__PURE__ */ jsx(
              SolidStyleCloud,
              {
                color,
                fill,
                strokeWidth,
                w,
                h,
                id,
                size
              }
            );
          } else if (dash === "dashed" || dash === "dotted") {
            return /* @__PURE__ */ jsx(
              DashStyleCloud,
              {
                color,
                fill,
                strokeWidth,
                w,
                h,
                id,
                size,
                dash
              }
            );
          } else if (dash === "draw") {
            return /* @__PURE__ */ jsx(
              DrawStyleCloud,
              {
                color,
                fill,
                strokeWidth,
                w,
                h,
                id,
                size
              }
            );
          }
          break;
        }
        case "ellipse": {
          if (dash === "solid") {
            return /* @__PURE__ */ jsx(SolidStyleEllipse, { strokeWidth, w, h, color, fill });
          } else if (dash === "dashed" || dash === "dotted") {
            return /* @__PURE__ */ jsx(
              DashStyleEllipse,
              {
                id,
                strokeWidth,
                w,
                h,
                dash,
                color,
                fill
              }
            );
          } else if (dash === "draw") {
            return /* @__PURE__ */ jsx(SolidStyleEllipse, { strokeWidth, w, h, color, fill });
          }
          break;
        }
        case "oval": {
          if (dash === "solid") {
            return /* @__PURE__ */ jsx(SolidStyleOval, { strokeWidth, w, h, color, fill });
          } else if (dash === "dashed" || dash === "dotted") {
            return /* @__PURE__ */ jsx(
              DashStyleOval,
              {
                id,
                strokeWidth,
                w,
                h,
                dash,
                color,
                fill
              }
            );
          } else if (dash === "draw") {
            return /* @__PURE__ */ jsx(SolidStyleOval, { strokeWidth, w, h, color, fill });
          }
          break;
        }
        default: {
          const geometry = this.editor.getShapeGeometry(shape);
          const outline = geometry instanceof Group2d ? geometry.children[0].vertices : geometry.vertices;
          const lines = getLines(shape.props, strokeWidth);
          if (dash === "solid") {
            return /* @__PURE__ */ jsx(
              SolidStylePolygon,
              {
                fill,
                color,
                strokeWidth,
                outline,
                lines
              }
            );
          } else if (dash === "dashed" || dash === "dotted") {
            return /* @__PURE__ */ jsx(
              DashStylePolygon,
              {
                dash,
                fill,
                color,
                strokeWidth,
                outline,
                lines
              }
            );
          } else if (dash === "draw") {
            return /* @__PURE__ */ jsx(
              DrawStylePolygon,
              {
                id,
                fill,
                color,
                strokeWidth,
                outline,
                lines
              }
            );
          }
        }
      }
    };
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(SVGContainer, { id, children: getShape() }),
      /* @__PURE__ */ jsx(
        TextLabel,
        {
          id,
          type,
          font,
          fill,
          size,
          align,
          verticalAlign,
          text,
          labelColor,
          wrap: true
        }
      ),
      shape.props.url && /* @__PURE__ */ jsx(HyperlinkButton, { url: shape.props.url, zoomLevel: this.editor.zoomLevel })
    ] });
  }
  indicator(shape) {
    const { id, props } = shape;
    const { w, size } = props;
    const h = props.h + props.growY;
    const strokeWidth = STROKE_SIZES[size];
    switch (props.geo) {
      case "ellipse": {
        if (props.dash === "draw") {
          return /* @__PURE__ */ jsx("path", { d: getEllipseIndicatorPath(id, w, h, strokeWidth) });
        }
        return /* @__PURE__ */ jsx("ellipse", { cx: w / 2, cy: h / 2, rx: w / 2, ry: h / 2 });
      }
      case "oval": {
        return /* @__PURE__ */ jsx("path", { d: getOvalIndicatorPath(w, h) });
      }
      case "cloud": {
        return /* @__PURE__ */ jsx("path", { d: cloudSvgPath(w, h, id, size) });
      }
      default: {
        const geometry = this.editor.getShapeGeometry(shape);
        const outline = geometry instanceof Group2d ? geometry.children[0].vertices : geometry.vertices;
        let path;
        if (props.dash === "draw") {
          const polygonPoints = getRoundedPolygonPoints(id, outline, 0, strokeWidth * 2, 1);
          path = getRoundedInkyPolygonPath(polygonPoints);
        } else {
          path = "M" + outline[0] + "L" + outline.slice(1) + "Z";
        }
        const lines = getLines(shape.props, strokeWidth);
        if (lines) {
          for (const [A, B] of lines) {
            path += `M${A.x},${A.y}L${B.x},${B.y}`;
          }
        }
        return /* @__PURE__ */ jsx("path", { d: path });
      }
    }
  }
  toSvg(shape, ctx) {
    const { id, props } = shape;
    const strokeWidth = STROKE_SIZES[props.size];
    const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.isDarkMode });
    ctx.addExportDef(getFillDefForExport(shape.props.fill, theme));
    let svgElm;
    switch (props.geo) {
      case "ellipse": {
        switch (props.dash) {
          case "draw":
            svgElm = DrawStyleEllipseSvg({
              id,
              w: props.w,
              h: props.h,
              color: props.color,
              fill: props.fill,
              strokeWidth,
              theme
            });
            break;
          case "solid":
            svgElm = SolidStyleEllipseSvg({
              strokeWidth,
              w: props.w,
              h: props.h,
              color: props.color,
              fill: props.fill,
              theme
            });
            break;
          default:
            svgElm = DashStyleEllipseSvg({
              id,
              strokeWidth,
              w: props.w,
              h: props.h,
              dash: props.dash,
              color: props.color,
              fill: props.fill,
              theme
            });
            break;
        }
        break;
      }
      case "oval": {
        switch (props.dash) {
          case "draw":
            svgElm = DashStyleOvalSvg({
              id,
              strokeWidth,
              w: props.w,
              h: props.h,
              dash: props.dash,
              color: props.color,
              fill: props.fill,
              theme
            });
            break;
          case "solid":
            svgElm = SolidStyleOvalSvg({
              strokeWidth,
              w: props.w,
              h: props.h,
              color: props.color,
              fill: props.fill,
              theme
            });
            break;
          default:
            svgElm = DashStyleOvalSvg({
              id,
              strokeWidth,
              w: props.w,
              h: props.h,
              dash: props.dash,
              color: props.color,
              fill: props.fill,
              theme
            });
        }
        break;
      }
      case "cloud": {
        switch (props.dash) {
          case "draw":
            svgElm = DrawStyleCloudSvg({
              id,
              strokeWidth,
              w: props.w,
              h: props.h,
              color: props.color,
              fill: props.fill,
              size: props.size,
              theme
            });
            break;
          case "solid":
            svgElm = SolidStyleCloudSvg({
              strokeWidth,
              w: props.w,
              h: props.h,
              color: props.color,
              fill: props.fill,
              size: props.size,
              id,
              theme
            });
            break;
          default:
            svgElm = DashStyleCloudSvg({
              id,
              strokeWidth,
              w: props.w,
              h: props.h,
              dash: props.dash,
              color: props.color,
              fill: props.fill,
              theme,
              size: props.size
            });
        }
        break;
      }
      default: {
        const geometry = this.editor.getShapeGeometry(shape);
        const outline = geometry instanceof Group2d ? geometry.children[0].vertices : geometry.vertices;
        const lines = getLines(shape.props, strokeWidth);
        switch (props.dash) {
          case "draw":
            svgElm = DrawStylePolygonSvg({
              id,
              fill: props.fill,
              color: props.color,
              strokeWidth,
              outline,
              lines,
              theme
            });
            break;
          case "solid":
            svgElm = SolidStylePolygonSvg({
              fill: props.fill,
              color: props.color,
              strokeWidth,
              outline,
              lines,
              theme
            });
            break;
          default:
            svgElm = DashStylePolygonSvg({
              dash: props.dash,
              fill: props.fill,
              color: props.color,
              strokeWidth,
              outline,
              lines,
              theme
            });
            break;
        }
        break;
      }
    }
    if (props.text) {
      const bounds = this.editor.getShapeGeometry(shape).bounds;
      ctx.addExportDef(getFontDefForExport(shape.props.font));
      const rootTextElm = getTextLabelSvgElement({
        editor: this.editor,
        shape,
        font: DefaultFontFamilies[shape.props.font],
        bounds
      });
      const textElm = rootTextElm.cloneNode(true);
      textElm.setAttribute("fill", theme[shape.props.labelColor].solid);
      textElm.setAttribute("stroke", "none");
      const textBgEl = rootTextElm.cloneNode(true);
      textBgEl.setAttribute("stroke-width", "2");
      textBgEl.setAttribute("fill", theme.background);
      textBgEl.setAttribute("stroke", theme.background);
      const groupEl = document.createElementNS("http://www.w3.org/2000/svg", "g");
      groupEl.append(textBgEl);
      groupEl.append(textElm);
      if (svgElm.nodeName === "g") {
        svgElm.appendChild(groupEl);
        return svgElm;
      } else {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.appendChild(svgElm);
        g.appendChild(groupEl);
        return g;
      }
    }
    return svgElm;
  }
  getCanvasSvgDefs() {
    return [getFillDefForCanvas()];
  }
  onResize = (shape, { initialBounds, handle, newPoint, scaleX, scaleY }) => {
    let w = initialBounds.width * scaleX;
    let h = initialBounds.height * scaleY;
    let overShrinkX = 0;
    let overShrinkY = 0;
    if (shape.props.text.trim()) {
      let newW = Math.max(Math.abs(w), MIN_SIZE_WITH_LABEL);
      let newH = Math.max(Math.abs(h), MIN_SIZE_WITH_LABEL);
      if (newW < MIN_SIZE_WITH_LABEL && newH === MIN_SIZE_WITH_LABEL) {
        newW = MIN_SIZE_WITH_LABEL;
      }
      if (newW === MIN_SIZE_WITH_LABEL && newH < MIN_SIZE_WITH_LABEL) {
        newH = MIN_SIZE_WITH_LABEL;
      }
      const labelSize = getLabelSize(this.editor, {
        ...shape,
        props: {
          ...shape.props,
          w: newW,
          h: newH
        }
      });
      const nextW = Math.max(Math.abs(w), labelSize.w) * Math.sign(w);
      const nextH = Math.max(Math.abs(h), labelSize.h) * Math.sign(h);
      overShrinkX = Math.abs(nextW) - Math.abs(w);
      overShrinkY = Math.abs(nextH) - Math.abs(h);
      w = nextW;
      h = nextH;
    }
    const offset = new Vec2d(0, 0);
    if (scaleX < 0) {
      offset.x += w;
    }
    if (handle === "left" || handle === "top_left" || handle === "bottom_left") {
      offset.x += scaleX < 0 ? overShrinkX : -overShrinkX;
    }
    if (scaleY < 0) {
      offset.y += h;
    }
    if (handle === "top" || handle === "top_left" || handle === "top_right") {
      offset.y += scaleY < 0 ? overShrinkY : -overShrinkY;
    }
    const { x, y } = offset.rot(shape.rotation).add(newPoint);
    return {
      x,
      y,
      props: {
        w: Math.max(Math.abs(w), 1),
        h: Math.max(Math.abs(h), 1),
        growY: 0
      }
    };
  };
  onBeforeCreate = (shape) => {
    if (!shape.props.text) {
      if (shape.props.growY) {
        return {
          ...shape,
          props: {
            ...shape.props,
            growY: 0
          }
        };
      } else {
        return;
      }
    }
    const prevHeight = shape.props.h;
    const nextHeight = getLabelSize(this.editor, shape).h;
    let growY = null;
    if (nextHeight > prevHeight) {
      growY = nextHeight - prevHeight;
    } else {
      if (shape.props.growY) {
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
  };
  onBeforeUpdate = (prev, next) => {
    const prevText = prev.props.text.trimEnd();
    const nextText = next.props.text.trimEnd();
    if (prevText === nextText && prev.props.font === next.props.font && prev.props.size === next.props.size) {
      return;
    }
    if (prevText && !nextText) {
      return {
        ...next,
        props: {
          ...next.props,
          growY: 0
        }
      };
    }
    const prevWidth = prev.props.w;
    const prevHeight = prev.props.h;
    const nextSize = getLabelSize(this.editor, next);
    const nextWidth = nextSize.w;
    const nextHeight = nextSize.h;
    if (!prevText && nextText && nextText.length === 1) {
      let w = Math.max(prevWidth, nextWidth);
      let h = Math.max(prevHeight, nextHeight);
      if (prev.props.w < MIN_SIZE_WITH_LABEL && prev.props.h < MIN_SIZE_WITH_LABEL) {
        w = Math.max(w, MIN_SIZE_WITH_LABEL);
        h = Math.max(h, MIN_SIZE_WITH_LABEL);
        w = Math.max(w, h);
        h = Math.max(w, h);
      }
      return {
        ...next,
        props: {
          ...next.props,
          w,
          h,
          growY: 0
        }
      };
    }
    let growY = null;
    if (nextHeight > prevHeight) {
      growY = nextHeight - prevHeight;
    } else {
      if (prev.props.growY) {
        growY = 0;
      }
    }
    if (growY !== null) {
      return {
        ...next,
        props: {
          ...next.props,
          growY,
          w: Math.max(next.props.w, nextWidth)
        }
      };
    }
    if (nextWidth > prev.props.w) {
      return {
        ...next,
        props: {
          ...next.props,
          w: nextWidth
        }
      };
    }
  };
  onDoubleClick = (shape) => {
    if (this.editor.inputs.altKey) {
      switch (shape.props.geo) {
        case "rectangle": {
          return {
            ...shape,
            props: {
              geo: "check-box"
            }
          };
        }
        case "check-box": {
          return {
            ...shape,
            props: {
              geo: "rectangle"
            }
          };
        }
      }
    }
    return;
  };
}
function getLabelSize(editor, shape) {
  const text = shape.props.text.trimEnd();
  if (!text) {
    return { w: 0, h: 0 };
  }
  const minSize = editor.textMeasure.measureText("w", {
    ...TEXT_PROPS,
    fontFamily: FONT_FAMILIES[shape.props.font],
    fontSize: LABEL_FONT_SIZES[shape.props.size],
    width: "fit-content",
    maxWidth: "100px"
  });
  const sizes = {
    s: 2,
    m: 3.5,
    l: 5,
    xl: 10
  };
  const size = editor.textMeasure.measureText(text, {
    ...TEXT_PROPS,
    fontFamily: FONT_FAMILIES[shape.props.font],
    fontSize: LABEL_FONT_SIZES[shape.props.size],
    width: "fit-content",
    minWidth: minSize.w + "px",
    maxWidth: Math.max(
      // Guard because a DOM nodes can't be less 0
      0,
      // A 'w' width that we're setting as the min-width
      Math.ceil(minSize.w + sizes[shape.props.size]),
      // The actual text size
      Math.ceil(shape.props.w - LABEL_PADDING * 2)
    ) + "px"
  });
  return {
    w: size.w + LABEL_PADDING * 2,
    h: size.h + LABEL_PADDING * 2
  };
}
function getLines(props, sw) {
  switch (props.geo) {
    case "x-box": {
      return getXBoxLines(props.w, props.h, sw, props.dash);
    }
    case "check-box": {
      return getCheckBoxLines(props.w, props.h);
    }
    default: {
      return void 0;
    }
  }
}
function getXBoxLines(w, h, sw, dash) {
  const inset = dash === "draw" ? 0.62 : 0;
  if (dash === "dashed") {
    return [
      [new Vec2d(0, 0), new Vec2d(w / 2, h / 2)],
      [new Vec2d(w, h), new Vec2d(w / 2, h / 2)],
      [new Vec2d(0, h), new Vec2d(w / 2, h / 2)],
      [new Vec2d(w, 0), new Vec2d(w / 2, h / 2)]
    ];
  }
  const clampX = (x) => Math.max(0, Math.min(w, x));
  const clampY = (y) => Math.max(0, Math.min(h, y));
  return [
    [
      new Vec2d(clampX(sw * inset), clampY(sw * inset)),
      new Vec2d(clampX(w - sw * inset), clampY(h - sw * inset))
    ],
    [
      new Vec2d(clampX(sw * inset), clampY(h - sw * inset)),
      new Vec2d(clampX(w - sw * inset), clampY(sw * inset))
    ]
  ];
}
function getCheckBoxLines(w, h) {
  const size = Math.min(w, h) * 0.82;
  const ox = (w - size) / 2;
  const oy = (h - size) / 2;
  const clampX = (x) => Math.max(0, Math.min(w, x));
  const clampY = (y) => Math.max(0, Math.min(h, y));
  return [
    [
      new Vec2d(clampX(ox + size * 0.25), clampY(oy + size * 0.52)),
      new Vec2d(clampX(ox + size * 0.45), clampY(oy + size * 0.82))
    ],
    [
      new Vec2d(clampX(ox + size * 0.45), clampY(oy + size * 0.82)),
      new Vec2d(clampX(ox + size * 0.82), clampY(oy + size * 0.22))
    ]
  ];
}
export {
  GeoShapeUtil
};
//# sourceMappingURL=GeoShapeUtil.mjs.map
