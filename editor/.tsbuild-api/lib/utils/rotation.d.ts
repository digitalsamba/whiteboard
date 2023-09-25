import { TLShape } from '@tldraw/tlschema';
import { Editor } from '../editor/Editor';
import { Vec2d } from '../primitives/Vec2d';
/** @internal */
export declare function getRotationSnapshot({ editor }: {
    editor: Editor;
}): null | TLRotationSnapshot;
/**
 * Info about a rotation that can be applied to the editor's selected shapes.
 *
 * @param selectionPageCenter - The center of the selection in page coordinates
 * @param initialCursorAngle - The angle of the cursor relative to the selection center when the rotation started
 * @param initialSelectionRotation - The rotation of the selection when the rotation started
 * @param shapeSnapshots - Info about each shape that is being rotated
 *
 * @public
 **/
export type TLRotationSnapshot = {
    selectionPageCenter: Vec2d;
    initialCursorAngle: number;
    initialSelectionRotation: number;
    shapeSnapshots: {
        shape: TLShape;
        initialPagePoint: Vec2d;
    }[];
};
/** @internal */
export declare function applyRotationToSnapshotShapes({ delta, editor, snapshot, stage, }: {
    delta: number;
    snapshot: TLRotationSnapshot;
    editor: Editor;
    stage: 'end' | 'one-off' | 'start' | 'update';
}): void;
//# sourceMappingURL=rotation.d.ts.map