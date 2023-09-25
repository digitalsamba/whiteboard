import { TLDefaultDashStyle, TLDrawShape, TLDrawShapeSegment, Vec2d } from '@tldraw/editor';
import { StrokeOptions } from '../shared/freehand/types';
export declare function getHighlightFreehandSettings({ strokeWidth, showAsComplete, isPen, }: {
    strokeWidth: number;
    showAsComplete: boolean;
    isPen: boolean;
}): StrokeOptions;
export declare function getFreehandOptions(shapeProps: {
    dash: TLDefaultDashStyle;
    isPen: boolean;
    isComplete: boolean;
}, strokeWidth: number, forceComplete: boolean, forceSolid: boolean): StrokeOptions;
export declare function getPointsFromSegments(segments: TLDrawShapeSegment[]): Vec2d[];
export declare function getDrawShapeStrokeDashArray(shape: TLDrawShape, strokeWidth: number): string;
//# sourceMappingURL=getPath.d.ts.map