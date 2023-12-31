/// <reference types="react" />

import { Atom } from '@tldraw/state';
import { atom } from '@tldraw/state';
import { Box2dModel } from '@tldraw/tlschema';
import { ComponentType } from 'react';
import { Computed } from '@tldraw/state';
import { computed } from '@tldraw/state';
import { ComputedCache } from '@tldraw/store';
import { EmbedDefinition } from '@tldraw/tlschema';
import { EMPTY_ARRAY } from '@tldraw/state';
import { EventEmitter } from 'eventemitter3';
import { HistoryEntry } from '@tldraw/store';
import { HTMLProps } from 'react';
import { JsonObject } from '@tldraw/utils';
import { MemoExoticComponent } from 'react';
import { Migrations } from '@tldraw/store';
import { NamedExoticComponent } from 'react';
import { PointerEventHandler } from 'react';
import { react } from '@tldraw/state';
import { default as React_2 } from 'react';
import * as React_3 from 'react';
import { SerializedSchema } from '@tldraw/store';
import { SerializedStore } from '@tldraw/store';
import { ShapeProps } from '@tldraw/tlschema';
import { Signal } from '@tldraw/state';
import { StoreSchema } from '@tldraw/store';
import { StoreSnapshot } from '@tldraw/store';
import { StyleProp } from '@tldraw/tlschema';
import { TLArrowShape } from '@tldraw/tlschema';
import { TLArrowShapeArrowheadStyle } from '@tldraw/tlschema';
import { TLAsset } from '@tldraw/tlschema';
import { TLAssetId } from '@tldraw/tlschema';
import { TLAssetPartial } from '@tldraw/tlschema';
import { TLBaseShape } from '@tldraw/tlschema';
import { TLBookmarkAsset } from '@tldraw/tlschema';
import { TLCamera } from '@tldraw/tlschema';
import { TLCursor } from '@tldraw/tlschema';
import { TLCursorType } from '@tldraw/tlschema';
import { TLDefaultHorizontalAlignStyle } from '@tldraw/tlschema';
import { TLDocument } from '@tldraw/tlschema';
import { TLGroupShape } from '@tldraw/tlschema';
import { TLHandle } from '@tldraw/tlschema';
import { TLImageAsset } from '@tldraw/tlschema';
import { TLInstance } from '@tldraw/tlschema';
import { TLInstancePageState } from '@tldraw/tlschema';
import { TLInstancePresence } from '@tldraw/tlschema';
import { TLPage } from '@tldraw/tlschema';
import { TLPageId } from '@tldraw/tlschema';
import { TLParentId } from '@tldraw/tlschema';
import { TLRecord } from '@tldraw/tlschema';
import { TLScribble } from '@tldraw/tlschema';
import { TLShape } from '@tldraw/tlschema';
import { TLShapeId } from '@tldraw/tlschema';
import { TLShapePartial } from '@tldraw/tlschema';
import { TLStore } from '@tldraw/tlschema';
import { TLStoreProps } from '@tldraw/tlschema';
import { TLUnknownShape } from '@tldraw/tlschema';
import { TLVideoAsset } from '@tldraw/tlschema';
import { track } from '@tldraw/state';
import { transact } from '@tldraw/state';
import { transaction } from '@tldraw/state';
import { UnknownRecord } from '@tldraw/store';
import { useComputed } from '@tldraw/state';
import { useQuickReactor } from '@tldraw/state';
import { useReactor } from '@tldraw/state';
import { useValue } from '@tldraw/state';
import { Vec2dModel } from '@tldraw/tlschema';
import { whyAmIRunning } from '@tldraw/state';

/**
 * Get the short distance between two angles.
 *
 * @param a0 - The first angle.
 * @param a1 - The second angle.
 * @public
 */
export declare function angleDelta(a0: number, a1: number): number;

/* Excluded from this release type: ANIMATION_MEDIUM_MS */

/* Excluded from this release type: ANIMATION_SHORT_MS */

/* Excluded from this release type: applyRotationToSnapshotShapes */

/**
 * Whether two numbers numbers a and b are approximately equal.
 *
 * @param a - The first point.
 * @param b - The second point.
 * @public
 */
export declare function approximately(a: number, b: number, precision?: number): boolean;

/** @public */
export declare class Arc2d extends Geometry2d {
    _center: Vec2d;
    radius: number;
    start: Vec2d;
    end: Vec2d;
    measure: number;
    length: number;
    angleStart: number;
    angleEnd: number;
    constructor(config: Omit<Geometry2dOptions, 'isClosed' | 'isFilled'> & {
        center: Vec2d;
        radius: number;
        start: Vec2d;
        end: Vec2d;
        sweepFlag: number;
        largeArcFlag: number;
    });
    nearestPoint(point: Vec2d): Vec2d;
    hitTestLineSegment(A: Vec2d, B: Vec2d, _zoom: number): boolean;
    getVertices(): Vec2d[];
}

/**
 * Checks whether two angles are approximately at right-angles or parallel to each other
 *
 * @param a - Angle a (radians)
 * @param b - Angle b (radians)
 * @returns True iff the angles are approximately at right-angles or parallel to each other
 * @public
 */
export declare function areAnglesCompatible(a: number, b: number): boolean;

export { Atom }

export { atom }

/** @public */
export declare function average(A: VecLike, B: VecLike): string;

/** @public */
export declare abstract class BaseBoxShapeTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Idle | typeof Pointing)[];
    abstract shapeType: string;
}

/** @public */
export declare abstract class BaseBoxShapeUtil<Shape extends TLBaseBoxShape> extends ShapeUtil<Shape> {
    getGeometry(shape: Shape): Geometry2d;
    onResize: TLOnResizeHandler<any>;
}

declare interface BaseEditorComponents {
    Background: TLBackgroundComponent;
    SvgDefs: TLSvgDefsComponent;
    Brush: TLBrushComponent;
    ZoomBrush: TLBrushComponent;
    Cursor: TLCursorComponent;
    CollaboratorBrush: TLBrushComponent;
    CollaboratorCursor: TLCursorComponent;
    CollaboratorHint: TLCollaboratorHintComponent;
    CollaboratorShapeIndicator: TLShapeIndicatorComponent;
    Grid: TLGridComponent;
    Scribble: TLScribbleComponent;
    CollaboratorScribble: TLScribbleComponent;
    SnapLine: TLSnapLineComponent;
    Handles: TLHandlesComponent;
    Handle: TLHandleComponent;
    Spinner: TLSpinnerComponent;
    SelectionForeground: TLSelectionForegroundComponent;
    SelectionBackground: TLSelectionBackgroundComponent;
    HoveredShapeIndicator: TLHoveredShapeIndicatorComponent;
}

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

/* Excluded from this release type: CAMERA_SLIDE_FRICTION */

/**
 * @param a - Any angle in radians
 * @returns A number between 0 and 2 * PI
 * @public
 */
export declare function canonicalizeRotation(a: number): number;

/** @public */
export declare const Canvas: React_2.MemoExoticComponent<({ className }: {
    className?: string | undefined;
}) => JSX.Element>;

/** @public */
export declare class Circle2d extends Geometry2d {
    config: Omit<Geometry2dOptions, 'isClosed'> & {
        x?: number;
        y?: number;
        radius: number;
        isFilled: boolean;
    };
    _center: Vec2d;
    radius: number;
    x: number;
    y: number;
    constructor(config: Omit<Geometry2dOptions, 'isClosed'> & {
        x?: number;
        y?: number;
        radius: number;
        isFilled: boolean;
    });
    getBounds(): Box2d;
    getVertices(): Vec2d[];
    nearestPoint(point: Vec2d): Vec2d;
    hitTestLineSegment(A: Vec2d, B: Vec2d, _zoom: number): boolean;
}

/**
 * Clamp a value into a range.
 *
 * @example
 *
 * ```ts
 * const A = clamp(0, 1) // 1
 * ```
 *
 * @param n - The number to clamp.
 * @param min - The minimum value.
 * @public
 */
export declare function clamp(n: number, min: number): number;

/**
 * Clamp a value into a range.
 *
 * @example
 *
 * ```ts
 * const A = clamp(0, 1, 10) // 1
 * const B = clamp(11, 1, 10) // 10
 * const C = clamp(5, 1, 10) // 5
 * ```
 *
 * @param n - The number to clamp.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @public
 */
export declare function clamp(n: number, min: number, max: number): number;

/**
 * Clamp radians within 0 and 2PI
 *
 * @param r - The radian value.
 * @public
 */
export declare function clampRadians(r: number): number;

declare class ClickManager {
    editor: Editor;
    constructor(editor: Editor);
    private _clickId;
    private _clickTimeout?;
    private _clickScreenPoint?;
    private _previousScreenPoint?;
    private _getClickTimeout;
    /* Excluded from this release type: _clickState */
    /**
     * The current click state.
     *
     * @public
     */
    get clickState(): TLClickState | undefined;
    lastPointerInfo: TLPointerEventInfo;
    /**
     * Start the double click timeout.
     *
     * @param info - The event info.
     */
    transformPointerDownEvent: (info: TLPointerEventInfo) => TLClickEventInfo | TLPointerEventInfo;
    /**
     * Emit click_up events on pointer up.
     *
     * @param info - The event info.
     */
    transformPointerUpEvent: (info: TLPointerEventInfo) => TLClickEventInfo | TLPointerEventInfo;
    /* Excluded from this release type: cancelDoubleClickTimeout */
    /* Excluded from this release type: handleMove */
}

declare type CommandFn<Data> = (...args: any[]) => ({
    data: Data;
} & TLCommandHistoryOptions) | null | undefined | void;

export { computed }

/** @public */
export declare const coreShapes: readonly [typeof GroupShapeUtil];

/**
 * Creates a signal of the instance state for a given store.
 * @public
 * @param store - The store to create the instance state snapshot signal for
 * @returns
 */
export declare function createSessionStateSnapshotSignal(store: TLStore): Signal<null | TLSessionStateSnapshot>;

/**
 * A helper for creating a TLStore. Custom shapes cannot override default shapes.
 *
 * @param opts - Options for creating the store.
 *
 * @public */
export declare function createTLStore({ initialData, defaultName, ...rest }: TLStoreOptions): TLStore;

/** @public */
export declare function createTLUser(opts?: {
    /* Excluded from this release type: derivePresenceState */
    userPreferences?: Signal<TLUserPreferences, unknown> | undefined;
    setUserPreferences?: ((userPreferences: TLUserPreferences) => void) | undefined;
}): TLUser;

/** @public */
export declare class CubicBezier2d extends Polyline2d {
    a: Vec2d;
    b: Vec2d;
    c: Vec2d;
    d: Vec2d;
    constructor(config: Omit<Geometry2dOptions, 'isClosed' | 'isFilled'> & {
        start: Vec2d;
        cp1: Vec2d;
        cp2: Vec2d;
        end: Vec2d;
    });
    getVertices(): Vec2d[];
    midPoint(): Vec2d;
    nearestPoint(A: Vec2d): Vec2d;
}

/** @public */
export declare class CubicSpline2d extends Geometry2d {
    points: Vec2d[];
    constructor(config: Omit<Geometry2dOptions, 'isClosed' | 'isFilled'> & {
        points: Vec2d[];
    });
    _segments?: CubicBezier2d[];
    get segments(): CubicBezier2d[];
    _length?: number;
    get length(): number;
    getVertices(): Vec2d[];
    nearestPoint(A: Vec2d): Vec2d;
    hitTestLineSegment(A: Vec2d, B: Vec2d, zoom: number): boolean;
}

/** @public */
export declare function dataUrlToFile(url: string, filename: string, mimeType: string): Promise<File>;

/* Excluded from this release type: DebugFlag */

/* Excluded from this release type: DebugFlagDef */

/* Excluded from this release type: debugFlags */

/* Excluded from this release type: DEFAULT_ANIMATION_OPTIONS */

/** @public */
export declare function DefaultBackground(): JSX.Element;

/** @public */
export declare const DefaultBrush: TLBrushComponent;

/** @public */
export declare const DefaultCollaboratorHint: TLCollaboratorHintComponent;

/** @public */
export declare const DefaultCursor: NamedExoticComponent<    {
className?: string | undefined;
point: null | Vec2dModel;
zoom: number;
color?: string | undefined;
name: null | string;
chatMessage: string;
}>;

/** @public */
export declare const DefaultErrorFallback: TLErrorFallbackComponent;

/** @public */
export declare const DefaultGrid: TLGridComponent;

/** @public */
export declare const DefaultHandle: TLHandleComponent;

/** @public */
export declare const DefaultHandles: TLHandlesComponent;

/** @public */
export declare const DefaultHoveredShapeIndicator: TLHoveredShapeIndicatorComponent;

declare interface Defaults<T> {
    development?: T;
    staging?: T;
    production?: T;
    all: T;
}

/** @public */
export declare const DefaultScribble: TLScribbleComponent;

/** @public */
export declare const DefaultSelectionBackground: TLSelectionBackgroundComponent;

/** @public */
export declare const DefaultSelectionForeground: TLSelectionForegroundComponent;

/** @public */
export declare const DefaultSnapLine: TLSnapLineComponent;

/** @public */
export declare const DefaultSpinner: TLSpinnerComponent;

/** @public */
export declare const DefaultSvgDefs: () => null;

/**
 * Convert degrees to radians.
 *
 * @param d - The degree in degrees.
 * @public
 */
export declare function degreesToRadians(d: number): number;

/* Excluded from this release type: DOUBLE_CLICK_DURATION */

/* Excluded from this release type: DRAG_DISTANCE */

/** @public */
export declare const EASINGS: {
    readonly linear: (t: number) => number;
    readonly easeInQuad: (t: number) => number;
    readonly easeOutQuad: (t: number) => number;
    readonly easeInOutQuad: (t: number) => number;
    readonly easeInCubic: (t: number) => number;
    readonly easeOutCubic: (t: number) => number;
    readonly easeInOutCubic: (t: number) => number;
    readonly easeInQuart: (t: number) => number;
    readonly easeOutQuart: (t: number) => number;
    readonly easeInOutQuart: (t: number) => number;
    readonly easeInQuint: (t: number) => number;
    readonly easeOutQuint: (t: number) => number;
    readonly easeInOutQuint: (t: number) => number;
    readonly easeInSine: (t: number) => number;
    readonly easeOutSine: (t: number) => number;
    readonly easeInOutSine: (t: number) => number;
    readonly easeInExpo: (t: number) => number;
    readonly easeOutExpo: (t: number) => number;
    readonly easeInOutExpo: (t: number) => number;
};

/** @public */
export declare class Edge2d extends Geometry2d {
    start: Vec2d;
    end: Vec2d;
    d: Vec2d;
    u: Vec2d;
    length: number;
    constructor(config: {
        start: Vec2d;
        end: Vec2d;
        isSnappable?: boolean;
    });
    midPoint(): Vec2d;
    getVertices(): Vec2d[];
    nearestPoint(point: Vec2d): Vec2d;
    hitTestLineSegment(A: Vec2d, B: Vec2d, _zoom: number): boolean;
}

