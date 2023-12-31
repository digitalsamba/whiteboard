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
var FrameHeading_exports = {};
__export(FrameHeading_exports, {
  FrameHeading: () => FrameHeading
});
module.exports = __toCommonJS(FrameHeading_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_react = require("react");
var import_FrameLabelInput = require("./FrameLabelInput");
const FrameHeading = function FrameHeading2({
  id,
  name,
  width,
  height
}) {
  const editor = (0, import_editor.useEditor)();
  const pageRotation = (0, import_editor.canonicalizeRotation)(editor.getShapePageTransform(id).rotation());
  const isEditing = (0, import_editor.useIsEditing)(id);
  const rInput = (0, import_react.useRef)(null);
  const handlePointerDown = (0, import_react.useCallback)(
    (e) => {
      const event = (0, import_editor.getPointerInfo)(e);
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
  (0, import_react.useEffect)(() => {
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
      labelTranslate = `translate(${(0, import_editor.toDomPrecision)(width)}px, 0px) rotate(90deg)`;
      break;
    case "bottom":
      labelTranslate = `translate(${(0, import_editor.toDomPrecision)(width)}px, ${(0, import_editor.toDomPrecision)(
        height
      )}px) rotate(180deg)`;
      break;
    case "left":
      labelTranslate = `translate(0px, ${(0, import_editor.toDomPrecision)(height)}px) rotate(270deg)`;
      break;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tl-frame-heading-hit-area", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_FrameLabelInput.FrameLabelInput, { ref: rInput, id, name, isEditing }) })
    }
  );
};
//# sourceMappingURL=FrameHeading.js.map
