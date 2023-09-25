import { TLShape, Vec2dModel } from '@tldraw/tlschema';
import { Box2d } from '../../../primitives/Box2d';
export declare function resizeScaled(shape: Extract<TLShape, {
    props: {
        scale: number;
    };
}>, { initialBounds, scaleX, scaleY, newPoint, }: {
    newPoint: Vec2dModel;
    initialBounds: Box2d;
    scaleX: number;
    scaleY: number;
}): {
    x: number;
    y: number;
    props: {
        scale: number;
    };
};
//# sourceMappingURL=resizeScaled.d.ts.map