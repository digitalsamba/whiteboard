import { StateNode, TLEventHandlers } from '@tldraw/editor';
export declare class Dragging extends StateNode {
    static id: string;
    onEnter: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: () => void;
    private update;
    private complete;
}
//# sourceMappingURL=Dragging.d.ts.map