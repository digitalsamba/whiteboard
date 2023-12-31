/// <reference types="react" />

import { ArrayOfValidator } from '@tldraw/editor';
import { BaseBoxShapeTool } from '@tldraw/editor';
import { BaseBoxShapeUtil } from '@tldraw/editor';
import { Box2d } from '@tldraw/editor';
import { Circle2d } from '@tldraw/editor';
import { CubicSpline2d } from '@tldraw/editor';
import { DictValidator } from '@tldraw/editor';
import { Editor } from '@tldraw/editor';
import { EMBED_DEFINITIONS } from '@tldraw/editor';
import { EmbedDefinition } from '@tldraw/editor';
import { EnumStyleProp } from '@tldraw/editor';
import { Geometry2d } from '@tldraw/editor';
import { Group2d } from '@tldraw/editor';
import { JsonObject } from '@tldraw/editor';
import { LANGUAGES } from '@tldraw/editor';
import { Matrix2d } from '@tldraw/editor';
import { Matrix2dModel } from '@tldraw/editor';
import { MigrationFailureReason } from '@tldraw/editor';
import { Migrations } from '@tldraw/editor';
import { NamedExoticComponent } from 'react';
import { ObjectValidator } from '@tldraw/editor';
import { Polyline2d } from '@tldraw/editor';
import { default as React_2 } from 'react';
import * as React_3 from 'react';
import { ReactNode } from 'react';
import { Rectangle2d } from '@tldraw/editor';
import { RecursivePartial } from '@tldraw/editor';
import { Result } from '@tldraw/editor';
import { SelectionCorner } from '@tldraw/editor';
import { SelectionEdge } from '@tldraw/editor';
import { SelectionHandle } from '@tldraw/editor';
import { SerializedSchema } from '@tldraw/editor';
import { ShapeUtil } from '@tldraw/editor';
import { StateNode } from '@tldraw/editor';
import { StoreSnapshot } from '@tldraw/editor';
import { SvgExportContext } from '@tldraw/editor';
import { TLAnyShapeUtilConstructor } from '@tldraw/editor';
import { TLArrowShape } from '@tldraw/editor';
import { TLAssetId } from '@tldraw/editor';
import { TLBaseEventInfo } from '@tldraw/editor';
import { TLBookmarkShape } from '@tldraw/editor';
import { TLCancelEvent } from '@tldraw/editor';
import { TLClickEvent } from '@tldraw/editor';
import { TLClickEventInfo } from '@tldraw/editor';
import { TLDefaultSizeStyle } from '@tldraw/editor';
import { TldrawEditorBaseProps } from '@tldraw/editor';
import { TLDrawShape } from '@tldraw/editor';
import { TLDrawShapeSegment } from '@tldraw/editor';
import { TLEmbedShape } from '@tldraw/editor';
import { TLEnterEventHandler } from '@tldraw/editor';
import { TLEventHandlers } from '@tldraw/editor';
import { TLExitEventHandler } from '@tldraw/editor';
import { TLFrameShape } from '@tldraw/editor';
import { TLGeoShape } from '@tldraw/editor';
import { TLHandle } from '@tldraw/editor';
import { TLHighlightShape } from '@tldraw/editor';
import { TLImageShape } from '@tldraw/editor';
import { TLInterruptEvent } from '@tldraw/editor';
import { TLKeyboardEvent } from '@tldraw/editor';
import { TLKeyboardEventInfo } from '@tldraw/editor';
import { TLLanguage } from '@tldraw/editor';
import { TLLineShape } from '@tldraw/editor';
import { TLNoteShape } from '@tldraw/editor';
import { TLOnBeforeCreateHandler } from '@tldraw/editor';
import { TLOnBeforeUpdateHandler } from '@tldraw/editor';
import { TLOnDoubleClickHandler } from '@tldraw/editor';
import { TLOnEditEndHandler } from '@tldraw/editor';
import { TLOnHandleChangeHandler } from '@tldraw/editor';
import { TLOnResizeEndHandler } from '@tldraw/editor';
import { TLOnResizeHandler } from '@tldraw/editor';
import { TLOnTranslateStartHandler } from '@tldraw/editor';
import { TLParentId } from '@tldraw/editor';
import { TLPointerEvent } from '@tldraw/editor';
import { TLPointerEventInfo } from '@tldraw/editor';
import { TLPointerEventName } from '@tldraw/editor';
import { TLRecord } from '@tldraw/editor';
import { TLRotationSnapshot } from '@tldraw/editor';
import { TLSchema } from '@tldraw/editor';
import { TLScribble } from '@tldraw/editor';
import { TLSelectionHandle } from '@tldraw/editor';
import { TLShape } from '@tldraw/editor';
import { TLShapeId } from '@tldraw/editor';
import { TLShapePartial } from '@tldraw/editor';
import { TLShapeUtilCanvasSvgDef } from '@tldraw/editor';
import { TLShapeUtilFlag } from '@tldraw/editor';
import { TLStore } from '@tldraw/editor';
import { TLStoreWithStatus } from '@tldraw/editor';
import { TLTextShape } from '@tldraw/editor';
import { TLTickEvent } from '@tldraw/editor';
import { TLUnknownShape } from '@tldraw/editor';
import { TLVideoShape } from '@tldraw/editor';
import { UnionValidator } from '@tldraw/editor';
import { UnknownRecord } from '@tldraw/editor';
import { Validator } from '@tldraw/editor';
import { Vec2d } from '@tldraw/editor';
import { Vec2dModel } from '@tldraw/editor';
import { VecLike } from '@tldraw/editor';

/** @public */
declare type ActionsMenuSchemaProviderProps = {
    overrides?: (editor: Editor, schema: TLUiActionsMenuSchemaContextType, helpers: {
        actions: ReturnType<typeof useActions>;
        oneSelected: boolean;
        twoSelected: boolean;
        threeSelected: boolean;
    }) => TLUiActionsMenuSchemaContextType;
    children: any;
};

/** @public */
declare type ActionsProviderProps = {
    overrides?: (editor: Editor, actions: TLUiActionsContextType, helpers: undefined) => TLUiActionsContextType;
    children: any;
};

declare enum AlignStyle {
    Start = "start",
    Middle = "middle",
    End = "end",
    Justify = "justify"
}

declare interface ArrowBinding extends TLV1Binding {
    handleId: keyof ArrowShape['handles'];
    distance: number;
    point: number[];
}

declare interface ArrowShape extends TDBaseShape {
    type: TDShapeType.Arrow;
    bend: number;
    handles: {
        start: TDHandle;
        bend: TDHandle;
        end: TDHandle;
    };
    decorations?: {
        start?: Decoration;
        end?: Decoration;
        middle?: Decoration;
    };
    label?: string;
    labelPoint?: number[];
}

declare class ArrowShapeTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Idle | typeof Pointing)[];
    shapeType: string;
}

/** @public */
export declare class ArrowShapeUtil extends ShapeUtil<TLArrowShape> {
    static type: "arrow";
    static props: {
        labelColor: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
        color: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
        fill: EnumStyleProp<"none" | "pattern" | "semi" | "solid">;
        dash: EnumStyleProp<"dashed" | "dotted" | "draw" | "solid">;
        size: EnumStyleProp<"l" | "m" | "s" | "xl">;
        arrowheadStart: EnumStyleProp<"arrow" | "bar" | "diamond" | "dot" | "inverted" | "none" | "pipe" | "square" | "triangle">;
        arrowheadEnd: EnumStyleProp<"arrow" | "bar" | "diamond" | "dot" | "inverted" | "none" | "pipe" | "square" | "triangle">;
        font: EnumStyleProp<"draw" | "mono" | "sans" | "serif">;
        start: UnionValidator<"type", {
        binding: ObjectValidator<    {
        type: "binding";
        boundShapeId: TLShapeId;
        normalizedAnchor: Vec2dModel;
        isExact: boolean;
        }>;
        point: ObjectValidator<    {
        type: "point";
        x: number;
        y: number;
        }>;
        }, never>;
        end: UnionValidator<"type", {
        binding: ObjectValidator<    {
        type: "binding";
        boundShapeId: TLShapeId;
        normalizedAnchor: Vec2dModel;
        isExact: boolean;
        }>;
        point: ObjectValidator<    {
        type: "point";
        x: number;
        y: number;
        }>;
        }, never>;
        bend: Validator<number>;
        text: Validator<string>;
    };
    static migrations: Migrations;
    canEdit: () => boolean;
    canBind: () => boolean;
    canSnap: () => boolean;
    hideResizeHandles: TLShapeUtilFlag<TLArrowShape>;
    hideRotateHandle: TLShapeUtilFlag<TLArrowShape>;
    hideSelectionBoundsBg: TLShapeUtilFlag<TLArrowShape>;
    hideSelectionBoundsFg: TLShapeUtilFlag<TLArrowShape>;
    getDefaultProps(): TLArrowShape['props'];
    getGeometry(shape: TLArrowShape): Group2d;
    getHandles(shape: TLArrowShape): TLHandle[];
    onHandleChange: TLOnHandleChangeHandler<TLArrowShape>;
    onTranslateStart: TLOnTranslateStartHandler<TLArrowShape>;
    onResize: TLOnResizeHandler<TLArrowShape>;
    onDoubleClickHandle: (shape: TLArrowShape, handle: TLHandle) => TLShapePartial<TLArrowShape> | void;
    component(shape: TLArrowShape): JSX.Element | null;
    indicator(shape: TLArrowShape): JSX.Element | null;
    onEditEnd: TLOnEditEndHandler<TLArrowShape>;
    toSvg(shape: TLArrowShape, ctx: SvgExportContext): SVGGElement;
    getCanvasSvgDefs(): TLShapeUtilCanvasSvgDef[];
}

/* Excluded from this release type: AssetUrlsProvider */

/** @public */
declare function Body_2({ className, children, style, }: {
    className?: string;
    children: any;
    style?: React.CSSProperties;
}): JSX.Element;

/** @public */
export declare class BookmarkShapeUtil extends BaseBoxShapeUtil<TLBookmarkShape> {
    static type: "bookmark";
    static props: {
        w: Validator<number>;
        h: Validator<number>;
        assetId: Validator<null | TLAssetId>;
        url: Validator<string>;
    };
    static migrations: Migrations;
    canResize: () => boolean;
    hideSelectionBoundsFg: () => boolean;
    getDefaultProps(): TLBookmarkShape['props'];
    component(shape: TLBookmarkShape): JSX.Element;
    indicator(shape: TLBookmarkShape): JSX.Element;
    onBeforeCreate?: TLOnBeforeCreateHandler<TLBookmarkShape>;
    onBeforeUpdate?: TLOnBeforeUpdateHandler<TLBookmarkShape>;
}

declare type BoxWidthHeight = {
    w: number;
    h: number;
};

/** @public */
export declare function BreakPointProvider({ children }: {
    children: any;
}): JSX.Element;

declare class Brushing extends StateNode {
    static id: string;
    info: TLBaseEventInfo & {
        type: "pointer";
        name: TLPointerEventName;
        point: VecLike;
        pointerId: number;
        button: number;
        isPen: boolean;
    } & {
        target: "canvas";
        shape?: undefined;
    } & {
        target: 'canvas';
    };
    brush: Box2d;
    initialSelectedShapeIds: TLShapeId[];
    excludedShapeIds: Set<TLShapeId>;
    initialStartShape: null | TLShape;
    onEnter: (info: TLPointerEventInfo & {
        target: 'canvas';
    }) => void;
    onExit: () => void;
    onPointerMove: () => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onComplete: TLEventHandlers['onComplete'];
    onCancel?: TLCancelEvent | undefined;
    onKeyDown: TLEventHandlers['onKeyDown'];
    onKeyUp?: TLKeyboardEvent | undefined;
    private complete;
    private hitTestShapes;
    onInterrupt: TLInterruptEvent;
    private handleHit;
}

/* Excluded from this release type: buildFromV1Document */

/** @public */
export declare const Button: React_3.ForwardRefExoticComponent<TLUiButtonProps & React_3.RefAttributes<HTMLButtonElement>>;

/** @public */
declare function CheckboxItem({ children, onSelect, ...rest }: DropdownMenuCheckboxItemProps): JSX.Element;

/** @public */
declare function CloseButton(): JSX.Element;

declare enum ColorStyle {
    White = "white",
    LightGray = "lightGray",
    Gray = "gray",
    Black = "black",
    Green = "green",
    Cyan = "cyan",
    Blue = "blue",
    Indigo = "indigo",
    Violet = "violet",
    Red = "red",
    Orange = "orange",
    Yellow = "yellow"
}

