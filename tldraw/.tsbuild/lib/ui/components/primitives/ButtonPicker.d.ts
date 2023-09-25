/// <reference types="react" />
import { SharedStyle, StyleProp } from '@tldraw/editor';
import { StyleValuesForUi } from '../StylePanel/styles';
/** @internal */
export interface ButtonPickerProps<T extends string> {
    title: string;
    uiType: string;
    style: StyleProp<T>;
    value: SharedStyle<T>;
    items: StyleValuesForUi<T>;
    columns?: 2 | 3 | 4;
    onValueChange: (style: StyleProp<T>, value: T, squashing: boolean) => void;
}
declare function _ButtonPicker<T extends string>(props: ButtonPickerProps<T>): JSX.Element;
/** @internal */
export declare const ButtonPicker: typeof _ButtonPicker;
export {};
//# sourceMappingURL=ButtonPicker.d.ts.map