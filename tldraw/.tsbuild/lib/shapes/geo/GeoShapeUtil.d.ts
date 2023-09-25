/// <reference types="react" />
import { BaseBoxShapeUtil, Geometry2d, SvgExportContext, TLGeoShape, TLOnEditEndHandler, TLOnResizeHandler, TLShapeUtilCanvasSvgDef } from '@tldraw/editor';
/** @public */
export declare class GeoShapeUtil extends BaseBoxShapeUtil<TLGeoShape> {
    static type: "geo";
    static props: {
        geo: import("@tldraw/editor").EnumStyleProp<"arrow-left" | "ellipse" | "triangle" | "diamond" | "rectangle" | "cloud" | "pentagon" | "hexagon" | "octagon" | "star" | "rhombus" | "rhombus-2" | "oval" | "trapezoid" | "arrow-right" | "arrow-up" | "arrow-down" | "x-box" | "check-box">;
        labelColor: import("@tldraw/editor").EnumStyleProp<"black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red">;
        color: import("@tldraw/editor").EnumStyleProp<"black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red">;
        fill: import("@tldraw/editor").EnumStyleProp<"pattern" | "none" | "semi" | "solid">;
        dash: import("@tldraw/editor").EnumStyleProp<"draw" | "solid" | "dashed" | "dotted">;
        size: import("@tldraw/editor").EnumStyleProp<"s" | "m" | "l" | "xl">;
        font: import("@tldraw/editor").EnumStyleProp<"serif" | "draw" | "sans" | "mono">;
        align: import("@tldraw/editor").EnumStyleProp<"start" | "end" | "middle" | "start-legacy" | "end-legacy" | "middle-legacy">;
        verticalAlign: import("@tldraw/editor").EnumStyleProp<"start" | "end" | "middle">;
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
            geo: "arrow-left" | "ellipse" | "triangle" | "diamond" | "rectangle" | "cloud" | "pentagon" | "hexagon" | "octagon" | "star" | "rhombus" | "rhombus-2" | "oval" | "trapezoid" | "arrow-right" | "arrow-up" | "arrow-down" | "x-box" | "check-box";
            labelColor: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
            color: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
            fill: "pattern" | "none" | "semi" | "solid";
            dash: "draw" | "solid" | "dashed" | "dotted";
            size: "s" | "m" | "l" | "xl";
            font: "serif" | "draw" | "sans" | "mono";
            align: "start" | "end" | "middle" | "start-legacy" | "end-legacy" | "middle-legacy";
            verticalAlign: "start" | "end" | "middle";
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
            geo: "arrow-left" | "ellipse" | "triangle" | "diamond" | "rectangle" | "cloud" | "pentagon" | "hexagon" | "octagon" | "star" | "rhombus" | "rhombus-2" | "oval" | "trapezoid" | "arrow-right" | "arrow-up" | "arrow-down" | "x-box" | "check-box";
            labelColor: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
            color: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
            fill: "pattern" | "none" | "semi" | "solid";
            dash: "draw" | "solid" | "dashed" | "dotted";
            size: "s" | "m" | "l" | "xl";
            font: "serif" | "draw" | "sans" | "mono";
            align: "start" | "end" | "middle" | "start-legacy" | "end-legacy" | "middle-legacy";
            verticalAlign: "start" | "end" | "middle";
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