/** @public */
export declare function compactMenuItems<T>(arr: T[]): Exclude<T, false | null | undefined>[];

/**
 * Contains the size within the given box size
 *
 * @param originalSize - The size of the asset
 * @param containBoxSize - The container size
 * @returns Adjusted size
 * @public
 */
export declare function containBoxSize(originalSize: BoxWidthHeight, containBoxSize: BoxWidthHeight): BoxWidthHeight;

/** @public */
declare function Content({ side, align, sideOffset, alignOffset, children, }: {
    children: any;
    alignOffset?: number;
    sideOffset?: number;
    align?: 'center' | 'end' | 'start';
    side?: 'bottom' | 'left' | 'right' | 'top';
}): JSX.Element;

/** @public */
export declare const ContextMenu: ({ children }: {
    children: any;
}) => JSX.Element;

declare class Crop extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Idle_10 | typeof PointingCrop | typeof TranslatingCrop)[];
}

declare class Cropping extends StateNode {
    static id: string;
    info: TLBaseEventInfo & {
        type: "pointer";
        name: TLPointerEventName;
        point: VecLike;
        pointerId: number;
        button: number;
        isPen: boolean;
    } & {
        target: "selection";
        handle?: TLSelectionHandle | undefined;
        shape?: undefined;
    } & {
        target: 'selection';
        handle: SelectionHandle;
        onInteractionEnd?: string | undefined;
    };
    markId: string;
    private snapshot;
    onEnter: TLEnterEventHandler;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onComplete: TLEventHandlers['onComplete'];
    onCancel: TLEventHandlers['onCancel'];
    private updateCursor;
    private getDefaultCrop;
    private updateShapes;
    private complete;
    private cancel;
    private createSnapshot;
}

declare enum DashStyle {
    Draw = "draw",
    Solid = "solid",
    Dashed = "dashed",
    Dotted = "dotted"
}

declare enum Decoration {
    Arrow = "arrow"
}

/** @public */
export declare const DEFAULT_ACCEPTED_IMG_TYPE: string[];

/** @public */
export declare const DEFAULT_ACCEPTED_VID_TYPE: string[];

declare type DefaultHelpers = ReturnType<typeof useDefaultHelpers>;

/** @public */
export declare const defaultShapeTools: (typeof ArrowShapeTool | typeof DrawShapeTool | typeof FrameShapeTool | typeof GeoShapeTool | typeof LineShapeTool | typeof NoteShapeTool | typeof TextShapeTool)[];

/** @public */
export declare const defaultShapeUtils: TLAnyShapeUtilConstructor[];

/** @public */
export declare const defaultTools: (typeof EraserTool | typeof HandTool | typeof LaserTool | typeof SelectTool | typeof ZoomTool)[];

declare namespace Dialog {
    export {
        Header,
        Title,
        CloseButton,
        Body_2 as Body,
        Footer
    }
}
export { Dialog }

/** @public */
declare class DragAndDropManager {
    editor: Editor;
    constructor(editor: Editor);
    prevDroppingShapeId: null | TLShapeId;
    droppingNodeTimer: null | ReturnType<typeof setTimeout>;
    first: boolean;
    updateDroppingNode(movingShapes: TLShape[], cb: () => void): void;
    private setDragTimer;
    private handleDrag;
    dropShapes(shapes: TLShape[]): void;
    clear(): void;
    dispose: () => void;
}

declare class Dragging extends StateNode {
    static id: string;
    onEnter: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: () => void;
    private update;
    private complete;
}

declare class DraggingHandle extends StateNode {
    static id: string;
    shapeId: TLShapeId;
    initialHandle: TLHandle;
    initialAdjacentHandle: null | TLHandle;
    initialPagePoint: Vec2d;
    markId: string;
    initialPageTransform: any;
    initialPageRotation: any;
    info: TLBaseEventInfo & {
        type: "pointer";
        name: TLPointerEventName;
        point: VecLike;
        pointerId: number;
        button: number;
        isPen: boolean;
    } & {
        target: "handle";
        shape: TLShape;
        handle: TLHandle;
    } & {
        shape: TLArrowShape;
        target: 'handle';
        onInteractionEnd?: string | undefined;
        isCreating: boolean;
    };
    isPrecise: boolean;
    isPreciseId: null | TLShapeId;
    pointingId: null | TLShapeId;
    onEnter: TLEnterEventHandler;
    private exactTimeout;
    private resetExactTimeout;
    private clearExactTimeout;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onKeyDown: TLKeyboardEvent | undefined;
    onKeyUp: TLKeyboardEvent | undefined;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onComplete: TLEventHandlers['onComplete'];
    onCancel: TLCancelEvent;
    onExit: () => void;
    private complete;
    private cancel;
    private update;
}

declare type DrawableShape = TLDrawShape | TLHighlightShape;

declare class Drawing extends StateNode {
    static id: string;
    info: TLPointerEventInfo;
    initialShape?: DrawableShape;
    shapeType: "draw" | "highlight";
    util: ShapeUtil<TLUnknownShape>;
    isPen: boolean;
    segmentMode: "free" | "starting_free" | "starting_straight" | "straight";
    didJustShiftClickToExtendPreviousShapeLine: boolean;
    pagePointWhereCurrentSegmentChanged: Vec2d;
    pagePointWhereNextSegmentChanged: null | Vec2d;
    lastRecordedPoint: Vec2d;
    mergeNextPoint: boolean;
    currentLineLength: number;
    canDraw: boolean;
    markId: null | string;
    onEnter: (info: TLPointerEventInfo) => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onKeyDown: TLEventHandlers['onKeyDown'];
    onKeyUp: TLEventHandlers['onKeyUp'];
    onExit?: (() => void) | undefined;
    canClose(): boolean;
    getIsClosed(segments: TLDrawShapeSegment[], size: TLDefaultSizeStyle): boolean;
    private startShape;
    private updateShapes;
    private getLineLength;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: TLEventHandlers['onInterrupt'];
    complete(): void;
    cancel(): void;
}

declare interface DrawShape extends TDBaseShape {
    type: TDShapeType.Draw;
    points: number[][];
    isComplete: boolean;
}

declare class DrawShapeTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Drawing | typeof Idle_2)[];
    shapeType: string;
    onExit: () => void;
}

/** @public */
export declare class DrawShapeUtil extends ShapeUtil<TLDrawShape> {
    static type: "draw";
    static props: {
        color: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
        fill: EnumStyleProp<"none" | "pattern" | "semi" | "solid">;
        dash: EnumStyleProp<"dashed" | "dotted" | "draw" | "solid">;
        size: EnumStyleProp<"l" | "m" | "s" | "xl">;
        segments: ArrayOfValidator<    {
        type: "free" | "straight";
        points: Vec2dModel[];
        }>;
        isComplete: Validator<boolean>;
        isClosed: Validator<boolean>;
        isPen: Validator<boolean>;
    };
    static migrations: Migrations;
    hideResizeHandles: (shape: TLDrawShape) => boolean;
    hideRotateHandle: (shape: TLDrawShape) => boolean;
    hideSelectionBoundsFg: (shape: TLDrawShape) => boolean;
    getDefaultProps(): TLDrawShape['props'];
    getGeometry(shape: TLDrawShape): Circle2d | Polyline2d;
    component(shape: TLDrawShape): JSX.Element;
    indicator(shape: TLDrawShape): JSX.Element;
    toSvg(shape: TLDrawShape, ctx: SvgExportContext): SVGGElement;
    getCanvasSvgDefs(): TLShapeUtilCanvasSvgDef[];
    onResize: TLOnResizeHandler<TLDrawShape>;
    expandSelectionOutlinePx(shape: TLDrawShape): number;
}

declare namespace DropdownMenu {
    export {
        Root,
        Trigger,
        Content,
        Sub,
        SubTrigger,
        SubContent,
        Group,
        Indicator,
        Item,
        CheckboxItem,
        RadioItem,
        DropdownMenuItemProps,
        DropdownMenuCheckboxItemProps
    }
}
export { DropdownMenu }

/** @public */
declare interface DropdownMenuCheckboxItemProps {
    checked?: boolean;
    onSelect?: (e: Event) => void;
    disabled?: boolean;
    title: string;
    children: any;
}

/** @public */
declare interface DropdownMenuItemProps extends TLUiButtonProps {
    noClose?: boolean;
}

declare class EditingShape extends StateNode {
    static id: string;
    onEnter: () => void;
    onExit: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerDown: TLEventHandlers['onPointerDown'];
    onComplete: TLEventHandlers['onComplete'];
    onCancel: TLEventHandlers['onCancel'];
}

declare interface EllipseShape extends TDBaseShape {
    type: TDShapeType.Ellipse;
    radius: number[];
    label?: string;
    labelPoint?: number[];
}

/** @public */
export declare class EmbedShapeUtil extends BaseBoxShapeUtil<TLEmbedShape> {
    static type: "embed";
    static props: {
        w: Validator<number>;
        h: Validator<number>;
        url: Validator<string>;
    };
    static migrations: Migrations;
    hideSelectionBoundsFg: TLShapeUtilFlag<TLEmbedShape>;
    canEdit: TLShapeUtilFlag<TLEmbedShape>;
    canUnmount: TLShapeUtilFlag<TLEmbedShape>;
    canResize: (shape: TLEmbedShape) => boolean;
    getDefaultProps(): TLEmbedShape['props'];
    isAspectRatioLocked: TLShapeUtilFlag<TLEmbedShape>;
    onResize: TLOnResizeHandler<TLEmbedShape>;
    component(shape: TLEmbedShape): JSX.Element;
    indicator(shape: TLEmbedShape): JSX.Element;
}

/** @public */
export declare class EraserTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Erasing | typeof Idle_7 | typeof Pointing_6)[];
    onEnter: () => void;
}

declare class Erasing extends StateNode {
    static id: string;
    private info;
    private scribble;
    private markId;
    private excludedShapeIds;
    onEnter: (info: TLPointerEventInfo) => void;
    private startScribble;
    private pushPointToScribble;
    private onScribbleUpdate;
    private onScribbleComplete;
    onExit: () => void;
    onPointerMove: () => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    update(): void;
    complete(): void;
    cancel(): void;
}

/** @public */
export declare type EventsProviderProps = {
    onEvent?: TLUiEventHandler;
    children: any;
};

/** @public */
export declare function findMenuItem(menu: TLUiMenuSchema, path: string[]): TLUiMenuChild;

declare enum FontStyle {
    Script = "script",
    Sans = "sans",
    Serif = "serif",
    Mono = "mono"
}

/** @public */
declare function Footer({ className, children }: {
    className?: string;
    children: any;
}): JSX.Element;

declare class FrameShapeTool extends BaseBoxShapeTool {
    static id: string;
    static initial: string;
    shapeType: string;
}

/** @public */
export declare class FrameShapeUtil extends BaseBoxShapeUtil<TLFrameShape> {
    static type: "frame";
    static props: {
        w: Validator<number>;
        h: Validator<number>;
        name: Validator<string>;
    };
    static migrations: Migrations;
    canBind: () => boolean;
    canEdit: () => boolean;
    getDefaultProps(): TLFrameShape['props'];
    getGeometry(shape: TLFrameShape): Geometry2d;
    component(shape: TLFrameShape): JSX.Element;
    toSvg(shape: TLFrameShape): Promise<SVGElement> | SVGElement;
    indicator(shape: TLFrameShape): JSX.Element;
    canReceiveNewChildrenOfType: (shape: TLShape, _type: TLShape['type']) => boolean;
    providesBackgroundForChildren(): boolean;
    canDropShapes: (shape: TLFrameShape, _shapes: TLShape[]) => boolean;
    onDragShapesOver: (frame: TLFrameShape, shapes: TLShape[]) => {
        shouldHint: boolean;
    };
    onDragShapesOut: (_shape: TLFrameShape, shapes: TLShape[]) => void;
    onResizeEnd: TLOnResizeEndHandler<TLFrameShape>;
}

declare class GeoShapeTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Idle_3 | typeof Pointing_2)[];
    shapeType: string;
}

