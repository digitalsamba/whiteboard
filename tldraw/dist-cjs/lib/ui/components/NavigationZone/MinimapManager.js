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
var MinimapManager_exports = {};
__export(MinimapManager_exports, {
  MinimapManager: () => MinimapManager
});
module.exports = __toCommonJS(MinimapManager_exports);
var import_editor = require("@tldraw/editor");
class MinimapManager {
  constructor(editor) {
    this.editor = editor;
  }
  dpr = 1;
  colors = {
    shapeFill: "rgba(144, 144, 144, .1)",
    selectFill: "#2f80ed",
    viewportFill: "rgba(144, 144, 144, .1)"
  };
  id = (0, import_editor.uniqueId)();
  cvs = null;
  pageBounds = [];
  collaborators = [];
  canvasScreenBounds = new import_editor.Box2d();
  canvasPageBounds = new import_editor.Box2d();
  contentPageBounds = new import_editor.Box2d();
  contentScreenBounds = new import_editor.Box2d();
  originPagePoint = new import_editor.Vec2d();
  originPageCenter = new import_editor.Vec2d();
  isInViewport = false;
  debug = false;
  setDpr(dpr) {
    this.dpr = +dpr.toFixed(2);
  }
  updateContentScreenBounds = () => {
    const { contentScreenBounds, contentPageBounds: content, canvasScreenBounds: canvas } = this;
    let { x, y, w, h } = contentScreenBounds;
    if (content.w > content.h) {
      const sh = canvas.w / (content.w / content.h);
      if (sh > canvas.h) {
        x = (canvas.w - canvas.w * (canvas.h / sh)) / 2;
        y = 0;
        w = canvas.w * (canvas.h / sh);
        h = canvas.h;
      } else {
        x = 0;
        y = (canvas.h - sh) / 2;
        w = canvas.w;
        h = sh;
      }
    } else if (content.w < content.h) {
      const sw = canvas.h / (content.h / content.w);
      x = (canvas.w - sw) / 2;
      y = 0;
      w = sw;
      h = canvas.h;
    } else {
      x = canvas.h / 2;
      y = 0;
      w = canvas.h;
      h = canvas.h;
    }
    contentScreenBounds.set(x, y, w, h);
  };
  /** Get the canvas's true bounds converted to page bounds. */
  updateCanvasPageBounds = () => {
    const { canvasPageBounds, canvasScreenBounds, contentPageBounds, contentScreenBounds } = this;
    canvasPageBounds.set(
      0,
      0,
      contentPageBounds.width / (contentScreenBounds.width / canvasScreenBounds.width),
      contentPageBounds.height / (contentScreenBounds.height / canvasScreenBounds.height)
    );
    canvasPageBounds.center = contentPageBounds.center;
  };
  getScreenPoint = (x, y) => {
    const { canvasScreenBounds } = this;
    const screenX = (x - canvasScreenBounds.minX) * this.dpr;
    const screenY = (y - canvasScreenBounds.minY) * this.dpr;
    return { x: screenX, y: screenY };
  };
  getPagePoint = (x, y) => {
    const { contentPageBounds, contentScreenBounds, canvasPageBounds } = this;
    const { x: screenX, y: screenY } = this.getScreenPoint(x, y);
    return new import_editor.Vec2d(
      canvasPageBounds.minX + screenX * contentPageBounds.width / contentScreenBounds.width,
      canvasPageBounds.minY + screenY * contentPageBounds.height / contentScreenBounds.height,
      1
    );
  };
  minimapScreenPointToPagePoint = (x, y, shiftKey = false, clampToBounds = false) => {
    const { editor } = this;
    const { viewportPageBounds } = editor;
    let { x: px, y: py } = this.getPagePoint(x, y);
    if (clampToBounds) {
      const shapesPageBounds = this.editor.currentPageBounds;
      const vpPageBounds = viewportPageBounds;
      const minX = (shapesPageBounds?.minX ?? 0) - vpPageBounds.width / 2;
      const maxX = (shapesPageBounds?.maxX ?? 0) + vpPageBounds.width / 2;
      const minY = (shapesPageBounds?.minY ?? 0) - vpPageBounds.height / 2;
      const maxY = (shapesPageBounds?.maxY ?? 0) + vpPageBounds.height / 2;
      const lx = Math.max(0, minX + vpPageBounds.width - px);
      const rx = Math.max(0, -(maxX - vpPageBounds.width - px));
      const ly = Math.max(0, minY + vpPageBounds.height - py);
      const ry = Math.max(0, -(maxY - vpPageBounds.height - py));
      const ql = Math.max(0, lx - rx);
      const qr = Math.max(0, rx - lx);
      const qt = Math.max(0, ly - ry);
      const qb = Math.max(0, ry - ly);
      if (ql && ql > qr) {
        px += ql / 2;
      } else if (qr) {
        px -= qr / 2;
      }
      if (qt && qt > qb) {
        py += qt / 2;
      } else if (qb) {
        py -= qb / 2;
      }
      px = (0, import_editor.clamp)(px, minX, maxX);
      py = (0, import_editor.clamp)(py, minY, maxY);
    }
    if (shiftKey) {
      const { originPagePoint } = this;
      const dx = Math.abs(px - originPagePoint.x);
      const dy = Math.abs(py - originPagePoint.y);
      if (dx > dy) {
        py = originPagePoint.y;
      } else {
        px = originPagePoint.x;
      }
    }
    return new import_editor.Vec2d(px, py);
  };
  render = () => {
    const { cvs, pageBounds } = this;
    this.updateCanvasPageBounds();
    const { editor, canvasScreenBounds, canvasPageBounds, contentPageBounds, contentScreenBounds } = this;
    const { width: cw, height: ch } = canvasScreenBounds;
    const { viewportPageBounds, selectedShapeIds } = editor;
    if (!cvs || !pageBounds) {
      return;
    }
    const ctx = cvs.getContext("2d");
    if (!ctx) {
      throw new Error("Minimap (shapes): Could not get context");
    }
    ctx.resetTransform();
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, cw, ch);
    const sx = contentScreenBounds.width / contentPageBounds.width;
    const sy = contentScreenBounds.height / contentPageBounds.height;
    ctx.translate((cw - contentScreenBounds.width) / 2, (ch - contentScreenBounds.height) / 2);
    ctx.scale(sx, sy);
    ctx.translate(-contentPageBounds.minX, -contentPageBounds.minY);
    const rx = 8 / sx;
    const ry = 8 / sx;
    const ax = 1 / sx;
    const ay = 1 / sx;
    const bx = rx / 4;
    const by = ry / 4;
    const shapesPath = new Path2D();
    const selectedPath = new Path2D();
    const { shapeFill, selectFill, viewportFill } = this.colors;
    let pb;
    for (let i = 0, n = pageBounds.length; i < n; i++) {
      pb = pageBounds[i];
      MinimapManager.roundedRect(
        selectedShapeIds.includes(pb.id) ? selectedPath : shapesPath,
        pb.minX,
        pb.minY,
        pb.width,
        pb.height,
        (0, import_editor.clamp)(rx, ax, pb.width / bx),
        (0, import_editor.clamp)(ry, ay, pb.height / by)
      );
    }
    ctx.fillStyle = shapeFill;
    ctx.fill(shapesPath);
    ctx.fillStyle = selectFill;
    ctx.fill(selectedPath);
    if (this.debug) {
      const commonBounds = import_editor.Box2d.Common(pageBounds);
      const { minX, minY, width, height } = commonBounds;
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2 / sx;
      ctx.strokeRect(minX + 1 / sx, minY + 1 / sy, width - 2 / sx, height - 2 / sy);
    }
    {
      const { brush } = editor.instanceState;
      if (brush) {
        const { x, y, w, h } = brush;
        ctx.beginPath();
        MinimapManager.sharpRect(ctx, x, y, w, h);
        ctx.closePath();
        ctx.fillStyle = viewportFill;
        ctx.fill();
      }
    }
    {
      const { minX, minY, width, height } = viewportPageBounds;
      ctx.beginPath();
      const rx2 = 12 / sx;
      const ry2 = 12 / sx;
      MinimapManager.roundedRect(
        ctx,
        minX,
        minY,
        width,
        height,
        Math.min(width / 4, rx2),
        Math.min(height / 4, ry2)
      );
      ctx.closePath();
      ctx.fillStyle = viewportFill;
      ctx.fill();
      if (this.debug) {
        ctx.strokeStyle = "orange";
        ctx.strokeRect(minX + 1 / sx, minY + 1 / sy, width - 2 / sx, height - 2 / sy);
      }
    }
    const px = 2.5 / sx;
    const py = 2.5 / sy;
    const { currentPageId } = editor;
    let collaborator;
    for (let i = 0; i < this.collaborators.length; i++) {
      collaborator = this.collaborators[i];
      if (collaborator.currentPageId !== currentPageId) {
        continue;
      }
      ctx.beginPath();
      ctx.ellipse(
        (0, import_editor.clamp)(collaborator.cursor.x, canvasPageBounds.minX + px, canvasPageBounds.maxX - px),
        (0, import_editor.clamp)(collaborator.cursor.y, canvasPageBounds.minY + py, canvasPageBounds.maxY - py),
        5 / sx,
        5 / sy,
        0,
        0,
        import_editor.PI2
      );
      ctx.fillStyle = collaborator.color;
      ctx.fill();
    }
    if (this.debug) {
      ctx.lineWidth = 2 / sx;
      {
        const { minX, minY, width, height } = contentPageBounds;
        ctx.strokeStyle = "red";
        ctx.strokeRect(minX + 1 / sx, minY + 1 / sy, width - 2 / sx, height - 2 / sy);
      }
      {
        const { minX, minY, width, height } = canvasPageBounds;
        ctx.strokeStyle = "blue";
        ctx.strokeRect(minX + 1 / sx, minY + 1 / sy, width - 2 / sx, height - 2 / sy);
      }
    }
  };
  static roundedRect(ctx, x, y, width, height, rx, ry) {
    if (rx < 1 && ry < 1) {
      ctx.rect(x, y, width, height);
      return;
    }
    ctx.moveTo(x + rx, y);
    ctx.lineTo(x + width - rx, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + ry);
    ctx.lineTo(x + width, y + height - ry);
    ctx.quadraticCurveTo(x + width, y + height, x + width - rx, y + height);
    ctx.lineTo(x + rx, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - ry);
    ctx.lineTo(x, y + ry);
    ctx.quadraticCurveTo(x, y, x + rx, y);
  }
  static sharpRect(ctx, x, y, width, height, _rx, _ry) {
    ctx.rect(x, y, width, height);
  }
}
//# sourceMappingURL=MinimapManager.js.map
