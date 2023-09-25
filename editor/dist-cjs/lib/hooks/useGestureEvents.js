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
var useGestureEvents_exports = {};
__export(useGestureEvents_exports, {
  useGestureEvents: () => useGestureEvents
});
module.exports = __toCommonJS(useGestureEvents_exports);
var import_react = require("@use-gesture/react");
var import_lodash = __toESM(require("lodash.throttle"));
var React = __toESM(require("react"));
var import_Vec2d = require("../primitives/Vec2d");
var import_dom = require("../utils/dom");
var import_normalizeWheel = require("../utils/normalizeWheel");
var import_useEditor = require("./useEditor");
const useGesture = (0, import_react.createUseGesture)([import_react.wheelAction, import_react.pinchAction]);
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
  const editor = (0, import_useEditor.useEditor)();
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
      (0, import_dom.preventDefault)(event);
      const delta = (0, import_normalizeWheel.normalizeWheel)(event);
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
    const initOrigin = new import_Vec2d.Vec2d();
    const prevOrigin = new import_Vec2d.Vec2d();
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
    const updatePinchState = (0, import_lodash.default)((type) => {
      if (pinchState === null) {
        const touchDistance = Math.abs(currentTouchDistance - initTouchDistance);
        const originDistance = import_Vec2d.Vec2d.Dist(initOrigin, prevOrigin);
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
//# sourceMappingURL=useGestureEvents.js.map
