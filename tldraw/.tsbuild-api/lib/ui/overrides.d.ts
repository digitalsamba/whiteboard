import { Editor } from '@tldraw/editor';
import { ActionsProviderProps } from './hooks/useActions';
import { ActionsMenuSchemaProviderProps } from './hooks/useActionsMenuSchema';
import { TLUiContextMenuSchemaProviderProps } from './hooks/useContextMenuSchema';
import { TLUiHelpMenuSchemaProviderProps } from './hooks/useHelpMenuSchema';
import { TLUiKeyboardShortcutsSchemaProviderProps } from './hooks/useKeyboardShortcutsSchema';
import { TLUiMenuSchemaProviderProps } from './hooks/useMenuSchema';
import { TLUiToolbarSchemaProviderProps } from './hooks/useToolbarSchema';
import { TLUiToolsProviderProps } from './hooks/useTools';
import { TLUiTranslationProviderProps } from './hooks/useTranslation/useTranslation';
/** @public */
export declare function useDefaultHelpers(): {
    addToast: (toast: Omit<import("./hooks/useToastsProvider").TLUiToast, "id"> & {
        id?: string | undefined;
    }) => string;
    removeToast: (id: string) => string;
    clearToasts: () => void;
    addDialog: (dialog: Omit<import("./hooks/useDialogsProvider").TLUiDialog, "id"> & {
        id?: string | undefined;
    }) => string;
    clearDialogs: () => void;
    removeDialog: (id: string) => string;
    updateDialog: (id: string, newDialogData: Partial<import("./hooks/useDialogsProvider").TLUiDialog>) => string;
    msg: (id: import("../..").TLUiTranslationKey) => string;
    isMobile: boolean;
};
type DefaultHelpers = ReturnType<typeof useDefaultHelpers>;
export type TLUiOverride<Type, Helpers> = (editor: Editor, schema: Type, helpers: Helpers) => Type;
type WithDefaultHelpers<T extends TLUiOverride<any, any>> = T extends TLUiOverride<infer Type, infer Helpers> ? TLUiOverride<Type, Helpers extends undefined ? DefaultHelpers : Helpers & DefaultHelpers> : never;
/** @public */
export interface TLUiOverrides {
    actionsMenu?: WithDefaultHelpers<NonNullable<ActionsMenuSchemaProviderProps['overrides']>>;
    actions?: WithDefaultHelpers<NonNullable<ActionsProviderProps['overrides']>>;
    contextMenu?: WithDefaultHelpers<NonNullable<TLUiContextMenuSchemaProviderProps['overrides']>>;
    helpMenu?: WithDefaultHelpers<NonNullable<TLUiHelpMenuSchemaProviderProps['overrides']>>;
    menu?: WithDefaultHelpers<NonNullable<TLUiMenuSchemaProviderProps['overrides']>>;
    toolbar?: WithDefaultHelpers<NonNullable<TLUiToolbarSchemaProviderProps['overrides']>>;
    keyboardShortcutsMenu?: WithDefaultHelpers<NonNullable<TLUiKeyboardShortcutsSchemaProviderProps['overrides']>>;
    tools?: WithDefaultHelpers<NonNullable<TLUiToolsProviderProps['overrides']>>;
    translations?: TLUiTranslationProviderProps['overrides'];
}
export interface TLUiOverridesWithoutDefaults {
    actionsMenu?: ActionsMenuSchemaProviderProps['overrides'];
    actions?: ActionsProviderProps['overrides'];
    contextMenu?: TLUiContextMenuSchemaProviderProps['overrides'];
    helpMenu?: TLUiHelpMenuSchemaProviderProps['overrides'];
    menu?: TLUiMenuSchemaProviderProps['overrides'];
    toolbar?: TLUiToolbarSchemaProviderProps['overrides'];
    keyboardShortcutsMenu?: TLUiKeyboardShortcutsSchemaProviderProps['overrides'];
    tools?: TLUiToolsProviderProps['overrides'];
    translations?: TLUiTranslationProviderProps['overrides'];
}
export declare function mergeOverrides(overrides: TLUiOverrides[], defaultHelpers: DefaultHelpers): TLUiOverridesWithoutDefaults;
export declare function useMergedTranslationOverrides(overrides?: TLUiOverrides | TLUiOverrides[]): NonNullable<TLUiTranslationProviderProps['overrides']>;
export declare function useMergedOverrides(overrides?: TLUiOverrides | TLUiOverrides[]): TLUiOverridesWithoutDefaults;
export {};
//# sourceMappingURL=overrides.d.ts.map