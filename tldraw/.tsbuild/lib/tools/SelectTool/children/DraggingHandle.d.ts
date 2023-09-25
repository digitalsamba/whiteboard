import { StateNode, TLArrowShape, TLCancelEvent, TLEnterEventHandler, TLEventHandlers, TLHandle, TLKeyboardEvent, TLShapeId, Vec2d } from '@tldraw/editor';
export declare class DraggingHandle extends StateNode {
    static id: string;
    shapeId: TLShapeId;
    initialHandle: TLHandle;
    initialAdjacentHandle: TLHandle | null;
    initialPagePoint: Vec2d;
    markId: string;
    initialPageTransform: any;
    initialPageRotation: any;
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
        handle: TLHandle;
    } & {
        shape: TLArrowShape;
        target: 'handle';
        onInteractionEnd?: string | undefined;
        isCreating: boolean;
    };
    isPrecise: boolean;
    isPreciseId: TLShapeId | null;
    pointingId: TLShapeId | null;
    onEnter: TLEnterEventHandler;
    private exactTimeout;
    private resetExactTimeout;
    private clearExactTimeout;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onKeyDown: TLKeyboardEvent | undefined;
    onKeyUp: TLKeyboardEvent | undefined;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onComplete: TLEventHandlers['onComplete'];
    onCancel: TLCancelEvent;
    onExit: () => void;
    private complete;
    private cancel;
    private update;
}
//# sourceMappingURL=DraggingHandle.d.ts.map