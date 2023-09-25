import { StateNode, TLEventHandlers } from '@tldraw/editor';
export declare class Idle extends StateNode {
    static id: string;
    onEnter: () => void;
    onPointerDown: TLEventHandlers['onPointerDown'];
    onCancel: () => void;
}
//# sourceMappingURL=Idle.d.ts.map