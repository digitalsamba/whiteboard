import { StateNode, TLEventHandlers, TLInterruptEvent, TLNoteShape, TLPointerEventInfo } from '@tldraw/editor';
export declare class Pointing extends StateNode {
    static id: string;
    dragged: boolean;
    info: TLPointerEventInfo;
    wasFocusedOnEnter: boolean;
    markId: string;
    shape: TLNoteShape;
    onEnter: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onInterrupt: TLInterruptEvent;
    onComplete: TLEventHandlers['onComplete'];
    onCancel: TLEventHandlers['onCancel'];
    private complete;
    private cancel;
    private createShape;
}
//# sourceMappingURL=Pointing.d.ts.map