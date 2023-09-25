import { Box2d, StateNode, TLEventHandlers, TLPointerEventInfo } from '@tldraw/editor';
export declare class ZoomBrushing extends StateNode {
    static id: string;
    info: TLPointerEventInfo & {
        onInteractionEnd?: string | undefined;
    };
    zoomBrush: Box2d;
    onEnter: (info: TLPointerEventInfo & {
        onInteractionEnd: string;
    }) => void;
    onExit: () => void;
    onPointerMove: () => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    private update;
    private cancel;
    private complete;
}
//# sourceMappingURL=ZoomBrushing.d.ts.map