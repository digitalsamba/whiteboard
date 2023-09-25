import * as React from 'react';
/** @public */
export type TLUiEventSource = 'actions-menu' | 'context-menu' | 'debug-panel' | 'dialog' | 'export-menu' | 'help-menu' | 'helper-buttons' | 'kbd' | 'menu' | 'navigation-zone' | 'page-menu' | 'people-menu' | 'quick-actions' | 'share-menu' | 'toolbar' | 'unknown' | 'zoom-menu';
/** @public */
export interface TLUiEventMap {
    undo: null;
    redo: null;
    'group-shapes': null;
    'ungroup-shapes': null;
    'convert-to-embed': null;
    'convert-to-bookmark': null;
    'open-embed-link': null;
    'toggle-auto-size': null;
    'copy-as': {
        format: 'json' | 'png' | 'svg';
    };
    'export-as': {
        format: 'json' | 'png' | 'svg';
    };
    'edit-link': null;
    'insert-embed': null;
    'insert-media': null;
    'align-shapes': {
        operation: 'bottom' | 'center-horizontal' | 'center-vertical' | 'left' | 'right' | 'top';
    };
    'duplicate-shapes': null;
    'pack-shapes': null;
    'stack-shapes': {
        operation: 'horizontal' | 'vertical';
    };
    'flip-shapes': {
        operation: 'horizontal' | 'vertical';
    };
    'distribute-shapes': {
        operation: 'horizontal' | 'vertical';
    };
    'stretch-shapes': {
        operation: 'horizontal' | 'vertical';
    };
    'reorder-shapes': {
        operation: 'backward' | 'forward' | 'toBack' | 'toFront';
    };
    'delete-shapes': null;
    'select-all-shapes': null;
    'select-none-shapes': null;
    'rotate-ccw': null;
    'rotate-cw': null;
    'zoom-in': null;
    'zoom-out': null;
    'zoom-to-fit': null;
    'zoom-to-selection': null;
    'reset-zoom': null;
    'zoom-into-view': null;
    'zoom-to-content': null;
    'open-menu': {
        id: string;
    };
    'close-menu': {
        id: string;
    };
    'create-new-project': null;
    'save-project-to-file': null;
    'open-file': null;
    'select-tool': {
        id: string;
    };
    print: null;
    copy: null;
    paste: null;
    cut: null;
    'toggle-transparent': null;
    'toggle-snap-mode': null;
    'toggle-tool-lock': null;
    'toggle-grid-mode': null;
    'toggle-dark-mode': null;
    'toggle-focus-mode': null;
    'toggle-debug-mode': null;
    'toggle-lock': null;
    'toggle-reduce-motion': null;
    'exit-pen-mode': null;
    'stop-following': null;
    'open-cursor-chat': null;
    'zoom-tool': null;
    'unlock-all': null;
}
type Join<T, K> = K extends null ? {
    [R in keyof T]: T[R];
} : {
    [R in keyof T]: T[R];
} & {
    [R in keyof K]: K[R];
};
/** @public */
export type TLUiEventHandler<T extends keyof TLUiEventMap = keyof TLUiEventMap> = (name: T, data: Join<{
    source: TLUiEventSource;
}, TLUiEventMap[T]>) => void;
/** @public */
export type TLUiEventContextType = TLUiEventHandler<keyof TLUiEventMap>;
/** @internal */
export declare const EventsContext: React.Context<TLUiEventContextType>;
/** @public */
export type EventsProviderProps = {
    onEvent?: TLUiEventHandler;
    children: any;
};
/** @public */
export declare function UiEventsProvider({ onEvent, children }: EventsProviderProps): JSX.Element;
/** @public */
export declare function useUiEvents(): TLUiEventContextType;
export {};
//# sourceMappingURL=useEventsProvider.d.ts.map