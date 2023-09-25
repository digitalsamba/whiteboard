import { Box2dModel, Editor, TLDefaultHorizontalAlignStyle, TLDefaultVerticalAlignStyle } from '@tldraw/editor';
/** Get an SVG element for a text shape. */
export declare function createTextSvgElementFromSpans(editor: Editor, spans: {
    text: string;
    box: Box2dModel;
}[], opts: {
    fontSize: number;
    fontFamily: string;
    textAlign: TLDefaultHorizontalAlignStyle;
    verticalTextAlign: TLDefaultVerticalAlignStyle;
    fontWeight: string;
    fontStyle: string;
    lineHeight: number;
    width: number;
    height: number;
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
    padding?: number;
    offsetX?: number;
    offsetY?: number;
}): SVGTextElement;
//# sourceMappingURL=createTextSvgElementFromSpans.d.ts.map