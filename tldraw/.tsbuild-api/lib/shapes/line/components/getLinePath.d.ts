import { CubicSpline2d, Polyline2d, TLLineShape } from '@tldraw/editor';
export declare function getLineDrawFreehandOptions(strokeWidth: number): {
    size: number;
    thinning: number;
    streamline: number;
    smoothing: number;
    simulatePressure: boolean;
    last: boolean;
};
export declare function getLineSolidFreehandOptions(strokeWidth: number): {
    size: number;
    thinning: number;
    streamline: number;
    smoothing: number;
    simulatePressure: boolean;
    last: boolean;
};
export declare function getLineStrokePoints(shape: TLLineShape, spline: CubicSpline2d | Polyline2d, strokeWidth: number): import("../../shared/freehand/types").StrokePoint[];
export declare function getLineDrawStrokeOutlinePoints(shape: TLLineShape, spline: CubicSpline2d | Polyline2d, strokeWidth: number): import("@tldraw/editor").Vec2d[];
export declare function getLineSolidStrokeOutlinePoints(shape: TLLineShape, spline: CubicSpline2d | Polyline2d, strokeWidth: number): import("@tldraw/editor").Vec2d[];
export declare function getLineDrawPath(shape: TLLineShape, spline: CubicSpline2d | Polyline2d, strokeWidth: number): string;
export declare function getLineSolidPath(shape: TLLineShape, spline: CubicSpline2d | Polyline2d, strokeWidth: number): string;
export declare function getLineIndicatorPath(shape: TLLineShape, spline: CubicSpline2d | Polyline2d, strokeWidth: number): string;
//# sourceMappingURL=getLinePath.d.ts.map