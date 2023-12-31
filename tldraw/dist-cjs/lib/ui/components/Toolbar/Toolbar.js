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
var Toolbar_exports = {};
__export(Toolbar_exports, {
  Toolbar: () => Toolbar
});
module.exports = __toCommonJS(Toolbar_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_classnames = __toESM(require("classnames"));
var import_react = __toESM(require("react"));
var import_useBreakpoint = require("../../hooks/useBreakpoint");
var import_useReadonly = require("../../hooks/useReadonly");
var import_useToolbarSchema = require("../../hooks/useToolbarSchema");
var import_useTranslation = require("../../hooks/useTranslation/useTranslation");
var import_ActionsMenu = require("../ActionsMenu");
var import_DuplicateButton = require("../DuplicateButton");
var import_MobileStylePanel = require("../MobileStylePanel");
var import_RedoButton = require("../RedoButton");
var import_TrashButton = require("../TrashButton");
var import_UndoButton = require("../UndoButton");
var import_Button = require("../primitives/Button");
var M = __toESM(require("../primitives/DropdownMenu"));
var import_shared = require("../primitives/shared");
var import_ToggleToolLockedButton = require("./ToggleToolLockedButton");
const Toolbar = (0, import_react.memo)(function Toolbar2() {
  const editor = (0, import_editor.useEditor)();
  const msg = (0, import_useTranslation.useTranslation)();
  const breakpoint = (0, import_useBreakpoint.useBreakpoint)();
  const rMostRecentlyActiveDropdownItem = import_react.default.useRef(void 0);
  const isReadonly = (0, import_useReadonly.useReadonly)();
  const toolbarItems = (0, import_useToolbarSchema.useToolbarSchema)();
  const laserTool = toolbarItems.find((item) => item.toolItem.id === "laser");
  const activeToolId = (0, import_editor.useValue)("current tool id", () => editor.currentToolId, [editor]);
  const isHandTool = activeToolId === "hand";
  const geoState = (0, import_editor.useValue)("geo", () => editor.sharedStyles.getAsKnownValue(import_editor.GeoShapeGeoStyle), [
    editor
  ]);
  const showEditingTools = !isReadonly;
  const showExtraActions = !(isReadonly || isHandTool);
  const getTitle = (item) => item.label ? `${msg(item.label)} ${item.kbd ? (0, import_shared.kbdStr)(item.kbd) : ""}` : "";
  const activeTLUiToolbarItem = toolbarItems.find((item) => {
    return isActiveTLUiToolItem(item.toolItem, activeToolId, geoState);
  });
  const { itemsInPanel, itemsInDropdown, dropdownFirstItem } = import_react.default.useMemo(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tlui-toolbar", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-toolbar__inner", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-toolbar__left", children: [
      !isReadonly && breakpoint < 6 && !editor.isInAny("hand", "zoom") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          className: (0, import_classnames.default)("tlui-toolbar__extras", {
            "tlui-toolbar__extras__hidden": !showExtraActions
          }),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-toolbar__extras__controls", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_UndoButton.UndoButton, {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_RedoButton.RedoButton, {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_TrashButton.TrashButton, {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_DuplicateButton.DuplicateButton, {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ActionsMenu.ActionsMenu, {})
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ToggleToolLockedButton.ToggleToolLockedButton, { activeToolId })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          className: (0, import_classnames.default)("tlui-toolbar__tools", {
            "tlui-toolbar__tools__mobile": breakpoint < 5
          }),
          children: [
            toolbarItems.slice(0, 2).map(({ toolItem }) => {
              return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ToolbarButton,
                {
                  item: toolItem,
                  title: getTitle(toolItem),
                  isSelected: isActiveTLUiToolItem(toolItem, activeToolId, geoState)
                },
                toolItem.id
              );
            }),
            isReadonly && laserTool && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ToolbarButton,
              {
                item: laserTool.toolItem,
                title: getTitle(laserTool.toolItem),
                isSelected: isActiveTLUiToolItem(laserTool.toolItem, activeToolId, geoState)
              },
              laserTool.toolItem.id
            ),
            showEditingTools && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tlui-toolbar__divider" }),
              toolbarItems.slice(2, 4).map(({ toolItem }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ToolbarButton,
                {
                  item: toolItem,
                  title: getTitle(toolItem),
                  isSelected: isActiveTLUiToolItem(toolItem, activeToolId, geoState)
                },
                toolItem.id
              )),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tlui-toolbar__divider" }),
              itemsInPanel.map(({ toolItem }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ToolbarButton,
                {
                  item: toolItem,
                  title: getTitle(toolItem),
                  isSelected: isActiveTLUiToolItem(toolItem, activeToolId, geoState)
                },
                toolItem.id
              )),
              itemsInDropdown.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(M.Root, { id: "toolbar overflow", modal: false, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(M.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    import_Button.Button,
                    {
                      className: "tlui-toolbar__tools__button tlui-toolbar__overflow",
                      icon: "chevron-up",
                      "data-testid": "tools.more",
                      title: msg("tool-panel.more")
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(M.Content, { side: "top", align: "center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverflowToolsContent, { toolbarItems: itemsInDropdown }) })
                ] })
              ] }) : null
            ] })
          ]
        }
      )
    ] }),
    breakpoint < 5 && !isReadonly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tlui-toolbar__tools", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_MobileStylePanel.MobileStylePanel, {}) })
  ] }) });
});
const OverflowToolsContent = (0, import_editor.track)(function OverflowToolsContent2({
  toolbarItems
}) {
  const msg = (0, import_useTranslation.useTranslation)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tlui-button-grid__four tlui-button-grid__reverse", children: toolbarItems.map(({ toolItem: { id, meta, kbd, label, onSelect, icon } }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      M.Item,
      {
        className: "tlui-button-grid__button",
        "data-testid": `tools.${id}`,
        "data-tool": id,
        "data-geo": meta?.geo ?? "",
        "aria-label": label,
        onClick: () => onSelect("toolbar"),
        title: label ? `${msg(label)} ${kbd ? (0, import_shared.kbdStr)(kbd) : ""}` : "",
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_Button.Button,
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
        (0, import_editor.preventDefault)(e);
        item.onSelect("toolbar");
      }
    }
  );
}
const isActiveTLUiToolItem = (item, activeToolId, geoState) => {
  return item.meta?.geo ? activeToolId === "geo" && geoState === item.meta?.geo : activeToolId === item.id;
};
//# sourceMappingURL=Toolbar.js.map
