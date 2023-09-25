import { StateNode, TLEventHandlers, TLPointerEventInfo } from '@tldraw/editor';
export declare class PointingHandle extends StateNode {
    static id: string;
    info: import("@tldraw/editor").TLBaseEventInfo & {
        type: "pointer";
        name: import("@tldraw/editor").TLPointerEventName;
        point: import("@tldraw/editor").VecLike;
        pointerId: number;
        button: number;
        isPen: boolean;
    } & {
        target: "handle";
        shape: import("@tldraw/editor").TLShape;
        handle: import("@tldraw/editor").TLHandle;
    } & {
        target: 'handle';
    };
    onEnter: (info: TLPointerEventInfo & {
        target: 'handle';
    }) => void;
    onExit: () => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onPointerMove: TLEventHandlers['onPointerMove'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: () => void;
    private cancel;
}
//# sourceMappingURL=PointingHandle.d.ts.map