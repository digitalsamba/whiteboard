import { compact } from "@tldraw/utils";
import { getIndicesBetween, sortByIndex } from "./reordering/reordering.mjs";
function getReorderingShapesChanges(editor, operation, ids) {
  if (ids.length === 0)
    return [];
  const parents = /* @__PURE__ */ new Map();
  for (const shape of compact(ids.map((id) => editor.getShape(id)))) {
    const { parentId } = shape;
    if (!parents.has(parentId)) {
      parents.set(parentId, {
        children: compact(
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
    const indices = getIndicesBetween(below, above, moving.size);
    changes.push(
      ...Array.from(moving.values()).sort(sortByIndex).map((shape, i) => ({ ...shape, index: indices[i] }))
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
    const indices = getIndicesBetween(below, above, moving.size);
    changes.push(
      ...Array.from(moving.values()).sort(sortByIndex).map((shape, i) => ({ ...shape, index: indices[i] }))
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
        getIndicesBetween(children[i].index, children[i + 1]?.index, i - selectIndex).forEach(
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
        getIndicesBetween(children[i - 1]?.index, children[i].index, state.selectIndex - i).forEach(
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
export {
  getReorderingShapesChanges
};
//# sourceMappingURL=reorderShapes.mjs.map
