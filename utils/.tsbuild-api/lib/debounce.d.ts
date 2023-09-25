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
//# sourceMappingURL=debounce.d.ts.map