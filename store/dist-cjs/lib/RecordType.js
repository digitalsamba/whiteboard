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
var RecordType_exports = {};
__export(RecordType_exports, {
  RecordType: () => RecordType,
  assertIdType: () => assertIdType,
  createRecordType: () => createRecordType
});
module.exports = __toCommonJS(RecordType_exports);
var import_utils = require("@tldraw/utils");
var import_nanoid = require("nanoid");
class RecordType {
  constructor(typeName, config) {
    this.typeName = typeName;
    this.createDefaultProperties = config.createDefaultProperties;
    this.migrations = config.migrations;
    this.validator = config.validator ?? { validate: (r) => r };
    this.scope = config.scope ?? "document";
  }
  createDefaultProperties;
  migrations;
  validator;
  scope;
  /**
   * Create a new record of this type.
   *
   * @param properties - The properties of the record.
   * @returns The new record.
   */
  create(properties) {
    const result = { ...this.createDefaultProperties(), id: this.createId() };
    for (const [k, v] of Object.entries(properties)) {
      if (v !== void 0) {
        result[k] = v;
      }
    }
    result.typeName = this.typeName;
    return result;
  }
  /**
   * Clone a record of this type.
   *
   * @param record - The record to clone.
   * @returns The cloned record.
   * @public
   */
  clone(record) {
    return { ...(0, import_utils.structuredClone)(record), id: this.createId() };
  }
  /**
   * Create a new ID for this record type.
   *
   * @example
   *
   * ```ts
   * const id = recordType.createId()
   * ```
   *
   * @returns The new ID.
   * @public
   */
  createId(customUniquePart) {
    return this.typeName + ":" + (customUniquePart ?? (0, import_nanoid.nanoid)());
  }
  /**
   * Create a new ID for this record type based on the given ID.
   *
   * @example
   *
   * ```ts
   * const id = recordType.createCustomId('myId')
   * ```
   *
   * @deprecated - Use `createId` instead.
   * @param id - The ID to base the new ID on.
   * @returns The new ID.
   */
  createCustomId(id) {
    return this.typeName + ":" + id;
  }
  /**
   * Takes an id like `user:123` and returns the part after the colon `123`
   *
   * @param id - The id
   * @returns
   */
  parseId(id) {
    if (!this.isId(id)) {
      throw new Error(`ID "${id}" is not a valid ID for type "${this.typeName}"`);
    }
    return id.slice(this.typeName.length + 1);
  }
  /**
   * Check whether a record is an instance of this record type.
   *
   * @example
   *
   * ```ts
   * const result = recordType.isInstance(someRecord)
   * ```
   *
   * @param record - The record to check.
   * @returns Whether the record is an instance of this record type.
   */
  isInstance = (record) => {
    return record?.typeName === this.typeName;
  };
  /**
   * Check whether an id is an id of this type.
   *
   * @example
   *
   * ```ts
   * const result = recordType.isIn('someId')
   * ```
   *
   * @param id - The id to check.
   * @returns Whether the id is an id of this type.
   */
  isId(id) {
    if (!id)
      return false;
    for (let i = 0; i < this.typeName.length; i++) {
      if (id[i] !== this.typeName[i])
        return false;
    }
    return id[this.typeName.length] === ":";
  }
  /**
   * Create a new RecordType that has the same type name as this RecordType and includes the given
   * default properties.
   *
   * @example
   *
   * ```ts
   * const authorType = createRecordType('author', () => ({ living: true }))
   * const deadAuthorType = authorType.withDefaultProperties({ living: false })
   * ```
   *
   * @param fn - A function that returns the default properties of the new RecordType.
   * @returns The new RecordType.
   */
  withDefaultProperties(createDefaultProperties) {
    return new RecordType(this.typeName, {
      createDefaultProperties,
      migrations: this.migrations,
      validator: this.validator,
      scope: this.scope
    });
  }
  /**
   * Check that the passed in record passes the validations for this type. Returns its input
   * correctly typed if it does, but throws an error otherwise.
   */
  validate(record) {
    return this.validator.validate(record);
  }
}
function createRecordType(typeName, config) {
  return new RecordType(typeName, {
    createDefaultProperties: () => ({}),
    migrations: config.migrations ?? { currentVersion: 0, firstVersion: 0, migrators: {} },
    validator: config.validator,
    scope: config.scope
  });
}
function assertIdType(id, type) {
  if (!id || !type.isId(id)) {
    throw new Error(`string ${JSON.stringify(id)} is not a valid ${type.typeName} id`);
  }
}
//# sourceMappingURL=RecordType.js.map
