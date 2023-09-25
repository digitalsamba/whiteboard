import { T } from '@tldraw/validate';
import { SetValue } from '../util-types';
/**
 * The colors used by tldraw's default shapes.
 *
 *  @public */
export declare const TL_CANVAS_UI_COLOR_TYPES: Set<"accent" | "white" | "black" | "selection-stroke" | "selection-fill" | "laser" | "muted-1">;
/**
 * A type for the colors used by tldraw's default shapes.
 *
 *  @public */
export type TLCanvasUiColor = SetValue<typeof TL_CANVAS_UI_COLOR_TYPES>;
/**
 * A validator for the colors used by tldraw's default shapes.
 *
 * @public */
export declare const canvasUiColorTypeValidator: T.Validator<"accent" | "white" | "black" | "selection-stroke" | "selection-fill" | "laser" | "muted-1">;
//# sourceMappingURL=TLColor.d.ts.map