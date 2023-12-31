import { jsx, jsxs } from "react/jsx-runtime";
import {
  Canvas,
  ErrorScreen,
  LoadingScreen,
  TldrawEditor,
  assert,
  useEditor
} from "@tldraw/editor";
import { useCallback, useDebugValue, useLayoutEffect, useMemo, useRef } from "react";
import { TldrawHandles } from "./canvas/TldrawHandles.mjs";
import { TldrawHoveredShapeIndicator } from "./canvas/TldrawHoveredShapeIndicator.mjs";
import { TldrawScribble } from "./canvas/TldrawScribble.mjs";
import { TldrawSelectionBackground } from "./canvas/TldrawSelectionBackground.mjs";
import { TldrawSelectionForeground } from "./canvas/TldrawSelectionForeground.mjs";
import {
  registerDefaultExternalContentHandlers
} from "./defaultExternalContentHandlers.mjs";
import { defaultShapeTools } from "./defaultShapeTools.mjs";
import { defaultShapeUtils } from "./defaultShapeUtils.mjs";
import { registerDefaultSideEffects } from "./defaultSideEffects.mjs";
import { defaultTools } from "./defaultTools.mjs";
import { TldrawUi } from "./ui/TldrawUi.mjs";
import { ContextMenu } from "./ui/components/ContextMenu.mjs";
import { useDefaultEditorAssetsWithOverrides } from "./utils/assetUrls.mjs";
import { usePreloadAssets } from "./utils/usePreloadAssets.mjs";
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
    components: useMemo(
      () => ({
        Scribble: TldrawScribble,
        CollaboratorScribble: TldrawScribble,
        SelectionForeground: TldrawSelectionForeground,
        SelectionBackground: TldrawSelectionBackground,
        Handles: TldrawHandles,
        HoveredShapeIndicator: TldrawHoveredShapeIndicator,
        ...rest.components
      }),
      [rest.components]
    ),
    shapeUtils: useMemo(
      () => [...defaultShapeUtils, ...(rest.shapeUtils ?? [])],
      [rest.shapeUtils]
    ),
    tools: useMemo(
      () => [...defaultTools, ...defaultShapeTools, ...(rest.tools ?? [])],
      [rest.tools]
    )
  };
  const assets = useDefaultEditorAssetsWithOverrides(rest.assetUrls);
  const { done: preloadingComplete, error: preloadingError } = usePreloadAssets(assets);
  if (preloadingError) {
    return /* @__PURE__ */ jsx(ErrorScreen, { children: "Could not load assets. Please refresh the page." });
  }
  if (!preloadingComplete) {
    return /* @__PURE__ */ jsx(LoadingScreen, { children: "Loading assets..." });
  }
  return /* @__PURE__ */ jsx(TldrawEditor, { ...withDefaults, children: /* @__PURE__ */ jsxs(TldrawUi, { ...withDefaults, children: [
    /* @__PURE__ */ jsx(ContextMenu, { children: /* @__PURE__ */ jsx(Canvas, {}) }),
    /* @__PURE__ */ jsx(
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
  const editor = useEditor();
  const onMountEvent = useEvent((editor2) => {
    const unsubs = [];
    unsubs.push(registerDefaultSideEffects(editor2));
    registerDefaultExternalContentHandlers(editor2, {
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
  useLayoutEffect(() => {
    if (editor)
      return onMountEvent?.(editor);
  }, [editor, onMountEvent]);
  return null;
}
function useEvent(handler) {
  const handlerRef = useRef();
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });
  useDebugValue(handler);
  return useCallback((...args) => {
    const fn = handlerRef.current;
    assert(fn, "fn does not exist");
    return fn(...args);
  }, []);
}
export {
  Tldraw
};
//# sourceMappingURL=Tldraw.mjs.map
