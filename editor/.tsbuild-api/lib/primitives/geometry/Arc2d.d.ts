import { Vec2d } from '../Vec2d';
import { Geometry2d, Geometry2dOptions } from './Geometry2d';
/** @public */
export declare class Arc2d extends Geometry2d {
    _center: Vec2d;
    radius: number;
    start: Vec2d;
    end: Vec2d;
    measure: number;
    length: number;
    angleStart: number;
    angleEnd: number;
    constructor(config: Omit<Geometry2dOptions, 'isClosed' | 'isFilled'> & {
        center: Vec2d;
        radius: number;
        start: Vec2d;
        end: Vec2d;
        sweepFlag: number;
        largeArcFlag: number;
    });
    nearestPoint(point: Vec2d): Vec2d;
    hitTestLineSegment(A: Vec2d, B: Vec2d, _zoom: number): boolean;
    getVertices(): Vec2d[];
}
//# sourceMappingURL=Arc2d.d.ts.map