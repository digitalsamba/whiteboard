import { SelectionHandle, StateNode, TLEnterEventHandler, TLEventHandlers } from '@tldraw/editor';
export declare class Cropping extends StateNode {
    static id: string;
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
        target: 'selection';
        handle: SelectionHandle;
        onInteractionEnd?: string | undefined;
    };
    markId: string;
    private snapshot;
    onEnter: TLEnterEventHandler;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onComplete: TLEventHandlers['onComplete'];
    onCancel: TLEventHandlers['onCancel'];
    private updateCursor;
    private getDefaultCrop;
    private updateShapes;
    private complete;
    private cancel;
    private createSnapshot;
}
//# sourceMappingURL=Cropping.d.ts.map