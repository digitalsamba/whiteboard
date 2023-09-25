import { StateNode, TLEventHandlers } from '@tldraw/editor';
export declare class Pointing extends StateNode {
    static id: string;
    onEnter: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: TLEventHandlers['onInterrupt'];
    private complete;
}
//# sourceMappingURL=Pointing.d.ts.map