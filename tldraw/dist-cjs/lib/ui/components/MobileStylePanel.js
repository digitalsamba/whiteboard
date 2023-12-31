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
var MobileStylePanel_exports = {};
__export(MobileStylePanel_exports, {
  MobileStylePanel: () => MobileStylePanel
});
module.exports = __toCommonJS(MobileStylePanel_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_react = require("react");
var import_useTranslation = require("../hooks/useTranslation/useTranslation");
var import_StylePanel = require("./StylePanel/StylePanel");
var import_Button = require("./primitives/Button");
var import_Icon = require("./primitives/Icon");
var import_Popover = require("./primitives/Popover");
function MobileStylePanel() {
  const editor = (0, import_editor.useEditor)();
  const msg = (0, import_useTranslation.useTranslation)();
  const currentColor = (0, import_editor.useValue)(
    "current color",
    () => {
      const color = editor.sharedStyles.get(import_editor.DefaultColorStyle);
      if (!color)
        return "var(--color-muted-1)";
      if (color.type === "mixed")
        return null;
      const theme = (0, import_editor.getDefaultColorTheme)({ isDarkMode: editor.user.isDarkMode });
      return theme[color.value].solid;
    },
    [editor]
  );
  const disableStylePanel = (0, import_editor.useValue)(
    "isHandOrEraserToolActive",
    () => editor.isInAny("hand", "zoom", "eraser", "laser"),
    [editor]
  );
  const handleStylesOpenChange = (0, import_react.useCallback)(
    (isOpen) => {
      if (!isOpen) {
        editor.updateInstanceState({ isChangingStyle: false });
      }
    },
    [editor]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_Popover.Popover, { id: "style menu", onOpenChange: handleStylesOpenChange, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Popover.PopoverTrigger, { disabled: disableStylePanel, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_Button.Button,
      {
        className: "tlui-toolbar__tools__button tlui-toolbar__styles__button",
        "data-testid": "mobile.styles",
        style: { color: currentColor ?? "var(--color-text)" },
        title: msg("style-panel.title"),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Icon.Icon, { icon: currentColor ? "blob" : "mixed" })
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Popover.PopoverContent, { side: "top", align: "end", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_StylePanel.StylePanel, { isMobile: true }) })
  ] });
}
//# sourceMappingURL=MobileStylePanel.js.map
