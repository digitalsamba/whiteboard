import { StateNode, TLEventHandlers, TLPointerEventInfo } from '@tldraw/editor';
export declare class Erasing extends StateNode {
    static id: string;
    private info;
    private scribble;
    private markId;
    private excludedShapeIds;
    onEnter: (info: TLPointerEventInfo) => void;
    private startScribble;
    private pushPointToScribble;
    private onScribbleUpdate;
    private onScribbleComplete;
    onExit: () => void;
    onPointerMove: () => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    update(): void;
    complete(): void;
    cancel(): void;
}
//# sourceMappingURL=Erasing.d.ts.map