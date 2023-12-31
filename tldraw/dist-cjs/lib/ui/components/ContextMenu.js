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
var ContextMenu_exports = {};
__export(ContextMenu_exports, {
  ContextMenu: () => ContextMenu
});
module.exports = __toCommonJS(ContextMenu_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var _ContextMenu = __toESM(require("@radix-ui/react-context-menu"));
var import_editor = require("@tldraw/editor");
var import_classnames = __toESM(require("classnames"));
var import_react = require("react");
var import_useBreakpoint = require("../hooks/useBreakpoint");
var import_useContextMenuSchema = require("../hooks/useContextMenuSchema");
var import_useMenuIsOpen = require("../hooks/useMenuIsOpen");
var import_useReadonly = require("../hooks/useReadonly");
var import_useTranslation = require("../hooks/useTranslation/useTranslation");
var import_MoveToPageMenu = require("./MoveToPageMenu");
var import_Button = require("./primitives/Button");
var import_Icon = require("./primitives/Icon");
var import_Kbd = require("./primitives/Kbd");
const ContextMenu = function ContextMenu2({ children }) {
  const editor = (0, import_editor.useEditor)();
  const contextTLUiMenuSchema = (0, import_useContextMenuSchema.useContextMenuSchema)();
  const cb = (0, import_react.useCallback)(
    (isOpen) => {
      if (!isOpen) {
        const { onlySelectedShape } = editor;
        if (onlySelectedShape && editor.isShapeOrAncestorLocked(onlySelectedShape)) {
          editor.setSelectedShapes([]);
        }
      } else {
        if (editor.instanceState.isCoarsePointer) {
          const {
            selectedShapes,
            inputs: { currentPagePoint }
          } = editor;
          const shapesAtPoint = editor.getShapesAtPoint(currentPagePoint);
          if (
            // if there are no selected shapes
            !editor.selectedShapes.length || // OR if none of the shapes at the point include the selected shape
            !shapesAtPoint.some((s) => selectedShapes.includes(s))
          ) {
            const lockedShapes = shapesAtPoint.filter((s) => editor.isShapeOrAncestorLocked(s));
            if (lockedShapes.length) {
              editor.select(...lockedShapes.map((s) => s.id));
            }
          }
        }
      }
    },
    [editor]
  );
  const [_, handleOpenChange] = (0, import_useMenuIsOpen.useMenuIsOpen)("context menu", cb);
  const isReadonly = (0, import_useReadonly.useReadonly)();
  const noItemsToShow = contextTLUiMenuSchema.length === 0 || isReadonly && contextTLUiMenuSchema.every((item) => !item.readonlyOk);
  const selectToolActive = (0, import_editor.useValue)("isSelectToolActive", () => editor.currentToolId === "select", [
    editor
  ]);
  const disabled = !selectToolActive || noItemsToShow;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_ContextMenu.Root, { dir: "ltr", onOpenChange: handleOpenChange, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      _ContextMenu.Trigger,
      {
        onContextMenu: disabled ? import_editor.preventDefault : void 0,
        dir: "ltr",
        disabled,
        children
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuContent, {})
  ] });
};
function ContextMenuContent() {
  const editor = (0, import_editor.useEditor)();
  const msg = (0, import_useTranslation.useTranslation)();
  const menuSchema = (0, import_useContextMenuSchema.useContextMenuSchema)();
  const [_, handleSubOpenChange] = (0, import_useMenuIsOpen.useMenuIsOpen)("context menu sub");
  const isReadonly = (0, import_useReadonly.useReadonly)();
  const breakpoint = (0, import_useBreakpoint.useBreakpoint)();
  const container = (0, import_editor.useContainer)();
  const [disableClicks, setDisableClicks] = (0, import_react.useState)(false);
  function getContextMenuItem(editor2, item, parent, depth) {
    if (isReadonly && !item.readonlyOk)
      return null;
    switch (item.type) {
      case "custom": {
        switch (item.id) {
          case "MOVE_TO_PAGE_MENU": {
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_MoveToPageMenu.MoveToPageMenu, {}, item.id);
          }
        }
        break;
      }
      case "group": {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          _ContextMenu.Group,
          {
            dir: "ltr",
            className: (0, import_classnames.default)("tlui-menu__group", {
              "tlui-menu__group__small": parent?.type === "submenu"
            }),
            "data-testid": `menu-item.${item.id}`,
            children: item.children.map((child) => getContextMenuItem(editor2, child, item, depth + 1))
          },
          item.id
        );
      }
      case "submenu": {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_ContextMenu.Sub, { onOpenChange: handleSubOpenChange, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_ContextMenu.SubTrigger, { dir: "ltr", disabled: item.disabled, asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_Button.Button,
            {
              className: "tlui-menu__button",
              label: item.label,
              "data-testid": `menu-item.${item.id}`,
              icon: "chevron-right"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_ContextMenu.Portal, { container, dir: "ltr", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_ContextMenu.SubContent, { className: "tlui-menu", sideOffset: -4, collisionPadding: 4, children: item.children.map((child) => getContextMenuItem(editor2, child, item, depth + 1)) }) })
        ] }, item.id);
      }
      case "item": {
        if (isReadonly && !item.readonlyOk)
          return null;
        const { id, checkbox, contextMenuLabel, label, onSelect, kbd, icon } = item.actionItem;
        const labelToUse = contextMenuLabel ?? label;
        const labelStr = labelToUse ? msg(labelToUse) : void 0;
        if (checkbox) {
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            _ContextMenu.CheckboxItem,
            {
              className: "tlui-button tlui-menu__button tlui-menu__checkbox-item",
              dir: "ltr",
              disabled: item.disabled,
              onSelect: (e) => {
                onSelect("context-menu");
                (0, import_editor.preventDefault)(e);
              },
              title: labelStr ? labelStr : void 0,
              checked: item.checked,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "div",
                  {
                    className: "tlui-menu__checkbox-item__check",
                    style: {
                      transformOrigin: "75% center",
                      transform: `scale(${item.checked ? 1 : 0.5})`,
                      opacity: item.checked ? 1 : 0.5
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Icon.Icon, { small: true, icon: item.checked ? "check" : "checkbox-empty" })
                  }
                ),
                labelStr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: labelStr }),
                kbd && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Kbd.Kbd, { children: kbd })
              ]
            },
            id
          );
        }
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_ContextMenu.Item, { dir: "ltr", asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_Button.Button,
          {
            className: "tlui-menu__button",
            "data-testid": `menu-item.${id}`,
            kbd,
            label: labelToUse,
            disabled: item.disabled,
            iconLeft: breakpoint < 3 && depth > 2 ? icon : void 0,
            onClick: () => {
              if (disableClicks) {
                setDisableClicks(false);
              } else {
                onSelect("context-menu");
              }
            }
          }
        ) }, id);
      }
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_ContextMenu.Portal, { dir: "ltr", container, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    _ContextMenu.Content,
    {
      className: "tlui-menu scrollable",
      alignOffset: -4,
      collisionPadding: 4,
      onContextMenu: import_editor.preventDefault,
      children: menuSchema.map((item) => getContextMenuItem(editor, item, null, 0))
    }
  ) });
}
//# sourceMappingURL=ContextMenu.js.map
