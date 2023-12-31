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
var Shape_exports = {};
__export(Shape_exports, {
  Shape: () => Shape
});
module.exports = __toCommonJS(Shape_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_state = require("@tldraw/state");
var React = __toESM(require("react"));
var import_useDPRMultiple = require("../hooks/useDPRMultiple");
var import_useEditor = require("../hooks/useEditor");
var import_useEditorComponents = require("../hooks/useEditorComponents");
var import_Matrix2d = require("../primitives/Matrix2d");
var import_ErrorBoundary = require("./ErrorBoundary");
const Shape = (0, import_state.track)(function Shape2({
  id,
  shape,
  util,
  index,
  backgroundIndex,
  opacity,
  isCulled
}) {
  const editor = (0, import_useEditor.useEditor)();
  const { ShapeErrorFallback } = (0, import_useEditorComponents.useEditorComponents)();
  const containerRef = React.useRef(null);
  const backgroundContainerRef = React.useRef(null);
  const setProperty = React.useCallback((property, value) => {
    containerRef.current?.style.setProperty(property, value);
    backgroundContainerRef.current?.style.setProperty(property, value);
  }, []);
  (0, import_state.useQuickReactor)(
    "set shape container transform position",
    () => {
      const shape2 = editor.getShape(id);
      if (!shape2)
        return;
      const pageTransform = editor.getShapePageTransform(id);
      const transform = import_Matrix2d.Matrix2d.toCssString(pageTransform);
      setProperty("transform", transform);
    },
    [editor, setProperty]
  );
  (0, import_state.useQuickReactor)(
    "set shape container clip path",
    () => {
      const shape2 = editor.getShape(id);
      if (!shape2)
        return null;
      const clipPath = editor.getShapeClipPath(id);
      setProperty("clip-path", clipPath ?? "none");
    },
    [editor, setProperty]
  );
  (0, import_state.useQuickReactor)(
    "set shape height and width",
    () => {
      const shape2 = editor.getShape(id);
      if (!shape2)
        return null;
      const bounds = editor.getShapeGeometry(shape2).bounds;
      const dpr = editor.instanceState.devicePixelRatio;
      const dprMultiple = (0, import_useDPRMultiple.nearestMultiple)(dpr);
      const widthRemainder = bounds.w % dprMultiple;
      const width = widthRemainder === 0 ? bounds.w : bounds.w + (dprMultiple - widthRemainder);
      const heightRemainder = bounds.h % dprMultiple;
      const height = heightRemainder === 0 ? bounds.h : bounds.h + (dprMultiple - heightRemainder);
      setProperty("width", Math.max(width, dprMultiple) + "px");
      setProperty("height", Math.max(height, dprMultiple) + "px");
    },
    [editor]
  );
  React.useLayoutEffect(() => {
    setProperty("opacity", opacity + "");
    containerRef.current?.style.setProperty("z-index", index + "");
    backgroundContainerRef.current?.style.setProperty("z-index", backgroundIndex + "");
  }, [opacity, index, backgroundIndex, setProperty]);
  const annotateError = React.useCallback(
    (error) => {
      editor.annotateError(error, { origin: "react.shape", willCrashApp: false });
    },
    [editor]
  );
  if (!shape)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    util.backgroundComponent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref: backgroundContainerRef,
        className: "tl-shape tl-shape-background",
        "data-shape-type": shape.type,
        draggable: false,
        children: !isCulled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ErrorBoundary.OptionalErrorBoundary, { fallback: ShapeErrorFallback, onError: annotateError, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InnerShapeBackground, { shape, util }) })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: containerRef, className: "tl-shape", "data-shape-type": shape.type, draggable: false, children: isCulled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CulledShape, { shape }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ErrorBoundary.OptionalErrorBoundary, { fallback: ShapeErrorFallback, onError: annotateError, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InnerShape, { shape, util }) }) })
  ] });
});
const InnerShape = React.memo(
  function InnerShape2({ shape, util }) {
    return (0, import_state.useStateTracking)("InnerShape:" + shape.type, () => util.component(shape));
  },
  (prev, next) => prev.shape.props === next.shape.props && prev.shape.meta === next.shape.meta
);
const InnerShapeBackground = React.memo(
  function InnerShapeBackground2({
    shape,
    util
  }) {
    return (0, import_state.useStateTracking)("InnerShape:" + shape.type, () => util.backgroundComponent?.(shape));
  },
  (prev, next) => prev.shape.props === next.shape.props && prev.shape.meta === next.shape.meta
);
const CulledShape = React.memo(
  function CulledShape2({ shape }) {
    const editor = (0, import_useEditor.useEditor)();
    const bounds = editor.getShapeGeometry(shape).bounds;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: "tl-shape__culled",
        style: {
          transform: `translate(${bounds.minX}px, ${bounds.minY}px)`,
          width: Math.max(1, bounds.width),
          height: Math.max(1, bounds.height)
        }
      }
    );
  },
  () => true
);
//# sourceMappingURL=Shape.js.map
