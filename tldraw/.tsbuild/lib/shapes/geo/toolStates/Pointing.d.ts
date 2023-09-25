import { StateNode, TLEventHandlers } from '@tldraw/editor';
export declare class Pointing extends StateNode {
    static id: string;
    markId: string;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onPointerMove: TLEventHandlers['onPointerMove'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: TLEventHandlers['onInterrupt'];
    private complete;
    private cancel;
}
//# sourceMappingURL=Pointing.d.ts.map