/** @public */
export declare class GeoShapeUtil extends BaseBoxShapeUtil<TLGeoShape> {
    static type: "geo";
    static props: {
        geo: EnumStyleProp<"arrow-down" | "arrow-left" | "arrow-right" | "arrow-up" | "check-box" | "cloud" | "diamond" | "ellipse" | "hexagon" | "octagon" | "oval" | "pentagon" | "rectangle" | "rhombus-2" | "rhombus" | "star" | "trapezoid" | "triangle" | "x-box">;
        labelColor: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
        color: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
        fill: EnumStyleProp<"none" | "pattern" | "semi" | "solid">;
        dash: EnumStyleProp<"dashed" | "dotted" | "draw" | "solid">;
        size: EnumStyleProp<"l" | "m" | "s" | "xl">;
        font: EnumStyleProp<"draw" | "mono" | "sans" | "serif">;
        align: EnumStyleProp<"end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start">;
        verticalAlign: EnumStyleProp<"end" | "middle" | "start">;
        url: Validator<string>;
        w: Validator<number>;
        h: Validator<number>;
        growY: Validator<number>;
        text: Validator<string>;
    };
    static migrations: Migrations;
    canEdit: () => boolean;
    getDefaultProps(): TLGeoShape['props'];
    getGeometry(shape: TLGeoShape): Geometry2d;
    onEditEnd: TLOnEditEndHandler<TLGeoShape>;
    component(shape: TLGeoShape): JSX.Element;
    indicator(shape: TLGeoShape): JSX.Element;
    toSvg(shape: TLGeoShape, ctx: SvgExportContext): SVGElement;
    getCanvasSvgDefs(): TLShapeUtilCanvasSvgDef[];
    onResize: TLOnResizeHandler<TLGeoShape>;
    onBeforeCreate: (shape: TLGeoShape) => {
        props: {
            growY: number;
            geo: "arrow-down" | "arrow-left" | "arrow-right" | "arrow-up" | "check-box" | "cloud" | "diamond" | "ellipse" | "hexagon" | "octagon" | "oval" | "pentagon" | "rectangle" | "rhombus-2" | "rhombus" | "star" | "trapezoid" | "triangle" | "x-box";
            labelColor: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
            color: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
            fill: "none" | "pattern" | "semi" | "solid";
            dash: "dashed" | "dotted" | "draw" | "solid";
            size: "l" | "m" | "s" | "xl";
            font: "draw" | "mono" | "sans" | "serif";
            align: "end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start";
            verticalAlign: "end" | "middle" | "start";
            url: string;
            w: number;
            h: number;
            text: string;
        };
        type: "geo";
        x: number;
        y: number;
        rotation: number;
        index: string;
        parentId: TLParentId;
        isLocked: boolean;
        opacity: number;
        meta: JsonObject;
        id: TLShapeId;
        typeName: "shape";
    } | undefined;
    onBeforeUpdate: (prev: TLGeoShape, next: TLGeoShape) => {
        props: {
            growY: number;
            geo: "arrow-down" | "arrow-left" | "arrow-right" | "arrow-up" | "check-box" | "cloud" | "diamond" | "ellipse" | "hexagon" | "octagon" | "oval" | "pentagon" | "rectangle" | "rhombus-2" | "rhombus" | "star" | "trapezoid" | "triangle" | "x-box";
            labelColor: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
            color: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
            fill: "none" | "pattern" | "semi" | "solid";
            dash: "dashed" | "dotted" | "draw" | "solid";
            size: "l" | "m" | "s" | "xl";
            font: "draw" | "mono" | "sans" | "serif";
            align: "end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start";
            verticalAlign: "end" | "middle" | "start";
            url: string;
            w: number;
            h: number;
            text: string;
        };
        type: "geo";
        x: number;
        y: number;
        rotation: number;
        index: string;
        parentId: TLParentId;
        isLocked: boolean;
        opacity: number;
        meta: JsonObject;
        id: TLShapeId;
        typeName: "shape";
    } | undefined;
    onDoubleClick: (shape: TLGeoShape) => {
        props: {
            geo: "check-box";
        };
        type: "geo";
        x: number;
        y: number;
        rotation: number;
        index: string;
        parentId: TLParentId;
        isLocked: boolean;
        opacity: number;
        meta: JsonObject;
        id: TLShapeId;
        typeName: "shape";
    } | {
        props: {
            geo: "rectangle";
        };
        type: "geo";
        x: number;
        y: number;
        rotation: number;
        index: string;
        parentId: TLParentId;
        isLocked: boolean;
        opacity: number;
        meta: JsonObject;
        id: TLShapeId;
        typeName: "shape";
    } | undefined;
}

/**
 * Tests whether an URL supports embedding and returns the result. If we encounter an error, we
 * return undefined.
 *
 * @param inputUrl - The URL to match
 * @public
 */
export declare function getEmbedInfo(inputUrl: string): TLEmbedResult;

/**
 * Get the size of an image from its source.
 *
 * @param dataURLForImage - The image file as a string.
 * @param width - The desired width.
 * @param height - The desired height.
 * @public
 */
export declare function getResizedImageDataUrl(dataURLForImage: string, width: number, height: number): Promise<string>;

declare function getTranslatingSnapshot(editor: Editor): {
    averagePagePoint: Vec2d;
    movingShapes: TLShape[];
    shapeSnapshots: MovingShapeSnapshot[];
    initialPageBounds: Box2d;
    initialSnapPoints: {
        id: string;
        x: number;
        y: number;
    }[];
};

/** @public */
declare function Group({ children, size, }: {
    children: any;
    size?: 'medium' | 'small' | 'tiny' | 'wide';
}): JSX.Element;

declare interface GroupShape extends TDBaseShape {
    type: TDShapeType.Group;
    size: number[];
    children: string[];
}

/** @public */
export declare class HandTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Dragging | typeof Idle_8 | typeof Pointing_7)[];
    onDoubleClick: TLClickEvent;
    onTripleClick: TLClickEvent;
    onQuadrupleClick: TLClickEvent;
}

/** @public */
declare function Header({ className, children }: {
    className?: string;
    children: any;
}): JSX.Element;

/** @public */
export declare class HighlightShapeUtil extends ShapeUtil<TLHighlightShape> {
    static type: "highlight";
    static props: {
        color: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
        size: EnumStyleProp<"l" | "m" | "s" | "xl">;
        segments: ArrayOfValidator<    {
        type: "free" | "straight";
        points: Vec2dModel[];
        }>;
        isComplete: Validator<boolean>;
        isPen: Validator<boolean>;
    };
    static migrations: Migrations;
    hideResizeHandles: (shape: TLHighlightShape) => boolean;
    hideRotateHandle: (shape: TLHighlightShape) => boolean;
    hideSelectionBoundsFg: (shape: TLHighlightShape) => boolean;
    getDefaultProps(): TLHighlightShape['props'];
    getGeometry(shape: TLHighlightShape): Circle2d | Polyline2d;
    component(shape: TLHighlightShape): JSX.Element;
    backgroundComponent(shape: TLHighlightShape): JSX.Element;
    indicator(shape: TLHighlightShape): JSX.Element;
    expandSelectionOutlinePx(shape: TLHighlightShape): number;
    toSvg(shape: TLHighlightShape): SVGPathElement;
    toBackgroundSvg(shape: TLHighlightShape): SVGPathElement;
    onResize: TLOnResizeHandler<TLHighlightShape>;
}

/** @public */
export declare const Icon: NamedExoticComponent<TLUiIconProps>;

declare class Idle extends StateNode {
    static id: string;
    onPointerDown: TLEventHandlers['onPointerDown'];
    onEnter: () => void;
    onCancel: () => void;
    onKeyUp: TLEventHandlers['onKeyUp'];
}

declare class Idle_10 extends StateNode {
    static id: string;
    onEnter: () => void;
    onExit: TLExitEventHandler;
    onCancel: TLEventHandlers['onCancel'];
    onPointerDown: TLEventHandlers['onPointerDown'];
    onDoubleClick: TLEventHandlers['onDoubleClick'];
    onKeyDown: TLEventHandlers['onKeyDown'];
    onKeyRepeat: TLEventHandlers['onKeyRepeat'];
    onKeyUp: TLEventHandlers['onKeyUp'];
    private cancel;
    private cleanupCroppingState;
    private nudgeCroppingImage;
}

declare class Idle_11 extends StateNode {
    static id: string;
    onEnter: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerDown: TLEventHandlers['onPointerDown'];
    onDoubleClick: TLEventHandlers['onDoubleClick'];
    onRightClick: TLEventHandlers['onRightClick'];
    onCancel: TLEventHandlers['onCancel'];
    onKeyDown: TLEventHandlers['onKeyDown'];
    onKeyRepeat: TLEventHandlers['onKeyDown'];
    onKeyUp: (info: TLKeyboardEventInfo) => void;
    private shouldStartEditingShape;
    private startEditingShape;
    isDarwin: boolean;
    handleDoubleClickOnCanvas(info: TLClickEventInfo): void;
    private nudgeSelectedShapes;
}

declare class Idle_12 extends StateNode {
    static id: string;
    info: TLPointerEventInfo & {
        onInteractionEnd?: string | undefined;
    };
    onEnter: (info: TLPointerEventInfo & {
        onInteractionEnd: string;
    }) => void;
    onPointerDown: TLEventHandlers['onPointerUp'];
}

declare class Idle_2 extends StateNode {
    static id: string;
    onPointerDown: TLEventHandlers['onPointerDown'];
    onEnter: () => void;
    onCancel: () => void;
}

declare class Idle_3 extends StateNode {
    static id: string;
    onPointerDown: TLEventHandlers['onPointerDown'];
    onEnter: () => void;
    onKeyUp: TLEventHandlers['onKeyUp'];
    onCancel: () => void;
}

declare class Idle_4 extends StateNode {
    static id: string;
    private shapeId;
    onEnter: (info: {
        shapeId: TLShapeId;
    }) => void;
    onPointerDown: TLEventHandlers['onPointerDown'];
    onCancel: () => void;
}

declare class Idle_5 extends StateNode {
    static id: string;
    onPointerDown: TLEventHandlers['onPointerDown'];
    onEnter: () => void;
    onCancel: () => void;
}

declare class Idle_6 extends StateNode {
    static id: string;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerDown: TLEventHandlers['onPointerDown'];
    onEnter: () => void;
    onKeyDown: TLEventHandlers['onKeyDown'];
    onCancel: () => void;
}

declare class Idle_7 extends StateNode {
    static id: string;
    onPointerDown: TLEventHandlers['onPointerDown'];
    onCancel: () => void;
}

declare class Idle_8 extends StateNode {
    static id: string;
    onEnter: () => void;
    onPointerDown: TLEventHandlers['onPointerDown'];
    onCancel: () => void;
}

declare class Idle_9 extends StateNode {
    static id: string;
    onPointerDown: TLEventHandlers['onPointerDown'];
}

declare interface ImageShape extends TDBaseShape {
    type: TDShapeType.Image;
    size: number[];
    assetId: string;
}

/** @public */
export declare class ImageShapeUtil extends BaseBoxShapeUtil<TLImageShape> {
    static type: "image";
    static props: {
        w: Validator<number>;
        h: Validator<number>;
        playing: Validator<boolean>;
        url: Validator<string>;
        assetId: Validator<TLAssetId | null>;
        crop: Validator<    {
        topLeft: Vec2dModel;
        bottomRight: Vec2dModel;
        } | null>;
    };
    static migrations: Migrations;
    isAspectRatioLocked: () => boolean;
    canCrop: () => boolean;
    getDefaultProps(): TLImageShape['props'];
    component(shape: TLImageShape): JSX.Element;
    indicator(shape: TLImageShape): JSX.Element | null;
    toSvg(shape: TLImageShape): Promise<SVGGElement>;
    onDoubleClick: (shape: TLImageShape) => void;
    onDoubleClickEdge: TLOnDoubleClickHandler<TLImageShape>;
}

/** @public */
declare function Indicator(): JSX.Element;

/** @public */
export declare const Input: React_3.ForwardRefExoticComponent<TLUiInputProps & React_3.RefAttributes<HTMLInputElement>>;

/** @public */
export declare function isGifAnimated(file: File): Promise<boolean>;

/** @public */
declare function Item({ noClose, ...props }: DropdownMenuItemProps): JSX.Element;

declare type Join<T, K> = K extends null ? {
    [R in keyof T]: T[R];
} : {
    [R in keyof T]: T[R];
} & {
    [R in keyof K]: K[R];
};

declare class Lasering extends StateNode {
    static id: string;
    scribble: ScribbleManager;
    onEnter: () => void;
    onExit: () => void;
    onPointerMove: () => void;
    onPointerUp: () => void;
    private startScribble;
    private pushPointToScribble;
    private onScribbleUpdate;
    private onScribbleComplete;
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    private complete;
    private cancel;
}

/** @public */
export declare class LaserTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Idle_9 | typeof Lasering)[];
    onEnter: () => void;
}

/* Excluded from this release type: LegacyTldrawDocument */

