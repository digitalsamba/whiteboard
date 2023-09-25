import { TLArrowShape, TLArrowShapeTerminal, TLShape } from '@tldraw/tlschema';
import { Matrix2d } from '../../../../primitives/Matrix2d';
import { Vec2d } from '../../../../primitives/Vec2d';
import { Editor } from '../../../Editor';
export declare function getIsArrowStraight(shape: TLArrowShape): boolean;
export type BoundShapeInfo<T extends TLShape = TLShape> = {
    shape: T;
    didIntersect: boolean;
    isExact: boolean;
    isClosed: boolean;
    transform: Matrix2d;
    outline: Vec2d[];
};
export declare function getBoundShapeInfoForTerminal(editor: Editor, terminal: TLArrowShapeTerminal): BoundShapeInfo | undefined;
export declare function getArrowTerminalInArrowSpace(editor: Editor, arrowPageTransform: Matrix2d, terminal: TLArrowShapeTerminal): Vec2d;
/** @public */
export declare function getArrowTerminalsInArrowSpace(editor: Editor, shape: TLArrowShape): {
    start: Vec2d;
    end: Vec2d;
};
/** @internal */
export declare const MIN_ARROW_LENGTH = 48;
/** @internal */
export declare const BOUND_ARROW_OFFSET = 10;
/** @internal */
export declare const WAY_TOO_BIG_ARROW_BEND_FACTOR = 10;
/** @public */
export declare const STROKE_SIZES: Record<string, number>;
//# sourceMappingURL=shared.d.ts.map