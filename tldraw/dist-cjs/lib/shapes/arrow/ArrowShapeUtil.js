"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ArrowShapeUtil_exports = {};
__export(ArrowShapeUtil_exports, {
  ArrowShapeUtil: () => ArrowShapeUtil
});
module.exports = __toCommonJS(ArrowShapeUtil_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_react = __toESM(require("react"));
var import_ShapeFill = require("../shared/ShapeFill");
var import_createTextSvgElementFromSpans = require("../shared/createTextSvgElementFromSpans");
var import_default_shape_constants = require("../shared/default-shape-constants");
var import_defaultStyleDefs = require("../shared/defaultStyleDefs");
var import_getPerfectDashProps = require("../shared/getPerfectDashProps");
var import_ArrowTextLabel = require("./components/ArrowTextLabel");
let globalRenderIndex = 0;
class ArrowShapeUtil extends import_editor.ShapeUtil {
  static type = "arrow";
  static props = import_editor.arrowShapeProps;
  static migrations = import_editor.arrowShapeMigrations;
  canEdit = () => true;
  canBind = () => false;
  canSnap = () => false;
  hideResizeHandles = () => true;
  hideRotateHandle = () => true;
  hideSelectionBoundsBg = () => true;
  hideSelectionBoundsFg = () => true;
  getDefaultProps() {
    return {
      dash: "draw",
      size: "m",
      fill: "none",
      color: "black",
      labelColor: "black",
      bend: 0,
      start: { type: "point", x: 0, y: 0 },
      end: { type: "point", x: 0, y: 0 },
      arrowheadStart: "none",
      arrowheadEnd: "arrow",
      text: "",
      font: "draw"
    };
  }
  getGeometry(shape) {
    const info = this.editor.getArrowInfo(shape);
    const bodyGeom = info.isStraight ? new import_editor.Edge2d({
      start: import_editor.Vec2d.From(info.start.point),
      end: import_editor.Vec2d.From(info.end.point)
    }) : new import_editor.Arc2d({
      center: import_editor.Vec2d.Cast(info.handleArc.center),
      radius: info.handleArc.radius,
      start: import_editor.Vec2d.Cast(info.start.point),
      end: import_editor.Vec2d.Cast(info.end.point),
      sweepFlag: info.bodyArc.sweepFlag,
      largeArcFlag: info.bodyArc.largeArcFlag
    });
    let labelGeom;
    if (shape.props.text.trim()) {
      const bodyBounds = bodyGeom.bounds;
      const { w, h } = this.editor.textMeasure.measureText(shape.props.text, {
        ...import_default_shape_constants.TEXT_PROPS,
        fontFamily: import_default_shape_constants.FONT_FAMILIES[shape.props.font],
        fontSize: import_default_shape_constants.ARROW_LABEL_FONT_SIZES[shape.props.size],
        width: "fit-content"
      });
      let width = w;
      let height = h;
      if (bodyBounds.width > bodyBounds.height) {
        width = Math.max(Math.min(w, 64), Math.min(bodyBounds.width - 64, w));
        const { w: squishedWidth, h: squishedHeight } = this.editor.textMeasure.measureText(
          shape.props.text,
          {
            ...import_default_shape_constants.TEXT_PROPS,
            fontFamily: import_default_shape_constants.FONT_FAMILIES[shape.props.font],
            fontSize: import_default_shape_constants.ARROW_LABEL_FONT_SIZES[shape.props.size],
            width: width + "px"
          }
        );
        width = squishedWidth;
        height = squishedHeight;
      }
      if (width > 16 * import_default_shape_constants.ARROW_LABEL_FONT_SIZES[shape.props.size]) {
        width = 16 * import_default_shape_constants.ARROW_LABEL_FONT_SIZES[shape.props.size];
        const { w: squishedWidth, h: squishedHeight } = this.editor.textMeasure.measureText(
          shape.props.text,
          {
            ...import_default_shape_constants.TEXT_PROPS,
            fontFamily: import_default_shape_constants.FONT_FAMILIES[shape.props.font],
            fontSize: import_default_shape_constants.ARROW_LABEL_FONT_SIZES[shape.props.size],
            width: width + "px"
          }
        );
        width = squishedWidth;
        height = squishedHeight;
      }
      labelGeom = new import_editor.Rectangle2d({
        x: info.middle.x - width / 2 - 4.25,
        y: info.middle.y - height / 2 - 4.25,
        width: width + 8.5,
        height: height + 8.5,
        isFilled: true,
        isLabel: true
      });
    }
    return new import_editor.Group2d({
      children: labelGeom ? [bodyGeom, labelGeom] : [bodyGeom],
      isSnappable: false
    });
  }
  getHandles(shape) {
    const info = this.editor.getArrowInfo(shape);
    return [
      {
        id: "start",
        type: "vertex",
        index: "a0",
        x: info.start.handle.x,
        y: info.start.handle.y,
        canBind: true
      },
      {
        id: "middle",
        type: "virtual",
        index: "a2",
        x: info.middle.x,
        y: info.middle.y,
        canBind: false
      },
      {
        id: "end",
        type: "vertex",
        index: "a3",
        x: info.end.handle.x,
        y: info.end.handle.y,
        canBind: true
      }
    ];
  }
  onHandleChange = (shape, { handle, isPrecise: isPrecise2 }) => {
    const handleId = handle.id;
    if (handleId === "middle") {
      const { start, end } = (0, import_editor.getArrowTerminalsInArrowSpace)(this.editor, shape);
      const delta = import_editor.Vec2d.Sub(end, start);
      const v = import_editor.Vec2d.Per(delta);
      const med = import_editor.Vec2d.Med(end, start);
      const A = import_editor.Vec2d.Sub(med, v);
      const B = import_editor.Vec2d.Add(med, v);
      const point2 = import_editor.Vec2d.NearestPointOnLineSegment(A, B, handle, false);
      let bend = import_editor.Vec2d.Dist(point2, med);
      if (import_editor.Vec2d.Clockwise(point2, end, med))
        bend *= -1;
      return { id: shape.id, type: shape.type, props: { bend } };
    }
    const next = (0, import_editor.deepCopy)(shape);
    const pageTransform = this.editor.getShapePageTransform(next.id);
    const pointInPageSpace = pageTransform.applyToPoint(handle);
    if (this.editor.inputs.ctrlKey) {
      next.props[handleId] = {
        type: "point",
        x: handle.x,
        y: handle.y
      };
      return next;
    }
    const point = this.editor.getShapePageTransform(shape.id).applyToPoint(handle);
    const target = this.editor.getShapeAtPoint(point, {
      hitInside: true,
      hitFrameInside: true,
      margin: 0,
      filter: (targetShape) => {
        return !targetShape.isLocked && this.editor.getShapeUtil(targetShape).canBind(targetShape);
      }
    });
    if (!target) {
      next.props[handleId] = {
        type: "point",
        x: handle.x,
        y: handle.y
      };
      return next;
    }
    const targetGeometry = this.editor.getShapeGeometry(target);
    const targetBounds = import_editor.Box2d.ZeroFix(targetGeometry.bounds);
    const pointInTargetSpace = this.editor.getPointInShapeSpace(target, pointInPageSpace);
    let precise = isPrecise2;
    if (!precise) {
      const prevHandle = next.props[handleId];
      if (prevHandle.type === "point" || prevHandle.type === "binding" && target.id !== prevHandle.boundShapeId) {
        precise = this.editor.inputs.pointerVelocity.len() < 0.5;
      }
    }
    if (precise) {
      precise = import_editor.Vec2d.Dist(pointInTargetSpace, targetBounds.center) > Math.max(4, Math.min(Math.min(targetBounds.width, targetBounds.height) * 0.15, 16)) / this.editor.zoomLevel;
    }
    if (!isPrecise2) {
      if (!targetGeometry.isClosed) {
        precise = true;
      }
      const otherHandle = next.props[handleId === "start" ? "end" : "start"];
      if (otherHandle.type === "binding" && target.id === otherHandle.boundShapeId && import_editor.Vec2d.Equals(otherHandle.normalizedAnchor, { x: 0.5, y: 0.5 })) {
        precise = true;
      }
    }
    next.props[handleId] = {
      type: "binding",
      boundShapeId: target.id,
      normalizedAnchor: precise ? {
        x: (pointInTargetSpace.x - targetBounds.minX) / targetBounds.width,
        y: (pointInTargetSpace.y - targetBounds.minY) / targetBounds.height
      } : { x: 0.5, y: 0.5 },
      isExact: this.editor.inputs.altKey
    };
    if (next.props.start.type === "binding" && next.props.end.type === "binding") {
      if (next.props.start.boundShapeId === next.props.end.boundShapeId) {
        if (import_editor.Vec2d.Equals(next.props.start.normalizedAnchor, next.props.end.normalizedAnchor)) {
          next.props.end.normalizedAnchor.x += 0.05;
        }
      }
    }
    return next;
  };
  onTranslateStart = (shape) => {
    const startBindingId = shape.props.start.type === "binding" ? shape.props.start.boundShapeId : null;
    const endBindingId = shape.props.end.type === "binding" ? shape.props.end.boundShapeId : null;
    const { selectedShapeIds } = this.editor;
    if (startBindingId && (selectedShapeIds.includes(startBindingId) || this.editor.isAncestorSelected(startBindingId)) || endBindingId && (selectedShapeIds.includes(endBindingId) || this.editor.isAncestorSelected(endBindingId))) {
      return;
    }
    const { start, end } = (0, import_editor.getArrowTerminalsInArrowSpace)(this.editor, shape);
    return {
      id: shape.id,
      type: shape.type,
      props: {
        ...shape.props,
        start: {
          type: "point",
          x: start.x,
          y: start.y
        },
        end: {
          type: "point",
          x: end.x,
          y: end.y
        }
      }
    };
  };
  onResize = (shape, info) => {
    const { scaleX, scaleY } = info;
    const terminals = (0, import_editor.getArrowTerminalsInArrowSpace)(this.editor, shape);
    const { start, end } = (0, import_editor.deepCopy)(shape.props);
    let { bend } = shape.props;
    if (start.type === "point") {
      start.x = terminals.start.x * scaleX;
      start.y = terminals.start.y * scaleY;
    }
    if (end.type === "point") {
      end.x = terminals.end.x * scaleX;
      end.y = terminals.end.y * scaleY;
    }
    const mx = Math.abs(scaleX);
    const my = Math.abs(scaleY);
    if (scaleX < 0 && scaleY >= 0) {
      if (bend !== 0) {
        bend *= -1;
        bend *= Math.max(mx, my);
      }
      if (start.type === "binding") {
        start.normalizedAnchor.x = 1 - start.normalizedAnchor.x;
      }
      if (end.type === "binding") {
        end.normalizedAnchor.x = 1 - end.normalizedAnchor.x;
      }
    } else if (scaleX >= 0 && scaleY < 0) {
      if (bend !== 0) {
        bend *= -1;
        bend *= Math.max(mx, my);
      }
      if (start.type === "binding") {
        start.normalizedAnchor.y = 1 - start.normalizedAnchor.y;
      }
      if (end.type === "binding") {
        end.normalizedAnchor.y = 1 - end.normalizedAnchor.y;
      }
    } else if (scaleX >= 0 && scaleY >= 0) {
      if (bend !== 0) {
        bend *= Math.max(mx, my);
      }
    } else if (scaleX < 0 && scaleY < 0) {
      if (bend !== 0) {
        bend *= Math.max(mx, my);
      }
      if (start.type === "binding") {
        start.normalizedAnchor.x = 1 - start.normalizedAnchor.x;
        start.normalizedAnchor.y = 1 - start.normalizedAnchor.y;
      }
      if (end.type === "binding") {
        end.normalizedAnchor.x = 1 - end.normalizedAnchor.x;
        end.normalizedAnchor.y = 1 - end.normalizedAnchor.y;
      }
    }
    const next = {
      props: {
        start,
        end,
        bend
      }
    };
    return next;
  };
  onDoubleClickHandle = (shape, handle) => {
    switch (handle.id) {
      case "start": {
        return {
          id: shape.id,
          type: shape.type,
          props: {
            ...shape.props,
            arrowheadStart: shape.props.arrowheadStart === "none" ? "arrow" : "none"
          }
        };
      }
      case "end": {
        return {
          id: shape.id,
          type: shape.type,
          props: {
            ...shape.props,
            arrowheadEnd: shape.props.arrowheadEnd === "none" ? "arrow" : "none"
          }
        };
      }
    }
  };
  component(shape) {
    const theme = (0, import_ShapeFill.useDefaultColorTheme)();
    const onlySelectedShape = this.editor.onlySelectedShape;
    const shouldDisplayHandles = this.editor.isInAny(
      "select.idle",
      "select.pointing_handle",
      "select.dragging_handle",
      "arrow.dragging"
    ) && !this.editor.instanceState.isReadonly;
    const info = this.editor.getArrowInfo(shape);
    const bounds = import_editor.Box2d.ZeroFix(this.editor.getShapeGeometry(shape).bounds);
    const changeIndex = import_react.default.useMemo(() => {
      return this.editor.environment.isSafari ? globalRenderIndex += 1 : 0;
    }, [shape]);
    if (!info?.isValid)
      return null;
    const strokeWidth = import_default_shape_constants.STROKE_SIZES[shape.props.size];
    const as = info.start.arrowhead && (0, import_editor.getArrowheadPathForType)(info, "start", strokeWidth);
    const ae = info.end.arrowhead && (0, import_editor.getArrowheadPathForType)(info, "end", strokeWidth);
    const path = info.isStraight ? (0, import_editor.getSolidStraightArrowPath)(info) : (0, import_editor.getSolidCurvedArrowPath)(info);
    let handlePath = null;
    if (onlySelectedShape === shape && shouldDisplayHandles) {
      const sw = 2;
      const { strokeDasharray: strokeDasharray2, strokeDashoffset: strokeDashoffset2 } = (0, import_getPerfectDashProps.getPerfectDashProps)(
        info.isStraight ? import_editor.Vec2d.Dist(info.start.handle, info.end.handle) : Math.abs(info.handleArc.length),
        sw,
        {
          end: "skip",
          start: "skip",
          lengthRatio: 2.5
        }
      );
      handlePath = shape.props.start.type === "binding" || shape.props.end.type === "binding" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          className: "tl-arrow-hint",
          d: info.isStraight ? (0, import_editor.getStraightArrowHandlePath)(info) : (0, import_editor.getCurvedArrowHandlePath)(info),
          strokeDasharray: strokeDasharray2,
          strokeDashoffset: strokeDashoffset2,
          strokeWidth: sw,
          markerStart: shape.props.start.type === "binding" ? shape.props.start.isExact ? "" : isPrecise(shape.props.start.normalizedAnchor) ? "url(#arrowhead-cross)" : "url(#arrowhead-dot)" : "",
          markerEnd: shape.props.end.type === "binding" ? shape.props.end.isExact ? "" : isPrecise(shape.props.end.normalizedAnchor) ? "url(#arrowhead-cross)" : "url(#arrowhead-dot)" : "",
          opacity: 0.16
        }
      ) : null;
    }
    const { strokeDasharray, strokeDashoffset } = (0, import_getPerfectDashProps.getPerfectDashProps)(
      info.isStraight ? info.length : Math.abs(info.bodyArc.length),
      strokeWidth,
      {
        style: shape.props.dash
      }
    );
    const labelGeometry = shape.props.text.trim() ? this.editor.getShapeGeometry(shape).children[1] : null;
    const maskStartArrowhead = !(info.start.arrowhead === "none" || info.start.arrowhead === "arrow");
    const maskEndArrowhead = !(info.end.arrowhead === "none" || info.end.arrowhead === "arrow");
    const maskId = (shape.id + "_clip_" + changeIndex).replace(":", "_");
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_editor.SVGContainer, { id: shape.id, style: { minWidth: 50, minHeight: 50 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mask", { id: maskId, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "rect",
            {
              x: (0, import_editor.toDomPrecision)(-100 + bounds.minX),
              y: (0, import_editor.toDomPrecision)(-100 + bounds.minY),
              width: (0, import_editor.toDomPrecision)(bounds.width + 200),
              height: (0, import_editor.toDomPrecision)(bounds.height + 200),
              fill: "white"
            }
          ),
          labelGeometry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "rect",
            {
              x: labelGeometry.x,
              y: labelGeometry.y,
              width: labelGeometry.w,
              height: labelGeometry.h,
              fill: "black",
              rx: 4,
              ry: 4
            }
          ),
          as && maskStartArrowhead && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: as,
              fill: info.start.arrowhead === "arrow" ? "none" : "black",
              stroke: "none"
            }
          ),
          ae && maskEndArrowhead && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: ae,
              fill: info.end.arrowhead === "arrow" ? "none" : "black",
              stroke: "none"
            }
          )
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "g",
          {
            fill: "none",
            stroke: theme[shape.props.color].solid,
            strokeWidth,
            strokeLinejoin: "round",
            strokeLinecap: "round",
            pointerEvents: "none",
            children: [
              handlePath,
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { mask: `url(#${maskId})`, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "rect",
                  {
                    x: (0, import_editor.toDomPrecision)(bounds.minX - 100),
                    y: (0, import_editor.toDomPrecision)(bounds.minY - 100),
                    width: (0, import_editor.toDomPrecision)(bounds.width + 200),
                    height: (0, import_editor.toDomPrecision)(bounds.height + 200),
                    opacity: 0
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "path",
                  {
                    d: path,
                    strokeDasharray,
                    strokeDashoffset
                  }
                )
              ] }),
              as && maskStartArrowhead && shape.props.fill !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeFill.ShapeFill, { theme, d: as, color: shape.props.color, fill: shape.props.fill }),
              ae && maskEndArrowhead && shape.props.fill !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeFill.ShapeFill, { theme, d: ae, color: shape.props.color, fill: shape.props.fill }),
              as && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: as }),
              ae && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: ae })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_ArrowTextLabel.ArrowTextLabel,
        {
          id: shape.id,
          text: shape.props.text,
          font: shape.props.font,
          size: shape.props.size,
          position: info.middle,
          width: labelGeometry?.w ?? 0,
          labelColor: theme[shape.props.labelColor].solid
        }
      )
    ] });
  }
  indicator(shape) {
    const { start, end } = (0, import_editor.getArrowTerminalsInArrowSpace)(this.editor, shape);
    const info = this.editor.getArrowInfo(shape);
    const geometry = this.editor.getShapeGeometry(shape);
    const bounds = geometry.bounds;
    const labelGeometry = shape.props.text.trim() ? geometry.children[1] : null;
    if (!info)
      return null;
    if (import_editor.Vec2d.Equals(start, end))
      return null;
    const strokeWidth = import_default_shape_constants.STROKE_SIZES[shape.props.size];
    const as = info.start.arrowhead && (0, import_editor.getArrowheadPathForType)(info, "start", strokeWidth);
    const ae = info.end.arrowhead && (0, import_editor.getArrowheadPathForType)(info, "end", strokeWidth);
    const path = info.isStraight ? (0, import_editor.getSolidStraightArrowPath)(info) : (0, import_editor.getSolidCurvedArrowPath)(info);
    const includeMask = as && info.start.arrowhead !== "arrow" || ae && info.end.arrowhead !== "arrow" || !!labelGeometry;
    const maskId = (shape.id + "_clip").replace(":", "_");
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
      includeMask && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mask", { id: maskId, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "rect",
          {
            x: bounds.minX - 100,
            y: bounds.minY - 100,
            width: bounds.w + 200,
            height: bounds.h + 200,
            fill: "white"
          }
        ),
        labelGeometry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "rect",
          {
            x: (0, import_editor.toDomPrecision)(labelGeometry.x),
            y: (0, import_editor.toDomPrecision)(labelGeometry.y),
            width: labelGeometry.w,
            height: labelGeometry.h,
            fill: "black",
            rx: 3.5,
            ry: 3.5
          }
        ),
        as && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: as,
            fill: info.start.arrowhead === "arrow" ? "none" : "black",
            stroke: "none"
          }
        ),
        ae && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: ae,
            fill: info.end.arrowhead === "arrow" ? "none" : "black",
            stroke: "none"
          }
        )
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { ...includeMask ? { mask: `url(#${maskId})` } : void 0, children: [
        includeMask && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "rect",
          {
            x: bounds.minX - 100,
            y: bounds.minY - 100,
            width: bounds.width + 200,
            height: bounds.height + 200,
            opacity: 0
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: path })
      ] }),
      as && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: as }),
      ae && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: ae }),
      labelGeometry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "rect",
        {
          x: (0, import_editor.toDomPrecision)(labelGeometry.x),
          y: (0, import_editor.toDomPrecision)(labelGeometry.y),
          width: labelGeometry.w,
          height: labelGeometry.h,
          rx: 3.5,
          ry: 3.5
        }
      )
    ] });
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
  toSvg(shape, ctx) {
    const theme = (0, import_editor.getDefaultColorTheme)({ isDarkMode: this.editor.user.isDarkMode });
    ctx.addExportDef((0, import_defaultStyleDefs.getFillDefForExport)(shape.props.fill, theme));
    const color = theme[shape.props.color].solid;
    const info = this.editor.getArrowInfo(shape);
    const strokeWidth = import_default_shape_constants.STROKE_SIZES[shape.props.size];
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    if (!info)
      return g;
    const as = info.start.arrowhead && (0, import_editor.getArrowheadPathForType)(info, "start", strokeWidth);
    const ae = info.end.arrowhead && (0, import_editor.getArrowheadPathForType)(info, "end", strokeWidth);
    const geometry = this.editor.getShapeGeometry(shape);
    const bounds = geometry.bounds;
    const labelGeometry = shape.props.text.trim() ? geometry.children[1] : null;
    const maskId = (shape.id + "_clip").replace(":", "_");
    if (as || ae || !!labelGeometry) {
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
      mask.id = maskId;
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", bounds.minX - 100 + "");
      rect.setAttribute("y", bounds.minY - 100 + "");
      rect.setAttribute("width", bounds.width + 200 + "");
      rect.setAttribute("height", bounds.height + 200 + "");
      rect.setAttribute("fill", "white");
      mask.appendChild(rect);
      if (as)
        mask.appendChild(getArrowheadSvgMask(as, info.start.arrowhead));
      if (ae)
        mask.appendChild(getArrowheadSvgMask(ae, info.end.arrowhead));
      if (labelGeometry) {
        const labelMask = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        labelMask.setAttribute("x", labelGeometry.x + "");
        labelMask.setAttribute("y", labelGeometry.y + "");
        labelMask.setAttribute("width", labelGeometry.w + "");
        labelMask.setAttribute("height", labelGeometry.h + "");
        labelMask.setAttribute("fill", "black");
        mask.appendChild(labelMask);
      }
      defs.appendChild(mask);
      g.appendChild(defs);
    }
    const g2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g2.setAttribute("mask", `url(#${maskId})`);
    g.appendChild(g2);
    const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect2.setAttribute("x", "-100");
    rect2.setAttribute("y", "-100");
    rect2.setAttribute("width", bounds.width + 200 + "");
    rect2.setAttribute("height", bounds.height + 200 + "");
    rect2.setAttribute("fill", "transparent");
    rect2.setAttribute("stroke", "none");
    g2.appendChild(rect2);
    const path = getArrowSvgPath(
      info.isStraight ? (0, import_editor.getSolidStraightArrowPath)(info) : (0, import_editor.getSolidCurvedArrowPath)(info),
      color,
      strokeWidth
    );
    const { strokeDasharray, strokeDashoffset } = (0, import_getPerfectDashProps.getPerfectDashProps)(
      info.isStraight ? info.length : Math.abs(info.bodyArc.length),
      strokeWidth,
      {
        style: shape.props.dash
      }
    );
    path.setAttribute("stroke-dasharray", strokeDasharray);
    path.setAttribute("stroke-dashoffset", strokeDashoffset);
    g2.appendChild(path);
    if (as) {
      g.appendChild(
        getArrowheadSvgPath(
          as,
          shape.props.color,
          strokeWidth,
          shape.props.arrowheadStart === "arrow" ? "none" : shape.props.fill,
          theme
        )
      );
    }
    if (ae) {
      g.appendChild(
        getArrowheadSvgPath(
          ae,
          shape.props.color,
          strokeWidth,
          shape.props.arrowheadEnd === "arrow" ? "none" : shape.props.fill,
          theme
        )
      );
    }
    if (labelGeometry) {
      ctx.addExportDef((0, import_defaultStyleDefs.getFontDefForExport)(shape.props.font));
      const opts = {
        fontSize: import_default_shape_constants.ARROW_LABEL_FONT_SIZES[shape.props.size],
        lineHeight: import_default_shape_constants.TEXT_PROPS.lineHeight,
        fontFamily: import_editor.DefaultFontFamilies[shape.props.font],
        padding: 0,
        textAlign: "middle",
        width: labelGeometry.w - 8,
        verticalTextAlign: "middle",
        height: labelGeometry.h,
        fontStyle: "normal",
        fontWeight: "normal",
        overflow: "wrap"
      };
      const textElm = (0, import_createTextSvgElementFromSpans.createTextSvgElementFromSpans)(
        this.editor,
        this.editor.textMeasure.measureTextSpans(shape.props.text, opts),
        opts
      );
      textElm.setAttribute("fill", theme[shape.props.labelColor].solid);
      const children = Array.from(textElm.children);
      children.forEach((child) => {
        const x = parseFloat(child.getAttribute("x") || "0");
        const y = parseFloat(child.getAttribute("y") || "0");
        child.setAttribute("x", x + 4 + labelGeometry.x + "px");
        child.setAttribute("y", y + labelGeometry.y + "px");
      });
      const textBgEl = textElm.cloneNode(true);
      textBgEl.setAttribute("stroke-width", "2");
      textBgEl.setAttribute("fill", theme.background);
      textBgEl.setAttribute("stroke", theme.background);
      g.appendChild(textBgEl);
      g.appendChild(textElm);
    }
    return g;
  }
  getCanvasSvgDefs() {
    return [(0, import_defaultStyleDefs.getFillDefForCanvas)()];
  }
}
function getArrowheadSvgMask(d, arrowhead) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  path.setAttribute("fill", arrowhead === "arrow" ? "none" : "black");
  path.setAttribute("stroke", "none");
  return path;
}
function getArrowSvgPath(d, color, strokeWidth) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", color);
  path.setAttribute("stroke-width", strokeWidth + "");
  return path;
}
function getArrowheadSvgPath(d, color, strokeWidth, fill, theme) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", theme[color].solid);
  path.setAttribute("stroke-width", strokeWidth + "");
  const shapeFill = (0, import_ShapeFill.getShapeFillSvg)({
    d,
    fill,
    color,
    theme
  });
  if (shapeFill) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.appendChild(shapeFill);
    g.appendChild(path);
    return g;
  } else {
    return path;
  }
}
function isPrecise(normalizedAnchor) {
  return normalizedAnchor.x !== 0.5 || normalizedAnchor.y !== 0.5;
}
//# sourceMappingURL=ArrowShapeUtil.js.map
