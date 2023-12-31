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
var TldrawEditor_exports = {};
__export(TldrawEditor_exports, {
  ErrorScreen: () => ErrorScreen,
  LoadingScreen: () => LoadingScreen,
  TldrawEditor: () => TldrawEditor
});
module.exports = __toCommonJS(TldrawEditor_exports);
var import_jsx_runtime = (
  // Store is ready to go, whether externally synced or not
  require("react/jsx-runtime")
);
var import_store = require("@tldraw/store");
var import_utils = require("@tldraw/utils");
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_Canvas = require("./components/Canvas");
var import_ErrorBoundary = require("./components/ErrorBoundary");
var import_DefaultErrorFallback = require("./components/default-components/DefaultErrorFallback");
var import_createTLUser = require("./config/createTLUser");
var import_Editor = require("./editor/Editor");
var import_useContainer = require("./hooks/useContainer");
var import_useCursor = require("./hooks/useCursor");
var import_useDPRMultiple = require("./hooks/useDPRMultiple");
var import_useDarkMode = require("./hooks/useDarkMode");
var import_useEditor = require("./hooks/useEditor");
var import_useEditorComponents = require("./hooks/useEditorComponents");
var import_useEvent = require("./hooks/useEvent");
var import_useFocusEvents = require("./hooks/useFocusEvents");
var import_useForceUpdate = require("./hooks/useForceUpdate");
var import_useLocalStore = require("./hooks/useLocalStore");
var import_useSafariFocusOutFix = require("./hooks/useSafariFocusOutFix");
var import_useZoomCss = require("./hooks/useZoomCss");
const EMPTY_SHAPE_UTILS_ARRAY = [];
const EMPTY_TOOLS_ARRAY = [];
const TldrawEditor = (0, import_react.memo)(function TldrawEditor2({
  store,
  components,
  className,
  user: _user,
  ...rest
}) {
  const [container, rContainer] = import_react.default.useState(null);
  const user = (0, import_react.useMemo)(() => _user ?? (0, import_createTLUser.createTLUser)(), [_user]);
  const ErrorFallback = components?.ErrorFallback === void 0 ? import_DefaultErrorFallback.DefaultErrorFallback : components?.ErrorFallback;
  const withDefaults = {
    ...rest,
    shapeUtils: rest.shapeUtils ?? EMPTY_SHAPE_UTILS_ARRAY,
    tools: rest.tools ?? EMPTY_TOOLS_ARRAY
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref: rContainer,
      draggable: false,
      className: (0, import_classnames.default)("tl-container tl-theme__light", className),
      tabIndex: 0,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_ErrorBoundary.OptionalErrorBoundary,
        {
          fallback: ErrorFallback,
          onError: (error) => (0, import_utils.annotateError)(error, { tags: { origin: "react.tldraw-before-app" } }),
          children: container && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_useContainer.ContainerProvider, { container, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_useEditorComponents.EditorComponentsProvider, { overrides: components, children: store ? store instanceof import_store.Store ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TldrawEditorWithReadyStore, { ...withDefaults, store, user }) : (
            // Store is a synced store, so handle syncing stages internally
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TldrawEditorWithLoadingStore, { ...withDefaults, store, user })
          ) : (
            // We have no store (it's undefined) so create one and possibly sync it
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TldrawEditorWithOwnStore, { ...withDefaults, store, user })
          ) }) })
        }
      )
    }
  );
});
function TldrawEditorWithOwnStore(props) {
  const { defaultName, snapshot, initialData, shapeUtils, persistenceKey, sessionId, user } = props;
  const syncedStore = (0, import_useLocalStore.useLocalStore)({
    shapeUtils,
    initialData,
    persistenceKey,
    sessionId,
    defaultName,
    snapshot
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TldrawEditorWithLoadingStore, { ...props, store: syncedStore, user });
}
const TldrawEditorWithLoadingStore = (0, import_react.memo)(function TldrawEditorBeforeLoading({
  store,
  user,
  ...rest
}) {
  const container = (0, import_useContainer.useContainer)();
  (0, import_react.useLayoutEffect)(() => {
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
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, { children: "Connecting..." });
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TldrawEditorWithReadyStore, { ...rest, store: store.store, user });
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
  const { ErrorFallback } = (0, import_useEditorComponents.useEditorComponents)();
  const container = (0, import_useContainer.useContainer)();
  const [editor, setEditor] = (0, import_react.useState)(null);
  (0, import_react.useLayoutEffect)(() => {
    const editor2 = new import_Editor.Editor({
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
  const crashingError = (0, import_react.useSyncExternalStore)(
    (0, import_react.useCallback)(
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_ErrorBoundary.OptionalErrorBoundary,
      {
        fallback: ErrorFallback,
        onError: (error) => editor.annotateError(error, { origin: "react.tldraw", willCrashApp: true }),
        children: crashingError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crash, { crashingError }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_useEditor.EditorContext.Provider, { value: editor, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { autoFocus, onMount, children }) })
      }
    )
  );
}
function Layout({
  children,
  onMount,
  autoFocus = false
}) {
  (0, import_useZoomCss.useZoomCss)();
  (0, import_useCursor.useCursor)();
  (0, import_useDarkMode.useDarkMode)();
  (0, import_useSafariFocusOutFix.useSafariFocusOutFix)();
  (0, import_useForceUpdate.useForceUpdate)();
  (0, import_useFocusEvents.useFocusEvents)(autoFocus);
  useOnMount(onMount);
  (0, import_useDPRMultiple.useDPRMultiple)();
  return children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Canvas.Canvas, {});
}
function Crash({ crashingError }) {
  throw crashingError;
}
function LoadingScreen({ children }) {
  const { Spinner } = (0, import_useEditorComponents.useEditorComponents)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tl-loading", children: [
    Spinner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : null,
    children
  ] });
}
function ErrorScreen({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tl-loading", children });
}
function useOnMount(onMount) {
  const editor = (0, import_useEditor.useEditor)();
  const onMountEvent = (0, import_useEvent.useEvent)((editor2) => {
    const teardown = onMount?.(editor2);
    editor2.emit("mount");
    window.tldrawReady = true;
    return teardown;
  });
  import_react.default.useLayoutEffect(() => {
    if (editor)
      return onMountEvent?.(editor);
  }, [editor, onMountEvent]);
}
//# sourceMappingURL=TldrawEditor.js.map
