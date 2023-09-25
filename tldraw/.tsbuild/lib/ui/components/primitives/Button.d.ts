import * as React from 'react';
import { TLUiTranslationKey } from '../../hooks/useTranslation/TLUiTranslationKey';
import { TLUiIconType } from '../../icon-types';
/** @public */
export interface TLUiButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    disabled?: boolean;
    label?: TLUiTranslationKey;
    icon?: TLUiIconType;
    spinner?: boolean;
    iconLeft?: TLUiIconType;
    smallIcon?: boolean;
    kbd?: string;
    isChecked?: boolean;
    invertIcon?: boolean;
    type?: 'primary' | 'danger' | 'normal';
}
/** @public */
export declare const Button: React.ForwardRefExoticComponent<TLUiButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Button.d.ts.map