import { createUseGesture, pinchAction, wheelAction } from "@use-gesture/react";
import throttle from "lodash.throttle";
import * as React from "react";
import { Vec2d } from "../primitives/Vec2d.mjs";
import { preventDefault } from "../utils/dom.mjs";
import { normalizeWheel } from "../utils/normalizeWheel.mjs";
import { useEditor } from "./useEditor.mjs";
const useGesture = createUseGesture([wheelAction, pinchAction]);
let lastWheelTime = void 0;
const isWheelEndEvent = (time) => {
  if (lastWheelTime === void 0) {
    lastWheelTime = time;
    return false;
  }
  if (time - lastWheelTime > 120 && time - lastWheelTime < 160) {
    lastWheelTime = time;
    return true;
  }
  lastWheelTime = time;
  return false;
};
function useGestureEvents(ref) {
  const editor = useEditor();
  const events = React.useMemo(() => {
    let pinchState = null;
    const onWheel = ({ event }) => {
      if (!editor.instanceState.isFocused) {
        return;
      }
      pinchState = null;
      if (isWheelEndEvent(Date.now())) {
        return;
      }
      if (editor.editingShapeId) {
        const shape = editor.getShape(editor.editingShapeId);
        if (shape) {
          const util = editor.getShapeUtil(shape);
          if (util.canScroll(shape)) {
            const bounds = editor.getShapePageBounds(editor.editingShapeId);
            if (bounds?.containsPoint(editor.inputs.currentPagePoint)) {
              return;
            }
          }
        }
      }
      preventDefault(event);
      const delta = normalizeWheel(event);
      if (delta.x === 0 && delta.y === 0)
        return;
      const info = {
        type: "wheel",
        name: "wheel",
        delta,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        ctrlKey: event.metaKey || event.ctrlKey
      };
      editor.dispatch(info);
    };
    let initTouchDistance = 1;
    let initZoom = 1;
    let currentZoom = 1;
    let currentTouchDistance = 0;
    const initOrigin = new Vec2d();
    const prevOrigin = new Vec2d();
    const onPinchStart = (gesture) => {
      const elm = ref.current;
      pinchState = null;
      const { event, origin, da } = gesture;
      if (event instanceof WheelEvent)
        return;
      if (!(event.target === elm || elm?.contains(event.target)))
        return;
      prevOrigin.x = origin[0];
      prevOrigin.y = origin[1];
      initOrigin.x = origin[0];
      initOrigin.y = origin[1];
      initTouchDistance = da[0];
      initZoom = editor.zoomLevel;
      editor.dispatch({
        type: "pinch",
        name: "pinch_start",
        point: { x: origin[0], y: origin[1], z: editor.zoomLevel },
        delta: { x: 0, y: 0 },
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        ctrlKey: event.metaKey || event.ctrlKey
      });
    };
    const updatePinchState = throttle((type) => {
      if (pinchState === null) {
        const touchDistance = Math.abs(currentTouchDistance - initTouchDistance);
        const originDistance = Vec2d.Dist(initOrigin, prevOrigin);
        if (type === "gesture" && touchDistance) {
          pinchState = "zooming";
        } else if (type === "touch" && touchDistance > 16) {
          pinchState = "zooming";
        } else if (originDistance > 16) {
          pinchState = "panning";
        }
      }
    }, 32);
    const onPinch = (gesture) => {
      const elm = ref.current;
      const { event, origin, offset, da } = gesture;
      if (event instanceof WheelEvent)
        return;
      if (!(event.target === elm || elm?.contains(event.target)))
        return;
      const isGesture = "touches" in event ? false : true;
      currentTouchDistance = da[0];
      if (isGesture || currentTouchDistance > 64) {
        currentZoom = offset[0];
      }
      const dx = origin[0] - prevOrigin.x;
      const dy = origin[1] - prevOrigin.y;
      prevOrigin.x = origin[0];
      prevOrigin.y = origin[1];
      updatePinchState(isGesture ? "gesture" : "touch");
      switch (pinchState) {
        case "zooming": {
          editor.dispatch({
            type: "pinch",
            name: "pinch",
            point: { x: origin[0], y: origin[1], z: currentZoom },
            delta: { x: dx, y: dy },
            shiftKey: event.shiftKey,
            altKey: event.altKey,
            ctrlKey: event.metaKey || event.ctrlKey
          });
          break;
        }
        case "panning": {
          editor.dispatch({
            type: "pinch",
            name: "pinch",
            point: { x: origin[0], y: origin[1], z: initZoom },
            delta: { x: dx, y: dy },
            shiftKey: event.shiftKey,
            altKey: event.altKey,
            ctrlKey: event.metaKey || event.ctrlKey
          });
          break;
        }
      }
    };
    const onPinchEnd = (gesture) => {
      const elm = ref.current;
      const { event, origin, offset } = gesture;
      if (event instanceof WheelEvent)
        return;
      if (!(event.target === elm || elm?.contains(event.target)))
        return;
      const scale = offset[0];
      pinchState = null;
      requestAnimationFrame(() => {
        editor.dispatch({
          type: "pinch",
          name: "pinch_end",
          point: { x: origin[0], y: origin[1], z: scale },
          delta: { x: origin[0], y: origin[1] },
          shiftKey: event.shiftKey,
          altKey: event.altKey,
          ctrlKey: event.metaKey || event.ctrlKey
        });
      });
    };
    return {
      onWheel,
      onPinchStart,
      onPinchEnd,
      onPinch
    };
  }, [editor, ref]);
  useGesture(events, {
    target: ref,
    eventOptions: { passive: false },
    pinch: {
      from: () => [editor.zoomLevel, 0],
      // Return the camera z to use when pinch starts
      scaleBounds: () => {
        return { from: editor.zoomLevel, max: 8, min: 0.05 };
      }
    }
  });
}
export {
  useGestureEvents
};
//# sourceMappingURL=useGestureEvents.mjs.map