/** @public */
export declare class Editor extends EventEmitter<TLEventMap> {
    constructor({ store, user, shapeUtils, tools, getContainer, initialState }: TLEditorOptions);
    /**
     * The editor's store
     *
     * @public
     */
    readonly store: TLStore;
    /**
     * The root state of the statechart.
     *
     * @public
     */
    readonly root: RootState;
    /**
     * A set of functions to call when the app is disposed.
     *
     * @public
     */
    readonly disposables: Set<() => void>;
    /* Excluded from this release type: _tickManager */
    /**
     * A manager for the app's snapping feature.
     *
     * @public
     */
    readonly snaps: SnapManager;
    /**
     * A manager for the user and their preferences.
     *
     * @public
     */
    readonly user: UserPreferencesManager;
    /**
     * A helper for measuring text.
     *
     * @public
     */
    readonly textMeasure: TextManager;
    /**
     * A manager for the editor's environment.
     *
     * @public
     */
    readonly environment: EnvironmentManager;
    /**
     * The current HTML element containing the editor.
     *
     * @example
     * ```ts
     * const container = editor.getContainer()
     * ```
     *
     * @public
     */
    getContainer: () => HTMLElement;
    /**
     * A manager for side effects and correct state enforcement.
     *
     * @public
     */
    readonly sideEffects: SideEffectManager<this>;
    /**
     * Dispose the editor.
     *
     * @public
     */
    dispose(): void;
    /**
     * A map of shape utility classes (TLShapeUtils) by shape type.
     *
     * @public
     */
    shapeUtils: {
        readonly [K in string]?: ShapeUtil<TLUnknownShape>;
    };
    styleProps: {
        [key: string]: Map<StyleProp<unknown>, string>;
    };
    /**
     * Get a shape util from a shape itself.
     *
     * @example
     * ```ts
     * const util = editor.getShapeUtil(myArrowShape)
     * const util = editor.getShapeUtil('arrow')
     * const util = editor.getShapeUtil<TLArrowShape>(myArrowShape)
     * const util = editor.getShapeUtil(TLArrowShape)('arrow')
     * ```
     *
     * @param shape - A shape, shape partial, or shape type.
     *
     * @public
     */
    getShapeUtil<S extends TLUnknownShape>(shape: S | TLShapePartial<S>): ShapeUtil<S>;
    getShapeUtil<S extends TLUnknownShape>(type: S['type']): ShapeUtil<S>;
    getShapeUtil<T extends ShapeUtil>(type: T extends ShapeUtil<infer R> ? R['type'] : string): T;
    /**
     * A manager for the app's history.
     *
     * @readonly
     */
    readonly history: HistoryManager<this>;
    /**
     * Undo to the last mark.
     *
     * @example
     * ```ts
     * editor.undo()
     * ```
     *
     * @public
     */
    undo(): this;
    /**
     * Whether the app can undo.
     *
     * @public
     */
    get canUndo(): boolean;
    /**
     * Redo to the next mark.
     *
     * @example
     * ```ts
     * editor.redo()
     * ```
     *
     * @public
     */
    redo(): this;
    /**
     * Whether the app can redo.
     *
     * @public
     */
    get canRedo(): boolean;
    /**
     * Create a new "mark", or stopping point, in the undo redo history. Creating a mark will clear
     * any redos.
     *
     * @example
     * ```ts
     * editor.mark()
     * editor.mark('flip shapes')
     * ```
     *
     * @param markId - The mark's id, usually the reason for adding the mark.
     * @param onUndo - (optional) Whether to stop at the mark when undoing.
     * @param onRedo - (optional) Whether to stop at the mark when redoing.
     *
     * @public
     */
    mark(markId?: string, onUndo?: boolean, onRedo?: boolean): this;
    /**
     * Clear all marks in the undo stack back to the next mark.
     *
     * @example
     * ```ts
     * editor.bail()
     * ```
     *
     * @public
     */
    bail(): this;
    /**
     * Clear all marks in the undo stack back to the mark with the provided mark id.
     *
     * @example
     * ```ts
     * editor.bailToMark('dragging')
     * ```
     *
     * @public
     */
    bailToMark(id: string): this;
    /**
     * Run a function in a batch, which will be undone/redone as a single action.
     *
     * @example
     * ```ts
     * editor.batch(() => {
     * 	editor.selectAll()
     * 	editor.deleteShapes(editor.selectedShapeIds)
     * 	editor.createShapes(myShapes)
     * 	editor.selectNone()
     * })
     *
     * editor.undo() // will undo all of the above
     * ```
     *
     * @public
     */
    batch(fn: () => void): this;
    /* Excluded from this release type: _arrowBindingsIndex */
    /**
     * Get all arrows bound to a shape.
     *
     * @param shapeId - The id of the shape.
     *
     * @public
     */
    getArrowsBoundTo(shapeId: TLShapeId): {
        arrowId: TLShapeId;
        handleId: "end" | "start";
    }[];
    private get arrowInfoCache();
    /**
     * Get cached info about an arrow.
     *
     * @example
     * ```ts
     * const arrowInfo = editor.getArrowInfo(myArrow)
     * ```
     *
     * @param shape - The shape (or shape id) of the arrow to get the info for.
     *
     * @public
     */
    getArrowInfo(shape: TLArrowShape | TLShapeId): TLArrowInfo | undefined;
    /* Excluded from this release type: annotateError */
    /* Excluded from this release type: createErrorAnnotations */
    /* Excluded from this release type: _crashingError */
    /* Excluded from this release type: crashingError */
    /* Excluded from this release type: crash */
    /**
     * Get whether a certain tool (or other state node) is currently active.
     *
     * @example
     * ```ts
     * editor.isIn('select')
     * editor.isIn('select.brushing')
     * ```
     *
     * @param path - The path of active states, separated by periods.
     *
     * @public
     */
    isIn(path: string): boolean;
    /**
     * Get whether the state node is in any of the given active paths.
     *
     * @example
     * ```ts
     * state.isInAny('select', 'erase')
     * state.isInAny('select.brushing', 'erase.idle')
     * ```
     *
     * @public
     */
    isInAny(...paths: string[]): boolean;
    /**
     * Set the selected tool.
     *
     * @example
     * ```ts
     * editor.setCurrentTool('hand')
     * editor.setCurrentTool('hand', { date: Date.now() })
     * ```
     *
     * @param id - The id of the tool to select.
     * @param info - Arbitrary data to pass along into the transition.
     *
     * @public
     */
    setCurrentTool(id: string, info?: {}): this;
    /**
     * The current selected tool.
     *
     * @public
     */
    get currentTool(): StateNode | undefined;
    /**
     * The id of the current selected tool.
     *
     * @public
     */
    get currentToolId(): string;
    /**
     * Get a descendant by its path.
     *
     * @example
     * ```ts
     * state.getStateDescendant('select')
     * state.getStateDescendant('select.brushing')
     * ```
     *
     * @param path - The descendant's path of state ids, separated by periods.
     *
     * @public
     */
    getStateDescendant(path: string): StateNode | undefined;
    /**
     * The global document settings that apply to all users.
     *
     * @public
     **/
    get documentSettings(): TLDocument;
    /**
     * Update the global document settings that apply to all users.
     *
     * @public
     **/
    updateDocumentSettings(settings: Partial<TLDocument>): this;
    /**
     * The current instance's state.
     *
     * @public
     */
    get instanceState(): TLInstance;
    /**
     * Update the instance's state.
     *
     * @param partial - A partial object to update the instance state with.
     * @param historyOptions - (optional) The history options for the change.
     *
     * @public
     */
    updateInstanceState(partial: Partial<Omit<TLInstance, 'currentPageId'>>, historyOptions?: TLCommandHistoryOptions): this;
    /* Excluded from this release type: _updateInstanceState */
    /* Excluded from this release type: _isChangingStyleTimeout */
    /**
     * A set of strings representing any open menus. When menus are open,
     * certain interactions will behave differently; for example, when a
     * draw tool is selected and a menu is open, a pointer-down will not
     * create a dot (because the user is probably trying to close the menu)
     * however a pointer-down event followed by a drag will begin drawing
     * a line (because the user is BOTH trying to close the menu AND start
     * drawing a line).
     *
     * @public
     */
    get openMenus(): string[];
    /**
     * Add an open menu.
     *
     * @example
     * ```ts
     * editor.addOpenMenu('menu-id')
     * ```
     *
     * @public
     */
    addOpenMenu(id: string): this;
    /**
     * Delete an open menu.
     *
     * @example
     * ```ts
     * editor.deleteOpenMenu('menu-id')
     * ```
     *
     * @public
     */
    deleteOpenMenu(id: string): this;
    /**
     * Get whether any menus are open.
     *
     * @example
     * ```ts
     * editor.isMenuOpen()
     * ```
     *
     * @public
     */
    get isMenuOpen(): boolean;
    /**
     * Set the cursor.
     *
     * @param type - The cursor type.
     * @param rotation - The cursor rotation.
     *
     * @public
     */
    setCursor: (cursor: Partial<TLCursor>) => this;
    /**
     * Page states.
     *
     * @public
     */
    get pageStates(): TLInstancePageState[];
    /* Excluded from this release type: _pageStates */
    /**
     * The current page state.
     *
     * @public
     */
    get currentPageState(): TLInstancePageState;
    /* Excluded from this release type: _currentPageStateId */
    /**
     * Update this instance's page state.
     *
     * @example
     * ```ts
     * editor.updateInstancePageState({ id: 'page1', editingShapeId: 'shape:123' })
     * editor.updateInstancePageState({ id: 'page1', editingShapeId: 'shape:123' }, { ephemeral: true })
     * ```
     *
     * @param partial - The partial of the page state object containing the changes.
     * @param historyOptions - (optional) The history options for the change.
     *
     * @public
     */
    updateCurrentPageState(partial: Partial<Omit<TLInstancePageState, 'editingShapeId' | 'focusedGroupId' | 'pageId' | 'selectedShapeIds'>>, historyOptions?: TLCommandHistoryOptions): this;
    /* Excluded from this release type: _setInstancePageState */
    /**
     * The current selected ids.
     *
     * @public
     */
    get selectedShapeIds(): TLShapeId[];
    /**
     * An array containing all of the currently selected shapes.
     *
     * @example
     * ```ts
     * editor.selectedShapes
     * ```
     *
     * @public
     * @readonly
     */
    get selectedShapes(): TLShape[];
    /**
     * Select one or more shapes.
     *
     * @example
     * ```ts
     * editor.setSelectedShapes(['id1'])
     * editor.setSelectedShapes(['id1', 'id2'])
     * ```
     *
     * @param ids - The ids to select.
     * @param historyOptions - The history options for the change.
     *
     * @public
     */
    setSelectedShapes(shapes: TLShape[] | TLShapeId[], historyOptions?: TLCommandHistoryOptions): this;
    /* Excluded from this release type: _setSelectedShapes */
    /**
     * Determine whether or not any of a shape's ancestors are selected.
     *
     * @param id - The id of the shape to check.
     *
     * @public
     */
    isAncestorSelected(shape: TLShape | TLShapeId): boolean;
    /**
     * Select one or more shapes.
     *
     * @example
     * ```ts
     * editor.select('id1')
     * editor.select('id1', 'id2')
     * ```
     *
     * @param ids - The ids to select.
     *
     * @public
     */
    select(...shapes: TLShape[] | TLShapeId[]): this;
    /**
     * Remove a shape from the existing set of selected shapes.
     *
     * @example
     * ```ts
     * editor.deselect(shape.id)
     * ```
     *
     * @public
     */
    deselect(...shapes: TLShape[] | TLShapeId[]): this;
    /**
     * Select all direct children of the current page.
     *
     * @example
     * ```ts
     * editor.selectAll()
     * ```
     *
     * @public
     */
    selectAll(): this;
    /**
     * Clear the selection.
     *
     * @example
     * ```ts
     * editor.selectNone()
     * ```
     *
     * @public
     */
    selectNone(): this;
    /**
     * The app's only selected shape.
     *
     * @example
     * ```ts
     * editor.onlySelectedShape
     * ```
     *
     * @returns Null if there is no shape or more than one selected shape, otherwise the selected
     *   shape.
     *
     * @public
     * @readonly
     */
    get onlySelectedShape(): null | TLShape;
    /**
     * The current page bounds of all the selected shapes. If the
     * selection is rotated, then these bounds are the axis-aligned
     * box that the rotated bounds would fit inside of.
     *
     * @readonly
     *
     * @public
     */
    get selectionPageBounds(): Box2d | null;
    /**
     * The rotation of the selection bounding box in the current page space.
     *
     * @readonly
     * @public
     */
    get selectionRotation(): number;
    /**
     * The bounds of the selection bounding box in the current page space.
     *
     * @readonly
     * @public
     */
    get selectionRotatedPageBounds(): Box2d | undefined;
    /**
     * The current focused group id.
     *
     * @public
     */
    get focusedGroupId(): TLPageId | TLShapeId;
    /**
     * The current focused group.
     *
     * @public
     */
    get focusedGroup(): TLShape | undefined;
    /**
     * Set the current focused group shape.
     *
     * @param shape - The group shape id (or group shape's id) to set as the focused group shape.
     *
     * @public
     */
    setFocusedGroup(shape: null | TLGroupShape | TLShapeId): this;
    /* Excluded from this release type: _setFocusedGroupId */
    /**
     * Exit the current focused group, moving up to the next parent group if there is one.
     *
     * @public
     */
    popFocusedGroupId(): this;
    /**
     * The current editing shape's id.
     *
     * @public
     */
    get editingShapeId(): null | TLShapeId;
    /**
     * The current editing shape.
     *
     * @public
     */
    get editingShape(): TLShape | undefined;
    /**
     * Set the current editing shape.
     *
     * @example
     * ```ts
     * editor.setEditingShape(myShape)
     * editor.setEditingShape(myShape.id)
     * ```
     *
     * @param shape - The shape (or shape id) to set as editing.
     *
     * @public
     */
    setEditingShape(shape: null | TLShape | TLShapeId): this;
    /**
     * The current hovered shape id.
     *
     * @readonly
     * @public
     */
    get hoveredShapeId(): null | TLShapeId;
    /**
     * The current hovered shape.
     *
     * @public
     */
    get hoveredShape(): TLShape | undefined;
    /**
     * Set the editor's current hovered shape.
     *
     * @example
     * ```ts
     * editor.setHoveredShape(myShape)
     * editor.setHoveredShape(myShape.id)
     * ```
     *
     * @param shapes - The shape (or shape id) to set as hovered.
     *
     * @public
     */
    setHoveredShape(shape: null | TLShape | TLShapeId): this;
    /**
     * The editor's current hinting shape ids.
     *
     * @public
     */
    get hintingShapeIds(): TLShapeId[];
    /**
     * The editor's current hinting shapes.
     *
     * @public
     */
    get hintingShapes(): NonNullable<TLShape | undefined>[];
    /**
     * Set the editor's current hinting shapes.
     *
     * @example
     * ```ts
     * editor.setHintingShapes([myShape])
     * editor.setHintingShapes([myShape.id])
     * ```
     *
     * @param shapes - The shapes (or shape ids) to set as hinting.
     *
     * @public
     */
    setHintingShapes(shapes: TLShape[] | TLShapeId[]): this;
    /**
     * The editor's current erasing ids.
     *
     * @public
     */
    get erasingShapeIds(): TLShapeId[];
    /**
     * The editor's current hinting shapes.
     *
     * @public
     */
    get erasingShapes(): NonNullable<TLShape | undefined>[];
    /**
     * Set the editor's current erasing shapes.
     *
     * @example
     * ```ts
     * editor.setErasingShapes([myShape])
     * editor.setErasingShapes([myShape.id])
     * ```
     *
     * @param shapes - The shapes (or shape ids) to set as hinting.
     *
     * @public
     */
    setErasingShapes(shapes: TLShape[] | TLShapeId[]): this;
    /**
     * The current cropping shape's id.
     *
     * @public
     */
    get croppingShapeId(): null | TLShapeId;
    /**
     * Set the current cropping shape.
     *
     * @example
     * ```ts
     * editor.setCroppingShape(myShape)
     * editor.setCroppingShape(myShape.id)
     * ```
     *
     *
     * @param shape - The shape (or shape id) to set as cropping.
     *
     * @public
     */
    setCroppingShape(shape: null | TLShape | TLShapeId): this;
    /* Excluded from this release type: cameraId */
    /**
     * The current camera.
     *
     * @public
     */
    get camera(): TLCamera;
    /**
     * The current camera zoom level.
     *
     * @public
     */
    get zoomLevel(): number;
    /* Excluded from this release type: _setCamera */
    /**
     * Set the current camera.
     *
     * @example
     * ```ts
     * editor.setCamera({ x: 0, y: 0})
     * editor.setCamera({ x: 0, y: 0, z: 1.5})
     * editor.setCamera({ x: 0, y: 0, z: 1.5}, { duration: 1000, easing: (t) => t * t })
     * ```
     *
     * @param point - The new camera position.
     * @param animation - (optional) Options for an animation.
     *
     * @public
     */
    setCamera(point: VecLike, animation?: TLAnimationOptions): this;
    /**
     * Center the camera on a point (in the current page space).
     *
     * @example
     * ```ts
     * editor.centerOnPoint({ x: 100, y: 100 })
     * editor.centerOnPoint({ x: 100, y: 100 }, { duration: 200 })
     * ```
     *
     * @param point - The point in the current page space to center on.
     * @param animation - (optional) The options for an animation.
     *
     * @public
     */
    centerOnPoint(point: VecLike, animation?: TLAnimationOptions): this;
    /**
     * Move the camera to the nearest content.
     *
     * @example
     * ```ts
     * editor.zoomToContent()
     * editor.zoomToContent({ duration: 200 })
     * ```
     *
     * @param opts - (optional) The options for an animation.
     *
     * @public
     */
    zoomToContent(): this;
    /**
     * Zoom the camera to fit the current page's content in the viewport.
     *
     * @example
     * ```ts
     * editor.zoomToFit()
     * editor.zoomToFit({ duration: 200 })
     * ```
     *
     * @param animation - (optional) The options for an animation.
     *
     * @public
     */
    zoomToFit(animation?: TLAnimationOptions): this;
    /**
     * Set the zoom back to 100%.
     *
     * @example
     * ```ts
     * editor.resetZoom()
     * editor.resetZoom(editor.viewportScreenCenter)
     * editor.resetZoom(editor.viewportScreenCenter, { duration: 200 })
     * ```
     *
     * @param point - (optional) The screen point to zoom out on. Defaults to the viewport screen center.
     * @param animation - (optional) The options for an animation.
     *
     * @public
     */
    resetZoom(point?: Vec2d, animation?: TLAnimationOptions): this;
    /**
     * Zoom the camera in.
     *
     * @example
     * ```ts
     * editor.zoomIn()
     * editor.zoomIn(editor.viewportScreenCenter, { duration: 120 })
     * editor.zoomIn(editor.inputs.currentScreenPoint, { duration: 120 })
     * ```
     *
     * @param animation - (optional) The options for an animation.
     *
     * @public
     */
    zoomIn(point?: Vec2d, animation?: TLAnimationOptions): this;
    /**
     * Zoom the camera out.
     *
     * @example
     * ```ts
     * editor.zoomOut()
     * editor.zoomOut(editor.viewportScreenCenter, { duration: 120 })
     * editor.zoomOut(editor.inputs.currentScreenPoint, { duration: 120 })
     * ```
     *
     * @param animation - (optional) The options for an animation.
     *
     * @public
     */
    zoomOut(point?: Vec2d, animation?: TLAnimationOptions): this;
    /**
     * Zoom the camera to fit the current selection in the viewport.
     *
     * @example
     * ```ts
     * editor.zoomToSelection()
     * ```
     *
     * @param animation - (optional) The options for an animation.
     *
     * @public
     */
    zoomToSelection(animation?: TLAnimationOptions): this;
    /**
     * Pan or pan/zoom the selected ids into view. This method tries to not change the zoom if possible.
     *
     * @param ids - The ids of the shapes to pan and zoom into view.
     * @param animation - The options for an animation.
     *
     * @public
     */
    panZoomIntoView(ids: TLShapeId[], animation?: TLAnimationOptions): this;
    /**
     * Zoom the camera to fit a bounding box (in the current page space).
     *
     * @example
     * ```ts
     * editor.zoomToBounds(myBounds)
     * editor.zoomToBounds(myBounds, 1)
     * editor.zoomToBounds(myBounds, 1, { duration: 100 })
     * ```
     *
     * @param bounds - The bounding box.
     * @param targetZoom - The desired zoom level. Defaults to 0.1.
     * @param animation - (optional) The options for an animation.
     *
     * @public
     */
    zoomToBounds(bounds: Box2d, targetZoom?: number, animation?: TLAnimationOptions): this;
    /**
     * Pan the camera.
     *
     * @example
     * ```ts
     * editor.pan({ x: 100, y: 100 })
     * editor.pan({ x: 100, y: 100 }, { duration: 1000 })
     * ```
     *
     * @param offset - The offset in the current page space.
     * @param animation - (optional) The animation options.
     */
    pan(offset: VecLike, animation?: TLAnimationOptions): this;
    /**
     * Stop the current camera animation, if any.
     *
     * @public
     */
    stopCameraAnimation(): this;
    /* Excluded from this release type: _viewportAnimation */
    /* Excluded from this release type: _animateViewport */
    /* Excluded from this release type: _animateToViewport */
    /**
     * Slide the camera in a certain direction.
     *
     * @param opts - Options for the slide
     * @public
     */
    slideCamera(opts?: {
        speed: number;
        direction: VecLike;
        friction: number;
        speedThreshold?: number | undefined;
    }): this;
    /**
     * Animate the camera to a user's cursor position.
     * This also briefly show the user's cursor if it's not currently visible.
     *
     * @param userId - The id of the user to aniamte to.
     * @public
     */
    animateToUser(userId: string): this;
    /**
     * Animate the camera to a shape.
     *
     * @public
     */
    animateToShape(shapeId: TLShapeId, opts?: TLAnimationOptions): this;
    /* Excluded from this release type: _willSetInitialBounds */
    /**
     * Update the viewport. The viewport will measure the size and screen position of its container
     * element. This should be done whenever the container's position on the screen changes.
     *
     * @example
     * ```ts
     * editor.updateViewportScreenBounds()
     * editor.updateViewportScreenBounds(true)
     * ```
     *
     * @param center - (optional) Whether to preserve the viewport page center as the viewport changes.
     *
     * @public
     */
    updateViewportScreenBounds(center?: boolean): this;
    /**
     * The bounds of the editor's viewport in screen space.
     *
     * @public
     */
    get viewportScreenBounds(): Box2d;
    /**
     * The center of the editor's viewport in screen space.
     *
     * @public
     */
    get viewportScreenCenter(): Vec2d;
    /**
     * The current viewport in the current page space.
     *
     * @public
     */
    get viewportPageBounds(): Box2d;
    /**
     * The center of the viewport in the current page space.
     *
     * @public
     */
    get viewportPageCenter(): Vec2d;
    /**
     * Convert a point in screen space to a point in the current page space.
     *
     * @example
     * ```ts
     * editor.screenToPage({ x: 100, y: 100 })
     * ```
     *
     * @param point - The point in screen space.
     *
     * @public
     */
    screenToPage(point: VecLike): {
        x: number;
        y: number;
        z: number;
    };
    /**
     * Convert a point in the current page space to a point in current screen space.
     *
     * @example
     * ```ts
     * editor.pageToScreen({ x: 100, y: 100 })
     * ```
     *
     * @param point - The point in screen space.
     *
     * @public
     */
    pageToScreen(point: VecLike): {
        x: number;
        y: number;
        z: number;
    };
    /**
     * Start viewport-following a user.
     *
     * @param userId - The id of the user to follow.
     *
     * @public
     */
    startFollowingUser(userId: string): this;
    /**
     * Stop viewport-following a user.
     *
     * @public
     */
    stopFollowingUser(): this;
    private _cameraState;
    /**
     * Whether the camera is moving or idle.
     *
     * @public
     */
    get cameraState(): "idle" | "moving";
    private _cameraStateTimeoutRemaining;
    private _lastUpdateRenderingBoundsTimestamp;
    private _decayCameraStateTimeout;
    private _tickCameraState;
    private getUnorderedRenderingShapes;
    /**
     * Get the shapes that should be displayed in the current viewport.
     *
     * @public
     */
    get renderingShapes(): {
        id: TLShapeId;
        shape: TLShape;
        util: ShapeUtil<TLUnknownShape>;
        index: number;
        backgroundIndex: number;
        opacity: number;
        isCulled: boolean;
        maskedPageBounds: Box2d | undefined;
    }[];
    /**
     * The current rendering bounds in the current page space, used for checking which shapes are "on screen".
     *
     * @public
     */
    get renderingBounds(): Box2d;
    /* Excluded from this release type: _renderingBounds */
    /**
     * The current rendering bounds in the current page space, expanded slightly. Used for determining which shapes
     * to render and which to "cull".
     *
     * @public
     */
    get renderingBoundsExpanded(): Box2d;
    /* Excluded from this release type: _renderingBoundsExpanded */
    /* Excluded from this release type: updateRenderingBounds */
    /**
     * The distance to expand the viewport when measuring culling. A larger distance will
     * mean that shapes near to the viewport (but still outside of it) will not be culled.
     *
     * @public
     */
    renderingBoundsMargin: number;
    /* Excluded from this release type: _pages */
    /**
     * Info about the project's current pages.
     *
     * @public
     */
    get pages(): TLPage[];
    /**
     * The current page.
     *
     * @public
     */
    get currentPage(): TLPage;
    /**
     * The current page id.
     *
     * @public
     */
    get currentPageId(): TLPageId;
    /**
     * Get a page.
     *
     * @example
     * ```ts
     * editor.getPage(myPage.id)
     * editor.getPage(myPage)
     * ```
     *
     * @param page - The page (or page id) to get.
     *
     * @public
     */
    getPage(page: TLPage | TLPageId): TLPage | undefined;
    private readonly _currentPageShapeIds;
    /**
     * An array of all of the shapes on the current page.
     *
     * @public
     */
    get currentPageShapeIds(): Set<TLShapeId>;
    /**
     * Get the ids of shapes on a page.
     *
     * @example
     * ```ts
     * const idsOnPage1 = editor.getCurrentPageShapeIds('page1')
     * const idsOnPage2 = editor.getCurrentPageShapeIds(myPage2)
     * ```
     *
     * @param page - The page (or page id) to get.
     *
     * @public
     **/
    getPageShapeIds(page: TLPage | TLPageId): Set<TLShapeId>;
    /**
     * Set the current page.
     *
     * @example
     * ```ts
     * editor.setCurrentPage('page1')
     * editor.setCurrentPage(myPage1)
     * ```
     *
     * @param page - The page (or page id) to set as the current page.
     * @param historyOptions - (optional) The history options for the change.
     *
     * @public
     */
    setCurrentPage(page: TLPage | TLPageId, historyOptions?: TLCommandHistoryOptions): this;
    /* Excluded from this release type: _setCurrentPageId */
    /**
     * Update a page.
     *
     * @example
     * ```ts
     * editor.updatePage({ id: 'page2', name: 'Page 2' })
     * editor.updatePage({ id: 'page2', name: 'Page 2' }, { squashing: true })
     * ```
     *
     * @param partial - The partial of the shape to update.
     * @param historyOptions - (optional) The history options for the change.
     *
     * @public
     */
    updatePage(partial: RequiredKeys<TLPage, 'id'>, historyOptions?: TLCommandHistoryOptions): this;
    /* Excluded from this release type: _updatePage */
    /**
     * Create a page.
     *
     * @example
     * ```ts
     * editor.createPage(myPage)
     * editor.createPage({ name: 'Page 2' })
     * ```
     *
     * @param page - The page (or page partial) to create.
     *
     * @public
     */
    createPage(page: Partial<TLPage>): this;
    /* Excluded from this release type: _createPage */
    /**
     * Delete a page.
     *
     * @example
     * ```ts
     * editor.deletePage('page1')
     * ```
     *
     * @param id - The id of the page to delete.
     *
     * @public
     */
    deletePage(page: TLPage | TLPageId): this;
    /* Excluded from this release type: _deletePage */
    /**
     * Duplicate a page.
     *
     * @param id - The id of the page to duplicate. Defaults to the current page.
     * @param createId - The id of the new page. Defaults to a new id.
     *
     * @public
     */
    duplicatePage(page: TLPage | TLPageId, createId?: TLPageId): this;
    /**
     * Rename a page.
     *
     * @example
     * ```ts
     * editor.renamePage('page1', 'My Page')
     * ```
     *
     * @param id - The id of the page to rename.
     * @param name - The new name.
     *
     * @public
     */
    renamePage(page: TLPage | TLPageId, name: string, historyOptions?: TLCommandHistoryOptions): this;
    /* Excluded from this release type: _assets */
    /**
     * Get all assets in the editor.
     *
     * @public
     */
    get assets(): (TLBookmarkAsset | TLImageAsset | TLVideoAsset)[];
    /**
     * Create one or more assets.
     *
     * @example
     * ```ts
     * editor.createAssets([...myAssets])
     * ```
     *
     * @param assets - The assets to create.
     *
     * @public
     */
    createAssets(assets: TLAsset[]): this;
    /* Excluded from this release type: _createAssets */
    /**
     * Update one or more assets.
     *
     * @example
     * ```ts
     * editor.updateAssets([{ id: 'asset1', name: 'New name' }])
     * ```
     *
     * @param assets - The assets to update.
     *
     * @public
     */
    updateAssets(assets: TLAssetPartial[]): this;
    /* Excluded from this release type: _updateAssets */
    /**
     * Delete one or more assets.
     *
     * @example
     * ```ts
     * editor.deleteAssets(['asset1', 'asset2'])
     * ```
     *
     * @param ids - The assets to delete.
     *
     * @public
     */
    deleteAssets(assets: TLAsset[] | TLAssetId[]): this;
    /* Excluded from this release type: _deleteAssets */
    /**
     * Get an asset by its id.
     *
     * @example
     * ```ts
     * editor.getAsset('asset1')
     * ```
     *
     * @param asset - The asset (or asset id) to get.
     *
     * @public
     */
    getAsset(asset: TLAsset | TLAssetId): TLAsset | undefined;
    private get _shapeGeometryCache();
    /**
     * Get the geometry of a shape.
     *
     * @example
     * ```ts
     * editor.getShapeGeometry(myShape)
     * editor.getShapeGeometry(myShapeId)
     * ```
     *
     * @param shape - The shape (or shape id) to get the geometry for.
     *
     * @public
     */
    getShapeGeometry<T extends Geometry2d>(shape: TLShape | TLShapeId): T;
    /* Excluded from this release type: _shapeOutlineSegmentsCache */
    /**
     * Get the local outline segments of a shape.
     *
     * @example
     * ```ts
     * editor.getShapeOutlineSegments(myShape)
     * editor.getShapeOutlineSegments(myShapeId)
     * ```
     *
     * @param shape - The shape (or shape id) to get the outline segments for.
     *
     * @public
     */
    getShapeOutlineSegments<T extends TLShape>(shape: T | T['id']): Vec2d[][];
    /* Excluded from this release type: _shapeHandlesCache */
    /**
     * Get the handles (if any) for a shape.
     *
     * @example
     * ```ts
     * editor.getShapeHandles(myShape)
     * editor.getShapeHandles(myShapeId)
     * ```
     *
     * @param shape - The shape (or shape id) to get the handles for.
     * @public
     */
    getShapeHandles<T extends TLShape>(shape: T | T['id']): TLHandle[] | undefined;
    /**
     * Get the local transform for a shape as a matrix model. This transform reflects both its
     * translation (x, y) from from either its parent's top left corner, if the shape's parent is
     * another shape, or else from the 0,0 of the page, if the shape's parent is the page; and the
     * shape's rotation.
     *
     * @example
     * ```ts
     * editor.getShapeLocalTransform(myShape)
     * ```
     *
     * @param shape - The shape to get the local transform for.
     *
     * @public
     */
    getShapeLocalTransform(shape: TLShape | TLShapeId): Matrix2d;
    /* Excluded from this release type: _shapePageTransformCache */
    /**
     * Get the local transform of a shape's parent as a matrix model.
     *
     * @example
     * ```ts
     * editor.getShapeParentTransform(myShape)
     * ```
     *
     * @param shape - The shape (or shape id) to get the parent transform for.
     *
     * @public
     */
    getShapeParentTransform(shape: TLShape | TLShapeId): Matrix2d;
    /**
     * Get the transform of a shape in the current page space.
     *
     * @example
     * ```ts
     * editor.getShapePageTransform(myShape)
     * editor.getShapePageTransform(myShapeId)
     * ```
     *
     * @param shape - The shape (or shape id) to get the page transform for.
     *
     * @public
     */
    getShapePageTransform(shape: TLShape | TLShapeId): Matrix2d;
    /* Excluded from this release type: _shapePageBoundsCache */
    /**
     * Get the bounds of a shape in the current page space.
     *
     * @example
     * ```ts
     * editor.getShapePageBounds(myShape)
     * editor.getShapePageBounds(myShapeId)
     * ```
     *
     * @param shape - The shape (or shape id) to get the bounds for.
     *
     * @public
     */
    getShapePageBounds(shape: TLShape | TLShapeId): Box2d | undefined;
    /* Excluded from this release type: _shapeClipPathCache */
    /**
     * Get the clip path for a shape.
     *
     * @example
     * ```ts
     * const clipPath = editor.getShapeClipPath(shape)
     * const clipPath = editor.getShapeClipPath(shape.id)
     * ```
     *
     * @param shape - The shape (or shape id) to get the clip path for.
     *
     * @returns The clip path or undefined.
     *
     * @public
     */
    getShapeClipPath(shape: TLShape | TLShapeId): string | undefined;
    /* Excluded from this release type: _shapeMaskCache */
    /**
     * Get the mask (in the current page space) for a shape.
     *
     * @example
     * ```ts
     * const pageMask = editor.getShapeMask(shape.id)
     * ```
     *
     * @param id - The id of the shape to get the mask for.
     *
     * @returns The mask for the shape.
     *
     * @public
     */
    getShapeMask(shape: TLShape | TLShapeId): undefined | VecLike[];
    /**
     * Get the bounds of a shape in the current page space, incorporating any masks. For example, if the
     * shape were the child of a frame and was half way out of the frame, the bounds would be the half
     * of the shape that was in the frame.
     *
     * @example
     * ```ts
     * editor.getShapeMaskedPageBounds(myShape)
     * editor.getShapeMaskedPageBounds(myShapeId)
     * ```
     *
     * @param shape - The shape to get the masked bounds for.
     *
     * @public
     */
    getShapeMaskedPageBounds(shape: TLShape | TLShapeId): Box2d | undefined;
    /**
     * Get the ancestors of a shape.
     *
     * @example
     * ```ts
     * const ancestors = editor.getShapeAncestors(myShape)
     * const ancestors = editor.getShapeAncestors(myShapeId)
     * ```
     *
     * @param shape - The shape (or shape id) to get the ancestors for.
     *
     * @public
     */
    getShapeAncestors(shape: TLShape | TLShapeId, acc?: TLShape[]): TLShape[];
    /**
     * Find the first ancestor matching the given predicate
     *
     * @example
     * ```ts
     * const ancestor = editor.findShapeAncestor(myShape)
     * const ancestor = editor.findShapeAncestor(myShape.id)
     * const ancestor = editor.findShapeAncestor(myShape.id, (shape) => shape.type === 'frame')
     * ```
     *
     * @param shape - The shape to check the ancestors for.
     *
     * @public
     */
    findShapeAncestor(shape: TLShape | TLShapeId, predicate: (parent: TLShape) => boolean): TLShape | undefined;
    /**
     * Returns true if the the given shape has the given ancestor.
     *
     * @param shape - The shape.
     * @param ancestorId - The id of the ancestor.
     *
     * @public
     */
    hasAncestor(shape: TLShape | TLShapeId | undefined, ancestorId: TLShapeId): boolean;
    /**
     * Get the common ancestor of two or more shapes that matches a predicate.
     *
     * @param shapes - The shapes (or shape ids) to check.
     * @param predicate - The predicate to match.
     */
    findCommonAncestor(shapes: TLShape[] | TLShapeId[], predicate?: (shape: TLShape) => boolean): TLShapeId | undefined;
    /**
     * Check whether a shape or its parent is locked.
     *
     * @param shape - The shape (or shape id) to check.
     *
     * @public
     */
    isShapeOrAncestorLocked(shape?: TLShape): boolean;
    isShapeOrAncestorLocked(id?: TLShapeId): boolean;
    /**
     * The bounds of the current page (the common bounds of all of the shapes on the page).
     *
     * @public
     */
    get currentPageBounds(): Box2d | undefined;
    /**
     * Get the top-most selected shape at the given point, ignoring groups.
     *
     * @param point - The point to check.
     *
     * @returns The top-most selected shape at the given point, or undefined if there is no shape at the point.
     */
    getSelectedShapeAtPoint(point: VecLike): TLShape | undefined;
    /**
     * Get the shape at the current point.
     *
     * @param point - The point to check.
     * @param opts - Options for the check: `hitInside` to check if the point is inside the shape, `margin` to check if the point is within a margin of the shape, `hitFrameInside` to check if the point is inside the frame, and `filter` to filter the shapes to check.
     *
     * @returns The shape at the given point, or undefined if there is no shape at the point.
     */
    getShapeAtPoint(point: VecLike, opts?: {
        margin?: number | undefined;
        hitInside?: boolean | undefined;
        hitLabels?: boolean | undefined;
        hitFrameInside?: boolean | undefined;
        filter?: ((shape: TLShape) => boolean) | undefined;
    }): TLShape | undefined;
    /**
     * Get the shapes, if any, at a given page point.
     *
     * @example
     * ```ts
     * editor.getShapesAtPoint({ x: 100, y: 100 })
     * editor.getShapesAtPoint({ x: 100, y: 100 }, { hitInside: true, exact: true })
     * ```
     *
     * @param point - The page point to test.
     *
     * @public
     */
    getShapesAtPoint(point: VecLike, opts?: {
        margin?: number | undefined;
        hitInside?: boolean | undefined;
    }): TLShape[];
    /**
     * Test whether a point (in the current page space) will will a shape. This method takes into account masks,
     * such as when a shape is the child of a frame and is partially clipped by the frame.
     *
     * @example
     * ```ts
     * editor.isPointInShape({ x: 100, y: 100 }, myShape)
     * ```
     *
     * @param shape - The shape to test against.
     * @param point - The page point to test (in the current page space).
     * @param hitInside - Whether to count as a hit if the point is inside of a closed shape.
     *
     * @public
     */
    isPointInShape(shape: TLShape | TLShapeId, point: VecLike, opts?: {
        margin?: number | undefined;
        hitInside?: boolean | undefined;
    }): boolean;
    /**
     * Convert a point in the current page space to a point in the local space of a shape. For example, if a
     * shape's page point were `{ x: 100, y: 100 }`, a page point at `{ x: 110, y: 110 }` would be at
     * `{ x: 10, y: 10 }` in the shape's local space.
     *
     * @example
     * ```ts
     * editor.getPointInShapeSpace(myShape, { x: 100, y: 100 })
     * ```
     *
     * @param shape - The shape to get the point in the local space of.
     * @param point - The page point to get in the local space of the shape.
     *
     * @public
     */
    getPointInShapeSpace(shape: TLShape | TLShapeId, point: VecLike): Vec2d;
    /**
     * Convert a delta in the current page space to a point in the local space of a shape's parent.
     *
     * @example
     * ```ts
     * editor.getPointInParentSpace(myShape.id, { x: 100, y: 100 })
     * ```
     *
     * @param shape - The shape to get the point in the local space of.
     * @param point - The page point to get in the local space of the shape.
     *
     * @public
     */
    getPointInParentSpace(shape: TLShape | TLShapeId, point: VecLike): Vec2d;
    /**
     * An array containing all of the shapes in the current page.
     *
     * @example
     * ```ts
     * editor.currentPageShapes
     * ```
     *
     * @readonly
     *
     * @public
     */
    get currentPageShapes(): TLShape[];
    /**
     * An array containing all of the shapes in the current page, sorted in z-index order (accounting
     * for nested shapes): e.g. A, B, BA, BB, C.
     *
     * @example
     * ```ts
     * editor.currentPageShapesSorted
     * ```
     *
     * @readonly
     *
     * @public
     */
    get currentPageShapesSorted(): TLShape[];
    /**
     * Get whether a shape matches the type of a TLShapeUtil.
     *
     * @example
     * ```ts
     * const isArrowShape = isShapeOfType<TLArrowShape>(someShape, 'arrow')
     * ```
     *
     * @param util - the TLShapeUtil constructor to test against
     * @param shape - the shape to test
     *
     * @public
     */
    isShapeOfType<T extends TLUnknownShape>(shape: TLUnknownShape, type: T['type']): shape is T;
    isShapeOfType<T extends TLUnknownShape>(shapeId: TLUnknownShape['id'], type: T['type']): shapeId is T['id'];
    /**
     * Get a shape by its id.
     *
     * @example
     * ```ts
     * editor.getShape('box1')
     * ```
     *
     * @param id - The id of the shape to get.
     *
     * @public
     */
    getShape<T extends TLShape = TLShape>(shape: TLParentId | TLShape): T | undefined;
    /**
     * Get the parent shape for a given shape. Returns undefined if the shape is the direct child of
     * the page.
     *
     * @example
     * ```ts
     * editor.getShapeParent(myShape)
     * ```
     *
     * @public
     */
    getShapeParent(shape?: TLShape | TLShapeId): TLShape | undefined;
    /* Excluded from this release type: getShapeNearestSibling */
    /**
     * Get whether the given shape is the descendant of the given page.
     *
     * @example
     * ```ts
     * editor.isShapeInPage(myShape)
     * editor.isShapeInPage(myShape, 'page1')
     * ```
     *
     * @param shape - The shape to check.
     * @param pageId - The id of the page to check against. Defaults to the current page.
     *
     * @public
     */
    isShapeInPage(shape: TLShape | TLShapeId, pageId?: TLPageId): boolean;
    /**
     * Get the id of the containing page for a given shape.
     *
     * @param shape - The shape to get the page id for.
     *
     * @returns The id of the page that contains the shape, or undefined if the shape is undefined.
     *
     * @public
     */
    getAncestorPageId(shape?: TLShape | TLShapeId): TLPageId | undefined;
    /* Excluded from this release type: _parentIdsToChildIds */
    /**
     * Reparent shapes to a new parent. This operation preserves the shape's current page positions /
     * rotations.
     *
     * @example
     * ```ts
     * editor.reparentShapes([box1, box2], 'frame1')
     * editor.reparentShapes([box1.id, box2.id], 'frame1')
     * editor.reparentShapes([box1.id, box2.id], 'frame1', 4)
     * ```
     *
     * @param shapes - The shapes (or shape ids) of the shapes to reparent.
     * @param parentId - The id of the new parent shape.
     * @param insertIndex - (optional) The index to insert the children.
     *
     * @public
     */
    reparentShapes(shapes: TLShape[] | TLShapeId[], parentId: TLParentId, insertIndex?: string): this;
    /**
     * Get the index above the highest child of a given parent.
     *
     * @param parentId - The id of the parent.
     *
     * @returns The index.
     *
     * @public
     */
    getHighestIndexForParent(parent: TLPage | TLParentId | TLShape): string;
    /* Excluded from this release type: _childIdsCache */
    /**
     * Get an array of all the children of a shape.
     *
     * @example
     * ```ts
     * editor.getSortedChildIdsForParent('frame1')
     * ```
     *
     * @param parentId - The id of the parent shape.
     *
     * @public
     */
    getSortedChildIdsForParent(parent: TLPage | TLParentId | TLShape): TLShapeId[];
    /**
     * Run a visitor function for all descendants of a shape.
     *
     * @example
     * ```ts
     * editor.visitDescendants('frame1', myCallback)
     * ```
     *
     * @param parentId - The id of the parent shape.
     * @param visitor - The visitor function.
     *
     * @public
     */
    visitDescendants(parent: TLPage | TLParentId | TLShape, visitor: (id: TLShapeId) => false | void): this;
    /**
     * Get the shape ids of all descendants of the given shapes (including the shapes themselves).
     *
     * @param ids - The ids of the shapes to get descendants of.
     *
     * @returns The decscendant ids.
     *
     * @public
     */
    getShapeAndDescendantIds(ids: TLShapeId[]): Set<TLShapeId>;
    /**
     * Get the shape that some shapes should be dropped on at a given point.
     *
     * @param point - The point to find the parent for.
     * @param droppingShapes - The shapes that are being dropped.
     *
     * @returns The shape to drop on.
     *
     * @public
     */
    getDroppingOverShape(point: VecLike, droppingShapes?: TLShape[]): TLShape | undefined;
    /**
     * Get the shape that should be selected when you click on a given shape, assuming there is
     * nothing already selected. It will not return anything higher than or including the current
     * focus layer.
     *
     * @param shape - The shape to get the outermost selectable shape for.
     * @param filter - A function to filter the selectable shapes.
     *
     * @returns The outermost selectable shape.
     *
     * @public
     */
    getOutermostSelectableShape(shape: TLShape | TLShapeId, filter?: (shape: TLShape) => boolean): TLShape;
    /**
     * Rotate shapes by a delta in radians.
     * Note: Currently, this assumes that the shapes are your currently selected shapes.
     *
     * @example
     * ```ts
     * editor.rotateShapesBy(editor.selectedShapeIds, Math.PI)
     * editor.rotateShapesBy(editor.selectedShapeIds, Math.PI / 2)
     * ```
     *
     * @param shapes - The shapes (or shape ids) of the shapes to move.
     * @param delta - The delta in radians to apply to the selection rotation.
     */
    rotateShapesBy(shapes: TLShape[] | TLShapeId[], delta: number): this;
    /**
     * Move shapes by a delta.
     *
     * @example
     * ```ts
     * editor.nudgeShapes(['box1', 'box2'], { x: 8, y: 8 })
     * editor.nudgeShapes(editor.selectedShapes, { x: 8, y: 8 }, { squashing: true })
     * ```
     *
     * @param shapes - The shapes (or shape ids) to move.
     * @param direction - The direction in which to move the shapes.
     * @param historyOptions - (optional) The history options for the change.
     */
    nudgeShapes(shapes: TLShape[] | TLShapeId[], offset: VecLike, historyOptions?: TLCommandHistoryOptions): this;
    /**
     * Duplicate shapes.
     *
     * @example
     * ```ts
     * editor.duplicateShapes(['box1', 'box2'], { x: 8, y: 8 })
     * editor.duplicateShapes(editor.selectedShapes, { x: 8, y: 8 })
     * ```
     *
     * @param shapes - The shapes (or shape ids) to duplicate.
     * @param offset - (optional) The offset (in pixels) to apply to the duplicated shapes.
     *
     * @public
     */
    duplicateShapes(shapes: TLShape[] | TLShapeId[], offset?: VecLike): this;
    /**
     * Move shapes to page.
     *
     * @example
     * ```ts
     * editor.moveShapesToPage(['box1', 'box2'], 'page1')
     * ```
     *
     * @param shapes - The shapes (or shape ids) of the shapes to move.
     * @param pageId - The id of the page where the shapes will be moved.
     *
     * @public
     */
    moveShapesToPage(shapes: TLShape[] | TLShapeId[], pageId: TLPageId): this;
    /**
     * Toggle the lock state of one or more shapes. If there is a mix of locked and unlocked shapes, all shapes will be locked.
     *
     * @param shapes - The shapes (or shape ids) to toggle.
     *
     * @public
     */
    toggleLock(shapes: TLShape[] | TLShapeId[]): this;
    /**
     * Send shapes to the back of the page's object list.
     *
     * @example
     * ```ts
     * editor.sendToBack(['id1', 'id2'])
     * editor.sendToBack(box1, box2)
     * ```
     *
     * @param shapes - The shapes (or shape ids) to move.
     *
     * @public
     */
    sendToBack(shapes: TLShape[] | TLShapeId[]): this;
    /**
     * Send shapes backward in the page's object list.
     *
     * @example
     * ```ts
     * editor.sendBackward(['id1', 'id2'])
     * editor.sendBackward([box1, box2])
     * ```
     *
     * @param shapes - The shapes (or shape ids) to move.
     *
     * @public
     */
    sendBackward(shapes: TLShape[] | TLShapeId[]): this;
    /**
     * Bring shapes forward in the page's object list.
     *
     * @example
     * ```ts
     * editor.bringForward(['id1', 'id2'])
     * editor.bringForward(box1,  box2)
     * ```
     *
     * @param shapes - The shapes (or shape ids) to move.
     *
     * @public
     */
    bringForward(shapes: TLShape[] | TLShapeId[]): this;
    /**
     * Bring shapes to the front of the page's object list.
     *
     * @example
     * ```ts
     * editor.bringToFront(['id1', 'id2'])
     * editor.bringToFront([box1, box2])
     * ```
     *
     * @param shapes - The shapes (or shape ids) to move.
     *
     * @public
     */
    bringToFront(shapes: TLShape[] | TLShapeId[]): this;
    /**
     * Flip shape positions.
     *
     * @example
     * ```ts
     * editor.flipShapes([box1, box2], 'horizontal', 32)
     * editor.flipShapes(editor.selectedShapeIds, 'horizontal', 32)
     * ```
     *
     * @param shapes - The ids of the shapes to flip.
     * @param operation - Whether to flip horizontally or vertically.
     *
     * @public
     */
    flipShapes(shapes: TLShape[] | TLShapeId[], operation: 'horizontal' | 'vertical'): this;
    /**
     * Stack shape.
     *
     * @example
     * ```ts
     * editor.stackShapes([box1, box2], 'horizontal', 32)
     * editor.stackShapes(editor.selectedShapeIds, 'horizontal', 32)
     * ```
     *
     * @param shapes - The shapes (or shape ids) to stack.
     * @param operation - Whether to stack horizontally or vertically.
     * @param gap - The gap to leave between shapes.
     *
     * @public
     */
    stackShapes(shapes: TLShape[] | TLShapeId[], operation: 'horizontal' | 'vertical', gap: number): this;
    /**
     * Pack shapes into a grid centered on their current position. Based on potpack (https://github.com/mapbox/potpack).
     *
     * @example
     * ```ts
     * editor.packShapes([box1, box2], 32)
     * editor.packShapes(editor.selectedShapeIds, 32)
     * ```
     *
     *
     * @param shapes - The shapes (or shape ids) to pack.
     * @param gap - The padding to apply to the packed shapes. Defaults to 16.
     */
    packShapes(shapes: TLShape[] | TLShapeId[], gap: number): this;
    /**
     * Align shape positions.
     *
     * @example
     * ```ts
     * editor.alignShapes([box1, box2], 'left')
     * editor.alignShapes(editor.selectedShapeIds, 'left')
     * ```
     *
     * @param shapes - The shapes (or shape ids) to align.
     * @param operation - The align operation to apply.
     *
     * @public
     */
    alignShapes(shapes: TLShape[] | TLShapeId[], operation: 'bottom' | 'center-horizontal' | 'center-vertical' | 'left' | 'right' | 'top'): this;
    /**
     * Distribute shape positions.
     *
     * @example
     * ```ts
     * editor.distributeShapes([box1, box2], 'horizontal')
     * editor.distributeShapes(editor.selectedShapeIds, 'horizontal')
     * ```
     *
     * @param shapes - The shapes (or shape ids) to distribute.
     * @param operation - Whether to distribute shapes horizontally or vertically.
     *
     * @public
     */
    distributeShapes(shapes: TLShape[] | TLShapeId[], operation: 'horizontal' | 'vertical'): this;
    /**
     * Stretch shape sizes and positions to fill their common bounding box.
     *
     * @example
     * ```ts
     * editor.stretchShapes([box1, box2], 'horizontal')
     * editor.stretchShapes(editor.selectedShapeIds, 'horizontal')
     * ```
     *
     * @param shapes - The shapes (or shape ids) to stretch.
     * @param operation - Whether to stretch shapes horizontally or vertically.
     *
     * @public
     */
    stretchShapes(shapes: TLShape[] | TLShapeId[], operation: 'horizontal' | 'vertical'): this;
    /**
     * Resize a shape.
     *
     * @param id - The id of the shape to resize.
     * @param scale - The scale factor to apply to the shape.
     * @param options - Additional options.
     *
     * @public
     */
    resizeShape(shape: TLShape | TLShapeId, scale: VecLike, options?: TLResizeShapeOptions): this;
    /* Excluded from this release type: _scalePagePoint */
    /* Excluded from this release type: _resizeUnalignedShape */
    /**
     * Get the initial meta value for a shape.
     *
     * @example
     * ```ts
     * editor.getInitialMetaForShape = (shape) => {
     *   if (shape.type === 'note') {
     *     return { createdBy: myCurrentUser.id }
     *   }
     * }
     * ```
     *
     * @param shape - The shape to get the initial meta for.
     *
     * @public
     */
    getInitialMetaForShape(_shape: TLShape): JsonObject;
    /**
     * Create a single shape.
     *
     * @example
     * ```ts
     * editor.createShape(myShape)
     * editor.createShape({ id: 'box1', type: 'text', props: { text: "ok" } })
     * ```
     *
     * @param shape - The shape (or shape partial) to create.
     *
     * @public
     */
    createShape<T extends TLUnknownShape>(shape: OptionalKeys<TLShapePartial<T>, 'id'>): this;
    /**
     * Create shapes.
     *
     * @example
     * ```ts
     * editor.createShapes([myShape])
     * editor.createShapes([{ id: 'box1', type: 'text', props: { text: "ok" } }])
     * ```
     *
     * @param shapes - The shapes (or shape partials) to create.
     * @param select - Whether to select the created shapes. Defaults to false.
     *
     * @public
     */
    createShapes<T extends TLUnknownShape>(shapes: OptionalKeys<TLShapePartial<T>, 'id'>[]): this;
    /* Excluded from this release type: _createShapes */
    private animatingShapes;
    /**
     * Animate a shape.
     *
     * @example
     * ```ts
     * editor.animateShape({ id: 'box1', type: 'box', x: 100, y: 100 })
     * editor.animateShape({ id: 'box1', type: 'box', x: 100, y: 100 }, { duration: 100, ease: t => t*t })
     * ```
     *
     * @param partial - The shape partial to update.
     * @param options - (optional) The animation's options.
     *
     * @public
     */
    animateShape(partial: null | TLShapePartial | undefined, animationOptions?: TLAnimationOptions): this;
    /**
     * Animate shapes.
     *
     * @example
     * ```ts
     * editor.animateShapes([{ id: 'box1', type: 'box', x: 100, y: 100 }])
     * editor.animateShapes([{ id: 'box1', type: 'box', x: 100, y: 100 }], { duration: 100, ease: t => t*t })
     * ```
     *
     * @param partials - The shape partials to update.
     * @param options - (optional) The animation's options.
     *
     * @public
     */
    animateShapes(partials: (null | TLShapePartial | undefined)[], animationOptions?: Partial<{
        duration: number;
        easing: (t: number) => number;
    }>): this;
    /**
     * Create a group containing the provided shapes.
     *
     * @param shapes - The shapes (or shape ids) to group. Defaults to the selected shapes.
     * @param groupId - (optional) The id of the group to create.
     *
     * @public
     */
    groupShapes(shapes: TLShape[] | TLShapeId[], groupId?: TLShapeId): this;
    /**
     * Ungroup some shapes.
     *
     * @param ids - Ids of the shapes to ungroup. Defaults to the selected shapes.
     *
     * @public
     */
    ungroupShapes(ids: TLShapeId[]): this;
    ungroupShapes(ids: TLShape[]): this;
    /**
     * Update a shape using a partial of the shape.
     *
     * @example
     * ```ts
     * editor.updateShape({ id: 'box1', type: 'geo', props: { w: 100, h: 100 } })
     * ```
     *
     * @param partial - The shape partial to update.
     * @param historyOptions - (optional) The history options for the change.
     *
     * @public
     */
    updateShape<T extends TLUnknownShape>(partial: null | TLShapePartial<T> | undefined, historyOptions?: TLCommandHistoryOptions): this;
    /**
     * Update shapes using partials of each shape.
     *
     * @example
     * ```ts
     * editor.updateShapes([{ id: 'box1', type: 'geo', props: { w: 100, h: 100 } }])
     * ```
     *
     * @param partials - The shape partials to update.
     * @param historyOptions - (optional) The history options for the change.
     *
     * @public
     */
    updateShapes<T extends TLUnknownShape>(partials: (null | TLShapePartial<T> | undefined)[], historyOptions?: TLCommandHistoryOptions): this;
    /* Excluded from this release type: _updateShapes */
    /* Excluded from this release type: _getUnlockedShapeIds */
    /**
     * Delete shapes.
     *
     * @example
     * ```ts
     * editor.deleteShapes(['box1', 'box2'])
     * ```
     *
     * @param ids - The ids of the shapes to delete.
     *
     * @public
     */
    deleteShapes(ids: TLShapeId[]): this;
    deleteShapes(shapes: TLShape[]): this;
    /**
     * Delete a shape.
     *
     * @example
     * ```ts
     * editor.deleteShapes(['box1', 'box2'])
     * ```
     *
     * @param id - The id of the shape to delete.
     *
     * @public
     */
    deleteShape(id: TLShapeId): this;
    deleteShape(shape: TLShape): this;
    /* Excluded from this release type: _deleteShapes */
    /* Excluded from this release type: _extractSharedStyles */
    /* Excluded from this release type: _selectionSharedStyles */
    /* Excluded from this release type: getStyleForNextShape */
    getShapeStyleIfExists<T>(shape: TLShape, style: StyleProp<T>): T | undefined;
    /**
     * A map of all the current styles either in the current selection, or that are relevant to the
     * current tool.
     *
     * @example
     * ```ts
     * const color = editor.sharedStyles.get(DefaultColorStyle)
     * if (color && color.type === 'shared') {
     *   print('All selected shapes have the same color:', color.value)
     * }
     * ```
     *
     * @public
     */
    get sharedStyles(): ReadonlySharedStyleMap;
    /**
     * Get the currently selected shared opacity.
     * If any shapes are selected, this returns the shared opacity of the selected shapes.
     * Otherwise, this returns the chosen opacity for the next shape.
     *
     * @public
     */
    get sharedOpacity(): SharedStyle<number>;
    /**
     * Set the opacity for the next shapes. This will effect subsequently created shapes.
     *
     * @example
     * ```ts
     * editor.setOpacityForNextShapes(0.5)
     * editor.setOpacityForNextShapes(0.5, { squashing: true })
     * ```
     *
     * @param opacity - The opacity to set. Must be a number between 0 and 1 inclusive.
     * @param historyOptions - The history options for the change.
     */
    setOpacityForNextShapes(opacity: number, historyOptions?: TLCommandHistoryOptions): this;
    /**
     * Set the current opacity. This will effect any selected shapes.
     *
     * @example
     * ```ts
     * editor.setOpacityForSelectedShapes(0.5)
     * editor.setOpacityForSelectedShapes(0.5, { squashing: true })
     * ```
     *
     * @param opacity - The opacity to set. Must be a number between 0 and 1 inclusive.
     * @param historyOptions - The history options for the change.
     */
    setOpacityForSelectedShapes(opacity: number, historyOptions?: TLCommandHistoryOptions): this;
    /**
     * Set the value of a {@link @tldraw/tlschema#StyleProp} for the selected shapes.
     *
     * @example
     * ```ts
     * editor.setStyleForSelectedShapes(DefaultColorStyle, 'red')
     * editor.setStyleForSelectedShapes(DefaultColorStyle, 'red', { ephemeral: true })
     * ```
     *
     * @param style - The style to set.
     * @param value - The value to set.
     * @param historyOptions - (optional) The history options for the change.
     *
     * @public
     */
    setStyleForNextShapes<T>(style: StyleProp<T>, value: T, historyOptions?: TLCommandHistoryOptions): this;
    /**
     * Set the value of a {@link @tldraw/tlschema#StyleProp}. This change will be applied to the currently selected shapes.
     *
     * @example
     * ```ts
     * editor.setStyleForSelectedShapes(DefaultColorStyle, 'red')
     * editor.setStyleForSelectedShapes(DefaultColorStyle, 'red', { ephemeral: true })
     * ```
     *
     * @param style - The style to set.
     * @param value - The value to set.
     * @param historyOptions - (optional) The history options for the change.
     *
     * @public
     */
    setStyleForSelectedShapes<T>(style: StyleProp<T>, value: T, historyOptions?: TLCommandHistoryOptions): this;
    /* Excluded from this release type: externalAssetContentHandlers */
    /**
     * Register an external content handler. This handler will be called when the editor receives
     * external content of the provided type. For example, the 'image' type handler will be called
     * when a user drops an image onto the canvas.
     *
     * @example
     * ```ts
     * editor.registerExternalAssetHandler('text', myHandler)
     * ```
     *
     * @param type - The type of external content.
     * @param handler - The handler to use for this content type.
     *
     * @public
     */
    registerExternalAssetHandler<T extends TLExternalAssetContent['type']>(type: T, handler: ((info: TLExternalAssetContent & {
        type: T;
    }) => Promise<TLAsset>) | null): this;
    /**
     * Get an asset for an external asset content type.
     *
     * @example
     * ```ts
     * const asset = await editor.getAssetForExternalContent({ type: 'file', file: myFile })
     * const asset = await editor.getAssetForExternalContent({ type: 'url', url: myUrl })
     * ```
     *
     * @param info - Info about the external content.
     * @returns The asset.
     */
    getAssetForExternalContent(info: TLExternalAssetContent): Promise<TLAsset | undefined>;
    /* Excluded from this release type: externalContentHandlers */
    /**
     * Register an external content handler. This handler will be called when the editor receives
     * external content of the provided type. For example, the 'image' type handler will be called
     * when a user drops an image onto the canvas.
     *
     * @example
     * ```ts
     * editor.registerExternalContentHandler('text', myHandler)
     * ```
     *
     * @param type - The type of external content.
     * @param handler - The handler to use for this content type.
     *
     * @public
     */
    registerExternalContentHandler<T extends TLExternalContent['type']>(type: T, handler: ((info: T extends TLExternalContent['type'] ? TLExternalContent & {
        type: T;
    } : TLExternalContent) => void) | null): this;
    /**
     * Handle external content, such as files, urls, embeds, or plain text which has been put into the app, for example by pasting external text or dropping external images onto canvas.
     *
     * @param info - Info about the external content.
     */
    putExternalContent(info: TLExternalContent): Promise<void>;
    /**
     * Get content that can be exported for the given shape ids.
     *
     * @param shapes - The shapes (or shape ids) to get content for.
     *
     * @returns The exported content.
     *
     * @public
     */
    getContentFromCurrentPage(shapes: TLShape[] | TLShapeId[]): TLContent | undefined;
    /**
     * Place content into the editor.
     *
     * @param content - The content.
     * @param options - Options for placing the content.
     *
     * @public
     */
    putContentOntoCurrentPage(content: TLContent, options?: {
        point?: VecLike;
        select?: boolean;
        preservePosition?: boolean;
        preserveIds?: boolean;
    }): this;
    /**
     * Get an exported SVG of the given shapes.
     *
     * @param ids - The shapes (or shape ids) to export.
     * @param opts - Options for the export.
     *
     * @returns The SVG element.
     *
     * @public
     */
    getSvg(shapes: TLShape[] | TLShapeId[], opts?: Partial<{
        scale: number;
        background: boolean;
        padding: number;
        darkMode?: boolean | undefined;
        preserveAspectRatio: React.SVGAttributes<SVGSVGElement>['preserveAspectRatio'];
    }>): Promise<SVGSVGElement | undefined>;
    /**
     * The app's current input state.
     *
     * @public
     */
    inputs: {
        /** The most recent pointer down's position in the current page space. */
        originPagePoint: Vec2d;
        /** The most recent pointer down's position in screen space. */
        originScreenPoint: Vec2d;
        /** The previous pointer position in the current page space. */
        previousPagePoint: Vec2d;
        /** The previous pointer position in screen space. */
        previousScreenPoint: Vec2d;
        /** The most recent pointer position in the current page space. */
        currentPagePoint: Vec2d;
        /** The most recent pointer position in screen space. */
        currentScreenPoint: Vec2d;
        /** A set containing the currently pressed keys. */
        keys: Set<string>;
        /** A set containing the currently pressed buttons. */
        buttons: Set<number>;
        /** Whether the input is from a pe. */
        isPen: boolean;
        /** Whether the shift key is currently pressed. */
        shiftKey: boolean;
        /** Whether the control or command key is currently pressed. */
        ctrlKey: boolean;
        /** Whether the alt or option key is currently pressed. */
        altKey: boolean;
        /** Whether the user is dragging. */
        isDragging: boolean;
        /** Whether the user is pointing. */
        isPointing: boolean;
        /** Whether the user is pinching. */
        isPinching: boolean;
        /** Whether the user is editing. */
        isEditing: boolean;
        /** Whether the user is panning. */
        isPanning: boolean;
        /** Velocity of mouse pointer, in pixels per millisecond */
        pointerVelocity: Vec2d;
    };
    /**
     * Update the input points from a pointer or pinch event.
     *
     * @param info - The event info.
     */
    private _updateInputsFromEvent;
    /**
     * Dispatch a cancel event.
     *
     * @example
     * ```ts
     * editor.cancel()
     * ```
     *
     * @public
     */
    cancel(): this;
    /**
     * Dispatch an interrupt event.
     *
     * @example
     * ```ts
     * editor.interrupt()
     * ```
     *
     * @public
     */
    interrupt(): this;
    /**
     * Dispatch a complete event.
     *
     * @example
     * ```ts
     * editor.complete()
     * ```
     *
     * @public
     */
    complete(): this;
    /* Excluded from this release type: _clickManager */
    /**
     * Prevent a double click event from firing the next time the user clicks
     *
     * @public
     */
    cancelDoubleClick(): void;
    /* Excluded from this release type: _prevCursor */
    /* Excluded from this release type: _shiftKeyTimeout */
    /* Excluded from this release type: _setShiftKeyTimeout */
    /* Excluded from this release type: _altKeyTimeout */
    /* Excluded from this release type: _setAltKeyTimeout */
    /* Excluded from this release type: _ctrlKeyTimeout */
    /* Excluded from this release type: _setCtrlKeyTimeout */
    /* Excluded from this release type: _restoreToolId */
    /* Excluded from this release type: _pinchStart */
    /* Excluded from this release type: _didPinch */
    /* Excluded from this release type: _selectedShapeIdsAtPointerDown */
    /* Excluded from this release type: capturedPointerId */
    /**
     * Dispatch an event to the editor.
     *
     * @example
     * ```ts
     * editor.dispatch(myPointerEvent)
     * ```
     *
     * @param info - The event info.
     *
     * @public
     */
    dispatch: (info: TLEventInfo) => this;
}

