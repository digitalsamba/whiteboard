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
var file_exports = {};
__export(file_exports, {
  TLDRAW_FILE_EXTENSION: () => TLDRAW_FILE_EXTENSION,
  TLDRAW_FILE_MIMETYPE: () => TLDRAW_FILE_MIMETYPE,
  isV1File: () => isV1File,
  parseAndLoadDocument: () => parseAndLoadDocument,
  parseTldrawJsonFile: () => parseTldrawJsonFile,
  serializeTldrawJson: () => serializeTldrawJson,
  serializeTldrawJsonBlob: () => serializeTldrawJsonBlob
});
module.exports = __toCommonJS(file_exports);
var import_editor = require("@tldraw/editor");
var import_buildFromV1Document = require("./buildFromV1Document");
const TLDRAW_FILE_MIMETYPE = "application/vnd.tldraw+json";
const TLDRAW_FILE_EXTENSION = ".tldr";
const LATEST_TLDRAW_FILE_FORMAT_VERSION = 1;
const tldrawFileValidator = import_editor.T.object({
  tldrawFileFormatVersion: import_editor.T.nonZeroInteger,
  schema: import_editor.T.object({
    schemaVersion: import_editor.T.positiveInteger,
    storeVersion: import_editor.T.positiveInteger,
    recordVersions: import_editor.T.dict(
      import_editor.T.string,
      import_editor.T.object({
        version: import_editor.T.positiveInteger,
        subTypeVersions: import_editor.T.dict(import_editor.T.string, import_editor.T.positiveInteger).optional(),
        subTypeKey: import_editor.T.string.optional()
      })
    )
  }),
  records: import_editor.T.arrayOf(
    import_editor.T.object({
      id: import_editor.T.string,
      typeName: import_editor.T.string
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
        return import_editor.Result.err({ type: "v1File", data });
      }
    } catch (e2) {
    }
    return import_editor.Result.err({ type: "notATldrawFile", cause: e });
  }
  if (data.tldrawFileFormatVersion > LATEST_TLDRAW_FILE_FORMAT_VERSION) {
    return import_editor.Result.err({
      type: "fileFormatVersionTooNew",
      version: data.tldrawFileFormatVersion
    });
  }
  let migrationResult;
  try {
    const storeSnapshot = Object.fromEntries(data.records.map((r) => [r.id, r]));
    migrationResult = schema.migrateStoreSnapshot({ store: storeSnapshot, schema: data.schema });
  } catch (e) {
    return import_editor.Result.err({ type: "invalidRecords", cause: e });
  }
  if (migrationResult.type === "error") {
    return import_editor.Result.err({ type: "migrationFailed", reason: migrationResult.reason });
  }
  try {
    return import_editor.Result.ok(
      (0, import_editor.createTLStore)({
        initialData: migrationResult.value,
        schema
      })
    );
  } catch (e) {
    return import_editor.Result.err({ type: "invalidRecords", cause: e });
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
            assetSrcToSave = await import_editor.FileHelpers.fileToBase64(
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
        if (parseFileResult.error.reason === import_editor.MigrationFailureReason.TargetVersionTooNew) {
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
        (0, import_buildFromV1Document.buildFromV1Document)(editor, parseFileResult.error.data.document);
        onV1FileLoad?.();
        return;
      }
      default:
        (0, import_editor.exhaustiveSwitchError)(parseFileResult.error, "type");
    }
    addToast({
      title: msg("file-system.file-open-error.title"),
      description
    });
    return;
  }
  (0, import_editor.transact)(() => {
    editor.store.clear();
    const [shapes, nonShapes] = (0, import_editor.partition)(
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
//# sourceMappingURL=file.js.map
