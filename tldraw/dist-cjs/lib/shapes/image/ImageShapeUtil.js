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
var ImageShapeUtil_exports = {};
__export(ImageShapeUtil_exports, {
  ImageShapeUtil: () => ImageShapeUtil
});
module.exports = __toCommonJS(ImageShapeUtil_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_react = require("react");
var import_HyperlinkButton = require("../shared/HyperlinkButton");
var import_usePrefersReducedMotion = require("../shared/usePrefersReducedMotion");
const loadImage = async (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image"));
    image.crossOrigin = "anonymous";
    image.src = url;
  });
};
const getStateFrame = async (url) => {
  const image = await loadImage(url);
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  if (!ctx)
    return;
  ctx.drawImage(image, 0, 0);
  return canvas.toDataURL();
};
async function getDataURIFromURL(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
class ImageShapeUtil extends import_editor.BaseBoxShapeUtil {
  static type = "image";
  static props = import_editor.imageShapeProps;
  static migrations = import_editor.imageShapeMigrations;
  isAspectRatioLocked = () => true;
  canCrop = () => true;
  getDefaultProps() {
    return {
      w: 100,
      h: 100,
      assetId: null,
      playing: true,
      url: "",
      crop: null
    };
  }
  component(shape) {
    const containerStyle = getContainerStyle(shape);
    const isCropping = (0, import_editor.useIsCropping)(shape.id);
    const prefersReducedMotion = (0, import_usePrefersReducedMotion.usePrefersReducedMotion)();
    const [staticFrameSrc, setStaticFrameSrc] = (0, import_react.useState)("");
    const asset = shape.props.assetId ? this.editor.getAsset(shape.props.assetId) : void 0;
    if (asset?.type === "bookmark") {
      throw Error("Bookmark assets can't be rendered as images");
    }
    const isSelected = (0, import_editor.useValue)(
      "onlySelectedShape",
      () => shape.id === this.editor.onlySelectedShape?.id,
      [this.editor]
    );
    const showCropPreview = isSelected && isCropping && this.editor.isInAny("select.crop", "select.cropping", "select.pointing_crop_handle");
    const reduceMotion = prefersReducedMotion && (asset?.props.mimeType?.includes("video") || asset?.props.mimeType?.includes("gif"));
    (0, import_react.useEffect)(() => {
      if (asset?.props.src && "mimeType" in asset.props && asset?.props.mimeType === "image/gif") {
        let cancelled = false;
        const run = async () => {
          const newStaticFrame = await getStateFrame(asset.props.src);
          if (cancelled)
            return;
          if (newStaticFrame) {
            setStaticFrameSrc(newStaticFrame);
          }
        };
        run();
        return () => {
          cancelled = true;
        };
      }
    }, [prefersReducedMotion, asset?.props]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      asset?.props.src && showCropPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: containerStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: `tl-image tl-image-${shape.id}-crop`,
          style: {
            opacity: 0.1,
            backgroundImage: `url(${!shape.props.playing || reduceMotion ? staticFrameSrc : asset.props.src})`
          },
          draggable: false
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_editor.HTMLContainer, { id: shape.id, style: { overflow: "hidden" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tl-image-container", style: containerStyle, children: [
        asset?.props.src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: `tl-image tl-image-${shape.id}`,
            style: {
              backgroundImage: `url(${!shape.props.playing || reduceMotion ? staticFrameSrc : asset.props.src})`
            },
            draggable: false
          }
        ) : null,
        asset?.props.isAnimated && !shape.props.playing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tl-image__tg", children: "GIF" })
      ] }) }),
      "url" in shape.props && shape.props.url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_HyperlinkButton.HyperlinkButton, { url: shape.props.url, zoomLevel: this.editor.zoomLevel })
    ] });
  }
  indicator(shape) {
    const isCropping = (0, import_editor.useIsCropping)(shape.id);
    if (isCropping) {
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: (0, import_editor.toDomPrecision)(shape.props.w), height: (0, import_editor.toDomPrecision)(shape.props.h) });
  }
  async toSvg(shape) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const asset = shape.props.assetId ? this.editor.getAsset(shape.props.assetId) : null;
    let src = asset?.props.src || "";
    if (src && src.startsWith("http")) {
      src = await getDataURIFromURL(src) || "";
    }
    const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttributeNS("http://www.w3.org/1999/xlink", "href", src);
    const containerStyle = getContainerStyle(shape);
    const crop = shape.props.crop;
    if (containerStyle && crop) {
      const { transform, width, height } = containerStyle;
      const points = [
        new import_editor.Vec2d(crop.topLeft.x * width, crop.topLeft.y * height),
        new import_editor.Vec2d(crop.bottomRight.x * width, crop.topLeft.y * height),
        new import_editor.Vec2d(crop.bottomRight.x * width, crop.bottomRight.y * height),
        new import_editor.Vec2d(crop.topLeft.x * width, crop.bottomRight.y * height)
      ];
      const innerElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
      innerElement.style.clipPath = `polygon(${points.map((p) => `${p.x}px ${p.y}px`).join(",")})`;
      image.setAttribute("width", width.toString());
      image.setAttribute("height", height.toString());
      image.style.transform = transform;
      innerElement.appendChild(image);
      g.appendChild(innerElement);
    } else {
      image.setAttribute("width", shape.props.w.toString());
      image.setAttribute("height", shape.props.h.toString());
      g.appendChild(image);
    }
    return g;
  }
  onDoubleClick = (shape) => {
    const asset = shape.props.assetId ? this.editor.getAsset(shape.props.assetId) : void 0;
    if (!asset)
      return;
    const canPlay = asset.props.src && "mimeType" in asset.props && asset.props.mimeType === "image/gif";
    if (!canPlay)
      return;
    this.editor.updateShapes([
      {
        type: "image",
        id: shape.id,
        props: {
          playing: !shape.props.playing
        }
      }
    ]);
  };
  onDoubleClickEdge = (shape) => {
    const props = shape.props;
    if (!props)
      return;
    if (this.editor.croppingShapeId !== shape.id) {
      return;
    }
    const crop = (0, import_editor.deepCopy)(props.crop) || {
      topLeft: { x: 0, y: 0 },
      bottomRight: { x: 1, y: 1 }
    };
    const w = 1 / (crop.bottomRight.x - crop.topLeft.x) * shape.props.w;
    const h = 1 / (crop.bottomRight.y - crop.topLeft.y) * shape.props.h;
    const pointDelta = new import_editor.Vec2d(crop.topLeft.x * w, crop.topLeft.y * h).rot(shape.rotation);
    const partial = {
      id: shape.id,
      type: shape.type,
      x: shape.x - pointDelta.x,
      y: shape.y - pointDelta.y,
      props: {
        crop: {
          topLeft: { x: 0, y: 0 },
          bottomRight: { x: 1, y: 1 }
        },
        w,
        h
      }
    };
    this.editor.updateShapes([partial]);
  };
}
function getContainerStyle(shape) {
  const crop = shape.props.crop;
  const topLeft = crop?.topLeft;
  if (!topLeft)
    return;
  const w = 1 / (crop.bottomRight.x - crop.topLeft.x) * shape.props.w;
  const h = 1 / (crop.bottomRight.y - crop.topLeft.y) * shape.props.h;
  const offsetX = -topLeft.x * w;
  const offsetY = -topLeft.y * h;
  return {
    transform: `translate(${offsetX}px, ${offsetY}px)`,
    width: w,
    height: h
  };
}
//# sourceMappingURL=ImageShapeUtil.js.map
