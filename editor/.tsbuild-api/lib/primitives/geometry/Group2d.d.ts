import { Vec2d } from '../Vec2d';
import { Geometry2d, Geometry2dOptions } from './Geometry2d';
/** @public */
export declare class Group2d extends Geometry2d {
    children: Geometry2d[];
    constructor(config: Omit<Geometry2dOptions, 'isClosed' | 'isFilled'> & {
        children: Geometry2d[];
    });
    getVertices(): Vec2d[];
    nearestPoint(point: Vec2d): Vec2d;
    distanceToPoint(point: Vec2d, hitInside?: boolean): number;
    hitTestPoint(point: Vec2d, margin: number, hitInside: boolean): boolean;
    hitTestLineSegment(A: Vec2d, B: Vec2d, zoom: number): boolean;
    getArea(): number;
    toSimpleSvgPath(): string;
}
//# sourceMappingURL=Group2d.d.ts.map