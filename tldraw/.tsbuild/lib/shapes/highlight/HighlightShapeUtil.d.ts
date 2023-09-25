/// <reference types="react" />
import { Circle2d, Polyline2d, ShapeUtil, TLHighlightShape, TLOnResizeHandler } from '@tldraw/editor';
/** @public */
export declare class HighlightShapeUtil extends ShapeUtil<TLHighlightShape> {
    static type: "highlight";
    static props: {
        color: import("@tldraw/editor").EnumStyleProp<"black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red">;
        size: import("@tldraw/editor").EnumStyleProp<"s" | "m" | "l" | "xl">;
        segments: import("@tldraw/editor").ArrayOfValidator<{
            type: "free" | "straight";
            points: import("@tldraw/editor").Vec2dModel[];
        }>;
        isComplete: import("@tldraw/editor").Validator<boolean>;
        isPen: import("@tldraw/editor").Validator<boolean>;
    };
    static migrations: import("@tldraw/editor").Migrations;
    hideResizeHandles: (shape: TLHighlightShape) => boolean;
    hideRotateHandle: (shape: TLHighlightShape) => boolean;
    hideSelectionBoundsFg: (shape: TLHighlightShape) => boolean;
    getDefaultProps(): TLHighlightShape['props'];
    getGeometry(shape: TLHighlightShape): Polyline2d | Circle2d;
    component(shape: TLHighlightShape): JSX.Element;
    backgroundComponent(shape: TLHighlightShape): JSX.Element;
    indicator(shape: TLHighlightShape): JSX.Element;
    expandSelectionOutlinePx(shape: TLHighlightShape): number;
    toSvg(shape: TLHighlightShape): SVGPathElement;
    toBackgroundSvg(shape: TLHighlightShape): SVGPathElement;
    onResize: TLOnResizeHandler<TLHighlightShape>;
}
//# sourceMappingURL=HighlightShapeUtil.d.ts.map