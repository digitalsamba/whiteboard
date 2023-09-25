/**
 * Linear interpolate between two values.
 *
 * @example
 *
 * ```ts
 * const A = lerp(0, 1, 0.5)
 * ```
 *
 * @public
 */
export declare function lerp(a: number, b: number, t: number): number;
/**
 * Seeded random number generator, using [xorshift](https://en.wikipedia.org/wiki/Xorshift). The
 * result will always be betweeen -1 and 1.
 *
 * Adapted from [seedrandom](https://github.com/davidbau/seedrandom).
 *
 * @public
 */
export declare function rng(seed?: string): () => number;
/**
 * Modulate a value between two ranges.
 *
 * @example
 *
 * ```ts
 * const A = modulate(0, [0, 1], [0, 100])
 * ```
 *
 * @param value - The interpolation value.
 * @param rangeA - From [low, high]
 * @param rangeB - To [low, high]
 * @param clamp - Whether to clamp the the result to [low, high]
 * @public
 */
export declare function modulate(value: number, rangeA: number[], rangeB: number[], clamp?: boolean): number;
//# sourceMappingURL=number.d.ts.map