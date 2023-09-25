/// <reference types="react" />
import { CubicSpline2d, Polyline2d, ShapeUtil, TLHandle, TLLineShape, TLOnHandleChangeHandler, TLOnResizeHandler, Vec2d } from '@tldraw/editor';
/** @public */
export declare class LineShapeUtil extends ShapeUtil<TLLineShape> {
    static type: "line";
    static props: {
        color: import("@tldraw/editor").EnumStyleProp<"black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red">;
        dash: import("@tldraw/editor").EnumStyleProp<"draw" | "solid" | "dashed" | "dotted">;
        size: import("@tldraw/editor").EnumStyleProp<"s" | "m" | "l" | "xl">;
        spline: import("@tldraw/editor").EnumStyleProp<"line" | "cubic">;
        handles: import("@tldraw/editor").DictValidator<string, TLHandle>;
    };
    static migrations: import("@tldraw/editor").Migrations;
    hideResizeHandles: () => boolean;
    hideRotateHandle: () => boolean;
    hideSelectionBoundsFg: () => boolean;
    hideSelectionBoundsBg: () => boolean;
    getDefaultProps(): TLLineShape['props'];
    getGeometry(shape: TLLineShape): Polyline2d | CubicSpline2d;
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