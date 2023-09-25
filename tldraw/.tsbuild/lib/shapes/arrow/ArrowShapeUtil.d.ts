/// <reference types="react" />
import { Group2d, ShapeUtil, SvgExportContext, TLArrowShape, TLHandle, TLOnEditEndHandler, TLOnHandleChangeHandler, TLOnResizeHandler, TLOnTranslateStartHandler, TLShapePartial, TLShapeUtilCanvasSvgDef, TLShapeUtilFlag, Vec2dModel } from '@tldraw/editor';
/** @public */
export declare class ArrowShapeUtil extends ShapeUtil<TLArrowShape> {
    static type: "arrow";
    static props: {
        labelColor: import("@tldraw/editor").EnumStyleProp<"black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red">;
        color: import("@tldraw/editor").EnumStyleProp<"black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red">;
        fill: import("@tldraw/editor").EnumStyleProp<"pattern" | "none" | "semi" | "solid">;
        dash: import("@tldraw/editor").EnumStyleProp<"draw" | "solid" | "dashed" | "dotted">;
        size: import("@tldraw/editor").EnumStyleProp<"s" | "m" | "l" | "xl">;
        arrowheadStart: import("@tldraw/editor").EnumStyleProp<"dot" | "none" | "square" | "arrow" | "triangle" | "pipe" | "diamond" | "inverted" | "bar">;
        arrowheadEnd: import("@tldraw/editor").EnumStyleProp<"dot" | "none" | "square" | "arrow" | "triangle" | "pipe" | "diamond" | "inverted" | "bar">;
        font: import("@tldraw/editor").EnumStyleProp<"serif" | "draw" | "sans" | "mono">;
        start: import("@tldraw/editor").UnionValidator<"type", {
            binding: import("@tldraw/editor").ObjectValidator<{
                type: "binding";
                boundShapeId: import("@tldraw/editor").TLShapeId;
                normalizedAnchor: Vec2dModel;
                isExact: boolean;
            }>;
            point: import("@tldraw/editor").ObjectValidator<{
                type: "point";
                x: number;
                y: number;
            }>;
        }, never>;
        end: import("@tldraw/editor").UnionValidator<"type", {
            binding: import("@tldraw/editor").ObjectValidator<{
                type: "binding";
                boundShapeId: import("@tldraw/editor").TLShapeId;
                normalizedAnchor: Vec2dModel;
                isExact: boolean;
            }>;
            point: import("@tldraw/editor").ObjectValidator<{
                type: "point";
                x: number;
                y: number;
            }>;
        }, never>;
        bend: import("@tldraw/editor").Validator<number>;
        text: import("@tldraw/editor").Validator<string>;
    };
    static migrations: import("@tldraw/editor").Migrations;
    canEdit: () => boolean;
    canBind: () => boolean;
    canSnap: () => boolean;
    hideResizeHandles: TLShapeUtilFlag<TLArrowShape>;
    hideRotateHandle: TLShapeUtilFlag<TLArrowShape>;
    hideSelectionBoundsBg: TLShapeUtilFlag<TLArrowShape>;
    hideSelectionBoundsFg: TLShapeUtilFlag<TLArrowShape>;
    getDefaultProps(): TLArrowShape['props'];
    getGeometry(shape: TLArrowShape): Group2d;
    getHandles(shape: TLArrowShape): TLHandle[];
    onHandleChange: TLOnHandleChangeHandler<TLArrowShape>;
    onTranslateStart: TLOnTranslateStartHandler<TLArrowShape>;
    onResize: TLOnResizeHandler<TLArrowShape>;
    onDoubleClickHandle: (shape: TLArrowShape, handle: TLHandle) => TLShapePartial<TLArrowShape> | void;
    component(shape: TLArrowShape): JSX.Element | null;
    indicator(shape: TLArrowShape): JSX.Element | null;
    onEditEnd: TLOnEditEndHandler<TLArrowShape>;
    toSvg(shape: TLArrowShape, ctx: SvgExportContext): SVGGElement;
    getCanvasSvgDefs(): TLShapeUtilCanvasSvgDef[];
}
//# sourceMappingURL=ArrowShapeUtil.d.ts.map