declare class LineShapeTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Idle_4 | typeof Pointing_3)[];
    shapeType: string;
}

/** @public */
export declare class LineShapeUtil extends ShapeUtil<TLLineShape> {
    static type: "line";
    static props: {
        color: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
        dash: EnumStyleProp<"dashed" | "dotted" | "draw" | "solid">;
        size: EnumStyleProp<"l" | "m" | "s" | "xl">;
        spline: EnumStyleProp<"cubic" | "line">;
        handles: DictValidator<string, TLHandle>;
    };
    static migrations: Migrations;
    hideResizeHandles: () => boolean;
    hideRotateHandle: () => boolean;
    hideSelectionBoundsFg: () => boolean;
    hideSelectionBoundsBg: () => boolean;
    getDefaultProps(): TLLineShape['props'];
    getGeometry(shape: TLLineShape): CubicSpline2d | Polyline2d;
    getHandles(shape: TLLineShape): TLHandle[];
    getOutlineSegments(shape: TLLineShape): Vec2d[][];
    onResize: TLOnResizeHandler<TLLineShape>;
    onHandleChange: TLOnHandleChangeHandler<TLLineShape>;
    component(shape: TLLineShape): JSX.Element | undefined;
    indicator(shape: TLLineShape): JSX.Element;
    toSvg(shape: TLLineShape): SVGGElement;
}

/** @public */
export declare function menuCustom(id: string, opts?: Partial<{
    readonlyOk: boolean;
    disabled: boolean;
}>): {
    id: string;
    type: "custom";
    disabled: boolean;
    readonlyOk: boolean;
};

/** @public */
export declare function menuGroup(id: string, ...children: (false | null | TLUiMenuChild)[]): null | TLUiMenuGroup;

/** @public */
export declare function menuItem(actionItem: TLUiActionItem | TLUiToolItem, opts?: Partial<{
    checked: boolean;
    disabled: boolean;
}>): TLUiMenuItem;

/** @public */
export declare function menuSubmenu(id: string, label: TLUiTranslationKey, ...children: (false | null | TLUiMenuChild)[]): null | TLUiSubMenu;

declare interface MovingShapeSnapshot {
    shape: TLShape;
    pagePoint: Vec2d;
    parentTransform: Matrix2dModel | null;
}

declare class NoteShapeTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Idle_5 | typeof Pointing_4)[];
    shapeType: string;
}

/** @public */
export declare class NoteShapeUtil extends ShapeUtil<TLNoteShape> {
    static type: "note";
    static props: {
        color: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
        size: EnumStyleProp<"l" | "m" | "s" | "xl">;
        font: EnumStyleProp<"draw" | "mono" | "sans" | "serif">;
        align: EnumStyleProp<"end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start">;
        verticalAlign: EnumStyleProp<"end" | "middle" | "start">;
        growY: Validator<number>;
        url: Validator<string>;
        text: Validator<string>;
    };
    static migrations: Migrations;
    canEdit: () => boolean;
    hideResizeHandles: () => boolean;
    hideSelectionBoundsFg: () => boolean;
    getDefaultProps(): TLNoteShape['props'];
    getHeight(shape: TLNoteShape): number;
    getGeometry(shape: TLNoteShape): Rectangle2d;
    component(shape: TLNoteShape): JSX.Element;
    indicator(shape: TLNoteShape): JSX.Element;
    toSvg(shape: TLNoteShape, ctx: SvgExportContext): SVGGElement;
    onBeforeCreate: (next: TLNoteShape) => {
        props: {
            growY: number;
            color: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
            size: "l" | "m" | "s" | "xl";
            font: "draw" | "mono" | "sans" | "serif";
            align: "end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start";
            verticalAlign: "end" | "middle" | "start";
            url: string;
            text: string;
        };
        type: "note";
        x: number;
        y: number;
        rotation: number;
        index: string;
        parentId: TLParentId;
        isLocked: boolean;
        opacity: number;
        meta: JsonObject;
        id: TLShapeId;
        typeName: "shape";
    } | undefined;
    onBeforeUpdate: (prev: TLNoteShape, next: TLNoteShape) => {
        props: {
            growY: number;
            color: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
            size: "l" | "m" | "s" | "xl";
            font: "draw" | "mono" | "sans" | "serif";
            align: "end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start";
            verticalAlign: "end" | "middle" | "start";
            url: string;
            text: string;
        };
        type: "note";
        x: number;
        y: number;
        rotation: number;
        index: string;
        parentId: TLParentId;
        isLocked: boolean;
        opacity: number;
        meta: JsonObject;
        id: TLShapeId;
        typeName: "shape";
    } | undefined;
    onEditEnd: TLOnEditEndHandler<TLNoteShape>;
}

/* Excluded from this release type: parseAndLoadDocument */

/** @public */
export declare function parseTldrawJsonFile({ json, schema, }: {
    schema: TLSchema;
    json: string;
}): Result<TLStore, TldrawFileParseError>;

declare class Pointing extends StateNode {
    static id: string;
    shape?: TLArrowShape;
    markId: string;
    onEnter: () => void;
    onExit: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: TLEventHandlers['onInterrupt'];
    cancel(): void;
    createArrowShape(): void;
    updateArrowShapeEndHandle(): void;
    private preciseTimeout;
    private didTimeout;
    private startPreciseTimeout;
    private clearPreciseTimeout;
}

declare class Pointing_2 extends StateNode {
    static id: string;
    markId: string;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onPointerMove: TLEventHandlers['onPointerMove'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: TLEventHandlers['onInterrupt'];
    private complete;
    private cancel;
}

declare class Pointing_3 extends StateNode {
    static id: string;
    shape: TLLineShape;
    markId: string | undefined;
    onEnter: (info: {
        shapeId?: TLShapeId;
    }) => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: TLInterruptEvent;
    complete(): void;
    cancel(): void;
}

declare class Pointing_4 extends StateNode {
    static id: string;
    dragged: boolean;
    info: TLPointerEventInfo;
    wasFocusedOnEnter: boolean;
    markId: string;
    shape: TLNoteShape;
    onEnter: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onInterrupt: TLInterruptEvent;
    onComplete: TLEventHandlers['onComplete'];
    onCancel: TLEventHandlers['onCancel'];
    private complete;
    private cancel;
    private createShape;
}

declare class Pointing_5 extends StateNode {
    static id: string;
    shape?: TLTextShape;
    markId: string;
    onExit: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: () => void;
    onComplete: () => void;
    onCancel: () => void;
    onInterrupt: () => void;
    private complete;
    private cancel;
}

declare class Pointing_6 extends StateNode {
    static id: string;
    onEnter: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: TLEventHandlers['onInterrupt'];
    complete(): void;
    cancel(): void;
}

declare class Pointing_7 extends StateNode {
    static id: string;
    onEnter: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: TLEventHandlers['onInterrupt'];
    private complete;
}

declare class Pointing_8 extends StateNode {
    static id: string;
    info: TLPointerEventInfo & {
        onInteractionEnd?: string | undefined;
    };
    onEnter: (info: TLPointerEventInfo & {
        onInteractionEnd: string;
    }) => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onPointerMove: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    private complete;
    private cancel;
}

declare class PointingCanvas extends StateNode {
    static id: string;
    onEnter: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: () => void;
    private complete;
}

declare class PointingCrop extends StateNode {
    static id: string;
    onCancel: TLEventHandlers['onCancel'];
    onPointerMove: TLPointerEvent;
    onPointerUp: TLPointerEvent;
}

declare class PointingCropHandle extends StateNode {
    static id: string;
    private info;
    private updateCursor;
    onEnter: (info: TLPointingCropHandleInfo) => void;
    onExit: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: () => void;
    private cancel;
}

declare class PointingHandle extends StateNode {
    static id: string;
    info: TLBaseEventInfo & {
        type: "pointer";
        name: TLPointerEventName;
        point: VecLike;
        pointerId: number;
        button: number;
        isPen: boolean;
    } & {
        target: "handle";
        shape: TLShape;
        handle: TLHandle;
    } & {
        target: 'handle';
    };
    onEnter: (info: TLPointerEventInfo & {
        target: 'handle';
    }) => void;
    onExit: () => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onPointerMove: TLEventHandlers['onPointerMove'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: () => void;
    private cancel;
}

declare class PointingResizeHandle extends StateNode {
    static id: string;
    private info;
    private updateCursor;
    onEnter: (info: PointingResizeHandleInfo) => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: () => void;
    private complete;
    private cancel;
}

declare type PointingResizeHandleInfo = Extract<TLPointerEventInfo, {
    target: 'selection';
}> & {
    onInteractionEnd?: string;
};

declare class PointingRotateHandle extends StateNode {
    static id: string;
    private info;
    private updateCursor;
    onEnter: (info: PointingRotateHandleInfo) => void;
    onExit: () => void;
    onPointerMove: () => void;
    onPointerUp: () => void;
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: () => void;
    private complete;
    private cancel;
}

declare type PointingRotateHandleInfo = Extract<TLPointerEventInfo, {
    target: 'selection';
}> & {
    onInteractionEnd?: string;
};

declare class PointingSelection extends StateNode {
    static id: string;
    info: TLBaseEventInfo & {
        type: "pointer";
        name: TLPointerEventName;
        point: VecLike;
        pointerId: number;
        button: number;
        isPen: boolean;
    } & {
        target: "selection";
        handle?: TLSelectionHandle | undefined;
        shape?: undefined;
    } & {
        target: 'selection';
    };
    onEnter: (info: TLPointerEventInfo & {
        target: 'selection';
    }) => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onPointerMove: TLEventHandlers['onPointerMove'];
    onDoubleClick?: TLClickEvent | undefined;
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: () => void;
    private cancel;
}

declare class PointingShape extends StateNode {
    static id: string;
    hitShape: TLShape;
    hitShapeForPointerUp: TLShape;
    didSelectOnEnter: boolean;
    onEnter: (info: TLPointerEventInfo & {
        target: 'shape';
    }) => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onPointerMove: TLEventHandlers['onPointerMove'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: () => void;
    private cancel;
}

/** @public */
declare function RadioItem({ children, onSelect, ...rest }: DropdownMenuCheckboxItemProps): JSX.Element;

declare interface RectangleShape extends TDBaseShape {
    type: TDShapeType.Rectangle;
    size: number[];
    label?: string;
    labelPoint?: number[];
}

declare class Resizing extends StateNode {
    static id: string;
    info: TLBaseEventInfo & {
        type: "pointer";
        name: TLPointerEventName;
        point: VecLike;
        pointerId: number;
        button: number;
        isPen: boolean;
    } & {
        target: "selection";
        handle?: TLSelectionHandle | undefined;
        shape?: undefined;
    } & {
        target: "selection";
        handle: SelectionCorner | SelectionEdge;
        isCreating?: boolean | undefined;
        editAfterComplete?: boolean | undefined;
        creationCursorOffset?: undefined | VecLike;
        onInteractionEnd?: string | undefined;
    };
    markId: string;
    creationCursorOffset: VecLike;
    editAfterComplete: boolean;
    private snapshot;
    onEnter: TLEnterEventHandler;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onKeyDown: TLEventHandlers['onKeyDown'];
    onKeyUp: TLEventHandlers['onKeyUp'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onComplete: TLEventHandlers['onComplete'];
    onCancel: TLEventHandlers['onCancel'];
    private cancel;
    private complete;
    private handleResizeStart;
    private handleResizeEnd;
    private updateShapes;
    private updateCursor;
    onExit: () => void;
    _createSnapshot: () => {
        shapeSnapshots: Map<TLShapeId, {
            shape: TLShape;
            bounds: Box2d;
            pageTransform: Matrix2d;
            pageRotation: number;
            isAspectRatioLocked: boolean;
        }>;
        selectionBounds: Box2d;
        cursorHandleOffset: Vec2d;
        selectionRotation: number;
        selectedShapeIds: TLShapeId[];
        canShapesDeform: boolean;
        initialSelectionPageBounds: Box2d;
    };
    _createShapeSnapshot: (shape: TLShape) => {
        shape: TLShape;
        bounds: Box2d;
        pageTransform: Matrix2d;
        pageRotation: number;
        isAspectRatioLocked: boolean;
    };
}

/** @public */
declare function Root({ id, children, modal, }: {
    id: string;
    children: any;
    modal?: boolean;
}): JSX.Element;

declare class Rotating extends StateNode {
    static id: string;
    snapshot: TLRotationSnapshot;
    info: TLBaseEventInfo & {
        type: "pointer";
        name: TLPointerEventName;
        point: VecLike;
        pointerId: number;
        button: number;
        isPen: boolean;
    } & {
        target: "selection";
        handle?: TLSelectionHandle | undefined;
        shape?: undefined;
    } & {
        onInteractionEnd?: string | undefined;
    };
    markId: string;
    onEnter: (info: TLPointerEventInfo & {
        target: 'selection';
        onInteractionEnd?: string;
    }) => StateNode | undefined;
    onExit: () => void;
    onPointerMove: () => void;
    onKeyDown: () => void;
    onKeyUp: () => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onComplete: TLEventHandlers['onComplete'];
    onCancel: () => void;
    private update;
    private cancel;
    private complete;
    protected handleStart(): void;
    _getRotationFromPointerPosition({ snapToNearestDegree }: {
        snapToNearestDegree: boolean;
    }): number;
}

declare class ScribbleBrushing extends StateNode {
    static id: string;
    hits: Set<TLShapeId>;
    size: number;
    scribble: ScribbleManager;
    initialSelectedShapeIds: Set<TLShapeId>;
    newlySelectedShapeIds: Set<TLShapeId>;
    onEnter: () => void;
    onExit: () => void;
    onPointerMove: () => void;
    onPointerUp: () => void;
    onKeyDown: () => void;
    onKeyUp: () => void;
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    private startScribble;
    private pushPointToScribble;
    private onScribbleUpdate;
    private onScribbleComplete;
    private updateScribbleSelection;
    private complete;
    private cancel;
}

/** @public */
declare class ScribbleManager implements TLScribble {
    state: "active" | "paused" | "starting" | "stopping";
    points: Vec2dModel[];
    size: number;
    color: "accent" | "black" | "laser" | "muted-1" | "selection-fill" | "selection-stroke" | "white";
    opacity: number;
    delay: number;
    timeoutMs: number;
    delayRemaining: number;
    private onUpdate;
    private onComplete;
    private prev;
    private next;
    constructor(opts: {
        onUpdate: (scribble: TLScribble) => void;
        onComplete: () => void;
        size?: TLScribble['size'];
        color?: TLScribble['color'];
        opacity?: TLScribble['opacity'];
        delay?: TLScribble['delay'];
    });
    resume: () => void;
    pause: () => void;
    /**
     * Start stopping the scribble. The scribble won't be removed until its last point is cleared.
     *
     * @public
     */
    stop: () => void;
    /**
     * Set the scribble's next point.
     *
     * @param point - The point to add.
     * @public
     */
    addPoint: (x: number, y: number) => void;
    /**
     * Get the current TLScribble object from the scribble manager.
     *
     * @public
     */
    getScribble(): TLScribble;
    private updateScribble;
    tick: TLTickEvent;
}

/** @public */
export declare class SelectTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Brushing | typeof Crop | typeof Cropping | typeof DraggingHandle | typeof EditingShape | typeof Idle_11 | typeof PointingCanvas | typeof PointingCropHandle | typeof PointingHandle | typeof PointingResizeHandle | typeof PointingRotateHandle | typeof PointingSelection | typeof PointingShape | typeof Resizing | typeof Rotating | typeof ScribbleBrushing | typeof Translating)[];
    onExit: () => void;
}

/** @public */
export declare function serializeTldrawJson(store: TLStore): Promise<string>;

/** @public */
export declare function serializeTldrawJsonBlob(store: TLStore): Promise<Blob>;

/** @public */
export declare function setDefaultEditorAssetUrls(assetUrls: TLEditorAssetUrls): void;

/* Excluded from this release type: setDefaultUiAssetUrls */

declare type ShapeStyles = {
    color: ColorStyle;
    size: SizeStyle;
    dash: DashStyle;
    font?: FontStyle;
    textAlign?: AlignStyle;
    isFilled?: boolean;
    scale?: number;
};

declare enum SizeStyle {
    Small = "small",
    Medium = "medium",
    Large = "large"
}

declare interface StickyShape extends TDBaseShape {
    type: TDShapeType.Sticky;
    size: number[];
    text: string;
}

/** @public */
declare function Sub({ id, children }: {
    id: string;
    children: any;
}): JSX.Element;

/** @public */
declare function SubContent({ alignOffset, sideOffset, children, }: {
    alignOffset?: number;
    sideOffset?: number;
    children: any;
}): JSX.Element;

/** @public */
declare function SubTrigger({ label, 'data-testid': testId, 'data-direction': dataDirection, }: {
    label: TLUiTranslationKey;
    'data-testid'?: string;
    'data-direction'?: 'left' | 'right';
}): JSX.Element;

declare type TDAsset = TDImageAsset | TDVideoAsset;

declare type TDAssets = Record<string, TDAsset>;

declare enum TDAssetType {
    Image = "image",
    Video = "video"
}

declare interface TDBaseShape extends TLV1Shape {
    style: ShapeStyles;
    type: TDShapeType;
    label?: string;
    handles?: Record<string, TDHandle>;
}

declare type TDBinding = ArrowBinding;

declare interface TDHandle extends TLV1Handle {
    canBind?: boolean;
    bindingId?: string;
}

declare interface TDImageAsset extends TLV1Asset {
    type: TDAssetType.Image;
    fileName: string;
    src: string;
    size: number[];
}

declare type TDPage = {
    id: string;
    name?: string;
    childIndex?: number;
    shapes: Record<string, TDShape>;
    bindings: Record<string, TDBinding>;
};

declare type TDShape = ArrowShape | DrawShape | EllipseShape | GroupShape | ImageShape | RectangleShape | StickyShape | TextShape | TriangleShape | VideoShape;

declare enum TDShapeType {
    Sticky = "sticky",
    Ellipse = "ellipse",
    Rectangle = "rectangle",
    Triangle = "triangle",
    Draw = "draw",
    Arrow = "arrow",
    Text = "text",
    Group = "group",
    Image = "image",
    Video = "video"
}

declare interface TDVideoAsset extends TLV1Asset {
    type: TDAssetType.Video;
    fileName: string;
    src: string;
    size: number[];
}

declare interface TextShape extends TDBaseShape {
    type: TDShapeType.Text;
    text: string;
}

declare class TextShapeTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Idle_6 | typeof Pointing_5)[];
    shapeType: string;
}

