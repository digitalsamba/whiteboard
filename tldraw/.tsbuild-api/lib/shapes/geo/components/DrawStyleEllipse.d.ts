import { TLDefaultColorTheme, TLGeoShape, TLShapeId } from '@tldraw/editor';
import * as React from 'react';
export declare const DrawStyleEllipse: React.NamedExoticComponent<Pick<{
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
    id: TLShapeId;
}>;
export declare function DrawStyleEllipseSvg({ id, w, h, strokeWidth: sw, fill, color, theme, }: Pick<TLGeoShape['props'], 'color' | 'fill' | 'h' | 'w'> & {
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