/** @public */
export declare class Ellipse2d extends Geometry2d {
    config: Omit<Geometry2dOptions, 'isClosed'> & {
        width: number;
        height: number;
    };
    w: number;
    h: number;
    constructor(config: Omit<Geometry2dOptions, 'isClosed'> & {
        width: number;
        height: number;
    });
    _edges?: Edge2d[];
    get edges(): Edge2d[];
    getVertices(): any[];
    nearestPoint(A: Vec2d): Vec2d;
    hitTestLineSegment(A: Vec2d, B: Vec2d, zoom: number): boolean;
    getBounds(): Box2d;
}

export { EMPTY_ARRAY }

declare class EmptyStackItem<T> implements Iterable<T> {
    readonly length = 0;
    readonly head: null;
    readonly tail: Stack<T>;
    push(head: T): Stack<T>;
    toArray(): [];
    [Symbol.iterator](): {
        next(): {
            value: undefined;
            done: true;
        };
    };
}

declare class EnvironmentManager {
    editor: Editor;
    constructor(editor: Editor);
    /**
     * Whether the editor is running in Safari.
     *
     * @public
     */
    readonly isSafari: boolean;
    /**
     * Whether the editor is running on iOS.
     *
     * @public
     */
    readonly isIos: boolean;
    /**
     * Whether the editor is running on iOS.
     *
     * @public
     */
    readonly isChromeForIos: boolean;
    /**
     * Whether the editor is running on Firefox.
     *
     * @public
     */
    readonly isFirefox: boolean;
    /**
     * Whether the editor is running on Android.
     *
     * @public
     */
    readonly isAndroid: boolean;
}

