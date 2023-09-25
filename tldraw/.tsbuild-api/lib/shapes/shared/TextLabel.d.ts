import { TLDefaultColorStyle, TLDefaultFillStyle, TLDefaultFontStyle, TLDefaultHorizontalAlignStyle, TLDefaultSizeStyle, TLDefaultVerticalAlignStyle } from '@tldraw/editor';
import React from 'react';
export declare const TextLabel: React.MemoExoticComponent<(<T extends import("@tldraw/editor").TLArrowShape | import("@tldraw/editor").TLGeoShape | import("@tldraw/editor").TLNoteShape | import("@tldraw/editor").TLTextShape>({ id, type, text, size, labelColor, font, align, verticalAlign, wrap, }: {
    id: T["id"];
    type: T["type"];
    size: TLDefaultSizeStyle;
    font: TLDefaultFontStyle;
    fill?: "none" | "pattern" | "semi" | "solid" | undefined;
    align: TLDefaultHorizontalAlignStyle;
    verticalAlign: TLDefaultVerticalAlignStyle;
    wrap?: boolean | undefined;
    text: string;
    labelColor: TLDefaultColorStyle;
}) => JSX.Element | null)>;
//# sourceMappingURL=TextLabel.d.ts.map