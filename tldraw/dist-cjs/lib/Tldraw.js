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
var Tldraw_exports = {};
__export(Tldraw_exports, {
  Tldraw: () => Tldraw
});
module.exports = __toCommonJS(Tldraw_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_react = require("react");
var import_TldrawHandles = require("./canvas/TldrawHandles");
var import_TldrawHoveredShapeIndicator = require("./canvas/TldrawHoveredShapeIndicator");
var import_TldrawScribble = require("./canvas/TldrawScribble");
var import_TldrawSelectionBackground = require("./canvas/TldrawSelectionBackground");
var import_TldrawSelectionForeground = require("./canvas/TldrawSelectionForeground");
var import_defaultExternalContentHandlers = require("./defaultExternalContentHandlers");
var import_defaultShapeTools = require("./defaultShapeTools");
var import_defaultShapeUtils = require("./defaultShapeUtils");
var import_defaultSideEffects = require("./defaultSideEffects");
var import_defaultTools = require("./defaultTools");
var import_TldrawUi = require("./ui/TldrawUi");
var import_ContextMenu = require("./ui/components/ContextMenu");
var import_assetUrls = require("./utils/assetUrls");
var import_usePreloadAssets = require("./utils/usePreloadAssets");
function Tldraw(props) {
  const {
    children,
    maxImageDimension,
    maxAssetSize,
    acceptedImageMimeTypes,
    acceptedVideoMimeTypes,
    onMount,
    ...rest
  } = props;
  const withDefaults = {
    initialState: "select",
    ...rest,
    components: (0, import_react.useMemo)(
      () => ({
        Scribble: import_TldrawScribble.TldrawScribble,
        CollaboratorScribble: import_TldrawScribble.TldrawScribble,
        SelectionForeground: import_TldrawSelectionForeground.TldrawSelectionForeground,
        SelectionBackground: import_TldrawSelectionBackground.TldrawSelectionBackground,
        Handles: import_TldrawHandles.TldrawHandles,
        HoveredShapeIndicator: import_TldrawHoveredShapeIndicator.TldrawHoveredShapeIndicator,
        ...rest.components
      }),
      [rest.components]
    ),
    shapeUtils: (0, import_react.useMemo)(
      () => [...import_defaultShapeUtils.defaultShapeUtils, ...rest.shapeUtils ?? []],
      [rest.shapeUtils]
    ),
    tools: (0, import_react.useMemo)(
      () => [...import_defaultTools.defaultTools, ...import_defaultShapeTools.defaultShapeTools, ...rest.tools ?? []],
      [rest.tools]
    )
  };
  const assets = (0, import_assetUrls.useDefaultEditorAssetsWithOverrides)(rest.assetUrls);
  const { done: preloadingComplete, error: preloadingError } = (0, import_usePreloadAssets.usePreloadAssets)(assets);
  if (preloadingError) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_editor.ErrorScreen, { children: "Could not load assets. Please refresh the page." });
  }
  if (!preloadingComplete) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_editor.LoadingScreen, { children: "Loading assets..." });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_editor.TldrawEditor, { ...withDefaults, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_TldrawUi.TldrawUi, { ...withDefaults, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ContextMenu.ContextMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_editor.Canvas, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      InsideOfEditorContext,
      {
        maxImageDimension,
        maxAssetSize,
        acceptedImageMimeTypes,
        acceptedVideoMimeTypes,
        onMount
      }
    ),
    children
  ] }) });
}
function InsideOfEditorContext({
  maxImageDimension = 1e3,
  maxAssetSize = 10 * 1024 * 1024,
  // 10mb
  acceptedImageMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"],
  acceptedVideoMimeTypes = ["video/mp4", "video/quicktime"],
  onMount
}) {
  const editor = (0, import_editor.useEditor)();
  const onMountEvent = useEvent((editor2) => {
    const unsubs = [];
    unsubs.push((0, import_defaultSideEffects.registerDefaultSideEffects)(editor2));
    (0, import_defaultExternalContentHandlers.registerDefaultExternalContentHandlers)(editor2, {
      maxImageDimension,
      maxAssetSize,
      acceptedImageMimeTypes,
      acceptedVideoMimeTypes
    });
    unsubs.push(onMount?.(editor2));
    return () => {
      unsubs.forEach((fn) => fn?.());
    };
  });
  (0, import_react.useLayoutEffect)(() => {
    if (editor)
      return onMountEvent?.(editor);
  }, [editor, onMountEvent]);
  return null;
}
function useEvent(handler) {
  const handlerRef = (0, import_react.useRef)();
  (0, import_react.useLayoutEffect)(() => {
    handlerRef.current = handler;
  });
  (0, import_react.useDebugValue)(handler);
  return (0, import_react.useCallback)((...args) => {
    const fn = handlerRef.current;
    (0, import_editor.assert)(fn, "fn does not exist");
    return fn(...args);
  }, []);
}
//# sourceMappingURL=Tldraw.js.map
