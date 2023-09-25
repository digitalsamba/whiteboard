/** @internal */
export declare function hasOwnProperty(obj: object, key: string): boolean;
/** @internal */
export declare function getOwnProperty<K extends string, V>(obj: Partial<Record<K, V>>, key: K): undefined | V;
/** @internal */
export declare function getOwnProperty(obj: object, key: string): unknown;
/**
 * Deep copy function for TypeScript.
 *
 * @example
 *
 * ```ts
 * const A = deepCopy({ a: 1, b: { c: 2 } })
 * ```
 *
 * @param obj - Target value to be copied.
 * @public
 * @see Source - project, ts-deeply https://github.com/ykdr2017/ts-deepcopy
 * @see Code - pen https://codepen.io/erikvullings/pen/ejyBYg
 */
export declare function deepCopy<T = unknown>(obj: T): T;
/**
 * An alias for `Object.keys` that treats the object as a map and so preserves the type of the keys.
 *
 * @internal
 */
export declare function objectMapKeys<Key extends string>(object: {
    readonly [K in Key]: unknown;
}): Array<Key>;
/**
 * An alias for `Object.values` that treats the object as a map and so preserves the type of the
 * keys.
 *
 * @internal
 */
export declare function objectMapValues<Key extends string, Value>(object: {
    [K in Key]: Value;
}): Array<Value>;
/**
 * An alias for `Object.entries` that treats the object as a map and so preserves the type of the
 * keys.
 *
 * @internal
 */
export declare function objectMapEntries<Key extends string, Value>(object: {
    [K in Key]: Value;
}): Array<[Key, Value]>;
/**
 * An alias for `Object.fromEntries` that treats the object as a map and so preserves the type of the
 * keys.
 *
 * @internal
 */
export declare function objectMapFromEntries<Key extends string, Value>(entries: ReadonlyArray<readonly [Key, Value]>): {
    [K in Key]: Value;
};
/**
 * Filters an object using a predicate function.
 * @returns a new object with only the entries that pass the predicate
 * @internal
 */
export declare function filterEntries<Key extends string, Value>(object: {
    [K in Key]: Value;
}, predicate: (key: Key, value: Value) => boolean): {
    [K in Key]: Value;
};
/**
 * Maps the values of one object map to another.
 * @returns a new object with the entries mapped
 * @internal
 */
export declare function mapObjectMapValues<Key extends string, ValueBefore, ValueAfter>(object: {
    readonly [K in Key]: ValueBefore;
}, mapper: (key: Key, value: ValueBefore) => ValueAfter): {
    [K in Key]: ValueAfter;
};
//# sourceMappingURL=object.d.ts.map