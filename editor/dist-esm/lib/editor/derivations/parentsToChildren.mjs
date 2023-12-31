import { computed, isUninitialized, RESET_VALUE } from "@tldraw/state";
import { isShape } from "@tldraw/tlschema";
import { sortByIndex } from "../../utils/reordering/reordering.mjs";
const parentsToChildren = (store) => {
  const shapeIdsQuery = store.query.ids("shape");
  function fromScratch() {
    const result = {};
    const shapeIds = shapeIdsQuery.value;
    const shapes = Array(shapeIds.size);
    shapeIds.forEach((id) => shapes.push(store.get(id)));
    shapes.sort(sortByIndex);
    shapes.forEach((shape) => {
      if (!result[shape.parentId]) {
        result[shape.parentId] = [];
      }
      result[shape.parentId].push(shape.id);
    });
    return result;
  }
  return computed(
    "parentsToChildrenWithIndexes",
    (lastValue, lastComputedEpoch) => {
      if (isUninitialized(lastValue)) {
        return fromScratch();
      }
      const diff = store.history.getDiffSince(lastComputedEpoch);
      if (diff === RESET_VALUE) {
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
          if (!isShape(record))
            continue;
          ensureNewArray(record.parentId);
          newValue[record.parentId].push(record.id);
          toSort.add(newValue[record.parentId]);
        }
        for (const [from, to] of Object.values(changes.updated)) {
          if (!isShape(to))
            continue;
          if (!isShape(from))
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
          if (!isShape(record))
            continue;
          ensureNewArray(record.parentId);
          newValue[record.parentId].splice(newValue[record.parentId].indexOf(record.id), 1);
        }
      }
      for (const arr of toSort) {
        const shapesInArr = arr.map((id) => store.get(id));
        shapesInArr.sort(sortByIndex);
        arr.splice(0, arr.length, ...shapesInArr.map((shape) => shape.id));
      }
      return newValue ?? lastValue;
    }
  );
};
export {
  parentsToChildren
};
//# sourceMappingURL=parentsToChildren.mjs.map
