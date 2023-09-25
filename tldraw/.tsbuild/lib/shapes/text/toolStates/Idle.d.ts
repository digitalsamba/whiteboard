import { StateNode, TLEventHandlers } from '@tldraw/editor';
export declare class Idle extends StateNode {
    static id: string;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerDown: TLEventHandlers['onPointerDown'];
    onEnter: () => void;
    onKeyDown: TLEventHandlers['onKeyDown'];
    onCancel: () => void;
}
//# sourceMappingURL=Idle.d.ts.map