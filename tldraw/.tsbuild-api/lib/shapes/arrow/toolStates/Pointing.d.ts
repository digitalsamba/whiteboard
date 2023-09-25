import { StateNode, TLArrowShape, TLEventHandlers } from '@tldraw/editor';
export declare class Pointing extends StateNode {
    static id: string;
    shape?: TLArrowShape;
    markId: string;
    onEnter: () => void;
    onExit: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: TLEventHandlers['onInterrupt'];
    cancel(): void;
    createArrowShape(): void;
    updateArrowShapeEndHandle(): void;
    private preciseTimeout;
    private didTimeout;
    private startPreciseTimeout;
    private clearPreciseTimeout;
}
//# sourceMappingURL=Pointing.d.ts.map