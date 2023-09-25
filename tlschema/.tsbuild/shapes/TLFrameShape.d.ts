import { T } from '@tldraw/validate';
import { ShapePropsType, TLBaseShape } from './TLBaseShape';
/** @public */
export declare const frameShapeProps: {
    w: T.Validator<number>;
    h: T.Validator<number>;
    name: T.Validator<string>;
};
type TLFrameShapeProps = ShapePropsType<typeof frameShapeProps>;
/** @public */
export type TLFrameShape = TLBaseShape<'frame', TLFrameShapeProps>;
/** @internal */
export declare const frameShapeMigrations: import("@tldraw/store").Migrations;
export {};
//# sourceMappingURL=TLFrameShape.d.ts.map