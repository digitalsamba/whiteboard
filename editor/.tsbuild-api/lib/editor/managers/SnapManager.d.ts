import { TLShape, TLShapeId } from '@tldraw/tlschema';
import { Box2d, SelectionCorner, SelectionEdge } from '../../primitives/Box2d';
import { Vec2d, VecLike } from '../../primitives/Vec2d';
import type { Editor } from '../Editor';
/** @public */
export type PointsSnapLine = {
    id: string;
    type: 'points';
    points: VecLike[];
};
/** @public */
export type GapsSnapLine = {
    id: string;
    type: 'gaps';
    direction: 'horizontal' | 'vertical';
    gaps: Array<{
        startEdge: [VecLike, VecLike];
        endEdge: [VecLike, VecLike];
    }>;
};
/** @public */
export type SnapLine = GapsSnapLine | PointsSnapLine;
export type SnapInteractionType = {
    type: 'resize';
} | {
    type: 'translate';
    lockedAxis: 'x' | 'y' | null;
    initialSelectionSnapPoints: Vec2d[];
};
/** @public */
export interface SnapPoint {
    id: string;
    x: number;
    y: number;
    handle?: SelectionCorner;
}
type GapNode = {
    id: TLShapeId;
    pageBounds: Box2d;
    isClosed: boolean;
};
type Gap = {
    startNode: GapNode;
    endNode: GapNode;
    startEdge: [Vec2d, Vec2d];
    endEdge: [Vec2d, Vec2d];
    length: number;
    breadthIntersection: [number, number];
};
interface SnapData {
    nudge: Vec2d;
}
/** @public */
export declare class SnapManager {
    readonly editor: Editor;
    private _snapLines;
    get lines(): SnapLine[];
    clear(): void;
    setLines(lines: SnapLine[]): void;
    constructor(editor: Editor);
    get snapPointsCache(): import("@tldraw/store").ComputedCache<SnapPoint[], TLShape>;
    get snapThreshold(): number;
    get snappableShapes(): GapNode[];
    get currentCommonAncestor(): TLShapeId | undefined;
    get snappablePoints(): SnapPoint[];
    get visibleGaps(): {
        horizontal: Gap[];
        vertical: Gap[];
    };
    snapTranslate({ lockedAxis, initialSelectionPageBounds, initialSelectionSnapPoints, dragDelta, }: {
        lockedAxis: 'x' | 'y' | null;
        initialSelectionSnapPoints: SnapPoint[];
        initialSelectionPageBounds: Box2d;
        dragDelta: Vec2d;
    }): SnapData;
    get outlinesInPageSpace(): Vec2d[][];
    getSnappingHandleDelta({ handlePoint, additionalSegments, }: {
        handlePoint: Vec2d;
        additionalSegments: Vec2d[][];
    }): null | Vec2d;
    snapResize({ initialSelectionPageBounds, dragDelta, handle: originalHandle, isAspectRatioLocked, isResizingFromCenter, }: {
        initialSelectionPageBounds: Box2d;
        dragDelta: Vec2d;
        handle: SelectionCorner | SelectionEdge;
        isAspectRatioLocked: boolean;
        isResizingFromCenter: boolean;
    }): SnapData;
    private collectPointSnaps;
    private collectGapSnaps;
    private getPointSnapLines;
    private getGapSnapLines;
}
export {};
//# sourceMappingURL=SnapManager.d.ts.map