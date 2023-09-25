"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var TrashButton_exports = {};
__export(TrashButton_exports, {
  TrashButton: () => TrashButton
});
module.exports = __toCommonJS(TrashButton_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_useActions = require("../hooks/useActions");
var import_useReadonly = require("../hooks/useReadonly");
var import_useTranslation = require("../hooks/useTranslation/useTranslation");
var import_Button = require("./primitives/Button");
var import_shared = require("./primitives/shared");
const TrashButton = (0, import_editor.track)(function TrashButton2() {
  const editor = (0, import_editor.useEditor)();
  const actions = (0, import_useActions.useActions)();
  const msg = (0, import_useTranslation.useTranslation)();
  const action = actions["delete"];
  const isReadonly = (0, import_useReadonly.useReadonly)();
  if (isReadonly)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_Button.Button,
    {
      icon: action.icon,
      onClick: () => action.onSelect("quick-actions"),
      disabled: !(editor.isIn("select") && editor.selectedShapeIds.length > 0),
      title: `${msg(action.label)} ${(0, import_shared.kbdStr)(action.kbd)}`,
      smallIcon: true
    }
  );
});
//# sourceMappingURL=TrashButton.js.map
