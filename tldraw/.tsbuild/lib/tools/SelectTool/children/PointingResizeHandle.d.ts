import { StateNode, TLCursorType, TLEventHandlers, TLPointerEventInfo, TLSelectionHandle } from '@tldraw/editor';
export declare const CursorTypeMap: Record<TLSelectionHandle, TLCursorType>;
type PointingResizeHandleInfo = Extract<TLPointerEventInfo, {
    target: 'selection';
}> & {
    onInteractionEnd?: string;
};
export declare class PointingResizeHandle extends StateNode {
    static id: string;
    private info;
    private updateCursor;
    onEnter: (info: PointingResizeHandleInfo) => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: () => void;
    private complete;
    private cancel;
}
export {};
//# sourceMappingURL=PointingResizeHandle.d.ts.map