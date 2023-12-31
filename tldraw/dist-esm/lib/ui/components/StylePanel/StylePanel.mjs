import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import {
  ArrowShapeArrowheadEndStyle,
  ArrowShapeArrowheadStartStyle,
  DefaultColorStyle,
  DefaultDashStyle,
  DefaultFillStyle,
  DefaultFontStyle,
  DefaultHorizontalAlignStyle,
  DefaultSizeStyle,
  DefaultVerticalAlignStyle,
  GeoShapeGeoStyle,
  LineShapeSplineStyle,
  SharedStyleMap,
  minBy,
  useEditor,
  useValue
} from "@tldraw/editor";
import React, { useCallback } from "react";
import { useTranslation } from "../../hooks/useTranslation/useTranslation.mjs";
import { Button } from "../primitives/Button.mjs";
import { ButtonPicker } from "../primitives/ButtonPicker.mjs";
import { Slider } from "../primitives/Slider.mjs";
import { DoubleDropdownPicker } from "./DoubleDropdownPicker.mjs";
import { DropdownPicker } from "./DropdownPicker.mjs";
import { STYLES } from "./styles.mjs";
const selectToolStyles = [DefaultColorStyle, DefaultDashStyle, DefaultFillStyle, DefaultSizeStyle];
function getRelevantStyles(editor) {
  const styles = new SharedStyleMap(editor.sharedStyles);
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
  const editor = useEditor();
  const relevantStyles = useValue("getRelevantStyles", () => getRelevantStyles(editor), [editor]);
  const handlePointerOut = useCallback(() => {
    if (!isMobile) {
      editor.updateInstanceState({ isChangingStyle: false });
    }
  }, [editor, isMobile]);
  if (!relevantStyles)
    return null;
  const { styles, opacity } = relevantStyles;
  const geo = styles.get(GeoShapeGeoStyle);
  const arrowheadEnd = styles.get(ArrowShapeArrowheadEndStyle);
  const arrowheadStart = styles.get(ArrowShapeArrowheadStartStyle);
  const spline = styles.get(LineShapeSplineStyle);
  const font = styles.get(DefaultFontStyle);
  const hideGeo = geo === void 0;
  const hideArrowHeads = arrowheadEnd === void 0 && arrowheadStart === void 0;
  const hideSpline = spline === void 0;
  const hideText = font === void 0;
  return /* @__PURE__ */ jsxs("div", { className: "tlui-style-panel", "data-ismobile": isMobile, onPointerLeave: handlePointerOut, children: [
    /* @__PURE__ */ jsx(CommonStylePickerSet, { styles, opacity }),
    !hideText && /* @__PURE__ */ jsx(TextStylePickerSet, { styles }),
    !(hideGeo && hideArrowHeads && hideSpline) && /* @__PURE__ */ jsxs("div", { className: "tlui-style-panel__section", "aria-label": "style panel styles", children: [
      /* @__PURE__ */ jsx(GeoStylePickerSet, { styles }),
      /* @__PURE__ */ jsx(ArrowheadStylePickerSet, { styles }),
      /* @__PURE__ */ jsx(SplineStylePickerSet, { styles })
    ] })
  ] });
};
function useStyleChangeCallback() {
  const editor = useEditor();
  return React.useMemo(() => {
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
  const editor = useEditor();
  const msg = useTranslation();
  const handleValueChange = useStyleChangeCallback();
  const handleOpacityValueChange = React.useCallback(
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
  const color = styles.get(DefaultColorStyle);
  const fill = styles.get(DefaultFillStyle);
  const dash = styles.get(DefaultDashStyle);
  const size = styles.get(DefaultSizeStyle);
  const showPickers = fill !== void 0 || dash !== void 0 || size !== void 0;
  const opacityIndex = opacity.type === "mixed" ? -1 : tldrawSupportedOpacities.indexOf(
    minBy(
      tldrawSupportedOpacities,
      (supportedOpacity) => Math.abs(supportedOpacity - opacity.value)
    )
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        tabIndex: -1,
        className: "tlui-style-panel__section__common",
        "aria-label": "style panel styles",
        children: [
          color === void 0 ? null : /* @__PURE__ */ jsx(
            ButtonPicker,
            {
              title: msg("style-panel.color"),
              uiType: "color",
              style: DefaultColorStyle,
              items: STYLES.color,
              value: color,
              onValueChange: handleValueChange
            }
          ),
          opacity === void 0 ? null : /* @__PURE__ */ jsx(
            Slider,
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
    showPickers && /* @__PURE__ */ jsxs("div", { className: "tlui-style-panel__section", "aria-label": "style panel styles", children: [
      fill === void 0 ? null : /* @__PURE__ */ jsx(
        ButtonPicker,
        {
          title: msg("style-panel.fill"),
          uiType: "fill",
          style: DefaultFillStyle,
          items: STYLES.fill,
          value: fill,
          onValueChange: handleValueChange
        }
      ),
      dash === void 0 ? null : /* @__PURE__ */ jsx(
        ButtonPicker,
        {
          title: msg("style-panel.dash"),
          uiType: "dash",
          style: DefaultDashStyle,
          items: STYLES.dash,
          value: dash,
          onValueChange: handleValueChange
        }
      ),
      size === void 0 ? null : /* @__PURE__ */ jsx(
        ButtonPicker,
        {
          title: msg("style-panel.size"),
          uiType: "size",
          style: DefaultSizeStyle,
          items: STYLES.size,
          value: size,
          onValueChange: handleValueChange
        }
      )
    ] })
  ] });
}
function TextStylePickerSet({ styles }) {
  const msg = useTranslation();
  const handleValueChange = useStyleChangeCallback();
  const font = styles.get(DefaultFontStyle);
  const align = styles.get(DefaultHorizontalAlignStyle);
  const verticalAlign = styles.get(DefaultVerticalAlignStyle);
  if (font === void 0 && align === void 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "tlui-style-panel__section", "aria-label": "style panel text", children: [
    font === void 0 ? null : /* @__PURE__ */ jsx(
      ButtonPicker,
      {
        title: msg("style-panel.font"),
        uiType: "font",
        style: DefaultFontStyle,
        items: STYLES.font,
        value: font,
        onValueChange: handleValueChange
      }
    ),
    align === void 0 ? null : /* @__PURE__ */ jsxs("div", { className: "tlui-style-panel__row", children: [
      /* @__PURE__ */ jsx(
        ButtonPicker,
        {
          title: msg("style-panel.align"),
          uiType: "align",
          style: DefaultHorizontalAlignStyle,
          items: STYLES.horizontalAlign,
          value: align,
          onValueChange: handleValueChange
        }
      ),
      verticalAlign === void 0 ? /* @__PURE__ */ jsx(
        Button,
        {
          title: msg("style-panel.vertical-align"),
          "data-testid": "vertical-align",
          icon: "vertical-align-center",
          disabled: true
        }
      ) : /* @__PURE__ */ jsx(
        DropdownPicker,
        {
          id: "geo-vertical-alignment",
          uiType: "verticalAlign",
          style: DefaultVerticalAlignStyle,
          items: STYLES.verticalAlign,
          value: verticalAlign,
          onValueChange: handleValueChange
        }
      )
    ] })
  ] });
}
function GeoStylePickerSet({ styles }) {
  const handleValueChange = useStyleChangeCallback();
  const geo = styles.get(GeoShapeGeoStyle);
  if (geo === void 0) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    DropdownPicker,
    {
      id: "geo",
      label: "style-panel.geo",
      uiType: "geo",
      style: GeoShapeGeoStyle,
      items: STYLES.geo,
      value: geo,
      onValueChange: handleValueChange
    }
  );
}
function SplineStylePickerSet({ styles }) {
  const handleValueChange = useStyleChangeCallback();
  const spline = styles.get(LineShapeSplineStyle);
  if (spline === void 0) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    DropdownPicker,
    {
      id: "spline",
      label: "style-panel.spline",
      uiType: "spline",
      style: LineShapeSplineStyle,
      items: STYLES.spline,
      value: spline,
      onValueChange: handleValueChange
    }
  );
}
function ArrowheadStylePickerSet({ styles }) {
  const handleValueChange = useStyleChangeCallback();
  const arrowheadEnd = styles.get(ArrowShapeArrowheadEndStyle);
  const arrowheadStart = styles.get(ArrowShapeArrowheadStartStyle);
  if (!arrowheadEnd || !arrowheadStart) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    DoubleDropdownPicker,
    {
      label: "style-panel.arrowheads",
      uiTypeA: "arrowheadStart",
      styleA: ArrowShapeArrowheadStartStyle,
      itemsA: STYLES.arrowheadStart,
      valueA: arrowheadStart,
      uiTypeB: "arrowheadEnd",
      styleB: ArrowShapeArrowheadEndStyle,
      itemsB: STYLES.arrowheadEnd,
      valueB: arrowheadEnd,
      onValueChange: handleValueChange,
      labelA: "style-panel.arrowhead-start",
      labelB: "style-panel.arrowhead-end"
    }
  );
}
export {
  StylePanel
};
//# sourceMappingURL=StylePanel.mjs.map
