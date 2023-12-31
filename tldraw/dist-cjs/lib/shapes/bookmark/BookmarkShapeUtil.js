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
var BookmarkShapeUtil_exports = {};
__export(BookmarkShapeUtil_exports, {
  BookmarkShapeUtil: () => BookmarkShapeUtil,
  getHumanReadableAddress: () => getHumanReadableAddress
});
module.exports = __toCommonJS(BookmarkShapeUtil_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_rotated_box_shadow = require("../../utils/rotated-box-shadow");
var import_text = require("../../utils/text");
var import_HyperlinkButton = require("../shared/HyperlinkButton");
class BookmarkShapeUtil extends import_editor.BaseBoxShapeUtil {
  static type = "bookmark";
  static props = import_editor.bookmarkShapeProps;
  static migrations = import_editor.bookmarkShapeMigrations;
  canResize = () => false;
  hideSelectionBoundsFg = () => true;
  getDefaultProps() {
    return {
      url: "",
      w: 300,
      h: 320,
      assetId: null
    };
  }
  component(shape) {
    const asset = shape.props.assetId ? this.editor.getAsset(shape.props.assetId) : null;
    const pageRotation = this.editor.getShapePageTransform(shape).rotation();
    const address = getHumanReadableAddress(shape);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_editor.HTMLContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "tl-bookmark__container",
        style: {
          boxShadow: (0, import_rotated_box_shadow.getRotatedBoxShadow)(pageRotation)
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tl-bookmark__image_container", children: [
            asset?.props.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "img",
              {
                className: "tl-bookmark__image",
                draggable: false,
                src: asset?.props.image,
                alt: asset?.props.title || ""
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tl-bookmark__placeholder" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_HyperlinkButton.HyperlinkButton, { url: shape.props.url, zoomLevel: this.editor.zoomLevel })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tl-bookmark__copy_container", children: [
            asset?.props.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "tl-bookmark__heading", children: (0, import_text.truncateStringWithEllipsis)(asset?.props.title || "", 54) }),
            asset?.props.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "tl-bookmark__description", children: (0, import_text.truncateStringWithEllipsis)(asset?.props.description || "", 128) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "a",
              {
                className: "tl-bookmark__link",
                href: shape.props.url || "",
                target: "_blank",
                rel: "noopener noreferrer",
                onPointerDown: import_editor.stopEventPropagation,
                onPointerUp: import_editor.stopEventPropagation,
                onClick: import_editor.stopEventPropagation,
                children: (0, import_text.truncateStringWithEllipsis)(address, 45)
              }
            )
          ] })
        ]
      }
    ) });
  }
  indicator(shape) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "rect",
      {
        width: (0, import_editor.toDomPrecision)(shape.props.w),
        height: (0, import_editor.toDomPrecision)(shape.props.h),
        rx: "8",
        ry: "8"
      }
    );
  }
  onBeforeCreate = (shape) => {
    updateBookmarkAssetOnUrlChange(this.editor, shape);
  };
  onBeforeUpdate = (prev, shape) => {
    if (prev.props.url !== shape.props.url) {
      if (!(0, import_editor.isValidUrl)(shape.props.url)) {
        return { ...shape, props: { ...shape.props, url: prev.props.url } };
      } else {
        updateBookmarkAssetOnUrlChange(this.editor, shape);
      }
    }
  };
}
const getHumanReadableAddress = (shape) => {
  try {
    const url = new URL(shape.props.url);
    const path = url.pathname.replace(/\/*$/, "");
    return `${url.hostname}${path}`;
  } catch (e) {
    return shape.props.url;
  }
};
function updateBookmarkAssetOnUrlChange(editor, shape) {
  const { url } = shape.props;
  const assetId = import_editor.AssetRecordType.createId((0, import_editor.getHashForString)(url));
  if (editor.getAsset(assetId)) {
    if (shape.props.assetId !== assetId) {
      editor.updateShapes([
        {
          id: shape.id,
          type: shape.type,
          props: { assetId }
        }
      ]);
    }
  } else {
    editor.updateShapes([
      {
        id: shape.id,
        type: shape.type,
        props: { assetId: null }
      }
    ]);
    createBookmarkAssetOnUrlChange(editor, shape);
  }
}
const createBookmarkAssetOnUrlChange = (0, import_editor.debounce)(async (editor, shape) => {
  const { url } = shape.props;
  const asset = await editor.getAssetForExternalContent({ type: "url", url });
  if (!asset) {
    return;
  }
  editor.batch(() => {
    editor.createAssets([asset]);
    editor.updateShapes([
      {
        id: shape.id,
        type: shape.type,
        props: { assetId: asset.id }
      }
    ]);
  });
}, 500);
//# sourceMappingURL=BookmarkShapeUtil.js.map
