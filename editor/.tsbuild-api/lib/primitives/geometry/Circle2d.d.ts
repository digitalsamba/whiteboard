import { Box2d } from '../Box2d';
import { Vec2d } from '../Vec2d';
import { Geometry2d, Geometry2dOptions } from './Geometry2d';
/** @public */
export declare class Circle2d extends Geometry2d {
    config: Omit<Geometry2dOptions, 'isClosed'> & {
        x?: number;
        y?: number;
        radius: number;
        isFilled: boolean;
    };
    _center: Vec2d;
    radius: number;
    x: number;
    y: number;
    constructor(config: Omit<Geometry2dOptions, 'isClosed'> & {
        x?: number;
        y?: number;
        radius: number;
        isFilled: boolean;
    });
    getBounds(): Box2d;
    getVertices(): Vec2d[];
    nearestPoint(point: Vec2d): Vec2d;
    hitTestLineSegment(A: Vec2d, B: Vec2d, _zoom: number): boolean;
}
//# sourceMappingURL=Circle2d.d.ts.map