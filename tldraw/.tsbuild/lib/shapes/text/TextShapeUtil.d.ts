/// <reference types="react" />
import { Rectangle2d, ShapeUtil, SvgExportContext, TLOnEditEndHandler, TLOnResizeHandler, TLShapeUtilFlag, TLTextShape } from '@tldraw/editor';
/** @public */
export declare class TextShapeUtil extends ShapeUtil<TLTextShape> {
    static type: "text";
    static props: {
        color: import("@tldraw/editor").EnumStyleProp<"black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red">;
        size: import("@tldraw/editor").EnumStyleProp<"s" | "m" | "l" | "xl">;
        font: import("@tldraw/editor").EnumStyleProp<"serif" | "draw" | "sans" | "mono">;
        align: import("@tldraw/editor").EnumStyleProp<"start" | "end" | "middle" | "start-legacy" | "end-legacy" | "middle-legacy">;
        w: import("@tldraw/editor").Validator<number>;
        text: import("@tldraw/editor").Validator<string>;
        scale: import("@tldraw/editor").Validator<number>;
        autoSize: import("@tldraw/editor").Validator<boolean>;
    };
    static migrations: import("@tldraw/editor").Migrations;
    getDefaultProps(): TLTextShape['props'];
    getMinDimensions(shape: TLTextShape): {
        height: number;
        width: number;
    };
    getGeometry(shape: TLTextShape): Rectangle2d;
    canEdit: () => boolean;
    isAspectRatioLocked: TLShapeUtilFlag<TLTextShape>;
    component(shape: TLTextShape): JSX.Element;
    indicator(shape: TLTextShape): JSX.Element;
    toSvg(shape: TLTextShape, ctx: SvgExportContext): SVGGElement;
    onResize: TLOnResizeHandler<TLTextShape>;
    onBeforeCreate: (shape: TLTextShape) => {
        x: number;
        y: number;
        type: "text";
        rotation: number;
        index: string;
        parentId: import("@tldraw/editor").TLParentId;
        isLocked: boolean;
        opacity: number;
        props: {
            color: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
            size: "s" | "m" | "l" | "xl";
            font: "serif" | "draw" | "sans" | "mono";
            align: "start" | "end" | "middle" | "start-legacy" | "end-legacy" | "middle-legacy";
            w: number;
            text: string;
            scale: number;
            autoSize: boolean;
        };
        meta: import("@tldraw/editor").JsonObject;
        id: import("@tldraw/editor").TLShapeId;
        typeName: "shape";
    } | undefined;
    onEditEnd: TLOnEditEndHandler<TLTextShape>;
    onBeforeUpdate: (prev: TLTextShape, next: TLTextShape) => {
        x: number;
        y: number;
        props: {
            w: number;
            color: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
            size: "s" | "m" | "l" | "xl";
            font: "serif" | "draw" | "sans" | "mono";
            align: "start" | "end" | "middle" | "start-legacy" | "end-legacy" | "middle-legacy";
            text: string;
            scale: number;
            autoSize: boolean;
        };
        type: "text";
        rotation: number;
        index: string;
        parentId: import("@tldraw/editor").TLParentId;
        isLocked: boolean;
        opacity: number;
        meta: import("@tldraw/editor").JsonObject;
        id: import("@tldraw/editor").TLShapeId;
        typeName: "shape";
    } | undefined;
    onDoubleClickEdge: (shape: TLTextShape) => {
        id: import("@tldraw/editor").TLShapeId;
        type: "text";
        props: {
            autoSize: boolean;
            scale?: undefined;
        };
    } | {
        id: import("@tldraw/editor").TLShapeId;
        type: "text";
        props: {
            scale: number;
            autoSize?: undefined;
        };
    } | undefined;
}
//# sourceMappingURL=TextShapeUtil.d.ts.map