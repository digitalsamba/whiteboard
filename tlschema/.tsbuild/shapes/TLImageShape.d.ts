import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
/** @public */
export declare const ImageShapeCrop: T.ObjectValidator<{
    topLeft: import("../misc/geometry-types").Vec2dModel;
    bottomRight: import("../misc/geometry-types").Vec2dModel;
}>;
/** @public */
export type TLImageShapeCrop = T.TypeOf<typeof ImageShapeCrop>;
/** @public */
export declare const imageShapeProps: {
    w: T.Validator<number>;
    h: T.Validator<number>;
    playing: T.Validator<boolean>;
    url: T.Validator<string>;
    assetId: T.Validator<import("..").TLAssetId | null>;
    crop: T.Validator<{
        topLeft: import("../misc/geometry-types").Vec2dModel;
        bottomRight: import("../misc/geometry-types").Vec2dModel;
    } | null>;
};
/** @public */
export type TLImageShapeProps = ShapePropsType<typeof imageShapeProps>;
/** @public */
export type TLImageShape = TLBaseShape<'image', TLImageShapeProps>;
/** @internal */
export declare const imageShapeMigrations: import("@tldraw/store").Migrations;
//# sourceMappingURL=TLImageShape.d.ts.map