import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
/** @public */
export declare const videoShapeProps: {
    w: T.Validator<number>;
    h: T.Validator<number>;
    time: T.Validator<number>;
    playing: T.Validator<boolean>;
    url: T.Validator<string>;
    assetId: T.Validator<import("..").TLAssetId | null>;
};
/** @public */
export type TLVideoShapeProps = ShapePropsType<typeof videoShapeProps>;
/** @public */
export type TLVideoShape = TLBaseShape<'video', TLVideoShapeProps>;
/** @internal */
export declare const videoShapeMigrations: import("@tldraw/store").Migrations;
//# sourceMappingURL=TLVideoShape.d.ts.map