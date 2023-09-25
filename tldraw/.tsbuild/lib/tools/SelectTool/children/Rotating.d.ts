import { StateNode, TLEventHandlers, TLPointerEventInfo, TLRotationSnapshot } from '@tldraw/editor';
export declare class Rotating extends StateNode {
    static id: string;
    snapshot: TLRotationSnapshot;
    info: import("@tldraw/editor").TLBaseEventInfo & {
        type: "pointer";
        name: import("@tldraw/editor").TLPointerEventName;
        point: import("@tldraw/editor").VecLike;
        pointerId: number;
        button: number;
        isPen: boolean;
    } & {
        target: "selection";
        handle?: import("@tldraw/editor").TLSelectionHandle | undefined;
        shape?: undefined;
    } & {
        onInteractionEnd?: string | undefined;
    };
    markId: string;
    onEnter: (info: TLPointerEventInfo & {
        target: 'selection';
        onInteractionEnd?: string;
    }) => StateNode | undefined;
    onExit: () => void;
    onPointerMove: () => void;
    onKeyDown: () => void;
    onKeyUp: () => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onComplete: TLEventHandlers['onComplete'];
    onCancel: () => void;
    private update;
    private cancel;
    private complete;
    protected handleStart(): void;
    _getRotationFromPointerPosition({ snapToNearestDegree }: {
        snapToNearestDegree: boolean;
    }): number;
}
//# sourceMappingURL=Rotating.d.ts.map