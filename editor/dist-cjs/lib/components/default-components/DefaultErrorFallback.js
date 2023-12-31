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
var DefaultErrorFallback_exports = {};
__export(DefaultErrorFallback_exports, {
  DefaultErrorFallback: () => DefaultErrorFallback
});
module.exports = __toCommonJS(DefaultErrorFallback_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_state = require("@tldraw/state");
var import_classnames = __toESM(require("classnames"));
var import_react = require("react");
var import_useEditor = require("../../hooks/useEditor");
var import_hardResetEditor = require("../../utils/hardResetEditor");
var import_refreshPage = require("../../utils/refreshPage");
var import_Canvas = require("../Canvas");
var import_ErrorBoundary = require("../ErrorBoundary");
const BASE_ERROR_URL = "https://github.com/tldraw/tldraw/issues/new";
function noop() {
}
const DefaultErrorFallback = ({ error, editor }) => {
  const containerRef = (0, import_react.useRef)(null);
  const [shouldShowError, setShouldShowError] = (0, import_react.useState)(process.env.NODE_ENV === "development");
  const [didCopy, setDidCopy] = (0, import_react.useState)(false);
  const [shouldShowResetConfirmation, setShouldShowResetConfirmation] = (0, import_react.useState)(false);
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : null;
  const isDarkModeFromApp = (0, import_state.useValue)(
    "isDarkMode",
    () => {
      try {
        if (editor) {
          return editor.user.isDarkMode;
        }
      } catch {
      }
      return null;
    },
    [editor]
  );
  const [isDarkMode, setIsDarkMode] = (0, import_react.useState)(null);
  (0, import_react.useLayoutEffect)(() => {
    if (isDarkModeFromApp !== null) {
      setIsDarkMode(isDarkModeFromApp);
    }
    let parent = containerRef.current?.parentElement;
    let foundParentThemeClass = false;
    while (parent) {
      if (parent.classList.contains("tl-theme__dark") || parent.classList.contains("tl-theme__light")) {
        foundParentThemeClass = true;
        break;
      }
      parent = parent.parentElement;
    }
    if (foundParentThemeClass) {
      setIsDarkMode(null);
      return;
    }
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, [isDarkModeFromApp]);
  (0, import_react.useEffect)(() => {
    if (didCopy) {
      const timeout = setTimeout(() => {
        setDidCopy(false);
      }, 2e3);
      return () => clearTimeout(timeout);
    }
  }, [didCopy]);
  const copyError = () => {
    const textarea = document.createElement("textarea");
    textarea.value = errorStack ?? errorMessage;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    setDidCopy(true);
  };
  const refresh = () => {
    (0, import_refreshPage.refreshPage)();
  };
  const resetLocalState = async () => {
    (0, import_hardResetEditor.hardResetEditor)();
  };
  const url = new URL(BASE_ERROR_URL);
  url.searchParams.set("title", errorMessage);
  url.searchParams.set("labels", `bug`);
  url.searchParams.set(
    "body",
    `Hey, I ran into an error while using tldraw:

\`\`\`js
${errorStack ?? errorMessage}
\`\`\`

My browser: ${navigator.userAgent}`
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      ref: containerRef,
      className: (0, import_classnames.default)(
        "tl-container tl-error-boundary",
        // error-boundary is sometimes used outside of the theme
        // container, so we need to provide it with a theme for our
        // styles to work correctly
        isDarkMode === null ? "" : isDarkMode ? "tl-theme__dark" : "tl-theme__light"
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tl-error-boundary__overlay" }),
        editor && // opportunistically attempt to render the canvas to reassure
        // the user that their document is still there. there's a good
        // chance this won't work (ie the error that we're currently
        // notifying the user about originates in the canvas) so it's
        // not a big deal if it doesn't work - in that case we just have
        // a plain grey background.
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ErrorBoundary.ErrorBoundary, { onError: noop, fallback: () => null, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_useEditor.EditorContext.Provider, { value: editor, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tl-overlay tl-error-boundary__canvas", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Canvas.Canvas, {}) }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: (0, import_classnames.default)("tl-modal", "tl-error-boundary__content", {
              "tl-error-boundary__content__expanded": shouldShowError && !shouldShowResetConfirmation
            }),
            children: shouldShowResetConfirmation ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Are you sure?" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Resetting your data will delete your drawing and cannot be undone." }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tl-error-boundary__content__actions", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setShouldShowResetConfirmation(false), children: "Cancel" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "tl-error-boundary__reset", onClick: resetLocalState, children: "Reset data" })
              ] })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Something's gone wrong." }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
                "Sorry, we encountered an error. Please refresh the page to continue. If you keep seeing this error, you can ",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: url.toString(), children: "create a GitHub issue" }),
                " or",
                " ",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "https://discord.gg/Cq6cPsTfNy", children: "ask for help on Discord" }),
                "."
              ] }),
              shouldShowError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tl-error-boundary__content__error", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: errorStack ?? errorMessage }) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: copyError, children: didCopy ? "Copied!" : "Copy" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tl-error-boundary__content__actions", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setShouldShowError(!shouldShowError), children: shouldShowError ? "Hide details" : "Show details" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tl-error-boundary__content__actions__group", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "button",
                    {
                      className: "tl-error-boundary__reset",
                      onClick: () => setShouldShowResetConfirmation(true),
                      children: "Reset data"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "tl-error-boundary__refresh", onClick: refresh, children: "Refresh Page" })
                ] })
              ] })
            ] })
          }
        )
      ]
    }
  );
};
//# sourceMappingURL=DefaultErrorFallback.js.map
