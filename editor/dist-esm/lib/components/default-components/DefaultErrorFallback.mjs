import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useValue } from "@tldraw/state";
import classNames from "classnames";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { EditorContext } from "../../hooks/useEditor.mjs";
import { hardResetEditor } from "../../utils/hardResetEditor.mjs";
import { refreshPage } from "../../utils/refreshPage.mjs";
import { Canvas } from "../Canvas.mjs";
import { ErrorBoundary } from "../ErrorBoundary.mjs";
const BASE_ERROR_URL = "https://github.com/tldraw/tldraw/issues/new";
function noop() {
}
const DefaultErrorFallback = ({ error, editor }) => {
  const containerRef = useRef(null);
  const [shouldShowError, setShouldShowError] = useState(process.env.NODE_ENV === "development");
  const [didCopy, setDidCopy] = useState(false);
  const [shouldShowResetConfirmation, setShouldShowResetConfirmation] = useState(false);
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : null;
  const isDarkModeFromApp = useValue(
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
  const [isDarkMode, setIsDarkMode] = useState(null);
  useLayoutEffect(() => {
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
  useEffect(() => {
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
    refreshPage();
  };
  const resetLocalState = async () => {
    hardResetEditor();
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: classNames(
        "tl-container tl-error-boundary",
        // error-boundary is sometimes used outside of the theme
        // container, so we need to provide it with a theme for our
        // styles to work correctly
        isDarkMode === null ? "" : isDarkMode ? "tl-theme__dark" : "tl-theme__light"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "tl-error-boundary__overlay" }),
        editor && // opportunistically attempt to render the canvas to reassure
        // the user that their document is still there. there's a good
        // chance this won't work (ie the error that we're currently
        // notifying the user about originates in the canvas) so it's
        // not a big deal if it doesn't work - in that case we just have
        // a plain grey background.
        /* @__PURE__ */ jsx(ErrorBoundary, { onError: noop, fallback: () => null, children: /* @__PURE__ */ jsx(EditorContext.Provider, { value: editor, children: /* @__PURE__ */ jsx("div", { className: "tl-overlay tl-error-boundary__canvas", children: /* @__PURE__ */ jsx(Canvas, {}) }) }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: classNames("tl-modal", "tl-error-boundary__content", {
              "tl-error-boundary__content__expanded": shouldShowError && !shouldShowResetConfirmation
            }),
            children: shouldShowResetConfirmation ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("h2", { children: "Are you sure?" }),
              /* @__PURE__ */ jsx("p", { children: "Resetting your data will delete your drawing and cannot be undone." }),
              /* @__PURE__ */ jsxs("div", { className: "tl-error-boundary__content__actions", children: [
                /* @__PURE__ */ jsx("button", { onClick: () => setShouldShowResetConfirmation(false), children: "Cancel" }),
                /* @__PURE__ */ jsx("button", { className: "tl-error-boundary__reset", onClick: resetLocalState, children: "Reset data" })
              ] })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("h2", { children: "Something's gone wrong." }),
              /* @__PURE__ */ jsxs("p", { children: [
                "Sorry, we encountered an error. Please refresh the page to continue. If you keep seeing this error, you can ",
                /* @__PURE__ */ jsx("a", { href: url.toString(), children: "create a GitHub issue" }),
                " or",
                " ",
                /* @__PURE__ */ jsx("a", { href: "https://discord.gg/Cq6cPsTfNy", children: "ask for help on Discord" }),
                "."
              ] }),
              shouldShowError && /* @__PURE__ */ jsxs("div", { className: "tl-error-boundary__content__error", children: [
                /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: errorStack ?? errorMessage }) }),
                /* @__PURE__ */ jsx("button", { onClick: copyError, children: didCopy ? "Copied!" : "Copy" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "tl-error-boundary__content__actions", children: [
                /* @__PURE__ */ jsx("button", { onClick: () => setShouldShowError(!shouldShowError), children: shouldShowError ? "Hide details" : "Show details" }),
                /* @__PURE__ */ jsxs("div", { className: "tl-error-boundary__content__actions__group", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: "tl-error-boundary__reset",
                      onClick: () => setShouldShowResetConfirmation(true),
                      children: "Reset data"
                    }
                  ),
                  /* @__PURE__ */ jsx("button", { className: "tl-error-boundary__refresh", onClick: refresh, children: "Refresh Page" })
                ] })
              ] })
            ] })
          }
        )
      ]
    }
  );
};
export {
  DefaultErrorFallback
};
//# sourceMappingURL=DefaultErrorFallback.mjs.map
