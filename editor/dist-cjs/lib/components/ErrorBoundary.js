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
var ErrorBoundary_exports = {};
__export(ErrorBoundary_exports, {
  ErrorBoundary: () => ErrorBoundary,
  OptionalErrorBoundary: () => OptionalErrorBoundary
});
module.exports = __toCommonJS(ErrorBoundary_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var React = __toESM(require("react"));
const initialState = { error: null };
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return { error };
  }
  state = initialState;
  componentDidCatch(error) {
    this.props.onError?.(error);
  }
  render() {
    const { error } = this.state;
    if (error !== null) {
      const { fallback: Fallback } = this.props;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fallback, { error });
    }
    return this.props.children;
  }
}
function OptionalErrorBoundary({
  children,
  fallback,
  ...props
}) {
  if (fallback === null) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, { fallback, ...props, children });
}
//# sourceMappingURL=ErrorBoundary.js.map
