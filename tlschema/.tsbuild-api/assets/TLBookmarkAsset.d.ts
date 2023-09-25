import { T } from '@tldraw/validate';
import { TLBaseAsset } from './TLBaseAsset';
/**
 * An asset used for URL bookmarks, used by the TLBookmarkShape.
 *
 *  @public */
export type TLBookmarkAsset = TLBaseAsset<'bookmark', {
    title: string;
    description: string;
    image: string;
    src: null | string;
}>;
/** @internal */
export declare const bookmarkAssetValidator: T.Validator<TLBookmarkAsset>;
/** @internal */
export declare const bookmarkAssetMigrations: import("@tldraw/store").Migrations;
//# sourceMappingURL=TLBookmarkAsset.d.ts.map