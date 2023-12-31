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
var HistoryBuffer_exports = {};
__export(HistoryBuffer_exports, {
  HistoryBuffer: () => HistoryBuffer
});
module.exports = __toCommonJS(HistoryBuffer_exports);
var import_types = require("./types");
class HistoryBuffer {
  constructor(capacity) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
  }
  index = 0;
  // use a wrap around buffer to store the last N values
  buffer;
  /**
   * Add a diff to the history buffer.
   *
   * @param lastComputedEpoch - The epoch when the diff was computed.
   * @param currentEpoch - The current epoch.
   * @param diff - (optional) The diff to add, or else a reset value.
   */
  pushEntry(lastComputedEpoch, currentEpoch, diff) {
    if (diff === void 0) {
      return;
    }
    if (diff === import_types.RESET_VALUE) {
      this.clear();
      return;
    }
    this.buffer[this.index] = [lastComputedEpoch, currentEpoch, diff];
    this.index = (this.index + 1) % this.capacity;
  }
  /**
   * Clear the history buffer.
   */
  clear() {
    this.index = 0;
    this.buffer.fill(void 0);
  }
  /**
   * Get the diffs since the given epoch.
   *
   * @param epoch - The epoch to get diffs since.
   * @returns An array of diffs or a flag to reset the history buffer.
   */
  getChangesSince(sinceEpoch) {
    const { index, capacity, buffer } = this;
    for (let i = 0; i < capacity; i++) {
      const offset = (index - 1 + capacity - i) % capacity;
      const elem = buffer[offset];
      if (!elem) {
        return import_types.RESET_VALUE;
      }
      const [fromEpoch, toEpoch] = elem;
      if (i === 0 && sinceEpoch >= toEpoch) {
        return [];
      }
      if (fromEpoch <= sinceEpoch && sinceEpoch < toEpoch) {
        const len = i + 1;
        const result = new Array(len);
        for (let j = 0; j < len; j++) {
          result[j] = buffer[(offset + j) % capacity][2];
        }
        return result;
      }
    }
    return import_types.RESET_VALUE;
  }
}
//# sourceMappingURL=HistoryBuffer.js.map
