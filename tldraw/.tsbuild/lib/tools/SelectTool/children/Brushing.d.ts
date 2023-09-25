import { Box2d, StateNode, TLCancelEvent, TLEventHandlers, TLInterruptEvent, TLKeyboardEvent, TLPointerEventInfo, TLShape, TLShapeId } from '@tldraw/editor';
export declare class Brushing extends StateNode {
    static id: string;
    info: import("@tldraw/editor").TLBaseEventInfo & {
        type: "pointer";
        name: import("@tldraw/editor").TLPointerEventName;
        point: import("@tldraw/editor").VecLike;
        pointerId: number;
        button: number;
        isPen: boolean;
    } & {
        target: "canvas";
        shape?: undefined;
    } & {
        target: 'canvas';
    };
    brush: Box2d;
    initialSelectedShapeIds: TLShapeId[];
    excludedShapeIds: Set<TLShapeId>;
    initialStartShape: TLShape | null;
    onEnter: (info: TLPointerEventInfo & {
        target: 'canvas';
    }) => void;
    onExit: () => void;
    onPointerMove: () => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onComplete: TLEventHandlers['onComplete'];
    onCancel?: TLCancelEvent | undefined;
    onKeyDown: TLEventHandlers['onKeyDown'];
    onKeyUp?: TLKeyboardEvent | undefined;
    private complete;
    private hitTestShapes;
    onInterrupt: TLInterruptEvent;
    private handleHit;
}
//# sourceMappingURL=Brushing.d.ts.map