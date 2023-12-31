class IncrementalSetConstructor {
  constructor(previousValue) {
    this.previousValue = previousValue;
  }
  /**
   * The next value of the set.
   *
   * @internal
   */
  nextValue;
  /**
   * The diff of the set.
   *
   * @internal
   */
  diff;
  /**
   * Get the next value of the set.
   *
   * @public
   */
  get() {
    const numRemoved = this.diff?.removed?.size ?? 0;
    const numAdded = this.diff?.added?.size ?? 0;
    if (numRemoved === 0 && numAdded === 0) {
      return void 0;
    }
    return { value: this.nextValue, diff: this.diff };
  }
  /**
   * Add an item to the set.
   *
   * @param item - The item to add.
   * @param wasAlreadyPresent - Whether the item was already present in the set.
   * @internal
   */
  _add(item, wasAlreadyPresent) {
    this.nextValue ??= new Set(this.previousValue);
    this.nextValue.add(item);
    this.diff ??= {};
    if (wasAlreadyPresent) {
      this.diff.removed?.delete(item);
    } else {
      this.diff.added ??= /* @__PURE__ */ new Set();
      this.diff.added.add(item);
    }
  }
  /**
   * Add an item to the set.
   *
   * @param item - The item to add.
   * @public
   */
  add(item) {
    const wasAlreadyPresent = this.previousValue.has(item);
    if (wasAlreadyPresent) {
      const wasRemoved = this.diff?.removed?.has(item);
      if (!wasRemoved)
        return;
      return this._add(item, wasAlreadyPresent);
    }
    const isCurrentlyPresent = this.nextValue?.has(item);
    if (isCurrentlyPresent)
      return;
    this._add(item, wasAlreadyPresent);
  }
  /**
   * Remove an item from the set.
   *
   * @param item - The item to remove.
   * @param wasAlreadyPresent - Whether the item was already present in the set.
   * @internal
   */
  _remove(item, wasAlreadyPresent) {
    this.nextValue ??= new Set(this.previousValue);
    this.nextValue.delete(item);
    this.diff ??= {};
    if (wasAlreadyPresent) {
      this.diff.removed ??= /* @__PURE__ */ new Set();
      this.diff.removed.add(item);
    } else {
      this.diff.added?.delete(item);
    }
  }
  /**
   * Remove an item from the set.
   *
   * @param item - The item to remove.
   * @public
   */
  remove(item) {
    const wasAlreadyPresent = this.previousValue.has(item);
    if (!wasAlreadyPresent) {
      const wasAdded = this.diff?.added?.has(item);
      if (!wasAdded)
        return;
      return this._remove(item, wasAlreadyPresent);
    }
    const hasAlreadyBeenRemoved = this.diff?.removed?.has(item);
    if (hasAlreadyBeenRemoved)
      return;
    this._remove(item, wasAlreadyPresent);
  }
}
export {
  IncrementalSetConstructor
};
//# sourceMappingURL=IncrementalSetConstructor.mjs.map
