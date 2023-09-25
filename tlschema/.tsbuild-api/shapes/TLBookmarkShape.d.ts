import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
/** @public */
export declare const bookmarkShapeProps: {
    w: T.Validator<number>;
    h: T.Validator<number>;
    assetId: T.Validator<import("..").TLAssetId | null>;
    url: T.Validator<string>;
};
/** @public */
export type TLBookmarkShapeProps = ShapePropsType<typeof bookmarkShapeProps>;
/** @public */
export type TLBookmarkShape = TLBaseShape<'bookmark', TLBookmarkShapeProps>;
/** @internal */
export declare const bookmarkShapeMigrations: import("@tldraw/store").Migrations;
//# sourceMappingURL=TLBookmarkShape.d.ts.map