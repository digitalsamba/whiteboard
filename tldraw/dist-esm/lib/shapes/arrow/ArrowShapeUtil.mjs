import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import {
  Arc2d,
  Box2d,
  DefaultFontFamilies,
  Edge2d,
  Group2d,
  Rectangle2d,
  SVGContainer,
  ShapeUtil,
  Vec2d,
  arrowShapeMigrations,
  arrowShapeProps,
  deepCopy,
  getArrowTerminalsInArrowSpace,
  getArrowheadPathForType,
  getCurvedArrowHandlePath,
  getDefaultColorTheme,
  getSolidCurvedArrowPath,
  getSolidStraightArrowPath,
  getStraightArrowHandlePath,
  toDomPrecision
} from "@tldraw/editor";
import React from "react";
import { ShapeFill, getShapeFillSvg, useDefaultColorTheme } from "../shared/ShapeFill.mjs";
import { createTextSvgElementFromSpans } from "../shared/createTextSvgElementFromSpans.mjs";
import {
  ARROW_LABEL_FONT_SIZES,
  FONT_FAMILIES,
  STROKE_SIZES,
  TEXT_PROPS
} from "../shared/default-shape-constants.mjs";
import {
  getFillDefForCanvas,
  getFillDefForExport,
  getFontDefForExport
} from "../shared/defaultStyleDefs.mjs";
import { getPerfectDashProps } from "../shared/getPerfectDashProps.mjs";
import { ArrowTextLabel } from "./components/ArrowTextLabel.mjs";
let globalRenderIndex = 0;
class ArrowShapeUtil extends ShapeUtil {
  static type = "arrow";
  static props = arrowShapeProps;
  static migrations = arrowShapeMigrations;
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
    const bodyGeom = info.isStraight ? new Edge2d({
      start: Vec2d.From(info.start.point),
      end: Vec2d.From(info.end.point)
    }) : new Arc2d({
      center: Vec2d.Cast(info.handleArc.center),
      radius: info.handleArc.radius,
      start: Vec2d.Cast(info.start.point),
      end: Vec2d.Cast(info.end.point),
      sweepFlag: info.bodyArc.sweepFlag,
      largeArcFlag: info.bodyArc.largeArcFlag
    });
    let labelGeom;
    if (shape.props.text.trim()) {
      const bodyBounds = bodyGeom.bounds;
      const { w, h } = this.editor.textMeasure.measureText(shape.props.text, {
        ...TEXT_PROPS,
        fontFamily: FONT_FAMILIES[shape.props.font],
        fontSize: ARROW_LABEL_FONT_SIZES[shape.props.size],
        width: "fit-content"
      });
      let width = w;
      let height = h;
      if (bodyBounds.width > bodyBounds.height) {
        width = Math.max(Math.min(w, 64), Math.min(bodyBounds.width - 64, w));
        const { w: squishedWidth, h: squishedHeight } = this.editor.textMeasure.measureText(
          shape.props.text,
          {
            ...TEXT_PROPS,
            fontFamily: FONT_FAMILIES[shape.props.font],
            fontSize: ARROW_LABEL_FONT_SIZES[shape.props.size],
            width: width + "px"
          }
        );
        width = squishedWidth;
        height = squishedHeight;
      }
      if (width > 16 * ARROW_LABEL_FONT_SIZES[shape.props.size]) {
        width = 16 * ARROW_LABEL_FONT_SIZES[shape.props.size];
        const { w: squishedWidth, h: squishedHeight } = this.editor.textMeasure.measureText(
          shape.props.text,
          {
            ...TEXT_PROPS,
            fontFamily: FONT_FAMILIES[shape.props.font],
            fontSize: ARROW_LABEL_FONT_SIZES[shape.props.size],
            width: width + "px"
          }
        );
        width = squishedWidth;
        height = squishedHeight;
      }
      labelGeom = new Rectangle2d({
        x: info.middle.x - width / 2 - 4.25,
        y: info.middle.y - height / 2 - 4.25,
        width: width + 8.5,
        height: height + 8.5,
        isFilled: true,
        isLabel: true
      });
    }
    return new Group2d({
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
      const { start, end } = getArrowTerminalsInArrowSpace(this.editor, shape);
      const delta = Vec2d.Sub(end, start);
      const v = Vec2d.Per(delta);
      const med = Vec2d.Med(end, start);
      const A = Vec2d.Sub(med, v);
      const B = Vec2d.Add(med, v);
      const point2 = Vec2d.NearestPointOnLineSegment(A, B, handle, false);
      let bend = Vec2d.Dist(point2, med);
      if (Vec2d.Clockwise(point2, end, med))
        bend *= -1;
      return { id: shape.id, type: shape.type, props: { bend } };
    }
    const next = deepCopy(shape);
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
    const targetBounds = Box2d.ZeroFix(targetGeometry.bounds);
    const pointInTargetSpace = this.editor.getPointInShapeSpace(target, pointInPageSpace);
    let precise = isPrecise2;
    if (!precise) {
      const prevHandle = next.props[handleId];
      if (prevHandle.type === "point" || prevHandle.type === "binding" && target.id !== prevHandle.boundShapeId) {
        precise = this.editor.inputs.pointerVelocity.len() < 0.5;
      }
    }
    if (precise) {
      precise = Vec2d.Dist(pointInTargetSpace, targetBounds.center) > Math.max(4, Math.min(Math.min(targetBounds.width, targetBounds.height) * 0.15, 16)) / this.editor.zoomLevel;
    }
    if (!isPrecise2) {
      if (!targetGeometry.isClosed) {
        precise = true;
      }
      const otherHandle = next.props[handleId === "start" ? "end" : "start"];
      if (otherHandle.type === "binding" && target.id === otherHandle.boundShapeId && Vec2d.Equals(otherHandle.normalizedAnchor, { x: 0.5, y: 0.5 })) {
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
        if (Vec2d.Equals(next.props.start.normalizedAnchor, next.props.end.normalizedAnchor)) {
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
    const { start, end } = getArrowTerminalsInArrowSpace(this.editor, shape);
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
    const terminals = getArrowTerminalsInArrowSpace(this.editor, shape);
    const { start, end } = deepCopy(shape.props);
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
    const theme = useDefaultColorTheme();
    const onlySelectedShape = this.editor.onlySelectedShape;
    const shouldDisplayHandles = this.editor.isInAny(
      "select.idle",
      "select.pointing_handle",
      "select.dragging_handle",
      "arrow.dragging"
    ) && !this.editor.instanceState.isReadonly;
    const info = this.editor.getArrowInfo(shape);
    const bounds = Box2d.ZeroFix(this.editor.getShapeGeometry(shape).bounds);
    const changeIndex = React.useMemo(() => {
      return this.editor.environment.isSafari ? globalRenderIndex += 1 : 0;
    }, [shape]);
    if (!info?.isValid)
      return null;
    const strokeWidth = STROKE_SIZES[shape.props.size];
    const as = info.start.arrowhead && getArrowheadPathForType(info, "start", strokeWidth);
    const ae = info.end.arrowhead && getArrowheadPathForType(info, "end", strokeWidth);
    const path = info.isStraight ? getSolidStraightArrowPath(info) : getSolidCurvedArrowPath(info);
    let handlePath = null;
    if (onlySelectedShape === shape && shouldDisplayHandles) {
      const sw = 2;
      const { strokeDasharray: strokeDasharray2, strokeDashoffset: strokeDashoffset2 } = getPerfectDashProps(
        info.isStraight ? Vec2d.Dist(info.start.handle, info.end.handle) : Math.abs(info.handleArc.length),
        sw,
        {
          end: "skip",
          start: "skip",
          lengthRatio: 2.5
        }
      );
      handlePath = shape.props.start.type === "binding" || shape.props.end.type === "binding" ? /* @__PURE__ */ jsx(
        "path",
        {
          className: "tl-arrow-hint",
          d: info.isStraight ? getStraightArrowHandlePath(info) : getCurvedArrowHandlePath(info),
          strokeDasharray: strokeDasharray2,
          strokeDashoffset: strokeDashoffset2,
          strokeWidth: sw,
          markerStart: shape.props.start.type === "binding" ? shape.props.start.isExact ? "" : isPrecise(shape.props.start.normalizedAnchor) ? "url(#arrowhead-cross)" : "url(#arrowhead-dot)" : "",
          markerEnd: shape.props.end.type === "binding" ? shape.props.end.isExact ? "" : isPrecise(shape.props.end.normalizedAnchor) ? "url(#arrowhead-cross)" : "url(#arrowhead-dot)" : "",
          opacity: 0.16
        }
      ) : null;
    }
    const { strokeDasharray, strokeDashoffset } = getPerfectDashProps(
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
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(SVGContainer, { id: shape.id, style: { minWidth: 50, minHeight: 50 }, children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("mask", { id: maskId, children: [
          /* @__PURE__ */ jsx(
            "rect",
            {
              x: toDomPrecision(-100 + bounds.minX),
              y: toDomPrecision(-100 + bounds.minY),
              width: toDomPrecision(bounds.width + 200),
              height: toDomPrecision(bounds.height + 200),
              fill: "white"
            }
          ),
          labelGeometry && /* @__PURE__ */ jsx(
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
          as && maskStartArrowhead && /* @__PURE__ */ jsx(
            "path",
            {
              d: as,
              fill: info.start.arrowhead === "arrow" ? "none" : "black",
              stroke: "none"
            }
          ),
          ae && maskEndArrowhead && /* @__PURE__ */ jsx(
            "path",
            {
              d: ae,
              fill: info.end.arrowhead === "arrow" ? "none" : "black",
              stroke: "none"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs(
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
              /* @__PURE__ */ jsxs("g", { mask: `url(#${maskId})`, children: [
                /* @__PURE__ */ jsx(
                  "rect",
                  {
                    x: toDomPrecision(bounds.minX - 100),
                    y: toDomPrecision(bounds.minY - 100),
                    width: toDomPrecision(bounds.width + 200),
                    height: toDomPrecision(bounds.height + 200),
                    opacity: 0
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: path,
                    strokeDasharray,
                    strokeDashoffset
                  }
                )
              ] }),
              as && maskStartArrowhead && shape.props.fill !== "none" && /* @__PURE__ */ jsx(ShapeFill, { theme, d: as, color: shape.props.color, fill: shape.props.fill }),
              ae && maskEndArrowhead && shape.props.fill !== "none" && /* @__PURE__ */ jsx(ShapeFill, { theme, d: ae, color: shape.props.color, fill: shape.props.fill }),
              as && /* @__PURE__ */ jsx("path", { d: as }),
              ae && /* @__PURE__ */ jsx("path", { d: ae })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        ArrowTextLabel,
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
    const { start, end } = getArrowTerminalsInArrowSpace(this.editor, shape);
    const info = this.editor.getArrowInfo(shape);
    const geometry = this.editor.getShapeGeometry(shape);
    const bounds = geometry.bounds;
    const labelGeometry = shape.props.text.trim() ? geometry.children[1] : null;
    if (!info)
      return null;
    if (Vec2d.Equals(start, end))
      return null;
    const strokeWidth = STROKE_SIZES[shape.props.size];
    const as = info.start.arrowhead && getArrowheadPathForType(info, "start", strokeWidth);
    const ae = info.end.arrowhead && getArrowheadPathForType(info, "end", strokeWidth);
    const path = info.isStraight ? getSolidStraightArrowPath(info) : getSolidCurvedArrowPath(info);
    const includeMask = as && info.start.arrowhead !== "arrow" || ae && info.end.arrowhead !== "arrow" || !!labelGeometry;
    const maskId = (shape.id + "_clip").replace(":", "_");
    return (
      /* @__PURE__ */ jsxs("g", { children: [
        includeMask && /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("mask", { id: maskId, children: [
          /* @__PURE__ */ jsx(
            "rect",
            {
              x: bounds.minX - 100,
              y: bounds.minY - 100,
              width: bounds.w + 200,
              height: bounds.h + 200,
              fill: "white"
            }
          ),
          labelGeometry && /* @__PURE__ */ jsx(
            "rect",
            {
              x: toDomPrecision(labelGeometry.x),
              y: toDomPrecision(labelGeometry.y),
              width: labelGeometry.w,
              height: labelGeometry.h,
              fill: "black",
              rx: 3.5,
              ry: 3.5
            }
          ),
          as && /* @__PURE__ */ jsx(
            "path",
            {
              d: as,
              fill: info.start.arrowhead === "arrow" ? "none" : "black",
              stroke: "none"
            }
          ),
          ae && /* @__PURE__ */ jsx(
            "path",
            {
              d: ae,
              fill: info.end.arrowhead === "arrow" ? "none" : "black",
              stroke: "none"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs("g", { ...(includeMask ? { mask: `url(#${maskId})` } : void 0), children: [
          includeMask && /* @__PURE__ */ jsx(
            "rect",
            {
              x: bounds.minX - 100,
              y: bounds.minY - 100,
              width: bounds.width + 200,
              height: bounds.height + 200,
              opacity: 0
            }
          ),
          /* @__PURE__ */ jsx("path", { d: path })
        ] }),
        as && /* @__PURE__ */ jsx("path", { d: as }),
        ae && /* @__PURE__ */ jsx("path", { d: ae }),
        labelGeometry && /* @__PURE__ */ jsx(
          "rect",
          {
            x: toDomPrecision(labelGeometry.x),
            y: toDomPrecision(labelGeometry.y),
            width: labelGeometry.w,
            height: labelGeometry.h,
            rx: 3.5,
            ry: 3.5
          }
        )
      ] })
    );
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
    const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.isDarkMode });
    ctx.addExportDef(getFillDefForExport(shape.props.fill, theme));
    const color = theme[shape.props.color].solid;
    const info = this.editor.getArrowInfo(shape);
    const strokeWidth = STROKE_SIZES[shape.props.size];
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    if (!info)
      return g;
    const as = info.start.arrowhead && getArrowheadPathForType(info, "start", strokeWidth);
    const ae = info.end.arrowhead && getArrowheadPathForType(info, "end", strokeWidth);
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
      info.isStraight ? getSolidStraightArrowPath(info) : getSolidCurvedArrowPath(info),
      color,
      strokeWidth
    );
    const { strokeDasharray, strokeDashoffset } = getPerfectDashProps(
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
      ctx.addExportDef(getFontDefForExport(shape.props.font));
      const opts = {
        fontSize: ARROW_LABEL_FONT_SIZES[shape.props.size],
        lineHeight: TEXT_PROPS.lineHeight,
        fontFamily: DefaultFontFamilies[shape.props.font],
        padding: 0,
        textAlign: "middle",
        width: labelGeometry.w - 8,
        verticalTextAlign: "middle",
        height: labelGeometry.h,
        fontStyle: "normal",
        fontWeight: "normal",
        overflow: "wrap"
      };
      const textElm = createTextSvgElementFromSpans(
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
    return [getFillDefForCanvas()];
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
  const shapeFill = getShapeFillSvg({
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
export {
  ArrowShapeUtil
};
//# sourceMappingURL=ArrowShapeUtil.mjs.map
