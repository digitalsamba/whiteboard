import { TLShapeId, VecLike } from '@tldraw/editor';
import * as React from 'react';
export declare const ArrowTextLabel: React.NamedExoticComponent<{
    id: TLShapeId;
    position: VecLike;
    width?: number | undefined;
    labelColor: string;
} & Pick<{
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
}, "text" | "size" | "font">>;
//# sourceMappingURL=ArrowTextLabel.d.ts.map