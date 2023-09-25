/**
 * Get a number of indices between two indices.
 * @param below - (optional) The index below.
 * @param above - (optional) The index above.
 * @param n - The number of indices to get.
 * @public
 */
export declare function getIndicesBetween(below: string | undefined, above: string | undefined, n: number): string[];
/**
 * Get a number of indices above an index.
 * @param below - The index below.
 * @param n - The number of indices to get.
 * @public
 */
export declare function getIndicesAbove(below: string, n: number): string[];
/**
 * Get a number of indices below an index.
 * @param above - The index above.
 * @param n - The number of indices to get.
 * @public
 */
export declare function getIndicesBelow(above: string, n: number): string[];
/**
 * Get the index between two indices.
 * @param below - The index below.
 * @param above - The index above.
 * @public
 */
export declare function getIndexBetween(below: string, above?: string): string;
/**
 * Get the index above a given index.
 * @param below - The index below.
 * @public
 */
export declare function getIndexAbove(below: string): string;
/**
 * Get the index below a given index.
 * @param above - The index above.
 *  @public
 */
export declare function getIndexBelow(above: string): string;
/**
 * Get n number of indices, starting at an index.
 * @param n - The number of indices to get.
 * @param start - (optional) The index to start at.
 * @public
 */
export declare function getIndices(n: number, start?: string): string[];
/**
 * Sort by index.
 * @param a - An object with an index property.
 * @param b - An object with an index property.
 * @public */
export declare function sortByIndex<T extends {
    index: string;
}>(a: T, b: T): 0 | 1 | -1;
//# sourceMappingURL=reordering.d.ts.map