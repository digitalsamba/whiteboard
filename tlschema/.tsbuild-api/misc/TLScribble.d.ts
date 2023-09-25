import { T } from '@tldraw/validate';
import { SetValue } from '../util-types';
import { TLCanvasUiColor } from './TLColor';
import { Vec2dModel } from './geometry-types';
/**
 * The scribble states used by tldraw.
 *
 *  @public */
export declare const TL_SCRIBBLE_STATES: Set<"active" | "paused" | "starting" | "stopping">;
/**
 * A type for the scribble used by tldraw.
 *
 * @public */
export type TLScribble = {
    points: Vec2dModel[];
    size: number;
    color: TLCanvasUiColor;
    opacity: number;
    state: SetValue<typeof TL_SCRIBBLE_STATES>;
    delay: number;
};
/** @internal */
export declare const scribbleValidator: T.Validator<TLScribble>;
//# sourceMappingURL=TLScribble.d.ts.map