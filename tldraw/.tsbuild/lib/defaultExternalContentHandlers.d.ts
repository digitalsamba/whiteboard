import { Editor, TLAsset, VecLike } from '@tldraw/editor';
/** @public */
export type TLExternalContentProps = {
    maxImageDimension: number;
    maxAssetSize: number;
    acceptedImageMimeTypes: string[];
    acceptedVideoMimeTypes: string[];
};
export declare function registerDefaultExternalContentHandlers(editor: Editor, { maxImageDimension, maxAssetSize, acceptedImageMimeTypes, acceptedVideoMimeTypes, }: TLExternalContentProps): void;
export declare function createShapesForAssets(editor: Editor, assets: TLAsset[], position: VecLike): Promise<void>;
//# sourceMappingURL=defaultExternalContentHandlers.d.ts.map