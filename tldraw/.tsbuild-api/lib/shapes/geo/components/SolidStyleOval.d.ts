import { TLDefaultColorTheme, TLGeoShape } from '@tldraw/editor';
import * as React from 'react';
export declare const SolidStyleOval: React.NamedExoticComponent<Pick<{
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
}, "color" | "fill" | "h" | "w"> & {
    strokeWidth: number;
}>;
export declare function SolidStyleOvalSvg({ w, h, strokeWidth: sw, fill, color, theme, }: Pick<TLGeoShape['props'], 'color' | 'fill' | 'h' | 'w'> & {
    strokeWidth: number;
    theme: TLDefaultColorTheme;
}): SVGElement;
export declare function getOvalIndicatorPath(w: number, h: number): string;
//# sourceMappingURL=SolidStyleOval.d.ts.map