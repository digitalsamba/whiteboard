"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var VideoShapeUtil_exports = {};
__export(VideoShapeUtil_exports, {
  VideoShapeUtil: () => VideoShapeUtil
});
module.exports = __toCommonJS(VideoShapeUtil_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_react = __toESM(require("react"));
var import_HyperlinkButton = require("../shared/HyperlinkButton");
var import_usePrefersReducedMotion = require("../shared/usePrefersReducedMotion");
class VideoShapeUtil extends import_editor.BaseBoxShapeUtil {
  static type = "video";
  static props = import_editor.videoShapeProps;
  static migrations = import_editor.videoShapeMigrations;
  canEdit = () => true;
  isAspectRatioLocked = () => true;
  getDefaultProps() {
    return {
      w: 100,
      h: 100,
      assetId: null,
      time: 0,
      playing: true,
      url: ""
    };
  }
  component(shape) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TLVideoUtilComponent, { shape, videoUtil: this });
  }
  indicator(shape) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: (0, import_editor.toDomPrecision)(shape.props.w), height: (0, import_editor.toDomPrecision)(shape.props.h) });
  }
  toSvg(shape) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttributeNS("http://www.w3.org/1999/xlink", "href", serializeVideo(shape.id));
    image.setAttribute("width", shape.props.w.toString());
    image.setAttribute("height", shape.props.h.toString());
    g.appendChild(image);
    return g;
  }
}
function serializeVideo(id) {
  const splitId = id.split(":")[1];
  const video = document.querySelector(`.tl-video-shape-${splitId}`);
  if (video) {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    return canvas.toDataURL("image/png");
  } else
    throw new Error("Video with id " + splitId + " not found");
}
const TLVideoUtilComponent = (0, import_editor.track)(function TLVideoUtilComponent2(props) {
  const { shape, videoUtil } = props;
  const showControls = videoUtil.editor.getShapeGeometry(shape).bounds.w * videoUtil.editor.zoomLevel >= 110;
  const asset = shape.props.assetId ? videoUtil.editor.getAsset(shape.props.assetId) : null;
  const { time, playing } = shape.props;
  const isEditing = (0, import_editor.useIsEditing)(shape.id);
  const prefersReducedMotion = (0, import_usePrefersReducedMotion.usePrefersReducedMotion)();
  const rVideo = import_react.default.useRef(null);
  const handlePlay = import_react.default.useCallback(
    (e) => {
      const video = e.currentTarget;
      videoUtil.editor.updateShapes([
        {
          type: "video",
          id: shape.id,
          props: {
            playing: true,
            time: video.currentTime
          }
        }
      ]);
    },
    [shape.id, videoUtil.editor]
  );
  const handlePause = import_react.default.useCallback(
    (e) => {
      const video = e.currentTarget;
      videoUtil.editor.updateShapes([
        {
          type: "video",
          id: shape.id,
          props: {
            playing: false,
            time: video.currentTime
          }
        }
      ]);
    },
    [shape.id, videoUtil.editor]
  );
  const handleSetCurrentTime = import_react.default.useCallback(
    (e) => {
      const video = e.currentTarget;
      if (isEditing) {
        videoUtil.editor.updateShapes([
          {
            type: "video",
            id: shape.id,
            props: {
              time: video.currentTime
            }
          }
        ]);
      }
    },
    [isEditing, shape.id, videoUtil.editor]
  );
  const [isLoaded, setIsLoaded] = import_react.default.useState(false);
  const handleLoadedData = import_react.default.useCallback(
    (e) => {
      const video = e.currentTarget;
      if (time !== video.currentTime) {
        video.currentTime = time;
      }
      if (!playing) {
        video.pause();
      }
      setIsLoaded(true);
    },
    [playing, time]
  );
  import_react.default.useEffect(() => {
    const video = rVideo.current;
    if (!video)
      return;
    if (isLoaded && !isEditing && time !== video.currentTime) {
      video.currentTime = time;
    }
    if (isEditing) {
      if (document.activeElement !== video) {
        video.focus();
      }
    }
  }, [isEditing, isLoaded, time]);
  import_react.default.useEffect(() => {
    if (prefersReducedMotion) {
      const video = rVideo.current;
      video.pause();
      video.currentTime = 0;
    }
  }, [rVideo, prefersReducedMotion]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_editor.HTMLContainer, { id: shape.id, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tl-counter-scaled", children: asset?.props.src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "video",
      {
        ref: rVideo,
        style: isEditing ? { pointerEvents: "all" } : void 0,
        className: `tl-video tl-video-shape-${shape.id.split(":")[1]}`,
        width: "100%",
        height: "100%",
        draggable: false,
        playsInline: true,
        autoPlay: true,
        muted: true,
        loop: true,
        disableRemotePlayback: true,
        disablePictureInPicture: true,
        controls: isEditing && showControls,
        onPlay: handlePlay,
        onPause: handlePause,
        onTimeUpdate: handleSetCurrentTime,
        onLoadedData: handleLoadedData,
        hidden: !isLoaded,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", { src: asset.props.src })
      }
    ) : null }) }),
    "url" in shape.props && shape.props.url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_HyperlinkButton.HyperlinkButton, { url: shape.props.url, zoomLevel: videoUtil.editor.zoomLevel })
  ] });
});
//# sourceMappingURL=VideoShapeUtil.js.map
