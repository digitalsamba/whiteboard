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
 * Does nothing, but it's really really good at it.
 * @internal
 */
export declare function noop(): void;
//# sourceMappingURL=function.d.ts.map