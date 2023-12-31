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
var ShapeFill_exports = {};
__export(ShapeFill_exports, {
  ShapeFill: () => ShapeFill,
  getShapeFillSvg: () => getShapeFillSvg,
  getSvgWithShapeFill: () => getSvgWithShapeFill,
  useDefaultColorTheme: () => useDefaultColorTheme
});
module.exports = __toCommonJS(ShapeFill_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_react = __toESM(require("react"));
function useDefaultColorTheme() {
  return (0, import_editor.getDefaultColorTheme)({ isDarkMode: (0, import_editor.useIsDarkMode)() });
}
const ShapeFill = import_react.default.memo(function ShapeFill2({ theme, d, color, fill }) {
  switch (fill) {
    case "none": {
      return null;
    }
    case "solid": {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: theme[color].semi, d });
    }
    case "semi": {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: theme.solid, d });
    }
    case "pattern": {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatternFill, { theme, color, fill, d });
    }
  }
});
const PatternFill = function PatternFill2({ d, color, theme }) {
  const editor = (0, import_editor.useEditor)();
  const zoomLevel = (0, import_editor.useValue)("zoomLevel", () => editor.zoomLevel, [editor]);
  const intZoom = Math.ceil(zoomLevel);
  const teenyTiny = editor.zoomLevel <= 0.18;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: theme[color].pattern, d }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        fill: teenyTiny ? theme[color].semi : `url(#${import_editor.HASH_PATTERN_ZOOM_NAMES[`${intZoom}_${theme.id}`]})`,
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
//# sourceMappingURL=ShapeFill.js.map
