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
var StoreQueries_exports = {};
__export(StoreQueries_exports, {
  StoreQueries: () => StoreQueries
});
module.exports = __toCommonJS(StoreQueries_exports);
var import_state = require("@tldraw/state");
var import_utils = require("@tldraw/utils");
var import_lodash = __toESM(require("lodash.isequal"));
var import_executeQuery = require("./executeQuery");
var import_IncrementalSetConstructor = require("./IncrementalSetConstructor");
var import_setUtils = require("./setUtils");
class StoreQueries {
  constructor(atoms, history) {
    this.atoms = atoms;
    this.history = history;
  }
  /**
   * A cache of derivations (indexes).
   *
   * @internal
   */
  indexCache = /* @__PURE__ */ new Map();
  /**
   * A cache of derivations (filtered histories).
   *
   * @internal
   */
  historyCache = /* @__PURE__ */ new Map();
  /**
   * Create a derivation that contains the hisotry for a given type
   *
   * @param typeName - The name of the type to filter by.
   * @returns A derivation that returns the ids of all records of the given type.
   * @public
   */
  filterHistory(typeName) {
    if (this.historyCache.has(typeName)) {
      return this.historyCache.get(typeName);
    }
    const filtered = (0, import_state.computed)(
      "filterHistory:" + typeName,
      (lastValue, lastComputedEpoch) => {
        if ((0, import_state.isUninitialized)(lastValue)) {
          return this.history.value;
        }
        const diff = this.history.getDiffSince(lastComputedEpoch);
        if (diff === import_state.RESET_VALUE)
          return this.history.value;
        const res = { added: {}, removed: {}, updated: {} };
        let numAdded = 0;
        let numRemoved = 0;
        let numUpdated = 0;
        for (const changes of diff) {
          for (const added of (0, import_utils.objectMapValues)(changes.added)) {
            if (added.typeName === typeName) {
              if (res.removed[added.id]) {
                const original = res.removed[added.id];
                delete res.removed[added.id];
                numRemoved--;
                if (original !== added) {
                  res.updated[added.id] = [original, added];
                  numUpdated++;
                }
              } else {
                res.added[added.id] = added;
                numAdded++;
              }
            }
          }
          for (const [from, to] of (0, import_utils.objectMapValues)(changes.updated)) {
            if (to.typeName === typeName) {
              if (res.added[to.id]) {
                res.added[to.id] = to;
              } else if (res.updated[to.id]) {
                res.updated[to.id] = [res.updated[to.id][0], to];
              } else {
                res.updated[to.id] = [from, to];
                numUpdated++;
              }
            }
          }
          for (const removed of (0, import_utils.objectMapValues)(changes.removed)) {
            if (removed.typeName === typeName) {
              if (res.added[removed.id]) {
                delete res.added[removed.id];
                numAdded--;
              } else if (res.updated[removed.id]) {
                res.removed[removed.id] = res.updated[removed.id][0];
                delete res.updated[removed.id];
                numUpdated--;
                numRemoved++;
              } else {
                res.removed[removed.id] = removed;
                numRemoved++;
              }
            }
          }
        }
        if (numAdded || numRemoved || numUpdated) {
          return (0, import_state.withDiff)(this.history.value, res);
        } else {
          return lastValue;
        }
      },
      { historyLength: 100 }
    );
    this.historyCache.set(typeName, filtered);
    return filtered;
  }
  /**
   * Create a derivation that returns an index on a property for the given type.
   *
   * @param typeName - The name of the type.
   * @param property - The name of the property.
   * @public
   */
  index(typeName, property) {
    const cacheKey = typeName + ":" + property;
    if (this.indexCache.has(cacheKey)) {
      return this.indexCache.get(cacheKey);
    }
    const index = this.__uncached_createIndex(typeName, property);
    this.indexCache.set(cacheKey, index);
    return index;
  }
  /**
   * Create a derivation that returns an index on a property for the given type.
   *
   * @param typeName - The name of the type?.
   * @param property - The name of the property?.
   * @internal
   */
  __uncached_createIndex(typeName, property) {
    const typeHistory = this.filterHistory(typeName);
    const fromScratch = () => {
      typeHistory.value;
      const res = /* @__PURE__ */ new Map();
      for (const atom of (0, import_utils.objectMapValues)(this.atoms.value)) {
        const record = atom.value;
        if (record.typeName === typeName) {
          const value = record[property];
          if (!res.has(value)) {
            res.set(value, /* @__PURE__ */ new Set());
          }
          res.get(value).add(record.id);
        }
      }
      return res;
    };
    return (0, import_state.computed)(
      "index:" + typeName + ":" + property,
      (prevValue, lastComputedEpoch) => {
        if ((0, import_state.isUninitialized)(prevValue))
          return fromScratch();
        const history = typeHistory.getDiffSince(lastComputedEpoch);
        if (history === import_state.RESET_VALUE) {
          return fromScratch();
        }
        const setConstructors = /* @__PURE__ */ new Map();
        const add = (value, id) => {
          let setConstructor = setConstructors.get(value);
          if (!setConstructor)
            setConstructor = new import_IncrementalSetConstructor.IncrementalSetConstructor(
              prevValue.get(value) ?? /* @__PURE__ */ new Set()
            );
          setConstructor.add(id);
          setConstructors.set(value, setConstructor);
        };
        const remove = (value, id) => {
          let set = setConstructors.get(value);
          if (!set)
            set = new import_IncrementalSetConstructor.IncrementalSetConstructor(prevValue.get(value) ?? /* @__PURE__ */ new Set());
          set.remove(id);
          setConstructors.set(value, set);
        };
        for (const changes of history) {
          for (const record of (0, import_utils.objectMapValues)(changes.added)) {
            if (record.typeName === typeName) {
              const value = record[property];
              add(value, record.id);
            }
          }
          for (const [from, to] of (0, import_utils.objectMapValues)(changes.updated)) {
            if (to.typeName === typeName) {
              const prev = from[property];
              const next = to[property];
              if (prev !== next) {
                remove(prev, to.id);
                add(next, to.id);
              }
            }
          }
          for (const record of (0, import_utils.objectMapValues)(changes.removed)) {
            if (record.typeName === typeName) {
              const value = record[property];
              remove(value, record.id);
            }
          }
        }
        let nextValue = void 0;
        let nextDiff = void 0;
        for (const [value, setConstructor] of setConstructors) {
          const result = setConstructor.get();
          if (!result)
            continue;
          if (!nextValue)
            nextValue = new Map(prevValue);
          if (!nextDiff)
            nextDiff = /* @__PURE__ */ new Map();
          if (result.value.size === 0) {
            nextValue.delete(value);
          } else {
            nextValue.set(value, result.value);
          }
          nextDiff.set(value, result.diff);
        }
        if (nextValue && nextDiff) {
          return (0, import_state.withDiff)(nextValue, nextDiff);
        }
        return prevValue;
      },
      { historyLength: 100 }
    );
  }
  /**
   * Create a derivation that will return a signle record matching the given query.
   *
   * It will return undefined if there is no matching record
   *
   * @param typeName - The name of the type?
   * @param queryCreator - A function that returns the query expression.
   * @param name - (optinal) The name of the query.
   */
  record(typeName, queryCreator = () => ({}), name = "record:" + typeName + (queryCreator ? ":" + queryCreator.toString() : "")) {
    const ids = this.ids(typeName, queryCreator, name);
    return (0, import_state.computed)(name, () => {
      for (const id of ids.value) {
        return this.atoms.value[id]?.value;
      }
      return void 0;
    });
  }
  /**
   * Create a derivation that will return an array of records matching the given query
   *
   * @param typeName - The name of the type?
   * @param queryCreator - A function that returns the query expression.
   * @param name - (optinal) The name of the query.
   */
  records(typeName, queryCreator = () => ({}), name = "records:" + typeName + (queryCreator ? ":" + queryCreator.toString() : "")) {
    const ids = this.ids(typeName, queryCreator, "ids:" + name);
    return (0, import_state.computed)(name, () => {
      return [...ids.value].map((id) => {
        const atom = this.atoms.value[id];
        if (!atom) {
          throw new Error("no atom found for record id: " + id);
        }
        return atom.value;
      });
    });
  }
  /**
   * Create a derivation that will return the ids of all records of the given type.
   *
   * @param typeName - The name of the type.
   * @param queryCreator - A function that returns the query expression.
   * @param name - (optinal) The name of the query.
   */
  ids(typeName, queryCreator = () => ({}), name = "ids:" + typeName + (queryCreator ? ":" + queryCreator.toString() : "")) {
    const typeHistory = this.filterHistory(typeName);
    const fromScratch = () => {
      typeHistory.value;
      const query = queryCreator();
      if (Object.keys(query).length === 0) {
        return new Set(
          (0, import_utils.objectMapValues)(this.atoms.value).flatMap((v) => {
            const r = v.value;
            if (r.typeName === typeName) {
              return r.id;
            } else {
              return [];
            }
          })
        );
      }
      return (0, import_executeQuery.executeQuery)(this, typeName, query);
    };
    const fromScratchWithDiff = (prevValue) => {
      const nextValue = fromScratch();
      const diff = (0, import_setUtils.diffSets)(prevValue, nextValue);
      if (diff) {
        return (0, import_state.withDiff)(nextValue, diff);
      } else {
        return prevValue;
      }
    };
    const cachedQuery = (0, import_state.computed)("ids_query:" + name, queryCreator, {
      isEqual: import_lodash.default
    });
    return (0, import_state.computed)(
      "query:" + name,
      (prevValue, lastComputedEpoch) => {
        const query = cachedQuery.value;
        if ((0, import_state.isUninitialized)(prevValue)) {
          return fromScratch();
        }
        if (lastComputedEpoch < cachedQuery.lastChangedEpoch) {
          return fromScratchWithDiff(prevValue);
        }
        const history = typeHistory.getDiffSince(lastComputedEpoch);
        if (history === import_state.RESET_VALUE) {
          return fromScratchWithDiff(prevValue);
        }
        const setConstructor = new import_IncrementalSetConstructor.IncrementalSetConstructor(
          prevValue
        );
        for (const changes of history) {
          for (const added of (0, import_utils.objectMapValues)(changes.added)) {
            if (added.typeName === typeName && (0, import_executeQuery.objectMatchesQuery)(query, added)) {
              setConstructor.add(added.id);
            }
          }
          for (const [_, updated] of (0, import_utils.objectMapValues)(changes.updated)) {
            if (updated.typeName === typeName) {
              if ((0, import_executeQuery.objectMatchesQuery)(query, updated)) {
                setConstructor.add(updated.id);
              } else {
                setConstructor.remove(updated.id);
              }
            }
          }
          for (const removed of (0, import_utils.objectMapValues)(changes.removed)) {
            if (removed.typeName === typeName) {
              setConstructor.remove(removed.id);
            }
          }
        }
        const result = setConstructor.get();
        if (!result) {
          return prevValue;
        }
        return (0, import_state.withDiff)(result.value, result.diff);
      },
      { historyLength: 50 }
    );
  }
  exec(typeName, query) {
    const ids = (0, import_executeQuery.executeQuery)(this, typeName, query);
    if (ids.size === 0) {
      return import_state.EMPTY_ARRAY;
    }
    const atoms = this.atoms.value;
    return [...ids].map((id) => atoms[id].value);
  }
}
//# sourceMappingURL=StoreQueries.js.map
