import { TLDefaultColorStyle, TLDefaultColorTheme, TLDefaultFillStyle } from '@tldraw/editor';
import React from 'react';
export interface ShapeFillProps {
    d: string;
    fill: TLDefaultFillStyle;
    color: TLDefaultColorStyle;
    theme: TLDefaultColorTheme;
}
export declare function useDefaultColorTheme(): {
    id: "light" | "dark";
    text: string;
    background: string;
    solid: string;
    black: import("@tldraw/editor").TLDefaultColorThemeColor;
    blue: import("@tldraw/editor").TLDefaultColorThemeColor;
    green: import("@tldraw/editor").TLDefaultColorThemeColor;
    grey: import("@tldraw/editor").TLDefaultColorThemeColor;
    orange: import("@tldraw/editor").TLDefaultColorThemeColor;
    red: import("@tldraw/editor").TLDefaultColorThemeColor;
    violet: import("@tldraw/editor").TLDefaultColorThemeColor;
    yellow: import("@tldraw/editor").TLDefaultColorThemeColor;
    "light-violet": import("@tldraw/editor").TLDefaultColorThemeColor;
    "light-blue": import("@tldraw/editor").TLDefaultColorThemeColor;
    "light-green": import("@tldraw/editor").TLDefaultColorThemeColor;
    "light-red": import("@tldraw/editor").TLDefaultColorThemeColor;
};
export declare const ShapeFill: React.NamedExoticComponent<ShapeFillProps>;
export declare function getShapeFillSvg({ d, color, fill, theme }: ShapeFillProps): SVGGElement | undefined;
export declare function getSvgWithShapeFill(foregroundPath: SVGElement, backgroundPath?: SVGElement): SVGElement;
//# sourceMappingURL=ShapeFill.d.ts.map