import { CollectionDiff } from './Store';
/**
 * A class that can be used to incrementally construct a set of records.
 *
 * @internal
 */
export declare class IncrementalSetConstructor<T> {
    /**
     * The previous value of the set.
     *
     * @internal
     * @readonly
     */
    private readonly previousValue;
    /**
     * The next value of the set.
     *
     * @internal
     */
    private nextValue?;
    /**
     * The diff of the set.
     *
     * @internal
     */
    private diff?;
    constructor(
    /**
     * The previous value of the set.
     *
     * @internal
     * @readonly
     */
    previousValue: Set<T>);
    /**
     * Get the next value of the set.
     *
     * @public
     */
    get(): {
        value: Set<T>;
        diff: CollectionDiff<T>;
    } | undefined;
    /**
     * Add an item to the set.
     *
     * @param item - The item to add.
     * @param wasAlreadyPresent - Whether the item was already present in the set.
     * @internal
     */
    private _add;
    /**
     * Add an item to the set.
     *
     * @param item - The item to add.
     * @public
     */
    add(item: T): void;
    /**
     * Remove an item from the set.
     *
     * @param item - The item to remove.
     * @param wasAlreadyPresent - Whether the item was already present in the set.
     * @internal
     */
    private _remove;
    /**
     * Remove an item from the set.
     *
     * @param item - The item to remove.
     * @public
     */
    remove(item: T): void;
}
//# sourceMappingURL=IncrementalSetConstructor.d.ts.map