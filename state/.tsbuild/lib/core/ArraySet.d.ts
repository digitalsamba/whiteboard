export declare const ARRAY_SIZE_THRESHOLD = 8;
/**
 * An ArraySet operates as an array until it reaches a certain size, after which a Set is used
 * instead. In either case, the same methods are used to get, set, remove, and visit the items.
 * @internal
 */
export declare class ArraySet<T> {
    private arraySize;
    private array;
    private set;
    /**
     * Get whether this ArraySet has any elements.
     *
     * @returns True if this ArraySet has any elements, false otherwise.
     */
    get isEmpty(): boolean;
    /**
     * Add an item to the ArraySet if it is not already present.
     *
     * @param elem - The element to add.
     */
    add(elem: T): boolean;
    /**
     * Remove an item from the ArraySet if it is present.
     *
     * @param elem - The element to remove
     */
    remove(elem: T): boolean;
    /**
     * Run a callback for each element in the ArraySet.
     *
     * @param visitor - The callback to run for each element.
     */
    visit(visitor: (item: T) => void): void;
}
//# sourceMappingURL=ArraySet.d.ts.map