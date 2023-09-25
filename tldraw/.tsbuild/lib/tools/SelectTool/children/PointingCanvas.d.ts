import { StateNode, TLEventHandlers } from '@tldraw/editor';
export declare class PointingCanvas extends StateNode {
    static id: string;
    onEnter: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: () => void;
    private complete;
}
//# sourceMappingURL=PointingCanvas.d.ts.map