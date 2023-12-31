import {
  FileHelpers,
  MigrationFailureReason,
  Result,
  T,
  createTLStore,
  exhaustiveSwitchError,
  partition,
  transact
} from "@tldraw/editor";
import { buildFromV1Document } from "./buildFromV1Document.mjs";
const TLDRAW_FILE_MIMETYPE = "application/vnd.tldraw+json";
const TLDRAW_FILE_EXTENSION = ".tldr";
const LATEST_TLDRAW_FILE_FORMAT_VERSION = 1;
const tldrawFileValidator = T.object({
  tldrawFileFormatVersion: T.nonZeroInteger,
  schema: T.object({
    schemaVersion: T.positiveInteger,
    storeVersion: T.positiveInteger,
    recordVersions: T.dict(
      T.string,
      T.object({
        version: T.positiveInteger,
        subTypeVersions: T.dict(T.string, T.positiveInteger).optional(),
        subTypeKey: T.string.optional()
      })
    )
  }),
  records: T.arrayOf(
    T.object({
      id: T.string,
      typeName: T.string
    }).allowUnknownProperties()
  )
});
function isV1File(data) {
  try {
    if (data.document?.version) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}
function parseTldrawJsonFile({
  json,
  schema
}) {
  let data;
  try {
    data = tldrawFileValidator.validate(JSON.parse(json));
  } catch (e) {
    try {
      data = JSON.parse(json);
      if (isV1File(data)) {
        return Result.err({ type: "v1File", data });
      }
    } catch (e2) {
    }
    return Result.err({ type: "notATldrawFile", cause: e });
  }
  if (data.tldrawFileFormatVersion > LATEST_TLDRAW_FILE_FORMAT_VERSION) {
    return Result.err({
      type: "fileFormatVersionTooNew",
      version: data.tldrawFileFormatVersion
    });
  }
  let migrationResult;
  try {
    const storeSnapshot = Object.fromEntries(data.records.map((r) => [r.id, r]));
    migrationResult = schema.migrateStoreSnapshot({ store: storeSnapshot, schema: data.schema });
  } catch (e) {
    return Result.err({ type: "invalidRecords", cause: e });
  }
  if (migrationResult.type === "error") {
    return Result.err({ type: "migrationFailed", reason: migrationResult.reason });
  }
  try {
    return Result.ok(
      createTLStore({
        initialData: migrationResult.value,
        schema
      })
    );
  } catch (e) {
    return Result.err({ type: "invalidRecords", cause: e });
  }
}
async function serializeTldrawJson(store) {
  const records = [];
  const usedAssets = /* @__PURE__ */ new Set();
  const assets = [];
  for (const record of store.allRecords()) {
    switch (record.typeName) {
      case "asset":
        if (record.type !== "bookmark" && record.props.src && !record.props.src.startsWith("data:")) {
          let assetSrcToSave;
          try {
            assetSrcToSave = await FileHelpers.fileToBase64(
              await (await fetch(record.props.src)).blob()
            );
          } catch {
            assetSrcToSave = record.props.src;
          }
          assets.push({
            ...record,
            props: {
              ...record.props,
              src: assetSrcToSave
            }
          });
        } else {
          assets.push(record);
        }
        break;
      case "shape":
        if ("assetId" in record.props) {
          usedAssets.add(record.props.assetId);
        }
        records.push(record);
        break;
      default:
        records.push(record);
        break;
    }
  }
  const recordsToSave = records.concat(assets.filter((a) => usedAssets.has(a.id)));
  return JSON.stringify({
    tldrawFileFormatVersion: LATEST_TLDRAW_FILE_FORMAT_VERSION,
    schema: store.schema.serialize(),
    records: recordsToSave
  });
}
async function serializeTldrawJsonBlob(store) {
  return new Blob([await serializeTldrawJson(store)], { type: TLDRAW_FILE_MIMETYPE });
}
async function parseAndLoadDocument(editor, document, msg, addToast, onV1FileLoad, forceDarkMode) {
  const parseFileResult = parseTldrawJsonFile({
    schema: editor.store.schema,
    json: document
  });
  if (!parseFileResult.ok) {
    let description;
    switch (parseFileResult.error.type) {
      case "notATldrawFile":
        editor.annotateError(parseFileResult.error.cause, {
          origin: "file-system.open.parse",
          willCrashApp: false,
          tags: { parseErrorType: parseFileResult.error.type }
        });
        reportError(parseFileResult.error.cause);
        description = msg("file-system.file-open-error.not-a-tldraw-file");
        break;
      case "fileFormatVersionTooNew":
        description = msg("file-system.file-open-error.file-format-version-too-new");
        break;
      case "migrationFailed":
        if (parseFileResult.error.reason === MigrationFailureReason.TargetVersionTooNew) {
          description = msg("file-system.file-open-error.file-format-version-too-new");
        } else {
          description = msg("file-system.file-open-error.generic-corrupted-file");
        }
        break;
      case "invalidRecords":
        editor.annotateError(parseFileResult.error.cause, {
          origin: "file-system.open.parse",
          willCrashApp: false,
          tags: { parseErrorType: parseFileResult.error.type }
        });
        reportError(parseFileResult.error.cause);
        description = msg("file-system.file-open-error.generic-corrupted-file");
        break;
      case "v1File": {
        buildFromV1Document(editor, parseFileResult.error.data.document);
        onV1FileLoad?.();
        return;
      }
      default:
        exhaustiveSwitchError(parseFileResult.error, "type");
    }
    addToast({
      title: msg("file-system.file-open-error.title"),
      description
    });
    return;
  }
  transact(() => {
    editor.store.clear();
    const [shapes, nonShapes] = partition(
      parseFileResult.value.allRecords(),
      (record) => record.typeName === "shape"
    );
    editor.store.put(nonShapes, "initialize");
    editor.store.ensureStoreIsUsable();
    editor.store.put(shapes, "initialize");
    editor.history.clear();
    editor.updateViewportScreenBounds();
    editor.updateRenderingBounds();
    const bounds = editor.currentPageBounds;
    if (bounds) {
      editor.zoomToBounds(bounds, 1);
    }
  });
  if (forceDarkMode)
    editor.user.updateUserPreferences({ isDarkMode: true });
}
export {
  TLDRAW_FILE_EXTENSION,
  TLDRAW_FILE_MIMETYPE,
  isV1File,
  parseAndLoadDocument,
  parseTldrawJsonFile,
  serializeTldrawJson,
  serializeTldrawJsonBlob
};
//# sourceMappingURL=file.mjs.map