/** @public */
export declare const EPSILON: number;

/** @public */
export declare class ErrorBoundary extends React_3.Component<React_3.PropsWithRef<React_3.PropsWithChildren<TLErrorBoundaryProps>>, TLErrorBoundaryState> {
    static getDerivedStateFromError(error: Error): {
        error: Error;
    };
    state: TLErrorBoundaryState;
    componentDidCatch(error: unknown): void;
    render(): boolean | JSX.Element | null | number | React_3.ReactFragment | string | undefined;
}

/** @public */
export declare function ErrorScreen({ children }: {
    children: any;
}): JSX.Element;

/** @public */
export declare const EVENT_NAME_MAP: Record<Exclude<TLEventName, TLPinchEventName>, keyof TLEventHandlers>;

declare type ExtractData<Fn> = Fn extends CommandFn<infer Data> ? Data : never;

/* Excluded from this release type: extractSessionStateFromLegacySnapshot */

/* Excluded from this release type: featureFlags */

declare type Gap = {
    startNode: GapNode;
    endNode: GapNode;
    startEdge: [Vec2d, Vec2d];
    endEdge: [Vec2d, Vec2d];
    length: number;
    breadthIntersection: [number, number];
};

declare type GapNode = {
    id: TLShapeId;
    pageBounds: Box2d;
    isClosed: boolean;
};

