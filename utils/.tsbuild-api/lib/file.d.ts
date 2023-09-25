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
//# sourceMappingURL=file.d.ts.map