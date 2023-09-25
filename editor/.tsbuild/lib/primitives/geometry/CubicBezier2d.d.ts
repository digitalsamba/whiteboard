import { Vec2d } from '../Vec2d';
import { Geometry2dOptions } from './Geometry2d';
import { Polyline2d } from './Polyline2d';
/** @public */
export declare class CubicBezier2d extends Polyline2d {
    a: Vec2d;
    b: Vec2d;
    c: Vec2d;
    d: Vec2d;
    constructor(config: Omit<Geometry2dOptions, 'isFilled' | 'isClosed'> & {
        start: Vec2d;
        cp1: Vec2d;
        cp2: Vec2d;
        end: Vec2d;
    });
    getVertices(): Vec2d[];
    midPoint(): Vec2d;
    nearestPoint(A: Vec2d): Vec2d;
}
//# sourceMappingURL=CubicBezier2d.d.ts.map