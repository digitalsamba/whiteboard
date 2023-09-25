/** @public */
export type OkResult<T> = {
    readonly ok: true;
    readonly value: T;
};
/** @public */
export type ErrorResult<E> = {
    readonly ok: false;
    readonly error: E;
};
/** @public */
export type Result<T, E> = ErrorResult<E> | OkResult<T>;
/** @public */
export declare const Result: {
    ok<T>(value: T): OkResult<T>;
    err<E>(error: E): ErrorResult<E>;
};
/** @internal */
export declare function exhaustiveSwitchError(value: never, property?: string): never;
/** @internal */
export declare const assert: (value: unknown, message?: string) => asserts value;
/** @internal */
export declare const assertExists: <T>(value: T, message?: string | undefined) => NonNullable<T>;
/** @internal */
export declare function promiseWithResolve<T>(): Promise<T> & {
    resolve: (value: T) => void;
    reject: (reason?: any) => void;
};
//# sourceMappingURL=control.d.ts.map