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
var reorderShapes_exports = {};
__export(reorderShapes_exports, {
  getReorderingShapesChanges: () => getReorderingShapesChanges
});
module.exports = __toCommonJS(reorderShapes_exports);
var import_utils = require("@tldraw/utils");
var import_reordering = require("./reordering/reordering");
function getReorderingShapesChanges(editor, operation, ids) {
  if (ids.length === 0)
    return [];
  const parents = /* @__PURE__ */ new Map();
  for (const shape of (0, import_utils.compact)(ids.map((id) => editor.getShape(id)))) {
    const { parentId } = shape;
    if (!parents.has(parentId)) {
      parents.set(parentId, {
        children: (0, import_utils.compact)(
          editor.getSortedChildIdsForParent(parentId).map((id) => editor.getShape(id))
        ),
        moving: /* @__PURE__ */ new Set()
      });
    }
    parents.get(parentId).moving.add(shape);
  }
  const changes = [];
  switch (operation) {
    case "toBack": {
      parents.forEach(({ moving, children }) => reorderToBack(moving, children, changes));
      break;
    }
    case "toFront": {
      parents.forEach(({ moving, children }) => reorderToFront(moving, children, changes));
      break;
    }
    case "forward": {
      parents.forEach(({ moving, children }) => reorderForward(moving, children, changes));
      break;
    }
    case "backward": {
      parents.forEach(({ moving, children }) => reorderBackward(moving, children, changes));
      break;
    }
  }
  return changes;
}
function reorderToBack(moving, children, changes) {
  const len = children.length;
  if (moving.size === len)
    return;
  let below;
  let above;
  for (let i = 0; i < len; i++) {
    const shape = children[i];
    if (moving.has(shape)) {
      below = shape.index;
      moving.delete(shape);
    } else {
      above = shape.index;
      break;
    }
  }
  if (moving.size === 0) {
    return;
  } else {
    const indices = (0, import_reordering.getIndicesBetween)(below, above, moving.size);
    changes.push(
      ...Array.from(moving.values()).sort(import_reordering.sortByIndex).map((shape, i) => ({ ...shape, index: indices[i] }))
    );
  }
}
function reorderToFront(moving, children, changes) {
  const len = children.length;
  if (moving.size === len)
    return;
  let below;
  let above;
  for (let i = len - 1; i > -1; i--) {
    const shape = children[i];
    if (moving.has(shape)) {
      above = shape.index;
      moving.delete(shape);
    } else {
      below = shape.index;
      break;
    }
  }
  if (moving.size === 0) {
    return;
  } else {
    const indices = (0, import_reordering.getIndicesBetween)(below, above, moving.size);
    changes.push(
      ...Array.from(moving.values()).sort(import_reordering.sortByIndex).map((shape, i) => ({ ...shape, index: indices[i] }))
    );
  }
}
function reorderForward(moving, children, changes) {
  const len = children.length;
  if (moving.size === len)
    return;
  let state = { name: "skipping" };
  for (let i = 0; i < len; i++) {
    const isMoving = moving.has(children[i]);
    switch (state.name) {
      case "skipping": {
        if (!isMoving)
          continue;
        state = { name: "selecting", selectIndex: i };
        break;
      }
      case "selecting": {
        if (isMoving)
          continue;
        const { selectIndex } = state;
        (0, import_reordering.getIndicesBetween)(children[i].index, children[i + 1]?.index, i - selectIndex).forEach(
          (index, k) => changes.push({ ...children[selectIndex + k], index })
        );
        state = { name: "skipping" };
        break;
      }
    }
  }
}
function reorderBackward(moving, children, changes) {
  const len = children.length;
  if (moving.size === len)
    return;
  let state = { name: "skipping" };
  for (let i = len - 1; i > -1; i--) {
    const isMoving = moving.has(children[i]);
    switch (state.name) {
      case "skipping": {
        if (!isMoving)
          continue;
        state = { name: "selecting", selectIndex: i };
        break;
      }
      case "selecting": {
        if (isMoving)
          continue;
        (0, import_reordering.getIndicesBetween)(children[i - 1]?.index, children[i].index, state.selectIndex - i).forEach(
          (index, k) => {
            changes.push({ ...children[i + k + 1], index });
          }
        );
        state = { name: "skipping" };
        break;
      }
    }
  }
}
//# sourceMappingURL=reorderShapes.js.map
