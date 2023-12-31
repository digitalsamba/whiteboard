import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { isValidUrl, track, useEditor } from "@tldraw/editor";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "../hooks/useTranslation/useTranslation.mjs";
import { Button } from "./primitives/Button.mjs";
import * as Dialog from "./primitives/Dialog.mjs";
import { Input } from "./primitives/Input.mjs";
function validateUrl(url) {
  if (isValidUrl(url)) {
    return { isValid: true, hasProtocol: true };
  }
  if (isValidUrl("https://" + url)) {
    return { isValid: true, hasProtocol: false };
  }
  return { isValid: false, hasProtocol: false };
}
const EditLinkDialog = track(function EditLinkDialog2({ onClose }) {
  const editor = useEditor();
  const selectedShape = editor.onlySelectedShape;
  if (!(selectedShape && "url" in selectedShape.props && typeof selectedShape.props.url === "string")) {
    return null;
  }
  return /* @__PURE__ */ jsx(EditLinkDialogInner, { onClose, selectedShape });
});
const EditLinkDialogInner = track(function EditLinkDialogInner2({
  onClose,
  selectedShape
}) {
  const editor = useEditor();
  const msg = useTranslation();
  const rInput = useRef(null);
  useEffect(() => {
    requestAnimationFrame(() => rInput.current?.focus());
  }, []);
  const rInitialValue = useRef(selectedShape.props.url);
  const [urlInputState, setUrlInputState] = useState(() => {
    const urlValidResult = validateUrl(selectedShape.props.url);
    const initialValue = urlValidResult.isValid === true ? urlValidResult.hasProtocol ? selectedShape.props.url : "https://" + selectedShape.props.url : "https://";
    return {
      actual: initialValue,
      safe: initialValue,
      valid: true
    };
  });
  const handleChange = useCallback((rawValue) => {
    const fixedRawValue = rawValue.replace(/https?:\/\/(https?:\/\/)/, (_match, arg1) => {
      return arg1;
    });
    const urlValidResult = validateUrl(fixedRawValue);
    const safeValue = urlValidResult.isValid === true ? urlValidResult.hasProtocol ? fixedRawValue : "https://" + fixedRawValue : "https://";
    setUrlInputState({
      actual: fixedRawValue,
      safe: safeValue,
      valid: urlValidResult.isValid
    });
  }, []);
  const handleClear = useCallback(() => {
    const { onlySelectedShape } = editor;
    if (!onlySelectedShape)
      return;
    editor.updateShapes([
      { id: onlySelectedShape.id, type: onlySelectedShape.type, props: { url: "" } }
    ]);
    onClose();
  }, [editor, onClose]);
  const handleComplete = useCallback(() => {
    const { onlySelectedShape } = editor;
    if (!onlySelectedShape)
      return;
    if (onlySelectedShape && "url" in onlySelectedShape.props) {
      if (onlySelectedShape.props.url !== urlInputState.safe) {
        editor.updateShapes([
          {
            id: onlySelectedShape.id,
            type: onlySelectedShape.type,
            props: { url: urlInputState.safe }
          }
        ]);
      }
    }
    onClose();
  }, [editor, onClose, urlInputState]);
  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);
  if (!selectedShape) {
    onClose();
    return null;
  }
  const isRemoving = rInitialValue.current && !urlInputState.valid;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Dialog.Header, { children: [
      /* @__PURE__ */ jsx(Dialog.Title, { children: msg("edit-link-dialog.title") }),
      /* @__PURE__ */ jsx(Dialog.CloseButton, {})
    ] }),
    /* @__PURE__ */ jsx(Dialog.Body, { children: /* @__PURE__ */ jsxs("div", { className: "tlui-edit-link-dialog", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          ref: rInput,
          className: "tlui-edit-link-dialog__input",
          label: "edit-link-dialog.url",
          autofocus: true,
          value: urlInputState.actual,
          onValueChange: handleChange,
          onComplete: handleComplete,
          onCancel: handleCancel
        }
      ),
      /* @__PURE__ */ jsx("div", { children: urlInputState.valid ? msg("edit-link-dialog.detail") : msg("edit-link-dialog.invalid-url") })
    ] }) }),
    /* @__PURE__ */ jsxs(Dialog.Footer, { className: "tlui-dialog__footer__actions", children: [
      /* @__PURE__ */ jsx(Button, { onClick: handleCancel, onTouchEnd: handleCancel, children: msg("edit-link-dialog.cancel") }),
      isRemoving ? /* @__PURE__ */ jsx(Button, { type: "danger", onTouchEnd: handleClear, onClick: handleClear, children: msg("edit-link-dialog.clear") }) : /* @__PURE__ */ jsx(
        Button,
        {
          type: "primary",
          disabled: !urlInputState.valid,
          onTouchEnd: handleComplete,
          onClick: handleComplete,
          children: msg("edit-link-dialog.save")
        }
      )
    ] })
  ] });
});
export {
  EditLinkDialog,
  EditLinkDialogInner
};
//# sourceMappingURL=EditLinkDialog.mjs.map
