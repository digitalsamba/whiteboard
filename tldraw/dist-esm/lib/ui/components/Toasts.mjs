import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as T from "@radix-ui/react-toast";
import * as React from "react";
import { useToasts } from "../hooks/useToastsProvider.mjs";
import { useTranslation } from "../hooks/useTranslation/useTranslation.mjs";
import { Button } from "./primitives/Button.mjs";
import { Icon } from "./primitives/Icon.mjs";
function Toast({ toast }) {
  const { removeToast } = useToasts();
  const msg = useTranslation();
  const onOpenChange = (isOpen) => {
    if (!isOpen) {
      removeToast(toast.id);
    }
  };
  const hasActions = toast.actions && toast.actions.length > 0;
  return /* @__PURE__ */ jsxs(
    T.Root,
    {
      onOpenChange,
      className: "tlui-toast__container",
      duration: toast.keepOpen ? Infinity : 5e3,
      children: [
        toast.icon && /* @__PURE__ */ jsx("div", { className: "tlui-toast__icon", children: /* @__PURE__ */ jsx(Icon, { icon: toast.icon }) }),
        /* @__PURE__ */ jsxs("div", { className: "tlui-toast__main", children: [
          /* @__PURE__ */ jsxs("div", { className: "tlui-toast__content", children: [
            /* @__PURE__ */ jsx(T.Title, { className: "tlui-toast__title", children: toast.title }),
            /* @__PURE__ */ jsx(T.Description, { className: "tlui-toast__description", children: toast.description })
          ] }),
          toast.actions && /* @__PURE__ */ jsxs("div", { className: "tlui-toast__actions", children: [
            toast.actions.map((action, i) => /* @__PURE__ */ jsx(T.Action, { altText: action.label, asChild: true, onClick: action.onClick, children: /* @__PURE__ */ jsx(
              Button,
              {
                className: action.type === "warn" ? "tlui-button__warning" : "tlui-button__primary",
                children: action.label
              }
            ) }, i)),
            hasActions && /* @__PURE__ */ jsx(T.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { className: "tlui-toast__close", style: { marginLeft: "auto" }, children: toast.closeLabel ?? msg("toast.close") }) })
          ] })
        ] }),
        !hasActions && /* @__PURE__ */ jsx(T.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { className: "tlui-toast__close", children: toast.closeLabel ?? msg("toast.close") }) })
      ]
    }
  );
}
function _Toasts() {
  const { toasts } = useToasts();
  return /* @__PURE__ */ jsx(Fragment, { children: toasts.map((toast) => /* @__PURE__ */ jsx(Toast, { toast }, toast.id)) });
}
const Toasts = React.memo(_Toasts);
function ToastViewport() {
  const { toasts } = useToasts();
  const [hasToasts, setHasToasts] = React.useState(false);
  React.useEffect(() => {
    let cancelled = false;
    if (toasts.length) {
      setHasToasts(true);
    } else {
      setTimeout(() => {
        if (!cancelled) {
          setHasToasts(false);
        }
      }, 1e3);
    }
    return () => {
      cancelled = true;
    };
  }, [toasts.length, setHasToasts]);
  if (!hasToasts)
    return null;
  return /* @__PURE__ */ jsx(T.ToastViewport, { className: "tlui-toast__viewport" });
}
export {
  ToastViewport,
  Toasts
};
//# sourceMappingURL=Toasts.mjs.map
