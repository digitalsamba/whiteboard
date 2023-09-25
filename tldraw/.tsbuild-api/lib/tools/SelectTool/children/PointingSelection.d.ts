import { StateNode, TLClickEvent, TLEventHandlers, TLPointerEventInfo } from '@tldraw/editor';
export declare class PointingSelection extends StateNode {
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
    };
    onEnter: (info: TLPointerEventInfo & {
        target: 'selection';
    }) => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onPointerMove: TLEventHandlers['onPointerMove'];
    onDoubleClick?: TLClickEvent | undefined;
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: () => void;
    private cancel;
}
//# sourceMappingURL=PointingSelection.d.ts.map