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
var executeQuery_exports = {};
__export(executeQuery_exports, {
  executeQuery: () => executeQuery,
  objectMatchesQuery: () => objectMatchesQuery
});
module.exports = __toCommonJS(executeQuery_exports);
var import_setUtils = require("./setUtils");
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
  return (0, import_setUtils.intersectSets)(Object.values(matchIds));
}
//# sourceMappingURL=executeQuery.js.map
