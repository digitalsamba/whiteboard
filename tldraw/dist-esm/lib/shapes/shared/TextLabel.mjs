import { jsx, jsxs } from "react/jsx-runtime";
import {
  stopEventPropagation
} from "@tldraw/editor";
import React from "react";
import { useDefaultColorTheme } from "./ShapeFill.mjs";
import { TextHelpers } from "./TextHelpers.mjs";
import { LABEL_FONT_SIZES, TEXT_PROPS } from "./default-shape-constants.mjs";
import { isLegacyAlign } from "./legacyProps.mjs";
import { useEditableText } from "./useEditableText.mjs";
const TextLabel = React.memo(function TextLabel2({
  id,
  type,
  text,
  size,
  labelColor,
  font,
  align,
  verticalAlign,
  wrap
}) {
  const {
    rInput,
    isEmpty,
    isEditing,
    isEditingSameShapeType,
    handleFocus,
    handleChange,
    handleKeyDown,
    handleBlur,
    handleInputPointerDown,
    handleDoubleClick
  } = useEditableText(id, type, text);
  const isInteractive = isEditing || isEditingSameShapeType;
  const finalText = TextHelpers.normalizeTextForDom(text);
  const hasText = finalText.trim().length > 0;
  const legacyAlign = isLegacyAlign(align);
  const theme = useDefaultColorTheme();
  if (!isInteractive && !hasText)
    return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "tl-text-label",
      "data-font": font,
      "data-align": align,
      "data-hastext": !isEmpty,
      "data-isediting": isEditing,
      "data-textwrap": !!wrap,
      style: {
        justifyContent: align === "middle" || legacyAlign ? "center" : align,
        alignItems: verticalAlign === "middle" ? "center" : verticalAlign
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "tl-text-label__inner",
          style: {
            fontSize: LABEL_FONT_SIZES[size],
            lineHeight: LABEL_FONT_SIZES[size] * TEXT_PROPS.lineHeight + "px",
            minHeight: isEmpty ? LABEL_FONT_SIZES[size] * TEXT_PROPS.lineHeight + 32 : 0,
            minWidth: isEmpty ? 33 : 0,
            color: theme[labelColor].solid
          },
          children: [
            /* @__PURE__ */ jsx("div", { className: "tl-text tl-text-content", dir: "ltr", children: finalText }),
            isInteractive && /* @__PURE__ */ jsx(
              "textarea",
              {
                ref: rInput,
                className: "tl-text tl-text-input",
                name: "text",
                tabIndex: -1,
                autoComplete: "false",
                autoCapitalize: "false",
                autoCorrect: "false",
                autoSave: "false",
                autoFocus: isEditing,
                placeholder: "",
                spellCheck: "true",
                wrap: "off",
                dir: "auto",
                datatype: "wysiwyg",
                defaultValue: text,
                onFocus: handleFocus,
                onChange: handleChange,
                onKeyDown: handleKeyDown,
                onBlur: handleBlur,
                onContextMenu: stopEventPropagation,
                onPointerDown: handleInputPointerDown,
                onDoubleClick: handleDoubleClick
              }
            )
          ]
        }
      )
    }
  );
});
export {
  TextLabel
};
//# sourceMappingURL=TextLabel.mjs.map
