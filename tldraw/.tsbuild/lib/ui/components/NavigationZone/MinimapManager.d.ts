import { Box2d, Editor, TLInstancePresence, TLShapeId, Vec2d } from '@tldraw/editor';
export declare class MinimapManager {
    editor: Editor;
    constructor(editor: Editor);
    dpr: number;
    colors: {
        shapeFill: string;
        selectFill: string;
        viewportFill: string;
    };
    id: string;
    cvs: HTMLCanvasElement | null;
    pageBounds: (Box2d & {
        id: TLShapeId;
    })[];
    collaborators: TLInstancePresence[];
    canvasScreenBounds: Box2d;
    canvasPageBounds: Box2d;
    contentPageBounds: Box2d;
    contentScreenBounds: Box2d;
    originPagePoint: Vec2d;
    originPageCenter: Vec2d;
    isInViewport: boolean;
    debug: boolean;
    setDpr(dpr: number): void;
    updateContentScreenBounds: () => void;
    /** Get the canvas's true bounds converted to page bounds. */
    updateCanvasPageBounds: () => void;
    getScreenPoint: (x: number, y: number) => {
        x: number;
        y: number;
    };
    getPagePoint: (x: number, y: number) => Vec2d;
    minimapScreenPointToPagePoint: (x: number, y: number, shiftKey?: boolean, clampToBounds?: boolean) => Vec2d;
    render: () => void;
    static roundedRect(ctx: CanvasRenderingContext2D | Path2D, x: number, y: number, width: number, height: number, rx: number, ry: number): void;
    static sharpRect(ctx: CanvasRenderingContext2D | Path2D, x: number, y: number, width: number, height: number, _rx?: number, _ry?: number): void;
}
//# sourceMappingURL=MinimapManager.d.ts.map