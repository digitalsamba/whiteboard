/// <reference types="react" />
import { Circle2d, Polyline2d, ShapeUtil, SvgExportContext, TLDrawShape, TLOnResizeHandler, TLShapeUtilCanvasSvgDef } from '@tldraw/editor';
/** @public */
export declare class DrawShapeUtil extends ShapeUtil<TLDrawShape> {
    static type: "draw";
    static props: {
        color: import("@tldraw/editor").EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
        fill: import("@tldraw/editor").EnumStyleProp<"none" | "pattern" | "semi" | "solid">;
        dash: import("@tldraw/editor").EnumStyleProp<"dashed" | "dotted" | "draw" | "solid">;
        size: import("@tldraw/editor").EnumStyleProp<"l" | "m" | "s" | "xl">;
        segments: import("@tldraw/editor").ArrayOfValidator<{
            type: "free" | "straight";
            points: import("@tldraw/editor").Vec2dModel[];
        }>;
        isComplete: import("@tldraw/editor").Validator<boolean>;
        isClosed: import("@tldraw/editor").Validator<boolean>;
        isPen: import("@tldraw/editor").Validator<boolean>;
    };
    static migrations: import("@tldraw/editor").Migrations;
    hideResizeHandles: (shape: TLDrawShape) => boolean;
    hideRotateHandle: (shape: TLDrawShape) => boolean;
    hideSelectionBoundsFg: (shape: TLDrawShape) => boolean;
    getDefaultProps(): TLDrawShape['props'];
    getGeometry(shape: TLDrawShape): Circle2d | Polyline2d;
    component(shape: TLDrawShape): JSX.Element;
    indicator(shape: TLDrawShape): JSX.Element;
    toSvg(shape: TLDrawShape, ctx: SvgExportContext): SVGGElement;
    getCanvasSvgDefs(): TLShapeUtilCanvasSvgDef[];
    onResize: TLOnResizeHandler<TLDrawShape>;
    expandSelectionOutlinePx(shape: TLDrawShape): number;
}
//# sourceMappingURL=DrawShapeUtil.d.ts.map