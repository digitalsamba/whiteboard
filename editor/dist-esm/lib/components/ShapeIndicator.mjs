import { jsx } from "react/jsx-runtime";
import { useStateTracking, useValue } from "@tldraw/state";
import classNames from "classnames";
import * as React from "react";
import { useEditor } from "../../index.mjs";
import { useEditorComponents } from "../hooks/useEditorComponents.mjs";
import { OptionalErrorBoundary } from "./ErrorBoundary.mjs";
class ShapeWithPropsEquality {
  constructor(shape) {
    this.shape = shape;
  }
  equals(other) {
    return this.shape?.props === other?.shape?.props && this.shape?.meta === other?.shape?.meta;
  }
}
const EvenInnererIndicator = ({ shape, util }) => {
  return useStateTracking("Indicator:" + shape.type, () => util.indicator(shape));
};
const InnerIndicator = ({ editor, id }) => {
  const shape = useValue("shape", () => new ShapeWithPropsEquality(editor.store.get(id)), [
    editor,
    id
  ]);
  const { ShapeIndicatorErrorFallback } = useEditorComponents();
  if (!shape.shape || shape.shape.isLocked)
    return null;
  return /* @__PURE__ */ jsx(
    OptionalErrorBoundary,
    {
      fallback: ShapeIndicatorErrorFallback,
      onError: (error) => editor.annotateError(error, { origin: "react.shapeIndicator", willCrashApp: false }),
      children: /* @__PURE__ */ jsx(
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
  const editor = useEditor();
  const transform = useValue(
    "transform",
    () => {
      const pageTransform = editor.getShapePageTransform(id);
      if (!pageTransform)
        return "";
      return pageTransform.toCssString();
    },
    [editor, id]
  );
  return /* @__PURE__ */ jsx("svg", { className: classNames("tl-overlays__item", className), children: /* @__PURE__ */ jsx(
    "g",
    {
      className: "tl-shape-indicator",
      transform,
      stroke: color ?? "var(--color-selected)",
      opacity,
      children: /* @__PURE__ */ jsx(InnerIndicator, { editor, id })
    }
  ) });
};
const ShapeIndicator = React.memo(_ShapeIndicator);
export {
  InnerIndicator,
  ShapeIndicator
};
//# sourceMappingURL=ShapeIndicator.mjs.map
