import { jsx, jsxs } from "react/jsx-runtime";
import {
  AssetRecordType,
  BaseBoxShapeUtil,
  HTMLContainer,
  bookmarkShapeMigrations,
  bookmarkShapeProps,
  debounce,
  getHashForString,
  isValidUrl,
  stopEventPropagation,
  toDomPrecision
} from "@tldraw/editor";
import { getRotatedBoxShadow } from "../../utils/rotated-box-shadow.mjs";
import { truncateStringWithEllipsis } from "../../utils/text.mjs";
import { HyperlinkButton } from "../shared/HyperlinkButton.mjs";
class BookmarkShapeUtil extends BaseBoxShapeUtil {
  static type = "bookmark";
  static props = bookmarkShapeProps;
  static migrations = bookmarkShapeMigrations;
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
    return /* @__PURE__ */ jsx(HTMLContainer, { children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: "tl-bookmark__container",
        style: {
          boxShadow: getRotatedBoxShadow(pageRotation)
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "tl-bookmark__image_container", children: [
            asset?.props.image ? /* @__PURE__ */ jsx(
              "img",
              {
                className: "tl-bookmark__image",
                draggable: false,
                src: asset?.props.image,
                alt: asset?.props.title || ""
              }
            ) : /* @__PURE__ */ jsx("div", { className: "tl-bookmark__placeholder" }),
            /* @__PURE__ */ jsx(HyperlinkButton, { url: shape.props.url, zoomLevel: this.editor.zoomLevel })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "tl-bookmark__copy_container", children: [
            asset?.props.title && /* @__PURE__ */ jsx("h2", { className: "tl-bookmark__heading", children: truncateStringWithEllipsis(asset?.props.title || "", 54) }),
            asset?.props.description && /* @__PURE__ */ jsx("p", { className: "tl-bookmark__description", children: truncateStringWithEllipsis(asset?.props.description || "", 128) }),
            /* @__PURE__ */ jsx(
              "a",
              {
                className: "tl-bookmark__link",
                href: shape.props.url || "",
                target: "_blank",
                rel: "noopener noreferrer",
                onPointerDown: stopEventPropagation,
                onPointerUp: stopEventPropagation,
                onClick: stopEventPropagation,
                children: truncateStringWithEllipsis(address, 45)
              }
            )
          ] })
        ]
      }
    ) });
  }
  indicator(shape) {
    return /* @__PURE__ */ jsx(
      "rect",
      {
        width: toDomPrecision(shape.props.w),
        height: toDomPrecision(shape.props.h),
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
      if (!isValidUrl(shape.props.url)) {
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
  const assetId = AssetRecordType.createId(getHashForString(url));
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
const createBookmarkAssetOnUrlChange = debounce(async (editor, shape) => {
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
export {
  BookmarkShapeUtil,
  getHumanReadableAddress
};
//# sourceMappingURL=BookmarkShapeUtil.mjs.map
