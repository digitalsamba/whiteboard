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
var Minimap_exports = {};
__export(Minimap_exports, {
  Minimap: () => Minimap
});
module.exports = __toCommonJS(Minimap_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var React = __toESM(require("react"));
var import_MinimapManager = require("./MinimapManager");
function Minimap({ shapeFill, selectFill, viewportFill }) {
  const editor = (0, import_editor.useEditor)();
  const rCanvas = React.useRef(null);
  const rPointing = React.useRef(false);
  const isDarkMode = (0, import_editor.useIsDarkMode)();
  const devicePixelRatio = (0, import_editor.useComputed)("dpr", () => editor.instanceState.devicePixelRatio, [editor]);
  const presences = React.useMemo(() => editor.store.query.records("instance_presence"), [editor]);
  const minimap = React.useMemo(() => new import_MinimapManager.MinimapManager(editor), [editor]);
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const style = getComputedStyle(editor.getContainer());
      minimap.colors = {
        shapeFill: style.getPropertyValue(shapeFill).trim(),
        selectFill: style.getPropertyValue(selectFill).trim(),
        viewportFill: style.getPropertyValue(viewportFill).trim()
      };
      minimap.render();
    });
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [editor, selectFill, shapeFill, viewportFill, minimap, isDarkMode]);
  const onDoubleClick = React.useCallback(
    (e) => {
      if (!editor.currentPageShapeIds.size)
        return;
      const point = minimap.minimapScreenPointToPagePoint(e.clientX, e.clientY, false, false);
      const clampedPoint = minimap.minimapScreenPointToPagePoint(e.clientX, e.clientY, false, true);
      minimap.originPagePoint.setTo(clampedPoint);
      minimap.originPageCenter.setTo(editor.viewportPageBounds.center);
      editor.centerOnPoint(point, { duration: import_editor.ANIMATION_MEDIUM_MS });
    },
    [editor, minimap]
  );
  const onPointerDown = React.useCallback(
    (e) => {
      (0, import_editor.setPointerCapture)(e.currentTarget, e);
      if (!editor.currentPageShapeIds.size)
        return;
      rPointing.current = true;
      minimap.isInViewport = false;
      const point = minimap.minimapScreenPointToPagePoint(e.clientX, e.clientY, false, false);
      const clampedPoint = minimap.minimapScreenPointToPagePoint(e.clientX, e.clientY, false, true);
      const _vpPageBounds = editor.viewportPageBounds;
      minimap.originPagePoint.setTo(clampedPoint);
      minimap.originPageCenter.setTo(_vpPageBounds.center);
      minimap.isInViewport = _vpPageBounds.containsPoint(clampedPoint);
      if (!minimap.isInViewport) {
        editor.centerOnPoint(point, { duration: import_editor.ANIMATION_MEDIUM_MS });
      }
    },
    [editor, minimap]
  );
  const onPointerMove = React.useCallback(
    (e) => {
      if (rPointing.current) {
        const point = minimap.minimapScreenPointToPagePoint(e.clientX, e.clientY, e.shiftKey, true);
        if (minimap.isInViewport) {
          const delta = point.clone().sub(minimap.originPagePoint).add(minimap.originPageCenter);
          const center = import_editor.Vec2d.Add(minimap.originPageCenter, delta);
          editor.centerOnPoint(center);
          return;
        }
        editor.centerOnPoint(point);
      }
      const pagePoint = minimap.getPagePoint(e.clientX, e.clientY);
      const screenPoint = editor.pageToScreen(pagePoint);
      const info = {
        type: "pointer",
        target: "canvas",
        name: "pointer_move",
        ...(0, import_editor.getPointerInfo)(e),
        point: screenPoint,
        isPen: editor.instanceState.isPenMode
      };
      editor.dispatch(info);
    },
    [editor, minimap]
  );
  const onPointerUp = React.useCallback((_e) => {
    rPointing.current = false;
  }, []);
  const onWheel = React.useCallback(
    (e) => {
      const offset = (0, import_editor.normalizeWheel)(e);
      editor.dispatch({
        type: "wheel",
        name: "wheel",
        delta: offset,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        ctrlKey: e.metaKey || e.ctrlKey
      });
    },
    [editor]
  );
  (0, import_editor.useQuickReactor)(
    "update when dpr changes",
    () => {
      const dpr = devicePixelRatio.value;
      minimap.setDpr(dpr);
      const canvas = rCanvas.current;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width * dpr;
      const height = rect.height * dpr;
      canvas.width = width;
      canvas.height = height;
      minimap.canvasScreenBounds.set(rect.x, rect.y, width, height);
      minimap.cvs = rCanvas.current;
    },
    [devicePixelRatio, minimap]
  );
  (0, import_editor.useQuickReactor)(
    "minimap render when pagebounds or collaborators changes",
    () => {
      const {
        currentPageShapeIds: shapeIdsOnCurrentPage,
        viewportPageBounds,
        currentPageBounds: commonBoundsOfAllShapesOnCurrentPage
      } = editor;
      const _dpr = devicePixelRatio.value;
      minimap.contentPageBounds = commonBoundsOfAllShapesOnCurrentPage ? import_editor.Box2d.Expand(commonBoundsOfAllShapesOnCurrentPage, viewportPageBounds) : viewportPageBounds;
      minimap.updateContentScreenBounds();
      const allShapeBounds = [];
      shapeIdsOnCurrentPage.forEach((id) => {
        let pageBounds = editor.getShapePageBounds(id);
        if (!pageBounds)
          return;
        const pageMask = editor.getShapeMask(id);
        if (pageMask) {
          const intersection = (0, import_editor.intersectPolygonPolygon)(pageMask, pageBounds.corners);
          if (!intersection) {
            return;
          }
          pageBounds = import_editor.Box2d.FromPoints(intersection);
        }
        if (pageBounds) {
          pageBounds.id = id;
          allShapeBounds.push(pageBounds);
        }
      });
      minimap.pageBounds = allShapeBounds;
      minimap.collaborators = presences.value;
      minimap.render();
    },
    [editor, minimap]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tlui-minimap", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "canvas",
    {
      ref: rCanvas,
      className: "tlui-minimap__canvas",
      onDoubleClick,
      onPointerMove,
      onPointerDown,
      onPointerUp,
      onWheel
    }
  ) });
}
//# sourceMappingURL=Minimap.js.map