/** @public */
export declare type GapsSnapLine = {
    id: string;
    type: 'gaps';
    direction: 'horizontal' | 'vertical';
    gaps: Array<{
        startEdge: [VecLike, VecLike];
        endEdge: [VecLike, VecLike];
    }>;
};

/** @public */
export declare abstract class Geometry2d {
    isFilled: boolean;
    isClosed: boolean;
    isLabel: boolean;
    isSnappable: boolean;
    constructor(opts: Geometry2dOptions);
    abstract getVertices(): Vec2d[];
    abstract nearestPoint(point: Vec2d): Vec2d;
    hitTestPoint(point: Vec2d, margin?: number, hitInside?: boolean): boolean;
    distanceToPoint(point: Vec2d, hitInside?: boolean): number;
    distanceToLineSegment(A: Vec2d, B: Vec2d): number;
    hitTestLineSegment(A: Vec2d, B: Vec2d, distance?: number): boolean;
    nearestPointOnLineSegment(A: Vec2d, B: Vec2d): Vec2d;
    isPointInBounds(point: Vec2d, margin?: number): boolean;
    _vertices: undefined | Vec2d[];
    get vertices(): Vec2d[];
    get outerVertices(): Vec2d[];
    getBounds(): Box2d;
    _bounds: Box2d | undefined;
    get bounds(): Box2d;
    _snapPoints: undefined | Vec2d[];
    get snapPoints(): Vec2d[];
    get center(): Vec2d;
    _area: number | undefined;
    get area(): number;
    getArea(): number;
    toSimpleSvgPath(): string;
}

declare interface Geometry2dOptions {
    isFilled: boolean;
    isClosed: boolean;
    isLabel?: boolean;
    isSnappable?: boolean;
}

/**
 * Get the length of an arc between two points on a circle's perimeter.
 *
 * @param C - The circle's center as [x, y].
 * @param r - The circle's radius.
 * @param A - The first point.
 * @param B - The second point.
 * @public
 */
export declare function getArcLength(C: VecLike, r: number, A: VecLike, B: VecLike): number;

/** @public */
export declare function getArrowheadPathForType(info: TLArrowInfo, side: 'end' | 'start', strokeWidth: number): string | undefined;

/** @public */
export declare function getArrowTerminalsInArrowSpace(editor: Editor, shape: TLArrowShape): {
    start: Vec2d;
    end: Vec2d;
};

/** @public */
export declare function getCursor(cursor: TLCursorType, rotation?: number, color?: string): string;

/**
 * Get a solid path for a curved arrow's handles.
 *
 * @param info - The arrow info.
 * @public
 */
export declare function getCurvedArrowHandlePath(info: TLArrowInfo & {
    isStraight: false;
}): string;

/** @public */
export declare function getFreshUserPreferences(): TLUserPreferences;

/**
 * Get an incremented name (e.g. New page (2)) from a name (e.g. New page), based on an array of
 * existing names.
 *
 * @param name - The name to increment.
 * @param others - The array of existing names.
 * @public
 */
export declare function getIncrementedName(name: string, others: string[]): string;

/**
 * Get the index above a given index.
 * @param below - The index below.
 * @public
 */
export declare function getIndexAbove(below: string): string;

/**
 * Get the index below a given index.
 * @param above - The index above.
 *  @public
 */
export declare function getIndexBelow(above: string): string;

/**
 * Get the index between two indices.
 * @param below - The index below.
 * @param above - The index above.
 * @public
 */
export declare function getIndexBetween(below: string, above?: string): string;

/**
 * Get n number of indices, starting at an index.
 * @param n - The number of indices to get.
 * @param start - (optional) The index to start at.
 * @public
 */
export declare function getIndices(n: number, start?: string): string[];

/**
 * Get a number of indices above an index.
 * @param below - The index below.
 * @param n - The number of indices to get.
 * @public
 */
export declare function getIndicesAbove(below: string, n: number): string[];

/**
 * Get a number of indices below an index.
 * @param above - The index above.
 * @param n - The number of indices to get.
 * @public
 */
export declare function getIndicesBelow(above: string, n: number): string[];

/**
 * Get a number of indices between two indices.
 * @param below - (optional) The index below.
 * @param above - (optional) The index above.
 * @param n - The number of indices to get.
 * @public
 */
export declare function getIndicesBetween(below: string | undefined, above: string | undefined, n: number): string[];

/** @public */
export declare function getPointerInfo(e: PointerEvent | React.PointerEvent): {
    point: {
        x: number;
        y: number;
        z: number;
    };
    shiftKey: boolean;
    altKey: boolean;
    ctrlKey: boolean;
    pointerId: number;
    button: number;
    isPen: boolean;
};

/**
 * Get a point on the perimeter of a circle.
 *
 * @param cx - The center x of the circle.
 * @param cy - The center y of the circle.
 * @param r - The radius of the circle.
 * @param a - The normalized point on the circle.
 * @public
 */
export declare function getPointOnCircle(cx: number, cy: number, r: number, a: number): Vec2d;

/** @public */
export declare function getPolygonVertices(width: number, height: number, sides: number): Vec2d[];

/* Excluded from this release type: getRotationSnapshot */

/**
 * Get a solid path for a curved arrow's body.
 *
 * @param info - The arrow info.
 * @public
 */
export declare function getSolidCurvedArrowPath(info: TLArrowInfo & {
    isStraight: false;
}): string;

/** @public */
export declare function getSolidStraightArrowPath(info: TLArrowInfo & {
    isStraight: true;
}): string;

/**
 * Gets the width/height of a star given its input bounds.
 *
 * @param sides - Number of sides
 * @param w - T target width
 * @param h - Target height
 * @returns Box2d
 * @public
 */
export declare const getStarBounds: (sides: number, w: number, h: number) => Box2d;

/** @public */
export declare function getStraightArrowHandlePath(info: TLArrowInfo & {
    isStraight: true;
}): string;

/**
 * Turn an array of points into a path of quadradic curves.
 *
 * @param points - The points returned from perfect-freehand
 * @param closed - Whether the stroke is closed
 *
 * @public
 */
export declare function getSvgPathFromPoints(points: VecLike[], closed?: boolean): string;

/**
 * Get the "sweep" or short distance between two points on a circle's perimeter.
 *
 * @param C - The center of the circle.
 * @param A - The first point.
 * @param B - The second point.
 * @public
 */
export declare function getSweep(C: VecLike, A: VecLike, B: VecLike): number;

/** @public */
export declare function getUserPreferences(): TLUserPreferences;

/** @public */
export declare const GRID_STEPS: {
    min: number;
    mid: number;
    step: number;
}[];

/** @public */
export declare class Group2d extends Geometry2d {
    children: Geometry2d[];
    constructor(config: Omit<Geometry2dOptions, 'isClosed' | 'isFilled'> & {
        children: Geometry2d[];
    });
    getVertices(): Vec2d[];
    nearestPoint(point: Vec2d): Vec2d;
    distanceToPoint(point: Vec2d, hitInside?: boolean): number;
    hitTestPoint(point: Vec2d, margin: number, hitInside: boolean): boolean;
    hitTestLineSegment(A: Vec2d, B: Vec2d, zoom: number): boolean;
    getArea(): number;
    toSimpleSvgPath(): string;
}

/** @public */
export declare class GroupShapeUtil extends ShapeUtil<TLGroupShape> {
    static type: "group";
    static props: ShapeProps<TLGroupShape>;
    static migrations: Migrations;
    hideSelectionBoundsFg: () => boolean;
    canBind: () => boolean;
    getDefaultProps(): TLGroupShape['props'];
    getGeometry(shape: TLGroupShape): Geometry2d;
    component(shape: TLGroupShape): JSX.Element | null;
    indicator(shape: TLGroupShape): JSX.Element;
    onChildrenChange: TLOnChildrenChangeHandler<TLGroupShape>;
}

/**
 * Clear the database of all data associated with tldraw.
 *
 * @public */
export declare function hardReset({ shouldReload }?: {
    shouldReload?: boolean | undefined;
}): Promise<void>;

/** @public */
export declare function hardResetEditor(): void;

/* Excluded from this release type: HASH_PATTERN_ZOOM_NAMES */

declare class HistoryManager<CTX extends {
    emit: (name: 'change-history' | 'mark-history', ...args: any) => void;
}> {
    private readonly ctx;
    private readonly annotateError;
    _undos: Atom<Stack<TLHistoryEntry>, unknown>;
    _redos: Atom<Stack<TLHistoryEntry>, unknown>;
    _batchDepth: number;
    constructor(ctx: CTX, annotateError: (error: unknown) => void);
    onBatchComplete: () => void;
    private _commands;
    get numUndos(): number;
    get numRedos(): number;
    createCommand: <Name extends string, Constructor extends CommandFn<any>>(name: Name, constructor: Constructor, handle: TLCommandHandler<ExtractData<Constructor>>) => (...args: Parameters<Extract<Constructor, (...args: any[]) => any>>) => CTX;
    batch: (fn: () => void) => this;
    private ignoringUpdates;
    private _undo;
    undo: () => this;
    redo: () => this;
    bail: () => this;
    bailToMark: (id: string) => this;
    mark: (id?: string, onUndo?: boolean, onRedo?: boolean) => string;
    clear(): void;
}

/** @public */
export declare const HIT_TEST_MARGIN = 8;

/** @public */
export declare function HTMLContainer({ children, className, ...rest }: HTMLContainerProps): JSX.Element;

/** @public */
export declare type HTMLContainerProps = React_3.HTMLAttributes<HTMLDivElement>;

declare class Idle extends StateNode {
    static id: string;
    onPointerDown: TLEventHandlers['onPointerDown'];
    onEnter: () => void;
    onCancel: () => void;
}

/**
 * Find the intersections between a line segment and a closed polygon.
 *
 * @param a1 - The segment's first point.
 * @param a2 - The segment's second point.
 * @param points - The points in the polygon.
 * @public
 */
export declare function intersectLineSegmentPolygon(a1: VecLike, a2: VecLike, points: VecLike[]): null | VecLike[];

/**
 * Find the intersections between a line segment and a polyline.
 *
 * @param a1 - The segment's first point.
 * @param a2 - The segment's second point.
 * @param points - The points in the polyline.
 * @public
 */
export declare function intersectLineSegmentPolyline(a1: VecLike, a2: VecLike, points: VecLike[]): null | VecLike[];

/**
 * Create a new convex polygon as the intersection of two convex polygons.
 *
 * @param polygonA - An array of points representing the first polygon.
 * @param polygonB - An array of points representing the second polygon.
 * @public
 */
export declare function intersectPolygonPolygon(polygonA: VecLike[], polygonB: VecLike[]): null | VecLike[];

/**
 * Is angle c between angles a and b?
 *
 * @param a - The first angle.
 * @param b - The second angle.
 * @param c - The third angle.
 * @public
 */
export declare function isAngleBetween(a: number, b: number, c: number): boolean;

/**
 * Check if a float is safe to use. ie: Not too big or small.
 * @public
 */
export declare const isSafeFloat: (n: number) => boolean;

/**
 * Interpolate an angle between two angles.
 *
 * @param a0 - The first angle.
 * @param a1 - The second angle.
 * @param t - The interpolation value.
 * @public
 */
export declare function lerpAngles(a0: number, a1: number, t: number): number;

/** @public */
export declare function linesIntersect(A: VecLike, B: VecLike, C: VecLike, D: VecLike): boolean;

/** @public */
export declare function LoadingScreen({ children }: {
    children: any;
}): JSX.Element;

/**
 * Loads a snapshot of the editor's instance state into the store of a new editor instance.
 *
 * @public
 * @param store - The store to load the instance state into
 * @param snapshot - The instance state snapshot to load
 * @returns
 */
export declare function loadSessionStateSnapshotIntoStore(store: TLStore, snapshot: TLSessionStateSnapshot): void;

/**
 * Get the long angle distance between two angles.
 *
 * @param a0 - The first angle.
 * @param a1 - The second angle.
 * @public
 */
export declare function longAngleDist(a0: number, a1: number): number;

/** @public */
export declare function loopToHtmlElement(elm: Element): HTMLElement;

/** @public */
declare type MatLike = Matrix2d | Matrix2dModel;

/** @public */
export declare class Matrix2d {
    constructor(a: number, b: number, c: number, d: number, e: number, f: number);
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    equals(m: Matrix2d | Matrix2dModel): boolean;
    identity(): this;
    multiply(m: Matrix2d | Matrix2dModel): this;
    rotate(r: number, cx?: number, cy?: number): Matrix2d;
    translate(x: number, y: number): Matrix2d;
    scale(x: number, y: number): this;
    invert(): this;
    applyToPoint(point: VecLike): Vec2d;
    applyToPoints(points: VecLike[]): Vec2d[];
    rotation(): number;
    point(): Vec2d;
    decomposed(): MatrixInfo;
    toCssString(): string;
    setTo(model: Matrix2dModel): this;
    decompose(): MatrixInfo;
    clone(): Matrix2d;
    static Identity(): Matrix2d;
    static Translate(x: number, y: number): Matrix2d;
    static Rotate(r: number, cx?: number, cy?: number): Matrix2d;
    static Scale: {
        (x: number, y: number): Matrix2dModel;
        (x: number, y: number, cx: number, cy: number): Matrix2dModel;
    };
    static Multiply(m1: Matrix2dModel, m2: Matrix2dModel): Matrix2dModel;
    static Inverse(m: Matrix2dModel): Matrix2dModel;
    static Absolute(m: MatLike): Matrix2dModel;
    static Compose(...matrices: MatLike[]): Matrix2d;
    static Point(m: MatLike): Vec2d;
    static Rotation(m: MatLike): number;
    static Decompose(m: MatLike): MatrixInfo;
    static Smooth(m: MatLike, precision?: number): MatLike;
    static toCssString(m: MatLike): string;
    static applyToPoint(m: MatLike, point: VecLike): Vec2d;
    static applyToXY(m: MatLike, x: number, y: number): number[];
    static applyToPoints(m: MatLike, points: VecLike[]): Vec2d[];
    static applyToBounds(m: MatLike, box: Box2d): Box2d;
    static From(m: MatLike): Matrix2d;
    static Cast(m: MatLike): Matrix2d;
}

/** @public */
export declare interface Matrix2dModel {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
}

/** @public */
declare interface MatrixInfo {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
}

/* Excluded from this release type: MAX_PAGES */

/* Excluded from this release type: MAX_SHAPES_PER_PAGE */

/* Excluded from this release type: MAX_ZOOM */

/* Excluded from this release type: MIN_ZOOM */

/* Excluded from this release type: MULTI_CLICK_DURATION */

/* Excluded from this release type: normalizeWheel */

/** @public */
export declare function openWindow(url: string, target?: string): void;

/* Excluded from this release type: OptionalErrorBoundary */

/** @public */
declare type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Find the approximate perimeter of an ellipse.
 *
 * @param rx - The ellipse's x radius.
 * @param ry - The ellipse's y radius.
 * @public
 */
export declare function perimeterOfEllipse(rx: number, ry: number): number;

/** @public */
export declare const PI: number;

/** @public */
export declare const PI2: number;

/**
 * Get whether a point is inside of a bounds.
 *
 * @param A - The point to check.
 * @param b - The bounds to check.
 * @returns Boolean
 * @public
 */
export declare function pointInBounds(A: VecLike, b: Box2d): boolean;

/**
 * Utils for working with points.
 *
 * @public
 */
/**
 * Get whether a point is inside of a circle.
 *
 * @param A - The point to check.
 * @param C - The circle's center point as [x, y].
 * @param r - The circle's radius.
 * @returns Boolean
 * @public
 */
export declare function pointInCircle(A: VecLike, C: VecLike, r: number): boolean;

/**
 * Get whether a point is inside of an ellipse.
 *
 * @param point - The point to check.
 * @param center - The ellipse's center point as [x, y].
 * @param rx - The ellipse's x radius.
 * @param ry - The ellipse's y radius.
 * @param rotation - The ellipse's rotation.
 * @returns Boolean
 * @public
 */
export declare function pointInEllipse(A: VecLike, C: VecLike, rx: number, ry: number, rotation?: number): boolean;

declare class Pointing extends StateNode {
    static id: string;
    markId: string;
    wasFocusedOnEnter: boolean;
    onEnter: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: TLEventHandlers['onInterrupt'];
    complete(): void;
    cancel(): void;
}

/**
 * Get whether a point is inside of a polygon.
 *
 * ```ts
 * const result = pointInPolygon(myPoint, myPoints)
 * ```
 *
 * @public
 */
export declare function pointInPolygon(A: VecLike, points: VecLike[]): boolean;

/**
 * Hit test a point and a polyline using a minimum distance.
 *
 * @param A - The point to check.
 * @param points - The points that make up the polyline.
 * @param distance - The mininum distance that qualifies a hit.
 * @returns Boolean
 * @public
 */
export declare function pointInPolyline(A: VecLike, points: VecLike[], distance?: number): boolean;

/**
 * Get whether a point is inside of a rectangle.
 *
 * @param A - The point to check.
 * @param point - The rectangle's top left point as [x, y].
 * @param size - The rectangle's size as [width, height].
 * @public
 */
export declare function pointInRect(A: VecLike, point: VecLike, size: VecLike): boolean;

