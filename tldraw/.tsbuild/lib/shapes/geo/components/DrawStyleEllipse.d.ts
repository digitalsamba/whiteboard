import { TLDefaultColorTheme, TLGeoShape, TLShapeId } from '@tldraw/editor';
import * as React from 'react';
export declare const DrawStyleEllipse: React.NamedExoticComponent<Pick<{
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
    id: TLShapeId;
}>;
export declare function DrawStyleEllipseSvg({ id, w, h, strokeWidth: sw, fill, color, theme, }: Pick<TLGeoShape['props'], 'w' | 'h' | 'fill' | 'color'> & {
    strokeWidth: number;
    id: TLShapeId;
    theme: TLDefaultColorTheme;
}): SVGElement;
export declare function getEllipseStrokeOptions(strokeWidth: number): {
    size: number;
    thinning: number;
    end: {
        taper: number;
    };
    start: {
        taper: number;
    };
    streamline: number;
    smoothing: number;
    simulatePressure: boolean;
};
export declare function getEllipseStrokePoints(id: string, width: number, height: number, strokeWidth: number): import("../../shared/freehand/types").StrokePoint[];
export declare function getEllipsePath(id: string, width: number, height: number, strokeWidth: number): string;
export declare function getEllipseIndicatorPath(id: string, width: number, height: number, strokeWidth: number): string;
//# sourceMappingURL=DrawStyleEllipse.d.ts.map