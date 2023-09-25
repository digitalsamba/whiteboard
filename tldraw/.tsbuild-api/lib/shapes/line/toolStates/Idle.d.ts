import { StateNode, TLEventHandlers, TLShapeId } from '@tldraw/editor';
export declare class Idle extends StateNode {
    static id: string;
    private shapeId;
    onEnter: (info: {
        shapeId: TLShapeId;
    }) => void;
    onPointerDown: TLEventHandlers['onPointerDown'];
    onCancel: () => void;
}
//# sourceMappingURL=Idle.d.ts.map