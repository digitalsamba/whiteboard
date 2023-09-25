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
//# sourceMappingURL=png.d.ts.map