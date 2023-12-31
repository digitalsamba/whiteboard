import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ToastProvider } from "@radix-ui/react-toast";
import { useEditor, useValue } from "@tldraw/editor";
import classNames from "classnames";
import React from "react";
import { TldrawUiContextProvider } from "./TldrawUiContextProvider.mjs";
import { BackToContent } from "./components/BackToContent.mjs";
import { DebugPanel } from "./components/DebugPanel.mjs";
import { Dialogs } from "./components/Dialogs.mjs";
import { FollowingIndicator } from "./components/FollowingIndicator.mjs";
import { HelpMenu } from "./components/HelpMenu.mjs";
import { MenuZone } from "./components/MenuZone.mjs";
import { NavigationZone } from "./components/NavigationZone/NavigationZone.mjs";
import { ExitPenMode } from "./components/PenModeToggle.mjs";
import { StopFollowing } from "./components/StopFollowing.mjs";
import { StylePanel } from "./components/StylePanel/StylePanel.mjs";
import { ToastViewport, Toasts } from "./components/Toasts.mjs";
import { Toolbar } from "./components/Toolbar/Toolbar.mjs";
import { Button } from "./components/primitives/Button.mjs";
import { useActions } from "./hooks/useActions.mjs";
import { useBreakpoint } from "./hooks/useBreakpoint.mjs";
import { useNativeClipboardEvents } from "./hooks/useClipboardEvents.mjs";
import { useEditorEvents } from "./hooks/useEditorEvents.mjs";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts.mjs";
import { useTranslation } from "./hooks/useTranslation/useTranslation.mjs";
const TldrawUi = React.memo(function TldrawUi2({
  shareZone,
  topZone,
  renderDebugMenuItems,
  children,
  hideUi,
  ...rest
}) {
  return /* @__PURE__ */ jsx(TldrawUiContextProvider, { ...rest, children: /* @__PURE__ */ jsx(
    TldrawUiInner,
    {
      hideUi,
      shareZone,
      topZone,
      renderDebugMenuItems,
      children
    }
  ) });
});
const TldrawUiInner = React.memo(function TldrawUiInner2({
  children,
  hideUi,
  ...rest
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    children,
    hideUi ? null : /* @__PURE__ */ jsx(TldrawUiContent, { ...rest })
  ] });
});
const TldrawUiContent = React.memo(function TldrawUI({
  shareZone,
  topZone,
  renderDebugMenuItems
}) {
  const editor = useEditor();
  const msg = useTranslation();
  const breakpoint = useBreakpoint();
  const isReadonlyMode = useValue("isReadonlyMode", () => editor.instanceState.isReadonly, [editor]);
  const isFocusMode = useValue("focus", () => editor.instanceState.isFocusMode, [editor]);
  const isDebugMode = useValue("debug", () => editor.instanceState.isDebugMode, [editor]);
  useKeyboardShortcuts();
  useNativeClipboardEvents();
  useEditorEvents();
  const { "toggle-focus-mode": toggleFocus } = useActions();
  return /* @__PURE__ */ jsx(ToastProvider, { children: /* @__PURE__ */ jsxs(
    "main",
    {
      className: classNames("tlui-layout", {
        "tlui-layout__mobile": breakpoint < 5
      }),
      children: [
        isFocusMode ? /* @__PURE__ */ jsx("div", { className: "tlui-layout__top", children: /* @__PURE__ */ jsx(
          Button,
          {
            className: "tlui-focus-button",
            title: `${msg("focus-mode.toggle-focus-mode")}`,
            icon: "dot",
            onClick: () => toggleFocus.onSelect("menu")
          }
        ) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "tlui-layout__top", children: [
            /* @__PURE__ */ jsxs("div", { className: "tlui-layout__top__left", children: [
              /* @__PURE__ */ jsx(MenuZone, {}),
              /* @__PURE__ */ jsxs("div", { className: "tlui-helper-buttons", children: [
                /* @__PURE__ */ jsx(ExitPenMode, {}),
                /* @__PURE__ */ jsx(BackToContent, {}),
                /* @__PURE__ */ jsx(StopFollowing, {})
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "tlui-layout__top__center", children: topZone }),
            /* @__PURE__ */ jsxs("div", { className: "tlui-layout__top__right", children: [
              shareZone,
              breakpoint >= 5 && !isReadonlyMode && /* @__PURE__ */ jsx("div", { className: "tlui-style-panel__wrapper", children: /* @__PURE__ */ jsx(StylePanel, {}) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "tlui-layout__bottom", children: [
            /* @__PURE__ */ jsxs("div", { className: "tlui-layout__bottom__main", children: [
              /* @__PURE__ */ jsx(NavigationZone, {}),
              /* @__PURE__ */ jsx(Toolbar, {}),
              breakpoint >= 4 && /* @__PURE__ */ jsx(HelpMenu, {})
            ] }),
            isDebugMode && /* @__PURE__ */ jsx(DebugPanel, { renderDebugMenuItems: renderDebugMenuItems ?? null })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Toasts, {}),
        /* @__PURE__ */ jsx(Dialogs, {}),
        /* @__PURE__ */ jsx(ToastViewport, {}),
        /* @__PURE__ */ jsx(FollowingIndicator, {})
      ]
    }
  ) });
});
export {
  TldrawUi
};
//# sourceMappingURL=TldrawUi.mjs.map
