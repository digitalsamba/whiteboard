import { StateNode, TLEventHandlers, TLInterruptEvent, TLLineShape, TLShapeId } from '@tldraw/editor';
export declare class Pointing extends StateNode {
    static id: string;
    shape: TLLineShape;
    markId: string | undefined;
    onEnter: (info: {
        shapeId?: TLShapeId;
    }) => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: TLInterruptEvent;
    complete(): void;
    cancel(): void;
}
//# sourceMappingURL=Pointing.d.ts.map