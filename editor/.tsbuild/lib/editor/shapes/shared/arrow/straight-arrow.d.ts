import { TLArrowShape } from '@tldraw/tlschema';
import { Box2d } from '../../../../primitives/Box2d';
import { VecLike } from '../../../../primitives/Vec2d';
import { Editor } from '../../../Editor';
import { TLArrowInfo } from './arrow-types';
export declare function getStraightArrowInfo(editor: Editor, shape: TLArrowShape): TLArrowInfo;
/** @public */
export declare function getStraightArrowHandlePath(info: TLArrowInfo & {
    isStraight: true;
}): string;
/** @public */
export declare function getSolidStraightArrowPath(info: TLArrowInfo & {
    isStraight: true;
}): string;
/** @public */
export declare function getStraightArrowBoundingBox(start: VecLike, end: VecLike): Box2d;
//# sourceMappingURL=straight-arrow.d.ts.map