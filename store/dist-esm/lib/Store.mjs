import { atom, computed, reactor, transact } from "@tldraw/state";
import {
  filterEntries,
  objectMapEntries,
  objectMapFromEntries,
  objectMapKeys,
  objectMapValues,
  throttledRaf
} from "@tldraw/utils";
import { nanoid } from "nanoid";
import { Cache } from "./Cache.mjs";
import { StoreQueries } from "./StoreQueries.mjs";
import { devFreeze } from "./devFreeze.mjs";
class Store {
  /**
   * The random id of the store.
   */
  id = nanoid();
  /**
   * An atom containing the store's atoms.
   *
   * @internal
   * @readonly
   */
  atoms = atom("store_atoms", {});
  /**
   * An atom containing the store's history.
   *
   * @public
   * @readonly
   */
  history = atom("history", 0, {
    historyLength: 1e3
  });
  /**
   * A StoreQueries instance for this store.
   *
   * @public
   * @readonly
   */
  query = new StoreQueries(this.atoms, this.history);
  /**
   * A set containing listeners that have been added to this store.
   *
   * @internal
   */
  listeners = /* @__PURE__ */ new Set();
  /**
   * An array of history entries that have not yet been flushed.
   *
   * @internal
   */
  historyAccumulator = new HistoryAccumulator();
  /**
   * A reactor that responds to changes to the history by squashing the accumulated history and
   * notifying listeners of the changes.
   *
   * @internal
   */
  historyReactor;
  schema;
  props;
  scopedTypes;
  constructor(config) {
    const { initialData, schema } = config;
    this.schema = schema;
    this.props = config.props;
    if (initialData) {
      this.atoms.set(
        objectMapFromEntries(
          objectMapEntries(initialData).map(([id, record]) => [
            id,
            atom("atom:" + id, this.schema.validateRecord(this, record, "initialize", null))
          ])
        )
      );
    }
    this.historyReactor = reactor(
      "Store.historyReactor",
      () => {
        this.history.value;
        this._flushHistory();
      },
      { scheduleEffect: (cb) => throttledRaf(cb) }
    );
    this.scopedTypes = {
      document: new Set(
        objectMapValues(this.schema.types).filter((t) => t.scope === "document").map((t) => t.typeName)
      ),
      session: new Set(
        objectMapValues(this.schema.types).filter((t) => t.scope === "session").map((t) => t.typeName)
      ),
      presence: new Set(
        objectMapValues(this.schema.types).filter((t) => t.scope === "presence").map((t) => t.typeName)
      )
    };
  }
  _flushHistory() {
    if (this.historyAccumulator.hasChanges()) {
      const entries = this.historyAccumulator.flush();
      for (const { changes, source } of entries) {
        let instanceChanges = null;
        let documentChanges = null;
        let presenceChanges = null;
        for (const { onHistory, filters } of this.listeners) {
          if (filters.source !== "all" && filters.source !== source) {
            continue;
          }
          if (filters.scope !== "all") {
            if (filters.scope === "document") {
              documentChanges ??= this.filterChangesByScope(changes, "document");
              if (!documentChanges)
                continue;
              onHistory({ changes: documentChanges, source });
            } else if (filters.scope === "session") {
              instanceChanges ??= this.filterChangesByScope(changes, "session");
              if (!instanceChanges)
                continue;
              onHistory({ changes: instanceChanges, source });
            } else {
              presenceChanges ??= this.filterChangesByScope(changes, "presence");
              if (!presenceChanges)
                continue;
              onHistory({ changes: presenceChanges, source });
            }
          } else {
            onHistory({ changes, source });
          }
        }
      }
    }
  }
  /**
   * Filters out non-document changes from a diff. Returns null if there are no changes left.
   * @param change - the records diff
   * @returns
   */
  filterChangesByScope(change, scope) {
    const result = {
      added: filterEntries(change.added, (_, r) => this.scopedTypes[scope].has(r.typeName)),
      updated: filterEntries(change.updated, (_, r) => this.scopedTypes[scope].has(r[1].typeName)),
      removed: filterEntries(change.removed, (_, r) => this.scopedTypes[scope].has(r.typeName))
    };
    if (Object.keys(result.added).length === 0 && Object.keys(result.updated).length === 0 && Object.keys(result.removed).length === 0) {
      return null;
    }
    return result;
  }
  /**
   * Update the history with a diff of changes.
   *
   * @param changes - The changes to add to the history.
   */
  updateHistory(changes) {
    this.historyAccumulator.add({
      changes,
      source: this.isMergingRemoteChanges ? "remote" : "user"
    });
    if (this.listeners.size === 0) {
      this.historyAccumulator.clear();
    }
    this.history.set(this.history.value + 1, changes);
  }
  validate(phase) {
    this.allRecords().forEach((record) => this.schema.validateRecord(this, record, phase, null));
  }
  /**
   * A callback fired after each record's change.
   *
   * @param prev - The previous value, if any.
   * @param next - The next value.
   */
  onBeforeCreate;
  /**
   * A callback fired after a record is created. Use this to perform related updates to other
   * records in the store.
   *
   * @param record - The record to be created
   */
  onAfterCreate;
  /**
   * A callback before after each record's change.
   *
   * @param prev - The previous value, if any.
   * @param next - The next value.
   */
  onBeforeChange;
  /**
   * A callback fired after each record's change.
   *
   * @param prev - The previous value, if any.
   * @param next - The next value.
   */
  onAfterChange;
  /**
   * A callback fired before a record is deleted.
   *
   * @param prev - The record that will be deleted.
   */
  onBeforeDelete;
  /**
   * A callback fired after a record is deleted.
   *
   * @param prev - The record that will be deleted.
   */
  onAfterDelete;
  // used to avoid running callbacks when rolling back changes in sync client
  _runCallbacks = true;
  /**
   * Add some records to the store. It's an error if they already exist.
   *
   * @param records - The records to add.
   * @public
   */
  put = (records, phaseOverride) => {
    transact(() => {
      const updates = {};
      const additions = {};
      const currentMap = this.atoms.__unsafe__getWithoutCapture();
      let map = null;
      let record;
      let didChange = false;
      const beforeCreate = this.onBeforeCreate && this._runCallbacks ? this.onBeforeCreate : null;
      const beforeUpdate = this.onBeforeChange && this._runCallbacks ? this.onBeforeChange : null;
      const source = this.isMergingRemoteChanges ? "remote" : "user";
      for (let i = 0, n = records.length; i < n; i++) {
        record = records[i];
        const recordAtom = (map ?? currentMap)[record.id];
        if (recordAtom) {
          if (beforeUpdate)
            record = beforeUpdate(recordAtom.value, record, source);
          const initialValue = recordAtom.__unsafe__getWithoutCapture();
          record = this.schema.validateRecord(
            this,
            record,
            phaseOverride ?? "updateRecord",
            initialValue
          );
          recordAtom.set(devFreeze(record));
          const finalValue = recordAtom.__unsafe__getWithoutCapture();
          if (initialValue !== finalValue) {
            didChange = true;
            updates[record.id] = [initialValue, finalValue];
          }
        } else {
          if (beforeCreate)
            record = beforeCreate(record, source);
          didChange = true;
          record = this.schema.validateRecord(
            this,
            record,
            phaseOverride ?? "createRecord",
            null
          );
          additions[record.id] = record;
          if (!map) {
            map = { ...currentMap };
          }
          map[record.id] = atom("atom:" + record.id, record);
        }
      }
      if (map) {
        this.atoms.set(map);
      }
      if (!didChange)
        return;
      this.updateHistory({
        added: additions,
        updated: updates,
        removed: {}
      });
      if (this._runCallbacks) {
        const { onAfterCreate, onAfterChange } = this;
        if (onAfterCreate) {
          Object.values(additions).forEach((record2) => {
            onAfterCreate(record2, source);
          });
        }
        if (onAfterChange) {
          Object.values(updates).forEach(([from, to]) => {
            onAfterChange(from, to, source);
          });
        }
      }
    });
  };
  /**
   * Remove some records from the store via their ids.
   *
   * @param ids - The ids of the records to remove.
   * @public
   */
  remove = (ids) => {
    transact(() => {
      const cancelled = [];
      const source = this.isMergingRemoteChanges ? "remote" : "user";
      if (this.onBeforeDelete && this._runCallbacks) {
        for (const id of ids) {
          const atom2 = this.atoms.__unsafe__getWithoutCapture()[id];
          if (!atom2)
            continue;
          if (this.onBeforeDelete(atom2.value, source) === false) {
            cancelled.push(id);
          }
        }
      }
      let removed = void 0;
      this.atoms.update((atoms) => {
        let result = void 0;
        for (const id of ids) {
          if (cancelled.includes(id))
            continue;
          if (!(id in atoms))
            continue;
          if (!result)
            result = { ...atoms };
          if (!removed)
            removed = {};
          delete result[id];
          removed[id] = atoms[id].value;
        }
        return result ?? atoms;
      });
      if (!removed)
        return;
      this.updateHistory({ added: {}, updated: {}, removed });
      if (this.onAfterDelete && this._runCallbacks) {
        let record;
        for (let i = 0, n = ids.length; i < n; i++) {
          record = removed[ids[i]];
          if (record) {
            this.onAfterDelete(record, source);
          }
        }
      }
    });
  };
  /**
   * Get the value of a store record by its id.
   *
   * @param id - The id of the record to get.
   * @public
   */
  get = (id) => {
    return this.atoms.value[id]?.value;
  };
  /**
   * Get the value of a store record by its id without updating its epoch.
   *
   * @param id - The id of the record to get.
   * @public
   */
  unsafeGetWithoutCapture = (id) => {
    return this.atoms.value[id]?.__unsafe__getWithoutCapture();
  };
  /**
   * Creates a JSON payload from the record store.
   *
   * @param scope - The scope of records to serialize. Defaults to 'document'.
   * @returns The record store snapshot as a JSON payload.
   */
  serialize = (scope = "document") => {
    const result = {};
    for (const [id, atom2] of objectMapEntries(this.atoms.value)) {
      const record = atom2.value;
      if (scope === "all" || this.scopedTypes[scope].has(record.typeName)) {
        result[id] = record;
      }
    }
    return result;
  };
  /**
   * Get a serialized snapshot of the store and its schema.
   *
   * ```ts
   * const snapshot = store.getSnapshot()
   * store.loadSnapshot(snapshot)
   * ```
   *
   * @param scope - The scope of records to serialize. Defaults to 'document'.
   *
   * @public
   */
  getSnapshot(scope = "document") {
    return {
      store: this.serialize(scope),
      schema: this.schema.serialize()
    };
  }
  /**
   * Migrate a serialized snapshot of the store and its schema.
   *
   * ```ts
   * const snapshot = store.getSnapshot()
   * store.migrateSnapshot(snapshot)
   * ```
   *
   * @param snapshot - The snapshot to load.
   * @public
   */
  migrateSnapshot(snapshot) {
    const migrationResult = this.schema.migrateStoreSnapshot(snapshot);
    if (migrationResult.type === "error") {
      throw new Error(`Failed to migrate snapshot: ${migrationResult.reason}`);
    }
    return {
      store: migrationResult.value,
      schema: this.schema.serialize()
    };
  }
  /**
   * Load a serialized snapshot.
   *
   * ```ts
   * const snapshot = store.getSnapshot()
   * store.loadSnapshot(snapshot)
   * ```
   *
   * @param snapshot - The snapshot to load.
   * @public
   */
  loadSnapshot(snapshot) {
    const migrationResult = this.schema.migrateStoreSnapshot(snapshot);
    if (migrationResult.type === "error") {
      throw new Error(`Failed to migrate snapshot: ${migrationResult.reason}`);
    }
    transact(() => {
      this.clear();
      this.put(Object.values(migrationResult.value));
      this.ensureStoreIsUsable();
    });
  }
  /**
   * Get an array of all values in the store.
   *
   * @returns An array of all values in the store.
   * @public
   */
  allRecords = () => {
    return objectMapValues(this.atoms.value).map((atom2) => atom2.value);
  };
  /**
   * Removes all records from the store.
   *
   * @public
   */
  clear = () => {
    this.remove(objectMapKeys(this.atoms.value));
  };
  /**
   * Update a record. To update multiple records at once, use the `update` method of the
   * `TypedStore` class.
   *
   * @param id - The id of the record to update.
   * @param updater - A function that updates the record.
   */
  update = (id, updater) => {
    const atom2 = this.atoms.value[id];
    if (!atom2) {
      console.error(`Record ${id} not found. This is probably an error`);
      return;
    }
    this.put([updater(atom2.__unsafe__getWithoutCapture())]);
  };
  /**
   * Get whether the record store has a id.
   *
   * @param id - The id of the record to check.
   * @public
   */
  has = (id) => {
    return !!this.atoms.value[id];
  };
  /**
   * Add a new listener to the store.
   *
   * @param onHistory - The listener to call when the store updates.
   * @param filters - Filters to apply to the listener.
   * @returns A function to remove the listener.
   */
  listen = (onHistory, filters) => {
    this._flushHistory();
    const listener = {
      onHistory,
      filters: {
        source: filters?.source ?? "all",
        scope: filters?.scope ?? "all"
      }
    };
    this.listeners.add(listener);
    if (!this.historyReactor.scheduler.isActivelyListening) {
      this.historyReactor.start();
    }
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0) {
        this.historyReactor.stop();
      }
    };
  };
  isMergingRemoteChanges = false;
  /**
   * Merge changes from a remote source without triggering listeners.
   *
   * @param fn - A function that merges the external changes.
   * @public
   */
  mergeRemoteChanges = (fn) => {
    if (this.isMergingRemoteChanges) {
      return fn();
    }
    try {
      this.isMergingRemoteChanges = true;
      transact(fn);
    } finally {
      this.isMergingRemoteChanges = false;
    }
  };
  extractingChanges(fn) {
    const changes = [];
    const dispose = this.historyAccumulator.intercepting((entry) => changes.push(entry.changes));
    try {
      transact(fn);
      return squashRecordDiffs(changes);
    } finally {
      dispose();
    }
  }
  applyDiff(diff, runCallbacks = true) {
    const prevRunCallbacks = this._runCallbacks;
    try {
      this._runCallbacks = runCallbacks;
      transact(() => {
        const toPut = objectMapValues(diff.added).concat(
          objectMapValues(diff.updated).map(([_from, to]) => to)
        );
        const toRemove = objectMapKeys(diff.removed);
        if (toPut.length) {
          this.put(toPut);
        }
        if (toRemove.length) {
          this.remove(toRemove);
        }
      });
    } finally {
      this._runCallbacks = prevRunCallbacks;
    }
  }
  /**
   * Create a computed cache.
   *
   * @param name - The name of the derivation cache.
   * @param derive - A function used to derive the value of the cache.
   * @public
   */
  createComputedCache = (name, derive, isEqual) => {
    const cache = new Cache();
    return {
      get: (id) => {
        const atom2 = this.atoms.value[id];
        if (!atom2) {
          return void 0;
        }
        return cache.get(atom2, () => {
          const recordSignal = isEqual ? computed(atom2.name + ":equals", () => atom2.value, { isEqual }) : atom2;
          return computed(name + ":" + id, () => {
            return derive(recordSignal.value);
          });
        }).value;
      }
    };
  };
  /**
   * Create a computed cache from a selector
   *
   * @param name - The name of the derivation cache.
   * @param selector - A function that returns a subset of the original shape
   * @param derive - A function used to derive the value of the cache.
   * @public
   */
  createSelectedComputedCache = (name, selector, derive) => {
    const cache = new Cache();
    return {
      get: (id) => {
        const atom2 = this.atoms.value[id];
        if (!atom2) {
          return void 0;
        }
        const d = computed(
          name + ":" + id + ":selector",
          () => selector(atom2.value)
        );
        return cache.get(
          atom2,
          () => computed(name + ":" + id, () => derive(d.value))
        ).value;
      }
    };
  };
  getRecordType = (record) => {
    const type = this.schema.types[record.typeName];
    if (!type) {
      throw new Error(`Record type ${record.typeName} not found`);
    }
    return type;
  };
  _integrityChecker;
  /** @internal */
  ensureStoreIsUsable() {
    this._integrityChecker ??= this.schema.createIntegrityChecker(this);
    this._integrityChecker?.();
  }
  _isPossiblyCorrupted = false;
  /** @internal */
  markAsPossiblyCorrupted() {
    this._isPossiblyCorrupted = true;
  }
  /** @internal */
  isPossiblyCorrupted() {
    return this._isPossiblyCorrupted;
  }
}
function squashRecordDiffs(diffs) {
  const result = { added: {}, removed: {}, updated: {} };
  for (const diff of diffs) {
    for (const [id, value] of objectMapEntries(diff.added)) {
      if (result.removed[id]) {
        const original = result.removed[id];
        delete result.removed[id];
        if (original !== value) {
          result.updated[id] = [original, value];
        }
      } else {
        result.added[id] = value;
      }
    }
    for (const [id, [_from, to]] of objectMapEntries(diff.updated)) {
      if (result.added[id]) {
        result.added[id] = to;
        delete result.updated[id];
        delete result.removed[id];
        continue;
      }
      if (result.updated[id]) {
        result.updated[id][1] = to;
        delete result.removed[id];
        continue;
      }
      result.updated[id] = diff.updated[id];
      delete result.removed[id];
    }
    for (const [id, value] of objectMapEntries(diff.removed)) {
      if (result.added[id]) {
        delete result.added[id];
      } else if (result.updated[id]) {
        result.removed[id] = result.updated[id][0];
        delete result.updated[id];
      } else {
        result.removed[id] = value;
      }
    }
  }
  return result;
}
function squashHistoryEntries(entries) {
  const result = [];
  let current = entries[0];
  let entry;
  for (let i = 1, n = entries.length; i < n; i++) {
    entry = entries[i];
    if (current.source !== entry.source) {
      result.push(current);
      current = entry;
    } else {
      current = {
        source: current.source,
        changes: squashRecordDiffs([current.changes, entry.changes])
      };
    }
  }
  result.push(current);
  return result;
}
function reverseRecordsDiff(diff) {
  const result = { added: diff.removed, removed: diff.added, updated: {} };
  for (const [from, to] of Object.values(diff.updated)) {
    result.updated[from.id] = [to, from];
  }
  return result;
}
class HistoryAccumulator {
  _history = [];
  _interceptors = /* @__PURE__ */ new Set();
  intercepting(fn) {
    this._interceptors.add(fn);
    return () => {
      this._interceptors.delete(fn);
    };
  }
  add(entry) {
    this._history.push(entry);
    for (const interceptor of this._interceptors) {
      interceptor(entry);
    }
  }
  flush() {
    const history = squashHistoryEntries(this._history);
    this._history = [];
    return history;
  }
  clear() {
    this._history = [];
  }
  hasChanges() {
    return this._history.length > 0;
  }
}
export {
  Store,
  reverseRecordsDiff,
  squashRecordDiffs
};
//# sourceMappingURL=Store.mjs.map