/**
 * Get whether a point is within a certain distance from a line segment.
 *
 * @param A - The point to check.
 * @param p1 - The polyline's first point.
 * @param p2 - The polyline's second point.
 * @param distance - The mininum distance that qualifies a hit.
 * @public
 */
export declare function pointNearToLineSegment(A: VecLike, p1: VecLike, p2: VecLike, distance?: number): boolean;

/**
 * Get whether a point is within a certain distance from a polyline.
 *
 * @param A - The point to check.
 * @param points - The points that make up the polyline.
 * @param distance - The mininum distance that qualifies a hit.
 * @public
 */
export declare function pointNearToPolyline(A: VecLike, points: VecLike[], distance?: number): boolean;

/** @public */
export declare type PointsSnapLine = {
    id: string;
    type: 'points';
    points: VecLike[];
};

/** @public */
export declare class Polygon2d extends Polyline2d {
    constructor(config: Omit<Geometry2dOptions, 'isClosed'> & {
        points: Vec2d[];
    });
}

/** @public */
export declare function polygonsIntersect(a: VecLike[], b: VecLike[]): boolean;

/** @public */
export declare class Polyline2d extends Geometry2d {
    points: Vec2d[];
    constructor(config: Omit<Geometry2dOptions, 'isClosed' | 'isFilled'> & {
        points: Vec2d[];
    });
    _segments?: Edge2d[];
    get segments(): Edge2d[];
    _length?: number;
    get length(): number;
    getVertices(): Vec2d[];
    nearestPoint(A: Vec2d): Vec2d;
    hitTestLineSegment(A: Vec2d, B: Vec2d, zoom: number): boolean;
}

/** @public */
export declare const PositionedOnCanvas: MemoExoticComponent<({ x: offsetX, y: offsetY, rotation, ...rest }: {
x?: number | undefined;
y?: number | undefined;
rotation?: number | undefined;
} & HTMLProps<HTMLDivElement>) => JSX.Element>;

/** @public */
export declare function precise(A: VecLike): string;

/**
 * This function calls `event.preventDefault()` for you. Why is that useful?
 *
 * Beacuase if you enable `window.preventDefaultLogging = true` it'll log out a message when it
 * happens. Because we use console.warn rather than (log) you'll get a stack trace in the inspector
 * telling you exactly where it happened. This is important because `e.preventDefault()` is the
 * source of many bugs, but unfortuantly it can't be avoided because it also stops a lot of default
 * behaviour which doesn't make sense in our UI
 *
 * @param event - To prevent default on
 * @public
 */
export declare function preventDefault(event: Event | React_2.BaseSyntheticEvent): void;

/**
 * Convert radians to degrees.
 *
 * @param r - The degree in radians.
 * @public
 */
export declare function radiansToDegrees(r: number): number;

/**
 * Finds the intersection of two ranges.
 *
 * @param a0 - The start point in the A range
 * @param a1 - The end point in the A range
 * @param b0 - The start point in the B range
 * @param b1 - The end point in the B range
 * @returns The intersection of the ranges, or null if no intersection
 * @public
 */
export declare function rangeIntersection(a0: number, a1: number, b0: number, b1: number): [number, number] | null;

export { react }

/**
 * A map of {@link @tldraw/tlschema#StyleProp | StyleProps} to their {@link SharedStyle} values. See
 * {@link Editor.sharedStyles}.
 *
 * @public
 */
export declare class ReadonlySharedStyleMap {
    /* Excluded from this release type: map */
    constructor(entries?: Iterable<[StyleProp<unknown>, SharedStyle<unknown>]>);
    get<T>(prop: StyleProp<T>): SharedStyle<T> | undefined;
    getAsKnownValue<T>(prop: StyleProp<T>): T | undefined;
    get size(): number;
    equals(other: ReadonlySharedStyleMap): boolean;
    keys(): IterableIterator<StyleProp<unknown>>;
    values(): IterableIterator<SharedStyle<unknown>>;
    entries(): IterableIterator<[StyleProp<unknown>, SharedStyle<unknown>]>;
    [Symbol.iterator](): IterableIterator<[StyleProp<unknown>, SharedStyle<unknown>]>;
}

/** @public */
export declare class Rectangle2d extends Polygon2d {
    x: number;
    y: number;
    w: number;
    h: number;
    constructor(config: Omit<Geometry2dOptions, 'isClosed'> & {
        x?: number;
        y?: number;
        width: number;
        height: number;
    });
    getBounds(): Box2d;
}

/** @public */
export declare function refreshPage(): void;

/** @public */
export declare function releasePointerCapture(element: Element, event: PointerEvent | React_2.PointerEvent<Element>): void;

/** @public */
export declare type RequiredKeys<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;

/** @public */
export declare function resizeBox(shape: TLBaseBoxShape, info: {
    newPoint: Vec2dModel;
    handle: TLResizeHandle;
    mode: TLResizeMode;
    scaleX: number;
    scaleY: number;
    initialBounds: Box2d;
    initialShape: TLBaseBoxShape;
}, opts?: Partial<{
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
}>): {
    x: number;
    y: number;
    props: {
        w: number;
        h: number;
    };
};

/** @public */
export declare type ResizeBoxOptions = Partial<{
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
}>;

declare class RootState extends StateNode {
    static id: string;
    static initial: string;
    static children: () => never[];
    onKeyDown: TLEventHandlers['onKeyDown'];
}

/** @public */
export declare const ROTATE_CORNER_TO_SELECTION_CORNER: {
    readonly top_left_rotate: "top_left";
    readonly top_right_rotate: "top_right";
    readonly bottom_right_rotate: "bottom_right";
    readonly bottom_left_rotate: "bottom_left";
    readonly mobile_rotate: "top_left";
};

/** @public */
export declare type RotateCorner = 'bottom_left_rotate' | 'bottom_right_rotate' | 'mobile_rotate' | 'top_left_rotate' | 'top_right_rotate';

/** @public */
export declare function rotateSelectionHandle(handle: SelectionHandle, rotation: number): SelectionHandle;

/** @public */
export declare const runtime: {
    openWindow: (url: string, target: string) => void;
    refreshPage: () => void;
    hardReset: () => void;
};

/** @public */
export declare type SelectionCorner = 'bottom_left' | 'bottom_right' | 'top_left' | 'top_right';

/** @public */
export declare type SelectionEdge = 'bottom' | 'left' | 'right' | 'top';

/** @public */
export declare type SelectionHandle = SelectionCorner | SelectionEdge;

/** @public */
export declare function setPointerCapture(element: Element, event: PointerEvent | React_2.PointerEvent<Element>): void;

/** @public */
export declare function setRuntimeOverrides(input: Partial<typeof runtime>): void;

/** @public */
export declare function setUserPreferences(user: TLUserPreferences): void;

/** @public */
export declare const ShapeIndicator: React_3.NamedExoticComponent<{
    id: TLShapeId;
    color?: string | undefined;
    opacity?: number | undefined;
    className?: string | undefined;
}>;

/** @public */
export declare abstract class ShapeUtil<Shape extends TLUnknownShape = TLUnknownShape> {
    editor: Editor;
    constructor(editor: Editor);
    static props?: ShapeProps<TLUnknownShape>;
    static migrations?: Migrations;
    /**
     * The type of the shape util, which should match the shape's type.
     *
     * @public
     */
    static type: string;
    /**
     * Get the default props for a shape.
     *
     * @public
     */
    abstract getDefaultProps(): Shape['props'];
    /**
     * Get the shape's geometry.
     *
     * @param shape - The shape.
     * @public
     */
    abstract getGeometry(shape: Shape): Geometry2d;
    /**
     * Get a JSX element for the shape (as an HTML element).
     *
     * @param shape - The shape.
     * @public
     */
    abstract component(shape: Shape): any;
    /**
     * Get JSX describing the shape's indicator (as an SVG element).
     *
     * @param shape - The shape.
     * @public
     */
    abstract indicator(shape: Shape): any;
    /**
     * Whether the shape can be snapped to by another shape.
     *
     * @public
     */
    canSnap: TLShapeUtilFlag<Shape>;
    /**
     * Whether the shape can be scrolled while editing.
     *
     * @public
     */
    canScroll: TLShapeUtilFlag<Shape>;
    /**
     * Whether the shape should unmount when not visible in the editor. Consider keeping this to false if the shape's `component` has local state.
     *
     * @public
     */
    canUnmount: TLShapeUtilFlag<Shape>;
    /**
     * Whether the shape can be bound to by an arrow.
     *
     * @param _otherShape - The other shape attempting to bind to this shape.
     * @public
     */
    canBind: <K>(_shape: Shape, _otherShape?: K | undefined) => boolean;
    /**
     * Whether the shape can be double clicked to edit.
     *
     * @public
     */
    canEdit: TLShapeUtilFlag<Shape>;
    /**
     * Whether the shape can be resized.
     *
     * @public
     */
    canResize: TLShapeUtilFlag<Shape>;
    /**
     * Whether the shape can be cropped.
     *
     * @public
     */
    canCrop: TLShapeUtilFlag<Shape>;
    /* Excluded from this release type: providesBackgroundForChildren */
    /**
     * Whether the shape should hide its resize handles when selected.
     *
     * @public
     */
    hideResizeHandles: TLShapeUtilFlag<Shape>;
    /**
     * Whether the shape should hide its resize handles when selected.
     *
     * @public
     */
    hideRotateHandle: TLShapeUtilFlag<Shape>;
    /**
     * Whether the shape should hide its selection bounds background when selected.
     *
     * @public
     */
    hideSelectionBoundsBg: TLShapeUtilFlag<Shape>;
    /**
     * Whether the shape should hide its selection bounds foreground when selected.
     *
     * @public
     */
    hideSelectionBoundsFg: TLShapeUtilFlag<Shape>;
    /**
     * Whether the shape's aspect ratio is locked.
     *
     * @public
     */
    isAspectRatioLocked: TLShapeUtilFlag<Shape>;
    /* Excluded from this release type: backgroundComponent */
    /**
     * Get an array of handle models for the shape. This is an optional method.
     *
     * @example
     *
     * ```ts
     * util.getHandles?.(myShape)
     * ```
     *
     * @param shape - The shape.
     * @public
     */
    getHandles?(shape: Shape): TLHandle[];
    /**
     * Get an array of outline segments for the shape. For most shapes,
     * this will be a single segment that includes the entire outline.
     * For shapes with handles, this might be segments of the outline
     * between each handle.
     *
     * @example
     *
     * ```ts
     * util.getOutlineSegments(myShape)
     * ```
     *
     * @param shape - The shape.
     * @public
     */
    getOutlineSegments(shape: Shape): Vec2d[][];
    /**
     * Get whether the shape can receive children of a given type.
     *
     * @param type - The shape type.
     * @public
     */
    canReceiveNewChildrenOfType(shape: Shape, type: TLShape['type']): boolean;
    /**
     * Get whether the shape can receive children of a given type.
     *
     * @param shape - The shape type.
     * @param shapes - The shapes that are being dropped.
     * @public
     */
    canDropShapes(shape: Shape, shapes: TLShape[]): boolean;
    /**
     * Get the shape as an SVG object.
     *
     * @param shape - The shape.
     * @param ctx - The export context for the SVG - used for adding e.g. \<def\>s
     * @returns An SVG element.
     * @public
     */
    toSvg?(shape: Shape, ctx: SvgExportContext): Promise<SVGElement> | SVGElement;
    /**
     * Get the shape's background layer as an SVG object.
     *
     * @param shape - The shape.
     * @param ctx - ctx - The export context for the SVG - used for adding e.g. \<def\>s
     * @returns An SVG element.
     * @public
     */
    toBackgroundSvg?(shape: Shape, ctx: SvgExportContext): null | Promise<SVGElement> | SVGElement;
    /* Excluded from this release type: expandSelectionOutlinePx */
    /**
     * Return elements to be added to the \<defs\> section of the canvases SVG context. This can be
     * used to define SVG content (e.g. patterns & masks) that can be referred to by ID from svg
     * elements returned by `component`.
     *
     * Each def should have a unique `key`. If multiple defs from different shapes all have the same
     * key, only one will be used.
     */
    getCanvasSvgDefs(): TLShapeUtilCanvasSvgDef[];
    /**
     * A callback called just before a shape is created. This method provides a last chance to modify
     * the created shape.
     *
     * @example
     *
     * ```ts
     * onBeforeCreate = (next) => {
     * 	return { ...next, x: next.x + 1 }
     * }
     * ```
     *
     * @param next - The next shape.
     * @returns The next shape or void.
     * @public
     */
    onBeforeCreate?: TLOnBeforeCreateHandler<Shape>;
    /**
     * A callback called just before a shape is updated. This method provides a last chance to modify
     * the updated shape.
     *
     * @example
     *
     * ```ts
     * onBeforeUpdate = (prev, next) => {
     * 	if (prev.x === next.x) {
     * 		return { ...next, x: next.x + 1 }
     * 	}
     * }
     * ```
     *
     * @param prev - The previous shape.
     * @param next - The next shape.
     * @returns The next shape or void.
     * @public
     */
    onBeforeUpdate?: TLOnBeforeUpdateHandler<Shape>;
    /**
     * A callback called when some other shapes are dragged over this one.
     *
     * @example
     *
     * ```ts
     * onDragShapesOver = (shape, shapes) => {
     * 	return { shouldHint: true }
     * }
     * ```
     *
     * @param shape - The shape.
     * @param shapes - The shapes that are being dragged over this one.
     * @returns An object specifying whether the shape should hint that it can receive the dragged shapes.
     * @public
     */
    onDragShapesOver?: TLOnDragHandler<Shape, {
        shouldHint: boolean;
    }>;
    /**
     * A callback called when some other shapes are dragged out of this one.
     *
     * @param shape - The shape.
     * @param shapes - The shapes that are being dragged out.
     * @public
     */
    onDragShapesOut?: TLOnDragHandler<Shape>;
    /**
     * A callback called when some other shapes are dropped over this one.
     *
     * @param shape - The shape.
     * @param shapes - The shapes that are being dropped over this one.
     * @public
     */
    onDropShapesOver?: TLOnDragHandler<Shape>;
    /**
     * A callback called when a shape starts being resized.
     *
     * @param shape - The shape.
     * @returns A change to apply to the shape, or void.
     * @public
     */
    onResizeStart?: TLOnResizeStartHandler<Shape>;
    /**
     * A callback called when a shape changes from a resize.
     *
     * @param shape - The shape at the start of the resize.
     * @param info - Info about the resize.
     * @returns A change to apply to the shape, or void.
     * @public
     */
    onResize?: TLOnResizeHandler<Shape>;
    /**
     * A callback called when a shape finishes resizing.
     *
     * @param initial - The shape at the start of the resize.
     * @param current - The current shape.
     * @returns A change to apply to the shape, or void.
     * @public
     */
    onResizeEnd?: TLOnResizeEndHandler<Shape>;
    /**
     * A callback called when a shape starts being translated.
     *
     * @param shape - The shape.
     * @returns A change to apply to the shape, or void.
     * @public
     */
    onTranslateStart?: TLOnTranslateStartHandler<Shape>;
    /**
     * A callback called when a shape changes from a translation.
     *
     * @param initial - The shape at the start of the translation.
     * @param current - The current shape.
     * @returns A change to apply to the shape, or void.
     * @public
     */
    onTranslate?: TLOnTranslateHandler<Shape>;
    /**
     * A callback called when a shape finishes translating.
     *
     * @param initial - The shape at the start of the translation.
     * @param current - The current shape.
     * @returns A change to apply to the shape, or void.
     * @public
     */
    onTranslateEnd?: TLOnTranslateEndHandler<Shape>;
    /**
     * A callback called when a shape starts being rotated.
     *
     * @param shape - The shape.
     * @returns A change to apply to the shape, or void.
     * @public
     */
    onRotateStart?: TLOnRotateStartHandler<Shape>;
    /**
     * A callback called when a shape changes from a rotation.
     *
     * @param initial - The shape at the start of the rotation.
     * @param current - The current shape.
     * @returns A change to apply to the shape, or void.
     * @public
     */
    onRotate?: TLOnRotateHandler<Shape>;
    /**
     * A callback called when a shape finishes rotating.
     *
     * @param initial - The shape at the start of the rotation.
     * @param current - The current shape.
     * @returns A change to apply to the shape, or void.
     * @public
     */
    onRotateEnd?: TLOnRotateEndHandler<Shape>;
    /**
     * A callback called when a shape's handle changes.
     *
     * @param shape - The shape.
     * @param info - An object containing the handle and whether the handle is 'precise' or not.
     * @returns A change to apply to the shape, or void.
     * @public
     */
    onHandleChange?: TLOnHandleChangeHandler<Shape>;
    /* Excluded from this release type: onBindingChange */
    /**
     * A callback called when a shape's children change.
     *
     * @param shape - The shape.
     * @returns An array of shape updates, or void.
     * @public
     */
    onChildrenChange?: TLOnChildrenChangeHandler<Shape>;
    /**
     * A callback called when a shape's handle is double clicked.
     *
     * @param shape - The shape.
     * @param handle - The handle that is double-clicked.
     * @returns A change to apply to the shape, or void.
     * @public
     */
    onDoubleClickHandle?: TLOnDoubleClickHandleHandler<Shape>;
    /**
     * A callback called when a shape's edge is double clicked.
     *
     * @param shape - The shape.
     * @returns A change to apply to the shape, or void.
     * @public
     */
    onDoubleClickEdge?: TLOnDoubleClickHandler<Shape>;
    /**
     * A callback called when a shape is double clicked.
     *
     * @param shape - The shape.
     * @returns A change to apply to the shape, or void.
     * @public
     */
    onDoubleClick?: TLOnDoubleClickHandler<Shape>;
    /**
     * A callback called when a shape is clicked.
     *
     * @param shape - The shape.
     * @returns A change to apply to the shape, or void.
     * @public
     */
    onClick?: TLOnClickHandler<Shape>;
    /**
     * A callback called when a shape finishes being editing.
     *
     * @param shape - The shape.
     * @public
     */
    onEditEnd?: TLOnEditEndHandler<Shape>;
}

/**
 * The value of a particular {@link @tldraw/tlschema#StyleProp}.
 *
 * A `mixed` style means that in the current selection, there are lots of different values for the
 * same style prop - e.g. a red and a blue shape are selected.
 *
 * A `shared` style means that all shapes in the selection share the same value for this style prop.
 *
 * @public
 */
export declare type SharedStyle<T> = {
    readonly type: 'mixed';
} | {
    readonly type: 'shared';
    readonly value: T;
};

/* Excluded from this release type: SharedStyleMap */

/**
 * Get the short angle distance between two angles.
 *
 * @param a0 - The first angle.
 * @param a1 - The second angle.
 * @public
 */
export declare function shortAngleDist(a0: number, a1: number): number;

/**
 * The side effect manager (aka a "correct state enforcer") is responsible
 * for making sure that the editor's state is always correct. This includes
 * things like: deleting a shape if its parent is deleted; unbinding
 * arrows when their binding target is deleted; etc.
 *
 * @public
 */
declare class SideEffectManager<CTX extends {
    store: TLStore;
    history: {
        onBatchComplete: () => void;
    };
}> {
    editor: CTX;
    constructor(editor: CTX);
    private _beforeCreateHandlers;
    private _afterCreateHandlers;
    private _beforeChangeHandlers;
    private _afterChangeHandlers;
    private _beforeDeleteHandlers;
    private _afterDeleteHandlers;
    private _batchCompleteHandlers;
    registerBeforeCreateHandler<T extends TLRecord['typeName']>(typeName: T, handler: TLBeforeCreateHandler<TLRecord & {
        typeName: T;
    }>): () => void;
    registerAfterCreateHandler<T extends TLRecord['typeName']>(typeName: T, handler: TLAfterCreateHandler<TLRecord & {
        typeName: T;
    }>): () => void;
    registerBeforeChangeHandler<T extends TLRecord['typeName']>(typeName: T, handler: TLBeforeChangeHandler<TLRecord & {
        typeName: T;
    }>): () => void;
    registerAfterChangeHandler<T extends TLRecord['typeName']>(typeName: T, handler: TLAfterChangeHandler<TLRecord & {
        typeName: T;
    }>): () => void;
    registerBeforeDeleteHandler<T extends TLRecord['typeName']>(typeName: T, handler: TLBeforeDeleteHandler<TLRecord & {
        typeName: T;
    }>): () => void;
    registerAfterDeleteHandler<T extends TLRecord['typeName']>(typeName: T, handler: TLAfterDeleteHandler<TLRecord & {
        typeName: T;
    }>): () => void;
    /**
     * Register a handler to be called when a store completes a batch.
     *
     * @example
     * ```ts
     * let count = 0
     *
     * editor.cleanup.registerBatchCompleteHandler(() => count++)
     *
     * editor.selectAll()
     * expect(count).toBe(1)
     *
     * editor.batch(() => {
     *	editor.selectNone()
     * 	editor.selectAll()
     * })
     *
     * expect(count).toBe(2)
     * ```
     *
     * @param handler - The handler to call
     *
     * @public
     */
    registerBatchCompleteHandler(handler: TLBatchCompleteHandler): () => void;
}

