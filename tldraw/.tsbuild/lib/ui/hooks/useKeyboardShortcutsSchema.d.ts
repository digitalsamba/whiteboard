import { Editor } from '@tldraw/editor';
import React from 'react';
import { TLUiMenuSchema } from './menuHelpers';
import { TLUiActionsContextType } from './useActions';
import { TLUiToolsContextType } from './useTools';
/** @public */
export type TLUiKeyboardShortcutsSchemaContextType = TLUiMenuSchema;
/** @internal */
export declare const KeyboardShortcutsSchemaContext: React.Context<TLUiMenuSchema>;
/** @public */
export type TLUiKeyboardShortcutsSchemaProviderProps = {
    overrides?: (editor: Editor, schema: TLUiKeyboardShortcutsSchemaContextType, more: {
        tools: TLUiToolsContextType;
        actions: TLUiActionsContextType;
    }) => TLUiKeyboardShortcutsSchemaContextType;
    children: any;
};
/** @internal */
export declare const KeyboardShortcutsSchemaProvider: React.MemoExoticComponent<({ overrides, children, }: TLUiKeyboardShortcutsSchemaProviderProps) => JSX.Element>;
/** @public */
export declare function useKeyboardShortcutsSchema(): TLUiKeyboardShortcutsSchemaContextType;
//# sourceMappingURL=useKeyboardShortcutsSchema.d.ts.map