/** @public */
export declare class TextShapeUtil extends ShapeUtil<TLTextShape> {
    static type: "text";
    static props: {
        color: EnumStyleProp<"black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow">;
        size: EnumStyleProp<"l" | "m" | "s" | "xl">;
        font: EnumStyleProp<"draw" | "mono" | "sans" | "serif">;
        align: EnumStyleProp<"end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start">;
        w: Validator<number>;
        text: Validator<string>;
        scale: Validator<number>;
        autoSize: Validator<boolean>;
    };
    static migrations: Migrations;
    getDefaultProps(): TLTextShape['props'];
    getMinDimensions(shape: TLTextShape): {
        height: number;
        width: number;
    };
    getGeometry(shape: TLTextShape): Rectangle2d;
    canEdit: () => boolean;
    isAspectRatioLocked: TLShapeUtilFlag<TLTextShape>;
    component(shape: TLTextShape): JSX.Element;
    indicator(shape: TLTextShape): JSX.Element;
    toSvg(shape: TLTextShape, ctx: SvgExportContext): SVGGElement;
    onResize: TLOnResizeHandler<TLTextShape>;
    onBeforeCreate: (shape: TLTextShape) => {
        x: number;
        y: number;
        type: "text";
        rotation: number;
        index: string;
        parentId: TLParentId;
        isLocked: boolean;
        opacity: number;
        props: {
            color: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
            size: "l" | "m" | "s" | "xl";
            font: "draw" | "mono" | "sans" | "serif";
            align: "end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start";
            w: number;
            text: string;
            scale: number;
            autoSize: boolean;
        };
        meta: JsonObject;
        id: TLShapeId;
        typeName: "shape";
    } | undefined;
    onEditEnd: TLOnEditEndHandler<TLTextShape>;
    onBeforeUpdate: (prev: TLTextShape, next: TLTextShape) => {
        x: number;
        y: number;
        props: {
            w: number;
            color: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
            size: "l" | "m" | "s" | "xl";
            font: "draw" | "mono" | "sans" | "serif";
            align: "end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start";
            text: string;
            scale: number;
            autoSize: boolean;
        };
        type: "text";
        rotation: number;
        index: string;
        parentId: TLParentId;
        isLocked: boolean;
        opacity: number;
        meta: JsonObject;
        id: TLShapeId;
        typeName: "shape";
    } | undefined;
    onDoubleClickEdge: (shape: TLTextShape) => {
        id: TLShapeId;
        type: "text";
        props: {
            autoSize: boolean;
            scale?: undefined;
        };
    } | {
        id: TLShapeId;
        type: "text";
        props: {
            scale: number;
            autoSize?: undefined;
        };
    } | undefined;
}

/** @public */
declare function Title({ className, children }: {
    className?: string;
    children: any;
}): JSX.Element;

/** @public */
declare type TLCopyType = 'jpeg' | 'json' | 'png' | 'svg';

/** @public */
export declare function Tldraw(props: TldrawEditorBaseProps & ({
    store: TLStore | TLStoreWithStatus;
} | {
    store?: undefined;
    persistenceKey?: string;
    sessionId?: string;
    defaultName?: string;
    /**
     * A snapshot to load for the store's initial data / schema.
     */
    snapshot?: StoreSnapshot<TLRecord>;
}) & TldrawUiProps & Partial<TLExternalContentProps> & {
    /**
     * Urls for the editor to find fonts and other assets.
     */
    assetUrls?: RecursivePartial<TLEditorAssetUrls>;
}): JSX.Element;

/** @public */
export declare const TLDRAW_FILE_EXTENSION: ".tldr";

/** @public */
export declare interface TldrawFile {
    tldrawFileFormatVersion: number;
    schema: SerializedSchema;
    records: UnknownRecord[];
}

/** @public */
declare type TldrawFileParseError = {
    type: 'fileFormatVersionTooNew';
    version: number;
} | {
    type: 'invalidRecords';
    cause: unknown;
} | {
    type: 'migrationFailed';
    reason: MigrationFailureReason;
} | {
    type: 'notATldrawFile';
    cause: unknown;
} | {
    type: 'v1File';
    data: any;
};

/**
 * @public
 */
export declare const TldrawUi: React_2.NamedExoticComponent<TldrawUiProps>;

/**
 * Base props for the {@link @tldraw/tldraw#Tldraw} and {@link TldrawUi} components.
 *
 * @public
 */
export declare interface TldrawUiBaseProps {
    /**
     * The component's children.
     */
    children?: ReactNode;
    /**
     * Whether to hide the user interface and only display the canvas.
     */
    hideUi?: boolean;
    /**
     * A component to use for the share zone (will be deprecated)
     */
    shareZone?: ReactNode;
    /**
     * A component to use for the top zone (will be deprecated)
     */
    topZone?: ReactNode;
    /**
     * Additional items to add to the debug menu (will be deprecated)
     */
    renderDebugMenuItems?: () => React_2.ReactNode;
}

/** @public */
export declare function TldrawUiContextProvider({ overrides, assetUrls, onUiEvent, children, }: TldrawUiContextProviderProps): JSX.Element;

/**
 * Props for the {@link @tldraw/tldraw#Tldraw} and {@link TldrawUi} components.
 *
 * @public
 **/
export declare interface TldrawUiContextProviderProps {
    /**
     * Urls for where to find fonts and other assets for the UI.
     */
    assetUrls?: RecursivePartial<TLUiAssetUrls>;
    /**
     * Overrides for the UI.
     */
    overrides?: TLUiOverrides | TLUiOverrides[];
    /**
     * Callback for when an event occurs in the UI.
     */
    onUiEvent?: TLUiEventHandler;
    /**
     * The component's children.
     */
    children?: any;
}

/**
 * Props for the {@link @tldraw/tldraw#Tldraw} and {@link TldrawUi} components.
 *
 * @public
 */
export declare type TldrawUiProps = TldrawUiBaseProps & TldrawUiContextProviderProps;

/** @public */
declare type TLEditorAssetUrls = {
    fonts: {
        monospace: string;
        serif: string;
        sansSerif: string;
        draw: string;
    };
};

/** @public */
declare type TLEmbedResult = {
    definition: EmbedDefinition;
    url: string;
    embedUrl: string;
} | undefined;

/** @public */
declare type TLExportType = 'jpeg' | 'json' | 'png' | 'svg' | 'webp';

/** @public */
declare type TLExternalContentProps = {
    maxImageDimension: number;
    maxAssetSize: number;
    acceptedImageMimeTypes: string[];
    acceptedVideoMimeTypes: string[];
};

