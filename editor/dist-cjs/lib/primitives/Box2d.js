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
var Box2d_exports = {};
__export(Box2d_exports, {
  Box2d: () => Box2d,
  ROTATE_CORNER_TO_SELECTION_CORNER: () => ROTATE_CORNER_TO_SELECTION_CORNER,
  flipSelectionHandleX: () => flipSelectionHandleX,
  flipSelectionHandleY: () => flipSelectionHandleY,
  isSelectionCorner: () => isSelectionCorner,
  rotateSelectionHandle: () => rotateSelectionHandle
});
module.exports = __toCommonJS(Box2d_exports);
var import_Vec2d = require("./Vec2d");
var import_utils = require("./utils");
class Box2d {
  constructor(x = 0, y = 0, w = 0, h = 0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  x = 0;
  y = 0;
  w = 0;
  h = 0;
  get point() {
    return new import_Vec2d.Vec2d(this.x, this.y);
  }
  set point(val) {
    this.x = val.x;
    this.y = val.y;
  }
  get minX() {
    return this.x;
  }
  set minX(n) {
    this.x = n;
  }
  get midX() {
    return this.x + this.w / 2;
  }
  get maxX() {
    return this.x + this.w;
  }
  get minY() {
    return this.y;
  }
  set minY(n) {
    this.y = n;
  }
  get midY() {
    return this.y + this.h / 2;
  }
  get maxY() {
    return this.y + this.h;
  }
  get width() {
    return this.w;
  }
  set width(n) {
    this.w = n;
  }
  get height() {
    return this.h;
  }
  set height(n) {
    this.h = n;
  }
  get aspectRatio() {
    return this.width / this.height;
  }
  get center() {
    return new import_Vec2d.Vec2d(this.midX, this.midY);
  }
  set center(v) {
    this.minX = v.x - this.width / 2;
    this.minY = v.y - this.height / 2;
  }
  get corners() {
    return [
      new import_Vec2d.Vec2d(this.minX, this.minY),
      new import_Vec2d.Vec2d(this.maxX, this.minY),
      new import_Vec2d.Vec2d(this.maxX, this.maxY),
      new import_Vec2d.Vec2d(this.minX, this.maxY)
    ];
  }
  get snapPoints() {
    return [
      new import_Vec2d.Vec2d(this.minX, this.minY),
      new import_Vec2d.Vec2d(this.maxX, this.minY),
      new import_Vec2d.Vec2d(this.maxX, this.maxY),
      new import_Vec2d.Vec2d(this.minX, this.maxY),
      this.center
    ];
  }
  get sides() {
    const { corners } = this;
    return [
      [corners[0], corners[1]],
      [corners[1], corners[2]],
      [corners[2], corners[3]],
      [corners[3], corners[0]]
    ];
  }
  get size() {
    return new import_Vec2d.Vec2d(this.w, this.h);
  }
  toFixed() {
    this.x = (0, import_utils.toPrecision)(this.x);
    this.y = (0, import_utils.toPrecision)(this.y);
    this.w = (0, import_utils.toPrecision)(this.w);
    this.h = (0, import_utils.toPrecision)(this.h);
    return this;
  }
  setTo(B) {
    this.x = B.x;
    this.y = B.y;
    this.w = B.w;
    this.h = B.h;
    return this;
  }
  set(x = 0, y = 0, w = 0, h = 0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    return this;
  }
  expand(A) {
    const minX = Math.min(this.minX, A.minX);
    const minY = Math.min(this.minY, A.minY);
    const maxX = Math.max(this.maxX, A.maxX);
    const maxY = Math.max(this.maxY, A.maxY);
    this.x = minX;
    this.y = minY;
    this.w = maxX - minX;
    this.h = maxY - minY;
    return this;
  }
  expandBy(n) {
    this.x -= n;
    this.y -= n;
    this.w += n * 2;
    this.h += n * 2;
    return this;
  }
  scale(n) {
    this.x /= n;
    this.y /= n;
    this.w /= n;
    this.h /= n;
    return this;
  }
  clone() {
    const { x, y, w, h } = this;
    return new Box2d(x, y, w, h);
  }
  translate(delta) {
    this.x += delta.x;
    this.y += delta.y;
    return this;
  }
  snapToGrid(size) {
    const minX = Math.round(this.minX / size) * size;
    const minY = Math.round(this.minY / size) * size;
    const maxX = Math.round(this.maxX / size) * size;
    const maxY = Math.round(this.maxY / size) * size;
    this.minX = minX;
    this.minY = minY;
    this.width = Math.max(1, maxX - minX);
    this.height = Math.max(1, maxY - minY);
  }
  collides(B) {
    return Box2d.Collides(this, B);
  }
  contains(B) {
    return Box2d.Contains(this, B);
  }
  includes(B) {
    return Box2d.Includes(this, B);
  }
  containsPoint(V, margin = 0) {
    return Box2d.ContainsPoint(this, V, margin);
  }
  getHandlePoint(handle) {
    switch (handle) {
      case "top_left":
        return new import_Vec2d.Vec2d(this.minX, this.minY);
      case "top_right":
        return new import_Vec2d.Vec2d(this.maxX, this.minY);
      case "bottom_left":
        return new import_Vec2d.Vec2d(this.minX, this.maxY);
      case "bottom_right":
        return new import_Vec2d.Vec2d(this.maxX, this.maxY);
      case "top":
        return new import_Vec2d.Vec2d(this.midX, this.minY);
      case "right":
        return new import_Vec2d.Vec2d(this.maxX, this.midY);
      case "bottom":
        return new import_Vec2d.Vec2d(this.midX, this.maxY);
      case "left":
        return new import_Vec2d.Vec2d(this.minX, this.midY);
    }
  }
  toJson() {
    return { x: this.minX, y: this.minY, w: this.w, h: this.h };
  }
  resize(handle, dx, dy) {
    const { minX: a0x, minY: a0y, maxX: a1x, maxY: a1y } = this;
    let { minX: b0x, minY: b0y, maxX: b1x, maxY: b1y } = this;
    switch (handle) {
      case "left":
      case "top_left":
      case "bottom_left": {
        b0x += dx;
        break;
      }
      case "right":
      case "top_right":
      case "bottom_right": {
        b1x += dx;
        break;
      }
    }
    switch (handle) {
      case "top":
      case "top_left":
      case "top_right": {
        b0y += dy;
        break;
      }
      case "bottom":
      case "bottom_left":
      case "bottom_right": {
        b1y += dy;
        break;
      }
    }
    const scaleX = (b1x - b0x) / (a1x - a0x);
    const scaleY = (b1y - b0y) / (a1y - a0y);
    const flipX = scaleX < 0;
    const flipY = scaleY < 0;
    if (flipX) {
      const t = b1x;
      b1x = b0x;
      b0x = t;
    }
    if (flipY) {
      const t = b1y;
      b1y = b0y;
      b0y = t;
    }
    this.minX = b0x;
    this.minY = b0y;
    this.width = Math.abs(b1x - b0x);
    this.height = Math.abs(b1y - b0y);
  }
  union(box) {
    const minX = Math.min(this.minX, box.x);
    const minY = Math.min(this.minY, box.y);
    const maxX = Math.max(this.maxX, box.w + box.x);
    const maxY = Math.max(this.maxY, box.h + box.y);
    this.x = minX;
    this.y = minY;
    this.width = maxX - minX;
    this.height = maxY - minY;
    return this;
  }
  static From(box) {
    return new Box2d(box.x, box.y, box.w, box.h);
  }
  static FromPoints(points) {
    if (points.length === 0)
      return new Box2d();
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let point;
    for (let i = 0, n = points.length; i < n; i++) {
      point = points[i];
      minX = Math.min(point.x, minX);
      minY = Math.min(point.y, minY);
      maxX = Math.max(point.x, maxX);
      maxY = Math.max(point.y, maxY);
    }
    return new Box2d(minX, minY, maxX - minX, maxY - minY);
  }
  static Expand(A, B) {
    const minX = Math.min(B.minX, A.minX);
    const minY = Math.min(B.minY, A.minY);
    const maxX = Math.max(B.maxX, A.maxX);
    const maxY = Math.max(B.maxY, A.maxY);
    return new Box2d(minX, minY, maxX - minX, maxY - minY);
  }
  static ExpandBy(A, n) {
    return new Box2d(A.minX - n, A.minY - n, A.width + n * 2, A.height + n * 2);
  }
  static Collides = (A, B) => {
    return !(A.maxX < B.minX || A.minX > B.maxX || A.maxY < B.minY || A.minY > B.maxY);
  };
  static Contains = (A, B) => {
    return A.minX < B.minX && A.minY < B.minY && A.maxY > B.maxY && A.maxX > B.maxX;
  };
  static Includes = (A, B) => {
    return Box2d.Collides(A, B) || Box2d.Contains(A, B);
  };
  static ContainsPoint = (A, B, margin = 0) => {
    return !(B.x < A.minX - margin || B.y < A.minY - margin || B.x > A.maxX + margin || B.y > A.maxY + margin);
  };
  static Common = (boxes) => {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < boxes.length; i++) {
      const B = boxes[i];
      minX = Math.min(minX, B.minX);
      minY = Math.min(minY, B.minY);
      maxX = Math.max(maxX, B.maxX);
      maxY = Math.max(maxY, B.maxY);
    }
    return new Box2d(minX, minY, maxX - minX, maxY - minY);
  };
  static Sides = (A, inset = 0) => {
    const { corners } = A;
    if (inset) {
    }
    return [
      [corners[0], corners[1]],
      [corners[1], corners[2]],
      [corners[2], corners[3]],
      [corners[3], corners[0]]
    ];
  };
  static Resize(box, handle, dx, dy, isAspectRatioLocked = false) {
    const { minX: a0x, minY: a0y, maxX: a1x, maxY: a1y } = box;
    let { minX: b0x, minY: b0y, maxX: b1x, maxY: b1y } = box;
    switch (handle) {
      case "left":
      case "top_left":
      case "bottom_left": {
        b0x += dx;
        break;
      }
      case "right":
      case "top_right":
      case "bottom_right": {
        b1x += dx;
        break;
      }
    }
    switch (handle) {
      case "top":
      case "top_left":
      case "top_right": {
        b0y += dy;
        break;
      }
      case "bottom":
      case "bottom_left":
      case "bottom_right": {
        b1y += dy;
        break;
      }
    }
    const scaleX = (b1x - b0x) / (a1x - a0x);
    const scaleY = (b1y - b0y) / (a1y - a0y);
    const flipX = scaleX < 0;
    const flipY = scaleY < 0;
    if (isAspectRatioLocked) {
      const aspectRatio = (a1x - a0x) / (a1y - a0y);
      const bw = Math.abs(b1x - b0x);
      const bh = Math.abs(b1y - b0y);
      const tw = bw * (scaleY < 0 ? 1 : -1) * (1 / aspectRatio);
      const th = bh * (scaleX < 0 ? 1 : -1) * aspectRatio;
      const isTall = aspectRatio < bw / bh;
      switch (handle) {
        case "top_left": {
          if (isTall)
            b0y = b1y + tw;
          else
            b0x = b1x + th;
          break;
        }
        case "top_right": {
          if (isTall)
            b0y = b1y + tw;
          else
            b1x = b0x - th;
          break;
        }
        case "bottom_right": {
          if (isTall)
            b1y = b0y - tw;
          else
            b1x = b0x - th;
          break;
        }
        case "bottom_left": {
          if (isTall)
            b1y = b0y - tw;
          else
            b0x = b1x + th;
          break;
        }
        case "bottom":
        case "top": {
          const m = (b0x + b1x) / 2;
          const w = bh * aspectRatio;
          b0x = m - w / 2;
          b1x = m + w / 2;
          break;
        }
        case "left":
        case "right": {
          const m = (b0y + b1y) / 2;
          const h = bw / aspectRatio;
          b0y = m - h / 2;
          b1y = m + h / 2;
          break;
        }
      }
    }
    if (flipX) {
      const t = b1x;
      b1x = b0x;
      b0x = t;
    }
    if (flipY) {
      const t = b1y;
      b1y = b0y;
      b0y = t;
    }
    const final = new Box2d(b0x, b0y, Math.abs(b1x - b0x), Math.abs(b1y - b0y));
    return {
      box: final,
      scaleX: +(final.width / box.width * (scaleX > 0 ? 1 : -1)).toFixed(5),
      scaleY: +(final.height / box.height * (scaleY > 0 ? 1 : -1)).toFixed(5)
    };
  }
  equals(other) {
    return Box2d.Equals(this, other);
  }
  static Equals(a, b) {
    return b.x === a.x && b.y === a.y && b.w === a.w && b.h === a.h;
  }
  zeroFix() {
    this.w = Math.max(1, this.w);
    this.h = Math.max(1, this.h);
    return this;
  }
  static ZeroFix(other) {
    return new Box2d(other.x, other.y, Math.max(1, other.w), Math.max(1, other.h));
  }
}
function flipSelectionHandleY(handle) {
  switch (handle) {
    case "top":
      return "bottom";
    case "bottom":
      return "top";
    case "top_left":
      return "bottom_left";
    case "top_right":
      return "bottom_right";
    case "bottom_left":
      return "top_left";
    case "bottom_right":
      return "top_right";
    default:
      return handle;
  }
}
function flipSelectionHandleX(handle) {
  switch (handle) {
    case "left":
      return "right";
    case "right":
      return "left";
    case "top_left":
      return "top_right";
    case "top_right":
      return "top_left";
    case "bottom_left":
      return "bottom_right";
    case "bottom_right":
      return "bottom_left";
    default:
      return handle;
  }
}
const ORDERED_SELECTION_HANDLES = [
  "top",
  "top_right",
  "right",
  "bottom_right",
  "bottom",
  "bottom_left",
  "left",
  "top_left"
];
function rotateSelectionHandle(handle, rotation) {
  rotation = rotation % import_utils.PI2;
  const numSteps = Math.round(rotation / (import_utils.PI / 4));
  const currentIndex = ORDERED_SELECTION_HANDLES.indexOf(handle);
  return ORDERED_SELECTION_HANDLES[(currentIndex + numSteps) % ORDERED_SELECTION_HANDLES.length];
}
function isSelectionCorner(selection) {
  return selection === "top_left" || selection === "top_right" || selection === "bottom_right" || selection === "bottom_left";
}
const ROTATE_CORNER_TO_SELECTION_CORNER = {
  top_left_rotate: "top_left",
  top_right_rotate: "top_right",
  bottom_right_rotate: "bottom_right",
  bottom_left_rotate: "bottom_left",
  mobile_rotate: "top_left"
};
//# sourceMappingURL=Box2d.js.map