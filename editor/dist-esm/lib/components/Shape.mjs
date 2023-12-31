import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { track, useQuickReactor, useStateTracking } from "@tldraw/state";
import * as React from "react";
import { nearestMultiple } from "../hooks/useDPRMultiple.mjs";
import { useEditor } from "../hooks/useEditor.mjs";
import { useEditorComponents } from "../hooks/useEditorComponents.mjs";
import { Matrix2d } from "../primitives/Matrix2d.mjs";
import { OptionalErrorBoundary } from "./ErrorBoundary.mjs";
const Shape = track(function Shape2({
  id,
  shape,
  util,
  index,
  backgroundIndex,
  opacity,
  isCulled
}) {
  const editor = useEditor();
  const { ShapeErrorFallback } = useEditorComponents();
  const containerRef = React.useRef(null);
  const backgroundContainerRef = React.useRef(null);
  const setProperty = React.useCallback((property, value) => {
    containerRef.current?.style.setProperty(property, value);
    backgroundContainerRef.current?.style.setProperty(property, value);
  }, []);
  useQuickReactor(
    "set shape container transform position",
    () => {
      const shape2 = editor.getShape(id);
      if (!shape2)
        return;
      const pageTransform = editor.getShapePageTransform(id);
      const transform = Matrix2d.toCssString(pageTransform);
      setProperty("transform", transform);
    },
    [editor, setProperty]
  );
  useQuickReactor(
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
  useQuickReactor(
    "set shape height and width",
    () => {
      const shape2 = editor.getShape(id);
      if (!shape2)
        return null;
      const bounds = editor.getShapeGeometry(shape2).bounds;
      const dpr = editor.instanceState.devicePixelRatio;
      const dprMultiple = nearestMultiple(dpr);
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    util.backgroundComponent && /* @__PURE__ */ jsx(
      "div",
      {
        ref: backgroundContainerRef,
        className: "tl-shape tl-shape-background",
        "data-shape-type": shape.type,
        draggable: false,
        children: !isCulled && /* @__PURE__ */ jsx(OptionalErrorBoundary, { fallback: ShapeErrorFallback, onError: annotateError, children: /* @__PURE__ */ jsx(InnerShapeBackground, { shape, util }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { ref: containerRef, className: "tl-shape", "data-shape-type": shape.type, draggable: false, children: isCulled ? /* @__PURE__ */ jsx(CulledShape, { shape }) : /* @__PURE__ */ jsx(OptionalErrorBoundary, { fallback: ShapeErrorFallback, onError: annotateError, children: /* @__PURE__ */ jsx(InnerShape, { shape, util }) }) })
  ] });
});
const InnerShape = React.memo(
  function InnerShape2({ shape, util }) {
    return useStateTracking("InnerShape:" + shape.type, () => util.component(shape));
  },
  (prev, next) => prev.shape.props === next.shape.props && prev.shape.meta === next.shape.meta
);
const InnerShapeBackground = React.memo(
  function InnerShapeBackground2({
    shape,
    util
  }) {
    return useStateTracking("InnerShape:" + shape.type, () => util.backgroundComponent?.(shape));
  },
  (prev, next) => prev.shape.props === next.shape.props && prev.shape.meta === next.shape.meta
);
const CulledShape = React.memo(
  function CulledShape2({ shape }) {
    const editor = useEditor();
    const bounds = editor.getShapeGeometry(shape).bounds;
    return /* @__PURE__ */ jsx(
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
export {
  Shape
};
//# sourceMappingURL=Shape.mjs.map
