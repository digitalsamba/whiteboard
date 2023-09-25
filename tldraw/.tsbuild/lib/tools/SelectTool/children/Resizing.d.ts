import { Matrix2d, SelectionCorner, SelectionEdge, StateNode, TLEnterEventHandler, TLEventHandlers, TLShape, TLShapeId, Vec2d, VecLike } from '@tldraw/editor';
export declare class Resizing extends StateNode {
    static id: string;
    info: import("@tldraw/editor").TLBaseEventInfo & {
        type: "pointer";
        name: import("@tldraw/editor").TLPointerEventName;
        point: VecLike;
        pointerId: number;
        button: number;
        isPen: boolean;
    } & {
        target: "selection";
        handle?: import("@tldraw/editor").TLSelectionHandle | undefined;
        shape?: undefined;
    } & {
        target: "selection";
        handle: SelectionCorner | SelectionEdge;
        isCreating?: boolean | undefined;
        editAfterComplete?: boolean | undefined;
        creationCursorOffset?: VecLike | undefined;
        onInteractionEnd?: string | undefined;
    };
    markId: string;
    creationCursorOffset: VecLike;
    editAfterComplete: boolean;
    private snapshot;
    onEnter: TLEnterEventHandler;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onKeyDown: TLEventHandlers['onKeyDown'];
    onKeyUp: TLEventHandlers['onKeyUp'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onComplete: TLEventHandlers['onComplete'];
    onCancel: TLEventHandlers['onCancel'];
    private cancel;
    private complete;
    private handleResizeStart;
    private handleResizeEnd;
    private updateShapes;
    private updateCursor;
    onExit: () => void;
    _createSnapshot: () => {
        shapeSnapshots: Map<TLShapeId, {
            shape: TLShape;
            bounds: import("@tldraw/editor").Box2d;
            pageTransform: Matrix2d;
            pageRotation: number;
            isAspectRatioLocked: boolean;
        }>;
        selectionBounds: import("@tldraw/editor").Box2d;
        cursorHandleOffset: Vec2d;
        selectionRotation: number;
        selectedShapeIds: TLShapeId[];
        canShapesDeform: boolean;
        initialSelectionPageBounds: import("@tldraw/editor").Box2d;
    };
    _createShapeSnapshot: (shape: TLShape) => {
        shape: TLShape;
        bounds: import("@tldraw/editor").Box2d;
        pageTransform: Matrix2d;
        pageRotation: number;
        isAspectRatioLocked: boolean;
    };
}
export declare function rotateSelectionHandle(handle: SelectionEdge | SelectionCorner, rotation: number): SelectionCorner | SelectionEdge;
//# sourceMappingURL=Resizing.d.ts.map