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
var StylePanel_exports = {};
__export(StylePanel_exports, {
  StylePanel: () => StylePanel
});
module.exports = __toCommonJS(StylePanel_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_react = __toESM(require("react"));
var import_useTranslation = require("../../hooks/useTranslation/useTranslation");
var import_Button = require("../primitives/Button");
var import_ButtonPicker = require("../primitives/ButtonPicker");
var import_Slider = require("../primitives/Slider");
var import_DoubleDropdownPicker = require("./DoubleDropdownPicker");
var import_DropdownPicker = require("./DropdownPicker");
var import_styles = require("./styles");
const selectToolStyles = [import_editor.DefaultColorStyle, import_editor.DefaultDashStyle, import_editor.DefaultFillStyle, import_editor.DefaultSizeStyle];
function getRelevantStyles(editor) {
  const styles = new import_editor.SharedStyleMap(editor.sharedStyles);
  const hasShape = editor.selectedShapeIds.length > 0 || !!editor.root.current.value?.shapeType;
  if (styles.size === 0 && editor.isIn("select") && editor.selectedShapeIds.length === 0) {
    for (const style of selectToolStyles) {
      styles.applyValue(style, editor.getStyleForNextShape(style));
    }
  }
  if (styles.size === 0 && !hasShape)
    return null;
  return { styles, opacity: editor.sharedOpacity };
}
const StylePanel = function StylePanel2({ isMobile }) {
  const editor = (0, import_editor.useEditor)();
  const relevantStyles = (0, import_editor.useValue)("getRelevantStyles", () => getRelevantStyles(editor), [editor]);
  const handlePointerOut = (0, import_react.useCallback)(() => {
    if (!isMobile) {
      editor.updateInstanceState({ isChangingStyle: false });
    }
  }, [editor, isMobile]);
  if (!relevantStyles)
    return null;
  const { styles, opacity } = relevantStyles;
  const geo = styles.get(import_editor.GeoShapeGeoStyle);
  const arrowheadEnd = styles.get(import_editor.ArrowShapeArrowheadEndStyle);
  const arrowheadStart = styles.get(import_editor.ArrowShapeArrowheadStartStyle);
  const spline = styles.get(import_editor.LineShapeSplineStyle);
  const font = styles.get(import_editor.DefaultFontStyle);
  const hideGeo = geo === void 0;
  const hideArrowHeads = arrowheadEnd === void 0 && arrowheadStart === void 0;
  const hideSpline = spline === void 0;
  const hideText = font === void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-style-panel", "data-ismobile": isMobile, onPointerLeave: handlePointerOut, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommonStylePickerSet, { styles, opacity }),
    !hideText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextStylePickerSet, { styles }),
    !(hideGeo && hideArrowHeads && hideSpline) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-style-panel__section", "aria-label": "style panel styles", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GeoStylePickerSet, { styles }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowheadStylePickerSet, { styles }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplineStylePickerSet, { styles })
    ] })
  ] });
};
function useStyleChangeCallback() {
  const editor = (0, import_editor.useEditor)();
  return import_react.default.useMemo(() => {
    return function handleStyleChange(style, value, squashing) {
      editor.batch(() => {
        if (editor.isIn("select")) {
          editor.setStyleForSelectedShapes(style, value, { squashing });
        }
        editor.setStyleForNextShapes(style, value, { squashing });
        editor.updateInstanceState({ isChangingStyle: true });
      });
    };
  }, [editor]);
}
const tldrawSupportedOpacities = [0.1, 0.25, 0.5, 0.75, 1];
function CommonStylePickerSet({
  styles,
  opacity
}) {
  const editor = (0, import_editor.useEditor)();
  const msg = (0, import_useTranslation.useTranslation)();
  const handleValueChange = useStyleChangeCallback();
  const handleOpacityValueChange = import_react.default.useCallback(
    (value, ephemeral) => {
      const item = tldrawSupportedOpacities[value];
      editor.batch(() => {
        if (editor.isIn("select")) {
          editor.setOpacityForSelectedShapes(item, { ephemeral });
        }
        editor.setOpacityForNextShapes(item, { ephemeral });
        editor.updateInstanceState({ isChangingStyle: true });
      });
    },
    [editor]
  );
  const color = styles.get(import_editor.DefaultColorStyle);
  const fill = styles.get(import_editor.DefaultFillStyle);
  const dash = styles.get(import_editor.DefaultDashStyle);
  const size = styles.get(import_editor.DefaultSizeStyle);
  const showPickers = fill !== void 0 || dash !== void 0 || size !== void 0;
  const opacityIndex = opacity.type === "mixed" ? -1 : tldrawSupportedOpacities.indexOf(
    (0, import_editor.minBy)(
      tldrawSupportedOpacities,
      (supportedOpacity) => Math.abs(supportedOpacity - opacity.value)
    )
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        tabIndex: -1,
        className: "tlui-style-panel__section__common",
        "aria-label": "style panel styles",
        children: [
          color === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_ButtonPicker.ButtonPicker,
            {
              title: msg("style-panel.color"),
              uiType: "color",
              style: import_editor.DefaultColorStyle,
              items: import_styles.STYLES.color,
              value: color,
              onValueChange: handleValueChange
            }
          ),
          opacity === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_Slider.Slider,
            {
              "data-testid": "style.opacity",
              value: opacityIndex >= 0 ? opacityIndex : tldrawSupportedOpacities.length - 1,
              label: opacity.type === "mixed" ? "style-panel.mixed" : `opacity-style.${opacity}`,
              onValueChange: handleOpacityValueChange,
              steps: tldrawSupportedOpacities.length - 1,
              title: msg("style-panel.opacity")
            }
          )
        ]
      }
    ),
    showPickers && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-style-panel__section", "aria-label": "style panel styles", children: [
      fill === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_ButtonPicker.ButtonPicker,
        {
          title: msg("style-panel.fill"),
          uiType: "fill",
          style: import_editor.DefaultFillStyle,
          items: import_styles.STYLES.fill,
          value: fill,
          onValueChange: handleValueChange
        }
      ),
      dash === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_ButtonPicker.ButtonPicker,
        {
          title: msg("style-panel.dash"),
          uiType: "dash",
          style: import_editor.DefaultDashStyle,
          items: import_styles.STYLES.dash,
          value: dash,
          onValueChange: handleValueChange
        }
      ),
      size === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_ButtonPicker.ButtonPicker,
        {
          title: msg("style-panel.size"),
          uiType: "size",
          style: import_editor.DefaultSizeStyle,
          items: import_styles.STYLES.size,
          value: size,
          onValueChange: handleValueChange
        }
      )
    ] })
  ] });
}
function TextStylePickerSet({ styles }) {
  const msg = (0, import_useTranslation.useTranslation)();
  const handleValueChange = useStyleChangeCallback();
  const font = styles.get(import_editor.DefaultFontStyle);
  const align = styles.get(import_editor.DefaultHorizontalAlignStyle);
  const verticalAlign = styles.get(import_editor.DefaultVerticalAlignStyle);
  if (font === void 0 && align === void 0) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-style-panel__section", "aria-label": "style panel text", children: [
    font === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_ButtonPicker.ButtonPicker,
      {
        title: msg("style-panel.font"),
        uiType: "font",
        style: import_editor.DefaultFontStyle,
        items: import_styles.STYLES.font,
        value: font,
        onValueChange: handleValueChange
      }
    ),
    align === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tlui-style-panel__row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_ButtonPicker.ButtonPicker,
        {
          title: msg("style-panel.align"),
          uiType: "align",
          style: import_editor.DefaultHorizontalAlignStyle,
          items: import_styles.STYLES.horizontalAlign,
          value: align,
          onValueChange: handleValueChange
        }
      ),
      verticalAlign === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_Button.Button,
        {
          title: msg("style-panel.vertical-align"),
          "data-testid": "vertical-align",
          icon: "vertical-align-center",
          disabled: true
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_DropdownPicker.DropdownPicker,
        {
          id: "geo-vertical-alignment",
          uiType: "verticalAlign",
          style: import_editor.DefaultVerticalAlignStyle,
          items: import_styles.STYLES.verticalAlign,
          value: verticalAlign,
          onValueChange: handleValueChange
        }
      )
    ] })
  ] });
}
function GeoStylePickerSet({ styles }) {
  const handleValueChange = useStyleChangeCallback();
  const geo = styles.get(import_editor.GeoShapeGeoStyle);
  if (geo === void 0) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_DropdownPicker.DropdownPicker,
    {
      id: "geo",
      label: "style-panel.geo",
      uiType: "geo",
      style: import_editor.GeoShapeGeoStyle,
      items: import_styles.STYLES.geo,
      value: geo,
      onValueChange: handleValueChange
    }
  );
}
function SplineStylePickerSet({ styles }) {
  const handleValueChange = useStyleChangeCallback();
  const spline = styles.get(import_editor.LineShapeSplineStyle);
  if (spline === void 0) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_DropdownPicker.DropdownPicker,
    {
      id: "spline",
      label: "style-panel.spline",
      uiType: "spline",
      style: import_editor.LineShapeSplineStyle,
      items: import_styles.STYLES.spline,
      value: spline,
      onValueChange: handleValueChange
    }
  );
}
function ArrowheadStylePickerSet({ styles }) {
  const handleValueChange = useStyleChangeCallback();
  const arrowheadEnd = styles.get(import_editor.ArrowShapeArrowheadEndStyle);
  const arrowheadStart = styles.get(import_editor.ArrowShapeArrowheadStartStyle);
  if (!arrowheadEnd || !arrowheadStart) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_DoubleDropdownPicker.DoubleDropdownPicker,
    {
      label: "style-panel.arrowheads",
      uiTypeA: "arrowheadStart",
      styleA: import_editor.ArrowShapeArrowheadStartStyle,
      itemsA: import_styles.STYLES.arrowheadStart,
      valueA: arrowheadStart,
      uiTypeB: "arrowheadEnd",
      styleB: import_editor.ArrowShapeArrowheadEndStyle,
      itemsB: import_styles.STYLES.arrowheadEnd,
      valueB: arrowheadEnd,
      onValueChange: handleValueChange,
      labelA: "style-panel.arrowhead-start",
      labelB: "style-panel.arrowhead-end"
    }
  );
}
//# sourceMappingURL=StylePanel.js.map
