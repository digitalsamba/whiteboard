import { StyleProp, TLArrowShape, TLAsset, TLAssetId, TLAssetPartial, TLCursor, TLDocument, TLGroupShape, TLHandle, TLImageAsset, TLInstance, TLInstancePageState, TLPage, TLPageId, TLParentId, TLShape, TLShapeId, TLShapePartial, TLStore, TLUnknownShape, TLVideoAsset } from '@tldraw/tlschema';
import { JsonObject } from '@tldraw/utils';
import { EventEmitter } from 'eventemitter3';
import { TLUser } from '../config/createTLUser';
import { Box2d } from '../primitives/Box2d';
import { MatLike, Matrix2d } from '../primitives/Matrix2d';
import { Vec2d, VecLike } from '../primitives/Vec2d';
import { Geometry2d } from '../primitives/geometry/Geometry2d';
import { ReadonlySharedStyleMap, SharedStyle } from '../utils/SharedStylesMap';
import { ClickManager } from './managers/ClickManager';
import { EnvironmentManager } from './managers/EnvironmentManager';
import { HistoryManager } from './managers/HistoryManager';
import { SideEffectManager } from './managers/SideEffectManager';
import { SnapManager } from './managers/SnapManager';
import { TextManager } from './managers/TextManager';
import { UserPreferencesManager } from './managers/UserPreferencesManager';
import { ShapeUtil, TLResizeMode, TLShapeUtilConstructor } from './shapes/ShapeUtil';
import { TLArrowInfo } from './shapes/shared/arrow/arrow-types';
import { RootState } from './tools/RootState';
import { StateNode, TLStateNodeConstructor } from './tools/StateNode';
import { TLContent } from './types/clipboard-types';
import { TLEventMap } from './types/emit-types';
import { TLEventInfo } from './types/event-types';
import { TLExternalAssetContent, TLExternalContent } from './types/external-content';
import { TLCommandHistoryOptions } from './types/history-types';
import { OptionalKeys, RequiredKeys } from './types/misc-types';
import { TLResizeHandle } from './types/selection-types';
/** @public */
export type TLAnimationOptions = Partial<{
    duration: number;
    easing: (t: number) => number;
}>;
/** @public */
export type TLResizeShapeOptions = Partial<{
    initialBounds: Box2d;
    scaleOrigin: VecLike;
    scaleAxisRotation: number;
    initialShape: TLShape;
    initialPageTransform: MatLike;
    dragHandle: TLResizeHandle;
    mode: TLResizeMode;
}>;
/** @public */
export interface TLEditorOptions {
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
    /** @internal */
    private _tickManager;
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
    /** @internal */
    private get _arrowBindingsIndex();
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
    /** @internal */
    annotateError(error: unknown, { origin, willCrashApp, tags, extras, }: {
        origin: string;
        willCrashApp: boolean;
        tags?: Record<string, boolean | number | string>;
        extras?: Record<string, unknown>;
    }): this;
    /** @internal */
    createErrorAnnotations(origin: string, willCrashApp: 'unknown' | boolean): {
        tags: {
            origin: string;
            willCrashApp: 'unknown' | boolean;
        };
        extras: {
            activeStateNode?: string;
            selectedShapes?: TLUnknownShape[];
            editingShape?: TLUnknownShape;
            inputs?: Record<string, unknown>;
        };
    };
    /** @internal */
    private _crashingError;
    /**
     * We can't use an `atom` here because there's a chance that when `crashAndReportError` is called,
     * we're in a transaction that's about to be rolled back due to the same error we're currently
     * reporting.
     *
     * Instead, to listen to changes to this value, you need to listen to app's `crash` event.
     *
     * @internal
     */
    get crashingError(): unknown;
    /** @internal */
    crash(error: unknown): this;
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
    /** @internal */
    private _updateInstanceState;
    /** @internal */
    private _isChangingStyleTimeout;
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
    /** @internal */
    private get _pageStates();
    /**
     * The current page state.
     *
     * @public
     */
    get currentPageState(): TLInstancePageState;
    /** @internal */
    private get _currentPageStateId();
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
    /** @internal */
    private _setInstancePageState;
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
    /** @internal */
    private _setSelectedShapes;
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
    /** @internal */
    private _setFocusedGroupId;
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
    /** @internal */
    private get cameraId();
    /**
     * The current camera.
     *
     * @public
     */
    get camera(): import("@tldraw/tlschema").TLCamera;
    /**
     * The current camera zoom level.
     *
     * @public
     */
    get zoomLevel(): number;
    /** @internal */
    private _setCamera;
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
    /** @internal */
    private _viewportAnimation;
    /** @internal */
    private _animateViewport;
    /** @internal */
    private _animateToViewport;
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
    /** @internal */
    private _willSetInitialBounds;
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
    /** @internal */
    private readonly _renderingBounds;
    /**
     * The current rendering bounds in the current page space, expanded slightly. Used for determining which shapes
     * to render and which to "cull".
     *
     * @public
     */
    get renderingBoundsExpanded(): Box2d;
    /** @internal */
    private readonly _renderingBoundsExpanded;
    /**
     * Update the rendering bounds. This should be called when the viewport has stopped changing, such
     * as at the end of a pan, zoom, or animation.
     *
     * @example
     * ```ts
     * editor.updateRenderingBounds()
     * ```
     *
     *
     * @internal
     */
    updateRenderingBounds(): this;
    /**
     * The distance to expand the viewport when measuring culling. A larger distance will
     * mean that shapes near to the viewport (but still outside of it) will not be culled.
     *
     * @public
     */
    renderingBoundsMargin: number;
    /** @internal */
    private get _pages();
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
    /** @internal */
    private _setCurrentPageId;
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
    /** @internal */
    private _updatePage;
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
    /** @internal */
    private _createPage;
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
    /** @internal */
    private _deletePage;
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
    /** @internal */
    private get _assets();
    /**
     * Get all assets in the editor.
     *
     * @public
     */
    get assets(): (import("@tldraw/tlschema").TLBookmarkAsset | TLImageAsset | TLVideoAsset)[];
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
    /** @internal */
    private _createAssets;
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
    /** @internal */
    private _updateAssets;
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
    /** @internal */
    private _deleteAssets;
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
    /** @internal */
    private get _shapeOutlineSegmentsCache();
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
    /** @internal */
    private get _shapeHandlesCache();
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
    /**
     * A cache of page transforms.
     *
     * @internal
     */
    private get _shapePageTransformCache();
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
    /** @internal */
    private get _shapePageBoundsCache();
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
    /**
     * A cache of clip paths used for clipping.
     *
     * @internal
     */
    private get _shapeClipPathCache();
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
    /** @internal */
    private get _shapeMaskCache();
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
    /**
     * If siblingShape and targetShape are siblings, this returns targetShape. If targetShape has an
     * ancestor who is a sibling of siblingShape, this returns that ancestor. Otherwise, this returns
     * undefined.
     *
     * @internal
     */
    private getShapeNearestSibling;
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
    /**
     * A cache of parents to children.
     *
     * @internal
     */
    private readonly _parentIdsToChildIds;
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
    /**
     * A cache of children for each parent.
     *
     * @internal
     */
    private _childIdsCache;
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
    /** @internal */
    private _scalePagePoint;
    /** @internal */
    private _resizeUnalignedShape;
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
    /** @internal */
    private _createShapes;
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
    /** @internal */
    private _updateShapes;
    /** @internal */
    private _getUnlockedShapeIds;
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
    /** @internal */
    private _deleteShapes;
    /**
     * Get all the current styles among the users selected shapes
     *
     * @internal
     */
    private _extractSharedStyles;
    /**
     * A derived map containing all current styles among the user's selected shapes.
     *
     * @internal
     */
    private _selectionSharedStyles;
    /** @internal */
    getStyleForNextShape<T>(style: StyleProp<T>): T;
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
    /** @internal */
    externalAssetContentHandlers: {
        [K in TLExternalAssetContent['type']]: {
            [Key in K]: ((info: TLExternalAssetContent & {
                type: Key;
            }) => Promise<TLAsset | undefined>) | null;
        }[K];
    };
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
    /** @internal */
    externalContentHandlers: {
        [K in TLExternalContent['type']]: {
            [Key in K]: ((info: TLExternalContent & {
                type: Key;
            }) => void) | null;
        }[K];
    };
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
    /**
     * A manager for recording multiple click events.
     *
     * @internal
     */
    protected _clickManager: ClickManager;
    /**
     * Prevent a double click event from firing the next time the user clicks
     *
     * @public
     */
    cancelDoubleClick(): void;
    /**
     * The previous cursor. Used for restoring the cursor after pan events.
     *
     * @internal
     */
    private _prevCursor;
    /** @internal */
    private _shiftKeyTimeout;
    /** @internal */
    private _setShiftKeyTimeout;
    /** @internal */
    private _altKeyTimeout;
    /** @internal */
    private _setAltKeyTimeout;
    /** @internal */
    private _ctrlKeyTimeout;
    /** @internal */
    private _setCtrlKeyTimeout;
    /** @internal */
    private _restoreToolId;
    /** @internal */
    private _pinchStart;
    /** @internal */
    private _didPinch;
    /** @internal */
    private _selectedShapeIdsAtPointerDown;
    /** @internal */
    capturedPointerId: null | number;
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
//# sourceMappingURL=Editor.d.ts.map