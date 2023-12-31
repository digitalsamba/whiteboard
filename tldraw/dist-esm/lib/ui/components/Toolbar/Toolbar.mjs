import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { GeoShapeGeoStyle, preventDefault, track, useEditor, useValue } from "@tldraw/editor";
import classNames from "classnames";
import React, { memo } from "react";
import { useBreakpoint } from "../../hooks/useBreakpoint.mjs";
import { useReadonly } from "../../hooks/useReadonly.mjs";
import { useToolbarSchema } from "../../hooks/useToolbarSchema.mjs";
import { useTranslation } from "../../hooks/useTranslation/useTranslation.mjs";
import { ActionsMenu } from "../ActionsMenu.mjs";
import { DuplicateButton } from "../DuplicateButton.mjs";
import { MobileStylePanel } from "../MobileStylePanel.mjs";
import { RedoButton } from "../RedoButton.mjs";
import { TrashButton } from "../TrashButton.mjs";
import { UndoButton } from "../UndoButton.mjs";
import { Button } from "../primitives/Button.mjs";
import * as M from "../primitives/DropdownMenu.mjs";
import { kbdStr } from "../primitives/shared.mjs";
import { ToggleToolLockedButton } from "./ToggleToolLockedButton.mjs";
const Toolbar = memo(function Toolbar2() {
  const editor = useEditor();
  const msg = useTranslation();
  const breakpoint = useBreakpoint();
  const rMostRecentlyActiveDropdownItem = React.useRef(void 0);
  const isReadonly = useReadonly();
  const toolbarItems = useToolbarSchema();
  const laserTool = toolbarItems.find((item) => item.toolItem.id === "laser");
  const activeToolId = useValue("current tool id", () => editor.currentToolId, [editor]);
  const isHandTool = activeToolId === "hand";
  const geoState = useValue("geo", () => editor.sharedStyles.getAsKnownValue(GeoShapeGeoStyle), [
    editor
  ]);
  const showEditingTools = !isReadonly;
  const showExtraActions = !(isReadonly || isHandTool);
  const getTitle = (item) => item.label ? `${msg(item.label)} ${item.kbd ? kbdStr(item.kbd) : ""}` : "";
  const activeTLUiToolbarItem = toolbarItems.find((item) => {
    return isActiveTLUiToolItem(item.toolItem, activeToolId, geoState);
  });
  const { itemsInPanel, itemsInDropdown, dropdownFirstItem } = React.useMemo(() => {
    const itemsInPanel2 = [];
    const itemsInDropdown2 = [];
    let dropdownFirstItem2;
    const overflowIndex = Math.min(8, 5 + breakpoint);
    for (let i = 4; i < toolbarItems.length; i++) {
      const item = toolbarItems[i];
      if (i < overflowIndex) {
        itemsInPanel2.push(item);
      } else {
        if (item === activeTLUiToolbarItem) {
          dropdownFirstItem2 = item;
        }
        itemsInDropdown2.push(item);
      }
    }
    if (dropdownFirstItem2) {
    } else {
      if (!rMostRecentlyActiveDropdownItem.current) {
        rMostRecentlyActiveDropdownItem.current = itemsInDropdown2[0];
      }
      dropdownFirstItem2 = rMostRecentlyActiveDropdownItem.current;
      if (!itemsInDropdown2.includes(dropdownFirstItem2)) {
        dropdownFirstItem2 = itemsInDropdown2[0];
      }
    }
    rMostRecentlyActiveDropdownItem.current = dropdownFirstItem2;
    if (itemsInDropdown2.length <= 2) {
      itemsInPanel2.push(...itemsInDropdown2);
      itemsInDropdown2.length = 0;
    }
    return { itemsInPanel: itemsInPanel2, itemsInDropdown: itemsInDropdown2, dropdownFirstItem: dropdownFirstItem2 };
  }, [toolbarItems, activeTLUiToolbarItem, breakpoint]);
  return /* @__PURE__ */ jsx("div", { className: "tlui-toolbar", children: /* @__PURE__ */ jsxs("div", { className: "tlui-toolbar__inner", children: [
    /* @__PURE__ */ jsxs("div", { className: "tlui-toolbar__left", children: [
      !isReadonly && breakpoint < 6 && !editor.isInAny("hand", "zoom") && /* @__PURE__ */ jsxs(
        "div",
        {
          className: classNames("tlui-toolbar__extras", {
            "tlui-toolbar__extras__hidden": !showExtraActions
          }),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "tlui-toolbar__extras__controls", children: [
              /* @__PURE__ */ jsx(UndoButton, {}),
              /* @__PURE__ */ jsx(RedoButton, {}),
              /* @__PURE__ */ jsx(TrashButton, {}),
              /* @__PURE__ */ jsx(DuplicateButton, {}),
              /* @__PURE__ */ jsx(ActionsMenu, {})
            ] }),
            /* @__PURE__ */ jsx(ToggleToolLockedButton, { activeToolId })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: classNames("tlui-toolbar__tools", {
            "tlui-toolbar__tools__mobile": breakpoint < 5
          }),
          children: [
            toolbarItems.slice(0, 2).map(({ toolItem }) => {
              return /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  item: toolItem,
                  title: getTitle(toolItem),
                  isSelected: isActiveTLUiToolItem(toolItem, activeToolId, geoState)
                },
                toolItem.id
              );
            }),
            isReadonly && laserTool && /* @__PURE__ */ jsx(
              ToolbarButton,
              {
                item: laserTool.toolItem,
                title: getTitle(laserTool.toolItem),
                isSelected: isActiveTLUiToolItem(laserTool.toolItem, activeToolId, geoState)
              },
              laserTool.toolItem.id
            ),
            showEditingTools && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { className: "tlui-toolbar__divider" }),
              toolbarItems.slice(2, 4).map(({ toolItem }) => /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  item: toolItem,
                  title: getTitle(toolItem),
                  isSelected: isActiveTLUiToolItem(toolItem, activeToolId, geoState)
                },
                toolItem.id
              )),
              /* @__PURE__ */ jsx("div", { className: "tlui-toolbar__divider" }),
              itemsInPanel.map(({ toolItem }) => /* @__PURE__ */ jsx(
                ToolbarButton,
                {
                  item: toolItem,
                  title: getTitle(toolItem),
                  isSelected: isActiveTLUiToolItem(toolItem, activeToolId, geoState)
                },
                toolItem.id
              )),
              itemsInDropdown.length ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  ToolbarButton,
                  {
                    item: dropdownFirstItem.toolItem,
                    title: getTitle(dropdownFirstItem.toolItem),
                    isSelected: isActiveTLUiToolItem(
                      dropdownFirstItem.toolItem,
                      activeToolId,
                      geoState
                    )
                  },
                  dropdownFirstItem.toolItem.id
                ),
                /* @__PURE__ */ jsxs(M.Root, { id: "toolbar overflow", modal: false, children: [
                  /* @__PURE__ */ jsx(M.Trigger, { children: /* @__PURE__ */ jsx(
                    Button,
                    {
                      className: "tlui-toolbar__tools__button tlui-toolbar__overflow",
                      icon: "chevron-up",
                      "data-testid": "tools.more",
                      title: msg("tool-panel.more")
                    }
                  ) }),
                  /* @__PURE__ */ jsx(M.Content, { side: "top", align: "center", children: /* @__PURE__ */ jsx(OverflowToolsContent, { toolbarItems: itemsInDropdown }) })
                ] })
              ] }) : null
            ] })
          ]
        }
      )
    ] }),
    breakpoint < 5 && !isReadonly && /* @__PURE__ */ jsx("div", { className: "tlui-toolbar__tools", children: /* @__PURE__ */ jsx(MobileStylePanel, {}) })
  ] }) });
});
const OverflowToolsContent = track(function OverflowToolsContent2({
  toolbarItems
}) {
  const msg = useTranslation();
  return /* @__PURE__ */ jsx("div", { className: "tlui-button-grid__four tlui-button-grid__reverse", children: toolbarItems.map(({ toolItem: { id, meta, kbd, label, onSelect, icon } }) => {
    return /* @__PURE__ */ jsx(
      M.Item,
      {
        className: "tlui-button-grid__button",
        "data-testid": `tools.${id}`,
        "data-tool": id,
        "data-geo": meta?.geo ?? "",
        "aria-label": label,
        onClick: () => onSelect("toolbar"),
        title: label ? `${msg(label)} ${kbd ? kbdStr(kbd) : ""}` : "",
        icon
      },
      id
    );
  }) });
});
function ToolbarButton({
  item,
  title,
  isSelected
}) {
  return /* @__PURE__ */ jsx(
    Button,
    {
      className: "tlui-toolbar__tools__button",
      "data-testid": `tools.${item.id}`,
      "data-tool": item.id,
      "data-geo": item.meta?.geo ?? "",
      "aria-label": item.label,
      title,
      icon: item.icon,
      "data-state": isSelected ? "selected" : void 0,
      onClick: () => item.onSelect("toolbar"),
      onTouchStart: (e) => {
        preventDefault(e);
        item.onSelect("toolbar");
      }
    }
  );
}
const isActiveTLUiToolItem = (item, activeToolId, geoState) => {
  return item.meta?.geo ? activeToolId === "geo" && geoState === item.meta?.geo : activeToolId === item.id;
};
export {
  Toolbar
};
//# sourceMappingURL=Toolbar.mjs.map
