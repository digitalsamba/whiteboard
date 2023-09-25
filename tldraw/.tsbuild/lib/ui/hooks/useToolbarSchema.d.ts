import { Editor } from '@tldraw/editor';
import React from 'react';
import { TLUiToolItem, TLUiToolsContextType } from './useTools';
/** @public */
export type TLUiToolbarItem = {
    id: string;
    type: 'item';
    readonlyOk: boolean;
    toolItem: TLUiToolItem;
};
/** @public */
export declare function toolbarItem(toolItem: TLUiToolItem): TLUiToolbarItem;
/** @public */
export type TLUiToolbarSchemaContextType = TLUiToolbarItem[];
/** @internal */
export declare const ToolbarSchemaContext: React.Context<TLUiToolbarSchemaContextType>;
/** @public */
export type TLUiToolbarSchemaProviderProps = {
    overrides?: (editor: Editor, schema: TLUiToolbarSchemaContextType, more: {
        tools: TLUiToolsContextType;
    }) => TLUiToolbarSchemaContextType;
    children: any;
};
/** @internal */
export declare function ToolbarSchemaProvider({ overrides, children }: TLUiToolbarSchemaProviderProps): JSX.Element;
/** @public */
export declare function useToolbarSchema(): TLUiToolbarSchemaContextType;
//# sourceMappingURL=useToolbarSchema.d.ts.map