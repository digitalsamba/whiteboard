/// <reference types="react" />
import { Editor } from '@tldraw/editor';
/** @public */
export interface TLUiDialogProps {
    onClose: () => void;
}
/** @public */
export interface TLUiDialog {
    id: string;
    onClose?: () => void;
    component: (props: TLUiDialogProps) => any;
}
/** @public */
export type TLUiDialogsContextType = {
    addDialog: (dialog: Omit<TLUiDialog, 'id'> & {
        id?: string;
    }) => string;
    removeDialog: (id: string) => string;
    updateDialog: (id: string, newDialogData: Partial<TLUiDialog>) => string;
    clearDialogs: () => void;
    dialogs: TLUiDialog[];
};
/** @internal */
export declare const DialogsContext: import("react").Context<TLUiDialogsContextType>;
/** @internal */
export type DialogsProviderProps = {
    overrides?: (editor: Editor) => TLUiDialogsContextType;
    children: any;
};
/** @internal */
export declare function DialogsProvider({ children }: DialogsProviderProps): JSX.Element;
/** @public */
export declare function useDialogs(): TLUiDialogsContextType;
//# sourceMappingURL=useDialogsProvider.d.ts.map