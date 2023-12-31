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
var parentsToChildren_exports = {};
__export(parentsToChildren_exports, {
  parentsToChildren: () => parentsToChildren
});
module.exports = __toCommonJS(parentsToChildren_exports);
var import_state = require("@tldraw/state");
var import_tlschema = require("@tldraw/tlschema");
var import_reordering = require("../../utils/reordering/reordering");
const parentsToChildren = (store) => {
  const shapeIdsQuery = store.query.ids("shape");
  function fromScratch() {
    const result = {};
    const shapeIds = shapeIdsQuery.value;
    const shapes = Array(shapeIds.size);
    shapeIds.forEach((id) => shapes.push(store.get(id)));
    shapes.sort(import_reordering.sortByIndex);
    shapes.forEach((shape) => {
      if (!result[shape.parentId]) {
        result[shape.parentId] = [];
      }
      result[shape.parentId].push(shape.id);
    });
    return result;
  }
  return (0, import_state.computed)(
    "parentsToChildrenWithIndexes",
    (lastValue, lastComputedEpoch) => {
      if ((0, import_state.isUninitialized)(lastValue)) {
        return fromScratch();
      }
      const diff = store.history.getDiffSince(lastComputedEpoch);
      if (diff === import_state.RESET_VALUE) {
        return fromScratch();
      }
      if (diff.length === 0)
        return lastValue;
      let newValue = null;
      const ensureNewArray = (parentId) => {
        if (!newValue) {
          newValue = { ...lastValue };
        }
        if (!newValue[parentId]) {
          newValue[parentId] = [];
        } else if (newValue[parentId] === lastValue[parentId]) {
          newValue[parentId] = [...newValue[parentId]];
        }
      };
      const toSort = /* @__PURE__ */ new Set();
      let changes;
      for (let i = 0, n = diff.length; i < n; i++) {
        changes = diff[i];
        for (const record of Object.values(changes.added)) {
          if (!(0, import_tlschema.isShape)(record))
            continue;
          ensureNewArray(record.parentId);
          newValue[record.parentId].push(record.id);
          toSort.add(newValue[record.parentId]);
        }
        for (const [from, to] of Object.values(changes.updated)) {
          if (!(0, import_tlschema.isShape)(to))
            continue;
          if (!(0, import_tlschema.isShape)(from))
            continue;
          if (from.parentId !== to.parentId) {
            ensureNewArray(from.parentId);
            ensureNewArray(to.parentId);
            newValue[from.parentId].splice(newValue[from.parentId].indexOf(to.id), 1);
            newValue[to.parentId].push(to.id);
            toSort.add(newValue[to.parentId]);
          } else if (from.index !== to.index) {
            ensureNewArray(to.parentId);
            const idx = newValue[to.parentId].indexOf(to.id);
            newValue[to.parentId][idx] = to.id;
            toSort.add(newValue[to.parentId]);
          }
        }
        for (const record of Object.values(changes.removed)) {
          if (!(0, import_tlschema.isShape)(record))
            continue;
          ensureNewArray(record.parentId);
          newValue[record.parentId].splice(newValue[record.parentId].indexOf(record.id), 1);
        }
      }
      for (const arr of toSort) {
        const shapesInArr = arr.map((id) => store.get(id));
        shapesInArr.sort(import_reordering.sortByIndex);
        arr.splice(0, arr.length, ...shapesInArr.map((shape) => shape.id));
      }
      return newValue ?? lastValue;
    }
  );
};
//# sourceMappingURL=parentsToChildren.js.map
