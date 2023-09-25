/// <reference types="react" />
import { Rectangle2d, ShapeUtil, SvgExportContext, TLNoteShape, TLOnEditEndHandler } from '@tldraw/editor';
/** @public */
export declare class NoteShapeUtil extends ShapeUtil<TLNoteShape> {
    static type: "note";
    static props: {
        color: import("@tldraw/editor").EnumStyleProp<"black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red">;
        size: import("@tldraw/editor").EnumStyleProp<"s" | "m" | "l" | "xl">;
        font: import("@tldraw/editor").EnumStyleProp<"serif" | "draw" | "sans" | "mono">;
        align: import("@tldraw/editor").EnumStyleProp<"start" | "end" | "middle" | "start-legacy" | "end-legacy" | "middle-legacy">;
        verticalAlign: import("@tldraw/editor").EnumStyleProp<"start" | "end" | "middle">;
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
            color: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
            size: "s" | "m" | "l" | "xl";
            font: "serif" | "draw" | "sans" | "mono";
            align: "start" | "end" | "middle" | "start-legacy" | "end-legacy" | "middle-legacy";
            verticalAlign: "start" | "end" | "middle";
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
            color: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
            size: "s" | "m" | "l" | "xl";
            font: "serif" | "draw" | "sans" | "mono";
            align: "start" | "end" | "middle" | "start-legacy" | "end-legacy" | "middle-legacy";
            verticalAlign: "start" | "end" | "middle";
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