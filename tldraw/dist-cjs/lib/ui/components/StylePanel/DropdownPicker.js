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
var DropdownPicker_exports = {};
__export(DropdownPicker_exports, {
  DropdownPicker: () => DropdownPicker
});
module.exports = __toCommonJS(DropdownPicker_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react_dropdown_menu = require("@radix-ui/react-dropdown-menu");
var import_classnames = __toESM(require("classnames"));
var React = __toESM(require("react"));
var import_useTranslation = require("../../hooks/useTranslation/useTranslation");
var import_Button = require("../primitives/Button");
var DropdownMenu = __toESM(require("../primitives/DropdownMenu"));
const DropdownPicker = React.memo(function DropdownPicker2({
  id,
  label,
  uiType,
  style,
  items,
  value,
  onValueChange
}) {
  const msg = (0, import_useTranslation.useTranslation)();
  const icon = React.useMemo(
    () => items.find((item) => value.type === "shared" && item.value === value.value)?.icon,
    [items, value]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu.Root, { id: `style panel ${id}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_dropdown_menu.Trigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_Button.Button,
      {
        "data-testid": `style.${uiType}`,
        title: value.type === "mixed" ? msg("style-panel.mixed") : msg(`${uiType}-style.${value.value}`),
        label,
        icon: icon ?? "mixed"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenu.Content, { side: "left", align: "center", alignOffset: 0, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: (0, import_classnames.default)("tlui-button-grid", {
          "tlui-button-grid__two": items.length < 3,
          "tlui-button-grid__three": items.length == 3,
          "tlui-button-grid__four": items.length >= 4
        }),
        children: items.map((item) => {
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            DropdownMenu.Item,
            {
              className: "tlui-button-grid__button",
              "data-testid": `style.${uiType}.${item.value}`,
              title: msg(`${uiType}-style.${item.value}`),
              icon: item.icon,
              onClick: () => onValueChange(style, item.value, false)
            },
            item.value
          );
        })
      }
    ) })
  ] });
});
//# sourceMappingURL=DropdownPicker.js.map
