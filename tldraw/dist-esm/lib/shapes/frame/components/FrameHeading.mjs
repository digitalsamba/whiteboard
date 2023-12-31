import { jsx } from "react/jsx-runtime";
import {
  canonicalizeRotation,
  getPointerInfo,
  toDomPrecision,
  useEditor,
  useIsEditing
} from "@tldraw/editor";
import { useCallback, useEffect, useRef } from "react";
import { FrameLabelInput } from "./FrameLabelInput.mjs";
const FrameHeading = function FrameHeading2({
  id,
  name,
  width,
  height
}) {
  const editor = useEditor();
  const pageRotation = canonicalizeRotation(editor.getShapePageTransform(id).rotation());
  const isEditing = useIsEditing(id);
  const rInput = useRef(null);
  const handlePointerDown = useCallback(
    (e) => {
      const event = getPointerInfo(e);
      editor.dispatch({
        type: "pointer",
        name: "pointer_down",
        target: "shape",
        shape: editor.getShape(id),
        ...event
      });
      e.preventDefault();
    },
    [editor, id]
  );
  useEffect(() => {
    const el = rInput.current;
    if (el && isEditing) {
      el.focus();
      el.select();
      requestAnimationFrame(() => {
        if (document.activeElement !== el) {
          el.focus();
          el.select();
        }
      });
    }
  }, [rInput, isEditing]);
  const offsetRotation = pageRotation + Math.PI / 4;
  const scaledRotation = (offsetRotation * (2 / Math.PI) + 4) % 4;
  const labelSide = ["top", "left", "bottom", "right"][Math.floor(scaledRotation)];
  let labelTranslate;
  switch (labelSide) {
    case "top":
      labelTranslate = ``;
      break;
    case "right":
      labelTranslate = `translate(${toDomPrecision(width)}px, 0px) rotate(90deg)`;
      break;
    case "bottom":
      labelTranslate = `translate(${toDomPrecision(width)}px, ${toDomPrecision(
        height
      )}px) rotate(180deg)`;
      break;
    case "left":
      labelTranslate = `translate(0px, ${toDomPrecision(height)}px) rotate(270deg)`;
      break;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "tl-frame-heading",
      style: {
        overflow: isEditing ? "visible" : "hidden",
        maxWidth: `calc(var(--tl-zoom) * ${labelSide === "top" || labelSide === "bottom" ? Math.ceil(width) : Math.ceil(height)}px + var(--space-5))`,
        bottom: Math.ceil(height),
        transform: `${labelTranslate} scale(var(--tl-scale)) translateX(calc(-1 * var(--space-3))`
      },
      onPointerDown: handlePointerDown,
      children: /* @__PURE__ */ jsx("div", { className: "tl-frame-heading-hit-area", children: /* @__PURE__ */ jsx(FrameLabelInput, { ref: rInput, id, name, isEditing }) })
    }
  );
};
export {
  FrameHeading
};
//# sourceMappingURL=FrameHeading.mjs.map
