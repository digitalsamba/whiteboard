/// <reference types="react" />
import { Editor } from '@tldraw/editor';
/** @public */
export interface TLUiToast {
    id: string;
    icon?: string;
    title?: string;
    description?: string;
    actions?: TLUiToastAction[];
    keepOpen?: boolean;
    closeLabel?: string;
}
/** @public */
export interface TLUiToastAction {
    type: 'primary' | 'secondary' | 'warn';
    label: string;
    onClick: () => void;
}
/** @public */
export type TLUiToastsContextType = {
    addToast: (toast: Omit<TLUiToast, 'id'> & {
        id?: string;
    }) => string;
    removeToast: (id: TLUiToast['id']) => string;
    clearToasts: () => void;
    toasts: TLUiToast[];
};
/** @internal */
export declare const ToastsContext: import("react").Context<TLUiToastsContextType>;
/** @internal */
export type ToastsProviderProps = {
    overrides?: (editor: Editor) => TLUiToastsContextType;
    children: any;
};
/** @internal */
export declare function ToastsProvider({ children }: ToastsProviderProps): JSX.Element;
/** @public */
export declare function useToasts(): TLUiToastsContextType;
//# sourceMappingURL=useToastsProvider.d.ts.map