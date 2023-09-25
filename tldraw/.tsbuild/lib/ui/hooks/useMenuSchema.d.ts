import { Editor } from '@tldraw/editor';
import React from 'react';
import { TLUiMenuSchema } from './menuHelpers';
import { useActions } from './useActions';
/** @public */
export type TLUiMenuSchemaContextType = TLUiMenuSchema;
/** @internal */
export declare const TLUiMenuSchemaContext: React.Context<TLUiMenuSchema>;
/** @public */
export type TLUiMenuSchemaProviderProps = {
    overrides?: (editor: Editor, schema: TLUiMenuSchemaContextType, helpers: {
        actions: ReturnType<typeof useActions>;
        noneSelected: boolean;
        oneSelected: boolean;
        twoSelected: boolean;
        threeSelected: boolean;
    }) => TLUiMenuSchemaContextType;
    children: any;
};
/** @internal */
export declare function TLUiMenuSchemaProvider({ overrides, children }: TLUiMenuSchemaProviderProps): JSX.Element;
/** @public */
export declare function useMenuSchema(): TLUiMenuSchema;
//# sourceMappingURL=useMenuSchema.d.ts.map