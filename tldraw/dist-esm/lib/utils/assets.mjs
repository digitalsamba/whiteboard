import { isAnimated } from "./is-gif-animated.mjs";
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
      resolve(reader.result ? isAnimated(reader.result) : false);
    };
    reader.readAsArrayBuffer(file);
  });
}
export {
  DEFAULT_ACCEPTED_IMG_TYPE,
  DEFAULT_ACCEPTED_VID_TYPE,
  containBoxSize,
  getResizedImageDataUrl,
  isGifAnimated
};
//# sourceMappingURL=assets.mjs.map
