import { jsx, jsxs } from "react/jsx-runtime";
import { useEditor } from "@tldraw/editor";
import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "../../hooks/useTranslation/useTranslation.mjs";
import { Icon } from "./Icon.mjs";
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
  const editor = useEditor();
  const rInputRef = React.useRef(null);
  React.useImperativeHandle(ref, () => rInputRef.current);
  const msg = useTranslation();
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
  return /* @__PURE__ */ jsxs("div", { draggable: false, className: "tlui-input__wrapper", children: [
    children,
    label && /* @__PURE__ */ jsx("label", { children: msg(label) }),
    iconLeft && /* @__PURE__ */ jsx(Icon, { icon: iconLeft, className: "tlui-icon-left", small: true }),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: rInputRef,
        className: classNames("tlui-input", className),
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
    icon && /* @__PURE__ */ jsx(Icon, { icon, small: !!label })
  ] });
});
export {
  Input
};
//# sourceMappingURL=Input.mjs.map
