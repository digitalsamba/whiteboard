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
var arrowBindingsIndex_exports = {};
__export(arrowBindingsIndex_exports, {
  arrowBindingsIndex: () => arrowBindingsIndex
});
module.exports = __toCommonJS(arrowBindingsIndex_exports);
var import_state = require("@tldraw/state");
const arrowBindingsIndex = (editor) => {
  const { store } = editor;
  const shapeHistory = store.query.filterHistory("shape");
  const arrowQuery = store.query.records("shape", () => ({ type: { eq: "arrow" } }));
  function fromScratch() {
    const allArrows = arrowQuery.value;
    const bindings2Arrows = {};
    for (const arrow of allArrows) {
      const { start, end } = arrow.props;
      if (start.type === "binding") {
        const arrows = bindings2Arrows[start.boundShapeId];
        if (arrows)
          arrows.push({ arrowId: arrow.id, handleId: "start" });
        else
          bindings2Arrows[start.boundShapeId] = [{ arrowId: arrow.id, handleId: "start" }];
      }
      if (end.type === "binding") {
        const arrows = bindings2Arrows[end.boundShapeId];
        if (arrows)
          arrows.push({ arrowId: arrow.id, handleId: "end" });
        else
          bindings2Arrows[end.boundShapeId] = [{ arrowId: arrow.id, handleId: "end" }];
      }
    }
    return bindings2Arrows;
  }
  return (0, import_state.computed)("arrowBindingsIndex", (_lastValue, lastComputedEpoch) => {
    if ((0, import_state.isUninitialized)(_lastValue)) {
      return fromScratch();
    }
    const lastValue = _lastValue;
    const diff = shapeHistory.getDiffSince(lastComputedEpoch);
    if (diff === import_state.RESET_VALUE) {
      return fromScratch();
    }
    let nextValue = void 0;
    function ensureNewArray(boundShapeId) {
      if (!nextValue) {
        nextValue = { ...lastValue };
      }
      if (!nextValue[boundShapeId]) {
        nextValue[boundShapeId] = [];
      } else if (nextValue[boundShapeId] === lastValue[boundShapeId]) {
        nextValue[boundShapeId] = [...nextValue[boundShapeId]];
      }
    }
    function removingBinding(boundShapeId, arrowId, handleId) {
      ensureNewArray(boundShapeId);
      nextValue[boundShapeId] = nextValue[boundShapeId].filter(
        (binding) => binding.arrowId !== arrowId || binding.handleId !== handleId
      );
      if (nextValue[boundShapeId].length === 0) {
        delete nextValue[boundShapeId];
      }
    }
    function addBinding(boundShapeId, arrowId, handleId) {
      ensureNewArray(boundShapeId);
      nextValue[boundShapeId].push({ arrowId, handleId });
    }
    for (const changes of diff) {
      for (const newShape of Object.values(changes.added)) {
        if (editor.isShapeOfType(newShape, "arrow")) {
          const { start, end } = newShape.props;
          if (start.type === "binding") {
            addBinding(start.boundShapeId, newShape.id, "start");
          }
          if (end.type === "binding") {
            addBinding(end.boundShapeId, newShape.id, "end");
          }
        }
      }
      for (const [prev, next] of Object.values(changes.updated)) {
        if (!editor.isShapeOfType(prev, "arrow") || !editor.isShapeOfType(next, "arrow"))
          continue;
        for (const handle of ["start", "end"]) {
          const prevTerminal = prev.props[handle];
          const nextTerminal = next.props[handle];
          if (prevTerminal.type === "binding" && nextTerminal.type === "point") {
            removingBinding(prevTerminal.boundShapeId, prev.id, handle);
          } else if (prevTerminal.type === "point" && nextTerminal.type === "binding") {
            addBinding(nextTerminal.boundShapeId, next.id, handle);
          } else if (prevTerminal.type === "binding" && nextTerminal.type === "binding" && prevTerminal.boundShapeId !== nextTerminal.boundShapeId) {
            removingBinding(prevTerminal.boundShapeId, prev.id, handle);
            addBinding(nextTerminal.boundShapeId, next.id, handle);
          }
        }
      }
      for (const prev of Object.values(changes.removed)) {
        if (editor.isShapeOfType(prev, "arrow")) {
          const { start, end } = prev.props;
          if (start.type === "binding") {
            removingBinding(start.boundShapeId, prev.id, "start");
          }
          if (end.type === "binding") {
            removingBinding(end.boundShapeId, prev.id, "end");
          }
        }
      }
    }
    return nextValue ?? lastValue;
  });
};
//# sourceMappingURL=arrowBindingsIndex.js.map
