import { TLDefaultSizeStyle, Vec2d, Vec2dModel } from '@tldraw/editor';
export declare function getPillPoints(width: number, height: number, numPoints: number): Vec2d[];
export declare function getCloudArcs(width: number, height: number, seed: string, size: TLDefaultSizeStyle): Arc[];
type Arc = {
    leftPoint: Vec2d;
    rightPoint: Vec2d;
    arcPoint: Vec2d;
    center: Vec2d;
    radius: number;
};
export declare function cloudOutline(width: number, height: number, seed: string, size: TLDefaultSizeStyle): Vec2d[];
export declare function cloudSvgPath(width: number, height: number, seed: string, size: TLDefaultSizeStyle): string;
export declare function inkyCloudSvgPath(width: number, height: number, seed: string, size: TLDefaultSizeStyle): string;
export declare function pointsOnArc(startPoint: Vec2dModel, endPoint: Vec2dModel, center: Vec2dModel, radius: number, numPoints: number): Vec2d[];
export {};
//# sourceMappingURL=cloudOutline.d.ts.map