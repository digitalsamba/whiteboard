import { StateNode, TLEventHandlers } from '@tldraw/editor';
export declare class EditingShape extends StateNode {
    static id: string;
    onEnter: () => void;
    onExit: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerDown: TLEventHandlers['onPointerDown'];
    onComplete: TLEventHandlers['onComplete'];
    onCancel: TLEventHandlers['onCancel'];
}
//# sourceMappingURL=EditingShape.d.ts.map