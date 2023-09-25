import { Editor, TLLanguage } from '@tldraw/editor';
import React from 'react';
import { TLUiMenuSchema } from './menuHelpers';
import { useActions } from './useActions';
/** @public */
export type TLUiHelpMenuSchemaContextType = TLUiMenuSchema;
/** @internal */
export declare const HelpMenuSchemaContext: React.Context<TLUiMenuSchema>;
/** @public */
export type TLUiHelpMenuSchemaProviderProps = {
    overrides?: (editor: Editor, schema: TLUiHelpMenuSchemaContextType, helpers: {
        actions: ReturnType<typeof useActions>;
        languages: readonly TLLanguage[];
        currentLanguage: string;
        oneSelected: boolean;
        twoSelected: boolean;
        threeSelected: boolean;
    }) => TLUiHelpMenuSchemaContextType;
    children: any;
};
/** @internal */
export declare const HelpMenuSchemaProvider: React.MemoExoticComponent<({ overrides, children, }: TLUiHelpMenuSchemaProviderProps) => JSX.Element>;
/** @public */
export declare function useHelpMenuSchema(): TLUiMenuSchema;
//# sourceMappingURL=useHelpMenuSchema.d.ts.map