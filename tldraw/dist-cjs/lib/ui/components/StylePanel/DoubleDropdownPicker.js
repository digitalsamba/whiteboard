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
var DoubleDropdownPicker_exports = {};
__export(DoubleDropdownPicker_exports, {
  DoubleDropdownPicker: () => DoubleDropdownPicker
});
module.exports = __toCommonJS(DoubleDropdownPicker_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react_dropdown_menu = require("@radix-ui/react-dropdown-menu");
var import_classnames = __toESM(require("classnames"));
var React = __toESM(require("react"));
var import_useTranslation = require("../../hooks/useTranslation/useTranslation");
var import_Button = require("../primitives/Button");
var DropdownMenu = __toESM(require("../primitives/DropdownMenu"));
const DoubleDropdownPicker = React.memo(function DoubleDropdownPicker2({
  label,
  uiTypeA,
  uiTypeB,
  labelA,
  labelB,
  itemsA,
  itemsB,
  styleA,
  styleB,
  valueA,
  valueB,
  onValueChange
}) {
  const msg = (0, import_useTranslation.useTranslation)();
  const iconA = React.useMemo(
    () => itemsA.find((item) => valueA.type === "shared" && valueA.value === item.value)?.icon ?? "mixed",
    [itemsA, valueA]
  );
  const iconB = React.useMemo(
    () => itemsB.find((item) => valueB.type === "shared" && valueB.value === item.value)?.icon ?? "mixed",
    [itemsB, valueB]
  );
  if (valueA === void 0 && valueB === void 0)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-style-panel__double-select-picker", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { title: msg(label), className: "tlui-style-panel__double-select-picker-label", children: msg(label) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu.Root, { id: `style panel ${uiTypeA} A`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_dropdown_menu.Trigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_Button.Button,
        {
          "data-testid": `style.${uiTypeA}`,
          title: msg(labelA) + " \u2014 " + (valueA === null ? msg("style-panel.mixed") : msg(`${uiTypeA}-style.${valueA}`)),
          icon: iconA,
          invertIcon: true,
          smallIcon: true
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenu.Content, { side: "bottom", align: "end", sideOffset: 0, alignOffset: -2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: (0, import_classnames.default)("tlui-button-grid", {
            "tlui-button-grid__two": itemsA.length < 4,
            "tlui-button-grid__four": itemsA.length >= 4
          }),
          children: itemsA.map((item) => {
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              DropdownMenu.Item,
              {
                className: "tlui-button-grid__button",
                title: msg(labelA) + " \u2014 " + msg(`${uiTypeA}-style.${item.value}`),
                "data-testid": `style.${uiTypeA}.${item.value}`,
                icon: item.icon,
                onClick: () => onValueChange(styleA, item.value, false),
                invertIcon: true
              },
              item.value
            );
          })
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu.Root, { id: `style panel ${uiTypeB}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_dropdown_menu.Trigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_Button.Button,
        {
          "data-testid": `style.${uiTypeB}`,
          title: msg(labelB) + " \u2014 " + (valueB === null ? msg("style-panel.mixed") : msg(`${uiTypeB}-style.${valueB}`)),
          icon: iconB,
          smallIcon: true
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenu.Content, { side: "bottom", align: "end", sideOffset: 0, alignOffset: -2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: (0, import_classnames.default)("tlui-button-grid", {
            "tlui-button-grid__two": itemsA.length < 4,
            "tlui-button-grid__four": itemsA.length >= 4
          }),
          children: itemsB.map((item) => {
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              DropdownMenu.Item,
              {
                className: "tlui-button-grid__button",
                title: msg(labelB) + " \u2014 " + msg(`${uiTypeB}-style.${item.value}`),
                "data-testid": `style.${uiTypeB}.${item.value}`,
                icon: item.icon,
                onClick: () => onValueChange(styleB, item.value, false)
              },
              item.value
            );
          })
        }
      ) })
    ] })
  ] });
});
//# sourceMappingURL=DoubleDropdownPicker.js.map
