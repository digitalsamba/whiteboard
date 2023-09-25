/// <reference types="react" />
import { BaseBoxShapeUtil, TLVideoShape } from '@tldraw/editor';
/** @public */
export declare class VideoShapeUtil extends BaseBoxShapeUtil<TLVideoShape> {
    static type: "video";
    static props: {
        w: import("@tldraw/editor").Validator<number>;
        h: import("@tldraw/editor").Validator<number>;
        time: import("@tldraw/editor").Validator<number>;
        playing: import("@tldraw/editor").Validator<boolean>;
        url: import("@tldraw/editor").Validator<string>;
        assetId: import("@tldraw/editor").Validator<import("@tldraw/editor").TLAssetId | null>;
    };
    static migrations: import("@tldraw/editor").Migrations;
    canEdit: () => boolean;
    isAspectRatioLocked: () => boolean;
    getDefaultProps(): TLVideoShape['props'];
    component(shape: TLVideoShape): JSX.Element;
    indicator(shape: TLVideoShape): JSX.Element;
    toSvg(shape: TLVideoShape): SVGGElement;
}
//# sourceMappingURL=VideoShapeUtil.d.ts.map