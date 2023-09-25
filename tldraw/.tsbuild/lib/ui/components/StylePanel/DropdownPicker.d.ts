import { SharedStyle, StyleProp } from '@tldraw/editor';
import * as React from 'react';
import { TLUiTranslationKey } from '../../hooks/useTranslation/TLUiTranslationKey';
import { StyleValuesForUi } from './styles';
interface DropdownPickerProps<T extends string> {
    id: string;
    label?: TLUiTranslationKey;
    uiType: string;
    style: StyleProp<T>;
    value: SharedStyle<T>;
    items: StyleValuesForUi<T>;
    onValueChange: (style: StyleProp<T>, value: T, squashing: boolean) => void;
}
export declare const DropdownPicker: React.MemoExoticComponent<(<T extends string>({ id, label, uiType, style, items, value, onValueChange, }: DropdownPickerProps<T>) => JSX.Element)>;
export {};
//# sourceMappingURL=DropdownPicker.d.ts.map