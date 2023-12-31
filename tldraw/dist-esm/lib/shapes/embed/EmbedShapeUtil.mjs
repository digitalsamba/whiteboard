import { jsx } from "react/jsx-runtime";
import {
  BaseBoxShapeUtil,
  HTMLContainer,
  embedShapeMigrations,
  embedShapePermissionDefaults,
  embedShapeProps,
  toDomPrecision,
  useIsEditing,
  useValue
} from "@tldraw/editor";
import { useMemo } from "react";
import { getEmbedInfo, getEmbedInfoUnsafely } from "../../utils/embeds.mjs";
import { getRotatedBoxShadow } from "../../utils/rotated-box-shadow.mjs";
import { resizeBox } from "../shared/resizeBox.mjs";
const getSandboxPermissions = (permissions) => {
  return Object.entries(permissions).filter(([_perm, isEnabled]) => isEnabled).map(([perm]) => perm).join(" ");
};
class EmbedShapeUtil extends BaseBoxShapeUtil {
  static type = "embed";
  static props = embedShapeProps;
  static migrations = embedShapeMigrations;
  hideSelectionBoundsFg = (shape) => !this.canResize(shape);
  canEdit = () => true;
  canUnmount = (shape) => {
    return !!getEmbedInfo(shape.props.url)?.definition?.canUnmount;
  };
  canResize = (shape) => {
    return !!getEmbedInfo(shape.props.url)?.definition?.doesResize;
  };
  getDefaultProps() {
    return {
      w: 300,
      h: 300,
      url: ""
    };
  }
  isAspectRatioLocked = (shape) => {
    const embedInfo = getEmbedInfo(shape.props.url);
    return embedInfo?.definition.isAspectRatioLocked ?? false;
  };
  onResize = (shape, info) => {
    const isAspectRatioLocked = this.isAspectRatioLocked(shape);
    const embedInfo = getEmbedInfo(shape.props.url);
    let minWidth = embedInfo?.definition.minWidth ?? 200;
    let minHeight = embedInfo?.definition.minHeight ?? 200;
    if (isAspectRatioLocked) {
      const aspectRatio = shape.props.w / shape.props.h;
      if (aspectRatio > 1) {
        minWidth *= aspectRatio;
      } else {
        minHeight /= aspectRatio;
      }
    }
    return resizeBox(shape, info, { minWidth, minHeight });
  };
  component(shape) {
    const { w, h, url } = shape.props;
    const isEditing = useIsEditing(shape.id);
    const embedInfo = useMemo(() => getEmbedInfoUnsafely(url), [url]);
    const isHoveringWhileEditingSameShape = useValue(
      "is hovering",
      () => {
        const { editingShapeId, hoveredShapeId } = this.editor.currentPageState;
        if (editingShapeId && hoveredShapeId !== editingShapeId) {
          const editingShape = this.editor.getShape(editingShapeId);
          if (editingShape && this.editor.isShapeOfType(editingShape, "embed")) {
            return true;
          }
        }
        return false;
      },
      []
    );
    const pageRotation = this.editor.getShapePageTransform(shape).rotation();
    const isInteractive = isEditing || isHoveringWhileEditingSameShape;
    if (embedInfo?.definition.type === "github_gist") {
      const idFromGistUrl = embedInfo.url.split("/").pop();
      if (!idFromGistUrl)
        throw Error("No gist id!");
      return /* @__PURE__ */ jsx(HTMLContainer, { className: "tl-embed-container", id: shape.id, children: /* @__PURE__ */ jsx(
        Gist,
        {
          id: idFromGistUrl,
          width: toDomPrecision(w),
          height: toDomPrecision(h),
          isInteractive,
          pageRotation
        }
      ) });
    }
    const sandbox = getSandboxPermissions({
      ...embedShapePermissionDefaults,
      ...(embedInfo?.definition.overridePermissions ?? {})
    });
    return /* @__PURE__ */ jsx(HTMLContainer, { className: "tl-embed-container", id: shape.id, children: embedInfo?.definition ? /* @__PURE__ */ jsx(
      "iframe",
      {
        className: `tl-embed tl-embed-${shape.id}`,
        sandbox,
        src: embedInfo.embedUrl,
        width: toDomPrecision(w),
        height: toDomPrecision(h),
        draggable: false,
        frameBorder: "0",
        referrerPolicy: "no-referrer-when-downgrade",
        style: {
          border: 0,
          pointerEvents: isInteractive ? "auto" : "none",
          // Fix for safari <https://stackoverflow.com/a/49150908>
          zIndex: isInteractive ? "" : "-1",
          boxShadow: getRotatedBoxShadow(pageRotation),
          borderRadius: embedInfo?.definition.overrideOutlineRadius ?? 8,
          background: embedInfo?.definition.backgroundColor
        }
      }
    ) : null });
  }
  indicator(shape) {
    const embedInfo = useMemo(() => getEmbedInfo(shape.props.url), [shape.props.url]);
    return /* @__PURE__ */ jsx(
      "rect",
      {
        width: toDomPrecision(shape.props.w),
        height: toDomPrecision(shape.props.h),
        rx: embedInfo?.definition.overrideOutlineRadius ?? 8,
        ry: embedInfo?.definition.overrideOutlineRadius ?? 8
      }
    );
  }
}
function Gist({
  id,
  file,
  isInteractive,
  width,
  height,
  style,
  pageRotation
}) {
  return /* @__PURE__ */ jsx(
    "iframe",
    {
      className: "tl-embed",
      draggable: false,
      width: toDomPrecision(width),
      height: toDomPrecision(height),
      frameBorder: "0",
      scrolling: "no",
      seamless: true,
      referrerPolicy: "no-referrer-when-downgrade",
      style: {
        ...style,
        pointerEvents: isInteractive ? "all" : "none",
        // Fix for safari <https://stackoverflow.com/a/49150908>
        zIndex: isInteractive ? "" : "-1",
        boxShadow: getRotatedBoxShadow(pageRotation)
      },
      srcDoc: `
			<html>
				<head>
					<base target="_blank">
				</head>
				<body>
					<script src=${`https://gist.github.com/${id}.js${file ? `?file=${file}` : ""}`}></script>
					<style type="text/css">
						* { margin: 0px; }
						table { height: 100%; background-color: red; }
						.gist { background-color: none; height: 100%;  }
						.gist .gist-file { height: calc(100vh - 2px); padding: 0px; display: grid; grid-template-rows: 1fr auto; }
					</style>
				</body>
			</html>`
    }
  );
}
export {
  EmbedShapeUtil
};
//# sourceMappingURL=EmbedShapeUtil.mjs.map
