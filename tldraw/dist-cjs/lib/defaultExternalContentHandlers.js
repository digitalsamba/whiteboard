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
var defaultExternalContentHandlers_exports = {};
__export(defaultExternalContentHandlers_exports, {
  createShapesForAssets: () => createShapesForAssets,
  registerDefaultExternalContentHandlers: () => registerDefaultExternalContentHandlers
});
module.exports = __toCommonJS(defaultExternalContentHandlers_exports);
var import_editor = require("@tldraw/editor");
var import_default_shape_constants = require("./shapes/shared/default-shape-constants");
var import_assets = require("./utils/assets");
var import_embeds = require("./utils/embeds");
var import_text = require("./utils/text");
function registerDefaultExternalContentHandlers(editor, {
  maxImageDimension,
  maxAssetSize,
  acceptedImageMimeTypes,
  acceptedVideoMimeTypes
}) {
  editor.registerExternalAssetHandler("file", async ({ file }) => {
    return await new Promise((resolve, reject) => {
      if (!acceptedImageMimeTypes.includes(file.type) && !acceptedVideoMimeTypes.includes(file.type)) {
        console.warn(`File type not allowed: ${file.type}`);
        reject();
      }
      if (file.size > maxAssetSize) {
        console.warn(
          `File size too big: ${(file.size / 1024).toFixed()}kb > ${(maxAssetSize / 1024).toFixed()}kb`
        );
        reject();
      }
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = async () => {
        let dataUrl = reader.result;
        if (file.type === "video/quicktime" && dataUrl.includes("video/quicktime")) {
          dataUrl = dataUrl.replace("video/quicktime", "video/mp4");
        }
        const isImageType = acceptedImageMimeTypes.includes(file.type);
        let size;
        let isAnimated;
        if (isImageType) {
          size = await import_editor.MediaHelpers.getImageSizeFromSrc(dataUrl);
          isAnimated = file.type === "image/gif" && await (0, import_assets.isGifAnimated)(file);
        } else {
          isAnimated = true;
          size = await import_editor.MediaHelpers.getVideoSizeFromSrc(dataUrl);
        }
        if (isFinite(maxImageDimension)) {
          const resizedSize = (0, import_assets.containBoxSize)(size, { w: maxImageDimension, h: maxImageDimension });
          if (size !== resizedSize && (file.type === "image/jpeg" || file.type === "image/png")) {
            dataUrl = await (0, import_assets.getResizedImageDataUrl)(dataUrl, size.w, size.h);
          }
          size = resizedSize;
        }
        const assetId = import_editor.AssetRecordType.createId((0, import_editor.getHashForString)(dataUrl));
        const asset = import_editor.AssetRecordType.create({
          id: assetId,
          type: isImageType ? "image" : "video",
          typeName: "asset",
          props: {
            name: file.name,
            src: dataUrl,
            w: size.w,
            h: size.h,
            mimeType: file.type,
            isAnimated
          }
        });
        resolve(asset);
      };
      reader.readAsDataURL(file);
    });
  });
  editor.registerExternalAssetHandler("url", async ({ url }) => {
    let meta;
    try {
      const resp = await fetch(url, { method: "GET", mode: "no-cors" });
      const html = await resp.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      meta = {
        image: doc.head.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "",
        title: doc.head.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? (0, import_text.truncateStringWithEllipsis)(url, 32),
        description: doc.head.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? ""
      };
    } catch (error) {
      console.error(error);
      meta = { image: "", title: (0, import_text.truncateStringWithEllipsis)(url, 32), description: "" };
    }
    return {
      id: import_editor.AssetRecordType.createId((0, import_editor.getHashForString)(url)),
      typeName: "asset",
      type: "bookmark",
      props: {
        src: url,
        description: meta.description,
        image: meta.image,
        title: meta.title
      },
      meta: {}
    };
  });
  editor.registerExternalContentHandler("svg-text", async ({ point, text }) => {
    const position = point ?? (editor.inputs.shiftKey ? editor.inputs.currentPagePoint : editor.viewportPageCenter);
    const svg = new DOMParser().parseFromString(text, "image/svg+xml").querySelector("svg");
    if (!svg) {
      throw new Error("No <svg/> element present");
    }
    let width = parseFloat(svg.getAttribute("width") || "0");
    let height = parseFloat(svg.getAttribute("height") || "0");
    if (!(width && height)) {
      document.body.appendChild(svg);
      const box = svg.getBoundingClientRect();
      document.body.removeChild(svg);
      width = box.width;
      height = box.height;
    }
    const asset = await editor.getAssetForExternalContent({
      type: "file",
      file: new File([text], "asset.svg", { type: "image/svg+xml" })
    });
    if (!asset)
      throw Error("Could not create an asset");
    createShapesForAssets(editor, [asset], position);
  });
  editor.registerExternalContentHandler("embed", ({ point, url, embed }) => {
    const position = point ?? (editor.inputs.shiftKey ? editor.inputs.currentPagePoint : editor.viewportPageCenter);
    const { width, height } = embed;
    const id = (0, import_editor.createShapeId)();
    const shapePartial = {
      id,
      type: "embed",
      x: position.x - (width || 450) / 2,
      y: position.y - (height || 450) / 2,
      props: {
        w: width,
        h: height,
        url
      }
    };
    editor.createShapes([shapePartial]).select(id);
  });
  editor.registerExternalContentHandler("files", async ({ point, files }) => {
    const position = point ?? (editor.inputs.shiftKey ? editor.inputs.currentPagePoint : editor.viewportPageCenter);
    const pagePoint = new import_editor.Vec2d(position.x, position.y);
    const assets = [];
    await Promise.all(
      files.map(async (file, i) => {
        if (file.size > maxAssetSize) {
          console.warn(
            `File size too big: ${(file.size / 1024).toFixed()}kb > ${(maxAssetSize / 1024).toFixed()}kb`
          );
          return null;
        }
        if (!file.type) {
          throw new Error("No mime type");
        }
        if (!acceptedImageMimeTypes.concat(acceptedVideoMimeTypes).includes(file.type)) {
          console.warn(`${file.name} not loaded - Extension not allowed.`);
          return null;
        }
        try {
          const asset = await editor.getAssetForExternalContent({ type: "file", file });
          if (!asset) {
            throw Error("Could not create an asset");
          }
          assets[i] = asset;
        } catch (error) {
          console.error(error);
          return null;
        }
      })
    );
    createShapesForAssets(editor, (0, import_editor.compact)(assets), pagePoint);
  });
  editor.registerExternalContentHandler("text", async ({ point, text }) => {
    const p = point ?? (editor.inputs.shiftKey ? editor.inputs.currentPagePoint : editor.viewportPageCenter);
    const defaultProps = editor.getShapeUtil("text").getDefaultProps();
    const textToPaste = (0, import_text.cleanupText)(text);
    let w;
    let h;
    let autoSize;
    let align = "middle";
    const isMultiLine = textToPaste.split("\n").length > 1;
    const isRtl = (0, import_text.isRightToLeftLanguage)(textToPaste);
    if (isMultiLine) {
      align = isMultiLine ? isRtl ? "end" : "start" : "middle";
    }
    const rawSize = editor.textMeasure.measureText(textToPaste, {
      ...import_default_shape_constants.TEXT_PROPS,
      fontFamily: import_default_shape_constants.FONT_FAMILIES[defaultProps.font],
      fontSize: import_default_shape_constants.FONT_SIZES[defaultProps.size],
      width: "fit-content"
    });
    const minWidth = Math.min(
      isMultiLine ? editor.viewportPageBounds.width * 0.9 : 920,
      Math.max(200, editor.viewportPageBounds.width * 0.9)
    );
    if (rawSize.w > minWidth) {
      const shrunkSize = editor.textMeasure.measureText(textToPaste, {
        ...import_default_shape_constants.TEXT_PROPS,
        fontFamily: import_default_shape_constants.FONT_FAMILIES[defaultProps.font],
        fontSize: import_default_shape_constants.FONT_SIZES[defaultProps.size],
        width: minWidth + "px"
      });
      w = shrunkSize.w;
      h = shrunkSize.h;
      autoSize = false;
      align = isRtl ? "end" : "start";
    } else {
      w = rawSize.w;
      h = rawSize.h;
      autoSize = true;
    }
    if (p.y - h / 2 < editor.viewportPageBounds.minY + 40) {
      p.y = editor.viewportPageBounds.minY + 40 + h / 2;
    }
    editor.createShapes([
      {
        id: (0, import_editor.createShapeId)(),
        type: "text",
        x: p.x - w / 2,
        y: p.y - h / 2,
        props: {
          text: textToPaste,
          // if the text has more than one line, align it to the left
          align,
          autoSize,
          w
        }
      }
    ]);
  });
  editor.registerExternalContentHandler("url", async ({ point, url }) => {
    const embedInfo = (0, import_embeds.getEmbedInfo)(url);
    if (embedInfo) {
      return editor.putExternalContent({
        type: "embed",
        url: embedInfo.url,
        point,
        embed: embedInfo.definition
      });
    }
    const position = point ?? (editor.inputs.shiftKey ? editor.inputs.currentPagePoint : editor.viewportPageCenter);
    const assetId = import_editor.AssetRecordType.createId((0, import_editor.getHashForString)(url));
    let asset = editor.getAsset(assetId);
    let shouldAlsoCreateAsset = false;
    if (!asset) {
      shouldAlsoCreateAsset = true;
      const bookmarkAsset = await editor.getAssetForExternalContent({ type: "url", url });
      if (!bookmarkAsset)
        throw Error("Could not create an asset");
      asset = bookmarkAsset;
    }
    editor.batch(() => {
      if (shouldAlsoCreateAsset) {
        editor.createAssets([asset]);
      }
      createShapesForAssets(editor, [asset], position);
    });
  });
}
async function createShapesForAssets(editor, assets, position) {
  if (!assets.length)
    return;
  const currentPoint = import_editor.Vec2d.From(position);
  const partials = [];
  for (const asset of assets) {
    switch (asset.type) {
      case "bookmark": {
        partials.push({
          id: (0, import_editor.createShapeId)(),
          type: "bookmark",
          x: currentPoint.x - 150,
          y: currentPoint.y - 160,
          opacity: 1,
          props: {
            assetId: asset.id,
            url: asset.props.src
          }
        });
        currentPoint.x += 300;
        break;
      }
      case "image": {
        partials.push({
          id: (0, import_editor.createShapeId)(),
          type: "image",
          x: currentPoint.x - asset.props.w / 2,
          y: currentPoint.y - asset.props.h / 2,
          opacity: 1,
          props: {
            assetId: asset.id,
            w: asset.props.w,
            h: asset.props.h
          }
        });
        currentPoint.x += asset.props.w;
        break;
      }
      case "video": {
        partials.push({
          id: (0, import_editor.createShapeId)(),
          type: "video",
          x: currentPoint.x - asset.props.w / 2,
          y: currentPoint.y - asset.props.h / 2,
          opacity: 1,
          props: {
            assetId: asset.id,
            w: asset.props.w,
            h: asset.props.h
          }
        });
        currentPoint.x += asset.props.w;
      }
    }
  }
  editor.batch(() => {
    const assetsToCreate = assets.filter((asset) => !editor.getAsset(asset.id));
    if (assetsToCreate.length) {
      editor.createAssets(assetsToCreate);
    }
    editor.createShapes(partials).select(...partials.map((p) => p.id));
    const { viewportPageBounds } = editor;
    let { selectionPageBounds } = editor;
    if (selectionPageBounds) {
      const offset = selectionPageBounds.center.sub(position);
      editor.updateShapes(
        editor.selectedShapes.map((shape) => {
          const localRotation = editor.getShapeParentTransform(shape).decompose().rotation;
          const localDelta = import_editor.Vec2d.Rot(offset, -localRotation);
          return {
            id: shape.id,
            type: shape.type,
            x: shape.x - localDelta.x,
            y: shape.y - localDelta.y
          };
        })
      );
    }
    selectionPageBounds = editor.selectionPageBounds;
    if (selectionPageBounds && !viewportPageBounds.contains(selectionPageBounds)) {
      editor.zoomToSelection();
    }
  });
}
//# sourceMappingURL=defaultExternalContentHandlers.js.map
