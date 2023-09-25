import { Vec2dModel } from '@tldraw/tlschema';
import { Box2d } from '../../../primitives/Box2d';
import { TLResizeHandle } from '../../types/selection-types';
import { TLBaseBoxShape } from '../BaseBoxShapeUtil';
import { TLResizeMode } from '../ShapeUtil';
/** @public */
export type ResizeBoxOptions = Partial<{
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
}>;
/** @public */
export declare function resizeBox(shape: TLBaseBoxShape, info: {
    newPoint: Vec2dModel;
    handle: TLResizeHandle;
    mode: TLResizeMode;
    scaleX: number;
    scaleY: number;
    initialBounds: Box2d;
    initialShape: TLBaseBoxShape;
}, opts?: Partial<{
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
}>): {
    x: number;
    y: number;
    props: {
        w: number;
        h: number;
    };
};
//# sourceMappingURL=resizeBox.d.ts.map