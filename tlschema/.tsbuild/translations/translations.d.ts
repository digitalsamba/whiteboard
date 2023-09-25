import { LANGUAGES } from './languages';
/** @public */
export { LANGUAGES };
/** @public */
export type TLLanguage = (typeof LANGUAGES)[number];
/** @public */
export declare function getDefaultTranslationLocale(): TLLanguage['locale'];
/** @internal */
export declare function _getDefaultTranslationLocale(locales: readonly string[]): TLLanguage['locale'];
//# sourceMappingURL=translations.d.ts.map