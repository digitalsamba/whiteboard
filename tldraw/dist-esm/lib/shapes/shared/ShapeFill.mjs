import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import {
  HASH_PATTERN_ZOOM_NAMES,
  getDefaultColorTheme,
  useEditor,
  useIsDarkMode,
  useValue
} from "@tldraw/editor";
import React from "react";
function useDefaultColorTheme() {
  return getDefaultColorTheme({ isDarkMode: useIsDarkMode() });
}
const ShapeFill = React.memo(function ShapeFill2({ theme, d, color, fill }) {
  switch (fill) {
    case "none": {
      return null;
    }
    case "solid": {
      return /* @__PURE__ */ jsx("path", { fill: theme[color].semi, d });
    }
    case "semi": {
      return /* @__PURE__ */ jsx("path", { fill: theme.solid, d });
    }
    case "pattern": {
      return /* @__PURE__ */ jsx(PatternFill, { theme, color, fill, d });
    }
  }
});
const PatternFill = function PatternFill2({ d, color, theme }) {
  const editor = useEditor();
  const zoomLevel = useValue("zoomLevel", () => editor.zoomLevel, [editor]);
  const intZoom = Math.ceil(zoomLevel);
  const teenyTiny = editor.zoomLevel <= 0.18;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("path", { fill: theme[color].pattern, d }),
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: teenyTiny ? theme[color].semi : `url(#${HASH_PATTERN_ZOOM_NAMES[`${intZoom}_${theme.id}`]})`,
        d
      }
    )
  ] });
};
function getShapeFillSvg({ d, color, fill, theme }) {
  if (fill === "none") {
    return;
  }
  if (fill === "pattern") {
    const gEl = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const path1El = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1El.setAttribute("d", d);
    path1El.setAttribute("fill", theme[color].pattern);
    const path2El = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2El.setAttribute("d", d);
    path2El.setAttribute("fill", `url(#hash_pattern)`);
    gEl.appendChild(path1El);
    gEl.appendChild(path2El);
    return gEl;
  }
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  switch (fill) {
    case "semi": {
      path.setAttribute("fill", theme.solid);
      break;
    }
    case "solid": {
      {
        path.setAttribute("fill", theme[color].semi);
      }
      break;
    }
  }
  return path;
}
function getSvgWithShapeFill(foregroundPath, backgroundPath) {
  if (backgroundPath) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.appendChild(backgroundPath);
    g.appendChild(foregroundPath);
    return g;
  } else {
    return foregroundPath;
  }
}
export {
  ShapeFill,
  getShapeFillSvg,
  getSvgWithShapeFill,
  useDefaultColorTheme
};
//# sourceMappingURL=ShapeFill.mjs.map
