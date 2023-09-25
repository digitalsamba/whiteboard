import { TLDefaultColorTheme, TLGeoShape } from '@tldraw/editor';
import * as React from 'react';
export declare const SolidStyleOval: React.NamedExoticComponent<Pick<{
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
}, "color" | "fill" | "w" | "h"> & {
    strokeWidth: number;
}>;
export declare function SolidStyleOvalSvg({ w, h, strokeWidth: sw, fill, color, theme, }: Pick<TLGeoShape['props'], 'w' | 'h' | 'fill' | 'color'> & {
    strokeWidth: number;
    theme: TLDefaultColorTheme;
}): SVGElement;
export declare function getOvalIndicatorPath(w: number, h: number): string;
//# sourceMappingURL=SolidStyleOval.d.ts.map