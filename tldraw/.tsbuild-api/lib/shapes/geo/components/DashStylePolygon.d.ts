import { TLDefaultColorTheme, TLGeoShape, VecLike } from '@tldraw/editor';
import * as React from 'react';
export declare const DashStylePolygon: React.NamedExoticComponent<Pick<{
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
}, "color" | "dash" | "fill"> & {
    strokeWidth: number;
    outline: VecLike[];
    lines?: undefined | VecLike[][];
}>;
export declare function DashStylePolygonSvg({ dash, fill, color, theme, strokeWidth, outline, lines, }: Pick<TLGeoShape['props'], 'color' | 'dash' | 'fill'> & {
    outline: VecLike[];
    strokeWidth: number;
    theme: TLDefaultColorTheme;
    lines?: VecLike[][];
}): SVGElement;
//# sourceMappingURL=DashStylePolygon.d.ts.map