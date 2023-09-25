type BoxWidthHeight = {
    w: number;
    h: number;
};
/**
 * Contains the size within the given box size
 *
 * @param originalSize - The size of the asset
 * @param containBoxSize - The container size
 * @returns Adjusted size
 * @public
 */
export declare function containBoxSize(originalSize: BoxWidthHeight, containBoxSize: BoxWidthHeight): BoxWidthHeight;
/**
 * Get the size of an image from its source.
 *
 * @param dataURLForImage - The image file as a string.
 * @param width - The desired width.
 * @param height - The desired height.
 * @public
 */
export declare function getResizedImageDataUrl(dataURLForImage: string, width: number, height: number): Promise<string>;
/** @public */
export declare const DEFAULT_ACCEPTED_IMG_TYPE: string[];
/** @public */
export declare const DEFAULT_ACCEPTED_VID_TYPE: string[];
/** @public */
export declare function isGifAnimated(file: File): Promise<boolean>;
export {};
//# sourceMappingURL=assets.d.ts.map