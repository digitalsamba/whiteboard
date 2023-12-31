import { jsx, jsxs } from "react/jsx-runtime";
import { Store } from "@tldraw/store";
import { annotateError } from "@tldraw/utils";
import React, {
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
  useSyncExternalStore
} from "react";
import classNames from "classnames";
import { Canvas } from "./components/Canvas.mjs";
import { OptionalErrorBoundary } from "./components/ErrorBoundary.mjs";
import { DefaultErrorFallback } from "./components/default-components/DefaultErrorFallback.mjs";
import { createTLUser } from "./config/createTLUser.mjs";
import { Editor } from "./editor/Editor.mjs";
import { ContainerProvider, useContainer } from "./hooks/useContainer.mjs";
import { useCursor } from "./hooks/useCursor.mjs";
import { useDPRMultiple } from "./hooks/useDPRMultiple.mjs";
import { useDarkMode } from "./hooks/useDarkMode.mjs";
import { EditorContext, useEditor } from "./hooks/useEditor.mjs";
import {
  EditorComponentsProvider,
  useEditorComponents
} from "./hooks/useEditorComponents.mjs";
import { useEvent } from "./hooks/useEvent.mjs";
import { useFocusEvents } from "./hooks/useFocusEvents.mjs";
import { useForceUpdate } from "./hooks/useForceUpdate.mjs";
import { useLocalStore } from "./hooks/useLocalStore.mjs";
import { useSafariFocusOutFix } from "./hooks/useSafariFocusOutFix.mjs";
import { useZoomCss } from "./hooks/useZoomCss.mjs";
const EMPTY_SHAPE_UTILS_ARRAY = [];
const EMPTY_TOOLS_ARRAY = [];
const TldrawEditor = memo(function TldrawEditor2({
  store,
  components,
  className,
  user: _user,
  ...rest
}) {
  const [container, rContainer] = React.useState(null);
  const user = useMemo(() => _user ?? createTLUser(), [_user]);
  const ErrorFallback = components?.ErrorFallback === void 0 ? DefaultErrorFallback : components?.ErrorFallback;
  const withDefaults = {
    ...rest,
    shapeUtils: rest.shapeUtils ?? EMPTY_SHAPE_UTILS_ARRAY,
    tools: rest.tools ?? EMPTY_TOOLS_ARRAY
  };
  return (
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: rContainer,
        draggable: false,
        className: classNames("tl-container tl-theme__light", className),
        tabIndex: 0,
        children: /* @__PURE__ */ jsx(
          OptionalErrorBoundary,
          {
            fallback: ErrorFallback,
            onError: (error) => annotateError(error, { tags: { origin: "react.tldraw-before-app" } }),
            children: container && /* @__PURE__ */ jsx(ContainerProvider, { container, children: /* @__PURE__ */ jsx(EditorComponentsProvider, { overrides: components, children: store ? store instanceof Store ? (
              // Store is ready to go, whether externally synced or not
              /* @__PURE__ */ (jsx(TldrawEditorWithReadyStore, { ...withDefaults, store, user }))
            ) : (
              // Store is a synced store, so handle syncing stages internally
              /* @__PURE__ */ (jsx(TldrawEditorWithLoadingStore, { ...withDefaults, store, user }))
            ) : (
              // We have no store (it's undefined) so create one and possibly sync it
              /* @__PURE__ */ (jsx(TldrawEditorWithOwnStore, { ...withDefaults, store, user }))
            ) }) })
          }
        )
      }
    )
  );
});
function TldrawEditorWithOwnStore(props) {
  const { defaultName, snapshot, initialData, shapeUtils, persistenceKey, sessionId, user } = props;
  const syncedStore = useLocalStore({
    shapeUtils,
    initialData,
    persistenceKey,
    sessionId,
    defaultName,
    snapshot
  });
  return /* @__PURE__ */ jsx(TldrawEditorWithLoadingStore, { ...props, store: syncedStore, user });
}
const TldrawEditorWithLoadingStore = memo(function TldrawEditorBeforeLoading({
  store,
  user,
  ...rest
}) {
  const container = useContainer();
  useLayoutEffect(() => {
    if (user.userPreferences.value.isDarkMode) {
      container.classList.remove("tl-theme__light");
      container.classList.add("tl-theme__dark");
    }
  }, [container, user.userPreferences.value.isDarkMode]);
  switch (store.status) {
    case "error": {
      throw store.error;
    }
    case "loading": {
      return /* @__PURE__ */ jsx(LoadingScreen, { children: "Connecting..." });
    }
    case "not-synced": {
      break;
    }
    case "synced-local": {
      break;
    }
    case "synced-remote": {
      break;
    }
  }
  return /* @__PURE__ */ jsx(TldrawEditorWithReadyStore, { ...rest, store: store.store, user });
});
function TldrawEditorWithReadyStore({
  onMount,
  children,
  store,
  tools,
  shapeUtils,
  autoFocus,
  user,
  initialState
}) {
  const { ErrorFallback } = useEditorComponents();
  const container = useContainer();
  const [editor, setEditor] = useState(null);
  useLayoutEffect(() => {
    const editor2 = new Editor({
      store,
      shapeUtils,
      tools,
      getContainer: () => container,
      user,
      initialState
    });
    window.app = editor2;
    window.editor = editor2;
    setEditor(editor2);
    return () => {
      editor2.dispose();
    };
  }, [container, shapeUtils, tools, store, user, initialState]);
  const crashingError = useSyncExternalStore(
    useCallback(
      (onStoreChange) => {
        if (editor) {
          editor.on("crash", onStoreChange);
          return () => editor.off("crash", onStoreChange);
        }
        return () => {
        };
      },
      [editor]
    ),
    () => editor?.crashingError ?? null
  );
  if (!editor) {
    return null;
  }
  return (
    // the top-level tldraw component also renders an error boundary almost
    // identical to this one. the reason we have two is because this one has
    // access to `App`, which means that here we can enrich errors with data
    // from app for reporting, and also still attempt to render the user's
    // document in the event of an error to reassure them that their work is
    // not lost.
    /* @__PURE__ */ (jsx(OptionalErrorBoundary, {
      fallback: ErrorFallback,
      onError: (error) => editor.annotateError(error, { origin: "react.tldraw", willCrashApp: true }),
      children: crashingError ? /* @__PURE__ */ jsx(Crash, { crashingError }) : /* @__PURE__ */ jsx(EditorContext.Provider, { value: editor, children: /* @__PURE__ */ jsx(Layout, { autoFocus, onMount, children }) })
    }))
  );
}
function Layout({
  children,
  onMount,
  autoFocus = false
}) {
  useZoomCss();
  useCursor();
  useDarkMode();
  useSafariFocusOutFix();
  useForceUpdate();
  useFocusEvents(autoFocus);
  useOnMount(onMount);
  useDPRMultiple();
  return children ?? /* @__PURE__ */ jsx(Canvas, {});
}
function Crash({ crashingError }) {
  throw crashingError;
}
function LoadingScreen({ children }) {
  const { Spinner } = useEditorComponents();
  return /* @__PURE__ */ jsxs("div", { className: "tl-loading", children: [
    Spinner ? /* @__PURE__ */ jsx(Spinner, {}) : null,
    children
  ] });
}
function ErrorScreen({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "tl-loading", children });
}
function useOnMount(onMount) {
  const editor = useEditor();
  const onMountEvent = useEvent((editor2) => {
    const teardown = onMount?.(editor2);
    editor2.emit("mount");
    window.tldrawReady = true;
    return teardown;
  });
  React.useLayoutEffect(() => {
    if (editor)
      return onMountEvent?.(editor);
  }, [editor, onMountEvent]);
}
export {
  ErrorScreen,
  LoadingScreen,
  TldrawEditor
};
//# sourceMappingURL=TldrawEditor.mjs.map
