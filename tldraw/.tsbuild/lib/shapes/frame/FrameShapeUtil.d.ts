/// <reference types="react" />
import { BaseBoxShapeUtil, Geometry2d, TLFrameShape, TLOnResizeEndHandler, TLShape } from '@tldraw/editor';
export declare function defaultEmptyAs(str: string, dflt: string): string;
/** @public */
export declare class FrameShapeUtil extends BaseBoxShapeUtil<TLFrameShape> {
    static type: "frame";
    static props: {
        w: import("@tldraw/editor").Validator<number>;
        h: import("@tldraw/editor").Validator<number>;
        name: import("@tldraw/editor").Validator<string>;
    };
    static migrations: import("@tldraw/editor").Migrations;
    canBind: () => boolean;
    canEdit: () => boolean;
    getDefaultProps(): TLFrameShape['props'];
    getGeometry(shape: TLFrameShape): Geometry2d;
    component(shape: TLFrameShape): JSX.Element;
    toSvg(shape: TLFrameShape): SVGElement | Promise<SVGElement>;
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
//# sourceMappingURL=FrameShapeUtil.d.ts.map