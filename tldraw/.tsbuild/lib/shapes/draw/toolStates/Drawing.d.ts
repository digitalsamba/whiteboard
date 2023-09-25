import { StateNode, TLDefaultSizeStyle, TLDrawShape, TLDrawShapeSegment, TLEventHandlers, TLHighlightShape, TLPointerEventInfo, Vec2d } from '@tldraw/editor';
type DrawableShape = TLDrawShape | TLHighlightShape;
export declare class Drawing extends StateNode {
    static id: string;
    info: TLPointerEventInfo;
    initialShape?: DrawableShape;
    shapeType: "draw" | "highlight";
    util: import("@tldraw/editor").ShapeUtil<import("@tldraw/editor").TLUnknownShape>;
    isPen: boolean;
    segmentMode: "free" | "straight" | "starting_straight" | "starting_free";
    didJustShiftClickToExtendPreviousShapeLine: boolean;
    pagePointWhereCurrentSegmentChanged: Vec2d;
    pagePointWhereNextSegmentChanged: Vec2d | null;
    lastRecordedPoint: Vec2d;
    mergeNextPoint: boolean;
    currentLineLength: number;
    canDraw: boolean;
    markId: string | null;
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
export {};
//# sourceMappingURL=Drawing.d.ts.map