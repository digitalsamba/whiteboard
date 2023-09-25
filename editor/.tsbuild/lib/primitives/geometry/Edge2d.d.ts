import { Vec2d } from '../Vec2d';
import { Geometry2d } from './Geometry2d';
/** @public */
export declare class Edge2d extends Geometry2d {
    start: Vec2d;
    end: Vec2d;
    d: Vec2d;
    u: Vec2d;
    length: number;
    constructor(config: {
        start: Vec2d;
        end: Vec2d;
        isSnappable?: boolean;
    });
    midPoint(): Vec2d;
    getVertices(): Vec2d[];
    nearestPoint(point: Vec2d): Vec2d;
    hitTestLineSegment(A: Vec2d, B: Vec2d, _zoom: number): boolean;
}
//# sourceMappingURL=Edge2d.d.ts.map