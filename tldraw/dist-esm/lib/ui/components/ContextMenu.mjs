import { jsx, jsxs } from "react/jsx-runtime";
import * as _ContextMenu from "@radix-ui/react-context-menu";
import { preventDefault, useContainer, useEditor, useValue } from "@tldraw/editor";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { useBreakpoint } from "../hooks/useBreakpoint.mjs";
import { useContextMenuSchema } from "../hooks/useContextMenuSchema.mjs";
import { useMenuIsOpen } from "../hooks/useMenuIsOpen.mjs";
import { useReadonly } from "../hooks/useReadonly.mjs";
import { useTranslation } from "../hooks/useTranslation/useTranslation.mjs";
import { MoveToPageMenu } from "./MoveToPageMenu.mjs";
import { Button } from "./primitives/Button.mjs";
import { Icon } from "./primitives/Icon.mjs";
import { Kbd } from "./primitives/Kbd.mjs";
const ContextMenu = function ContextMenu2({ children }) {
  const editor = useEditor();
  const contextTLUiMenuSchema = useContextMenuSchema();
  const cb = useCallback(
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
  const [_, handleOpenChange] = useMenuIsOpen("context menu", cb);
  const isReadonly = useReadonly();
  const noItemsToShow = contextTLUiMenuSchema.length === 0 || isReadonly && contextTLUiMenuSchema.every((item) => !item.readonlyOk);
  const selectToolActive = useValue("isSelectToolActive", () => editor.currentToolId === "select", [
    editor
  ]);
  const disabled = !selectToolActive || noItemsToShow;
  return /* @__PURE__ */ jsxs(_ContextMenu.Root, { dir: "ltr", onOpenChange: handleOpenChange, children: [
    /* @__PURE__ */ jsx(
      _ContextMenu.Trigger,
      {
        onContextMenu: disabled ? preventDefault : void 0,
        dir: "ltr",
        disabled,
        children
      }
    ),
    /* @__PURE__ */ jsx(ContextMenuContent, {})
  ] });
};
function ContextMenuContent() {
  const editor = useEditor();
  const msg = useTranslation();
  const menuSchema = useContextMenuSchema();
  const [_, handleSubOpenChange] = useMenuIsOpen("context menu sub");
  const isReadonly = useReadonly();
  const breakpoint = useBreakpoint();
  const container = useContainer();
  const [disableClicks, setDisableClicks] = useState(false);
  function getContextMenuItem(editor2, item, parent, depth) {
    if (isReadonly && !item.readonlyOk)
      return null;
    switch (item.type) {
      case "custom": {
        switch (item.id) {
          case "MOVE_TO_PAGE_MENU": {
            return /* @__PURE__ */ jsx(MoveToPageMenu, {}, item.id);
          }
        }
        break;
      }
      case "group": {
        return /* @__PURE__ */ jsx(
          _ContextMenu.Group,
          {
            dir: "ltr",
            className: classNames("tlui-menu__group", {
              "tlui-menu__group__small": parent?.type === "submenu"
            }),
            "data-testid": `menu-item.${item.id}`,
            children: item.children.map((child) => getContextMenuItem(editor2, child, item, depth + 1))
          },
          item.id
        );
      }
      case "submenu": {
        return /* @__PURE__ */ jsxs(_ContextMenu.Sub, { onOpenChange: handleSubOpenChange, children: [
          /* @__PURE__ */ jsx(_ContextMenu.SubTrigger, { dir: "ltr", disabled: item.disabled, asChild: true, children: /* @__PURE__ */ jsx(
            Button,
            {
              className: "tlui-menu__button",
              label: item.label,
              "data-testid": `menu-item.${item.id}`,
              icon: "chevron-right"
            }
          ) }),
          /* @__PURE__ */ jsx(_ContextMenu.Portal, { container, dir: "ltr", children: /* @__PURE__ */ jsx(_ContextMenu.SubContent, { className: "tlui-menu", sideOffset: -4, collisionPadding: 4, children: item.children.map((child) => getContextMenuItem(editor2, child, item, depth + 1)) }) })
        ] }, item.id);
      }
      case "item": {
        if (isReadonly && !item.readonlyOk)
          return null;
        const { id, checkbox, contextMenuLabel, label, onSelect, kbd, icon } = item.actionItem;
        const labelToUse = contextMenuLabel ?? label;
        const labelStr = labelToUse ? msg(labelToUse) : void 0;
        if (checkbox) {
          return /* @__PURE__ */ jsxs(
            _ContextMenu.CheckboxItem,
            {
              className: "tlui-button tlui-menu__button tlui-menu__checkbox-item",
              dir: "ltr",
              disabled: item.disabled,
              onSelect: (e) => {
                onSelect("context-menu");
                preventDefault(e);
              },
              title: labelStr ? labelStr : void 0,
              checked: item.checked,
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "tlui-menu__checkbox-item__check",
                    style: {
                      transformOrigin: "75% center",
                      transform: `scale(${item.checked ? 1 : 0.5})`,
                      opacity: item.checked ? 1 : 0.5
                    },
                    children: /* @__PURE__ */ jsx(Icon, { small: true, icon: item.checked ? "check" : "checkbox-empty" })
                  }
                ),
                labelStr && /* @__PURE__ */ jsx("span", { children: labelStr }),
                kbd && /* @__PURE__ */ jsx(Kbd, { children: kbd })
              ]
            },
            id
          );
        }
        return /* @__PURE__ */ jsx(_ContextMenu.Item, { dir: "ltr", asChild: true, children: /* @__PURE__ */ jsx(
          Button,
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
  return /* @__PURE__ */ jsx(_ContextMenu.Portal, { dir: "ltr", container, children: /* @__PURE__ */ jsx(
    _ContextMenu.Content,
    {
      className: "tlui-menu scrollable",
      alignOffset: -4,
      collisionPadding: 4,
      onContextMenu: preventDefault,
      children: menuSchema.map((item) => getContextMenuItem(editor, item, null, 0))
    }
  ) });
}
export {
  ContextMenu
};
//# sourceMappingURL=ContextMenu.mjs.map
