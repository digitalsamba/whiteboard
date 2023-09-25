/// <reference types="react" />
import { TLBaseShape } from '@tldraw/editor';
import { TLUiDialogProps } from '../hooks/useDialogsProvider';
type ShapeWithUrl = TLBaseShape<string, {
    url: string;
}>;
export declare const EditLinkDialog: import("react").MemoExoticComponent<({ onClose }: TLUiDialogProps) => JSX.Element | null>;
export declare const EditLinkDialogInner: import("react").MemoExoticComponent<({ onClose, selectedShape, }: TLUiDialogProps & {
    selectedShape: ShapeWithUrl;
}) => JSX.Element | null>;
export {};
//# sourceMappingURL=EditLinkDialog.d.ts.map