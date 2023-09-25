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
var migrate_exports = {};
__export(migrate_exports, {
  MigrationFailureReason: () => MigrationFailureReason,
  compareRecordVersions: () => compareRecordVersions,
  defineMigrations: () => defineMigrations,
  getRecordVersion: () => getRecordVersion,
  migrate: () => migrate,
  migrateRecord: () => migrateRecord
});
module.exports = __toCommonJS(migrate_exports);
var import_BaseRecord = require("./BaseRecord");
function defineMigrations(opts) {
  const { currentVersion, firstVersion, migrators = {}, subTypeKey, subTypeMigrations } = opts;
  if (typeof currentVersion === "number" && typeof firstVersion === "number") {
    if (currentVersion === firstVersion) {
      throw Error(`Current version is equal to initial version.`);
    } else if (currentVersion < firstVersion) {
      throw Error(`Current version is lower than initial version.`);
    }
  }
  return {
    firstVersion: firstVersion ?? 0,
    // defaults
    currentVersion: currentVersion ?? 0,
    // defaults
    migrators,
    subTypeKey,
    subTypeMigrations
  };
}
var MigrationFailureReason = /* @__PURE__ */ ((MigrationFailureReason2) => {
  MigrationFailureReason2["IncompatibleSubtype"] = "incompatible-subtype";
  MigrationFailureReason2["UnknownType"] = "unknown-type";
  MigrationFailureReason2["TargetVersionTooNew"] = "target-version-too-new";
  MigrationFailureReason2["TargetVersionTooOld"] = "target-version-too-old";
  MigrationFailureReason2["MigrationError"] = "migration-error";
  MigrationFailureReason2["UnrecognizedSubtype"] = "unrecognized-subtype";
  return MigrationFailureReason2;
})(MigrationFailureReason || {});
function getRecordVersion(record, serializedSchema) {
  const persistedType = serializedSchema.recordVersions[record.typeName];
  if (!persistedType) {
    return { rootVersion: 0 };
  }
  if ("subTypeKey" in persistedType) {
    const subType = record[persistedType.subTypeKey];
    const subTypeVersion = persistedType.subTypeVersions[subType];
    return { rootVersion: persistedType.version, subTypeVersion };
  }
  return { rootVersion: persistedType.version };
}
function compareRecordVersions(a, b) {
  if (a.rootVersion > b.rootVersion) {
    return 1;
  }
  if (a.rootVersion < b.rootVersion) {
    return -1;
  }
  if (a.subTypeVersion != null && b.subTypeVersion != null) {
    if (a.subTypeVersion > b.subTypeVersion) {
      return 1;
    }
    if (a.subTypeVersion < b.subTypeVersion) {
      return -1;
    }
  }
  return 0;
}
function migrateRecord({
  record,
  migrations,
  fromVersion,
  toVersion
}) {
  let currentVersion = fromVersion;
  if (!(0, import_BaseRecord.isRecord)(record))
    throw new Error("[migrateRecord] object is not a record");
  const { typeName, id, ...others } = record;
  let recordWithoutMeta = others;
  while (currentVersion < toVersion) {
    const nextVersion = currentVersion + 1;
    const migrator = migrations.migrators[nextVersion];
    if (!migrator) {
      return {
        type: "error",
        reason: "target-version-too-new" /* TargetVersionTooNew */
      };
    }
    recordWithoutMeta = migrator.up(recordWithoutMeta);
    currentVersion = nextVersion;
  }
  while (currentVersion > toVersion) {
    const nextVersion = currentVersion - 1;
    const migrator = migrations.migrators[currentVersion];
    if (!migrator) {
      return {
        type: "error",
        reason: "target-version-too-old" /* TargetVersionTooOld */
      };
    }
    recordWithoutMeta = migrator.down(recordWithoutMeta);
    currentVersion = nextVersion;
  }
  return {
    type: "success",
    value: { ...recordWithoutMeta, id, typeName }
  };
}
function migrate({
  value,
  migrations,
  fromVersion,
  toVersion
}) {
  let currentVersion = fromVersion;
  while (currentVersion < toVersion) {
    const nextVersion = currentVersion + 1;
    const migrator = migrations.migrators[nextVersion];
    if (!migrator) {
      return {
        type: "error",
        reason: "target-version-too-new" /* TargetVersionTooNew */
      };
    }
    value = migrator.up(value);
    currentVersion = nextVersion;
  }
  while (currentVersion > toVersion) {
    const nextVersion = currentVersion - 1;
    const migrator = migrations.migrators[currentVersion];
    if (!migrator) {
      return {
        type: "error",
        reason: "target-version-too-old" /* TargetVersionTooOld */
      };
    }
    value = migrator.down(value);
    currentVersion = nextVersion;
  }
  return {
    type: "success",
    value
  };
}
//# sourceMappingURL=migrate.js.map
