/// <reference types="react" />
import { BaseBoxShapeUtil, TLEmbedShape, TLOnResizeHandler, TLShapeUtilFlag } from '@tldraw/editor';
/** @public */
export declare class EmbedShapeUtil extends BaseBoxShapeUtil<TLEmbedShape> {
    static type: "embed";
    static props: {
        w: import("@tldraw/editor").Validator<number>;
        h: import("@tldraw/editor").Validator<number>;
        url: import("@tldraw/editor").Validator<string>;
    };
    static migrations: import("@tldraw/editor").Migrations;
    hideSelectionBoundsFg: TLShapeUtilFlag<TLEmbedShape>;
    canEdit: TLShapeUtilFlag<TLEmbedShape>;
    canUnmount: TLShapeUtilFlag<TLEmbedShape>;
    canResize: (shape: TLEmbedShape) => boolean;
    getDefaultProps(): TLEmbedShape['props'];
    isAspectRatioLocked: TLShapeUtilFlag<TLEmbedShape>;
    onResize: TLOnResizeHandler<TLEmbedShape>;
    component(shape: TLEmbedShape): JSX.Element;
    indicator(shape: TLEmbedShape): JSX.Element;
}
//# sourceMappingURL=EmbedShapeUtil.d.ts.map