/// <reference types="react" />
import { TLShapeId, TLShapePartial } from '@tldraw/editor';
type CommonProps = {
    x: number;
    y: number;
    id?: TLShapeId;
    rotation?: number;
    isLocked?: number;
    ref?: string;
    children?: JSX.Element | JSX.Element[];
    opacity?: number;
};
/**
 * TL - jsx helpers for creating tldraw shapes in test cases
 */
export declare const TL: {
    draw: (props: CommonProps & Partial<{
        color: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
        fill: "pattern" | "none" | "semi" | "solid";
        dash: "draw" | "solid" | "dashed" | "dotted";
        size: "s" | "m" | "l" | "xl";
        segments: {
            type: "free" | "straight";
            points: import("@tldraw/editor").Vec2dModel[];
        }[];
        isComplete: boolean;
        isClosed: boolean;
        isPen: boolean;
    }>) => null;
    group: (props: CommonProps & Partial<import("@tldraw/tlschema/.tsbuild/shapes/TLGroupShape").TLGroupShapeProps>) => null;
    image: (props: CommonProps & Partial<{
        w: number;
        h: number;
        playing: boolean;
        url: string;
        assetId: import("@tldraw/editor").TLAssetId | null;
        crop: {
            topLeft: import("@tldraw/editor").Vec2dModel;
            bottomRight: import("@tldraw/editor").Vec2dModel;
        } | null;
    }>) => null;
    embed: (props: CommonProps & Partial<{
        w: number;
        h: number;
        url: string;
    }>) => null;
    video: (props: CommonProps & Partial<{
        w: number;
        h: number;
        time: number;
        playing: boolean;
        url: string;
        assetId: import("@tldraw/editor").TLAssetId | null;
    }>) => null;
    line: (props: CommonProps & Partial<{
        color: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
        dash: "draw" | "solid" | "dashed" | "dotted";
        size: "s" | "m" | "l" | "xl";
        spline: "line" | "cubic";
        handles: Record<string, import("@tldraw/editor").TLHandle>;
    }>) => null;
    text: (props: CommonProps & Partial<{
        color: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
        size: "s" | "m" | "l" | "xl";
        font: "serif" | "draw" | "sans" | "mono";
        align: "start" | "end" | "middle" | "start-legacy" | "end-legacy" | "middle-legacy";
        w: number;
        text: string;
        scale: number;
        autoSize: boolean;
    }>) => null;
    note: (props: CommonProps & Partial<{
        color: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
        size: "s" | "m" | "l" | "xl";
        font: "serif" | "draw" | "sans" | "mono";
        align: "start" | "end" | "middle" | "start-legacy" | "end-legacy" | "middle-legacy";
        verticalAlign: "start" | "end" | "middle";
        growY: number;
        url: string;
        text: string;
    }>) => null;
    arrow: (props: CommonProps & Partial<{
        labelColor: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
        color: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
        fill: "pattern" | "none" | "semi" | "solid";
        dash: "draw" | "solid" | "dashed" | "dotted";
        size: "s" | "m" | "l" | "xl";
        arrowheadStart: "dot" | "none" | "square" | "arrow" | "triangle" | "pipe" | "diamond" | "inverted" | "bar";
        arrowheadEnd: "dot" | "none" | "square" | "arrow" | "triangle" | "pipe" | "diamond" | "inverted" | "bar";
        font: "serif" | "draw" | "sans" | "mono";
        start: {
            type: "point";
            x: number;
            y: number;
        } | {
            type: "binding";
            boundShapeId: TLShapeId;
            normalizedAnchor: import("@tldraw/editor").Vec2dModel;
            isExact: boolean;
        };
        end: {
            type: "point";
            x: number;
            y: number;
        } | {
            type: "binding";
            boundShapeId: TLShapeId;
            normalizedAnchor: import("@tldraw/editor").Vec2dModel;
            isExact: boolean;
        };
        bend: number;
        text: string;
    }>) => null;
    bookmark: (props: CommonProps & Partial<{
        w: number;
        h: number;
        assetId: import("@tldraw/editor").TLAssetId | null;
        url: string;
    }>) => null;
    frame: (props: CommonProps & Partial<{
        w: number;
        h: number;
        name: string;
    }>) => null;
    geo: (props: CommonProps & Partial<{
        geo: "arrow-left" | "ellipse" | "triangle" | "diamond" | "rectangle" | "cloud" | "pentagon" | "hexagon" | "octagon" | "star" | "rhombus" | "rhombus-2" | "oval" | "trapezoid" | "arrow-right" | "arrow-up" | "arrow-down" | "x-box" | "check-box";
        labelColor: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
        color: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
        fill: "pattern" | "none" | "semi" | "solid";
        dash: "draw" | "solid" | "dashed" | "dotted";
        size: "s" | "m" | "l" | "xl";
        font: "serif" | "draw" | "sans" | "mono";
        align: "start" | "end" | "middle" | "start-legacy" | "end-legacy" | "middle-legacy";
        verticalAlign: "start" | "end" | "middle";
        url: string;
        w: number;
        h: number;
        growY: number;
        text: string;
    }>) => null;
    highlight: (props: CommonProps & Partial<{
        color: "black" | "blue" | "green" | "grey" | "orange" | "red" | "violet" | "yellow" | "light-violet" | "light-blue" | "light-green" | "light-red";
        size: "s" | "m" | "l" | "xl";
        segments: {
            type: "free" | "straight";
            points: import("@tldraw/editor").Vec2dModel[];
        }[];
        isComplete: boolean;
        isPen: boolean;
    }>) => null;
};
export declare function shapesFromJsx(shapes: JSX.Element | Array<JSX.Element>): {
    ids: Record<string, TLShapeId>;
    shapes: TLShapePartial[];
};
export {};
//# sourceMappingURL=test-jsx.d.ts.map