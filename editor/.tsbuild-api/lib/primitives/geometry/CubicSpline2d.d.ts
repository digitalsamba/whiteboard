import { Vec2d } from '../Vec2d';
import { CubicBezier2d } from './CubicBezier2d';
import { Geometry2d, Geometry2dOptions } from './Geometry2d';
/** @public */
export declare class CubicSpline2d extends Geometry2d {
    points: Vec2d[];
    constructor(config: Omit<Geometry2dOptions, 'isClosed' | 'isFilled'> & {
        points: Vec2d[];
    });
    _segments?: CubicBezier2d[];
    get segments(): CubicBezier2d[];
    _length?: number;
    get length(): number;
    getVertices(): Vec2d[];
    nearestPoint(A: Vec2d): Vec2d;
    hitTestLineSegment(A: Vec2d, B: Vec2d, zoom: number): boolean;
}
//# sourceMappingURL=CubicSpline2d.d.ts.map