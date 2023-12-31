import { computed, transact } from "@tldraw/state";
import {
  defineMigrations,
  migrate,
  squashRecordDiffs
} from "@tldraw/store";
import {
  CameraRecordType,
  InstancePageStateRecordType,
  TLINSTANCE_ID,
  pageIdValidator,
  shapeIdValidator
} from "@tldraw/tlschema";
import { objectMapFromEntries } from "@tldraw/utils";
import { T } from "@tldraw/validate";
import { uniqueId } from "../utils/uniqueId.mjs";
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
const TAB_ID = window?.[tabIdKey] ?? window?.sessionStorage[tabIdKey] ?? `TLDRAW_INSTANCE_STATE_V1_` + uniqueId();
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
const sessionStateSnapshotValidator = T.object({
  version: T.number,
  currentPageId: pageIdValidator,
  isFocusMode: T.boolean,
  exportBackground: T.boolean,
  isDebugMode: T.boolean,
  isToolLocked: T.boolean,
  isGridMode: T.boolean,
  pageStates: T.arrayOf(
    T.object({
      pageId: pageIdValidator,
      camera: T.object({
        x: T.number,
        y: T.number,
        z: T.number
      }),
      selectedShapeIds: T.arrayOf(shapeIdValidator),
      focusedGroupId: shapeIdValidator.nullable()
    })
  )
});
const sessionStateSnapshotMigrations = defineMigrations({
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
  const result = migrate({
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
  return computed("sessionStateSnapshot", () => {
    const instanceState = store.get(TLINSTANCE_ID);
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
        const ps = store.get(InstancePageStateRecordType.createId(id));
        const camera = store.get(CameraRecordType.createId(id));
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
      ...objectMapFromEntries(allPageStatesAndCameras.map((r) => [r.id, r]))
    }
  };
  if (store.has(TLINSTANCE_ID)) {
    removeDiff.removed[TLINSTANCE_ID] = store.get(TLINSTANCE_ID);
  }
  const addDiff = {
    removed: {},
    updated: {},
    added: {
      [TLINSTANCE_ID]: store.schema.types.instance.create({
        id: TLINSTANCE_ID,
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
    const cameraId = CameraRecordType.createId(ps.pageId);
    const pageStateId = InstancePageStateRecordType.createId(ps.pageId);
    addDiff.added[cameraId] = CameraRecordType.create({
      id: CameraRecordType.createId(ps.pageId),
      x: ps.camera.x,
      y: ps.camera.y,
      z: ps.camera.z
    });
    addDiff.added[pageStateId] = InstancePageStateRecordType.create({
      id: InstancePageStateRecordType.createId(ps.pageId),
      pageId: ps.pageId,
      selectedShapeIds: ps.selectedShapeIds,
      focusedGroupId: ps.focusedGroupId
    });
  }
  transact(() => {
    store.applyDiff(squashRecordDiffs([removeDiff, addDiff]));
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
    (r) => r.typeName === "instance" && r.id !== TLINSTANCE_ID
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
export {
  CURRENT_SESSION_STATE_SNAPSHOT_VERSION,
  TAB_ID,
  createSessionStateSnapshotSignal,
  extractSessionStateFromLegacySnapshot,
  loadSessionStateSnapshotIntoStore
};
//# sourceMappingURL=TLSessionStateSnapshot.mjs.map
