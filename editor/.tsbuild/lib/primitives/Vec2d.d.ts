import { Vec2dModel } from '@tldraw/tlschema';
/** @public */
export type VecLike = Vec2d | Vec2dModel;
/** @public */
export declare class Vec2d {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    get pressure(): number;
    set(x?: number, y?: number, z?: number): this;
    setTo({ x, y, z }: VecLike): this;
    rot(r: number): this;
    rotWith(C: VecLike, r: number): this;
    clone(): Vec2d;
    sub(V: VecLike): this;
    subXY(x: number, y: number): this;
    subScalar(n: number): this;
    add(V: VecLike): this;
    addXY(x: number, y: number): this;
    addScalar(n: number): this;
    clamp(min: number, max?: number): this;
    div(t: number): this;
    divV(V: VecLike): this;
    mul(t: number): this;
    mulV(V: VecLike): this;
    abs(): this;
    nudge(B: VecLike, distance: number): this;
    neg(): this;
    cross(V: VecLike): this;
    dpr(V: VecLike): number;
    cpr(V: VecLike): number;
    len2(): number;
    len(): number;
    pry(V: VecLike): number;
    per(): this;
    uni(): Vec2d;
    tan(V: VecLike): Vec2d;
    dist(V: VecLike): number;
    distanceToLineSegment(A: VecLike, B: VecLike): number;
    slope(B: VecLike): number;
    snapToGrid(gridSize: number): this;
    angle(B: VecLike): number;
    toAngle(): number;
    lrp(B: VecLike, t: number): Vec2d;
    equals(B: VecLike): boolean;
    equalsXY(x: number, y: number): boolean;
    norm(): this;
    toFixed(): Vec2d;
    toString(): string;
    toJson(): Vec2dModel;
    toArray(): number[];
    static Add(A: VecLike, B: VecLike): Vec2d;
    static AddXY(A: VecLike, x: number, y: number): Vec2d;
    static Sub(A: VecLike, B: VecLike): Vec2d;
    static SubXY(A: VecLike, x: number, y: number): Vec2d;
    static AddScalar(A: VecLike, n: number): Vec2d;
    static SubScalar(A: VecLike, n: number): Vec2d;
    static Div(A: VecLike, t: number): Vec2d;
    static Mul(A: VecLike, t: number): Vec2d;
    static DivV(A: VecLike, B: VecLike): Vec2d;
    static MulV(A: VecLike, B: VecLike): Vec2d;
    static Neg(A: VecLike): Vec2d;
    static Per(A: VecLike): Vec2d;
    static Dist2(A: VecLike, B: VecLike): number;
    static Abs(A: VecLike): Vec2d;
    static Dist(A: VecLike, B: VecLike): number;
    static Dpr(A: VecLike, B: VecLike): number;
    static Cross(A: VecLike, V: VecLike): Vec2d;
    static Cpr(A: VecLike, B: VecLike): number;
    static Len2(A: VecLike): number;
    static Len(A: VecLike): number;
    static Pry(A: VecLike, B: VecLike): number;
    static Uni(A: VecLike): Vec2d;
    static Tan(A: VecLike, B: VecLike): Vec2d;
    static Min(A: VecLike, B: VecLike): Vec2d;
    static Max(A: VecLike, B: VecLike): Vec2d;
    static From({ x, y, z }: Vec2dModel): Vec2d;
    static FromArray(v: number[]): Vec2d;
    static Rot(A: VecLike, r?: number): Vec2d;
    static RotWith(A: VecLike, C: VecLike, r: number): Vec2d;
    /**
     * Get the nearest point on a line with a known unit vector that passes through point A
     *
     * ```ts
     * Vec.nearestPointOnLineThroughPoint(A, u, Point)
     * ```
     *
     * @param A - Any point on the line
     * @param u - The unit vector for the line.
     * @param P - A point not on the line to test.
     */
    static NearestPointOnLineThroughPoint(A: VecLike, u: VecLike, P: VecLike): Vec2d;
    static NearestPointOnLineSegment(A: VecLike, B: VecLike, P: VecLike, clamp?: boolean): Vec2d;
    static DistanceToLineThroughPoint(A: VecLike, u: VecLike, P: VecLike): number;
    static DistanceToLineSegment(A: VecLike, B: VecLike, P: VecLike, clamp?: boolean): number;
    static Snap(A: VecLike, step?: number): Vec2d;
    static Cast(A: VecLike): Vec2d;
    static Slope(A: VecLike, B: VecLike): number;
    static Angle(A: VecLike, B: VecLike): number;
    static Lrp(A: VecLike, B: VecLike, t: number): Vec2d;
    static Med(A: VecLike, B: VecLike): Vec2d;
    static Equals(A: VecLike, B: VecLike): boolean;
    static EqualsXY(A: VecLike, x: number, y: number): boolean;
    static Clockwise(A: VecLike, B: VecLike, C: VecLike): boolean;
    static Rescale(A: VecLike, n: number): Vec2d;
    static ScaleWithOrigin(A: VecLike, scale: number, origin: VecLike): Vec2d;
    static ToFixed(A: VecLike, n?: number): Vec2d;
    static Nudge(A: VecLike, B: VecLike, distance: number): Vec2d;
    static ToString(A: VecLike): string;
    static ToAngle(A: VecLike): number;
    static FromAngle(r: number, length?: number): Vec2d;
    static ToArray(A: VecLike): number[];
    static ToJson(A: VecLike): {
        x: number;
        y: number;
        z: number | undefined;
    };
    static Average(arr: VecLike[]): Vec2d;
    static Clamp(A: Vec2d, min: number, max?: number): Vec2d;
    /**
     * Get an array of points (with simulated pressure) between two points.
     *
     * @param A - The first point.
     * @param B - The second point.
     * @param steps - The number of points to return.
     */
    static PointsBetween(A: Vec2dModel, B: Vec2dModel, steps?: number): Vec2d[];
    static SnapToGrid(A: VecLike, gridSize?: number): Vec2d;
}
//# sourceMappingURL=Vec2d.d.ts.map