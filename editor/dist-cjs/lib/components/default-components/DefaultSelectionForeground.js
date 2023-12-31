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
var DefaultSelectionForeground_exports = {};
__export(DefaultSelectionForeground_exports, {
  DefaultSelectionForeground: () => DefaultSelectionForeground
});
module.exports = __toCommonJS(DefaultSelectionForeground_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_state = require("@tldraw/state");
var import_classnames = __toESM(require("classnames"));
var import_react = require("react");
var import_useEditor = require("../../hooks/useEditor");
var import_useTransform = require("../../hooks/useTransform");
var import_utils = require("../../primitives/utils");
const DefaultSelectionForeground = ({
  bounds,
  rotation
}) => {
  const editor = (0, import_useEditor.useEditor)();
  const rSvg = (0, import_react.useRef)(null);
  const onlyShape = (0, import_state.useValue)("only selected shape", () => editor.onlySelectedShape, [editor]);
  const expandOutlineBy = onlyShape ? editor.getShapeUtil(onlyShape).expandSelectionOutlinePx(onlyShape) : 0;
  (0, import_useTransform.useTransform)(rSvg, bounds?.x, bounds?.y, 1, rotation, {
    x: -expandOutlineBy,
    y: -expandOutlineBy
  });
  bounds = bounds.clone().expandBy(expandOutlineBy).zeroFix();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      ref: rSvg,
      className: "tl-overlays__item tl-selection__fg",
      "data-testid": "selection-foreground",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "rect",
        {
          className: (0, import_classnames.default)("tl-selection__fg__outline"),
          width: (0, import_utils.toDomPrecision)(bounds.width),
          height: (0, import_utils.toDomPrecision)(bounds.height)
        }
      )
    }
  );
};
//# sourceMappingURL=DefaultSelectionForeground.js.map
