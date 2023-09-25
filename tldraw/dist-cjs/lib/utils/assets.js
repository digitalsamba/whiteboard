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
var assets_exports = {};
__export(assets_exports, {
  DEFAULT_ACCEPTED_IMG_TYPE: () => DEFAULT_ACCEPTED_IMG_TYPE,
  DEFAULT_ACCEPTED_VID_TYPE: () => DEFAULT_ACCEPTED_VID_TYPE,
  containBoxSize: () => containBoxSize,
  getResizedImageDataUrl: () => getResizedImageDataUrl,
  isGifAnimated: () => isGifAnimated
});
module.exports = __toCommonJS(assets_exports);
var import_is_gif_animated = require("./is-gif-animated");
function containBoxSize(originalSize, containBoxSize2) {
  const overByXScale = originalSize.w / containBoxSize2.w;
  const overByYScale = originalSize.h / containBoxSize2.h;
  if (overByXScale <= 1 && overByYScale <= 1) {
    return originalSize;
  } else if (overByXScale > overByYScale) {
    return {
      w: originalSize.w / overByXScale,
      h: originalSize.h / overByXScale
    };
  } else {
    return {
      w: originalSize.w / overByYScale,
      h: originalSize.h / overByYScale
    };
  }
}
async function getResizedImageDataUrl(dataURLForImage, width, height) {
  return await new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx)
        return;
      canvas.width = width * 2;
      canvas.height = height * 2;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const newDataURL = canvas.toDataURL();
      resolve(newDataURL);
    };
    img.crossOrigin = "anonymous";
    img.src = dataURLForImage;
  });
}
const DEFAULT_ACCEPTED_IMG_TYPE = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
const DEFAULT_ACCEPTED_VID_TYPE = ["video/mp4", "video/quicktime"];
async function isGifAnimated(file) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      resolve(reader.result ? (0, import_is_gif_animated.isAnimated)(reader.result) : false);
    };
    reader.readAsArrayBuffer(file);
  });
}
//# sourceMappingURL=assets.js.map
