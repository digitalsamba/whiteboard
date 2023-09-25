import { Editor } from '@tldraw/editor';
import React from 'react';
import { TLUiMenuSchema } from './menuHelpers';
import { useActions } from './useActions';
/** @public */
export type TLUiActionsMenuSchemaContextType = TLUiMenuSchema;
/** @internal */
export declare const ActionsMenuSchemaContext: React.Context<TLUiMenuSchema>;
/** @public */
export type ActionsMenuSchemaProviderProps = {
    overrides?: (editor: Editor, schema: TLUiActionsMenuSchemaContextType, helpers: {
        actions: ReturnType<typeof useActions>;
        oneSelected: boolean;
        twoSelected: boolean;
        threeSelected: boolean;
    }) => TLUiActionsMenuSchemaContextType;
    children: any;
};
/** @internal */
export declare const ActionsMenuSchemaProvider: React.MemoExoticComponent<({ overrides, children, }: ActionsMenuSchemaProviderProps) => JSX.Element>;
/** @public */
export declare function useActionsMenuSchema(): TLUiMenuSchema;
//# sourceMappingURL=useActionsMenuSchema.d.ts.map