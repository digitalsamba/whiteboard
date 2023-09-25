import { Box2d, Editor, Matrix2dModel, SnapPoint, StateNode, TLEventHandlers, TLPointerEventInfo, TLShape, Vec2d } from '@tldraw/editor';
import { DragAndDropManager } from '../DragAndDropManager';
export declare class Translating extends StateNode {
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
        shape: TLShape;
    } & {
        target: 'shape';
        isCreating?: boolean | undefined;
        editAfterComplete?: boolean | undefined;
        onInteractionEnd?: string | undefined;
    };
    selectionSnapshot: TranslatingSnapshot;
    snapshot: TranslatingSnapshot;
    markId: string;
    isCloning: boolean;
    isCreating: boolean;
    editAfterComplete: boolean;
    dragAndDropManager: DragAndDropManager;
    onEnter: (info: TLPointerEventInfo & {
        target: 'shape';
        isCreating?: boolean;
        editAfterComplete?: boolean;
        onInteractionEnd?: string;
    }) => void;
    onExit: () => void;
    onPointerMove: () => void;
    onKeyDown: () => void;
    onKeyUp: TLEventHandlers['onKeyUp'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onComplete: TLEventHandlers['onComplete'];
    onCancel: TLEventHandlers['onCancel'];
    protected startCloning(): void;
    protected stopCloning(): void;
    updateParent: () => void;
    reset(): void;
    protected complete(): void;
    private cancel;
    protected handleStart(): void;
    protected handleEnd(): void;
    protected handleChange(): void;
    protected updateShapes(): void;
    protected updateParentTransforms: () => void;
}
declare function getTranslatingSnapshot(editor: Editor): {
    averagePagePoint: Vec2d;
    movingShapes: TLShape[];
    shapeSnapshots: MovingShapeSnapshot[];
    initialPageBounds: Box2d;
    initialSnapPoints: {
        id: string;
        x: number;
        y: number;
    }[];
};
export type TranslatingSnapshot = ReturnType<typeof getTranslatingSnapshot>;
export interface MovingShapeSnapshot {
    shape: TLShape;
    pagePoint: Vec2d;
    parentTransform: Matrix2dModel | null;
}
export declare function moveShapesToPoint({ editor, shapeSnapshots: snapshots, averagePagePoint, initialSelectionPageBounds, initialSelectionSnapPoints, }: {
    editor: Editor;
    shapeSnapshots: MovingShapeSnapshot[];
    averagePagePoint: Vec2d;
    initialSelectionPageBounds: Box2d;
    initialSelectionSnapPoints: SnapPoint[];
}): void;
export {};
//# sourceMappingURL=Translating.d.ts.map