declare type TLPointingCropHandleInfo = TLPointerEventInfo & {
    target: 'selection';
} & {
    onInteractionEnd?: string;
};

/** @public */
export declare interface TLUiActionItem {
    icon?: TLUiIconType;
    id: string;
    kbd?: string;
    title?: string;
    label?: TLUiTranslationKey;
    menuLabel?: TLUiTranslationKey;
    shortcutsLabel?: TLUiTranslationKey;
    contextMenuLabel?: TLUiTranslationKey;
    readonlyOk: boolean;
    checkbox?: boolean;
    onSelect: (source: TLUiEventSource) => Promise<void> | void;
}

/** @public */
export declare type TLUiActionsContextType = Record<string, TLUiActionItem>;

/** @public */
export declare type TLUiActionsMenuSchemaContextType = TLUiMenuSchema;

declare type TLUiAssetUrls = TLEditorAssetUrls & {
    icons: Record<TLUiIconType, string>;
    translations: Record<(typeof LANGUAGES)[number]['locale'], string>;
    embedIcons: Record<(typeof EMBED_DEFINITIONS)[number]['type'], string>;
};

/** @public */
export declare interface TLUiButtonProps extends React_3.HTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    disabled?: boolean;
    label?: TLUiTranslationKey;
    icon?: TLUiIconType;
    spinner?: boolean;
    iconLeft?: TLUiIconType;
    smallIcon?: boolean;
    kbd?: string;
    isChecked?: boolean;
    invertIcon?: boolean;
    type?: 'danger' | 'normal' | 'primary';
}

/** @public */
export declare interface TLUiContextMenuProps {
    children: any;
}

/** @public */
declare type TLUiContextMenuSchemaProviderProps = {
    overrides?: (editor: Editor, schema: TLUiContextTTLUiMenuSchemaContextType, helpers: {
        actions: ReturnType<typeof useActions>;
        oneSelected: boolean;
        twoSelected: boolean;
        threeSelected: boolean;
        showAutoSizeToggle: boolean;
        showUngroup: boolean;
        onlyFlippableShapeSelected: boolean;
    }) => TLUiContextTTLUiMenuSchemaContextType;
    children: any;
};

/** @public */
export declare type TLUiContextTTLUiMenuSchemaContextType = TLUiMenuSchema;

/** @public */
export declare type TLUiCustomMenuItem = {
    id: string;
    type: 'custom';
    disabled: boolean;
    readonlyOk: boolean;
};

/** @public */
export declare interface TLUiDialog {
    id: string;
    onClose?: () => void;
    component: (props: TLUiDialogProps) => any;
}

/** @public */
export declare interface TLUiDialogProps {
    onClose: () => void;
}

/** @public */
export declare type TLUiDialogsContextType = {
    addDialog: (dialog: Omit<TLUiDialog, 'id'> & {
        id?: string;
    }) => string;
    removeDialog: (id: string) => string;
    updateDialog: (id: string, newDialogData: Partial<TLUiDialog>) => string;
    clearDialogs: () => void;
    dialogs: TLUiDialog[];
};

/** @public */
export declare type TLUiEventContextType = TLUiEventHandler<keyof TLUiEventMap>;

/** @public */
export declare type TLUiEventHandler<T extends keyof TLUiEventMap = keyof TLUiEventMap> = (name: T, data: Join<{
    source: TLUiEventSource;
}, TLUiEventMap[T]>) => void;

/** @public */
declare interface TLUiEventMap {
    undo: null;
    redo: null;
    'group-shapes': null;
    'ungroup-shapes': null;
    'convert-to-embed': null;
    'convert-to-bookmark': null;
    'open-embed-link': null;
    'toggle-auto-size': null;
    'copy-as': {
        format: 'json' | 'png' | 'svg';
    };
    'export-as': {
        format: 'json' | 'png' | 'svg';
    };
    'edit-link': null;
    'insert-embed': null;
    'insert-media': null;
    'align-shapes': {
        operation: 'bottom' | 'center-horizontal' | 'center-vertical' | 'left' | 'right' | 'top';
    };
    'duplicate-shapes': null;
    'pack-shapes': null;
    'stack-shapes': {
        operation: 'horizontal' | 'vertical';
    };
    'flip-shapes': {
        operation: 'horizontal' | 'vertical';
    };
    'distribute-shapes': {
        operation: 'horizontal' | 'vertical';
    };
    'stretch-shapes': {
        operation: 'horizontal' | 'vertical';
    };
    'reorder-shapes': {
        operation: 'backward' | 'forward' | 'toBack' | 'toFront';
    };
    'delete-shapes': null;
    'select-all-shapes': null;
    'select-none-shapes': null;
    'rotate-ccw': null;
    'rotate-cw': null;
    'zoom-in': null;
    'zoom-out': null;
    'zoom-to-fit': null;
    'zoom-to-selection': null;
    'reset-zoom': null;
    'zoom-into-view': null;
    'zoom-to-content': null;
    'open-menu': {
        id: string;
    };
    'close-menu': {
        id: string;
    };
    'create-new-project': null;
    'save-project-to-file': null;
    'open-file': null;
    'select-tool': {
        id: string;
    };
    print: null;
    copy: null;
    paste: null;
    cut: null;
    'toggle-transparent': null;
    'toggle-snap-mode': null;
    'toggle-tool-lock': null;
    'toggle-grid-mode': null;
    'toggle-dark-mode': null;
    'toggle-focus-mode': null;
    'toggle-debug-mode': null;
    'toggle-lock': null;
    'toggle-reduce-motion': null;
    'exit-pen-mode': null;
    'stop-following': null;
    'open-cursor-chat': null;
    'zoom-tool': null;
    'unlock-all': null;
}

/** @public */
export declare type TLUiEventSource = 'actions-menu' | 'context-menu' | 'debug-panel' | 'dialog' | 'export-menu' | 'help-menu' | 'helper-buttons' | 'kbd' | 'menu' | 'navigation-zone' | 'page-menu' | 'people-menu' | 'quick-actions' | 'share-menu' | 'toolbar' | 'unknown' | 'zoom-menu';

/** @public */
export declare type TLUiHelpMenuSchemaContextType = TLUiMenuSchema;

/** @public */
declare type TLUiHelpMenuSchemaProviderProps = {
    overrides?: (editor: Editor, schema: TLUiHelpMenuSchemaContextType, helpers: {
        actions: ReturnType<typeof useActions>;
        languages: readonly TLLanguage[];
        currentLanguage: string;
        oneSelected: boolean;
        twoSelected: boolean;
        threeSelected: boolean;
    }) => TLUiHelpMenuSchemaContextType;
    children: any;
};

/** @public */
export declare interface TLUiIconProps extends React.HTMLProps<HTMLDivElement> {
    icon: TLUiIconType;
    small?: boolean;
    color?: string;
    children?: undefined;
    invertIcon?: boolean;
    crossOrigin?: 'anonymous' | 'use-credentials';
}

/** @public */
export declare type TLUiIconType = 'align-bottom-center' | 'align-bottom-left' | 'align-bottom-right' | 'align-bottom' | 'align-center-center' | 'align-center-horizontal' | 'align-center-left' | 'align-center-right' | 'align-center-vertical' | 'align-left' | 'align-right' | 'align-top-center' | 'align-top-left' | 'align-top-right' | 'align-top' | 'arrow-left' | 'arrowhead-arrow' | 'arrowhead-bar' | 'arrowhead-diamond' | 'arrowhead-dot' | 'arrowhead-none' | 'arrowhead-square' | 'arrowhead-triangle-inverted' | 'arrowhead-triangle' | 'aspect-ratio' | 'avatar' | 'blob' | 'bring-forward' | 'bring-to-front' | 'check' | 'checkbox-checked' | 'checkbox-empty' | 'chevron-down' | 'chevron-left' | 'chevron-right' | 'chevron-up' | 'chevrons-ne' | 'chevrons-sw' | 'clipboard-copied' | 'clipboard-copy' | 'code' | 'collab' | 'color' | 'comment' | 'cross-2' | 'cross' | 'dash-dashed' | 'dash-dotted' | 'dash-draw' | 'dash-solid' | 'discord' | 'distribute-horizontal' | 'distribute-vertical' | 'dot' | 'dots-horizontal' | 'dots-vertical' | 'drag-handle-dots' | 'duplicate' | 'edit' | 'external-link' | 'file' | 'fill-none' | 'fill-pattern' | 'fill-semi' | 'fill-solid' | 'follow' | 'following' | 'font-draw' | 'font-mono' | 'font-sans' | 'font-serif' | 'geo-arrow-down' | 'geo-arrow-left' | 'geo-arrow-right' | 'geo-arrow-up' | 'geo-check-box' | 'geo-cloud' | 'geo-diamond' | 'geo-ellipse' | 'geo-hexagon' | 'geo-octagon' | 'geo-oval' | 'geo-pentagon' | 'geo-rectangle' | 'geo-rhombus-2' | 'geo-rhombus' | 'geo-star' | 'geo-trapezoid' | 'geo-triangle' | 'geo-x-box' | 'github' | 'group' | 'hidden' | 'image' | 'info-circle' | 'leading' | 'link' | 'lock-small' | 'lock' | 'menu' | 'minus' | 'mixed' | 'pack' | 'page' | 'plus' | 'question-mark-circle' | 'question-mark' | 'redo' | 'reset-zoom' | 'rotate-ccw' | 'rotate-cw' | 'ruler' | 'search' | 'send-backward' | 'send-to-back' | 'settings-horizontal' | 'settings-vertical-1' | 'settings-vertical' | 'share-1' | 'share-2' | 'size-extra-large' | 'size-large' | 'size-medium' | 'size-small' | 'spline-cubic' | 'spline-line' | 'stack-horizontal' | 'stack-vertical' | 'stretch-horizontal' | 'stretch-vertical' | 'text-align-center' | 'text-align-justify' | 'text-align-left' | 'text-align-right' | 'tool-arrow' | 'tool-embed' | 'tool-eraser' | 'tool-frame' | 'tool-hand' | 'tool-highlight' | 'tool-laser' | 'tool-line' | 'tool-media' | 'tool-note' | 'tool-pencil' | 'tool-pointer' | 'tool-text' | 'trash' | 'triangle-down' | 'triangle-up' | 'twitter' | 'undo' | 'ungroup' | 'unlock-small' | 'unlock' | 'vertical-align-center' | 'vertical-align-end' | 'vertical-align-start' | 'visible' | 'warning-triangle' | 'zoom-in' | 'zoom-out';

/** @public */
export declare interface TLUiInputProps {
    disabled?: boolean;
    label?: TLUiTranslationKey;
    icon?: TLUiIconType;
    iconLeft?: TLUiIconType;
    autofocus?: boolean;
    autoselect?: boolean;
    children?: any;
    defaultValue?: string;
    placeholder?: string;
    onComplete?: (value: string) => void;
    onValueChange?: (value: string) => void;
    onCancel?: (value: string) => void;
    onBlur?: (value: string) => void;
    className?: string;
    /**
     * Usually on iOS when you focus an input, the browser will adjust the viewport to bring the input
     * into view. Sometimes this doesn't work properly though - for example, if the input is newly
     * created, iOS seems to have a hard time adjusting the viewport for it. This prop allows you to
     * opt-in to some extra code to manually bring the input into view when the visual viewport of the
     * browser changes, but we don't want to use it everywhere because generally the native behavior
     * looks nicer in scenarios where it's sufficient.
     */
    shouldManuallyMaintainScrollPositionWhenFocused?: boolean;
    value?: string;
}

/** @public */
export declare type TLUiKeyboardShortcutsSchemaContextType = TLUiMenuSchema;

/** @public */
export declare type TLUiKeyboardShortcutsSchemaProviderProps = {
    overrides?: (editor: Editor, schema: TLUiKeyboardShortcutsSchemaContextType, more: {
        tools: TLUiToolsContextType;
        actions: TLUiActionsContextType;
    }) => TLUiKeyboardShortcutsSchemaContextType;
    children: any;
};

/** @public */
export declare type TLUiMenuChild = TLUiCustomMenuItem | TLUiMenuGroup | TLUiMenuItem | TLUiSubMenu;

/** @public */
export declare type TLUiMenuGroup = {
    id: string;
    type: 'group';
    checkbox: boolean;
    disabled: boolean;
    readonlyOk: boolean;
    children: TLUiMenuChild[];
};

/** @public */
export declare type TLUiMenuItem = {
    id: string;
    type: 'item';
    readonlyOk: boolean;
    actionItem: TLUiActionItem;
    disabled: boolean;
    checked: boolean;
};

