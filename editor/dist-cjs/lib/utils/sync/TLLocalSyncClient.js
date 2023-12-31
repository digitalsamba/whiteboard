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
var TLLocalSyncClient_exports = {};
__export(TLLocalSyncClient_exports, {
  BroadcastChannelMock: () => BroadcastChannelMock,
  TLLocalSyncClient: () => TLLocalSyncClient
});
module.exports = __toCommonJS(TLLocalSyncClient_exports);
var import_state = require("@tldraw/state");
var import_store = require("@tldraw/store");
var import_utils = require("@tldraw/utils");
var import_TLSessionStateSnapshot = require("../../config/TLSessionStateSnapshot");
var import_alerts = require("./alerts");
var import_indexedDb = require("./indexedDb");
const PERSIST_THROTTLE_MS = 350;
const PERSIST_RETRY_THROTTLE_MS = 1e4;
const UPDATE_INSTANCE_STATE = Symbol("UPDATE_INSTANCE_STATE");
const msg = (msg2) => msg2;
class BroadcastChannelMock {
  onmessage;
  constructor(_name) {
  }
  postMessage(_msg) {
  }
  close() {
  }
}
const BC = typeof BroadcastChannel === "undefined" ? BroadcastChannelMock : BroadcastChannel;
class TLLocalSyncClient {
  constructor(store, {
    persistenceKey,
    sessionId = import_TLSessionStateSnapshot.TAB_ID,
    onLoad,
    onLoadError
  }, channel = new BC(`tldraw-tab-sync-${persistenceKey}`)) {
    this.store = store;
    this.channel = channel;
    if (typeof window !== "undefined") {
      ;
      window.tlsync = this;
    }
    this.persistenceKey = persistenceKey;
    this.sessionId = sessionId;
    this.serializedSchema = this.store.schema.serialize();
    this.$sessionStateSnapshot = (0, import_TLSessionStateSnapshot.createSessionStateSnapshotSignal)(this.store);
    this.disposables.add(
      // Set up a subscription to changes from the store: When
      // the store changes (and if the change was made by the user)
      // then immediately send the diff to other tabs via postMessage
      // and schedule a persist.
      store.listen(
        ({ changes }) => {
          this.diffQueue.push(changes);
          this.channel.postMessage(
            msg({
              type: "diff",
              storeId: this.store.id,
              changes,
              schema: this.serializedSchema
            })
          );
          this.schedulePersist();
        },
        { source: "user", scope: "document" }
      )
    );
    this.disposables.add(
      store.listen(
        () => {
          this.diffQueue.push(UPDATE_INSTANCE_STATE);
          this.schedulePersist();
        },
        { scope: "session" }
      )
    );
    this.connect(onLoad, onLoadError);
    this.documentTypes = new Set(
      Object.values(this.store.schema.types).filter((t) => t.scope === "document").map((t) => t.typeName)
    );
  }
  disposables = /* @__PURE__ */ new Set();
  diffQueue = [];
  didDispose = false;
  shouldDoFullDBWrite = true;
  isReloading = false;
  persistenceKey;
  sessionId;
  serializedSchema;
  isDebugging = false;
  documentTypes;
  $sessionStateSnapshot;
  initTime = Date.now();
  debug(...args) {
    if (this.isDebugging) {
      console.debug(...args);
    }
  }
  async connect(onLoad, onLoadError) {
    this.debug("connecting");
    let data;
    try {
      data = await (0, import_indexedDb.loadDataFromStore)({
        persistenceKey: this.persistenceKey,
        sessionId: this.sessionId,
        didCancel: () => this.didDispose
      });
    } catch (error) {
      onLoadError(error);
      (0, import_alerts.showCantReadFromIndexDbAlert)();
      if (typeof window !== "undefined") {
        window.location.reload();
      }
      return;
    }
    this.debug("loaded data from store", data, "didDispose", this.didDispose);
    if (this.didDispose)
      return;
    try {
      if (data) {
        const documentSnapshot = Object.fromEntries(data.records.map((r) => [r.id, r]));
        const sessionStateSnapshot = data.sessionStateSnapshot ?? (0, import_TLSessionStateSnapshot.extractSessionStateFromLegacySnapshot)(documentSnapshot);
        const migrationResult = this.store.schema.migrateStoreSnapshot({
          store: documentSnapshot,
          schema: data.schema ?? this.store.schema.serializeEarliestVersion()
        });
        if (migrationResult.type === "error") {
          console.error("failed to migrate store", migrationResult);
          onLoadError(new Error(`Failed to migrate store: ${migrationResult.reason}`));
          return;
        }
        this.store.mergeRemoteChanges(() => {
          this.store.put(
            Object.values(migrationResult.value).filter((r) => this.documentTypes.has(r.typeName)),
            "initialize"
          );
        });
        if (sessionStateSnapshot) {
          (0, import_TLSessionStateSnapshot.loadSessionStateSnapshotIntoStore)(this.store, sessionStateSnapshot);
        }
      }
      this.channel.onmessage = ({ data: data2 }) => {
        this.debug("got message", data2);
        const msg2 = data2;
        const comparison = (0, import_store.compareSchemas)(
          this.serializedSchema,
          msg2.schema ?? this.store.schema.serializeEarliestVersion()
        );
        if (comparison === -1) {
          const timeSinceInit = Date.now() - this.initTime;
          if (timeSinceInit < 5e3) {
            onLoadError(new Error("Schema mismatch, please close other tabs and reload the page"));
            return;
          }
          this.debug("reloading");
          this.isReloading = true;
          window?.location?.reload?.();
          return;
        } else if (comparison === 1) {
          this.debug("telling them to reload");
          this.channel.postMessage({ type: "announce", schema: this.serializedSchema });
          this.shouldDoFullDBWrite = true;
          this.persistIfNeeded();
          return;
        }
        if (msg2.type === "diff") {
          this.debug("applying diff");
          (0, import_state.transact)(() => {
            this.store.mergeRemoteChanges(() => {
              this.store.applyDiff(msg2.changes);
              this.store.ensureStoreIsUsable();
            });
          });
        }
      };
      this.channel.postMessage({ type: "announce", schema: this.serializedSchema });
      this.disposables.add(() => {
        this.channel.close();
      });
      onLoad(this);
    } catch (e) {
      this.debug("error loading data from store", e);
      if (this.didDispose)
        return;
      onLoadError(e);
      return;
    }
  }
  close() {
    this.debug("closing");
    this.didDispose = true;
    this.disposables.forEach((d) => d());
  }
  isPersisting = false;
  didLastWriteError = false;
  scheduledPersistTimeout = null;
  /**
   * Schedule a persist. Persists don't happen immediately: they are throttled to avoid writing too
   * often, and will retry if failed.
   *
   * @internal
   */
  schedulePersist() {
    this.debug("schedulePersist", this.scheduledPersistTimeout);
    if (this.scheduledPersistTimeout)
      return;
    this.scheduledPersistTimeout = setTimeout(
      () => {
        this.scheduledPersistTimeout = null;
        this.persistIfNeeded();
      },
      this.didLastWriteError ? PERSIST_RETRY_THROTTLE_MS : PERSIST_THROTTLE_MS
    );
  }
  /**
   * Persist to IndexedDB only under certain circumstances:
   *
   * - If we're not already persisting
   * - If we're not reloading the page
   * - And we have something to persist (a full db write scheduled or changes in the diff queue)
   *
   * @internal
   */
  persistIfNeeded() {
    this.debug("persistIfNeeded", {
      isPersisting: this.isPersisting,
      isReloading: this.isReloading,
      shouldDoFullDBWrite: this.shouldDoFullDBWrite,
      diffQueueLength: this.diffQueue.length,
      storeIsPossiblyCorrupt: this.store.isPossiblyCorrupted()
    });
    if (this.scheduledPersistTimeout) {
      clearTimeout(this.scheduledPersistTimeout);
      this.scheduledPersistTimeout = null;
    }
    if (this.isPersisting)
      return;
    if (this.isReloading)
      return;
    if (this.store.isPossiblyCorrupted())
      return;
    if (this.shouldDoFullDBWrite || this.diffQueue.length > 0) {
      this.doPersist();
    }
  }
  /**
   * Actually persist to IndexedDB. If the write fails, then we'll retry with a full db write after
   * a short delay.
   */
  async doPersist() {
    (0, import_utils.assert)(!this.isPersisting, "persist already in progress");
    this.isPersisting = true;
    this.debug("doPersist start");
    const diffQueue = this.diffQueue;
    this.diffQueue = [];
    try {
      if (this.shouldDoFullDBWrite) {
        this.shouldDoFullDBWrite = false;
        await (0, import_indexedDb.storeSnapshotInIndexedDb)({
          persistenceKey: this.persistenceKey,
          schema: this.store.schema,
          snapshot: this.store.serialize(),
          didCancel: () => this.didDispose,
          sessionId: this.sessionId,
          sessionStateSnapshot: this.$sessionStateSnapshot.value
        });
      } else {
        const diffs = (0, import_store.squashRecordDiffs)(
          diffQueue.filter((d) => d !== UPDATE_INSTANCE_STATE)
        );
        await (0, import_indexedDb.storeChangesInIndexedDb)({
          persistenceKey: this.persistenceKey,
          changes: diffs,
          schema: this.store.schema,
          didCancel: () => this.didDispose,
          sessionId: this.sessionId,
          sessionStateSnapshot: this.$sessionStateSnapshot.value
        });
      }
      this.didLastWriteError = false;
    } catch (e) {
      this.shouldDoFullDBWrite = true;
      this.didLastWriteError = true;
      console.error("failed to store changes in indexed db", e);
      (0, import_alerts.showCantWriteToIndexDbAlert)();
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }
    this.isPersisting = false;
    this.debug("doPersist end");
    this.schedulePersist();
  }
}
//# sourceMappingURL=TLLocalSyncClient.js.map
