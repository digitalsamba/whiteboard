import { jsx } from "react/jsx-runtime";
import {
  ANIMATION_MEDIUM_MS,
  Box2d,
  Vec2d,
  getPointerInfo,
  intersectPolygonPolygon,
  normalizeWheel,
  setPointerCapture,
  useComputed,
  useEditor,
  useIsDarkMode,
  useQuickReactor
} from "@tldraw/editor";
import * as React from "react";
import { MinimapManager } from "./MinimapManager.mjs";
function Minimap({ shapeFill, selectFill, viewportFill }) {
  const editor = useEditor();
  const rCanvas = React.useRef(null);
  const rPointing = React.useRef(false);
  const isDarkMode = useIsDarkMode();
  const devicePixelRatio = useComputed("dpr", () => editor.instanceState.devicePixelRatio, [editor]);
  const presences = React.useMemo(() => editor.store.query.records("instance_presence"), [editor]);
  const minimap = React.useMemo(() => new MinimapManager(editor), [editor]);
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
      editor.centerOnPoint(point, { duration: ANIMATION_MEDIUM_MS });
    },
    [editor, minimap]
  );
  const onPointerDown = React.useCallback(
    (e) => {
      setPointerCapture(e.currentTarget, e);
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
        editor.centerOnPoint(point, { duration: ANIMATION_MEDIUM_MS });
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
          const center = Vec2d.Add(minimap.originPageCenter, delta);
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
        ...getPointerInfo(e),
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
      const offset = normalizeWheel(e);
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
  useQuickReactor(
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
  useQuickReactor(
    "minimap render when pagebounds or collaborators changes",
    () => {
      const {
        currentPageShapeIds: shapeIdsOnCurrentPage,
        viewportPageBounds,
        currentPageBounds: commonBoundsOfAllShapesOnCurrentPage
      } = editor;
      const _dpr = devicePixelRatio.value;
      minimap.contentPageBounds = commonBoundsOfAllShapesOnCurrentPage ? Box2d.Expand(commonBoundsOfAllShapesOnCurrentPage, viewportPageBounds) : viewportPageBounds;
      minimap.updateContentScreenBounds();
      const allShapeBounds = [];
      shapeIdsOnCurrentPage.forEach((id) => {
        let pageBounds = editor.getShapePageBounds(id);
        if (!pageBounds)
          return;
        const pageMask = editor.getShapeMask(id);
        if (pageMask) {
          const intersection = intersectPolygonPolygon(pageMask, pageBounds.corners);
          if (!intersection) {
            return;
          }
          pageBounds = Box2d.FromPoints(intersection);
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
  return /* @__PURE__ */ jsx("div", { className: "tlui-minimap", children: /* @__PURE__ */ jsx(
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
export {
  Minimap
};
//# sourceMappingURL=Minimap.mjs.map
