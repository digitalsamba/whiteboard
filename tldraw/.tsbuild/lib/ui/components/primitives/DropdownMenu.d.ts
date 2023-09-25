/// <reference types="react" />
import { TLUiTranslationKey } from '../../hooks/useTranslation/TLUiTranslationKey';
import { TLUiButtonProps } from './Button';
/** @public */
export declare function Root({ id, children, modal, }: {
    id: string;
    children: any;
    modal?: boolean;
}): JSX.Element;
/** @public */
export declare function Trigger({ children, 'data-testid': testId, }: {
    children: any;
    'data-testid'?: string;
}): JSX.Element;
/** @public */
export declare function Content({ side, align, sideOffset, alignOffset, children, }: {
    children: any;
    alignOffset?: number;
    sideOffset?: number;
    align?: 'start' | 'center' | 'end';
    side?: 'bottom' | 'top' | 'right' | 'left';
}): JSX.Element;
/** @public */
export declare function Sub({ id, children }: {
    id: string;
    children: any;
}): JSX.Element;
/** @public */
export declare function SubTrigger({ label, 'data-testid': testId, 'data-direction': dataDirection, }: {
    label: TLUiTranslationKey;
    'data-testid'?: string;
    'data-direction'?: 'left' | 'right';
}): JSX.Element;
/** @public */
export declare function SubContent({ alignOffset, sideOffset, children, }: {
    alignOffset?: number;
    sideOffset?: number;
    children: any;
}): JSX.Element;
/** @public */
export declare function Group({ children, size, }: {
    children: any;
    size?: 'tiny' | 'small' | 'medium' | 'wide';
}): JSX.Element;
/** @public */
export declare function Indicator(): JSX.Element;
/** @public */
export interface DropdownMenuItemProps extends TLUiButtonProps {
    noClose?: boolean;
}
/** @public */
export declare function Item({ noClose, ...props }: DropdownMenuItemProps): JSX.Element;
/** @public */
export interface DropdownMenuCheckboxItemProps {
    checked?: boolean;
    onSelect?: (e: Event) => void;
    disabled?: boolean;
    title: string;
    children: any;
}
/** @public */
export declare function CheckboxItem({ children, onSelect, ...rest }: DropdownMenuCheckboxItemProps): JSX.Element;
/** @public */
export declare function RadioItem({ children, onSelect, ...rest }: DropdownMenuCheckboxItemProps): JSX.Element;
//# sourceMappingURL=DropdownMenu.d.ts.map