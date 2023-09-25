import { StateNode, TLEventHandlers, TLPointerEventInfo } from '@tldraw/editor';
type TLPointingCropHandleInfo = TLPointerEventInfo & {
    target: 'selection';
} & {
    onInteractionEnd?: string;
};
export declare class PointingCropHandle extends StateNode {
    static id: string;
    private info;
    private updateCursor;
    onEnter: (info: TLPointingCropHandleInfo) => void;
    onExit: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: () => void;
    private cancel;
}
export {};
//# sourceMappingURL=PointingCropHandle.d.ts.map