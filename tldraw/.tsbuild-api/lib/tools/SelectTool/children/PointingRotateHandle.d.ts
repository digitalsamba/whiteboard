import { StateNode, TLEventHandlers, TLPointerEventInfo } from '@tldraw/editor';
type PointingRotateHandleInfo = Extract<TLPointerEventInfo, {
    target: 'selection';
}> & {
    onInteractionEnd?: string;
};
export declare class PointingRotateHandle extends StateNode {
    static id: string;
    private info;
    private updateCursor;
    onEnter: (info: PointingRotateHandleInfo) => void;
    onExit: () => void;
    onPointerMove: () => void;
    onPointerUp: () => void;
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: () => void;
    private complete;
    private cancel;
}
export {};
//# sourceMappingURL=PointingRotateHandle.d.ts.map