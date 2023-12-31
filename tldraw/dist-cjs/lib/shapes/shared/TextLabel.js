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
var TextLabel_exports = {};
__export(TextLabel_exports, {
  TextLabel: () => TextLabel
});
module.exports = __toCommonJS(TextLabel_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_react = __toESM(require("react"));
var import_ShapeFill = require("./ShapeFill");
var import_TextHelpers = require("./TextHelpers");
var import_default_shape_constants = require("./default-shape-constants");
var import_legacyProps = require("./legacyProps");
var import_useEditableText = require("./useEditableText");
const TextLabel = import_react.default.memo(function TextLabel2({
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
  } = (0, import_useEditableText.useEditableText)(id, type, text);
  const isInteractive = isEditing || isEditingSameShapeType;
  const finalText = import_TextHelpers.TextHelpers.normalizeTextForDom(text);
  const hasText = finalText.trim().length > 0;
  const legacyAlign = (0, import_legacyProps.isLegacyAlign)(align);
  const theme = (0, import_ShapeFill.useDefaultColorTheme)();
  if (!isInteractive && !hasText)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          className: "tl-text-label__inner",
          style: {
            fontSize: import_default_shape_constants.LABEL_FONT_SIZES[size],
            lineHeight: import_default_shape_constants.LABEL_FONT_SIZES[size] * import_default_shape_constants.TEXT_PROPS.lineHeight + "px",
            minHeight: isEmpty ? import_default_shape_constants.LABEL_FONT_SIZES[size] * import_default_shape_constants.TEXT_PROPS.lineHeight + 32 : 0,
            minWidth: isEmpty ? 33 : 0,
            color: theme[labelColor].solid
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tl-text tl-text-content", dir: "ltr", children: finalText }),
            isInteractive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                onContextMenu: import_editor.stopEventPropagation,
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
//# sourceMappingURL=TextLabel.js.map
