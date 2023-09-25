import { TLDefaultColorTheme, TLGeoShape, TLShapeId } from '@tldraw/editor';
import * as React from 'react';
export declare const DrawStyleCloud: React.NamedExoticComponent<Pick<{
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
}, "color" | "size" | "fill" | "w" | "h"> & {
    strokeWidth: number;
    id: TLShapeId;
}>;
export declare function DrawStyleCloudSvg({ fill, color, strokeWidth, theme, w, h, id, size, }: Pick<TLGeoShape['props'], 'fill' | 'color' | 'w' | 'h' | 'size'> & {
    strokeWidth: number;
    theme: TLDefaultColorTheme;
    id: TLShapeId;
}): SVGElement;
//# sourceMappingURL=DrawStyleCloud.d.ts.map