/**
 * Get whether a value is not undefined.
 *
 * @param value - The value to check.
 * @public
 */
export declare function isDefined<T>(value: T): value is typeof value extends undefined ? never : T;
/**
 * Get whether a value is null
 *
 * @param value - The value to check.
 * @public
 */
export declare function isNonNull<T>(value: T): value is typeof value extends null ? never : T;
/**
 * Get whether a value is nullish (null, undefined).
 *
 * @param value - The value to check.
 * @public
 */
export declare function isNonNullish<T>(value: T): value is typeof value extends undefined ? never : typeof value extends null ? never : T;
/** @public */
export declare const structuredClone: <T>(i: T) => T;
//# sourceMappingURL=value.d.ts.map