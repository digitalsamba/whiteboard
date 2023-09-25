import { Box2dModel } from '@tldraw/tlschema';
import { Vec2d, VecLike } from './Vec2d';
/** @public */
export type SelectionEdge = 'bottom' | 'left' | 'right' | 'top';
/** @public */
export type SelectionCorner = 'bottom_left' | 'bottom_right' | 'top_left' | 'top_right';
/** @public */
export type SelectionHandle = SelectionCorner | SelectionEdge;
/** @public */
export type RotateCorner = 'bottom_left_rotate' | 'bottom_right_rotate' | 'mobile_rotate' | 'top_left_rotate' | 'top_right_rotate';
/** @public */
export declare class Box2d {
    constructor(x?: number, y?: number, w?: number, h?: number);
    x: number;
    y: number;
    w: number;
    h: number;
    get point(): Vec2d;
    set point(val: Vec2d);
    get minX(): number;
    set minX(n: number);
    get midX(): number;
    get maxX(): number;
    get minY(): number;
    set minY(n: number);
    get midY(): number;
    get maxY(): number;
    get width(): number;
    set width(n: number);
    get height(): number;
    set height(n: number);
    get aspectRatio(): number;
    get center(): Vec2d;
    set center(v: Vec2d);
    get corners(): Vec2d[];
    get snapPoints(): Vec2d[];
    get sides(): Array<[Vec2d, Vec2d]>;
    get size(): Vec2d;
    toFixed(): this;
    setTo(B: Box2d): this;
    set(x?: number, y?: number, w?: number, h?: number): this;
    expand(A: Box2d): this;
    expandBy(n: number): this;
    scale(n: number): this;
    clone(): Box2d;
    translate(delta: VecLike): this;
    snapToGrid(size: number): void;
    collides(B: Box2d): boolean;
    contains(B: Box2d): boolean;
    includes(B: Box2d): boolean;
    containsPoint(V: VecLike, margin?: number): boolean;
    getHandlePoint(handle: SelectionCorner | SelectionEdge): Vec2d;
    toJson(): Box2dModel;
    resize(handle: SelectionCorner | SelectionEdge | string, dx: number, dy: number): void;
    union(box: Box2dModel): this;
    static From(box: Box2dModel): Box2d;
    static FromPoints(points: VecLike[]): Box2d;
    static Expand(A: Box2d, B: Box2d): Box2d;
    static ExpandBy(A: Box2d, n: number): Box2d;
    static Collides: (A: Box2d, B: Box2d) => boolean;
    static Contains: (A: Box2d, B: Box2d) => boolean;
    static Includes: (A: Box2d, B: Box2d) => boolean;
    static ContainsPoint: (A: Box2d, B: VecLike, margin?: number) => boolean;
    static Common: (boxes: Box2d[]) => Box2d;
    static Sides: (A: Box2d, inset?: number) => Vec2d[][];
    static Resize(box: Box2d, handle: SelectionCorner | SelectionEdge | string, dx: number, dy: number, isAspectRatioLocked?: boolean): {
        box: Box2d;
        scaleX: number;
        scaleY: number;
    };
    equals(other: Box2d | Box2dModel): boolean;
    static Equals(a: Box2d | Box2dModel, b: Box2d | Box2dModel): boolean;
    zeroFix(): this;
    static ZeroFix(other: Box2d | Box2dModel): Box2d;
}
/** @public */
export declare function flipSelectionHandleY(handle: SelectionHandle): "bottom_left" | "bottom_right" | "bottom" | "left" | "right" | "top_left" | "top_right" | "top";
/** @public */
export declare function flipSelectionHandleX(handle: SelectionHandle): "bottom_left" | "bottom_right" | "bottom" | "left" | "right" | "top_left" | "top_right" | "top";
/** @public */
export declare function rotateSelectionHandle(handle: SelectionHandle, rotation: number): SelectionHandle;
/** @public */
export declare function isSelectionCorner(selection: string): selection is SelectionCorner;
/** @public */
export declare const ROTATE_CORNER_TO_SELECTION_CORNER: {
    readonly top_left_rotate: "top_left";
    readonly top_right_rotate: "top_right";
    readonly bottom_right_rotate: "bottom_right";
    readonly bottom_left_rotate: "bottom_left";
    readonly mobile_rotate: "top_left";
};
//# sourceMappingURL=Box2d.d.ts.map