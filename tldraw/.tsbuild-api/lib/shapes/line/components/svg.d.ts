import { CubicBezier2d, CubicSpline2d, Edge2d, Polyline2d } from '@tldraw/editor';
export declare function getSvgPathForEdge(edge: Edge2d, first: boolean): string;
export declare function getSvgPathForBezierCurve(curve: CubicBezier2d, first: boolean): string;
export declare function getSvgPathForCubicSpline(spline: CubicSpline2d, isClosed: boolean): string;
export declare function getSvgPathForPolylineSpline(spline: Polyline2d, isClosed: boolean): string;
export declare function getSvgPathForLineGeometry(spline: CubicSpline2d | Polyline2d, isClosed?: boolean): string;
//# sourceMappingURL=svg.d.ts.map