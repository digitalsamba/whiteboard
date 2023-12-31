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
var ShapeIndicator_exports = {};
__export(ShapeIndicator_exports, {
  InnerIndicator: () => InnerIndicator,
  ShapeIndicator: () => ShapeIndicator
});
module.exports = __toCommonJS(ShapeIndicator_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_state = require("@tldraw/state");
var import_classnames = __toESM(require("classnames"));
var React = __toESM(require("react"));
var import__ = require("../..");
var import_useEditorComponents = require("../hooks/useEditorComponents");
var import_ErrorBoundary = require("./ErrorBoundary");
class ShapeWithPropsEquality {
  constructor(shape) {
    this.shape = shape;
  }
  equals(other) {
    return this.shape?.props === other?.shape?.props && this.shape?.meta === other?.shape?.meta;
  }
}
const EvenInnererIndicator = ({ shape, util }) => {
  return (0, import_state.useStateTracking)("Indicator:" + shape.type, () => util.indicator(shape));
};
const InnerIndicator = ({ editor, id }) => {
  const shape = (0, import_state.useValue)("shape", () => new ShapeWithPropsEquality(editor.store.get(id)), [
    editor,
    id
  ]);
  const { ShapeIndicatorErrorFallback } = (0, import_useEditorComponents.useEditorComponents)();
  if (!shape.shape || shape.shape.isLocked)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_ErrorBoundary.OptionalErrorBoundary,
    {
      fallback: ShapeIndicatorErrorFallback,
      onError: (error) => editor.annotateError(error, { origin: "react.shapeIndicator", willCrashApp: false }),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        EvenInnererIndicator,
        {
          shape: shape.shape,
          util: editor.getShapeUtil(shape.shape)
        },
        shape.shape.id
      )
    }
  );
};
const _ShapeIndicator = ({ id, className, color, opacity }) => {
  const editor = (0, import__.useEditor)();
  const transform = (0, import_state.useValue)(
    "transform",
    () => {
      const pageTransform = editor.getShapePageTransform(id);
      if (!pageTransform)
        return "";
      return pageTransform.toCssString();
    },
    [editor, id]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: (0, import_classnames.default)("tl-overlays__item", className), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "g",
    {
      className: "tl-shape-indicator",
      transform,
      stroke: color ?? "var(--color-selected)",
      opacity,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InnerIndicator, { editor, id })
    }
  ) });
};
const ShapeIndicator = React.memo(_ShapeIndicator);
//# sourceMappingURL=ShapeIndicator.js.map
