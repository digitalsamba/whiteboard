import { jsx, jsxs } from "react/jsx-runtime";
import { DefaultColorStyle, getDefaultColorTheme, useEditor, useValue } from "@tldraw/editor";
import { useCallback } from "react";
import { useTranslation } from "../hooks/useTranslation/useTranslation.mjs";
import { StylePanel } from "./StylePanel/StylePanel.mjs";
import { Button } from "./primitives/Button.mjs";
import { Icon } from "./primitives/Icon.mjs";
import { Popover, PopoverContent, PopoverTrigger } from "./primitives/Popover.mjs";
function MobileStylePanel() {
  const editor = useEditor();
  const msg = useTranslation();
  const currentColor = useValue(
    "current color",
    () => {
      const color = editor.sharedStyles.get(DefaultColorStyle);
      if (!color)
        return "var(--color-muted-1)";
      if (color.type === "mixed")
        return null;
      const theme = getDefaultColorTheme({ isDarkMode: editor.user.isDarkMode });
      return theme[color.value].solid;
    },
    [editor]
  );
  const disableStylePanel = useValue(
    "isHandOrEraserToolActive",
    () => editor.isInAny("hand", "zoom", "eraser", "laser"),
    [editor]
  );
  const handleStylesOpenChange = useCallback(
    (isOpen) => {
      if (!isOpen) {
        editor.updateInstanceState({ isChangingStyle: false });
      }
    },
    [editor]
  );
  return /* @__PURE__ */ jsxs(Popover, { id: "style menu", onOpenChange: handleStylesOpenChange, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { disabled: disableStylePanel, children: /* @__PURE__ */ jsx(
      Button,
      {
        className: "tlui-toolbar__tools__button tlui-toolbar__styles__button",
        "data-testid": "mobile.styles",
        style: { color: currentColor ?? "var(--color-text)" },
        title: msg("style-panel.title"),
        children: /* @__PURE__ */ jsx(Icon, { icon: currentColor ? "blob" : "mixed" })
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { side: "top", align: "end", children: /* @__PURE__ */ jsx(StylePanel, { isMobile: true }) })
  ] });
}
export {
  MobileStylePanel
};
//# sourceMappingURL=MobileStylePanel.mjs.map
