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
var ArrowTextLabel_exports = {};
__export(ArrowTextLabel_exports, {
  ArrowTextLabel: () => ArrowTextLabel
});
module.exports = __toCommonJS(ArrowTextLabel_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var React = __toESM(require("react"));
var import_TextHelpers = require("../../shared/TextHelpers");
var import_default_shape_constants = require("../../shared/default-shape-constants");
var import_useEditableText = require("../../shared/useEditableText");
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
  } = (0, import_useEditableText.useEditableText)(id, "arrow", text);
  if (!isEditing && isEmpty) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: "tl-arrow-label",
      "data-font": font,
      "data-align": "center",
      "data-hastext": !isEmpty,
      "data-isediting": isEditing,
      style: {
        textAlign: "center",
        fontSize: import_default_shape_constants.ARROW_LABEL_FONT_SIZES[size],
        lineHeight: import_default_shape_constants.ARROW_LABEL_FONT_SIZES[size] * import_default_shape_constants.TEXT_PROPS.lineHeight + "px",
        transform: `translate(${position.x}px, ${position.y}px)`,
        color: labelColor
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tl-arrow-label__inner", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { width: width ? width : "9px" }, children: text ? import_TextHelpers.TextHelpers.normalizeTextForDom(text) : " " }),
        isEditing && // Consider replacing with content-editable
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
            onContextMenu: import_editor.stopEventPropagation,
            onPointerDown: handleInputPointerDown
          }
        )
      ] })
    }
  );
});
//# sourceMappingURL=ArrowTextLabel.js.map
