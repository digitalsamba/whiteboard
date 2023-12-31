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
var GeoShapeUtil_exports = {};
__export(GeoShapeUtil_exports, {
  GeoShapeUtil: () => GeoShapeUtil
});
module.exports = __toCommonJS(GeoShapeUtil_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_HyperlinkButton = require("../shared/HyperlinkButton");
var import_TextLabel = require("../shared/TextLabel");
var import_default_shape_constants = require("../shared/default-shape-constants");
var import_defaultStyleDefs = require("../shared/defaultStyleDefs");
var import_getTextLabelSvgElement = require("../shared/getTextLabelSvgElement");
var import_polygon_helpers = require("../shared/polygon-helpers");
var import_cloudOutline = require("./cloudOutline");
var import_DashStyleCloud = require("./components/DashStyleCloud");
var import_DashStyleEllipse = require("./components/DashStyleEllipse");
var import_DashStyleOval = require("./components/DashStyleOval");
var import_DashStylePolygon = require("./components/DashStylePolygon");
var import_DrawStyleCloud = require("./components/DrawStyleCloud");
var import_DrawStyleEllipse = require("./components/DrawStyleEllipse");
var import_DrawStylePolygon = require("./components/DrawStylePolygon");
var import_SolidStyleCloud = require("./components/SolidStyleCloud");
var import_SolidStyleEllipse = require("./components/SolidStyleEllipse");
var import_SolidStyleOval = require("./components/SolidStyleOval");
var import_SolidStylePolygon = require("./components/SolidStylePolygon");
const LABEL_PADDING = 16;
const MIN_SIZE_WITH_LABEL = 17 * 3;
class GeoShapeUtil extends import_editor.BaseBoxShapeUtil {
  static type = "geo";
  static props = import_editor.geoShapeProps;
  static migrations = import_editor.geoShapeMigrations;
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
    const strokeWidth = import_default_shape_constants.STROKE_SIZES[shape.props.size];
    const isFilled = shape.props.fill !== "none";
    let body;
    switch (shape.props.geo) {
      case "cloud": {
        body = new import_editor.Polygon2d({
          points: (0, import_cloudOutline.cloudOutline)(w, h, shape.id, shape.props.size),
          isFilled
        });
        break;
      }
      case "triangle": {
        body = new import_editor.Polygon2d({
          points: [new import_editor.Vec2d(cx, 0), new import_editor.Vec2d(w, h), new import_editor.Vec2d(0, h)],
          isFilled
        });
        break;
      }
      case "diamond": {
        body = new import_editor.Polygon2d({
          points: [new import_editor.Vec2d(cx, 0), new import_editor.Vec2d(w, cy), new import_editor.Vec2d(cx, h), new import_editor.Vec2d(0, cy)],
          isFilled
        });
        break;
      }
      case "pentagon": {
        body = new import_editor.Polygon2d({
          points: (0, import_editor.getPolygonVertices)(w, h, 5),
          isFilled
        });
        break;
      }
      case "hexagon": {
        body = new import_editor.Polygon2d({
          points: (0, import_editor.getPolygonVertices)(w, h, 6),
          isFilled
        });
        break;
      }
      case "octagon": {
        body = new import_editor.Polygon2d({
          points: (0, import_editor.getPolygonVertices)(w, h, 8),
          isFilled
        });
        break;
      }
      case "ellipse": {
        body = new import_editor.Ellipse2d({
          width: w,
          height: h,
          isFilled
        });
        break;
      }
      case "oval": {
        body = new import_editor.Stadium2d({
          width: w,
          height: h,
          isFilled
        });
        break;
      }
      case "star": {
        const sides = 5;
        const step = import_editor.PI2 / sides / 2;
        const rightMostIndex = Math.floor(sides / 4) * 2;
        const leftMostIndex = sides * 2 - rightMostIndex;
        const topMostIndex = 0;
        const bottomMostIndex = Math.floor(sides / 2) * 2;
        const maxX = Math.cos(-import_editor.TAU + rightMostIndex * step) * w / 2;
        const minX = Math.cos(-import_editor.TAU + leftMostIndex * step) * w / 2;
        const minY = Math.sin(-import_editor.TAU + topMostIndex * step) * h / 2;
        const maxY = Math.sin(-import_editor.TAU + bottomMostIndex * step) * h / 2;
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
        body = new import_editor.Polygon2d({
          points: Array.from(Array(sides * 2)).map((_, i) => {
            const theta = -import_editor.TAU + i * step;
            return new import_editor.Vec2d(
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
        body = new import_editor.Polygon2d({
          points: [
            new import_editor.Vec2d(offset, 0),
            new import_editor.Vec2d(w, 0),
            new import_editor.Vec2d(w - offset, h),
            new import_editor.Vec2d(0, h)
          ],
          isFilled
        });
        break;
      }
      case "rhombus-2": {
        const offset = Math.min(w * 0.38, h * 0.38);
        body = new import_editor.Polygon2d({
          points: [
            new import_editor.Vec2d(0, 0),
            new import_editor.Vec2d(w - offset, 0),
            new import_editor.Vec2d(w, h),
            new import_editor.Vec2d(offset, h)
          ],
          isFilled
        });
        break;
      }
      case "trapezoid": {
        const offset = Math.min(w * 0.38, h * 0.38);
        body = new import_editor.Polygon2d({
          points: [
            new import_editor.Vec2d(offset, 0),
            new import_editor.Vec2d(w - offset, 0),
            new import_editor.Vec2d(w, h),
            new import_editor.Vec2d(0, h)
          ],
          isFilled
        });
        break;
      }
      case "arrow-right": {
        const ox = Math.min(w, h) * 0.38;
        const oy = h * 0.16;
        body = new import_editor.Polygon2d({
          points: [
            new import_editor.Vec2d(0, oy),
            new import_editor.Vec2d(w - ox, oy),
            new import_editor.Vec2d(w - ox, 0),
            new import_editor.Vec2d(w, h / 2),
            new import_editor.Vec2d(w - ox, h),
            new import_editor.Vec2d(w - ox, h - oy),
            new import_editor.Vec2d(0, h - oy)
          ],
          isFilled
        });
        break;
      }
      case "arrow-left": {
        const ox = Math.min(w, h) * 0.38;
        const oy = h * 0.16;
        body = new import_editor.Polygon2d({
          points: [
            new import_editor.Vec2d(ox, 0),
            new import_editor.Vec2d(ox, oy),
            new import_editor.Vec2d(w, oy),
            new import_editor.Vec2d(w, h - oy),
            new import_editor.Vec2d(ox, h - oy),
            new import_editor.Vec2d(ox, h),
            new import_editor.Vec2d(0, h / 2)
          ],
          isFilled
        });
        break;
      }
      case "arrow-up": {
        const ox = w * 0.16;
        const oy = Math.min(w, h) * 0.38;
        body = new import_editor.Polygon2d({
          points: [
            new import_editor.Vec2d(w / 2, 0),
            new import_editor.Vec2d(w, oy),
            new import_editor.Vec2d(w - ox, oy),
            new import_editor.Vec2d(w - ox, h),
            new import_editor.Vec2d(ox, h),
            new import_editor.Vec2d(ox, oy),
            new import_editor.Vec2d(0, oy)
          ],
          isFilled
        });
        break;
      }
      case "arrow-down": {
        const ox = w * 0.16;
        const oy = Math.min(w, h) * 0.38;
        body = new import_editor.Polygon2d({
          points: [
            new import_editor.Vec2d(ox, 0),
            new import_editor.Vec2d(w - ox, 0),
            new import_editor.Vec2d(w - ox, h - oy),
            new import_editor.Vec2d(w, h - oy),
            new import_editor.Vec2d(w / 2, h),
            new import_editor.Vec2d(0, h - oy),
            new import_editor.Vec2d(ox, h - oy)
          ],
          isFilled
        });
        break;
      }
      case "check-box":
      case "x-box":
      case "rectangle": {
        body = new import_editor.Rectangle2d({
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
    const edges = lines ? lines.map((line) => new import_editor.Polyline2d({ points: line })) : [];
    return new import_editor.Group2d({
      children: [
        body,
        new import_editor.Rectangle2d({
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
    const strokeWidth = import_default_shape_constants.STROKE_SIZES[props.size];
    const { w, color, labelColor, fill, dash, growY, font, align, verticalAlign, size, text } = props;
    const getShape = () => {
      const h = props.h + growY;
      switch (props.geo) {
        case "cloud": {
          if (dash === "solid") {
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_SolidStyleCloud.SolidStyleCloud,
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
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_DashStyleCloud.DashStyleCloud,
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
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_DrawStyleCloud.DrawStyleCloud,
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
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_SolidStyleEllipse.SolidStyleEllipse, { strokeWidth, w, h, color, fill });
          } else if (dash === "dashed" || dash === "dotted") {
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_DashStyleEllipse.DashStyleEllipse,
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
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_SolidStyleEllipse.SolidStyleEllipse, { strokeWidth, w, h, color, fill });
          }
          break;
        }
        case "oval": {
          if (dash === "solid") {
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_SolidStyleOval.SolidStyleOval, { strokeWidth, w, h, color, fill });
          } else if (dash === "dashed" || dash === "dotted") {
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_DashStyleOval.DashStyleOval,
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
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_SolidStyleOval.SolidStyleOval, { strokeWidth, w, h, color, fill });
          }
          break;
        }
        default: {
          const geometry = this.editor.getShapeGeometry(shape);
          const outline = geometry instanceof import_editor.Group2d ? geometry.children[0].vertices : geometry.vertices;
          const lines = getLines(shape.props, strokeWidth);
          if (dash === "solid") {
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_SolidStylePolygon.SolidStylePolygon,
              {
                fill,
                color,
                strokeWidth,
                outline,
                lines
              }
            );
          } else if (dash === "dashed" || dash === "dotted") {
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_DashStylePolygon.DashStylePolygon,
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
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_DrawStylePolygon.DrawStylePolygon,
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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_editor.SVGContainer, { id, children: getShape() }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_TextLabel.TextLabel,
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
      shape.props.url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_HyperlinkButton.HyperlinkButton, { url: shape.props.url, zoomLevel: this.editor.zoomLevel })
    ] });
  }
  indicator(shape) {
    const { id, props } = shape;
    const { w, size } = props;
    const h = props.h + props.growY;
    const strokeWidth = import_default_shape_constants.STROKE_SIZES[size];
    switch (props.geo) {
      case "ellipse": {
        if (props.dash === "draw") {
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: (0, import_DrawStyleEllipse.getEllipseIndicatorPath)(id, w, h, strokeWidth) });
        }
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: w / 2, cy: h / 2, rx: w / 2, ry: h / 2 });
      }
      case "oval": {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: (0, import_SolidStyleOval.getOvalIndicatorPath)(w, h) });
      }
      case "cloud": {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: (0, import_cloudOutline.cloudSvgPath)(w, h, id, size) });
      }
      default: {
        const geometry = this.editor.getShapeGeometry(shape);
        const outline = geometry instanceof import_editor.Group2d ? geometry.children[0].vertices : geometry.vertices;
        let path;
        if (props.dash === "draw") {
          const polygonPoints = (0, import_polygon_helpers.getRoundedPolygonPoints)(id, outline, 0, strokeWidth * 2, 1);
          path = (0, import_polygon_helpers.getRoundedInkyPolygonPath)(polygonPoints);
        } else {
          path = "M" + outline[0] + "L" + outline.slice(1) + "Z";
        }
        const lines = getLines(shape.props, strokeWidth);
        if (lines) {
          for (const [A, B] of lines) {
            path += `M${A.x},${A.y}L${B.x},${B.y}`;
          }
        }
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: path });
      }
    }
  }
  toSvg(shape, ctx) {
    const { id, props } = shape;
    const strokeWidth = import_default_shape_constants.STROKE_SIZES[props.size];
    const theme = (0, import_editor.getDefaultColorTheme)({ isDarkMode: this.editor.user.isDarkMode });
    ctx.addExportDef((0, import_defaultStyleDefs.getFillDefForExport)(shape.props.fill, theme));
    let svgElm;
    switch (props.geo) {
      case "ellipse": {
        switch (props.dash) {
          case "draw":
            svgElm = (0, import_DrawStyleEllipse.DrawStyleEllipseSvg)({
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
            svgElm = (0, import_SolidStyleEllipse.SolidStyleEllipseSvg)({
              strokeWidth,
              w: props.w,
              h: props.h,
              color: props.color,
              fill: props.fill,
              theme
            });
            break;
          default:
            svgElm = (0, import_DashStyleEllipse.DashStyleEllipseSvg)({
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
            svgElm = (0, import_DashStyleOval.DashStyleOvalSvg)({
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
            svgElm = (0, import_SolidStyleOval.SolidStyleOvalSvg)({
              strokeWidth,
              w: props.w,
              h: props.h,
              color: props.color,
              fill: props.fill,
              theme
            });
            break;
          default:
            svgElm = (0, import_DashStyleOval.DashStyleOvalSvg)({
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
            svgElm = (0, import_DrawStyleCloud.DrawStyleCloudSvg)({
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
            svgElm = (0, import_SolidStyleCloud.SolidStyleCloudSvg)({
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
            svgElm = (0, import_DashStyleCloud.DashStyleCloudSvg)({
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
        const outline = geometry instanceof import_editor.Group2d ? geometry.children[0].vertices : geometry.vertices;
        const lines = getLines(shape.props, strokeWidth);
        switch (props.dash) {
          case "draw":
            svgElm = (0, import_DrawStylePolygon.DrawStylePolygonSvg)({
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
            svgElm = (0, import_SolidStylePolygon.SolidStylePolygonSvg)({
              fill: props.fill,
              color: props.color,
              strokeWidth,
              outline,
              lines,
              theme
            });
            break;
          default:
            svgElm = (0, import_DashStylePolygon.DashStylePolygonSvg)({
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
      ctx.addExportDef((0, import_defaultStyleDefs.getFontDefForExport)(shape.props.font));
      const rootTextElm = (0, import_getTextLabelSvgElement.getTextLabelSvgElement)({
        editor: this.editor,
        shape,
        font: import_editor.DefaultFontFamilies[shape.props.font],
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
    return [(0, import_defaultStyleDefs.getFillDefForCanvas)()];
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
    const offset = new import_editor.Vec2d(0, 0);
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
    ...import_default_shape_constants.TEXT_PROPS,
    fontFamily: import_default_shape_constants.FONT_FAMILIES[shape.props.font],
    fontSize: import_default_shape_constants.LABEL_FONT_SIZES[shape.props.size],
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
    ...import_default_shape_constants.TEXT_PROPS,
    fontFamily: import_default_shape_constants.FONT_FAMILIES[shape.props.font],
    fontSize: import_default_shape_constants.LABEL_FONT_SIZES[shape.props.size],
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
      [new import_editor.Vec2d(0, 0), new import_editor.Vec2d(w / 2, h / 2)],
      [new import_editor.Vec2d(w, h), new import_editor.Vec2d(w / 2, h / 2)],
      [new import_editor.Vec2d(0, h), new import_editor.Vec2d(w / 2, h / 2)],
      [new import_editor.Vec2d(w, 0), new import_editor.Vec2d(w / 2, h / 2)]
    ];
  }
  const clampX = (x) => Math.max(0, Math.min(w, x));
  const clampY = (y) => Math.max(0, Math.min(h, y));
  return [
    [
      new import_editor.Vec2d(clampX(sw * inset), clampY(sw * inset)),
      new import_editor.Vec2d(clampX(w - sw * inset), clampY(h - sw * inset))
    ],
    [
      new import_editor.Vec2d(clampX(sw * inset), clampY(h - sw * inset)),
      new import_editor.Vec2d(clampX(w - sw * inset), clampY(sw * inset))
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
      new import_editor.Vec2d(clampX(ox + size * 0.25), clampY(oy + size * 0.52)),
      new import_editor.Vec2d(clampX(ox + size * 0.45), clampY(oy + size * 0.82))
    ],
    [
      new import_editor.Vec2d(clampX(ox + size * 0.45), clampY(oy + size * 0.82)),
      new import_editor.Vec2d(clampX(ox + size * 0.82), clampY(oy + size * 0.22))
    ]
  ];
}
//# sourceMappingURL=GeoShapeUtil.js.map
