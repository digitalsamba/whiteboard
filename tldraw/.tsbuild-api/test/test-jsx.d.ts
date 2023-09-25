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
        color: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
        fill: "none" | "pattern" | "semi" | "solid";
        dash: "dashed" | "dotted" | "draw" | "solid";
        size: "l" | "m" | "s" | "xl";
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
        color: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
        dash: "dashed" | "dotted" | "draw" | "solid";
        size: "l" | "m" | "s" | "xl";
        spline: "cubic" | "line";
        handles: Record<string, import("@tldraw/editor").TLHandle>;
    }>) => null;
    text: (props: CommonProps & Partial<{
        color: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
        size: "l" | "m" | "s" | "xl";
        font: "draw" | "mono" | "sans" | "serif";
        align: "end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start";
        w: number;
        text: string;
        scale: number;
        autoSize: boolean;
    }>) => null;
    note: (props: CommonProps & Partial<{
        color: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
        size: "l" | "m" | "s" | "xl";
        font: "draw" | "mono" | "sans" | "serif";
        align: "end-legacy" | "end" | "middle-legacy" | "middle" | "start-legacy" | "start";
        verticalAlign: "end" | "middle" | "start";
        growY: number;
        url: string;
        text: string;
    }>) => null;
    arrow: (props: CommonProps & Partial<{
        labelColor: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
        color: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
        fill: "none" | "pattern" | "semi" | "solid";
        dash: "dashed" | "dotted" | "draw" | "solid";
        size: "l" | "m" | "s" | "xl";
        arrowheadStart: "arrow" | "bar" | "diamond" | "dot" | "inverted" | "none" | "pipe" | "square" | "triangle";
        arrowheadEnd: "arrow" | "bar" | "diamond" | "dot" | "inverted" | "none" | "pipe" | "square" | "triangle";
        font: "draw" | "mono" | "sans" | "serif";
        start: {
            type: "binding";
            boundShapeId: TLShapeId;
            normalizedAnchor: import("@tldraw/editor").Vec2dModel;
            isExact: boolean;
        } | {
            type: "point";
            x: number;
            y: number;
        };
        end: {
            type: "binding";
            boundShapeId: TLShapeId;
            normalizedAnchor: import("@tldraw/editor").Vec2dModel;
            isExact: boolean;
        } | {
            type: "point";
            x: number;
            y: number;
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
        growY: number;
        text: string;
    }>) => null;
    highlight: (props: CommonProps & Partial<{
        color: "black" | "blue" | "green" | "grey" | "light-blue" | "light-green" | "light-red" | "light-violet" | "orange" | "red" | "violet" | "yellow";
        size: "l" | "m" | "s" | "xl";
        segments: {
            type: "free" | "straight";
            points: import("@tldraw/editor").Vec2dModel[];
        }[];
        isComplete: boolean;
        isPen: boolean;
    }>) => null;
};
export declare function shapesFromJsx(shapes: Array<JSX.Element> | JSX.Element): {
    ids: Record<string, TLShapeId>;
    shapes: TLShapePartial[];
};
export {};
//# sourceMappingURL=test-jsx.d.ts.map