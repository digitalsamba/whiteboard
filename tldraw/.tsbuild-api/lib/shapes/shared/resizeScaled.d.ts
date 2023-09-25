import { Box2d, TLShape, Vec2dModel } from '@tldraw/editor';
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