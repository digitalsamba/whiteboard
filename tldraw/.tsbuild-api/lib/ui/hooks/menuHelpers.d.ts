import { TLUiActionItem } from './useActions';
import { TLUiToolItem } from './useTools';
import { TLUiTranslationKey } from './useTranslation/TLUiTranslationKey';
/** @public */
export type TLUiMenuChild = TLUiCustomMenuItem | TLUiMenuGroup | TLUiMenuItem | TLUiSubMenu;
/** @public */
export type TLUiCustomMenuItem = {
    id: string;
    type: 'custom';
    disabled: boolean;
    readonlyOk: boolean;
};
/** @public */
export type TLUiMenuItem = {
    id: string;
    type: 'item';
    readonlyOk: boolean;
    actionItem: TLUiActionItem;
    disabled: boolean;
    checked: boolean;
};
/** @public */
export type TLUiMenuGroup = {
    id: string;
    type: 'group';
    checkbox: boolean;
    disabled: boolean;
    readonlyOk: boolean;
    children: TLUiMenuChild[];
};
/** @public */
export type TLUiSubMenu = {
    id: string;
    type: 'submenu';
    label: TLUiTranslationKey;
    disabled: boolean;
    readonlyOk: boolean;
    children: TLUiMenuChild[];
};
/** @public */
export type TLUiMenuSchema = (TLUiCustomMenuItem | TLUiMenuGroup | TLUiMenuItem)[];
/** @public */
export declare function compactMenuItems<T>(arr: T[]): Exclude<T, false | null | undefined>[];
/** @public */
export declare function menuGroup(id: string, ...children: (false | null | TLUiMenuChild)[]): null | TLUiMenuGroup;
/** @public */
export declare function menuSubmenu(id: string, label: TLUiTranslationKey, ...children: (false | null | TLUiMenuChild)[]): null | TLUiSubMenu;
/** @public */
export declare function menuCustom(id: string, opts?: Partial<{
    readonlyOk: boolean;
    disabled: boolean;
}>): {
    id: string;
    type: "custom";
    disabled: boolean;
    readonlyOk: boolean;
};
/** @public */
export declare function menuItem(actionItem: TLUiActionItem | TLUiToolItem, opts?: Partial<{
    checked: boolean;
    disabled: boolean;
}>): TLUiMenuItem;
/** @internal */
export declare const useThreeStackableItems: () => boolean;
/** @internal */
export declare const useAllowGroup: () => boolean;
/** @internal */
export declare const useAllowUngroup: () => boolean;
/** @public */
export declare function findMenuItem(menu: TLUiMenuSchema, path: string[]): TLUiMenuChild;
export declare const showMenuPaste: boolean;
//# sourceMappingURL=menuHelpers.d.ts.map