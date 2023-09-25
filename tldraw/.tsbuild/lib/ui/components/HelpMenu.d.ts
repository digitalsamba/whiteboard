import * as React from 'react';
import { TLUiTranslationKey } from '../hooks/useTranslation/TLUiTranslationKey';
import { TLUiIconType } from '../icon-types';
interface HelpMenuLink {
    label: TLUiTranslationKey;
    icon: TLUiIconType;
    url: string;
}
/** @internal */
export interface HelpMenuProps {
    links?: HelpMenuLink[];
}
/** @internal */
export declare const HelpMenu: React.NamedExoticComponent<object>;
export {};
//# sourceMappingURL=HelpMenu.d.ts.map