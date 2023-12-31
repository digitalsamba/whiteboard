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
var TLSessionStateSnapshot_exports = {};
__export(TLSessionStateSnapshot_exports, {
  CURRENT_SESSION_STATE_SNAPSHOT_VERSION: () => CURRENT_SESSION_STATE_SNAPSHOT_VERSION,
  TAB_ID: () => TAB_ID,
  createSessionStateSnapshotSignal: () => createSessionStateSnapshotSignal,
  extractSessionStateFromLegacySnapshot: () => extractSessionStateFromLegacySnapshot,
  loadSessionStateSnapshotIntoStore: () => loadSessionStateSnapshotIntoStore
});
module.exports = __toCommonJS(TLSessionStateSnapshot_exports);
var import_state = require("@tldraw/state");
var import_store = require("@tldraw/store");
var import_tlschema = require("@tldraw/tlschema");
var import_utils = require("@tldraw/utils");
var import_validate = require("@tldraw/validate");
var import_uniqueId = require("../utils/uniqueId");
const tabIdKey = "TLDRAW_TAB_ID_v2";
const window = globalThis.window;
function iOS() {
  if (!window)
    return false;
  return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(
    window.navigator.platform
  ) || // iPad on iOS 13 detection
  window.navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const TAB_ID = window?.[tabIdKey] ?? window?.sessionStorage[tabIdKey] ?? `TLDRAW_INSTANCE_STATE_V1_` + (0, import_uniqueId.uniqueId)();
if (window) {
  window[tabIdKey] = TAB_ID;
  if (iOS()) {
    window.sessionStorage[tabIdKey] = TAB_ID;
  } else {
    delete window.sessionStorage[tabIdKey];
  }
}
window?.addEventListener("beforeunload", () => {
  window.sessionStorage[tabIdKey] = TAB_ID;
});
const Versions = {
  Initial: 0
};
const CURRENT_SESSION_STATE_SNAPSHOT_VERSION = Versions.Initial;
const sessionStateSnapshotValidator = import_validate.T.object({
  version: import_validate.T.number,
  currentPageId: import_tlschema.pageIdValidator,
  isFocusMode: import_validate.T.boolean,
  exportBackground: import_validate.T.boolean,
  isDebugMode: import_validate.T.boolean,
  isToolLocked: import_validate.T.boolean,
  isGridMode: import_validate.T.boolean,
  pageStates: import_validate.T.arrayOf(
    import_validate.T.object({
      pageId: import_tlschema.pageIdValidator,
      camera: import_validate.T.object({
        x: import_validate.T.number,
        y: import_validate.T.number,
        z: import_validate.T.number
      }),
      selectedShapeIds: import_validate.T.arrayOf(import_tlschema.shapeIdValidator),
      focusedGroupId: import_tlschema.shapeIdValidator.nullable()
    })
  )
});
const sessionStateSnapshotMigrations = (0, import_store.defineMigrations)({
  currentVersion: CURRENT_SESSION_STATE_SNAPSHOT_VERSION
});
function migrateAndValidateSessionStateSnapshot(state) {
  if (!state || typeof state !== "object") {
    console.warn("Invalid instance state");
    return null;
  }
  if (!("version" in state) || typeof state.version !== "number") {
    console.warn("No version in instance state");
    return null;
  }
  const result = (0, import_store.migrate)({
    value: state,
    fromVersion: state.version,
    toVersion: CURRENT_SESSION_STATE_SNAPSHOT_VERSION,
    migrations: sessionStateSnapshotMigrations
  });
  if (result.type === "error") {
    console.warn(result.reason);
    return null;
  }
  const value = { ...result.value, version: CURRENT_SESSION_STATE_SNAPSHOT_VERSION };
  try {
    sessionStateSnapshotValidator.validate(value);
  } catch (e) {
    console.warn(e);
    return null;
  }
  return value;
}
function createSessionStateSnapshotSignal(store) {
  const $allPageIds = store.query.ids("page");
  return (0, import_state.computed)("sessionStateSnapshot", () => {
    const instanceState = store.get(import_tlschema.TLINSTANCE_ID);
    if (!instanceState)
      return null;
    const allPageIds = [...$allPageIds.value];
    return {
      version: CURRENT_SESSION_STATE_SNAPSHOT_VERSION,
      currentPageId: instanceState.currentPageId,
      exportBackground: instanceState.exportBackground,
      isFocusMode: instanceState.isFocusMode,
      isDebugMode: instanceState.isDebugMode,
      isToolLocked: instanceState.isToolLocked,
      isGridMode: instanceState.isGridMode,
      pageStates: allPageIds.map((id) => {
        const ps = store.get(import_tlschema.InstancePageStateRecordType.createId(id));
        const camera = store.get(import_tlschema.CameraRecordType.createId(id));
        return {
          pageId: id,
          camera: {
            x: camera?.x ?? 0,
            y: camera?.y ?? 0,
            z: camera?.z ?? 1
          },
          selectedShapeIds: ps?.selectedShapeIds ?? [],
          focusedGroupId: ps?.focusedGroupId ?? null
        };
      })
    };
  });
}
function loadSessionStateSnapshotIntoStore(store, snapshot) {
  const res = migrateAndValidateSessionStateSnapshot(snapshot);
  if (!res)
    return;
  const allPageStatesAndCameras = store.allRecords().filter((r) => r.typeName === "instance_page_state" || r.typeName === "camera");
  const removeDiff = {
    added: {},
    updated: {},
    removed: {
      ...(0, import_utils.objectMapFromEntries)(allPageStatesAndCameras.map((r) => [r.id, r]))
    }
  };
  if (store.has(import_tlschema.TLINSTANCE_ID)) {
    removeDiff.removed[import_tlschema.TLINSTANCE_ID] = store.get(import_tlschema.TLINSTANCE_ID);
  }
  const addDiff = {
    removed: {},
    updated: {},
    added: {
      [import_tlschema.TLINSTANCE_ID]: store.schema.types.instance.create({
        id: import_tlschema.TLINSTANCE_ID,
        currentPageId: res.currentPageId,
        isDebugMode: res.isDebugMode,
        isFocusMode: res.isFocusMode,
        isToolLocked: res.isToolLocked,
        isGridMode: res.isGridMode,
        exportBackground: res.exportBackground
      })
    }
  };
  for (const ps of res.pageStates) {
    const cameraId = import_tlschema.CameraRecordType.createId(ps.pageId);
    const pageStateId = import_tlschema.InstancePageStateRecordType.createId(ps.pageId);
    addDiff.added[cameraId] = import_tlschema.CameraRecordType.create({
      id: import_tlschema.CameraRecordType.createId(ps.pageId),
      x: ps.camera.x,
      y: ps.camera.y,
      z: ps.camera.z
    });
    addDiff.added[pageStateId] = import_tlschema.InstancePageStateRecordType.create({
      id: import_tlschema.InstancePageStateRecordType.createId(ps.pageId),
      pageId: ps.pageId,
      selectedShapeIds: ps.selectedShapeIds,
      focusedGroupId: ps.focusedGroupId
    });
  }
  (0, import_state.transact)(() => {
    store.applyDiff((0, import_store.squashRecordDiffs)([removeDiff, addDiff]));
    store.ensureStoreIsUsable();
  });
}
function extractSessionStateFromLegacySnapshot(store) {
  const instanceRecords = [];
  for (const record of Object.values(store)) {
    if (record.typeName?.match(/^(instance.*|pointer|camera)$/)) {
      instanceRecords.push(record);
    }
  }
  const oldInstance = instanceRecords.filter(
    (r) => r.typeName === "instance" && r.id !== import_tlschema.TLINSTANCE_ID
  )[0];
  if (!oldInstance)
    return null;
  const result = {
    version: CURRENT_SESSION_STATE_SNAPSHOT_VERSION,
    currentPageId: oldInstance.currentPageId,
    exportBackground: !!oldInstance.exportBackground,
    isFocusMode: !!oldInstance.isFocusMode,
    isDebugMode: !!oldInstance.isDebugMode,
    isToolLocked: !!oldInstance.isToolLocked,
    isGridMode: false,
    pageStates: instanceRecords.filter((r) => r.typeName === "instance_page_state" && r.instanceId === oldInstance.id).map((ps) => {
      const camera = store[ps.cameraId] ?? { x: 0, y: 0, z: 1 };
      return {
        pageId: ps.pageId,
        camera: {
          x: camera.x,
          y: camera.y,
          z: camera.z
        },
        selectedShapeIds: ps.selectedShapeIds,
        focusedGroupId: ps.focusedGroupId
      };
    })
  };
  try {
    sessionStateSnapshotValidator.validate(result);
    return result;
  } catch (e) {
    return null;
  }
}
//# sourceMappingURL=TLSessionStateSnapshot.js.map
