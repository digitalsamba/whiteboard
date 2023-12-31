import { annotateError, structuredClone } from "@tldraw/utils";
import { CameraRecordType } from "./records/TLCamera.mjs";
import { DocumentRecordType, TLDOCUMENT_ID } from "./records/TLDocument.mjs";
import { TLINSTANCE_ID } from "./records/TLInstance.mjs";
import { PageRecordType } from "./records/TLPage.mjs";
import { InstancePageStateRecordType } from "./records/TLPageState.mjs";
import { PointerRecordType, TLPOINTER_ID } from "./records/TLPointer.mjs";
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
    (phase === "initialize")
  );
  annotateError(error, {
    tags: {
      origin: "store.validateRecord",
      storePhase: phase,
      isExistingValidationIssue
    },
    extras: {
      recordBefore: recordBefore ? redactRecordForErrorReporting(structuredClone(recordBefore)) : void 0,
      recordAfter: redactRecordForErrorReporting(structuredClone(record))
    }
  });
  throw error;
};
function getDefaultPages() {
  return [PageRecordType.create({ name: "Page 1", index: "a1", meta: {} })];
}
function createIntegrityChecker(store) {
  const $pageIds = store.query.ids("page");
  const ensureStoreIsUsable = () => {
    if (!store.has(TLDOCUMENT_ID)) {
      store.put([DocumentRecordType.create({ id: TLDOCUMENT_ID, name: store.props.defaultName })]);
      return ensureStoreIsUsable();
    }
    if (!store.has(TLPOINTER_ID)) {
      store.put([PointerRecordType.create({ id: TLPOINTER_ID })]);
      return ensureStoreIsUsable();
    }
    const pageIds = $pageIds.value;
    if (pageIds.size === 0) {
      store.put(getDefaultPages());
      return ensureStoreIsUsable();
    }
    const getFirstPageId = () => [...pageIds].map((id) => store.get(id)).sort(sortByIndex)[0].id;
    const instanceState = store.get(TLINSTANCE_ID);
    if (!instanceState) {
      store.put([
        store.schema.types.instance.create({
          id: TLINSTANCE_ID,
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
      const pageStateId = InstancePageStateRecordType.createId(id);
      if (!store.has(pageStateId)) {
        missingPageStateIds.add(pageStateId);
      }
      const cameraId = CameraRecordType.createId(id);
      if (!store.has(cameraId)) {
        missingCameraIds.add(cameraId);
      }
    }
    if (missingPageStateIds.size > 0) {
      store.put(
        [...missingPageStateIds].map(
          (id) => InstancePageStateRecordType.create({
            id,
            pageId: InstancePageStateRecordType.parseId(id)
          })
        )
      );
    }
    if (missingCameraIds.size > 0) {
      store.put([...missingCameraIds].map((id) => CameraRecordType.create({ id })));
    }
  };
  return ensureStoreIsUsable;
}
export {
  createIntegrityChecker,
  onValidationFailure
};
//# sourceMappingURL=TLStore.mjs.map
