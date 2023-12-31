import { jsx, jsxs } from "react/jsx-runtime";
import { useEditor } from "@tldraw/editor";
import { forwardRef, useCallback } from "react";
import { defaultEmptyAs } from "../FrameShapeUtil.mjs";
const FrameLabelInput = forwardRef(({ id, name, isEditing }, ref) => {
  const editor = useEditor();
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.nativeEvent.isComposing) {
        e.stopPropagation();
        e.currentTarget.blur();
        editor.setEditingShape(null);
      }
    },
    [editor]
  );
  const handleBlur = useCallback(
    (e) => {
      const shape = editor.getShape(id);
      if (!shape)
        return;
      const name2 = shape.props.name;
      const value = e.currentTarget.value.trim();
      if (name2 === value)
        return;
      editor.updateShapes(
        [
          {
            id,
            type: "frame",
            props: { name: value }
          }
        ],
        { squashing: true }
      );
    },
    [id, editor]
  );
  const handleChange = useCallback(
    (e) => {
      const shape = editor.getShape(id);
      if (!shape)
        return;
      const name2 = shape.props.name;
      const value = e.currentTarget.value;
      if (name2 === value)
        return;
      editor.updateShapes(
        [
          {
            id,
            type: "frame",
            props: { name: value }
          }
        ],
        { squashing: true }
      );
    },
    [id, editor]
  );
  return /* @__PURE__ */ jsxs("div", { className: `tl-frame-label ${isEditing ? "tl-frame-label__editing" : ""}`, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        className: "tl-frame-name-input",
        ref,
        style: { display: isEditing ? void 0 : "none" },
        value: name,
        autoFocus: true,
        onKeyDown: handleKeyDown,
        onBlur: handleBlur,
        onChange: handleChange
      }
    ),
    defaultEmptyAs(name, "Frame") + String.fromCharCode(8203)
  ] });
});
export {
  FrameLabelInput
};
//# sourceMappingURL=FrameLabelInput.mjs.map