/** @public */
export declare type TLUiMenuSchema = (TLUiCustomMenuItem | TLUiMenuGroup | TLUiMenuItem)[];

/** @public */
export declare type TLUiMenuSchemaContextType = TLUiMenuSchema;

/** @public */
export declare type TLUiMenuSchemaProviderProps = {
    overrides?: (editor: Editor, schema: TLUiMenuSchemaContextType, helpers: {
        actions: ReturnType<typeof useActions>;
        noneSelected: boolean;
        oneSelected: boolean;
        twoSelected: boolean;
        threeSelected: boolean;
    }) => TLUiMenuSchemaContextType;
    children: any;
};

declare type TLUiOverride<Type, Helpers> = (editor: Editor, schema: Type, helpers: Helpers) => Type;

/** @public */
export declare interface TLUiOverrides {
    actionsMenu?: WithDefaultHelpers<NonNullable<ActionsMenuSchemaProviderProps['overrides']>>;
    actions?: WithDefaultHelpers<NonNullable<ActionsProviderProps['overrides']>>;
    contextMenu?: WithDefaultHelpers<NonNullable<TLUiContextMenuSchemaProviderProps['overrides']>>;
    helpMenu?: WithDefaultHelpers<NonNullable<TLUiHelpMenuSchemaProviderProps['overrides']>>;
    menu?: WithDefaultHelpers<NonNullable<TLUiMenuSchemaProviderProps['overrides']>>;
    toolbar?: WithDefaultHelpers<NonNullable<TLUiToolbarSchemaProviderProps['overrides']>>;
    keyboardShortcutsMenu?: WithDefaultHelpers<NonNullable<TLUiKeyboardShortcutsSchemaProviderProps['overrides']>>;
    tools?: WithDefaultHelpers<NonNullable<TLUiToolsProviderProps['overrides']>>;
    translations?: TLUiTranslationProviderProps['overrides'];
}

/** @public */
export declare type TLUiSubMenu = {
    id: string;
    type: 'submenu';
    label: TLUiTranslationKey;
    disabled: boolean;
    readonlyOk: boolean;
    children: TLUiMenuChild[];
};

/** @public */
export declare interface TLUiToast {
    id: string;
    icon?: string;
    title?: string;
    description?: string;
    actions?: TLUiToastAction[];
    keepOpen?: boolean;
    closeLabel?: string;
}

/** @public */
export declare interface TLUiToastAction {
    type: 'primary' | 'secondary' | 'warn';
    label: string;
    onClick: () => void;
}

/** @public */
export declare type TLUiToastsContextType = {
    addToast: (toast: Omit<TLUiToast, 'id'> & {
        id?: string;
    }) => string;
    removeToast: (id: TLUiToast['id']) => string;
    clearToasts: () => void;
    toasts: TLUiToast[];
};

/** @public */
export declare type TLUiToolbarItem = {
    id: string;
    type: 'item';
    readonlyOk: boolean;
    toolItem: TLUiToolItem;
};

/** @public */
export declare type TLUiToolbarSchemaContextType = TLUiToolbarItem[];

/** @public */
declare type TLUiToolbarSchemaProviderProps = {
    overrides?: (editor: Editor, schema: TLUiToolbarSchemaContextType, more: {
        tools: TLUiToolsContextType;
    }) => TLUiToolbarSchemaContextType;
    children: any;
};

/** @public */
export declare interface TLUiToolItem {
    id: string;
    label: TLUiTranslationKey;
    shortcutsLabel?: TLUiTranslationKey;
    icon: TLUiIconType;
    onSelect: (source: TLUiEventSource) => void;
    kbd?: string;
    readonlyOk: boolean;
    meta?: {
        [key: string]: any;
    };
}

/** @public */
export declare type TLUiToolsContextType = Record<string, TLUiToolItem>;

/** @public */
export declare type TLUiToolsProviderProps = {
    overrides?: (editor: Editor, tools: TLUiToolsContextType, helpers: {
        insertMedia: () => void;
    }) => TLUiToolsContextType;
    children: any;
};

/** @public */
export declare type TLUiTranslation = {
    readonly locale: string;
    readonly label: string;
    readonly messages: Record<TLUiTranslationKey, string>;
};

/** @public */
export declare type TLUiTranslationContextType = TLUiTranslation;

/** @public */
export declare type TLUiTranslationKey = 'action.align-bottom' | 'action.align-center-horizontal.short' | 'action.align-center-horizontal' | 'action.align-center-vertical.short' | 'action.align-center-vertical' | 'action.align-left' | 'action.align-right' | 'action.align-top' | 'action.back-to-content' | 'action.bring-forward' | 'action.bring-to-front' | 'action.convert-to-bookmark' | 'action.convert-to-embed' | 'action.copy-as-json.short' | 'action.copy-as-json' | 'action.copy-as-png.short' | 'action.copy-as-png' | 'action.copy-as-svg.short' | 'action.copy-as-svg' | 'action.copy' | 'action.cut' | 'action.delete' | 'action.distribute-horizontal.short' | 'action.distribute-horizontal' | 'action.distribute-vertical.short' | 'action.distribute-vertical' | 'action.duplicate' | 'action.edit-link' | 'action.exit-pen-mode' | 'action.export-as-json.short' | 'action.export-as-json' | 'action.export-as-png.short' | 'action.export-as-png' | 'action.export-as-svg.short' | 'action.export-as-svg' | 'action.flip-horizontal.short' | 'action.flip-horizontal' | 'action.flip-vertical.short' | 'action.flip-vertical' | 'action.fork-project' | 'action.group' | 'action.insert-embed' | 'action.insert-media' | 'action.leave-shared-project' | 'action.new-project' | 'action.new-shared-project' | 'action.open-cursor-chat' | 'action.open-embed-link' | 'action.open-file' | 'action.pack' | 'action.paste' | 'action.print' | 'action.redo' | 'action.rotate-ccw' | 'action.rotate-cw' | 'action.save-copy' | 'action.select-all' | 'action.select-none' | 'action.send-backward' | 'action.send-to-back' | 'action.share-project' | 'action.stack-horizontal.short' | 'action.stack-horizontal' | 'action.stack-vertical.short' | 'action.stack-vertical' | 'action.stop-following' | 'action.stretch-horizontal.short' | 'action.stretch-horizontal' | 'action.stretch-vertical.short' | 'action.stretch-vertical' | 'action.toggle-auto-size' | 'action.toggle-dark-mode.menu' | 'action.toggle-dark-mode' | 'action.toggle-debug-mode.menu' | 'action.toggle-debug-mode' | 'action.toggle-focus-mode.menu' | 'action.toggle-focus-mode' | 'action.toggle-grid.menu' | 'action.toggle-grid' | 'action.toggle-lock' | 'action.toggle-reduce-motion.menu' | 'action.toggle-reduce-motion' | 'action.toggle-snap-mode.menu' | 'action.toggle-snap-mode' | 'action.toggle-tool-lock.menu' | 'action.toggle-tool-lock' | 'action.toggle-transparent.context-menu' | 'action.toggle-transparent.menu' | 'action.toggle-transparent' | 'action.undo' | 'action.ungroup' | 'action.unlock-all' | 'action.zoom-in' | 'action.zoom-out' | 'action.zoom-to-100' | 'action.zoom-to-fit' | 'action.zoom-to-selection' | 'actions-menu.title' | 'align-style.end' | 'align-style.justify' | 'align-style.middle' | 'align-style.start' | 'arrowheadEnd-style.arrow' | 'arrowheadEnd-style.bar' | 'arrowheadEnd-style.diamond' | 'arrowheadEnd-style.dot' | 'arrowheadEnd-style.inverted' | 'arrowheadEnd-style.none' | 'arrowheadEnd-style.pipe' | 'arrowheadEnd-style.square' | 'arrowheadEnd-style.triangle' | 'arrowheadStart-style.arrow' | 'arrowheadStart-style.bar' | 'arrowheadStart-style.diamond' | 'arrowheadStart-style.dot' | 'arrowheadStart-style.inverted' | 'arrowheadStart-style.none' | 'arrowheadStart-style.pipe' | 'arrowheadStart-style.square' | 'arrowheadStart-style.triangle' | 'color-style.black' | 'color-style.blue' | 'color-style.green' | 'color-style.grey' | 'color-style.light-blue' | 'color-style.light-green' | 'color-style.light-red' | 'color-style.light-violet' | 'color-style.orange' | 'color-style.red' | 'color-style.violet' | 'color-style.yellow' | 'context-menu.arrange' | 'context-menu.copy-as' | 'context-menu.export-as' | 'context-menu.move-to-page' | 'context-menu.reorder' | 'context.pages.new-page' | 'cursor-chat.type-to-chat' | 'dash-style.dashed' | 'dash-style.dotted' | 'dash-style.draw' | 'dash-style.solid' | 'debug-panel.more' | 'edit-link-dialog.cancel' | 'edit-link-dialog.clear' | 'edit-link-dialog.detail' | 'edit-link-dialog.invalid-url' | 'edit-link-dialog.save' | 'edit-link-dialog.title' | 'edit-link-dialog.url' | 'edit-pages-dialog.move-down' | 'edit-pages-dialog.move-up' | 'embed-dialog.back' | 'embed-dialog.cancel' | 'embed-dialog.create' | 'embed-dialog.instruction' | 'embed-dialog.invalid-url' | 'embed-dialog.title' | 'embed-dialog.url' | 'file-system.confirm-clear.cancel' | 'file-system.confirm-clear.continue' | 'file-system.confirm-clear.description' | 'file-system.confirm-clear.dont-show-again' | 'file-system.confirm-clear.title' | 'file-system.confirm-open.cancel' | 'file-system.confirm-open.description' | 'file-system.confirm-open.dont-show-again' | 'file-system.confirm-open.open' | 'file-system.confirm-open.title' | 'file-system.file-open-error.file-format-version-too-new' | 'file-system.file-open-error.generic-corrupted-file' | 'file-system.file-open-error.not-a-tldraw-file' | 'file-system.file-open-error.title' | 'file-system.shared-document-file-open-error.description' | 'file-system.shared-document-file-open-error.title' | 'fill-style.none' | 'fill-style.pattern' | 'fill-style.semi' | 'fill-style.solid' | 'focus-mode.toggle-focus-mode' | 'font-style.draw' | 'font-style.mono' | 'font-style.sans' | 'font-style.serif' | 'geo-style.arrow-down' | 'geo-style.arrow-left' | 'geo-style.arrow-right' | 'geo-style.arrow-up' | 'geo-style.check-box' | 'geo-style.cloud' | 'geo-style.diamond' | 'geo-style.ellipse' | 'geo-style.hexagon' | 'geo-style.octagon' | 'geo-style.oval' | 'geo-style.pentagon' | 'geo-style.rectangle' | 'geo-style.rhombus-2' | 'geo-style.rhombus' | 'geo-style.star' | 'geo-style.trapezoid' | 'geo-style.triangle' | 'geo-style.x-box' | 'help-menu.about' | 'help-menu.discord' | 'help-menu.github' | 'help-menu.keyboard-shortcuts' | 'help-menu.title' | 'help-menu.twitter' | 'home-project-dialog.description' | 'home-project-dialog.ok' | 'home-project-dialog.title' | 'menu.copy-as' | 'menu.edit' | 'menu.export-as' | 'menu.file' | 'menu.language' | 'menu.preferences' | 'menu.title' | 'menu.view' | 'navigation-zone.toggle-minimap' | 'navigation-zone.zoom' | 'opacity-style.0.1' | 'opacity-style.0.25' | 'opacity-style.0.5' | 'opacity-style.0.75' | 'opacity-style.1' | 'page-menu.create-new-page' | 'page-menu.edit-done' | 'page-menu.edit-start' | 'page-menu.go-to-page' | 'page-menu.max-page-count-reached' | 'page-menu.new-page-initial-name' | 'page-menu.submenu.delete' | 'page-menu.submenu.duplicate-page' | 'page-menu.submenu.move-down' | 'page-menu.submenu.move-up' | 'page-menu.submenu.rename' | 'page-menu.submenu.title' | 'page-menu.title' | 'people-menu.change-color' | 'people-menu.change-name' | 'people-menu.follow' | 'people-menu.following' | 'people-menu.invite' | 'people-menu.leading' | 'people-menu.title' | 'people-menu.user' | 'rename-project-dialog.cancel' | 'rename-project-dialog.rename' | 'rename-project-dialog.title' | 'share-menu.copy-link-note' | 'share-menu.copy-link' | 'share-menu.copy-readonly-link-note' | 'share-menu.copy-readonly-link' | 'share-menu.create-snapshot-link' | 'share-menu.default-project-name' | 'share-menu.fork-note' | 'share-menu.offline-note' | 'share-menu.project-too-large' | 'share-menu.readonly-link' | 'share-menu.save-note' | 'share-menu.share-project' | 'share-menu.snapshot-link-note' | 'share-menu.title' | 'share-menu.upload-failed' | 'sharing.confirm-leave.cancel' | 'sharing.confirm-leave.description' | 'sharing.confirm-leave.dont-show-again' | 'sharing.confirm-leave.leave' | 'sharing.confirm-leave.title' | 'shortcuts-dialog.collaboration' | 'shortcuts-dialog.edit' | 'shortcuts-dialog.file' | 'shortcuts-dialog.preferences' | 'shortcuts-dialog.title' | 'shortcuts-dialog.tools' | 'shortcuts-dialog.transform' | 'shortcuts-dialog.view' | 'size-style.l' | 'size-style.m' | 'size-style.s' | 'size-style.xl' | 'spline-style.cubic' | 'spline-style.line' | 'style-panel.align' | 'style-panel.arrowhead-end' | 'style-panel.arrowhead-start' | 'style-panel.arrowheads' | 'style-panel.color' | 'style-panel.dash' | 'style-panel.fill' | 'style-panel.font' | 'style-panel.geo' | 'style-panel.mixed' | 'style-panel.opacity' | 'style-panel.position' | 'style-panel.size' | 'style-panel.spline' | 'style-panel.title' | 'style-panel.vertical-align' | 'toast.close' | 'toast.error.copy-fail.desc' | 'toast.error.copy-fail.title' | 'toast.error.export-fail.desc' | 'toast.error.export-fail.title' | 'tool-panel.drawing' | 'tool-panel.more' | 'tool-panel.shapes' | 'tool.arrow-down' | 'tool.arrow-left' | 'tool.arrow-right' | 'tool.arrow-up' | 'tool.arrow' | 'tool.asset' | 'tool.check-box' | 'tool.cloud' | 'tool.diamond' | 'tool.draw' | 'tool.ellipse' | 'tool.embed' | 'tool.eraser' | 'tool.frame' | 'tool.hand' | 'tool.hexagon' | 'tool.highlight' | 'tool.laser' | 'tool.line' | 'tool.note' | 'tool.octagon' | 'tool.oval' | 'tool.pentagon' | 'tool.rectangle' | 'tool.rhombus' | 'tool.select' | 'tool.star' | 'tool.text' | 'tool.trapezoid' | 'tool.triangle' | 'tool.x-box' | 'vscode.file-open.backup-failed' | 'vscode.file-open.backup-saved' | 'vscode.file-open.backup' | 'vscode.file-open.desc' | 'vscode.file-open.dont-show-again' | 'vscode.file-open.open';

