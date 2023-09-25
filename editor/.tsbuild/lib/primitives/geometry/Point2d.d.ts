import { Vec2d } from '../Vec2d';
import { Geometry2d, Geometry2dOptions } from './Geometry2d';
/** @public */
export declare class Point2d extends Geometry2d {
    point: Vec2d;
    constructor(config: Omit<Geometry2dOptions, 'isClosed' | 'isFilled'> & {
        margin: number;
        point: Vec2d;
    });
    getVertices(): Vec2d[];
    nearestPoint(): Vec2d;
    hitTestLineSegment(A: Vec2d, B: Vec2d, margin: number): boolean;
}
//# sourceMappingURL=Point2d.d.ts.map