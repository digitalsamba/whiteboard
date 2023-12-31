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
var Input_exports = {};
__export(Input_exports, {
  Input: () => Input
});
module.exports = __toCommonJS(Input_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_classnames = __toESM(require("classnames"));
var React = __toESM(require("react"));
var import_useTranslation = require("../../hooks/useTranslation/useTranslation");
var import_Icon = require("./Icon");
const Input = React.forwardRef(function Input2({
  className,
  label,
  icon,
  iconLeft,
  autoselect = false,
  autofocus = false,
  defaultValue,
  placeholder,
  onComplete,
  onValueChange,
  onCancel,
  onBlur,
  shouldManuallyMaintainScrollPositionWhenFocused = false,
  children,
  value
}, ref) {
  const editor = (0, import_editor.useEditor)();
  const rInputRef = React.useRef(null);
  React.useImperativeHandle(ref, () => rInputRef.current);
  const msg = (0, import_useTranslation.useTranslation)();
  const rInitialValue = React.useRef(defaultValue ?? "");
  const rCurrentValue = React.useRef(defaultValue ?? "");
  const [isFocused, setIsFocused] = React.useState(false);
  const handleFocus = React.useCallback(
    (e) => {
      setIsFocused(true);
      const elm = e.currentTarget;
      rCurrentValue.current = elm.value;
      requestAnimationFrame(() => {
        if (autoselect) {
          elm.select();
        }
      });
    },
    [autoselect]
  );
  const handleChange = React.useCallback(
    (e) => {
      const value2 = e.currentTarget.value;
      rCurrentValue.current = value2;
      onValueChange?.(value2);
    },
    [onValueChange]
  );
  const handleKeyUp = React.useCallback(
    (e) => {
      switch (e.key) {
        case "Enter": {
          e.currentTarget.blur();
          e.stopPropagation();
          onComplete?.(e.currentTarget.value);
          break;
        }
        case "Escape": {
          e.currentTarget.value = rInitialValue.current;
          e.currentTarget.blur();
          e.stopPropagation();
          onCancel?.(e.currentTarget.value);
          break;
        }
      }
    },
    [onComplete, onCancel]
  );
  const handleBlur = React.useCallback(
    (e) => {
      setIsFocused(false);
      const value2 = e.currentTarget.value;
      onBlur?.(value2);
    },
    [onBlur]
  );
  React.useEffect(() => {
    if (!editor.environment.isIos)
      return;
    const visualViewport = window.visualViewport;
    if (isFocused && shouldManuallyMaintainScrollPositionWhenFocused && visualViewport) {
      const onViewportChange = () => {
        rInputRef.current?.scrollIntoView({ block: "center" });
      };
      visualViewport.addEventListener("resize", onViewportChange);
      visualViewport.addEventListener("scroll", onViewportChange);
      requestAnimationFrame(() => {
        rInputRef.current?.scrollIntoView({ block: "center" });
      });
      return () => {
        visualViewport.removeEventListener("resize", onViewportChange);
        visualViewport.removeEventListener("scroll", onViewportChange);
      };
    }
  }, [editor, isFocused, shouldManuallyMaintainScrollPositionWhenFocused]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { draggable: false, className: "tlui-input__wrapper", children: [
    children,
    label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: msg(label) }),
    iconLeft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Icon.Icon, { icon: iconLeft, className: "tlui-icon-left", small: true }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "input",
      {
        ref: rInputRef,
        className: (0, import_classnames.default)("tlui-input", className),
        type: "text",
        defaultValue,
        onKeyUp: handleKeyUp,
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        autoFocus: autofocus,
        placeholder,
        value
      }
    ),
    icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Icon.Icon, { icon, small: !!label })
  ] });
});
//# sourceMappingURL=Input.js.map