/** @public */
declare interface TLUiTranslationProviderProps {
    children: any;
    /**
     * (optional) A collection of overrides different locales.
     *
     * @example
     *
     * ```ts
     * <TranslationProvider overrides={{ en: { 'style-panel.styles': 'Properties' } }} />
     * ```
     */
    overrides?: Record<string, Record<string, string>>;
}

declare interface TLV1Asset {
    id: string;
    type: string;
}

declare interface TLV1Binding {
    id: string;
    toId: string;
    fromId: string;
}

declare interface TLV1Bounds {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    width: number;
    height: number;
    rotation?: number;
}

declare interface TLV1Handle {
    id: string;
    index: number;
    point: number[];
}

declare interface TLV1PageState {
    id: string;
    selectedIds: string[];
    camera: {
        point: number[];
        zoom: number;
    };
    brush?: null | TLV1Bounds;
    pointedId?: null | string;
    hoveredId?: null | string;
    editingId?: null | string;
    bindingId?: null | string;
}

declare interface TLV1Shape {
    id: string;
    type: string;
    parentId: string;
    childIndex: number;
    name: string;
    point: number[];
    assetId?: string;
    rotation?: number;
    children?: string[];
    handles?: Record<string, TLV1Handle>;
    isGhost?: boolean;
    isHidden?: boolean;
    isLocked?: boolean;
    isGenerated?: boolean;
    isAspectRatioLocked?: boolean;
}

/** @public */
export declare function toolbarItem(toolItem: TLUiToolItem): TLUiToolbarItem;

declare class Translating extends StateNode {
    static id: string;
    info: TLBaseEventInfo & {
        type: "pointer";
        name: TLPointerEventName;
        point: VecLike;
        pointerId: number;
        button: number;
        isPen: boolean;
    } & {
        target: "shape";
        shape: TLShape;
    } & {
        target: 'shape';
        isCreating?: boolean | undefined;
        editAfterComplete?: boolean | undefined;
        onInteractionEnd?: string | undefined;
    };
    selectionSnapshot: TranslatingSnapshot;
    snapshot: TranslatingSnapshot;
    markId: string;
    isCloning: boolean;
    isCreating: boolean;
    editAfterComplete: boolean;
    dragAndDropManager: DragAndDropManager;
    onEnter: (info: TLPointerEventInfo & {
        target: 'shape';
        isCreating?: boolean;
        editAfterComplete?: boolean;
        onInteractionEnd?: string;
    }) => void;
    onExit: () => void;
    onPointerMove: () => void;
    onKeyDown: () => void;
    onKeyUp: TLEventHandlers['onKeyUp'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onComplete: TLEventHandlers['onComplete'];
    onCancel: TLEventHandlers['onCancel'];
    protected startCloning(): void;
    protected stopCloning(): void;
    updateParent: () => void;
    reset(): void;
    protected complete(): void;
    private cancel;
    protected handleStart(): void;
    protected handleEnd(): void;
    protected handleChange(): void;
    protected updateShapes(): void;
    protected updateParentTransforms: () => void;
}

declare class TranslatingCrop extends StateNode {
    static id: string;
    info: TLBaseEventInfo & {
        type: "pointer";
        name: TLPointerEventName;
        point: VecLike;
        pointerId: number;
        button: number;
        isPen: boolean;
    } & {
        target: "shape";
        shape: TLShape;
    } & {
        target: 'shape';
        isCreating?: boolean | undefined;
        onInteractionEnd?: string | undefined;
    };
    markId: string;
    private snapshot;
    onEnter: (info: TLPointerEventInfo & {
        target: 'shape';
        isCreating?: boolean;
        onInteractionEnd?: string;
    }) => void;
    onExit: () => void;
    onPointerMove: () => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onComplete: TLEventHandlers['onComplete'];
    onCancel: TLEventHandlers['onCancel'];
    onKeyDown: TLEventHandlers['onKeyDown'];
    onKeyUp: TLEventHandlers['onKeyUp'];
    protected complete(): void;
    private cancel;
    private createSnapshot;
    protected updateShapes(): void;
}

declare type TranslatingSnapshot = ReturnType<typeof getTranslatingSnapshot>;

declare interface TriangleShape extends TDBaseShape {
    type: TDShapeType.Triangle;
    size: number[];
    label?: string;
    labelPoint?: number[];
}

/** @public */
declare function Trigger({ children, 'data-testid': testId, }: {
    children: any;
    'data-testid'?: string;
}): JSX.Element;

/** @public */
export declare const truncateStringWithEllipsis: (str: string, maxLength: number) => string;

/** @public */
export declare function UiEventsProvider({ onEvent, children }: EventsProviderProps): JSX.Element;

/** @public */
export declare function useActions(): TLUiActionsContextType;

/** @public */
export declare function useActionsMenuSchema(): TLUiMenuSchema;

/* Excluded from this release type: useAssetUrls */

/** @public */
export declare function useBreakpoint(): number;

/** @public */
export declare function useCanRedo(): boolean;

/** @public */
export declare function useCanUndo(): boolean;

/** @public */
export declare function useContextMenuSchema(): TLUiMenuSchema;

/** @public */
export declare function useCopyAs(): (ids?: TLShapeId[], format?: TLCopyType) => void;

/** @public */
export declare function useDefaultHelpers(): {
    addToast: (toast: Omit<TLUiToast, "id"> & {
        id?: string | undefined;
    }) => string;
    removeToast: (id: string) => string;
    clearToasts: () => void;
    addDialog: (dialog: Omit<TLUiDialog, "id"> & {
        id?: string | undefined;
    }) => string;
    clearDialogs: () => void;
    removeDialog: (id: string) => string;
    updateDialog: (id: string, newDialogData: Partial<TLUiDialog>) => string;
    msg: (id: TLUiTranslationKey) => string;
    isMobile: boolean;
};

/** @public */
export declare function useDialogs(): TLUiDialogsContextType;

/** @public */
export declare function useExportAs(): (ids?: TLShapeId[], format?: TLExportType) => Promise<void>;

/** @public */
export declare function useHelpMenuSchema(): TLUiMenuSchema;

/** @public */
export declare function useKeyboardShortcuts(): void;

/** @public */
export declare function useKeyboardShortcutsSchema(): TLUiKeyboardShortcutsSchemaContextType;

/** @public */
export declare function useLocalStorageState<T = any>(key: string, defaultValue: T): readonly [T, (setter: ((value: T) => T) | T) => void];

/** @public */
export declare function useMenuClipboardEvents(): {
    copy: (source: TLUiEventSource) => void;
    cut: (source: TLUiEventSource) => void;
    paste: (data: ClipboardItem[] | DataTransfer, source: TLUiEventSource, point?: VecLike) => Promise<void>;
};

/** @public */
export declare function useMenuIsOpen(id: string, cb?: (isOpen: boolean) => void): readonly [boolean, (isOpen: boolean) => void];

/** @public */
export declare function useMenuSchema(): TLUiMenuSchema;

/** @public */
export declare function useNativeClipboardEvents(): void;

/** @public */
export declare function useReadonly(): boolean;

/** @public */
export declare function useToasts(): TLUiToastsContextType;

/** @public */
export declare function useToolbarSchema(): TLUiToolbarSchemaContextType;

/** @public */
export declare function useTools(): TLUiToolsContextType;

/**
 * Returns a function to translate a translation key into a string based on the current translation.
 *
 * @example
 *
 * ```ts
 * const msg = useTranslation()
 * const label = msg('style-panel.styles')
 * ```
 *
 * @public
 */
export declare function useTranslation(): (id: TLUiTranslationKey) => string;

/** @public */
export declare function useUiEvents(): TLUiEventContextType;

declare interface VideoShape extends TDBaseShape {
    type: TDShapeType.Video;
    size: number[];
    assetId: string;
    isPlaying: boolean;
    currentTime: number;
}

/** @public */
export declare class VideoShapeUtil extends BaseBoxShapeUtil<TLVideoShape> {
    static type: "video";
    static props: {
        w: Validator<number>;
        h: Validator<number>;
        time: Validator<number>;
        playing: Validator<boolean>;
        url: Validator<string>;
        assetId: Validator<TLAssetId | null>;
    };
    static migrations: Migrations;
    canEdit: () => boolean;
    isAspectRatioLocked: () => boolean;
    getDefaultProps(): TLVideoShape['props'];
    component(shape: TLVideoShape): JSX.Element;
    indicator(shape: TLVideoShape): JSX.Element;
    toSvg(shape: TLVideoShape): SVGGElement;
}

declare type WithDefaultHelpers<T extends TLUiOverride<any, any>> = T extends TLUiOverride<infer Type, infer Helpers> ? TLUiOverride<Type, Helpers extends undefined ? DefaultHelpers : Helpers & DefaultHelpers> : never;

declare class ZoomBrushing extends StateNode {
    static id: string;
    info: TLPointerEventInfo & {
        onInteractionEnd?: string | undefined;
    };
    zoomBrush: Box2d;
    onEnter: (info: TLPointerEventInfo & {
        onInteractionEnd: string;
    }) => void;
    onExit: () => void;
    onPointerMove: () => void;
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    private update;
    private cancel;
    private complete;
}

/** @public */
export declare class ZoomTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Idle_12 | typeof Pointing_8 | typeof ZoomBrushing)[];
    info: TLPointerEventInfo & {
        onInteractionEnd?: string | undefined;
    };
    onEnter: (info: TLPointerEventInfo & {
        onInteractionEnd: string;
    }) => void;
    onExit: () => void;
    onKeyDown: TLKeyboardEvent | undefined;
    onKeyUp: TLKeyboardEvent;
    onInterrupt: TLInterruptEvent;
    private complete;
    private updateCursor;
}


export * from "@tldraw/editor";

export { }
