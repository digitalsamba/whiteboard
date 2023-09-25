type ErrorAnnotations = {
    tags: Record<string, number | string | boolean | bigint | symbol | null | undefined>;
    extras: Record<string, unknown>;
};
/**
 * Annotate an error with tags and additional data. Annotations won't overwrite existing ones.
 * Retrieve them with `getErrorAnnotations`.
 *
 * @internal
 */
export declare function annotateError(error: unknown, annotations: Partial<ErrorAnnotations>): void;
/** @internal */
export declare function getErrorAnnotations(error: Error): ErrorAnnotations;
export {};
//# sourceMappingURL=error.d.ts.map