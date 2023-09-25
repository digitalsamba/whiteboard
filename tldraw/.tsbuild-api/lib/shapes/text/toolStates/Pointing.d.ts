import { StateNode, TLEventHandlers, TLTextShape } from '@tldraw/editor';
export declare class Pointing extends StateNode {
    static id: string;
    shape?: TLTextShape;
    markId: string;
    onExit: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: () => void;
    onComplete: () => void;
    onCancel: () => void;
    onInterrupt: () => void;
    private complete;
    private cancel;
}
//# sourceMappingURL=Pointing.d.ts.map