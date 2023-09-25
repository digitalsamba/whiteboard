import { Editor } from '@tldraw/editor';
import * as React from 'react';
import { TLUiIconType } from '../icon-types';
import { TLUiEventSource } from './useEventsProvider';
import { TLUiTranslationKey } from './useTranslation/TLUiTranslationKey';
/** @public */
export interface TLUiToolItem {
    id: string;
    label: TLUiTranslationKey;
    shortcutsLabel?: TLUiTranslationKey;
    icon: TLUiIconType;
    onSelect: (source: TLUiEventSource) => void;
    kbd?: string;
    readonlyOk: boolean;
    meta?: {
        [key: string]: any;
    };
}
/** @public */
export type TLUiToolsContextType = Record<string, TLUiToolItem>;
/** @internal */
export declare const ToolsContext: React.Context<TLUiToolsContextType>;
/** @public */
export type TLUiToolsProviderProps = {
    overrides?: (editor: Editor, tools: TLUiToolsContextType, helpers: {
        insertMedia: () => void;
    }) => TLUiToolsContextType;
    children: any;
};
/** @internal */
export declare function ToolsProvider({ overrides, children }: TLUiToolsProviderProps): JSX.Element;
/** @public */
export declare function useTools(): TLUiToolsContextType;
//# sourceMappingURL=useTools.d.ts.map