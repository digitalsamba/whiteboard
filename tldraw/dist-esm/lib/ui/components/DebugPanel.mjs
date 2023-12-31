import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import {
  createShapeId,
  debugFlags,
  featureFlags,
  hardResetEditor,
  track,
  uniqueId,
  useEditor,
  useValue
} from "@tldraw/editor";
import * as React from "react";
import { useDialogs } from "../hooks/useDialogsProvider.mjs";
import { useToasts } from "../hooks/useToastsProvider.mjs";
import { useTranslation } from "../hooks/useTranslation/useTranslation.mjs";
import { Button } from "./primitives/Button.mjs";
import * as Dialog from "./primitives/Dialog.mjs";
import * as DropdownMenu from "./primitives/DropdownMenu.mjs";
let t = 0;
function createNShapes(editor, n) {
  const shapesToCreate = Array(n);
  const cols = Math.floor(Math.sqrt(n));
  for (let i = 0; i < n; i++) {
    t++;
    shapesToCreate[i] = {
      id: createShapeId("box" + t),
      type: "geo",
      x: i % cols * 132,
      y: Math.floor(i / cols) * 132
    };
  }
  editor.batch(() => {
    editor.createShapes(shapesToCreate).setSelectedShapes(shapesToCreate.map((s) => s.id));
  });
}
const DebugPanel = React.memo(function DebugPanel2({
  renderDebugMenuItems
}) {
  const msg = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "tlui-debug-panel", children: [
    /* @__PURE__ */ jsx(CurrentState, {}),
    /* @__PURE__ */ jsx(ShapeCount, {}),
    /* @__PURE__ */ jsxs(DropdownMenu.Root, { id: "debug", children: [
      /* @__PURE__ */ jsx(DropdownMenu.Trigger, { children: /* @__PURE__ */ jsx(Button, { icon: "dots-horizontal", title: msg("debug-panel.more") }) }),
      /* @__PURE__ */ jsx(DropdownMenu.Content, { side: "top", align: "end", alignOffset: 0, children: /* @__PURE__ */ jsx(DebugMenuContent, { renderDebugMenuItems }) })
    ] })
  ] });
});
const CurrentState = track(function CurrentState2() {
  const editor = useEditor();
  return /* @__PURE__ */ jsx("div", { className: "tlui-debug-panel__current-state", children: editor.root.path.value });
});
const ShapeCount = function ShapeCount2() {
  const editor = useEditor();
  const count = useValue("rendering shapes count", () => editor.renderingShapes.length, [editor]);
  return /* @__PURE__ */ jsxs("div", { children: [
    count,
    " Shapes"
  ] });
};
const DebugMenuContent = track(function DebugMenuContent2({
  renderDebugMenuItems
}) {
  const editor = useEditor();
  const { addToast } = useToasts();
  const { addDialog } = useDialogs();
  const [error, setError] = React.useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(DropdownMenu.Group, { children: [
      /* @__PURE__ */ jsx(
        DropdownMenu.Item,
        {
          onClick: () => {
            addToast({
              id: uniqueId(),
              title: "Something happened",
              description: "Hey, attend to this thing over here. It might be important!"
              // icon?: string
              // title?: string
              // description?: string
              // actions?: TLUiToastAction[]
            });
          },
          children: /* @__PURE__ */ jsx("span", { children: "Show toast" })
        }
      ),
      /* @__PURE__ */ jsx(
        DropdownMenu.Item,
        {
          onClick: () => {
            addDialog({
              component: ({ onClose }) => /* @__PURE__ */ jsx(
                ExampleDialog,
                {
                  displayDontShowAgain: true,
                  onCancel: () => {
                    onClose();
                  },
                  onContinue: () => {
                    onClose();
                  }
                }
              ),
              onClose: () => {
              }
            });
          },
          children: /* @__PURE__ */ jsx("span", { children: "Show dialog" })
        }
      ),
      /* @__PURE__ */ jsx(DropdownMenu.Item, { onClick: () => createNShapes(editor, 100), children: /* @__PURE__ */ jsx("span", { children: "Create 100 shapes" }) }),
      /* @__PURE__ */ jsx(
        DropdownMenu.Item,
        {
          onClick: () => {
            function countDescendants({ children }) {
              let count = 0;
              if (!children.length)
                return 0;
              for (const el of [...children]) {
                count++;
                count += countDescendants(el);
              }
              return count;
            }
            const { selectedShapes } = editor;
            const shapes = selectedShapes.length === 0 ? editor.renderingShapes : selectedShapes;
            const elms = shapes.map(
              (shape) => document.getElementById(shape.id).parentElement
            );
            let descendants = elms.length;
            for (const elm of elms) {
              descendants += countDescendants(elm);
            }
            window.alert(`Shapes ${shapes.length}, DOM nodes:${descendants}`);
          },
          children: /* @__PURE__ */ jsx("span", { children: "Count shapes and nodes" })
        }
      ),
      (() => {
        if (error)
          throw Error("oh no!");
      })(),
      /* @__PURE__ */ jsx(
        DropdownMenu.Item,
        {
          onClick: () => {
            setError(true);
          },
          children: /* @__PURE__ */ jsx("span", { children: "Throw error" })
        }
      ),
      /* @__PURE__ */ jsx(
        DropdownMenu.Item,
        {
          onClick: () => {
            hardResetEditor();
          },
          children: /* @__PURE__ */ jsx("span", { children: "Hard reset" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(DropdownMenu.Group, { children: [
      /* @__PURE__ */ jsx(DebugFlagToggle, { flag: debugFlags.debugSvg }),
      /* @__PURE__ */ jsx(DebugFlagToggle, { flag: debugFlags.forceSrgb }),
      /* @__PURE__ */ jsx(
        DebugFlagToggle,
        {
          flag: debugFlags.debugCursors,
          onChange: (enabled) => {
            if (enabled) {
              const MAX_COLUMNS = 5;
              const partials = CURSOR_NAMES.map((name, i) => {
                return {
                  id: createShapeId(),
                  type: "geo",
                  x: i % MAX_COLUMNS * 175,
                  y: Math.floor(i / MAX_COLUMNS) * 175,
                  props: {
                    text: name,
                    w: 150,
                    h: 150,
                    fill: "semi"
                  }
                };
              });
              editor.createShapes(partials);
            }
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsx(DropdownMenu.Group, { children: Object.values(featureFlags).map((flag) => {
      return /* @__PURE__ */ jsx(DebugFlagToggle, { flag }, flag.name);
    }) }),
    renderDebugMenuItems?.()
  ] });
});
function Toggle({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsx(DropdownMenu.CheckboxItem, { title: label, checked: value, onSelect: () => onChange(!value), children: label });
}
const DebugFlagToggle = track(function DebugFlagToggle2({
  flag,
  onChange
}) {
  return (
    /* @__PURE__ */ jsx(
      Toggle,
      {
        label: flag.name.replace(/([a-z0-9])([A-Z])/g, (m) => `${m[0]} ${m[1].toLowerCase()}`).replace(/^[a-z]/, (m) => m.toUpperCase()),
        value: flag.value,
        onChange: (newValue) => {
          flag.set(newValue);
          onChange?.(newValue);
        }
      }
    )
  );
});
const CURSOR_NAMES = [
  "none",
  "default",
  "pointer",
  "cross",
  "move",
  "grab",
  "grabbing",
  "text",
  "ew-resize",
  "ns-resize",
  "nesw-resize",
  "nwse-resize",
  "nwse-rotate",
  "nesw-rotate",
  "senw-rotate",
  "swne-rotate",
  "zoom-in",
  "zoom-out"
];
function ExampleDialog({
  title = "title",
  body = "hello hello hello",
  cancel = "Cancel",
  confirm = "Continue",
  displayDontShowAgain = false,
  onCancel,
  onContinue
}) {
  const [dontShowAgain, setDontShowAgain] = React.useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Dialog.Header, { children: [
      /* @__PURE__ */ jsx(Dialog.Title, { children: title }),
      /* @__PURE__ */ jsx(Dialog.CloseButton, {})
    ] }),
    /* @__PURE__ */ jsx(Dialog.Body, { style: { maxWidth: 350 }, children: body }),
    /* @__PURE__ */ jsxs(Dialog.Footer, { className: "tlui-dialog__footer__actions", children: [
      displayDontShowAgain && /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => setDontShowAgain(!dontShowAgain),
          iconLeft: dontShowAgain ? "checkbox-checked" : "checkbox-empty",
          style: { marginRight: "auto" },
          children: `Don't show again`
        }
      ),
      /* @__PURE__ */ jsx(Button, { onClick: onCancel, children: cancel }),
      /* @__PURE__ */ jsx(Button, { type: "primary", onClick: async () => onContinue(), children: confirm })
    ] })
  ] });
}
export {
  DebugPanel
};
//# sourceMappingURL=DebugPanel.mjs.map
