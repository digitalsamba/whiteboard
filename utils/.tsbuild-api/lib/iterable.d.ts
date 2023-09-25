/**
 * Get the first item from an iterable Set or Map.
 *
 * @example
 *
 * ```ts
 * const A = getFirstItem(new Set([1, 2, 3])) // 1
 * const B = getFirstItem(
 * 	new Map([
 * 		['a', 1],
 * 		['b', 2],
 * 	])
 * ) // 1
 * ```
 *
 * @param value - The iterable Set or Map.
 * @public
 */
export declare function getFirstFromIterable<T = unknown>(set: Map<any, T> | Set<T>): T;
//# sourceMappingURL=iterable.d.ts.map