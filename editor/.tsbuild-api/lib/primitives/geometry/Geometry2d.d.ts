import { Box2d } from '../Box2d';
import { Vec2d } from '../Vec2d';
export interface Geometry2dOptions {
    isFilled: boolean;
    isClosed: boolean;
    isLabel?: boolean;
    isSnappable?: boolean;
}
/** @public */
export declare abstract class Geometry2d {
    isFilled: boolean;
    isClosed: boolean;
    isLabel: boolean;
    isSnappable: boolean;
    constructor(opts: Geometry2dOptions);
    abstract getVertices(): Vec2d[];
    abstract nearestPoint(point: Vec2d): Vec2d;
    hitTestPoint(point: Vec2d, margin?: number, hitInside?: boolean): boolean;
    distanceToPoint(point: Vec2d, hitInside?: boolean): number;
    distanceToLineSegment(A: Vec2d, B: Vec2d): number;
    hitTestLineSegment(A: Vec2d, B: Vec2d, distance?: number): boolean;
    nearestPointOnLineSegment(A: Vec2d, B: Vec2d): Vec2d;
    isPointInBounds(point: Vec2d, margin?: number): boolean;
    _vertices: undefined | Vec2d[];
    get vertices(): Vec2d[];
    get outerVertices(): Vec2d[];
    getBounds(): Box2d;
    _bounds: Box2d | undefined;
    get bounds(): Box2d;
    _snapPoints: undefined | Vec2d[];
    get snapPoints(): Vec2d[];
    get center(): Vec2d;
    _area: number | undefined;
    get area(): number;
    getArea(): number;
    toSimpleSvgPath(): string;
}
//# sourceMappingURL=Geometry2d.d.ts.map