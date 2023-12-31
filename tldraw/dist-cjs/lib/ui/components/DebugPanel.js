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
var DebugPanel_exports = {};
__export(DebugPanel_exports, {
  DebugPanel: () => DebugPanel
});
module.exports = __toCommonJS(DebugPanel_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var React = __toESM(require("react"));
var import_useDialogsProvider = require("../hooks/useDialogsProvider");
var import_useToastsProvider = require("../hooks/useToastsProvider");
var import_useTranslation = require("../hooks/useTranslation/useTranslation");
var import_Button = require("./primitives/Button");
var Dialog = __toESM(require("./primitives/Dialog"));
var DropdownMenu = __toESM(require("./primitives/DropdownMenu"));
let t = 0;
function createNShapes(editor, n) {
  const shapesToCreate = Array(n);
  const cols = Math.floor(Math.sqrt(n));
  for (let i = 0; i < n; i++) {
    t++;
    shapesToCreate[i] = {
      id: (0, import_editor.createShapeId)("box" + t),
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
  const msg = (0, import_useTranslation.useTranslation)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-debug-panel", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrentState, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShapeCount, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu.Root, { id: "debug", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenu.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Button.Button, { icon: "dots-horizontal", title: msg("debug-panel.more") }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenu.Content, { side: "top", align: "end", alignOffset: 0, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DebugMenuContent, { renderDebugMenuItems }) })
    ] })
  ] });
});
const CurrentState = (0, import_editor.track)(function CurrentState2() {
  const editor = (0, import_editor.useEditor)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tlui-debug-panel__current-state", children: editor.root.path.value });
});
const ShapeCount = function ShapeCount2() {
  const editor = (0, import_editor.useEditor)();
  const count = (0, import_editor.useValue)("rendering shapes count", () => editor.renderingShapes.length, [editor]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
    count,
    " Shapes"
  ] });
};
const DebugMenuContent = (0, import_editor.track)(function DebugMenuContent2({
  renderDebugMenuItems
}) {
  const editor = (0, import_editor.useEditor)();
  const { addToast } = (0, import_useToastsProvider.useToasts)();
  const { addDialog } = (0, import_useDialogsProvider.useDialogs)();
  const [error, setError] = React.useState(false);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu.Group, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        DropdownMenu.Item,
        {
          onClick: () => {
            addToast({
              id: (0, import_editor.uniqueId)(),
              title: "Something happened",
              description: "Hey, attend to this thing over here. It might be important!"
              // icon?: string
              // title?: string
              // description?: string
              // actions?: TLUiToastAction[]
            });
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Show toast" })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        DropdownMenu.Item,
        {
          onClick: () => {
            addDialog({
              component: ({ onClose }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Show dialog" })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenu.Item, { onClick: () => createNShapes(editor, 100), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Create 100 shapes" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Count shapes and nodes" })
        }
      ),
      (() => {
        if (error)
          throw Error("oh no!");
      })(),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        DropdownMenu.Item,
        {
          onClick: () => {
            setError(true);
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Throw error" })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        DropdownMenu.Item,
        {
          onClick: () => {
            (0, import_editor.hardResetEditor)();
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hard reset" })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu.Group, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DebugFlagToggle, { flag: import_editor.debugFlags.debugSvg }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DebugFlagToggle, { flag: import_editor.debugFlags.forceSrgb }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        DebugFlagToggle,
        {
          flag: import_editor.debugFlags.debugCursors,
          onChange: (enabled) => {
            if (enabled) {
              const MAX_COLUMNS = 5;
              const partials = CURSOR_NAMES.map((name, i) => {
                return {
                  id: (0, import_editor.createShapeId)(),
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenu.Group, { children: Object.values(import_editor.featureFlags).map((flag) => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DebugFlagToggle, { flag }, flag.name);
    }) }),
    renderDebugMenuItems?.()
  ] });
});
function Toggle({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenu.CheckboxItem, { title: label, checked: value, onSelect: () => onChange(!value), children: label });
}
const DebugFlagToggle = (0, import_editor.track)(function DebugFlagToggle2({
  flag,
  onChange
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Toggle,
    {
      label: flag.name.replace(/([a-z0-9])([A-Z])/g, (m) => `${m[0]} ${m[1].toLowerCase()}`).replace(/^[a-z]/, (m) => m.toUpperCase()),
      value: flag.value,
      onChange: (newValue) => {
        flag.set(newValue);
        onChange?.(newValue);
      }
    }
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog.Header, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog.Title, { children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog.CloseButton, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog.Body, { style: { maxWidth: 350 }, children: body }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog.Footer, { className: "tlui-dialog__footer__actions", children: [
      displayDontShowAgain && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_Button.Button,
        {
          onClick: () => setDontShowAgain(!dontShowAgain),
          iconLeft: dontShowAgain ? "checkbox-checked" : "checkbox-empty",
          style: { marginRight: "auto" },
          children: `Don't show again`
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Button.Button, { onClick: onCancel, children: cancel }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Button.Button, { type: "primary", onClick: async () => onContinue(), children: confirm })
    ] })
  ] });
}
//# sourceMappingURL=DebugPanel.js.map
