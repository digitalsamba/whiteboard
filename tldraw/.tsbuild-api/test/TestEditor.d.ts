/// <reference types="@types/jest" />
/// <reference types="react" />
import { Box2dModel, Editor, RequiredKeys, RotateCorner, SelectionHandle, TLContent, TLEditorOptions, TLEventInfo, TLKeyboardEventInfo, TLPinchEventInfo, TLPointerEventInfo, TLShape, TLShapeId, TLShapePartial, TLWheelEventInfo, Vec2d, VecLike } from '@tldraw/editor';
declare global {
    namespace jest {
        interface Matchers<R> {
            toCloselyMatchObject(value: any, precision?: number): void;
        }
    }
}
export declare class TestEditor extends Editor {
    constructor(options?: Partial<Omit<TLEditorOptions, 'store'>>);
    elm: HTMLDivElement;
    bounds: {
        x: number;
        y: number;
        top: number;
        left: number;
        width: number;
        height: number;
        bottom: number;
        right: number;
    };
    setScreenBounds(bounds: Box2dModel, center?: boolean): this;
    clipboard: null | TLContent;
    copy: (ids?: TLShapeId[]) => this;
    cut: (ids?: TLShapeId[]) => this;
    paste: (point?: VecLike) => this;
    /**
     * If you need to trigger a double click, you can either mock the implementation of one of these
     * methods, or call mockRestore() to restore the actual implementation (e.g.
     * _transformPointerDownSpy.mockRestore())
     */
    _transformPointerDownSpy: jest.SpyInstance<import("@tldraw/editor").TLClickEventInfo | TLPointerEventInfo, [info: TLPointerEventInfo]>;
    _transformPointerUpSpy: jest.SpyInstance<import("@tldraw/editor").TLClickEventInfo | TLPointerEventInfo, [info: TLPointerEventInfo]>;
    testShapeID(id: string): TLShapeId;
    testPageID(id: string): import("@tldraw/editor").TLPageId;
    expectToBeIn: (path: string) => this;
    expectPathToBe: (path: string) => this;
    expectCameraToBe(x: number, y: number, z: number): void;
    expectShapeToMatch: (...model: RequiredKeys<TLShapePartial, 'id'>[]) => this;
    protected getInfo: <T extends TLEventInfo>(info: string | T) => T;
    protected getPointerEventInfo: (x?: number, y?: number, options?: Partial<TLPointerEventInfo> | TLShapeId, modifiers?: EventModifiers) => TLPointerEventInfo;
    protected getKeyboardEventInfo: (key: string, name: TLKeyboardEventInfo['name'], options?: Partial<TLKeyboardEventInfo>) => TLKeyboardEventInfo;
    pointerMove: (x?: number, y?: number, options?: PointerEventInit, modifiers?: EventModifiers) => this;
    pointerDown: (x?: number, y?: number, options?: PointerEventInit, modifiers?: EventModifiers) => this;
    pointerUp: (x?: number, y?: number, options?: PointerEventInit, modifiers?: EventModifiers) => this;
    click: (x?: number, y?: number, options?: PointerEventInit, modifiers?: EventModifiers) => this;
    doubleClick: (x?: number, y?: number, options?: PointerEventInit, modifiers?: EventModifiers) => this;
    keyDown: (key: string, options?: Partial<TLKeyboardEventInfo>) => this;
    keyRepeat: (key: string, options?: Partial<TLKeyboardEventInfo>) => this;
    keyUp: (key: string, options?: Partial<Omit<TLKeyboardEventInfo, "key">>) => this;
    wheel: (dx: number, dy: number, options?: Partial<Omit<TLWheelEventInfo, "delta">>) => this;
    pinchStart: (x: number | undefined, y: number | undefined, z: number, dx: number, dy: number, dz: number, options?: Partial<Omit<TLPinchEventInfo, "delta" | "offset" | "point">>) => this;
    pinchTo: (x: number | undefined, y: number | undefined, z: number, dx: number, dy: number, dz: number, options?: Partial<Omit<TLPinchEventInfo, "delta" | "offset" | "point">>) => this;
    pinchEnd: (x: number | undefined, y: number | undefined, z: number, dx: number, dy: number, dz: number, options?: Partial<Omit<TLPinchEventInfo, "delta" | "offset" | "point">>) => this;
    rotateSelection(angleRadians: number, { handle, shiftKey, }?: {
        handle?: RotateCorner;
        shiftKey?: boolean;
    }): this;
    /**
     * The center of the selection bounding box.
     *
     * @readonly
     * @public
     */
    get selectionPageCenter(): null | Vec2d;
    translateSelection(dx: number, dy: number, options?: Partial<TLPointerEventInfo>): this;
    resizeSelection({ scaleX, scaleY }: {
        scaleX?: number | undefined;
        scaleY?: number | undefined;
    }, handle: SelectionHandle, options?: Partial<TLPointerEventInfo>): this;
    createShapesFromJsx(shapesJsx: JSX.Element | JSX.Element[]): Record<string, TLShapeId>;
    /**
     * Get the page point (or absolute point) of a shape.
     *
     * @example
     * ```ts
     * editor.getPagePoint(myShape)
     * ```
     *
     * @param shape - The shape to get the page point for.
     *
     * @public
     */
    getPageCenter(shape: TLShape): null | Vec2d;
    /**
     * Get the page rotation (or absolute rotation) of a shape by its id.
     *
     * @example
     * ```ts
     * editor.getPageRotationById(myShapeId)
     * ```
     *
     * @param id - The id of the shape to get the page rotation for.
     */
    getPageRotationById(id: TLShapeId): number;
    getPageRotation(shape: TLShape): number;
}
export declare const defaultShapesIds: {
    box1: TLShapeId;
    box2: TLShapeId;
    ellipse1: TLShapeId;
};
export declare const createDefaultShapes: () => TLShapePartial[];
type PointerEventInit = Partial<TLPointerEventInfo> | TLShapeId;
type EventModifiers = Partial<Pick<TLPointerEventInfo, 'altKey' | 'ctrlKey' | 'shiftKey'>>;
export {};
//# sourceMappingURL=TestEditor.d.ts.map