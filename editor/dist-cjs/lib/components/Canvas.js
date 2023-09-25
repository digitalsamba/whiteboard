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
var Canvas_exports = {};
__export(Canvas_exports, {
  Canvas: () => Canvas,
  SelectionBackgroundWrapper: () => SelectionBackgroundWrapper,
  SelectionForegroundWrapper: () => SelectionForegroundWrapper
});
module.exports = __toCommonJS(Canvas_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_state = require("@tldraw/state");
var import_utils = require("@tldraw/utils");
var import_classnames = __toESM(require("classnames"));
var import_react = __toESM(require("react"));
var import_useCanvasEvents = require("../hooks/useCanvasEvents");
var import_useCoarsePointer = require("../hooks/useCoarsePointer");
var import_useDocumentEvents = require("../hooks/useDocumentEvents");
var import_useEditor = require("../hooks/useEditor");
var import_useEditorComponents = require("../hooks/useEditorComponents");
var import_useFixSafariDoubleTapZoomPencilEvents = require("../hooks/useFixSafariDoubleTapZoomPencilEvents");
var import_useGestureEvents = require("../hooks/useGestureEvents");
var import_useHandleEvents = require("../hooks/useHandleEvents");
var import_useScreenBounds = require("../hooks/useScreenBounds");
var import_Matrix2d = require("../primitives/Matrix2d");
var import_utils2 = require("../primitives/utils");
var import_debug_flags = require("../utils/debug-flags");
var import_LiveCollaborators = require("./LiveCollaborators");
var import_Shape = require("./Shape");
var import_ShapeIndicator = require("./ShapeIndicator");
const Canvas = (0, import_state.track)(function Canvas2({ className }) {
  const editor = (0, import_useEditor.useEditor)();
  const { Background, SvgDefs } = (0, import_useEditorComponents.useEditorComponents)();
  const rCanvas = import_react.default.useRef(null);
  const rHtmlLayer = import_react.default.useRef(null);
  const rHtmlLayer2 = import_react.default.useRef(null);
  (0, import_useScreenBounds.useScreenBounds)();
  (0, import_useDocumentEvents.useDocumentEvents)();
  (0, import_useCoarsePointer.useCoarsePointer)();
  (0, import_useGestureEvents.useGestureEvents)(rCanvas);
  (0, import_useFixSafariDoubleTapZoomPencilEvents.useFixSafariDoubleTapZoomPencilEvents)(rCanvas);
  (0, import_state.useQuickReactor)(
    "position layers",
    () => {
      const htmlElm = rHtmlLayer.current;
      if (!htmlElm)
        return;
      const htmlElm2 = rHtmlLayer2.current;
      if (!htmlElm2)
        return;
      const { x, y, z } = editor.camera;
      const offset = z >= 1 ? (0, import_utils.modulate)(z, [1, 8], [0.125, 0.5], true) : (0, import_utils.modulate)(z, [0.1, 1], [-2, 0.125], true);
      const transform = `scale(${(0, import_utils2.toDomPrecision)(z)}) translate(${(0, import_utils2.toDomPrecision)(
        x + offset
      )}px,${(0, import_utils2.toDomPrecision)(y + offset)}px)`;
      htmlElm.style.setProperty("transform", transform);
      htmlElm2.style.setProperty("transform", transform);
    },
    [editor]
  );
  const events = (0, import_useCanvasEvents.useCanvasEvents)();
  const shapeSvgDefs = (0, import_state.useValue)(
    "shapeSvgDefs",
    () => {
      const shapeSvgDefsByKey = /* @__PURE__ */ new Map();
      for (const util of (0, import_utils.objectMapValues)(editor.shapeUtils)) {
        if (!util)
          return;
        const defs = util.getCanvasSvgDefs();
        for (const { key, component: Component } of defs) {
          if (shapeSvgDefsByKey.has(key))
            continue;
          shapeSvgDefsByKey.set(key, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {}, key));
        }
      }
      return [...shapeSvgDefsByKey.values()];
    },
    [editor]
  );
  import_react.default.useEffect(() => {
    rCanvas.current?.focus();
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      ref: rCanvas,
      draggable: false,
      className: (0, import_classnames.default)("tl-canvas", className),
      "data-testid": "canvas",
      ...events,
      children: [
        Background && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Background, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridWrapper, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiLogger, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: "tl-svg-context", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
          shapeSvgDefs,
          Cursor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cursor, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollaboratorHint, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowheadDot, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowheadCross, {}),
          SvgDefs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgDefs, {})
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: rHtmlLayer, className: "tl-html-layer tl-shapes", draggable: false, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionBackgroundWrapper, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShapesToDisplay, {})
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tl-fixed-layer tl-overlays", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: rHtmlLayer2, className: "tl-html-layer", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandlesWrapper, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrushWrapper, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScribbleWrapper, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomBrushWrapper, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectedIdIndicators, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoveredShapeIndicator, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HintedShapeIndicator, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SnapLinesWrapper, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionForegroundWrapper, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_LiveCollaborators.LiveCollaborators, {})
        ] }) })
      ]
    }
  );
});
function GridWrapper() {
  const editor = (0, import_useEditor.useEditor)();
  const gridSize = (0, import_state.useValue)("gridSize", () => editor.documentSettings.gridSize, [editor]);
  const { x, y, z } = (0, import_state.useValue)("camera", () => editor.camera, [editor]);
  const isGridMode = (0, import_state.useValue)("isGridMode", () => editor.instanceState.isGridMode, [editor]);
  const { Grid } = (0, import_useEditorComponents.useEditorComponents)();
  if (!(Grid && isGridMode))
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { x, y, z, size: gridSize });
}
function ScribbleWrapper() {
  const editor = (0, import_useEditor.useEditor)();
  const scribble = (0, import_state.useValue)("scribble", () => editor.instanceState.scribble, [editor]);
  const zoomLevel = (0, import_state.useValue)("zoomLevel", () => editor.zoomLevel, [editor]);
  const { Scribble } = (0, import_useEditorComponents.useEditorComponents)();
  if (!(Scribble && scribble))
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scribble, { className: "tl-user-scribble", scribble, zoom: zoomLevel });
}
function BrushWrapper() {
  const editor = (0, import_useEditor.useEditor)();
  const brush = (0, import_state.useValue)("brush", () => editor.instanceState.brush, [editor]);
  const { Brush } = (0, import_useEditorComponents.useEditorComponents)();
  if (!(Brush && brush))
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brush, { className: "tl-user-brush", brush });
}
function ZoomBrushWrapper() {
  const editor = (0, import_useEditor.useEditor)();
  const zoomBrush = (0, import_state.useValue)("zoomBrush", () => editor.instanceState.zoomBrush, [editor]);
  const { ZoomBrush } = (0, import_useEditorComponents.useEditorComponents)();
  if (!(ZoomBrush && zoomBrush))
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomBrush, { className: "tl-user-brush", brush: zoomBrush });
}
function SnapLinesWrapper() {
  const editor = (0, import_useEditor.useEditor)();
  const lines = (0, import_state.useValue)("snapLines", () => editor.snaps.lines, [editor]);
  const zoomLevel = (0, import_state.useValue)("zoomLevel", () => editor.zoomLevel, [editor]);
  const { SnapLine } = (0, import_useEditorComponents.useEditorComponents)();
  if (!(SnapLine && lines.length > 0))
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SnapLine, { className: "tl-user-snapline", line, zoom: zoomLevel }, line.id)) });
}
const MIN_HANDLE_DISTANCE = 48;
function HandlesWrapper() {
  const editor = (0, import_useEditor.useEditor)();
  const { Handles } = (0, import_useEditorComponents.useEditorComponents)();
  const zoomLevel = (0, import_state.useValue)("zoomLevel", () => editor.zoomLevel, [editor]);
  const isCoarse = (0, import_state.useValue)("coarse pointer", () => editor.instanceState.isCoarsePointer, [editor]);
  const onlySelectedShape = (0, import_state.useValue)("onlySelectedShape", () => editor.onlySelectedShape, [editor]);
  const isChangingStyle = (0, import_state.useValue)("isChangingStyle", () => editor.instanceState.isChangingStyle, [
    editor
  ]);
  const isReadonly = (0, import_state.useValue)("isChangingStyle", () => editor.instanceState.isReadonly, [editor]);
  const handles = (0, import_state.useValue)(
    "handles",
    () => editor.onlySelectedShape ? editor.getShapeHandles(editor.onlySelectedShape) : void 0,
    [editor]
  );
  const transform = (0, import_state.useValue)(
    "transform",
    () => editor.onlySelectedShape ? editor.getShapePageTransform(editor.onlySelectedShape) : void 0,
    [editor]
  );
  if (!Handles || !onlySelectedShape || isChangingStyle || isReadonly)
    return null;
  if (!handles)
    return null;
  if (!transform)
    return null;
  const handlesToDisplay = [];
  for (let i = 0, handle = handles[i]; i < handles.length; i++, handle = handles[i]) {
    if (handle.type !== "vertex") {
      const prev = handles[i - 1];
      const next = handles[i + 1];
      if (prev && next) {
        if (Math.hypot(prev.y - next.y, prev.x - next.x) < MIN_HANDLE_DISTANCE / zoomLevel) {
          continue;
        }
      }
    }
    handlesToDisplay.push(handle);
  }
  handlesToDisplay.sort((a) => a.type === "vertex" ? 1 : -1);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handles, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { transform: import_Matrix2d.Matrix2d.toCssString(transform), children: handlesToDisplay.map((handle) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      HandleWrapper,
      {
        shapeId: onlySelectedShape.id,
        handle,
        zoom: zoomLevel,
        isCoarse
      },
      handle.id
    );
  }) }) });
}
function HandleWrapper({
  shapeId,
  handle,
  zoom,
  isCoarse
}) {
  const events = (0, import_useHandleEvents.useHandleEvents)(shapeId, handle.id);
  const { Handle } = (0, import_useEditorComponents.useEditorComponents)();
  if (!Handle)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { "aria-label": "handle", transform: `translate(${handle.x}, ${handle.y})`, ...events, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handle, { shapeId, handle, zoom, isCoarse }) });
}
const ShapesToDisplay = (0, import_state.track)(function ShapesToDisplay2() {
  const editor = (0, import_useEditor.useEditor)();
  const { renderingShapes } = editor;
  const debugSvg = import_debug_flags.debugFlags.debugSvg.value;
  if (debugSvg) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: renderingShapes.map((result) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.default.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Shape.Shape, { ...result }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DebugSvgCopy, { id: result.id })
    ] }, result.id + "_fragment")) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: renderingShapes.map((result) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Shape.Shape, { ...result }, result.id + "_shape")) });
});
function SelectedIdIndicators() {
  const editor = (0, import_useEditor.useEditor)();
  const selectedShapeIds = (0, import_state.useValue)(
    "selectedShapeIds",
    () => editor.currentPageState.selectedShapeIds,
    [editor]
  );
  const shouldDisplay = (0, import_state.useValue)(
    "should display selected ids",
    () => {
      return editor.isInAny(
        "select.idle",
        "select.brushing",
        "select.scribble_brushing",
        "select.pointing_shape",
        "select.pointing_selection",
        "select.pointing_handle"
      ) && !editor.instanceState.isChangingStyle;
    },
    [editor]
  );
  if (!shouldDisplay)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: selectedShapeIds.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeIndicator.ShapeIndicator, { className: "tl-user-indicator__selected", id }, id + "_indicator")) });
}
const HoveredShapeIndicator = function HoveredShapeIndicator2() {
  const editor = (0, import_useEditor.useEditor)();
  const { HoveredShapeIndicator: HoveredShapeIndicator3 } = (0, import_useEditorComponents.useEditorComponents)();
  const hoveredShapeId = (0, import_state.useValue)("hovered id", () => editor.currentPageState.hoveredShapeId, [
    editor
  ]);
  if (!hoveredShapeId || !HoveredShapeIndicator3)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoveredShapeIndicator3, { shapeId: hoveredShapeId });
};
const HintedShapeIndicator = (0, import_state.track)(function HintedShapeIndicator2() {
  const editor = (0, import_useEditor.useEditor)();
  const ids = (0, import_utils.dedupe)(editor.hintingShapeIds);
  if (!ids.length)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: ids.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeIndicator.ShapeIndicator, { className: "tl-user-indicator__hint", id }, id + "_hinting")) });
});
function Cursor() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { id: "cursor", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { fill: "rgba(0,0,0,.2)", transform: "translate(-11,-11)", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { fill: "white", transform: "translate(-12,-12)", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { fill: "currentColor", transform: "translate(-12,-12)", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m19.751 24.4155-1.844.774-3.1-7.374 1.841-.775z" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m13 10.814v11.188l2.969-2.866.428-.139h4.768z" })
    ] })
  ] });
}
function CollaboratorHint() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { id: "cursor_hint", fill: "currentColor", d: "M -2,-5 2,0 -2,5 Z" });
}
function ArrowheadDot() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("marker", { id: "arrowhead-dot", className: "tl-arrow-hint", refX: "3.0", refY: "3.0", orient: "0", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "3", cy: "3", r: "2", strokeDasharray: "100%" }) });
}
function ArrowheadCross() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("marker", { id: "arrowhead-cross", className: "tl-arrow-hint", refX: "3.0", refY: "3.0", orient: "auto", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "1.5", y1: "1.5", x2: "4.5", y2: "4.5", strokeDasharray: "100%" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "1.5", y1: "4.5", x2: "4.5", y2: "1.5", strokeDasharray: "100%" })
  ] });
}
const DebugSvgCopy = (0, import_state.track)(function DupSvg({ id }) {
  const editor = (0, import_useEditor.useEditor)();
  const shape = editor.getShape(id);
  const [html, setHtml] = import_react.default.useState("");
  const isInRoot = shape?.parentId === editor.currentPageId;
  import_react.default.useEffect(() => {
    if (!isInRoot)
      return;
    let latest = null;
    const unsubscribe = (0, import_state.react)("shape to svg", async () => {
      const renderId = Math.random();
      latest = renderId;
      const bb = editor.getShapePageBounds(id);
      const el = await editor.getSvg([id], { padding: 0 });
      if (el && bb && latest === renderId) {
        el.style.setProperty("overflow", "visible");
        el.setAttribute("preserveAspectRatio", "xMidYMin slice");
        el.style.setProperty("transform", `translate(${bb.x}px, ${bb.y + bb.h + 12}px)`);
        el.style.setProperty("border", "1px solid black");
        setHtml(el?.outerHTML);
      }
    });
    return () => {
      latest = null;
      unsubscribe();
    };
  }, [editor, id, isInRoot]);
  if (!isInRoot)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { paddingTop: 12, position: "absolute" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex" }, dangerouslySetInnerHTML: { __html: html } }) });
});
const UiLogger = (0, import_state.track)(() => {
  const logMessages = import_debug_flags.debugFlags.logMessages.value;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "debug__ui-logger", children: logMessages.map((message, messageIndex) => {
    const text = typeof message === "string" ? message : JSON.stringify(message);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "debug__ui-logger__line", children: text }, messageIndex);
  }) });
});
function SelectionForegroundWrapper() {
  const editor = (0, import_useEditor.useEditor)();
  const selectionRotation = (0, import_state.useValue)("selection rotation", () => editor.selectionRotation, [editor]);
  const selectionBounds = (0, import_state.useValue)("selection bounds", () => editor.selectionRotatedPageBounds, [
    editor
  ]);
  const { SelectionForeground } = (0, import_useEditorComponents.useEditorComponents)();
  if (!selectionBounds || !SelectionForeground)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionForeground, { bounds: selectionBounds, rotation: selectionRotation });
}
function SelectionBackgroundWrapper() {
  const editor = (0, import_useEditor.useEditor)();
  const selectionRotation = (0, import_state.useValue)("selection rotation", () => editor.selectionRotation, [editor]);
  const selectionBounds = (0, import_state.useValue)("selection bounds", () => editor.selectionRotatedPageBounds, [
    editor
  ]);
  const { SelectionBackground } = (0, import_useEditorComponents.useEditorComponents)();
  if (!selectionBounds || !SelectionBackground)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionBackground, { bounds: selectionBounds, rotation: selectionRotation });
}
//# sourceMappingURL=Canvas.js.map
