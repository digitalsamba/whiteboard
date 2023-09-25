import { Editor, TLShape, TLShapeId } from '@tldraw/editor';
/** @public */
export declare class DragAndDropManager {
    editor: Editor;
    constructor(editor: Editor);
    prevDroppingShapeId: null | TLShapeId;
    droppingNodeTimer: null | ReturnType<typeof setTimeout>;
    first: boolean;
    updateDroppingNode(movingShapes: TLShape[], cb: () => void): void;
    private setDragTimer;
    private handleDrag;
    dropShapes(shapes: TLShape[]): void;
    clear(): void;
    dispose: () => void;
}
//# sourceMappingURL=DragAndDropManager.d.ts.map