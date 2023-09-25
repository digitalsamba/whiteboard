import { Editor } from '@tldraw/editor';
import * as React from 'react';
import { TLUiIconType } from '../icon-types';
import { TLUiEventSource } from './useEventsProvider';
import { TLUiTranslationKey } from './useTranslation/TLUiTranslationKey';
/** @public */
export interface TLUiActionItem {
    icon?: TLUiIconType;
    id: string;
    kbd?: string;
    title?: string;
    label?: TLUiTranslationKey;
    menuLabel?: TLUiTranslationKey;
    shortcutsLabel?: TLUiTranslationKey;
    contextMenuLabel?: TLUiTranslationKey;
    readonlyOk: boolean;
    checkbox?: boolean;
    onSelect: (source: TLUiEventSource) => Promise<void> | void;
}
/** @public */
export type TLUiActionsContextType = Record<string, TLUiActionItem>;
/** @internal */
export declare const ActionsContext: React.Context<TLUiActionsContextType>;
/** @public */
export type ActionsProviderProps = {
    overrides?: (editor: Editor, actions: TLUiActionsContextType, helpers: undefined) => TLUiActionsContextType;
    children: any;
};
/** @internal */
export declare function ActionsProvider({ overrides, children }: ActionsProviderProps): JSX.Element;
/** @public */
export declare function useActions(): TLUiActionsContextType;
//# sourceMappingURL=useActions.d.ts.map