import { TLShapeId, VecLike } from '@tldraw/editor';
import * as React from 'react';
export declare const ArrowTextLabel: React.NamedExoticComponent<{
    id: TLShapeId;
    position: VecLike;
    width?: number | undefined;
    labelColor: string;
} & Pick<{
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
}, "font" | "size" | "text">>;
//# sourceMappingURL=ArrowTextLabel.d.ts.map