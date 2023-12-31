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
var Toasts_exports = {};
__export(Toasts_exports, {
  ToastViewport: () => ToastViewport,
  Toasts: () => Toasts
});
module.exports = __toCommonJS(Toasts_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var T = __toESM(require("@radix-ui/react-toast"));
var React = __toESM(require("react"));
var import_useToastsProvider = require("../hooks/useToastsProvider");
var import_useTranslation = require("../hooks/useTranslation/useTranslation");
var import_Button = require("./primitives/Button");
var import_Icon = require("./primitives/Icon");
function Toast({ toast }) {
  const { removeToast } = (0, import_useToastsProvider.useToasts)();
  const msg = (0, import_useTranslation.useTranslation)();
  const onOpenChange = (isOpen) => {
    if (!isOpen) {
      removeToast(toast.id);
    }
  };
  const hasActions = toast.actions && toast.actions.length > 0;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    T.Root,
    {
      onOpenChange,
      className: "tlui-toast__container",
      duration: toast.keepOpen ? Infinity : 5e3,
      children: [
        toast.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tlui-toast__icon", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Icon.Icon, { icon: toast.icon }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-toast__main", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-toast__content", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T.Title, { className: "tlui-toast__title", children: toast.title }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T.Description, { className: "tlui-toast__description", children: toast.description })
          ] }),
          toast.actions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-toast__actions", children: [
            toast.actions.map((action, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T.Action, { altText: action.label, asChild: true, onClick: action.onClick, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_Button.Button,
              {
                className: action.type === "warn" ? "tlui-button__warning" : "tlui-button__primary",
                children: action.label
              }
            ) }, i)),
            hasActions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T.Close, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Button.Button, { className: "tlui-toast__close", style: { marginLeft: "auto" }, children: toast.closeLabel ?? msg("toast.close") }) })
          ] })
        ] }),
        !hasActions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T.Close, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Button.Button, { className: "tlui-toast__close", children: toast.closeLabel ?? msg("toast.close") }) })
      ]
    }
  );
}
function _Toasts() {
  const { toasts } = (0, import_useToastsProvider.useToasts)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: toasts.map((toast) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast }, toast.id)) });
}
const Toasts = React.memo(_Toasts);
function ToastViewport() {
  const { toasts } = (0, import_useToastsProvider.useToasts)();
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T.ToastViewport, { className: "tlui-toast__viewport" });
}
//# sourceMappingURL=Toasts.js.map