export { Signal }

/** @public */
export declare const SIN: (x: number) => number;

/**
 * Clamp rotation to even segments.
 *
 * @param r - The rotation in radians.
 * @param segments - The number of segments.
 * @public
 */
export declare function snapAngle(r: number, segments: number): number;

declare interface SnapData {
    nudge: Vec2d;
}

/** @public */
export declare type SnapLine = GapsSnapLine | PointsSnapLine;

/** @public */
export declare class SnapManager {
    readonly editor: Editor;
    private _snapLines;
    get lines(): SnapLine[];
    clear(): void;
    setLines(lines: SnapLine[]): void;
    constructor(editor: Editor);
    get snapPointsCache(): ComputedCache<SnapPoint[], TLShape>;
    get snapThreshold(): number;
    get snappableShapes(): GapNode[];
    get currentCommonAncestor(): TLShapeId | undefined;
    get snappablePoints(): SnapPoint[];
    get visibleGaps(): {
        horizontal: Gap[];
        vertical: Gap[];
    };
    snapTranslate({ lockedAxis, initialSelectionPageBounds, initialSelectionSnapPoints, dragDelta, }: {
        lockedAxis: 'x' | 'y' | null;
        initialSelectionSnapPoints: SnapPoint[];
        initialSelectionPageBounds: Box2d;
        dragDelta: Vec2d;
    }): SnapData;
    get outlinesInPageSpace(): Vec2d[][];
    getSnappingHandleDelta({ handlePoint, additionalSegments, }: {
        handlePoint: Vec2d;
        additionalSegments: Vec2d[][];
    }): null | Vec2d;
    snapResize({ initialSelectionPageBounds, dragDelta, handle: originalHandle, isAspectRatioLocked, isResizingFromCenter, }: {
        initialSelectionPageBounds: Box2d;
        dragDelta: Vec2d;
        handle: SelectionCorner | SelectionEdge;
        isAspectRatioLocked: boolean;
        isResizingFromCenter: boolean;
    }): SnapData;
    private collectPointSnaps;
    private collectGapSnaps;
    private getPointSnapLines;
    private getGapSnapLines;
}

/** @public */
export declare interface SnapPoint {
    id: string;
    x: number;
    y: number;
    handle?: SelectionCorner;
}

/**
 * Sort by index.
 * @param a - An object with an index property.
 * @param b - An object with an index property.
 * @public */
export declare function sortByIndex<T extends {
    index: string;
}>(a: T, b: T): -1 | 0 | 1;

declare type Stack<T> = EmptyStackItem<T> | StackItem<T>;

declare class StackItem<T> implements Iterable<T> {
    readonly head: T;
    readonly tail: Stack<T>;
    length: number;
    constructor(head: T, tail: Stack<T>);
    push(head: T): Stack<T>;
    toArray(): (NonNullable<T> | undefined)[];
    [Symbol.iterator](): {
        next(): {
            value: NonNullable<T>;
            done: false;
        } | {
            value: undefined;
            done: true;
        };
    };
}

/** @public */
export declare class Stadium2d extends Ellipse2d {
    config: Omit<Geometry2dOptions, 'isClosed'> & {
        width: number;
        height: number;
    };
    constructor(config: Omit<Geometry2dOptions, 'isClosed'> & {
        width: number;
        height: number;
    });
    getVertices(): Vec2d[];
}

/** @public */
export declare abstract class StateNode implements Partial<TLEventHandlers> {
    editor: Editor;
    constructor(editor: Editor, parent?: StateNode);
    path: Computed<string>;
    static id: string;
    static initial?: string;
    static children?: () => TLStateNodeConstructor[];
    id: string;
    current: Atom<StateNode | undefined>;
    type: TLStateNodeType;
    shapeType?: string;
    initial?: string;
    children?: Record<string, StateNode>;
    parent: StateNode;
    isActive: boolean;
    transition(id: string, info: any): this;
    handleEvent(info: Exclude<TLEventInfo, TLPinchEventInfo>): void;
    enter(info: any, from: string): void;
    exit(info: any, from: string): void;
    /**
     * This is a hack / escape hatch that will tell the editor to
     * report a different state as active (in `currentToolId`) when
     * this state is active. This is usually used when a tool transitions
     * to a child of a different state for a certain interaction and then
     * returns to the original tool when that interaction completes; and
     * where we would want to show the original tool as active in the UI.
     *
     * @public
     */
    _currentToolIdMask: Atom<string | undefined, unknown>;
    get currentToolIdMask(): string | undefined;
    set currentToolIdMask(id: string | undefined);
    onWheel?: TLEventHandlers['onWheel'];
    onPointerDown?: TLEventHandlers['onPointerDown'];
    onPointerMove?: TLEventHandlers['onPointerMove'];
    onPointerUp?: TLEventHandlers['onPointerUp'];
    onDoubleClick?: TLEventHandlers['onDoubleClick'];
    onTripleClick?: TLEventHandlers['onTripleClick'];
    onQuadrupleClick?: TLEventHandlers['onQuadrupleClick'];
    onRightClick?: TLEventHandlers['onRightClick'];
    onMiddleClick?: TLEventHandlers['onMiddleClick'];
    onKeyDown?: TLEventHandlers['onKeyDown'];
    onKeyUp?: TLEventHandlers['onKeyUp'];
    onKeyRepeat?: TLEventHandlers['onKeyRepeat'];
    onCancel?: TLEventHandlers['onCancel'];
    onComplete?: TLEventHandlers['onComplete'];
    onInterrupt?: TLEventHandlers['onInterrupt'];
    onEnter?: TLEnterEventHandler;
    onExit?: TLExitEventHandler;
}

/** @public */
export declare const stopEventPropagation: (e: any) => any;

/* Excluded from this release type: SVG_PADDING */

/** @public */
export declare function SVGContainer({ children, className, ...rest }: SVGContainerProps): JSX.Element;

/** @public */
export declare type SVGContainerProps = React_3.HTMLAttributes<SVGElement>;

/** @public */
export declare interface SvgExportContext {
    /**
     * Add contents to the `<defs>` section of the export SVG. Each export def should have a unique
     * key. If multiple defs come with the same key, only one will be added.
     */
    addExportDef(def: SvgExportDef): void;
}

/** @public */
export declare interface SvgExportDef {
    key: string;
    getElement: () => null | Promise<null | SVGElement | SVGElement[]> | SVGElement | SVGElement[];
}

/**
 * A string that is unique per browser tab
 * @public
 */
export declare const TAB_ID: string;

/** @public */
export declare const TAU: number;

declare class TextManager {
    editor: Editor;
    constructor(editor: Editor);
    getTextElement(): HTMLDivElement;
    measureText: (textToMeasure: string, opts: {
        fontStyle: string;
        fontWeight: string;
        fontFamily: string;
        fontSize: number;
        lineHeight: number;
        width: string;
        minWidth?: string;
        maxWidth: string;
        padding: string;
    }) => Box2dModel;
    /**
     * Given an html element, measure the position of each span of unbroken
     * word/white-space characters within any text nodes it contains.
     */
    measureElementTextNodeSpans(element: HTMLElement, { shouldTruncateToFirstLine }?: {
        shouldTruncateToFirstLine?: boolean;
    }): {
        spans: {
            box: Box2dModel;
            text: string;
        }[];
        didTruncate: boolean;
    };
    /**
     * Measure text into individual spans. Spans are created by rendering the
     * text, then dividing it up according to line breaks and word boundaries.
     *
     * It works by having the browser render the text, then measuring the
     * position of each character. You can use this to replicate the text-layout
     * algorithm of the current browser in e.g. an SVG export.
     */
    measureTextSpans(textToMeasure: string, opts: TLMeasureTextSpanOpts): {
        text: string;
        box: Box2dModel;
    }[];
}

/** @public */
declare type TLAfterChangeHandler<R extends TLRecord> = (prev: R, next: R, source: 'remote' | 'user') => void;

/** @public */
declare type TLAfterCreateHandler<R extends TLRecord> = (record: R, source: 'remote' | 'user') => void;

/** @public */
declare type TLAfterDeleteHandler<R extends TLRecord> = (record: R, source: 'remote' | 'user') => void;

/** @public */
export declare type TLAnimationOptions = Partial<{
    duration: number;
    easing: (t: number) => number;
}>;

/** @public */
export declare type TLAnyShapeUtilConstructor = TLShapeUtilConstructor<any>;

/** @public */
declare interface TLArcInfo {
    center: VecLike;
    radius: number;
    size: number;
    length: number;
    largeArcFlag: number;
    sweepFlag: number;
}

/** @public */
declare type TLArrowInfo = {
    isStraight: false;
    start: TLArrowPoint;
    end: TLArrowPoint;
    middle: VecLike;
    handleArc: TLArcInfo;
    bodyArc: TLArcInfo;
    isValid: boolean;
} | {
    isStraight: true;
    start: TLArrowPoint;
    end: TLArrowPoint;
    middle: VecLike;
    isValid: boolean;
    length: number;
};

/** @public */
declare type TLArrowPoint = {
    handle: VecLike;
    point: VecLike;
    arrowhead: TLArrowShapeArrowheadStyle;
};

/** @public */
export declare type TLBackgroundComponent = ComponentType;

/** @public */
export declare type TLBaseBoxShape = TLBaseShape<string, {
    w: number;
    h: number;
}>;

/** @public */
export declare interface TLBaseEventInfo {
    type: UiEventType;
    shiftKey: boolean;
    altKey: boolean;
    ctrlKey: boolean;
}

/** @public */
declare type TLBatchCompleteHandler = () => void;

/** @public */
declare type TLBeforeChangeHandler<R extends TLRecord> = (prev: R, next: R, source: 'remote' | 'user') => R;

/** @public */
declare type TLBeforeCreateHandler<R extends TLRecord> = (record: R, source: 'remote' | 'user') => R;

/** @public */
declare type TLBeforeDeleteHandler<R extends TLRecord> = (record: R, source: 'remote' | 'user') => false | void;

/** @public */
export declare type TLBrushComponent = ComponentType<{
    brush: Box2dModel;
    color?: string;
    opacity?: number;
    className?: string;
}>;

/** @public */
export declare type TLCancelEvent = (info: TLCancelEventInfo) => void;

/** @public */
export declare type TLCancelEventInfo = {
    type: 'misc';
    name: 'cancel';
};

/** @public */
export declare type TLClickEvent = (info: TLClickEventInfo) => void;

/** @public */
export declare type TLClickEventInfo = TLBaseEventInfo & {
    type: 'click';
    name: TLCLickEventName;
    point: VecLike;
    pointerId: number;
    button: number;
    phase: 'down' | 'settle' | 'up';
} & TLPointerEventTarget;

/** @public */
export declare type TLCLickEventName = 'double_click' | 'quadruple_click' | 'triple_click';

declare type TLClickState = 'idle' | 'overflow' | 'pendingDouble' | 'pendingOverflow' | 'pendingQuadruple' | 'pendingTriple';

/** @public */
export declare type TLCollaboratorHintComponent = ComponentType<{
    className?: string;
    point: Vec2dModel;
    viewport: Box2d;
    zoom: number;
    opacity?: number;
    color: string;
}>;

/** @public */
export declare type TLCommand<Name extends string = any, Data = any> = {
    type: 'command';
    id: string;
    data: Data;
    name: Name;
    /**
     * Allows for commands that change state and should be undoable, but are 'inconsequential' and
     * should not clear the redo stack. e.g. modifying the set of selected ids.
     */
    preservesRedoStack?: boolean;
};

/** @public */
export declare type TLCommandHandler<Data> = {
    do: (data: Data) => void;
    undo: (data: Data) => void;
    redo?: (data: Data) => void;
    /**
     * Allow to combine the next command with the previous one if possible. Useful for, e.g. combining
     * a series of shape translation commands into one command in the undo stack
     */
    squash?: (prevData: Data, nextData: Data) => Data;
};

/** @public */
declare type TLCommandHistoryOptions = Partial<{
    /**
     * When true, this command will be squashed with the previous command in the undo / redo stack.
     */
    squashing: boolean;
    /**
     * When true, this command will not add anything to the undo / redo stack. Its change will never be undone or redone.
     */
    ephemeral: boolean;
    /**
     * When true, adding this this command will not clear out the redo stack.
     */
    preservesRedoStack: boolean;
}>;

/** @public */
export declare type TLCompleteEvent = (info: TLCompleteEventInfo) => void;

/** @public */
export declare type TLCompleteEventInfo = {
    type: 'misc';
    name: 'complete';
};

/** @public */
export declare interface TLContent {
    shapes: TLShape[];
    rootShapeIds: TLShapeId[];
    assets: TLAsset[];
    schema: SerializedSchema;
}

/** @public */
export declare type TLCursorComponent = ComponentType<{
    className?: string;
    point: null | Vec2dModel;
    zoom: number;
    color?: string;
    name: null | string;
    chatMessage: string;
}>;

/** @public */
export declare const TldrawEditor: React_2.NamedExoticComponent<TldrawEditorProps>;

/**
 * Base props for the {@link @tldraw/tldraw#Tldraw} and {@link TldrawEditor} components.
 *
 * @public
 */
export declare interface TldrawEditorBaseProps {
    /**
     * The component's children.
     */
    children?: any;
    /**
     * An array of shape utils to use in the editor.
     */
    shapeUtils?: readonly TLAnyShapeUtilConstructor[];
    /**
     * An array of tools to add to the editor's state chart.
     */
    tools?: readonly TLStateNodeConstructor[];
    /**
     * Whether to automatically focus the editor when it mounts.
     */
    autoFocus?: boolean;
    /**
     * Overrides for the editor's components, such as handles, collaborator cursors, etc.
     */
    components?: Partial<TLEditorComponents>;
    /**
     * Called when the editor has mounted.
     */
    onMount?: TLOnMountHandler;
    /**
     * The editor's initial state (usually the id of the first active tool).
     */
    initialState?: string;
    /**
     * A classname to pass to the editor's container.
     */
    className?: string;
    /**
     * The user interacting with the editor.
     */
    user?: TLUser;
}

/**
 * Props for the {@link @tldraw/tldraw#Tldraw} and {@link TldrawEditor} components.
 *
 * @public
 **/
export declare type TldrawEditorProps = TldrawEditorBaseProps & ({
    store: TLStore | TLStoreWithStatus;
} | {
    store?: undefined;
    snapshot?: StoreSnapshot<TLRecord>;
    initialData?: SerializedStore<TLRecord>;
    persistenceKey?: string;
    sessionId?: string;
    defaultName?: string;
});

/** @public */
export declare type TLEditorComponents = {
    [K in keyof BaseEditorComponents]: BaseEditorComponents[K] | null;
} & {
    ErrorFallback: TLErrorFallbackComponent;
    ShapeErrorFallback: TLShapeErrorFallbackComponent;
    ShapeIndicatorErrorFallback: TLShapeIndicatorErrorFallbackComponent;
};

/** @public */
export declare interface TLEditorOptions {
    /**
     * The Store instance to use for keeping the app's data. This may be prepopulated, e.g. by loading
     * from a server or database.
     */
    store: TLStore;
    /**
     * An array of shapes to use in the editor. These will be used to create and manage shapes in the editor.
     */
    shapeUtils: readonly TLShapeUtilConstructor<TLUnknownShape>[];
    /**
     * An array of tools to use in the editor. These will be used to handle events and manage user interactions in the editor.
     */
    tools: readonly TLStateNodeConstructor[];
    /**
     * Should return a containing html element which has all the styles applied to the editor. If not
     * given, the body element will be used.
     */
    getContainer: () => HTMLElement;
    /**
     * (optional) A user defined externally to replace the default user.
     */
    user?: TLUser;
    /**
     * (optional) The editor's initial active tool (or other state node id).
     */
    initialState?: string;
}

/** @public */
export declare type TLEnterEventHandler = (info: any, from: string) => void;

/** @public */
export declare interface TLErrorBoundaryProps {
    children: React_3.ReactNode;
    onError?: ((error: unknown) => void) | null;
    fallback: TLErrorFallbackComponent;
}

declare type TLErrorBoundaryState = {
    error: Error | null;
};

/** @public */
declare type TLErrorFallbackComponent = ComponentType<{
    error: unknown;
    editor?: Editor;
}>;

declare type TLEventChangeHandler<T extends TLShape> = (initial: T, current: T) => TLShapePartial<T> | void;

/** @public */
export declare interface TLEventHandlers {
    onPointerDown: TLPointerEvent;
    onPointerMove: TLPointerEvent;
    onRightClick: TLPointerEvent;
    onDoubleClick: TLClickEvent;
    onTripleClick: TLClickEvent;
    onQuadrupleClick: TLClickEvent;
    onMiddleClick: TLPointerEvent;
    onPointerUp: TLPointerEvent;
    onKeyDown: TLKeyboardEvent;
    onKeyUp: TLKeyboardEvent;
    onKeyRepeat: TLKeyboardEvent;
    onWheel: TLWheelEvent;
    onCancel: TLCancelEvent;
    onComplete: TLCompleteEvent;
    onInterrupt: TLInterruptEvent;
}

/** @public */
export declare type TLEventInfo = TLCancelEventInfo | TLClickEventInfo | TLCompleteEventInfo | TLInterruptEventInfo | TLKeyboardEventInfo | TLPinchEventInfo | TLPointerEventInfo | TLWheelEventInfo;

/** @public */
export declare interface TLEventMap {
    mount: [];
    'max-shapes': [{
        name: string;
        pageId: TLPageId;
        count: number;
    }];
    change: [HistoryEntry<TLRecord>];
    update: [];
    crash: [{
        error: unknown;
    }];
    'stop-camera-animation': [];
    'stop-following': [];
    event: [TLEventInfo];
    tick: [number];
    frame: [number];
    'change-history': [{
        reason: 'bail';
        markId?: string;
    } | {
        reason: 'push' | 'redo' | 'undo';
    }];
    'mark-history': [{
        id: string;
    }];
}

/** @public */
export declare type TLEventMapHandler<T extends keyof TLEventMap> = (...args: TLEventMap[T]) => void;

/** @public */
export declare type TLEventName = 'cancel' | 'complete' | 'interrupt' | 'wheel' | TLCLickEventName | TLKeyboardEventName | TLPinchEventName | TLPointerEventName;

declare type TLEventStartHandler<T extends TLShape> = (shape: T) => TLShapePartial<T> | void;

/** @public */
export declare type TLExitEventHandler = (info: any, to: string) => void;

/** @public */
export declare type TLExternalAssetContent = {
    type: 'file';
    file: File;
} | {
    type: 'url';
    url: string;
};

/** @public */
export declare type TLExternalContent = {
    sources?: TLExternalContentSource[];
    point?: VecLike;
} & ({
    type: 'embed';
    url: string;
    embed: EmbedDefinition;
} | {
    type: 'files';
    files: File[];
    ignoreParent: boolean;
} | {
    type: 'svg-text';
    text: string;
} | {
    type: 'text';
    text: string;
} | {
    type: 'url';
    url: string;
});

/** @public */
export declare type TLExternalContentSource = {
    type: 'error';
    data: null | string;
    reason: string;
} | {
    type: 'excalidraw';
    data: any;
} | {
    type: 'text';
    data: string;
    subtype: 'html' | 'json' | 'text' | 'url';
} | {
    type: 'tldraw';
    data: TLContent;
};

/** @public */
export declare type TLGridComponent = ComponentType<{
    x: number;
    y: number;
    z: number;
    size: number;
}>;

/** @public */
export declare type TLHandleComponent = ComponentType<{
    shapeId: TLShapeId;
    handle: TLHandle;
    zoom: number;
    isCoarse: boolean;
    className?: string;
}>;

/** @public */
export declare type TLHandlesComponent = ComponentType<{
    className?: string;
    children: any;
}>;

/** @public */
export declare type TLHistoryEntry = TLCommand | TLHistoryMark;

/** @public */
export declare type TLHistoryMark = {
    type: 'STOP';
    id: string;
    onUndo: boolean;
    onRedo: boolean;
};

