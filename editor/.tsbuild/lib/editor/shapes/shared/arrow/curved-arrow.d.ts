import { TLArrowShape } from '@tldraw/tlschema';
import { Box2d } from '../../../../primitives/Box2d';
import { Vec2d, VecLike } from '../../../../primitives/Vec2d';
import type { Editor } from '../../../Editor';
import { TLArcInfo, TLArrowInfo } from './arrow-types';
export declare function getCurvedArrowInfo(editor: Editor, shape: TLArrowShape, extraBend?: number): TLArrowInfo;
/**
 * Get a solid path for a curved arrow's handles.
 *
 * @param info - The arrow info.
 * @public
 */
export declare function getCurvedArrowHandlePath(info: TLArrowInfo & {
    isStraight: false;
}): string;
/**
 * Get a solid path for a curved arrow's body.
 *
 * @param info - The arrow info.
 * @public
 */
export declare function getSolidCurvedArrowPath(info: TLArrowInfo & {
    isStraight: false;
}): string;
/**
 * Get a point along an arc.
 *
 * @param center - The arc's center.
 * @param radius - The arc's radius.
 * @param startAngle - The start point of the arc.
 * @param size - The size of the arc.
 * @param t - The point along the arc to get.
 */
export declare function getPointOnArc(center: VecLike, radius: number, startAngle: number, size: number, t: number): Vec2d;
/**
 * Get a bounding box for an arc.
 *
 * @param center - The arc's center.
 * @param radius - The arc's radius.
 * @param start - The start point of the arc.
 * @param size - The size of the arc.
 */
export declare function getArcBoundingBox(center: VecLike, radius: number, start: VecLike, size: number): Box2d;
/**
 * Get info about an arc formed by three points.
 *
 * @param a - The start of the arc
 * @param b - The end of the arc
 * @param c - A point on the arc
 */
export declare function getArcInfo(a: VecLike, b: VecLike, c: VecLike): TLArcInfo;
//# sourceMappingURL=curved-arrow.d.ts.map