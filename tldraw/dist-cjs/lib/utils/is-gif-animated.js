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
var is_gif_animated_exports = {};
__export(is_gif_animated_exports, {
  isAnimated: () => isAnimated,
  isGIF: () => isGIF
});
module.exports = __toCommonJS(is_gif_animated_exports);
function getDataBlocksLength(buffer, offset) {
  let length = 0;
  while (buffer[offset + length]) {
    length += buffer[offset + length] + 1;
  }
  return length + 1;
}
function isGIF(buffer) {
  const enc = new TextDecoder("ascii");
  const header = enc.decode(buffer.slice(0, 3));
  return header === "GIF";
}
function isAnimated(buffer) {
  const view = new Uint8Array(buffer);
  let hasColorTable, colorTableSize;
  let offset = 0;
  let imagesCount = 0;
  if (!isGIF(buffer)) {
    return false;
  }
  hasColorTable = view[10] & 128;
  colorTableSize = view[10] & 7;
  offset += 6;
  offset += 7;
  offset += hasColorTable ? 3 * Math.pow(2, colorTableSize + 1) : 0;
  while (imagesCount < 2 && offset < view.length) {
    switch (view[offset]) {
      case 44:
        imagesCount += 1;
        hasColorTable = view[offset + 9] & 128;
        colorTableSize = view[offset + 9] & 7;
        offset += 10;
        offset += hasColorTable ? 3 * Math.pow(2, colorTableSize + 1) : 0;
        offset += getDataBlocksLength(view, offset + 1) + 1;
        break;
      case 33:
        offset += 2;
        offset += getDataBlocksLength(view, offset);
        break;
      case 59:
        offset = view.length;
        break;
      default:
        offset = view.length;
        break;
    }
  }
  return imagesCount > 1;
}
//# sourceMappingURL=is-gif-animated.js.map
