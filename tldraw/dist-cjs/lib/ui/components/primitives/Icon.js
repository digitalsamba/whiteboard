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
var Icon_exports = {};
__export(Icon_exports, {
  Icon: () => Icon
});
module.exports = __toCommonJS(Icon_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_classnames = __toESM(require("classnames"));
var import_react = require("react");
var import_useAssetUrls = require("../../hooks/useAssetUrls");
const Icon = (0, import_react.memo)(function Icon2({
  small,
  invertIcon,
  icon,
  color,
  className,
  ...props
}) {
  const assetUrls = (0, import_useAssetUrls.useAssetUrls)();
  const asset = assetUrls.icons[icon];
  const ref = (0, import_react.useRef)(null);
  (0, import_react.useLayoutEffect)(() => {
    if (ref?.current) {
      ref.current.style.webkitMask = `url(${asset}) center 100% / 100% no-repeat`;
    }
  }, [ref, asset]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ...props,
      ref,
      className: (0, import_classnames.default)("tlui-icon", { "tlui-icon__small": small }, className),
      style: {
        color,
        mask: `url(${asset}) center 100% / 100% no-repeat`,
        transform: invertIcon ? "scale(-1, 1)" : void 0
      }
    }
  );
});
//# sourceMappingURL=Icon.js.map
