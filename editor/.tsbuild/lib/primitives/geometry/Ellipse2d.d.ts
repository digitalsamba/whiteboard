import { Box2d } from '../Box2d';
import { Vec2d } from '../Vec2d';
import { Edge2d } from './Edge2d';
import { Geometry2d, Geometry2dOptions } from './Geometry2d';
/** @public */
export declare class Ellipse2d extends Geometry2d {
    config: Omit<Geometry2dOptions, 'isClosed'> & {
        width: number;
        height: number;
    };
    w: number;
    h: number;
    constructor(config: Omit<Geometry2dOptions, 'isClosed'> & {
        width: number;
        height: number;
    });
    _edges?: Edge2d[];
    get edges(): Edge2d[];
    getVertices(): any[];
    nearestPoint(A: Vec2d): Vec2d;
    hitTestLineSegment(A: Vec2d, B: Vec2d, zoom: number): boolean;
    getBounds(): Box2d;
}
//# sourceMappingURL=Ellipse2d.d.ts.map