/// <reference types="react" />
import { Rectangle2d, ShapeUtil, SvgExportContext, TLNoteShape, TLOnEditEndHandler } from '@tldraw/editor';
/** @public */
export declare class NoteShapeUtil extends ShapeUtil<TLNoteShape> {
    static type: "note";
    static props: {
        color: import("@tldraw/editor").EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
        size: import("@tldraw/editor").EnumStyleProp<"l" | "m" | "s" | "xl">;
        font: import("@tldraw/editor").EnumStyleProp<"draw" | "mono" | "sans" | "serif">;
        align: import("@tldraw/editor").EnumStyleProp<"end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start">;
        verticalAlign: import("@tldraw/editor").EnumStyleProp<"end" | "middle" | "start">;
        growY: import("@tldraw/editor").Validator<number>;
        url: import("@tldraw/editor").Validator<string>;
        text: import("@tldraw/editor").Validator<string>;
    };
    static migrations: import("@tldraw/editor").Migrations;
    canEdit: () => boolean;
    hideResizeHandles: () => boolean;
    hideSelectionBoundsFg: () => boolean;
    getDefaultProps(): TLNoteShape['props'];
    getHeight(shape: TLNoteShape): number;
    getGeometry(shape: TLNoteShape): Rectangle2d;
    component(shape: TLNoteShape): JSX.Element;
    indicator(shape: TLNoteShape): JSX.Element;
    toSvg(shape: TLNoteShape, ctx: SvgExportContext): SVGGElement;
    onBeforeCreate: (next: TLNoteShape) => {
        props: {
            growY: number;
            color: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
            size: "l" | "m" | "s" | "xl";
            font: "draw" | "mono" | "sans" | "serif";
            align: "end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start";
            verticalAlign: "end" | "middle" | "start";
            url: string;
            text: string;
        };
        type: "note";
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
    onBeforeUpdate: (prev: TLNoteShape, next: TLNoteShape) => {
        props: {
            growY: number;
            color: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
            size: "l" | "m" | "s" | "xl";
            font: "draw" | "mono" | "sans" | "serif";
            align: "end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start";
            verticalAlign: "end" | "middle" | "start";
            url: string;
            text: string;
        };
        type: "note";
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
    onEditEnd: TLOnEditEndHandler<TLNoteShape>;
}
//# sourceMappingURL=NoteShapeUtil.d.ts.map