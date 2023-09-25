import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { react, track, useQuickReactor, useValue } from "@tldraw/state";
import { dedupe, modulate, objectMapValues } from "@tldraw/utils";
import classNames from "classnames";
import React from "react";
import { useCanvasEvents } from "../hooks/useCanvasEvents.mjs";
import { useCoarsePointer } from "../hooks/useCoarsePointer.mjs";
import { useDocumentEvents } from "../hooks/useDocumentEvents.mjs";
import { useEditor } from "../hooks/useEditor.mjs";
import { useEditorComponents } from "../hooks/useEditorComponents.mjs";
import { useFixSafariDoubleTapZoomPencilEvents } from "../hooks/useFixSafariDoubleTapZoomPencilEvents.mjs";
import { useGestureEvents } from "../hooks/useGestureEvents.mjs";
import { useHandleEvents } from "../hooks/useHandleEvents.mjs";
import { useScreenBounds } from "../hooks/useScreenBounds.mjs";
import { Matrix2d } from "../primitives/Matrix2d.mjs";
import { toDomPrecision } from "../primitives/utils.mjs";
import { debugFlags } from "../utils/debug-flags.mjs";
import { LiveCollaborators } from "./LiveCollaborators.mjs";
import { Shape } from "./Shape.mjs";
import { ShapeIndicator } from "./ShapeIndicator.mjs";
const Canvas = track(function Canvas2({ className }) {
  const editor = useEditor();
  const { Background, SvgDefs } = useEditorComponents();
  const rCanvas = React.useRef(null);
  const rHtmlLayer = React.useRef(null);
  const rHtmlLayer2 = React.useRef(null);
  useScreenBounds();
  useDocumentEvents();
  useCoarsePointer();
  useGestureEvents(rCanvas);
  useFixSafariDoubleTapZoomPencilEvents(rCanvas);
  useQuickReactor(
    "position layers",
    () => {
      const htmlElm = rHtmlLayer.current;
      if (!htmlElm)
        return;
      const htmlElm2 = rHtmlLayer2.current;
      if (!htmlElm2)
        return;
      const { x, y, z } = editor.camera;
      const offset = z >= 1 ? modulate(z, [1, 8], [0.125, 0.5], true) : modulate(z, [0.1, 1], [-2, 0.125], true);
      const transform = `scale(${toDomPrecision(z)}) translate(${toDomPrecision(
        x + offset
      )}px,${toDomPrecision(y + offset)}px)`;
      htmlElm.style.setProperty("transform", transform);
      htmlElm2.style.setProperty("transform", transform);
    },
    [editor]
  );
  const events = useCanvasEvents();
  const shapeSvgDefs = useValue(
    "shapeSvgDefs",
    () => {
      const shapeSvgDefsByKey = /* @__PURE__ */ new Map();
      for (const util of objectMapValues(editor.shapeUtils)) {
        if (!util)
          return;
        const defs = util.getCanvasSvgDefs();
        for (const { key, component: Component } of defs) {
          if (shapeSvgDefsByKey.has(key))
            continue;
          shapeSvgDefsByKey.set(key, /* @__PURE__ */ jsx(Component, {}, key));
        }
      }
      return [...shapeSvgDefsByKey.values()];
    },
    [editor]
  );
  React.useEffect(() => {
    rCanvas.current?.focus();
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: rCanvas,
      draggable: false,
      className: classNames("tl-canvas", className),
      "data-testid": "canvas",
      ...events,
      children: [
        Background && /* @__PURE__ */ jsx(Background, {}),
        /* @__PURE__ */ jsx(GridWrapper, {}),
        /* @__PURE__ */ jsx(UiLogger, {}),
        /* @__PURE__ */ jsx("svg", { className: "tl-svg-context", children: /* @__PURE__ */ jsxs("defs", { children: [
          shapeSvgDefs,
          Cursor && /* @__PURE__ */ jsx(Cursor, {}),
          /* @__PURE__ */ jsx(CollaboratorHint, {}),
          /* @__PURE__ */ jsx(ArrowheadDot, {}),
          /* @__PURE__ */ jsx(ArrowheadCross, {}),
          SvgDefs && /* @__PURE__ */ jsx(SvgDefs, {})
        ] }) }),
        /* @__PURE__ */ jsxs("div", { ref: rHtmlLayer, className: "tl-html-layer tl-shapes", draggable: false, children: [
          /* @__PURE__ */ jsx(SelectionBackgroundWrapper, {}),
          /* @__PURE__ */ jsx(ShapesToDisplay, {})
        ] }),
        /* @__PURE__ */ jsx("div", { className: "tl-fixed-layer tl-overlays", children: /* @__PURE__ */ jsxs("div", { ref: rHtmlLayer2, className: "tl-html-layer", children: [
          /* @__PURE__ */ jsx(HandlesWrapper, {}),
          /* @__PURE__ */ jsx(BrushWrapper, {}),
          /* @__PURE__ */ jsx(ScribbleWrapper, {}),
          /* @__PURE__ */ jsx(ZoomBrushWrapper, {}),
          /* @__PURE__ */ jsx(SelectedIdIndicators, {}),
          /* @__PURE__ */ jsx(HoveredShapeIndicator, {}),
          /* @__PURE__ */ jsx(HintedShapeIndicator, {}),
          /* @__PURE__ */ jsx(SnapLinesWrapper, {}),
          /* @__PURE__ */ jsx(SelectionForegroundWrapper, {}),
          /* @__PURE__ */ jsx(LiveCollaborators, {})
        ] }) })
      ]
    }
  );
});
function GridWrapper() {
  const editor = useEditor();
  const gridSize = useValue("gridSize", () => editor.documentSettings.gridSize, [editor]);
  const { x, y, z } = useValue("camera", () => editor.camera, [editor]);
  const isGridMode = useValue("isGridMode", () => editor.instanceState.isGridMode, [editor]);
  const { Grid } = useEditorComponents();
  if (!(Grid && isGridMode))
    return null;
  return /* @__PURE__ */ jsx(Grid, { x, y, z, size: gridSize });
}
function ScribbleWrapper() {
  const editor = useEditor();
  const scribble = useValue("scribble", () => editor.instanceState.scribble, [editor]);
  const zoomLevel = useValue("zoomLevel", () => editor.zoomLevel, [editor]);
  const { Scribble } = useEditorComponents();
  if (!(Scribble && scribble))
    return null;
  return /* @__PURE__ */ jsx(Scribble, { className: "tl-user-scribble", scribble, zoom: zoomLevel });
}
function BrushWrapper() {
  const editor = useEditor();
  const brush = useValue("brush", () => editor.instanceState.brush, [editor]);
  const { Brush } = useEditorComponents();
  if (!(Brush && brush))
    return null;
  return /* @__PURE__ */ jsx(Brush, { className: "tl-user-brush", brush });
}
function ZoomBrushWrapper() {
  const editor = useEditor();
  const zoomBrush = useValue("zoomBrush", () => editor.instanceState.zoomBrush, [editor]);
  const { ZoomBrush } = useEditorComponents();
  if (!(ZoomBrush && zoomBrush))
    return null;
  return /* @__PURE__ */ jsx(ZoomBrush, { className: "tl-user-brush", brush: zoomBrush });
}
function SnapLinesWrapper() {
  const editor = useEditor();
  const lines = useValue("snapLines", () => editor.snaps.lines, [editor]);
  const zoomLevel = useValue("zoomLevel", () => editor.zoomLevel, [editor]);
  const { SnapLine } = useEditorComponents();
  if (!(SnapLine && lines.length > 0))
    return null;
  return /* @__PURE__ */ jsx(Fragment, { children: lines.map((line) => /* @__PURE__ */ jsx(SnapLine, { className: "tl-user-snapline", line, zoom: zoomLevel }, line.id)) });
}
const MIN_HANDLE_DISTANCE = 48;
function HandlesWrapper() {
  const editor = useEditor();
  const { Handles } = useEditorComponents();
  const zoomLevel = useValue("zoomLevel", () => editor.zoomLevel, [editor]);
  const isCoarse = useValue("coarse pointer", () => editor.instanceState.isCoarsePointer, [editor]);
  const onlySelectedShape = useValue("onlySelectedShape", () => editor.onlySelectedShape, [editor]);
  const isChangingStyle = useValue("isChangingStyle", () => editor.instanceState.isChangingStyle, [
    editor
  ]);
  const isReadonly = useValue("isChangingStyle", () => editor.instanceState.isReadonly, [editor]);
  const handles = useValue(
    "handles",
    () => editor.onlySelectedShape ? editor.getShapeHandles(editor.onlySelectedShape) : void 0,
    [editor]
  );
  const transform = useValue(
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
  return /* @__PURE__ */ jsx(Handles, { children: /* @__PURE__ */ jsx("g", { transform: Matrix2d.toCssString(transform), children: handlesToDisplay.map((handle) => {
    return /* @__PURE__ */ jsx(
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
  const events = useHandleEvents(shapeId, handle.id);
  const { Handle } = useEditorComponents();
  if (!Handle)
    return null;
  return /* @__PURE__ */ jsx("g", { "aria-label": "handle", transform: `translate(${handle.x}, ${handle.y})`, ...events, children: /* @__PURE__ */ jsx(Handle, { shapeId, handle, zoom, isCoarse }) });
}
const ShapesToDisplay = track(function ShapesToDisplay2() {
  const editor = useEditor();
  const { renderingShapes } = editor;
  const debugSvg = debugFlags.debugSvg.value;
  if (debugSvg) {
    return /* @__PURE__ */ jsx(Fragment, { children: renderingShapes.map((result) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
      /* @__PURE__ */ jsx(Shape, { ...result }),
      /* @__PURE__ */ jsx(DebugSvgCopy, { id: result.id })
    ] }, result.id + "_fragment")) });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: renderingShapes.map((result) => /* @__PURE__ */ jsx(Shape, { ...result }, result.id + "_shape")) });
});
function SelectedIdIndicators() {
  const editor = useEditor();
  const selectedShapeIds = useValue(
    "selectedShapeIds",
    () => editor.currentPageState.selectedShapeIds,
    [editor]
  );
  const shouldDisplay = useValue(
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
  return /* @__PURE__ */ jsx(Fragment, { children: selectedShapeIds.map((id) => /* @__PURE__ */ jsx(ShapeIndicator, { className: "tl-user-indicator__selected", id }, id + "_indicator")) });
}
const HoveredShapeIndicator = function HoveredShapeIndicator2() {
  const editor = useEditor();
  const { HoveredShapeIndicator: HoveredShapeIndicator3 } = useEditorComponents();
  const hoveredShapeId = useValue("hovered id", () => editor.currentPageState.hoveredShapeId, [
    editor
  ]);
  if (!hoveredShapeId || !HoveredShapeIndicator3)
    return null;
  return /* @__PURE__ */ jsx(HoveredShapeIndicator3, { shapeId: hoveredShapeId });
};
const HintedShapeIndicator = track(function HintedShapeIndicator2() {
  const editor = useEditor();
  const ids = dedupe(editor.hintingShapeIds);
  if (!ids.length)
    return null;
  return /* @__PURE__ */ jsx(Fragment, { children: ids.map((id) => /* @__PURE__ */ jsx(ShapeIndicator, { className: "tl-user-indicator__hint", id }, id + "_hinting")) });
});
function Cursor() {
  return /* @__PURE__ */ jsxs("g", { id: "cursor", children: [
    /* @__PURE__ */ jsxs("g", { fill: "rgba(0,0,0,.2)", transform: "translate(-11,-11)", children: [
      /* @__PURE__ */ jsx("path", { d: "m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" }),
      /* @__PURE__ */ jsx("path", { d: "m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" })
    ] }),
    /* @__PURE__ */ jsxs("g", { fill: "white", transform: "translate(-12,-12)", children: [
      /* @__PURE__ */ jsx("path", { d: "m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" }),
      /* @__PURE__ */ jsx("path", { d: "m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" })
    ] }),
    /* @__PURE__ */ jsxs("g", { fill: "currentColor", transform: "translate(-12,-12)", children: [
      /* @__PURE__ */ jsx("path", { d: "m19.751 24.4155-1.844.774-3.1-7.374 1.841-.775z" }),
      /* @__PURE__ */ jsx("path", { d: "m13 10.814v11.188l2.969-2.866.428-.139h4.768z" })
    ] })
  ] });
}
function CollaboratorHint() {
  return /* @__PURE__ */ jsx("path", { id: "cursor_hint", fill: "currentColor", d: "M -2,-5 2,0 -2,5 Z" });
}
function ArrowheadDot() {
  return /* @__PURE__ */ jsx("marker", { id: "arrowhead-dot", className: "tl-arrow-hint", refX: "3.0", refY: "3.0", orient: "0", children: /* @__PURE__ */ jsx("circle", { cx: "3", cy: "3", r: "2", strokeDasharray: "100%" }) });
}
function ArrowheadCross() {
  return /* @__PURE__ */ jsxs("marker", { id: "arrowhead-cross", className: "tl-arrow-hint", refX: "3.0", refY: "3.0", orient: "auto", children: [
    /* @__PURE__ */ jsx("line", { x1: "1.5", y1: "1.5", x2: "4.5", y2: "4.5", strokeDasharray: "100%" }),
    /* @__PURE__ */ jsx("line", { x1: "1.5", y1: "4.5", x2: "4.5", y2: "1.5", strokeDasharray: "100%" })
  ] });
}
const DebugSvgCopy = track(function DupSvg({ id }) {
  const editor = useEditor();
  const shape = editor.getShape(id);
  const [html, setHtml] = React.useState("");
  const isInRoot = shape?.parentId === editor.currentPageId;
  React.useEffect(() => {
    if (!isInRoot)
      return;
    let latest = null;
    const unsubscribe = react("shape to svg", async () => {
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
  return /* @__PURE__ */ jsx("div", { style: { paddingTop: 12, position: "absolute" }, children: /* @__PURE__ */ jsx("div", { style: { display: "flex" }, dangerouslySetInnerHTML: { __html: html } }) });
});
const UiLogger = track(() => {
  const logMessages = debugFlags.logMessages.value;
  return /* @__PURE__ */ jsx("div", { className: "debug__ui-logger", children: logMessages.map((message, messageIndex) => {
    const text = typeof message === "string" ? message : JSON.stringify(message);
    return /* @__PURE__ */ jsx("div", { className: "debug__ui-logger__line", children: text }, messageIndex);
  }) });
});
function SelectionForegroundWrapper() {
  const editor = useEditor();
  const selectionRotation = useValue("selection rotation", () => editor.selectionRotation, [editor]);
  const selectionBounds = useValue("selection bounds", () => editor.selectionRotatedPageBounds, [
    editor
  ]);
  const { SelectionForeground } = useEditorComponents();
  if (!selectionBounds || !SelectionForeground)
    return null;
  return /* @__PURE__ */ jsx(SelectionForeground, { bounds: selectionBounds, rotation: selectionRotation });
}
function SelectionBackgroundWrapper() {
  const editor = useEditor();
  const selectionRotation = useValue("selection rotation", () => editor.selectionRotation, [editor]);
  const selectionBounds = useValue("selection bounds", () => editor.selectionRotatedPageBounds, [
    editor
  ]);
  const { SelectionBackground } = useEditorComponents();
  if (!selectionBounds || !SelectionBackground)
    return null;
  return /* @__PURE__ */ jsx(SelectionBackground, { bounds: selectionBounds, rotation: selectionRotation });
}
export {
  Canvas,
  SelectionBackgroundWrapper,
  SelectionForegroundWrapper
};
//# sourceMappingURL=Canvas.mjs.map
