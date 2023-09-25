import { Box2d } from './Box2d';
import { Vec2d, VecLike } from './Vec2d';
/** @public */
export type MatLike = Matrix2dModel | Matrix2d;
/** @public */
export interface MatrixInfo {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
}
/** @public */
export interface Matrix2dModel {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
}
/** @public */
export declare class Matrix2d {
    constructor(a: number, b: number, c: number, d: number, e: number, f: number);
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    equals(m: Matrix2d | Matrix2dModel): boolean;
    identity(): this;
    multiply(m: Matrix2d | Matrix2dModel): this;
    rotate(r: number, cx?: number, cy?: number): Matrix2d;
    translate(x: number, y: number): Matrix2d;
    scale(x: number, y: number): this;
    invert(): this;
    applyToPoint(point: VecLike): Vec2d;
    applyToPoints(points: VecLike[]): Vec2d[];
    rotation(): number;
    point(): Vec2d;
    decomposed(): MatrixInfo;
    toCssString(): string;
    setTo(model: Matrix2dModel): this;
    decompose(): MatrixInfo;
    clone(): Matrix2d;
    static Identity(): Matrix2d;
    static Translate(x: number, y: number): Matrix2d;
    static Rotate(r: number, cx?: number, cy?: number): Matrix2d;
    static Scale: {
        (x: number, y: number): Matrix2dModel;
        (x: number, y: number, cx: number, cy: number): Matrix2dModel;
    };
    static Multiply(m1: Matrix2dModel, m2: Matrix2dModel): Matrix2dModel;
    static Inverse(m: Matrix2dModel): Matrix2dModel;
    static Absolute(m: MatLike): Matrix2dModel;
    static Compose(...matrices: MatLike[]): Matrix2d;
    static Point(m: MatLike): Vec2d;
    static Rotation(m: MatLike): number;
    static Decompose(m: MatLike): MatrixInfo;
    static Smooth(m: MatLike, precision?: number): MatLike;
    static toCssString(m: MatLike): string;
    static applyToPoint(m: MatLike, point: VecLike): Vec2d;
    static applyToXY(m: MatLike, x: number, y: number): number[];
    static applyToPoints(m: MatLike, points: VecLike[]): Vec2d[];
    static applyToBounds(m: MatLike, box: Box2d): Box2d;
    static From(m: MatLike): Matrix2d;
    static Cast(m: MatLike): Matrix2d;
}
/** @public */
export declare function decomposeMatrix2d(m: MatLike): {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
};
//# sourceMappingURL=Matrix2d.d.ts.map