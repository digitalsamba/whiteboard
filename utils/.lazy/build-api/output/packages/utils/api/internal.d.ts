/**
 * Annotate an error with tags and additional data. Annotations won't overwrite existing ones.
 * Retrieve them with `getErrorAnnotations`.
 *
 * @internal
 */
export declare function annotateError(error: unknown, annotations: Partial<ErrorAnnotations>): void;

/** @internal */
export declare const assert: (value: unknown, message?: string) => asserts value;

/** @internal */
export declare const assertExists: <T>(value: T, message?: string | undefined) => NonNullable<T>;

/** @internal */
export declare function compact<T>(arr: T[]): NonNullable<T>[];

/**
 * Debounce a function.
 *
 * @example
 *
 * ```ts
 * const A = debounce(myFunction, 1000)
 * ```
 *
 * @public
 * @see source - https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
 */
export declare function debounce<T extends unknown[], U>(callback: (...args: T) => PromiseLike<U> | U, wait: number): {
    (...args: T): Promise<U>;
    cancel(): void;
};

/**
 * Deduplicate the items in an array
 *
 * @public
 */
export declare function dedupe<T>(input: T[], equals?: (a: any, b: any) => boolean): T[];

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

declare type ErrorAnnotations = {
    tags: Record<string, bigint | boolean | null | number | string | symbol | undefined>;
    extras: Record<string, unknown>;
};

/** @public */
export declare type ErrorResult<E> = {
    readonly ok: false;
    readonly error: E;
};

/** @internal */
export declare function exhaustiveSwitchError(value: never, property?: string): never;

/** @public */
export declare type Expand<T> = T extends infer O ? {
    [K in keyof O]: O[K];
} : never;

/**
 * Helpers for files
 *
 * @public
 */
export declare class FileHelpers {
    /**
     * @param dataURL - The file as a string.
     * @internal
     *
     * from https://stackoverflow.com/a/53817185
     */
    static base64ToFile(dataURL: string): Promise<ArrayBuffer>;
    /**
     * Convert a file to base64.
     *
     * @example
     *
     * ```ts
     * const A = fileToBase64('./test.png')
     * ```
     *
     * @param value - The file as a blob.
     * @public
     */
    static fileToBase64(file: Blob): Promise<string>;
}

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

/** @internal */
export declare function getErrorAnnotations(error: Error): ErrorAnnotations;

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

/**
 * Hash a string using the FNV-1a algorithm.
 *
 * @public
 */
export declare function getHashForObject(obj: any): string;

/**
 * Hash a string using the FNV-1a algorithm.
 *
 * @public
 */
export declare function getHashForString(string: string): string;

/** @internal */
export declare function getOwnProperty<K extends string, V>(obj: Partial<Record<K, V>>, key: K): undefined | V;

/** @internal */
export declare function getOwnProperty(obj: object, key: string): unknown;

/** @internal */
export declare function hasOwnProperty(obj: object, key: string): boolean;

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
export declare function isValidUrl(url: string): boolean;

/** @public */
export declare type JsonArray = JsonValue[];

/** @public */
export declare type JsonObject = {
    [key: string]: JsonValue | undefined;
};

/** @public */
export declare type JsonPrimitive = boolean | null | number | string;

/** @public */
export declare type JsonValue = JsonArray | JsonObject | JsonPrimitive;

/** @internal */
export declare function last<T>(arr: readonly T[]): T | undefined;

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

/** @public */
export declare function lns(str: string): string;

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

/**
 * Helpers for media
 *
 * @public
 */
export declare class MediaHelpers {
    /**
     * Get the size of a video from its source.
     *
     * @param src - The source of the video.
     * @public
     */
    static getVideoSizeFromSrc(src: string): Promise<{
        w: number;
        h: number;
    }>;
    /**
     * Get the size of an image from its source.
     *
     * @param dataURL - The file as a string.
     * @public
     */
    static getImageSizeFromSrc(dataURL: string): Promise<{
        w: number;
        h: number;
    }>;
}

/** @internal */
export declare function minBy<T>(arr: readonly T[], fn: (item: T) => number): T | undefined;

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

/**
 * Does nothing, but it's really really good at it.
 * @internal
 */
export declare function noop(): void;

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

/** @public */
export declare type OkResult<T> = {
    readonly ok: true;
    readonly value: T;
};

/**
 * When a function is wrapped in `omitFromStackTrace`, if it throws an error the stack trace won't
 * include the function itself or any stack frames above it. Useful for assertion-style function
 * where the error will ideally originate from the call-site rather than within the implementation
 * of the assert fn.
 *
 * Only works in platforms that support `Error.captureStackTrace` (ie v8).
 *
 * @internal
 */
export declare function omitFromStackTrace<Args extends Array<unknown>, Return>(fn: (...args: Args) => Return): (...args: Args) => Return;

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

/** @public */
export declare class PngHelpers {
    static isPng(view: DataView, offset: number): boolean;
    static getChunkType(view: DataView, offset: number): string;
    static readChunks(view: DataView, offset?: number): Record<string, {
        dataOffset: number;
        size: number;
        start: number;
    }>;
    static parsePhys(view: DataView, offset: number): {
        ppux: number;
        ppuy: number;
        unit: number;
    };
    static findChunk(view: DataView, type: string): {
        dataOffset: number;
        size: number;
        start: number;
    };
    static setPhysChunk(view: DataView, dpr?: number, options?: BlobPropertyBag): Blob;
}

/** @internal */
export declare function promiseWithResolve<T>(): Promise<T> & {
    resolve: (value: T) => void;
    reject: (reason?: any) => void;
};

/**
 * Returns a throttled version of the function that will only be called max once per frame.
 * @param fn - the fun to return a throttled version of
 * @returns
 * @internal
 */
export declare function rafThrottle(fn: () => void): () => void;

/** @public */
export declare type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

declare type _Required<T> = {
    [K in keyof T]-?: T[K];
};

/** @internal */
declare type Required_2<T, K extends keyof T> = Expand<Omit<T, K> & _Required<Pick<T, K>>>;
export { Required_2 as Required }

/** @public */
export declare type Result<T, E> = ErrorResult<E> | OkResult<T>;

/** @public */
export declare const Result: {
    ok<T>(value: T): OkResult<T>;
    err<E>(error: E): ErrorResult<E>;
};

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
 * Rotate the contents of an array.
 *
 * @public
 */
export declare function rotateArray<T>(arr: T[], offset: number): T[];

/** @public */
export declare function sortById<T extends {
    id: any;
}>(a: T, b: T): -1 | 1;

/** @public */
declare const structuredClone_2: <T>(i: T) => T;
export { structuredClone_2 as structuredClone }

/**
 * Throttle a function.
 *
 * @example
 *
 * ```ts
 * const A = throttle(myFunction, 1000)
 * ```
 *
 * @public
 * @see source - https://github.com/bameyrick/throttle-typescript
 */
export declare function throttle<T extends (...args: any) => any>(func: T, limit: number): (...args: Parameters<T>) => ReturnType<T>;

/**
 * Calls the function on the next frame.
 * If the same fn is passed again before the next frame, it will still be called only once.
 * @param fn - the fun to call on the next animation frame
 * @returns
 * @internal
 */
export declare function throttledRaf(fn: () => void): void;

export { }
