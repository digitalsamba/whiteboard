import { TLBaseShape } from '@tldraw/tlschema';
import { Geometry2d } from '../../primitives/geometry/Geometry2d';
import { ShapeUtil, TLOnResizeHandler } from './ShapeUtil';
/** @public */
export type TLBaseBoxShape = TLBaseShape<string, {
    w: number;
    h: number;
}>;
/** @public */
export declare abstract class BaseBoxShapeUtil<Shape extends TLBaseBoxShape> extends ShapeUtil<Shape> {
    getGeometry(shape: Shape): Geometry2d;
    onResize: TLOnResizeHandler<any>;
}
//# sourceMappingURL=BaseBoxShapeUtil.d.ts.map