import { StateNode, TLEventHandlers, TLPointerEventInfo } from '@tldraw/editor';
export declare class Pointing extends StateNode {
    static id: string;
    info: TLPointerEventInfo & {
        onInteractionEnd?: string | undefined;
    };
    onEnter: (info: TLPointerEventInfo & {
        onInteractionEnd: string;
    }) => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onPointerMove: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    private complete;
    private cancel;
}
//# sourceMappingURL=Pointing.d.ts.map