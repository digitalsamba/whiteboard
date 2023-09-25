import { StateNode, TLEventHandlers, TLPointerEventInfo } from '@tldraw/editor';
export declare class Idle extends StateNode {
    static id: string;
    info: TLPointerEventInfo & {
        onInteractionEnd?: string | undefined;
    };
    onEnter: (info: TLPointerEventInfo & {
        onInteractionEnd: string;
    }) => void;
    onPointerDown: TLEventHandlers['onPointerUp'];
}
//# sourceMappingURL=Idle.d.ts.map