import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import {
  BaseBoxShapeUtil,
  HTMLContainer,
  toDomPrecision,
  track,
  useIsEditing,
  videoShapeMigrations,
  videoShapeProps
} from "@tldraw/editor";
import React from "react";
import { HyperlinkButton } from "../shared/HyperlinkButton.mjs";
import { usePrefersReducedMotion } from "../shared/usePrefersReducedMotion.mjs";
class VideoShapeUtil extends BaseBoxShapeUtil {
  static type = "video";
  static props = videoShapeProps;
  static migrations = videoShapeMigrations;
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
    return /* @__PURE__ */ jsx(TLVideoUtilComponent, { shape, videoUtil: this });
  }
  indicator(shape) {
    return /* @__PURE__ */ jsx("rect", { width: toDomPrecision(shape.props.w), height: toDomPrecision(shape.props.h) });
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
const TLVideoUtilComponent = track(function TLVideoUtilComponent2(props) {
  const { shape, videoUtil } = props;
  const showControls = videoUtil.editor.getShapeGeometry(shape).bounds.w * videoUtil.editor.zoomLevel >= 110;
  const asset = shape.props.assetId ? videoUtil.editor.getAsset(shape.props.assetId) : null;
  const { time, playing } = shape.props;
  const isEditing = useIsEditing(shape.id);
  const prefersReducedMotion = usePrefersReducedMotion();
  const rVideo = React.useRef(null);
  const handlePlay = React.useCallback(
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
  const handlePause = React.useCallback(
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
  const handleSetCurrentTime = React.useCallback(
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
  const [isLoaded, setIsLoaded] = React.useState(false);
  const handleLoadedData = React.useCallback(
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
  React.useEffect(() => {
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
  React.useEffect(() => {
    if (prefersReducedMotion) {
      const video = rVideo.current;
      video.pause();
      video.currentTime = 0;
    }
  }, [rVideo, prefersReducedMotion]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(HTMLContainer, { id: shape.id, children: /* @__PURE__ */ jsx("div", { className: "tl-counter-scaled", children: asset?.props.src ? /* @__PURE__ */ jsx(
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
        children: /* @__PURE__ */ jsx("source", { src: asset.props.src })
      }
    ) : null }) }),
    "url" in shape.props && shape.props.url && /* @__PURE__ */ jsx(HyperlinkButton, { url: shape.props.url, zoomLevel: videoUtil.editor.zoomLevel })
  ] });
});
export {
  VideoShapeUtil
};
//# sourceMappingURL=VideoShapeUtil.mjs.map
