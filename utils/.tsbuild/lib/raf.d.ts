/**
 * Returns a throttled version of the function that will only be called max once per frame.
 * @param fn - the fun to return a throttled version of
 * @returns
 * @internal
 */
export declare function rafThrottle(fn: () => void): () => void;
/**
 * Calls the function on the next frame.
 * If the same fn is passed again before the next frame, it will still be called only once.
 * @param fn - the fun to call on the next animation frame
 * @returns
 * @internal
 */
export declare function throttledRaf(fn: () => void): void;
//# sourceMappingURL=raf.d.ts.map