import { RecursivePartial } from '@tldraw/editor';
/** @public */
export type TLEditorAssetUrls = {
    fonts: {
        monospace: string;
        serif: string;
        sansSerif: string;
        draw: string;
    };
};
/** @public */
export declare let defaultEditorAssetUrls: TLEditorAssetUrls;
/** @public */
export declare function setDefaultEditorAssetUrls(assetUrls: TLEditorAssetUrls): void;
/** @internal */
export declare function useDefaultEditorAssetsWithOverrides(overrides?: RecursivePartial<TLEditorAssetUrls>): TLEditorAssetUrls;
//# sourceMappingURL=assetUrls.d.ts.map