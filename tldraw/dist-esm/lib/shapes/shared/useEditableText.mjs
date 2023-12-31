import {
  getPointerInfo,
  preventDefault,
  stopEventPropagation,
  useEditor,
  useValue
} from "@tldraw/editor";
import { useCallback, useEffect, useRef } from "react";
import { INDENT, TextHelpers } from "./TextHelpers.mjs";
function useEditableText(id, type, text) {
  const editor = useEditor();
  const rInput = useRef(null);
  const rSkipSelectOnFocus = useRef(false);
  const rSelectionRanges = useRef();
  const isEditing = useValue("isEditing", () => editor.editingShapeId === id, [editor, id]);
  const isEditingSameShapeType = useValue(
    "is editing same shape type",
    () => {
      const { editingShape } = editor;
      return editingShape && editingShape.type === type;
    },
    [type, id]
  );
  useEffect(() => {
    const elm = rInput.current;
    if (elm && isEditing && document.activeElement !== elm) {
      elm.focus();
    }
  }, [isEditing]);
  const handleFocus = useCallback(() => {
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
  const handleBlur = useCallback(() => {
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
  const handleKeyDown = useCallback(
    (e) => {
      if (!isEditing)
        return;
      if (e.ctrlKey || e.metaKey)
        stopEventPropagation(e);
      switch (e.key) {
        case "Enter": {
          if (e.ctrlKey || e.metaKey) {
            editor.complete();
          }
          break;
        }
        case "Tab": {
          preventDefault(e);
          if (e.shiftKey) {
            TextHelpers.unindent(e.currentTarget);
          } else {
            TextHelpers.indent(e.currentTarget);
          }
          break;
        }
      }
    },
    [editor, isEditing]
  );
  const handleChange = useCallback(
    (e) => {
      if (!isEditing)
        return;
      let text2 = TextHelpers.normalizeText(e.currentTarget.value);
      const untabbedText = text2.replace(/\t/g, INDENT);
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
  useEffect(() => {
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
  const handleInputPointerDown = useCallback(
    (e) => {
      const { editingShape } = editor;
      if (editingShape) {
        rSkipSelectOnFocus.current = type === editingShape.type;
      }
      editor.dispatch({
        ...getPointerInfo(e),
        type: "pointer",
        name: "pointer_down",
        target: "shape",
        shape: editor.getShape(id)
      });
      stopEventPropagation(e);
    },
    [editor, id, type]
  );
  const handleDoubleClick = stopEventPropagation;
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
export {
  useEditableText
};
//# sourceMappingURL=useEditableText.mjs.map
