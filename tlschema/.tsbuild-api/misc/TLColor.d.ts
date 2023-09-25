import { T } from '@tldraw/validate';
import { SetValue } from '../util-types';
/**
 * The colors used by tldraw's default shapes.
 *
 *  @public */
export declare const TL_CANVAS_UI_COLOR_TYPES: Set<"accent" | "black" | "laser" | "muted-1" | "selection-fill" | "selection-stroke" | "white">;
/**
 * A type for the colors used by tldraw's default shapes.
 *
 *  @public */
export type TLCanvasUiColor = SetValue<typeof TL_CANVAS_UI_COLOR_TYPES>;
/**
 * A validator for the colors used by tldraw's default shapes.
 *
 * @public */
export declare const canvasUiColorTypeValidator: T.Validator<"accent" | "black" | "laser" | "muted-1" | "selection-fill" | "selection-stroke" | "white">;
//# sourceMappingURL=TLColor.d.ts.map