/// <reference types="react" />
import { BaseBoxShapeUtil, Geometry2d, SvgExportContext, TLGeoShape, TLOnEditEndHandler, TLOnResizeHandler, TLShapeUtilCanvasSvgDef } from '@tldraw/editor';
/** @public */
export declare class GeoShapeUtil extends BaseBoxShapeUtil<TLGeoShape> {
    static type: "geo";
    static props: {
        geo: import("@tldraw/editor").EnumStyleProp<"arrow-down" | "arrow-left" | "arrow-right" | "arrow-up" | "check-box" | "cloud" | "diamond" | "ellipse" | "hexagon" | "octagon" | "oval" | "pentagon" | "rectangle" | "rhombus-2" | "rhombus" | "star" | "trapezoid" | "triangle" | "x-box">;
        labelColor: import("@tldraw/editor").EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
        color: import("@tldraw/editor").EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
        fill: import("@tldraw/editor").EnumStyleProp<"none" | "pattern" | "semi" | "solid">;
        dash: import("@tldraw/editor").EnumStyleProp<"dashed" | "dotted" | "draw" | "solid">;
        size: import("@tldraw/editor").EnumStyleProp<"l" | "m" | "s" | "xl">;
        font: import("@tldraw/editor").EnumStyleProp<"draw" | "mono" | "sans" | "serif">;
        align: import("@tldraw/editor").EnumStyleProp<"end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start">;
        verticalAlign: import("@tldraw/editor").EnumStyleProp<"end" | "middle" | "start">;
        url: import("@tldraw/editor").Validator<string>;
        w: import("@tldraw/editor").Validator<number>;
        h: import("@tldraw/editor").Validator<number>;
        growY: import("@tldraw/editor").Validator<number>;
        text: import("@tldraw/editor").Validator<string>;
    };
    static migrations: import("@tldraw/editor").Migrations;
    canEdit: () => boolean;
    getDefaultProps(): TLGeoShape['props'];
    getGeometry(shape: TLGeoShape): Geometry2d;
    onEditEnd: TLOnEditEndHandler<TLGeoShape>;
    component(shape: TLGeoShape): JSX.Element;
    indicator(shape: TLGeoShape): JSX.Element;
    toSvg(shape: TLGeoShape, ctx: SvgExportContext): SVGElement;
    getCanvasSvgDefs(): TLShapeUtilCanvasSvgDef[];
    onResize: TLOnResizeHandler<TLGeoShape>;
    onBeforeCreate: (shape: TLGeoShape) => {
        props: {
            growY: number;
            geo: "arrow-down" | "arrow-left" | "arrow-right" | "arrow-up" | "check-box" | "cloud" | "diamond" | "ellipse" | "hexagon" | "octagon" | "oval" | "pentagon" | "rectangle" | "rhombus-2" | "rhombus" | "star" | "trapezoid" | "triangle" | "x-box";
            labelColor: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
            color: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
            fill: "none" | "pattern" | "semi" | "solid";
            dash: "dashed" | "dotted" | "draw" | "solid";
            size: "l" | "m" | "s" | "xl";
            font: "draw" | "mono" | "sans" | "serif";
            align: "end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start";
            verticalAlign: "end" | "middle" | "start";
            url: string;
            w: number;
            h: number;
            text: string;
        };
        type: "geo";
        x: number;
        y: number;
        rotation: number;
        index: string;
        parentId: import("@tldraw/editor").TLParentId;
        isLocked: boolean;
        opacity: number;
        meta: import("@tldraw/editor").JsonObject;
        id: import("@tldraw/editor").TLShapeId;
        typeName: "shape";
    } | undefined;
    onBeforeUpdate: (prev: TLGeoShape, next: TLGeoShape) => {
        props: {
            growY: number;
            geo: "arrow-down" | "arrow-left" | "arrow-right" | "arrow-up" | "check-box" | "cloud" | "diamond" | "ellipse" | "hexagon" | "octagon" | "oval" | "pentagon" | "rectangle" | "rhombus-2" | "rhombus" | "star" | "trapezoid" | "triangle" | "x-box";
            labelColor: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
            color: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
            fill: "none" | "pattern" | "semi" | "solid";
            dash: "dashed" | "dotted" | "draw" | "solid";
            size: "l" | "m" | "s" | "xl";
            font: "draw" | "mono" | "sans" | "serif";
            align: "end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start";
            verticalAlign: "end" | "middle" | "start";
            url: string;
            w: number;
            h: number;
            text: string;
        };
        type: "geo";
        x: number;
        y: number;
        rotation: number;
        index: string;
        parentId: import("@tldraw/editor").TLParentId;
        isLocked: boolean;
        opacity: number;
        meta: import("@tldraw/editor").JsonObject;
        id: import("@tldraw/editor").TLShapeId;
        typeName: "shape";
    } | undefined;
    onDoubleClick: (shape: TLGeoShape) => {
        props: {
            geo: "check-box";
        };
        type: "geo";
        x: number;
        y: number;
        rotation: number;
        index: string;
        parentId: import("@tldraw/editor").TLParentId;
        isLocked: boolean;
        opacity: number;
        meta: import("@tldraw/editor").JsonObject;
        id: import("@tldraw/editor").TLShapeId;
        typeName: "shape";
    } | {
        props: {
            geo: "rectangle";
        };
        type: "geo";
        x: number;
        y: number;
        rotation: number;
        index: string;
        parentId: import("@tldraw/editor").TLParentId;
        isLocked: boolean;
        opacity: number;
        meta: import("@tldraw/editor").JsonObject;
        id: import("@tldraw/editor").TLShapeId;
        typeName: "shape";
    } | undefined;
}
//# sourceMappingURL=GeoShapeUtil.d.ts.map