import { TLDefaultColorTheme, TLGeoShape, VecLike } from '@tldraw/editor';
import * as React from 'react';
export declare const DrawStylePolygon: React.NamedExoticComponent<Pick<{
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
}, "color" | "fill"> & {
    id: TLGeoShape['id'];
    outline: VecLike[];
    strokeWidth: number;
    lines?: VecLike[][] | undefined;
}>;
export declare function DrawStylePolygonSvg({ id, outline, lines, fill, color, theme, strokeWidth, }: Pick<TLGeoShape['props'], 'fill' | 'color'> & {
    id: TLGeoShape['id'];
    outline: VecLike[];
    lines?: VecLike[][];
    strokeWidth: number;
    theme: TLDefaultColorTheme;
}): SVGElement;
//# sourceMappingURL=DrawStylePolygon.d.ts.map