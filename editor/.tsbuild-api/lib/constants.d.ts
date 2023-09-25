/** @internal */
export declare const MAX_SHAPES_PER_PAGE = 2000;
/** @internal */
export declare const MAX_PAGES = 40;
/** @internal */
export declare const ANIMATION_SHORT_MS = 80;
/** @internal */
export declare const ANIMATION_MEDIUM_MS = 320;
/** @internal */
export declare const ZOOMS: number[];
/** @internal */
export declare const MIN_ZOOM = 0.1;
/** @internal */
export declare const MAX_ZOOM = 8;
/** @internal */
export declare const FOLLOW_CHASE_PROPORTION = 0.5;
/** @internal */
export declare const FOLLOW_CHASE_PAN_SNAP = 0.1;
/** @internal */
export declare const FOLLOW_CHASE_PAN_UNSNAP = 0.2;
/** @internal */
export declare const FOLLOW_CHASE_ZOOM_SNAP = 0.005;
/** @internal */
export declare const FOLLOW_CHASE_ZOOM_UNSNAP = 0.05;
/** @internal */
export declare const DOUBLE_CLICK_DURATION = 450;
/** @internal */
export declare const MULTI_CLICK_DURATION = 200;
/** @internal */
export declare const COARSE_DRAG_DISTANCE = 6;
/** @internal */
export declare const DRAG_DISTANCE = 4;
/** @internal */
export declare const SVG_PADDING = 32;
/** @internal */
export declare const HASH_PATTERN_ZOOM_NAMES: Record<string, string>;
/** @internal */
export declare const DEFAULT_ANIMATION_OPTIONS: {
    duration: number;
    easing: (t: number) => number;
};
/** @internal */
export declare const CAMERA_SLIDE_FRICTION = 0.09;
/** @public */
export declare const GRID_STEPS: {
    min: number;
    mid: number;
    step: number;
}[];
/** @internal */
export declare const COLLABORATOR_INACTIVE_TIMEOUT = 60000;
/** @internal */
export declare const COLLABORATOR_IDLE_TIMEOUT = 3000;
/** @internal */
export declare const COLLABORATOR_CHECK_INTERVAL = 1200;
/**
 * Negative pointer ids are reserved for internal use.
 *
 * @internal */
export declare const INTERNAL_POINTER_IDS: {
    readonly CAMERA_MOVE: -10;
};
/** @internal */
export declare const CAMERA_MOVING_TIMEOUT = 64;
/** @internal */
export declare const CAMERA_MAX_RENDERING_INTERVAL = 620;
/** @public */
export declare const HIT_TEST_MARGIN = 8;
//# sourceMappingURL=constants.d.ts.map