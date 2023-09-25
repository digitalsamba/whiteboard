/**
 * Rotate the contents of an array.
 *
 * @public
 */
export declare function rotateArray<T>(arr: T[], offset: number): T[];
/**
 * Deduplicate the items in an array
 *
 * @public
 */
export declare function dedupe<T>(input: T[], equals?: (a: any, b: any) => boolean): T[];
/** @internal */
export declare function compact<T>(arr: T[]): NonNullable<T>[];
/** @internal */
export declare function last<T>(arr: readonly T[]): T | undefined;
/** @internal */
export declare function minBy<T>(arr: readonly T[], fn: (item: T) => number): T | undefined;
/**
 * Partitions an array into two arrays, one with items that satisfy the predicate, and one with
 * items that do not.
 *
 * @param arr - The array to partition
 * @param predicate - The predicate to use to partition the array
 * @returns A tuple of two arrays, the first one with items that satisfy the predicate and the
 *   second one with the ones that dont
 * @internal
 */
export declare function partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]];
//# sourceMappingURL=array.d.ts.map