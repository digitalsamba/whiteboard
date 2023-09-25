/// <reference types="react" />
import { CubicSpline2d, Polyline2d, ShapeUtil, TLHandle, TLLineShape, TLOnHandleChangeHandler, TLOnResizeHandler, Vec2d } from '@tldraw/editor';
/** @public */
export declare class LineShapeUtil extends ShapeUtil<TLLineShape> {
    static type: "line";
    static props: {
        color: import("@tldraw/editor").EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
        dash: import("@tldraw/editor").EnumStyleProp<"dashed" | "dotted" | "draw" | "solid">;
        size: import("@tldraw/editor").EnumStyleProp<"l" | "m" | "s" | "xl">;
        spline: import("@tldraw/editor").EnumStyleProp<"cubic" | "line">;
        handles: import("@tldraw/editor").DictValidator<string, TLHandle>;
    };
    static migrations: import("@tldraw/editor").Migrations;
    hideResizeHandles: () => boolean;
    hideRotateHandle: () => boolean;
    hideSelectionBoundsFg: () => boolean;
    hideSelectionBoundsBg: () => boolean;
    getDefaultProps(): TLLineShape['props'];
    getGeometry(shape: TLLineShape): CubicSpline2d | Polyline2d;
    getHandles(shape: TLLineShape): TLHandle[];
    getOutlineSegments(shape: TLLineShape): Vec2d[][];
    onResize: TLOnResizeHandler<TLLineShape>;
    onHandleChange: TLOnHandleChangeHandler<TLLineShape>;
    component(shape: TLLineShape): JSX.Element | undefined;
    indicator(shape: TLLineShape): JSX.Element;
    toSvg(shape: TLLineShape): SVGGElement;
}
/** @public */
export declare function getGeometryForLineShape(shape: TLLineShape): CubicSpline2d | Polyline2d;
//# sourceMappingURL=LineShapeUtil.d.ts.map