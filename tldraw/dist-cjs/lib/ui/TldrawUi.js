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
var TldrawUi_exports = {};
__export(TldrawUi_exports, {
  TldrawUi: () => TldrawUi
});
module.exports = __toCommonJS(TldrawUi_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react_toast = require("@radix-ui/react-toast");
var import_editor = require("@tldraw/editor");
var import_classnames = __toESM(require("classnames"));
var import_react = __toESM(require("react"));
var import_TldrawUiContextProvider = require("./TldrawUiContextProvider");
var import_BackToContent = require("./components/BackToContent");
var import_DebugPanel = require("./components/DebugPanel");
var import_Dialogs = require("./components/Dialogs");
var import_FollowingIndicator = require("./components/FollowingIndicator");
var import_HelpMenu = require("./components/HelpMenu");
var import_MenuZone = require("./components/MenuZone");
var import_NavigationZone = require("./components/NavigationZone/NavigationZone");
var import_PenModeToggle = require("./components/PenModeToggle");
var import_StopFollowing = require("./components/StopFollowing");
var import_StylePanel = require("./components/StylePanel/StylePanel");
var import_Toasts = require("./components/Toasts");
var import_Toolbar = require("./components/Toolbar/Toolbar");
var import_Button = require("./components/primitives/Button");
var import_useActions = require("./hooks/useActions");
var import_useBreakpoint = require("./hooks/useBreakpoint");
var import_useClipboardEvents = require("./hooks/useClipboardEvents");
var import_useEditorEvents = require("./hooks/useEditorEvents");
var import_useKeyboardShortcuts = require("./hooks/useKeyboardShortcuts");
var import_useTranslation = require("./hooks/useTranslation/useTranslation");
const TldrawUi = import_react.default.memo(function TldrawUi2({
  shareZone,
  topZone,
  renderDebugMenuItems,
  children,
  hideUi,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_TldrawUiContextProvider.TldrawUiContextProvider, { ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
const TldrawUiInner = import_react.default.memo(function TldrawUiInner2({
  children,
  hideUi,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    children,
    hideUi ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TldrawUiContent, { ...rest })
  ] });
});
const TldrawUiContent = import_react.default.memo(function TldrawUI({
  shareZone,
  topZone,
  renderDebugMenuItems
}) {
  const editor = (0, import_editor.useEditor)();
  const msg = (0, import_useTranslation.useTranslation)();
  const breakpoint = (0, import_useBreakpoint.useBreakpoint)();
  const isReadonlyMode = (0, import_editor.useValue)("isReadonlyMode", () => editor.instanceState.isReadonly, [editor]);
  const isFocusMode = (0, import_editor.useValue)("focus", () => editor.instanceState.isFocusMode, [editor]);
  const isDebugMode = (0, import_editor.useValue)("debug", () => editor.instanceState.isDebugMode, [editor]);
  (0, import_useKeyboardShortcuts.useKeyboardShortcuts)();
  (0, import_useClipboardEvents.useNativeClipboardEvents)();
  (0, import_useEditorEvents.useEditorEvents)();
  const { "toggle-focus-mode": toggleFocus } = (0, import_useActions.useActions)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_toast.ToastProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "main",
    {
      className: (0, import_classnames.default)("tlui-layout", {
        "tlui-layout__mobile": breakpoint < 5
      }),
      children: [
        isFocusMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tlui-layout__top", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_Button.Button,
          {
            className: "tlui-focus-button",
            title: `${msg("focus-mode.toggle-focus-mode")}`,
            icon: "dot",
            onClick: () => toggleFocus.onSelect("menu")
          }
        ) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-layout__top", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-layout__top__left", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_MenuZone.MenuZone, {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-helper-buttons", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_PenModeToggle.ExitPenMode, {}),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_BackToContent.BackToContent, {}),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_StopFollowing.StopFollowing, {})
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tlui-layout__top__center", children: topZone }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-layout__top__right", children: [
              shareZone,
              breakpoint >= 5 && !isReadonlyMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tlui-style-panel__wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_StylePanel.StylePanel, {}) })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-layout__bottom", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-layout__bottom__main", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_NavigationZone.NavigationZone, {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Toolbar.Toolbar, {}),
              breakpoint >= 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_HelpMenu.HelpMenu, {})
            ] }),
            isDebugMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_DebugPanel.DebugPanel, { renderDebugMenuItems: renderDebugMenuItems ?? null })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Toasts.Toasts, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Dialogs.Dialogs, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Toasts.ToastViewport, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_FollowingIndicator.FollowingIndicator, {})
      ]
    }
  ) });
});
//# sourceMappingURL=TldrawUi.js.map
