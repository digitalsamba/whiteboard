const ARRAY_SIZE_THRESHOLD = 8;
class ArraySet {
  arraySize = 0;
  array = Array(ARRAY_SIZE_THRESHOLD);
  set = null;
  /**
   * Get whether this ArraySet has any elements.
   *
   * @returns True if this ArraySet has any elements, false otherwise.
   */
  get isEmpty() {
    if (this.array) {
      return this.arraySize === 0;
    }
    if (this.set) {
      return this.set.size === 0;
    }
    throw new Error("no set or array");
  }
  /**
   * Add an item to the ArraySet if it is not already present.
   *
   * @param elem - The element to add.
   */
  add(elem) {
    if (this.array) {
      const idx = this.array.indexOf(elem);
      if (idx !== -1) {
        return false;
      }
      if (this.arraySize < ARRAY_SIZE_THRESHOLD) {
        this.array[this.arraySize] = elem;
        this.arraySize++;
        return true;
      } else {
        this.set = new Set(this.array);
        this.array = null;
        this.set.add(elem);
        return true;
      }
    }
    if (this.set) {
      if (this.set.has(elem)) {
        return false;
      }
      this.set.add(elem);
      return true;
    }
    throw new Error("no set or array");
  }
  /**
   * Remove an item from the ArraySet if it is present.
   *
   * @param elem - The element to remove
   */
  remove(elem) {
    if (this.array) {
      const idx = this.array.indexOf(elem);
      if (idx === -1) {
        return false;
      }
      this.array[idx] = void 0;
      this.arraySize--;
      if (idx !== this.arraySize) {
        this.array[idx] = this.array[this.arraySize];
        this.array[this.arraySize] = void 0;
      }
      return true;
    }
    if (this.set) {
      if (!this.set.has(elem)) {
        return false;
      }
      this.set.delete(elem);
      return true;
    }
    throw new Error("no set or array");
  }
  /**
   * Run a callback for each element in the ArraySet.
   *
   * @param visitor - The callback to run for each element.
   */
  visit(visitor) {
    if (this.array) {
      for (let i = 0; i < this.arraySize; i++) {
        const elem = this.array[i];
        if (typeof elem !== "undefined") {
          visitor(elem);
        }
      }
      return;
    }
    if (this.set) {
      this.set.forEach(visitor);
      return;
    }
    throw new Error("no set or array");
  }
}
export {
  ARRAY_SIZE_THRESHOLD,
  ArraySet
};
//# sourceMappingURL=ArraySet.mjs.map
