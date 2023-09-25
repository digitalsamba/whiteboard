/// <reference types="react" />
import { BaseBoxShapeUtil, TLAssetId, TLBookmarkShape, TLOnBeforeCreateHandler, TLOnBeforeUpdateHandler } from '@tldraw/editor';
/** @public */
export declare class BookmarkShapeUtil extends BaseBoxShapeUtil<TLBookmarkShape> {
    static type: "bookmark";
    static props: {
        w: import("@tldraw/editor").Validator<number>;
        h: import("@tldraw/editor").Validator<number>;
        assetId: import("@tldraw/editor").Validator<null | TLAssetId>;
        url: import("@tldraw/editor").Validator<string>;
    };
    static migrations: import("@tldraw/editor").Migrations;
    canResize: () => boolean;
    hideSelectionBoundsFg: () => boolean;
    getDefaultProps(): TLBookmarkShape['props'];
    component(shape: TLBookmarkShape): JSX.Element;
    indicator(shape: TLBookmarkShape): JSX.Element;
    onBeforeCreate?: TLOnBeforeCreateHandler<TLBookmarkShape>;
    onBeforeUpdate?: TLOnBeforeUpdateHandler<TLBookmarkShape>;
}
/** @internal */
export declare const getHumanReadableAddress: (shape: TLBookmarkShape) => string;
//# sourceMappingURL=BookmarkShapeUtil.d.ts.map