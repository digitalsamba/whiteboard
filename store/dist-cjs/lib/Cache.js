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
var Cache_exports = {};
__export(Cache_exports, {
  Cache: () => Cache
});
module.exports = __toCommonJS(Cache_exports);
class Cache {
  /** The map of items to their cached values. */
  items = /* @__PURE__ */ new WeakMap();
  /**
   * Get the cached value for a given record. If the record is not present in the map, the callback
   * will be used to create the value (with the result being stored in the cache for next time).
   *
   * @param item - The item to get.
   * @param cb - The callback to use to create the value when a cached value is not found.
   */
  get(item, cb) {
    if (!this.items.has(item)) {
      this.items.set(item, cb(item));
    }
    return this.items.get(item);
  }
}
//# sourceMappingURL=Cache.js.map
