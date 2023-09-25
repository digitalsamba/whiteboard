import { StateNode, TLEventHandlers, TLPointerEventInfo } from '@tldraw/editor';
export declare class TranslatingCrop extends StateNode {
    static id: string;
    info: import("@tldraw/editor").TLBaseEventInfo & {
        type: "pointer";
        name: import("@tldraw/editor").TLPointerEventName;
        point: import("@tldraw/editor").VecLike;
        pointerId: number;
        button: number;
        isPen: boolean;
    } & {
        target: "shape";
        shape: import("@tldraw/editor").TLShape;
    } & {
        target: 'shape';
        isCreating?: boolean | undefined;
        onInteractionEnd?: string | undefined;
    };
    markId: string;
    private snapshot;
    onEnter: (info: TLPointerEventInfo & {
        target: 'shape';
        isCreating?: boolean;
        onInteractionEnd?: string;
    }) => void;
    onExit: () => void;
    onPointerMove: () => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onComplete: TLEventHandlers['onComplete'];
    onCancel: TLEventHandlers['onCancel'];
    onKeyDown: TLEventHandlers['onKeyDown'];
    onKeyUp: TLEventHandlers['onKeyUp'];
    protected complete(): void;
    private cancel;
    private createSnapshot;
    protected updateShapes(): void;
}
//# sourceMappingURL=TranslatingCrop.d.ts.map