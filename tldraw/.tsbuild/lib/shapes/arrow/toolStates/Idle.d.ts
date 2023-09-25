import { StateNode, TLEventHandlers } from '@tldraw/editor';
export declare class Idle extends StateNode {
    static id: string;
    onPointerDown: TLEventHandlers['onPointerDown'];
    onEnter: () => void;
    onCancel: () => void;
    onKeyUp: TLEventHandlers['onKeyUp'];
}
//# sourceMappingURL=Idle.d.ts.map