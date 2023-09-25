import { EMBED_DEFINITIONS, LANGUAGES, RecursivePartial } from '@tldraw/editor';
import { TLEditorAssetUrls } from '../utils/assetUrls';
import { TLUiIconType } from './icon-types';
export type TLUiAssetUrls = TLEditorAssetUrls & {
    icons: Record<TLUiIconType, string>;
    translations: Record<(typeof LANGUAGES)[number]['locale'], string>;
    embedIcons: Record<(typeof EMBED_DEFINITIONS)[number]['type'], string>;
};
export declare let defaultUiAssetUrls: TLUiAssetUrls;
/** @internal */
export declare function setDefaultUiAssetUrls(urls: TLUiAssetUrls): void;
/** @internal */
export declare function useDefaultUiAssetUrlsWithOverrides(overrides?: RecursivePartial<TLUiAssetUrls>): TLUiAssetUrls;
//# sourceMappingURL=assetUrls.d.ts.map