import { TLUiAssetUrls } from '../../assetUrls';
import { TLUiTranslationKey } from './TLUiTranslationKey';
/** @public */
export type TLUiTranslation = {
    readonly locale: string;
    readonly label: string;
    readonly messages: Record<TLUiTranslationKey, string>;
};
/** @internal */
export declare function fetchTranslation(locale: TLUiTranslation['locale'], assetUrls: TLUiAssetUrls): Promise<TLUiTranslation>;
//# sourceMappingURL=translations.d.ts.map