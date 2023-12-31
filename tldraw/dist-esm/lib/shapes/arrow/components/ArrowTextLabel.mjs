import { jsx, jsxs } from "react/jsx-runtime";
import { stopEventPropagation } from "@tldraw/editor";
import * as React from "react";
import { TextHelpers } from "../../shared/TextHelpers.mjs";
import { ARROW_LABEL_FONT_SIZES, TEXT_PROPS } from "../../shared/default-shape-constants.mjs";
import { useEditableText } from "../../shared/useEditableText.mjs";
const ArrowTextLabel = React.memo(function ArrowTextLabel2({
  id,
  text,
  size,
  font,
  position,
  width,
  labelColor
}) {
  const {
    rInput,
    isEditing,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleChange,
    isEmpty,
    handleInputPointerDown
  } = useEditableText(id, "arrow", text);
  if (!isEditing && isEmpty) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "tl-arrow-label",
      "data-font": font,
      "data-align": "center",
      "data-hastext": !isEmpty,
      "data-isediting": isEditing,
      style: {
        textAlign: "center",
        fontSize: ARROW_LABEL_FONT_SIZES[size],
        lineHeight: ARROW_LABEL_FONT_SIZES[size] * TEXT_PROPS.lineHeight + "px",
        transform: `translate(${position.x}px, ${position.y}px)`,
        color: labelColor
      },
      children: /* @__PURE__ */ jsxs("div", { className: "tl-arrow-label__inner", children: [
        /* @__PURE__ */ jsx("p", { style: { width: width ? width : "9px" }, children: text ? TextHelpers.normalizeTextForDom(text) : " " }),
        isEditing && // Consider replacing with content-editable
        /* @__PURE__ */ jsx(
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
            autoFocus: true,
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
            onPointerDown: handleInputPointerDown
          }
        )
      ] })
    }
  );
});
export {
  ArrowTextLabel
};
//# sourceMappingURL=ArrowTextLabel.mjs.map
