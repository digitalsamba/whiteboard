import { intersectSets } from "./setUtils.mjs";
function objectMatchesQuery(query, object) {
  for (const [key, _matcher] of Object.entries(query)) {
    const matcher = _matcher;
    const value = object[key];
    if ("eq" in matcher && value !== matcher.eq)
      return false;
    if ("neq" in matcher && value === matcher.neq)
      return false;
    if ("gt" in matcher && (typeof value !== "number" || value <= matcher.gt))
      return false;
  }
  return true;
}
function executeQuery(store, typeName, query) {
  const matchIds = Object.fromEntries(Object.keys(query).map((key) => [key, /* @__PURE__ */ new Set()]));
  for (const [k, matcher] of Object.entries(query)) {
    if ("eq" in matcher) {
      const index = store.index(typeName, k);
      const ids = index.value.get(matcher.eq);
      if (ids) {
        for (const id of ids) {
          matchIds[k].add(id);
        }
      }
    } else if ("neq" in matcher) {
      const index = store.index(typeName, k);
      for (const [value, ids] of index.value) {
        if (value !== matcher.neq) {
          for (const id of ids) {
            matchIds[k].add(id);
          }
        }
      }
    } else if ("gt" in matcher) {
      const index = store.index(typeName, k);
      for (const [value, ids] of index.value) {
        if (value > matcher.gt) {
          for (const id of ids) {
            matchIds[k].add(id);
          }
        }
      }
    }
  }
  return intersectSets(Object.values(matchIds));
}
export {
  executeQuery,
  objectMatchesQuery
};
//# sourceMappingURL=executeQuery.mjs.map
