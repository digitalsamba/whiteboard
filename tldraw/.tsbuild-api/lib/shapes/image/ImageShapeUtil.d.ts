/// <reference types="react" />
import { BaseBoxShapeUtil, TLImageShape, TLOnDoubleClickHandler } from '@tldraw/editor';
/** @public */
export declare class ImageShapeUtil extends BaseBoxShapeUtil<TLImageShape> {
    static type: "image";
    static props: {
        w: import("@tldraw/editor").Validator<number>;
        h: import("@tldraw/editor").Validator<number>;
        playing: import("@tldraw/editor").Validator<boolean>;
        url: import("@tldraw/editor").Validator<string>;
        assetId: import("@tldraw/editor").Validator<import("@tldraw/editor").TLAssetId | null>;
        crop: import("@tldraw/editor").Validator<{
            topLeft: import("@tldraw/editor").Vec2dModel;
            bottomRight: import("@tldraw/editor").Vec2dModel;
        } | null>;
    };
    static migrations: import("@tldraw/editor").Migrations;
    isAspectRatioLocked: () => boolean;
    canCrop: () => boolean;
    getDefaultProps(): TLImageShape['props'];
    component(shape: TLImageShape): JSX.Element;
    indicator(shape: TLImageShape): JSX.Element | null;
    toSvg(shape: TLImageShape): Promise<SVGGElement>;
    onDoubleClick: (shape: TLImageShape) => void;
    onDoubleClickEdge: TLOnDoubleClickHandler<TLImageShape>;
}
//# sourceMappingURL=ImageShapeUtil.d.ts.map