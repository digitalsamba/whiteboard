import { StateNode, TLEventHandlers } from '@tldraw/editor';
export declare class Idle extends StateNode {
    static id: string;
    onPointerDown: TLEventHandlers['onPointerDown'];
    onEnter: () => void;
    onKeyUp: TLEventHandlers['onKeyUp'];
    onCancel: () => void;
}
//# sourceMappingURL=Idle.d.ts.map