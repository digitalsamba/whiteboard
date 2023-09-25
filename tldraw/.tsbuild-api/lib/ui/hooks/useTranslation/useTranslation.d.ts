import * as React from 'react';
import { TLUiTranslationKey } from './TLUiTranslationKey';
import { TLUiTranslation } from './translations';
/** @public */
export interface TLUiTranslationProviderProps {
    children: any;
    /**
     * (optional) A collection of overrides different locales.
     *
     * @example
     *
     * ```ts
     * <TranslationProvider overrides={{ en: { 'style-panel.styles': 'Properties' } }} />
     * ```
     */
    overrides?: Record<string, Record<string, string>>;
}
/** @public */
export type TLUiTranslationContextType = TLUiTranslation;
/**
 * Provides a translation context to the editor.
 *
 * @internal
 */
export declare const TranslationProvider: React.MemoExoticComponent<({ overrides, children, }: TLUiTranslationProviderProps) => JSX.Element>;
/**
 * Returns a function to translate a translation key into a string based on the current translation.
 *
 * @example
 *
 * ```ts
 * const msg = useTranslation()
 * const label = msg('style-panel.styles')
 * ```
 *
 * @public
 */
export declare function useTranslation(): (id: TLUiTranslationKey) => string;
//# sourceMappingURL=useTranslation.d.ts.map