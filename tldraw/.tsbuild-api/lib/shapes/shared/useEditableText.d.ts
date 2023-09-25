import { TLShape } from '@tldraw/editor';
import React from 'react';
export declare function useEditableText<T extends Extract<TLShape, {
    props: {
        text: string;
    };
}>>(id: T['id'], type: T['type'], text: string): {
    rInput: React.RefObject<HTMLTextAreaElement>;
    isEditing: boolean;
    isEditingSameShapeType: boolean | undefined;
    handleFocus: () => void;
    handleBlur: () => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleInputPointerDown: (e: React.PointerEvent) => void;
    handleDoubleClick: (e: any) => any;
    isEmpty: boolean;
};
//# sourceMappingURL=useEditableText.d.ts.map