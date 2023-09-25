import { Editor } from '@tldraw/editor';
import React from 'react';
import { TLUiMenuSchema } from './menuHelpers';
import { useActions } from './useActions';
/** @public */
export type TLUiContextTTLUiMenuSchemaContextType = TLUiMenuSchema;
/** @internal */
export declare const TLUiContextMenuSchemaContext: React.Context<TLUiMenuSchema>;
/** @public */
export type TLUiContextMenuSchemaProviderProps = {
    overrides?: (editor: Editor, schema: TLUiContextTTLUiMenuSchemaContextType, helpers: {
        actions: ReturnType<typeof useActions>;
        oneSelected: boolean;
        twoSelected: boolean;
        threeSelected: boolean;
        showAutoSizeToggle: boolean;
        showUngroup: boolean;
        onlyFlippableShapeSelected: boolean;
    }) => TLUiContextTTLUiMenuSchemaContextType;
    children: any;
};
/** @internal */
export declare const TLUiContextMenuSchemaProvider: React.MemoExoticComponent<({ overrides, children, }: TLUiContextMenuSchemaProviderProps) => JSX.Element>;
/** @public */
export declare function useContextMenuSchema(): TLUiMenuSchema;
//# sourceMappingURL=useContextMenuSchema.d.ts.map