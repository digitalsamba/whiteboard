import { SharedStyle, StyleProp } from '@tldraw/editor';
import * as React from 'react';
import { TLUiTranslationKey } from '../../hooks/useTranslation/TLUiTranslationKey';
import { StyleValuesForUi } from './styles';
interface DoubleDropdownPickerProps<T extends string> {
    uiTypeA: string;
    uiTypeB: string;
    label: TLUiTranslationKey;
    labelA: TLUiTranslationKey;
    labelB: TLUiTranslationKey;
    itemsA: StyleValuesForUi<T>;
    itemsB: StyleValuesForUi<T>;
    styleA: StyleProp<T>;
    styleB: StyleProp<T>;
    valueA: SharedStyle<T>;
    valueB: SharedStyle<T>;
    onValueChange: (style: StyleProp<T>, value: T, squashing: boolean) => void;
}
export declare const DoubleDropdownPicker: React.MemoExoticComponent<(<T extends string>({ label, uiTypeA, uiTypeB, labelA, labelB, itemsA, itemsB, styleA, styleB, valueA, valueB, onValueChange, }: DoubleDropdownPickerProps<T>) => JSX.Element | null)>;
export {};
//# sourceMappingURL=DoubleDropdownPicker.d.ts.map