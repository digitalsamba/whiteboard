import { RESET_VALUE } from "./types.mjs";
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
    if (diff === RESET_VALUE) {
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
        return RESET_VALUE;
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
    return RESET_VALUE;
  }
}
export {
  HistoryBuffer
};
//# sourceMappingURL=HistoryBuffer.mjs.map
