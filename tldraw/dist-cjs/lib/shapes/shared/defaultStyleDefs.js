"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var defaultStyleDefs_exports = {};
__export(defaultStyleDefs_exports, {
  getFillDefForCanvas: () => getFillDefForCanvas,
  getFillDefForExport: () => getFillDefForExport,
  getFontDefForExport: () => getFontDefForExport
});
module.exports = __toCommonJS(defaultStyleDefs_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_react = require("react");
function getFontDefForExport(fontStyle) {
  return {
    key: `${import_editor.DefaultFontStyle.id}:${fontStyle}`,
    getElement: async () => {
      const font = findFont(fontStyle);
      if (!font)
        return null;
      const url = font.$$_url;
      const fontFaceRule = font.$$_fontface;
      if (!url || !fontFaceRule)
        return null;
      const fontFile = await (await fetch(url)).blob();
      const base64FontFile = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(fontFile);
      });
      const newFontFaceRule = fontFaceRule.replace(url, base64FontFile);
      const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
      style.textContent = newFontFaceRule;
      return style;
    }
  };
}
function findFont(name) {
  const fontFamily = import_editor.DefaultFontFamilies[name];
  for (const font of document.fonts) {
    if (fontFamily.includes(font.family)) {
      return font;
    }
  }
  return null;
}
function getFillDefForExport(fill, theme) {
  return {
    key: `${import_editor.DefaultFontStyle.id}:${fill}`,
    getElement: async () => {
      if (fill !== "pattern")
        return null;
      const t = 8 / 12;
      const divEl = document.createElement("div");
      divEl.innerHTML = `
				<svg>
					<defs>
						<mask id="hash_pattern_mask">
							<rect x="0" y="0" width="8" height="8" fill="white" />
							<g
								strokeLinecap="round"
								stroke="black"
							>
								<line x1="${t * 1}" y1="${t * 3}" x2="${t * 3}" y2="${t * 1}" />
								<line x1="${t * 5}" y1="${t * 7}" x2="${t * 7}" y2="${t * 5}" />
								<line x1="${t * 9}" y1="${t * 11}" x2="${t * 11}" y2="${t * 9}" />
							</g>
						</mask>
						<pattern
							id="hash_pattern"
							width="8"
							height="8"
							patternUnits="userSpaceOnUse"
						>
							<rect x="0" y="0" width="8" height="8" fill="${theme.solid}" mask="url(#hash_pattern_mask)" />
						</pattern>
					</defs>
				</svg>
			`;
      return Array.from(divEl.querySelectorAll("defs > *"));
    }
  };
}
function getFillDefForCanvas() {
  return {
    key: `${import_editor.DefaultFontStyle.id}:pattern`,
    component: PatternFillDefForCanvas
  };
}
const TILE_PATTERN_SIZE = 8;
const generateImage = (dpr, currentZoom, darkMode) => {
  return new Promise((resolve, reject) => {
    const size = TILE_PATTERN_SIZE * currentZoom * dpr;
    const canvasEl = document.createElement("canvas");
    canvasEl.width = size;
    canvasEl.height = size;
    const ctx = canvasEl.getContext("2d");
    if (!ctx)
      return;
    ctx.fillStyle = darkMode ? "#212529" : "#f8f9fa";
    ctx.fillRect(0, 0, size, size);
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineWidth = 1.25 * currentZoom * dpr;
    const t = 8 / 12;
    const s = (v) => v * currentZoom * dpr;
    ctx.beginPath();
    ctx.moveTo(s(t * 1), s(t * 3));
    ctx.lineTo(s(t * 3), s(t * 1));
    ctx.moveTo(s(t * 5), s(t * 7));
    ctx.lineTo(s(t * 7), s(t * 5));
    ctx.moveTo(s(t * 9), s(t * 11));
    ctx.lineTo(s(t * 11), s(t * 9));
    ctx.stroke();
    canvasEl.toBlob((blob) => {
      if (!blob || import_editor.debugFlags.throwToBlob.value) {
        reject();
      } else {
        resolve(blob);
      }
    });
  });
};
const canvasBlob = (size, fn) => {
  const canvas = document.createElement("canvas");
  canvas.width = size[0];
  canvas.height = size[1];
  const ctx = canvas.getContext("2d");
  if (!ctx)
    return "";
  fn(ctx);
  return canvas.toDataURL();
};
const getDefaultPatterns = () => {
  const defaultPatterns = [];
  for (let i = 1; i <= Math.ceil(import_editor.MAX_ZOOM); i++) {
    const whitePixelBlob = canvasBlob([1, 1], (ctx) => {
      ctx.fillStyle = import_editor.DefaultColorThemePalette.lightMode.black.semi;
      ctx.fillRect(0, 0, 1, 1);
    });
    const blackPixelBlob = canvasBlob([1, 1], (ctx) => {
      ctx.fillStyle = import_editor.DefaultColorThemePalette.darkMode.black.semi;
      ctx.fillRect(0, 0, 1, 1);
    });
    defaultPatterns.push({
      zoom: i,
      url: whitePixelBlob,
      darkMode: false
    });
    defaultPatterns.push({
      zoom: i,
      url: blackPixelBlob,
      darkMode: true
    });
  }
  return defaultPatterns;
};
function usePattern() {
  const editor = (0, import_editor.useEditor)();
  const dpr = editor.instanceState.devicePixelRatio;
  const [isReady, setIsReady] = (0, import_react.useState)(false);
  const defaultPatterns = (0, import_react.useMemo)(() => getDefaultPatterns(), []);
  const [backgroundUrls, setBackgroundUrls] = (0, import_react.useState)(defaultPatterns);
  (0, import_react.useEffect)(() => {
    const promises = [];
    for (let i = 1; i <= Math.ceil(import_editor.MAX_ZOOM); i++) {
      promises.push(
        generateImage(dpr, i, false).then((blob) => ({
          zoom: i,
          url: URL.createObjectURL(blob),
          darkMode: false
        }))
      );
      promises.push(
        generateImage(dpr, i, true).then((blob) => ({
          zoom: i,
          url: URL.createObjectURL(blob),
          darkMode: true
        }))
      );
    }
    let isCancelled = false;
    Promise.all(promises).then((urls) => {
      if (isCancelled)
        return;
      setBackgroundUrls(urls);
      setIsReady(true);
    });
    return () => {
      isCancelled = true;
      setIsReady(false);
    };
  }, [dpr]);
  const defs = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: backgroundUrls.map((item) => {
    const key = item.zoom + (item.darkMode ? "_dark" : "_light");
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "pattern",
      {
        id: import_editor.HASH_PATTERN_ZOOM_NAMES[key],
        width: TILE_PATTERN_SIZE,
        height: TILE_PATTERN_SIZE,
        patternUnits: "userSpaceOnUse",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("image", { href: item.url, width: TILE_PATTERN_SIZE, height: TILE_PATTERN_SIZE })
      },
      key
    );
  }) });
  return { defs, isReady };
}
function PatternFillDefForCanvas() {
  const editor = (0, import_editor.useEditor)();
  const containerRef = (0, import_react.useRef)(null);
  const { defs, isReady } = usePattern();
  (0, import_react.useEffect)(() => {
    if (isReady && editor.environment.isSafari) {
      const htmlLayer = findHtmlLayerParent(containerRef.current);
      if (htmlLayer) {
        requestAnimationFrame(() => {
          htmlLayer.style.display = "none";
          requestAnimationFrame(() => {
            htmlLayer.style.display = "";
          });
        });
      }
    }
  }, [editor, isReady]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { ref: containerRef, children: defs });
}
function findHtmlLayerParent(element) {
  if (element.classList.contains("tl-html-layer"))
    return element;
  if (element.parentElement)
    return findHtmlLayerParent(element.parentElement);
  return null;
}
//# sourceMappingURL=defaultStyleDefs.js.map
