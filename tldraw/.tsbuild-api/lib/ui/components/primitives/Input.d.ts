import * as React from 'react';
import { TLUiTranslationKey } from '../../hooks/useTranslation/TLUiTranslationKey';
import { TLUiIconType } from '../../icon-types';
/** @public */
export interface TLUiInputProps {
    disabled?: boolean;
    label?: TLUiTranslationKey;
    icon?: TLUiIconType;
    iconLeft?: TLUiIconType;
    autofocus?: boolean;
    autoselect?: boolean;
    children?: any;
    defaultValue?: string;
    placeholder?: string;
    onComplete?: (value: string) => void;
    onValueChange?: (value: string) => void;
    onCancel?: (value: string) => void;
    onBlur?: (value: string) => void;
    className?: string;
    /**
     * Usually on iOS when you focus an input, the browser will adjust the viewport to bring the input
     * into view. Sometimes this doesn't work properly though - for example, if the input is newly
     * created, iOS seems to have a hard time adjusting the viewport for it. This prop allows you to
     * opt-in to some extra code to manually bring the input into view when the visual viewport of the
     * browser changes, but we don't want to use it everywhere because generally the native behavior
     * looks nicer in scenarios where it's sufficient.
     */
    shouldManuallyMaintainScrollPositionWhenFocused?: boolean;
    value?: string;
}
/** @public */
export declare const Input: React.ForwardRefExoticComponent<TLUiInputProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Input.d.ts.map