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
var useEditableText_exports = {};
__export(useEditableText_exports, {
  useEditableText: () => useEditableText
});
module.exports = __toCommonJS(useEditableText_exports);
var import_editor = require("@tldraw/editor");
var import_react = require("react");
var import_TextHelpers = require("./TextHelpers");
function useEditableText(id, type, text) {
  const editor = (0, import_editor.useEditor)();
  const rInput = (0, import_react.useRef)(null);
  const rSkipSelectOnFocus = (0, import_react.useRef)(false);
  const rSelectionRanges = (0, import_react.useRef)();
  const isEditing = (0, import_editor.useValue)("isEditing", () => editor.editingShapeId === id, [editor, id]);
  const isEditingSameShapeType = (0, import_editor.useValue)(
    "is editing same shape type",
    () => {
      const { editingShape } = editor;
      return editingShape && editingShape.type === type;
    },
    [type, id]
  );
  (0, import_react.useEffect)(() => {
    const elm = rInput.current;
    if (elm && isEditing && document.activeElement !== elm) {
      elm.focus();
    }
  }, [isEditing]);
  const handleFocus = (0, import_react.useCallback)(() => {
    const skipSelect = rSkipSelectOnFocus.current;
    rSkipSelectOnFocus.current = false;
    requestAnimationFrame(() => {
      const elm = rInput.current;
      if (!elm)
        return;
      const shape = editor.getShape(id);
      if (shape) {
        elm.value = shape.props.text;
        if (elm.value.length && !skipSelect) {
          elm.select();
        }
      }
    });
  }, [editor, id]);
  const handleBlur = (0, import_react.useCallback)(() => {
    const ranges = rSelectionRanges.current;
    requestAnimationFrame(() => {
      const elm = rInput.current;
      const { editingShapeId } = editor;
      if (elm && editingShapeId) {
        if (editingShapeId === id) {
          if (ranges) {
            if (!ranges.length) {
              elm.focus();
            } else {
              rSkipSelectOnFocus.current = true;
              elm.focus();
              const selection = window.getSelection();
              if (selection) {
                ranges.forEach((range) => selection.addRange(range));
              }
            }
          } else {
            elm.focus();
          }
        }
      } else {
        window.getSelection()?.removeAllRanges();
        editor.complete();
      }
    });
  }, [editor, id]);
  const handleKeyDown = (0, import_react.useCallback)(
    (e) => {
      if (!isEditing)
        return;
      if (e.ctrlKey || e.metaKey)
        (0, import_editor.stopEventPropagation)(e);
      switch (e.key) {
        case "Enter": {
          if (e.ctrlKey || e.metaKey) {
            editor.complete();
          }
          break;
        }
        case "Tab": {
          (0, import_editor.preventDefault)(e);
          if (e.shiftKey) {
            import_TextHelpers.TextHelpers.unindent(e.currentTarget);
          } else {
            import_TextHelpers.TextHelpers.indent(e.currentTarget);
          }
          break;
        }
      }
    },
    [editor, isEditing]
  );
  const handleChange = (0, import_react.useCallback)(
    (e) => {
      if (!isEditing)
        return;
      let text2 = import_TextHelpers.TextHelpers.normalizeText(e.currentTarget.value);
      const untabbedText = text2.replace(/\t/g, import_TextHelpers.INDENT);
      if (untabbedText !== text2) {
        const selectionStart = e.currentTarget.selectionStart;
        e.currentTarget.value = untabbedText;
        e.currentTarget.selectionStart = selectionStart + (untabbedText.length - text2.length);
        e.currentTarget.selectionEnd = selectionStart + (untabbedText.length - text2.length);
        text2 = untabbedText;
      }
      editor.updateShapes([
        { id, type, props: { text: text2 } }
      ]);
    },
    [editor, id, type, isEditing]
  );
  const isEmpty = text.trim().length === 0;
  (0, import_react.useEffect)(() => {
    if (!isEditing)
      return;
    const elm = rInput.current;
    if (elm) {
      let updateSelection2 = function() {
        const selection = window.getSelection?.();
        if (selection && selection.type !== "None") {
          const ranges = [];
          if (selection) {
            for (let i = 0; i < selection.rangeCount; i++) {
              ranges.push(selection.getRangeAt?.(i));
            }
          }
          rSelectionRanges.current = ranges;
        }
      };
      var updateSelection = updateSelection2;
      document.addEventListener("selectionchange", updateSelection2);
      return () => {
        document.removeEventListener("selectionchange", updateSelection2);
      };
    }
  }, [isEditing]);
  const handleInputPointerDown = (0, import_react.useCallback)(
    (e) => {
      const { editingShape } = editor;
      if (editingShape) {
        rSkipSelectOnFocus.current = type === editingShape.type;
      }
      editor.dispatch({
        ...(0, import_editor.getPointerInfo)(e),
        type: "pointer",
        name: "pointer_down",
        target: "shape",
        shape: editor.getShape(id)
      });
      (0, import_editor.stopEventPropagation)(e);
    },
    [editor, id, type]
  );
  const handleDoubleClick = import_editor.stopEventPropagation;
  return {
    rInput,
    isEditing,
    isEditingSameShapeType,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleChange,
    handleInputPointerDown,
    handleDoubleClick,
    isEmpty
  };
}
//# sourceMappingURL=useEditableText.js.map
