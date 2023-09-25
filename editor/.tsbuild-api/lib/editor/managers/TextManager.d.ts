import { Box2dModel, TLDefaultHorizontalAlignStyle } from '@tldraw/tlschema';
import { Editor } from '../Editor';
type TLOverflowMode = 'truncate-clip' | 'truncate-ellipsis' | 'wrap';
type TLMeasureTextSpanOpts = {
    overflow: TLOverflowMode;
    width: number;
    height: number;
    padding: number;
    fontSize: number;
    fontWeight: string;
    fontFamily: string;
    fontStyle: string;
    lineHeight: number;
    textAlign: TLDefaultHorizontalAlignStyle;
};
export declare class TextManager {
    editor: Editor;
    constructor(editor: Editor);
    getTextElement(): HTMLDivElement;
    measureText: (textToMeasure: string, opts: {
        fontStyle: string;
        fontWeight: string;
        fontFamily: string;
        fontSize: number;
        lineHeight: number;
        width: string;
        minWidth?: string;
        maxWidth: string;
        padding: string;
    }) => Box2dModel;
    /**
     * Given an html element, measure the position of each span of unbroken
     * word/white-space characters within any text nodes it contains.
     */
    measureElementTextNodeSpans(element: HTMLElement, { shouldTruncateToFirstLine }?: {
        shouldTruncateToFirstLine?: boolean;
    }): {
        spans: {
            box: Box2dModel;
            text: string;
        }[];
        didTruncate: boolean;
    };
    /**
     * Measure text into individual spans. Spans are created by rendering the
     * text, then dividing it up according to line breaks and word boundaries.
     *
     * It works by having the browser render the text, then measuring the
     * position of each character. You can use this to replicate the text-layout
     * algorithm of the current browser in e.g. an SVG export.
     */
    measureTextSpans(textToMeasure: string, opts: TLMeasureTextSpanOpts): {
        text: string;
        box: Box2dModel;
    }[];
}
export {};
//# sourceMappingURL=TextManager.d.ts.map