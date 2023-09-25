import { TLEditorAssetUrls } from './assetUrls';
export type TLTypeFace = {
    url: string;
    display?: any;
    featureSettings?: string;
    stretch?: string;
    style?: string;
    unicodeRange?: string;
    variant?: string;
    weight?: string;
};
export type TLTypeFaces = {
    draw: TLTypeFace;
    monospace: TLTypeFace;
    serif: TLTypeFace;
    sansSerif: TLTypeFace;
};
export declare function usePreloadAssets(assetUrls: TLEditorAssetUrls): {
    error: boolean;
    done: boolean;
};
//# sourceMappingURL=usePreloadAssets.d.ts.map