/** @public */
export declare type TLHoveredShapeIndicatorComponent = ComponentType<{
    shapeId: TLShapeId;
}>;

/** @public */
export declare type TLInterruptEvent = (info: TLInterruptEventInfo) => void;

/** @public */
export declare type TLInterruptEventInfo = {
    type: 'misc';
    name: 'interrupt';
};

/** @public */
export declare type TLKeyboardEvent = (info: TLKeyboardEventInfo) => void;

/** @public */
export declare type TLKeyboardEventInfo = TLBaseEventInfo & {
    type: 'keyboard';
    name: TLKeyboardEventName;
    key: string;
    code: string;
};

/** @public */
export declare type TLKeyboardEventName = 'key_down' | 'key_repeat' | 'key_up';

declare type TLMeasureTextSpanOpts = {
    overflow: TLOverflowMode;
    width: number;
    height: number;
    padding: number;
    fontSize: number;
    fontWeight: string;
    fontFamily: string;
    fontStyle: string;
    lineHeight: number;
    textAlign: TLDefaultHorizontalAlignStyle;
};

/** @public */
export declare type TLOnBeforeCreateHandler<T extends TLShape> = (next: T) => T | void;

/** @public */
export declare type TLOnBeforeUpdateHandler<T extends TLShape> = (prev: T, next: T) => T | void;

/* Excluded from this release type: TLOnBindingChangeHandler */

/** @public */
export declare type TLOnChildrenChangeHandler<T extends TLShape> = (shape: T) => TLShapePartial[] | void;

/** @public */
export declare type TLOnClickHandler<T extends TLShape> = (shape: T) => TLShapePartial<T> | void;

/** @public */
export declare type TLOnDoubleClickHandleHandler<T extends TLShape> = (shape: T, handle: TLHandle) => TLShapePartial<T> | void;

/** @public */
export declare type TLOnDoubleClickHandler<T extends TLShape> = (shape: T) => TLShapePartial<T> | void;

/** @public */
export declare type TLOnDragHandler<T extends TLShape, R = void> = (shape: T, shapes: TLShape[]) => R;

/** @public */
export declare type TLOnEditEndHandler<T extends TLShape> = (shape: T) => void;

/** @public */
export declare type TLOnHandleChangeHandler<T extends TLShape> = (shape: T, info: {
    handle: TLHandle;
    isPrecise: boolean;
}) => TLShapePartial<T> | void;

/**
 * Called when the editor has mounted.
 * @example
 * ```ts
 * <Tldraw onMount={(editor) => editor.selectAll()} />
 * ```
 * @param editor - The editor instance.
 *
 * @public
 */
export declare type TLOnMountHandler = (editor: Editor) => (() => void) | undefined | void;

/** @public */
export declare type TLOnResizeEndHandler<T extends TLShape> = TLEventChangeHandler<T>;

/** @public */
export declare type TLOnResizeHandler<T extends TLShape> = (shape: T, info: TLResizeInfo<T>) => Omit<TLShapePartial<T>, 'id' | 'type'> | undefined | void;

/** @public */
export declare type TLOnResizeStartHandler<T extends TLShape> = TLEventStartHandler<T>;

/** @public */
export declare type TLOnRotateEndHandler<T extends TLShape> = TLEventChangeHandler<T>;

/** @public */
export declare type TLOnRotateHandler<T extends TLShape> = TLEventChangeHandler<T>;

/** @public */
export declare type TLOnRotateStartHandler<T extends TLShape> = TLEventStartHandler<T>;

/** @public */
export declare type TLOnTranslateEndHandler<T extends TLShape> = TLEventChangeHandler<T>;

/** @public */
export declare type TLOnTranslateHandler<T extends TLShape> = TLEventChangeHandler<T>;

/** @public */
export declare type TLOnTranslateStartHandler<T extends TLShape> = TLEventStartHandler<T>;

declare type TLOverflowMode = 'truncate-clip' | 'truncate-ellipsis' | 'wrap';

/** @public */
export declare type TLPinchEvent = (info: TLPinchEventInfo) => void;

/** @public */
export declare type TLPinchEventInfo = TLBaseEventInfo & {
    type: 'pinch';
    name: TLPinchEventName;
    point: Vec2dModel;
    delta: Vec2dModel;
};

/** @public */
export declare type TLPinchEventName = 'pinch_end' | 'pinch_start' | 'pinch';

/** @public */
export declare type TLPointerEvent = (info: TLPointerEventInfo) => void;

/** @public */
export declare type TLPointerEventInfo = TLBaseEventInfo & {
    type: 'pointer';
    name: TLPointerEventName;
    point: VecLike;
    pointerId: number;
    button: number;
    isPen: boolean;
} & TLPointerEventTarget;

/** @public */
export declare type TLPointerEventName = 'middle_click' | 'pointer_down' | 'pointer_move' | 'pointer_up' | 'right_click';

/** @public */
export declare type TLPointerEventTarget = {
    target: 'canvas';
    shape?: undefined;
} | {
    target: 'handle';
    shape: TLShape;
    handle: TLHandle;
} | {
    target: 'selection';
    handle?: TLSelectionHandle;
    shape?: undefined;
} | {
    target: 'shape';
    shape: TLShape;
};

/** @public */
export declare type TLResizeHandle = SelectionCorner | SelectionEdge;

/**
 * Info about a resize.
 * @param newPoint - The new local position of the shape.
 * @param handle - The handle being dragged.
 * @param mode - The type of resize.
 * @param scaleX - The scale in the x-axis.
 * @param scaleY - The scale in the y-axis.
 * @param initialBounds - The bounds of the shape at the start of the resize.
 * @param initialShape - The shape at the start of the resize.
 * @public
 */
export declare type TLResizeInfo<T extends TLShape> = {
    newPoint: Vec2d;
    handle: TLResizeHandle;
    mode: TLResizeMode;
    scaleX: number;
    scaleY: number;
    initialBounds: Box2d;
    initialShape: T;
};

/**
 * The type of resize.
 *
 * 'scale_shape' - The shape is being scaled, usually as part of a larger selection.
 *
 * 'resize_bounds' - The user is directly manipulating an individual shape's bounds using a resize
 * handle. It is up to shape util implementers to decide how they want to handle the two
 * situations.
 *
 * @public
 */
export declare type TLResizeMode = 'resize_bounds' | 'scale_shape';

/** @public */
export declare type TLResizeShapeOptions = Partial<{
    initialBounds: Box2d;
    scaleOrigin: VecLike;
    scaleAxisRotation: number;
    initialShape: TLShape;
    initialPageTransform: MatLike;
    dragHandle: TLResizeHandle;
    mode: TLResizeMode;
}>;

/**
 * Info about a rotation that can be applied to the editor's selected shapes.
 *
 * @param selectionPageCenter - The center of the selection in page coordinates
 * @param initialCursorAngle - The angle of the cursor relative to the selection center when the rotation started
 * @param initialSelectionRotation - The rotation of the selection when the rotation started
 * @param shapeSnapshots - Info about each shape that is being rotated
 *
 * @public
 **/
export declare type TLRotationSnapshot = {
    selectionPageCenter: Vec2d;
    initialCursorAngle: number;
    initialSelectionRotation: number;
    shapeSnapshots: {
        shape: TLShape;
        initialPagePoint: Vec2d;
    }[];
};

/** @public */
export declare type TLScribbleComponent = ComponentType<{
    scribble: TLScribble;
    zoom: number;
    color?: string;
    opacity?: number;
    className?: string;
}>;

/** @public */
export declare type TLSelectionBackgroundComponent = React_3.ComponentType<{
    bounds: Box2d;
    rotation: number;
}>;

/** @public */
export declare type TLSelectionForegroundComponent = ComponentType<{
    bounds: Box2d;
    rotation: number;
}>;

/** @public */
export declare type TLSelectionHandle = RotateCorner | SelectionCorner | SelectionEdge;

/**
 * The state of the editor instance, not including any document state.
 *
 * @public
 */
export declare interface TLSessionStateSnapshot {
    version: number;
    currentPageId: TLPageId;
    isFocusMode: boolean;
    exportBackground: boolean;
    isDebugMode: boolean;
    isToolLocked: boolean;
    isGridMode: boolean;
    pageStates: Array<{
        pageId: TLPageId;
        camera: {
            x: number;
            y: number;
            z: number;
        };
        selectedShapeIds: TLShapeId[];
        focusedGroupId: null | TLShapeId;
    }>;
}

/** @public */
declare type TLShapeErrorFallbackComponent = ComponentType<{
    error: any;
}>;

/** @public */
export declare type TLShapeIndicatorComponent = React_3.ComponentType<{
    id: TLShapeId;
    color?: string | undefined;
    opacity?: number;
    className?: string;
}>;

/** @public */
declare type TLShapeIndicatorErrorFallbackComponent = ComponentType<{
    error: unknown;
}>;

/** @public */
export declare interface TLShapeUtilCanvasSvgDef {
    key: string;
    component: React.ComponentType;
}

/** @public */
export declare interface TLShapeUtilConstructor<T extends TLUnknownShape, U extends ShapeUtil<T> = ShapeUtil<T>> {
    new (editor: Editor): U;
    type: T['type'];
    props?: ShapeProps<T>;
    migrations?: Migrations;
}

/** @public */
export declare type TLShapeUtilFlag<T> = (shape: T) => boolean;

/** @public */
export declare type TLSnapLineComponent = React_3.ComponentType<{
    className?: string;
    line: SnapLine;
    zoom: number;
}>;

/** @public */
export declare type TLSpinnerComponent = ComponentType<object>;

/** @public */
export declare interface TLStateNodeConstructor {
    new (editor: Editor, parent?: StateNode): StateNode;
    id: string;
    initial?: string;
    children?: () => TLStateNodeConstructor[];
}

declare type TLStateNodeType = 'branch' | 'leaf' | 'root';

/** @public */
export declare type TLStoreEventInfo = HistoryEntry<TLRecord>;

/** @public */
export declare type TLStoreOptions = {
    initialData?: SerializedStore<TLRecord>;
    defaultName?: string;
} & ({
    schema?: StoreSchema<TLRecord, TLStoreProps>;
} | {
    shapeUtils?: readonly TLAnyShapeUtilConstructor[];
});

/** @public */
export declare type TLStoreWithStatus = {
    readonly status: 'error';
    readonly store?: undefined;
    readonly error: Error;
} | {
    readonly status: 'loading';
    readonly store?: undefined;
    readonly error?: undefined;
} | {
    readonly status: 'not-synced';
    readonly store: TLStore;
    readonly error?: undefined;
} | {
    readonly status: 'synced-local';
    readonly store: TLStore;
    readonly error?: undefined;
} | {
    readonly status: 'synced-remote';
    readonly connectionStatus: 'offline' | 'online';
    readonly store: TLStore;
    readonly error?: undefined;
};

/** @public */
export declare type TLSvgDefsComponent = React.ComponentType;

/** @public */
export declare type TLTickEvent = (elapsed: number) => void;

/** @public */
declare interface TLUser {
    readonly derivePresenceState: (store: TLStore) => Signal<null | TLInstancePresence>;
    readonly userPreferences: Signal<TLUserPreferences>;
    readonly setUserPreferences: (userPreferences: TLUserPreferences) => void;
}

/**
 * A user of tldraw
 *
 * @public
 */
export declare interface TLUserPreferences {
    id: string;
    name: string;
    locale: string;
    color: string;
    isDarkMode: boolean;
    animationSpeed: number;
    isSnapMode: boolean;
}

/** @public */
export declare type TLWheelEvent = (info: TLWheelEventInfo) => void;

/** @public */
export declare type TLWheelEventInfo = TLBaseEventInfo & {
    type: 'wheel';
    name: 'wheel';
    delta: Vec2dModel;
};

/**
 * The DOM likes values to be fixed to 3 decimal places
 *
 * @public
 */
export declare function toDomPrecision(v: number): number;

/**
 * @public
 */
export declare function toFixed(v: number): number;

/**
 * Get a number to a precision.
 *
 * @param n - The number.
 * @param precision - The precision.
 * @public
 */
export declare function toPrecision(n: number, precision?: number): number;

export { track }

export { transact }

export { transaction }

/** @public */
export declare type UiEvent = TLCancelEvent | TLClickEvent | TLCompleteEvent | TLKeyboardEvent | TLPinchEvent | TLPointerEvent;

/** @public */
export declare type UiEventType = 'click' | 'keyboard' | 'pinch' | 'pointer' | 'wheel' | 'zoom';

/** @public */
export declare function uniq<T>(array: {
    readonly length: number;
    readonly [n: number]: T;
} | null | undefined): T[];

/**
 * Generate a unique id.
 *
 * @example
 *
 * ```ts
 * const id = uniqueId()
 * ```
 *
 * @public
 */
export declare function uniqueId(): string;

export { useComputed }

/** @public */
export declare function useContainer(): HTMLDivElement;

/** @public */
export declare const useEditor: () => Editor;

/** @public */
export declare function useIsCropping(shapeId: TLShapeId): boolean;

/** @public */
export declare function useIsDarkMode(): boolean;

/** @public */
export declare function useIsEditing(shapeId: TLShapeId): boolean;

/* Excluded from this release type: useLocalStore */

/* Excluded from this release type: usePeerIds */

/* Excluded from this release type: usePresence */
export { useQuickReactor }

/* Excluded from this release type: USER_COLORS */
export { useReactor }

declare class UserPreferencesManager {
    private readonly user;
    constructor(user: TLUser);
    updateUserPreferences: (userPreferences: Partial<TLUserPreferences>) => void;
    get userPreferences(): TLUserPreferences;
    get isDarkMode(): boolean;
    get animationSpeed(): number;
    get id(): string;
    get name(): string;
    get locale(): string;
    get color(): string;
    get isSnapMode(): boolean;
}

/** @public */
export declare function useSelectionEvents(handle: TLSelectionHandle): {
    onPointerDown: PointerEventHandler<Element>;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerUp: PointerEventHandler<Element>;
};

/** @public */
export declare function useTLStore(opts: TLStoreOptions & {
    snapshot?: StoreSnapshot<TLRecord>;
}): TLStore;

/** @public */
export declare function useTransform(ref: React.RefObject<HTMLElement | SVGElement>, x?: number, y?: number, scale?: number, rotate?: number, additionalOffset?: VecLike): void;

export { useValue }

/** @public */
export declare class Vec2d {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    get pressure(): number;
    set(x?: number, y?: number, z?: number): this;
    setTo({ x, y, z }: VecLike): this;
    rot(r: number): this;
    rotWith(C: VecLike, r: number): this;
    clone(): Vec2d;
    sub(V: VecLike): this;
    subXY(x: number, y: number): this;
    subScalar(n: number): this;
    add(V: VecLike): this;
    addXY(x: number, y: number): this;
    addScalar(n: number): this;
    clamp(min: number, max?: number): this;
    div(t: number): this;
    divV(V: VecLike): this;
    mul(t: number): this;
    mulV(V: VecLike): this;
    abs(): this;
    nudge(B: VecLike, distance: number): this;
    neg(): this;
    cross(V: VecLike): this;
    dpr(V: VecLike): number;
    cpr(V: VecLike): number;
    len2(): number;
    len(): number;
    pry(V: VecLike): number;
    per(): this;
    uni(): Vec2d;
    tan(V: VecLike): Vec2d;
    dist(V: VecLike): number;
    distanceToLineSegment(A: VecLike, B: VecLike): number;
    slope(B: VecLike): number;
    snapToGrid(gridSize: number): this;
    angle(B: VecLike): number;
    toAngle(): number;
    lrp(B: VecLike, t: number): Vec2d;
    equals(B: VecLike): boolean;
    equalsXY(x: number, y: number): boolean;
    norm(): this;
    toFixed(): Vec2d;
    toString(): string;
    toJson(): Vec2dModel;
    toArray(): number[];
    static Add(A: VecLike, B: VecLike): Vec2d;
    static AddXY(A: VecLike, x: number, y: number): Vec2d;
    static Sub(A: VecLike, B: VecLike): Vec2d;
    static SubXY(A: VecLike, x: number, y: number): Vec2d;
    static AddScalar(A: VecLike, n: number): Vec2d;
    static SubScalar(A: VecLike, n: number): Vec2d;
    static Div(A: VecLike, t: number): Vec2d;
    static Mul(A: VecLike, t: number): Vec2d;
    static DivV(A: VecLike, B: VecLike): Vec2d;
    static MulV(A: VecLike, B: VecLike): Vec2d;
    static Neg(A: VecLike): Vec2d;
    static Per(A: VecLike): Vec2d;
    static Dist2(A: VecLike, B: VecLike): number;
    static Abs(A: VecLike): Vec2d;
    static Dist(A: VecLike, B: VecLike): number;
    static Dpr(A: VecLike, B: VecLike): number;
    static Cross(A: VecLike, V: VecLike): Vec2d;
    static Cpr(A: VecLike, B: VecLike): number;
    static Len2(A: VecLike): number;
    static Len(A: VecLike): number;
    static Pry(A: VecLike, B: VecLike): number;
    static Uni(A: VecLike): Vec2d;
    static Tan(A: VecLike, B: VecLike): Vec2d;
    static Min(A: VecLike, B: VecLike): Vec2d;
    static Max(A: VecLike, B: VecLike): Vec2d;
    static From({ x, y, z }: Vec2dModel): Vec2d;
    static FromArray(v: number[]): Vec2d;
    static Rot(A: VecLike, r?: number): Vec2d;
    static RotWith(A: VecLike, C: VecLike, r: number): Vec2d;
    /**
     * Get the nearest point on a line with a known unit vector that passes through point A
     *
     * ```ts
     * Vec.nearestPointOnLineThroughPoint(A, u, Point)
     * ```
     *
     * @param A - Any point on the line
     * @param u - The unit vector for the line.
     * @param P - A point not on the line to test.
     */
    static NearestPointOnLineThroughPoint(A: VecLike, u: VecLike, P: VecLike): Vec2d;
    static NearestPointOnLineSegment(A: VecLike, B: VecLike, P: VecLike, clamp?: boolean): Vec2d;
    static DistanceToLineThroughPoint(A: VecLike, u: VecLike, P: VecLike): number;
    static DistanceToLineSegment(A: VecLike, B: VecLike, P: VecLike, clamp?: boolean): number;
    static Snap(A: VecLike, step?: number): Vec2d;
    static Cast(A: VecLike): Vec2d;
    static Slope(A: VecLike, B: VecLike): number;
    static Angle(A: VecLike, B: VecLike): number;
    static Lrp(A: VecLike, B: VecLike, t: number): Vec2d;
    static Med(A: VecLike, B: VecLike): Vec2d;
    static Equals(A: VecLike, B: VecLike): boolean;
    static EqualsXY(A: VecLike, x: number, y: number): boolean;
    static Clockwise(A: VecLike, B: VecLike, C: VecLike): boolean;
    static Rescale(A: VecLike, n: number): Vec2d;
    static ScaleWithOrigin(A: VecLike, scale: number, origin: VecLike): Vec2d;
    static ToFixed(A: VecLike, n?: number): Vec2d;
    static Nudge(A: VecLike, B: VecLike, distance: number): Vec2d;
    static ToString(A: VecLike): string;
    static ToAngle(A: VecLike): number;
    static FromAngle(r: number, length?: number): Vec2d;
    static ToArray(A: VecLike): number[];
    static ToJson(A: VecLike): {
        x: number;
        y: number;
        z: number | undefined;
    };
    static Average(arr: VecLike[]): Vec2d;
    static Clamp(A: Vec2d, min: number, max?: number): Vec2d;
    /**
     * Get an array of points (with simulated pressure) between two points.
     *
     * @param A - The first point.
     * @param B - The second point.
     * @param steps - The number of points to return.
     */
    static PointsBetween(A: Vec2dModel, B: Vec2dModel, steps?: number): Vec2d[];
    static SnapToGrid(A: VecLike, gridSize?: number): Vec2d;
}

/** @public */
export declare type VecLike = Vec2d | Vec2dModel;

/** @public */
export declare class WeakMapCache<T extends object, K> {
    items: WeakMap<T, K>;
    get<P extends T>(item: P, cb: (item: P) => K): NonNullable<K>;
    access(item: T): K | undefined;
    set(item: T, value: K): void;
    has(item: T): boolean;
    invalidate(item: T): void;
    bust(): void;
}

export { whyAmIRunning }

/* Excluded from this release type: ZOOMS */

export * from "@tldraw/store";
export * from "@tldraw/tlschema";
export * from "@tldraw/utils";
export * from "@tldraw/validate";

export { }
