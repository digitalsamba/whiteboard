import { T } from '@tldraw/validate';
import { SetValue } from '../util-types';
/**
 * The handle types used by tldraw's default shapes.
 *
 * @public */
export declare const TL_HANDLE_TYPES: Set<"create" | "vertex" | "virtual">;
/**
 * A type for the handle types used by tldraw's default shapes.
 *
 * @public */
export type TLHandleType = SetValue<typeof TL_HANDLE_TYPES>;
/**
 * A base interface for a shape's handles.
 *
 * @public
 */
export interface TLHandle {
    /** A unique identifier for the handle. */
    id: string;
    type: TLHandleType;
    canBind?: boolean;
    canSnap?: boolean;
    index: string;
    x: number;
    y: number;
}
/** @internal */
export declare const handleValidator: T.Validator<TLHandle>;
//# sourceMappingURL=TLHandle.d.ts.map