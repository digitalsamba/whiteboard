/**
 * Get the length of an integer.
 *
 * @param head - The integer to use.
 */
export declare function getIntegerLength(head: string): number;
/**
 * Validate an integer.
 *
 * @param int - The integer to use.
 */
export declare function validateInteger(int: string): asserts int is string;
export declare function isNotUndefined(n: string | undefined): asserts n is string;
/**
 * Increment an integer.
 *
 * @param x - The integer to increment
 */
export declare function incrementInteger(x: string): string | undefined;
/**
 * Decrement an integer.
 *
 * @param x - The integer to decrement
 */
export declare function decrementInteger(x: string): string | undefined;
/**
 * Get the midpoint between two indexs.
 *
 * @param a - The start index.
 * @param b - The end index.
 */
export declare function midpoint(a: string, b: string | undefined): string;
/**
 * Get the integer part of an index.
 *
 * @param index - The index to use.
 */
export declare function getIntegerPart(index: string): string;
/**
 * Validate an index.
 *
 * @param x - The index to validate.
 */
export declare function validateOrder(index: string): asserts index is string;
/**
 * A string made up of an integer part followed by a fraction part. The fraction point consists of
 * zero or more digits with no trailing zeros.
 */
export type OrderKey = string;
/**
 * Generate an index key at the midpoint between a start and end.
 *
 * @param a - The start index key string.
 * @param b - The end index key string, greater than A.
 */
export declare function generateKeyBetween(a: OrderKey | undefined, b: OrderKey | undefined): OrderKey;
/**
 * Generate N number of index keys between the start and end index.
 *
 * @param a - The start index key string.
 * @param b - The end index key, greater than A string.
 * @param n - The number of index keys to generate.
 */
export declare function generateNKeysBetween(a: string | undefined, b: string | undefined, n: number): string[];
export declare function getCounter(): () => string;
export declare function iterableRange(n?: number): Generator<string, void, unknown>;
//# sourceMappingURL=dgreensp.d.ts.map