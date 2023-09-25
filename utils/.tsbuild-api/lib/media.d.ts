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
//# sourceMappingURL=media.d.ts.map