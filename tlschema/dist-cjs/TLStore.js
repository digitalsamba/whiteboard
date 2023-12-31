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
var TLStore_exports = {};
__export(TLStore_exports, {
  createIntegrityChecker: () => createIntegrityChecker,
  onValidationFailure: () => onValidationFailure
});
module.exports = __toCommonJS(TLStore_exports);
var import_utils = require("@tldraw/utils");
var import_TLCamera = require("./records/TLCamera");
var import_TLDocument = require("./records/TLDocument");
var import_TLInstance = require("./records/TLInstance");
var import_TLPage = require("./records/TLPage");
var import_TLPageState = require("./records/TLPageState");
var import_TLPointer = require("./records/TLPointer");
function sortByIndex(a, b) {
  if (a.index < b.index) {
    return -1;
  } else if (a.index > b.index) {
    return 1;
  }
  return 0;
}
function redactRecordForErrorReporting(record) {
  if (record.typeName === "asset") {
    if ("src" in record) {
      record.src = "<redacted>";
    }
    if ("src" in record.props) {
      record.props.src = "<redacted>";
    }
  }
}
const onValidationFailure = ({ error, phase, record, recordBefore }) => {
  const isExistingValidationIssue = (
    // if we're initializing the store for the first time, we should
    // allow invalid records so people can load old buggy data:
    phase === "initialize"
  );
  (0, import_utils.annotateError)(error, {
    tags: {
      origin: "store.validateRecord",
      storePhase: phase,
      isExistingValidationIssue
    },
    extras: {
      recordBefore: recordBefore ? redactRecordForErrorReporting((0, import_utils.structuredClone)(recordBefore)) : void 0,
      recordAfter: redactRecordForErrorReporting((0, import_utils.structuredClone)(record))
    }
  });
  throw error;
};
function getDefaultPages() {
  return [import_TLPage.PageRecordType.create({ name: "Page 1", index: "a1", meta: {} })];
}
function createIntegrityChecker(store) {
  const $pageIds = store.query.ids("page");
  const ensureStoreIsUsable = () => {
    if (!store.has(import_TLDocument.TLDOCUMENT_ID)) {
      store.put([import_TLDocument.DocumentRecordType.create({ id: import_TLDocument.TLDOCUMENT_ID, name: store.props.defaultName })]);
      return ensureStoreIsUsable();
    }
    if (!store.has(import_TLPointer.TLPOINTER_ID)) {
      store.put([import_TLPointer.PointerRecordType.create({ id: import_TLPointer.TLPOINTER_ID })]);
      return ensureStoreIsUsable();
    }
    const pageIds = $pageIds.value;
    if (pageIds.size === 0) {
      store.put(getDefaultPages());
      return ensureStoreIsUsable();
    }
    const getFirstPageId = () => [...pageIds].map((id) => store.get(id)).sort(sortByIndex)[0].id;
    const instanceState = store.get(import_TLInstance.TLINSTANCE_ID);
    if (!instanceState) {
      store.put([
        store.schema.types.instance.create({
          id: import_TLInstance.TLINSTANCE_ID,
          currentPageId: getFirstPageId(),
          exportBackground: true
        })
      ]);
      return ensureStoreIsUsable();
    } else if (!pageIds.has(instanceState.currentPageId)) {
      store.put([{ ...instanceState, currentPageId: getFirstPageId() }]);
      return ensureStoreIsUsable();
    }
    const missingPageStateIds = /* @__PURE__ */ new Set();
    const missingCameraIds = /* @__PURE__ */ new Set();
    for (const id of pageIds) {
      const pageStateId = import_TLPageState.InstancePageStateRecordType.createId(id);
      if (!store.has(pageStateId)) {
        missingPageStateIds.add(pageStateId);
      }
      const cameraId = import_TLCamera.CameraRecordType.createId(id);
      if (!store.has(cameraId)) {
        missingCameraIds.add(cameraId);
      }
    }
    if (missingPageStateIds.size > 0) {
      store.put(
        [...missingPageStateIds].map(
          (id) => import_TLPageState.InstancePageStateRecordType.create({
            id,
            pageId: import_TLPageState.InstancePageStateRecordType.parseId(id)
          })
        )
      );
    }
    if (missingCameraIds.size > 0) {
      store.put([...missingCameraIds].map((id) => import_TLCamera.CameraRecordType.create({ id })));
    }
  };
  return ensureStoreIsUsable;
}
//# sourceMappingURL=TLStore.js.map
