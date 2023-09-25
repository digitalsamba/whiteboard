import { T } from '@tldraw/validate';
import { SetValue } from '../util-types';
/**
 * The cursor types used by tldraw's default shapes.
 *
 * @public */
export declare const TL_CURSOR_TYPES: Set<string>;
/**
 * A type for the cursor types used by tldraw's default shapes.
 *
 *  @public */
export type TLCursorType = SetValue<typeof TL_CURSOR_TYPES>;
/** @internal */
export declare const cursorTypeValidator: T.Validator<string>;
/**
 * A cursor used by tldraw.
 *
 *  @public */
export interface TLCursor {
    type: TLCursorType;
    rotation: number;
}
/** @internal */
export declare const cursorValidator: T.Validator<TLCursor>;
//# sourceMappingURL=TLCursor.d.ts.map