/** @internal */
export type ReplacerCallback = (substring: string, ...args: unknown[]) => string;
/**	@public */
export declare const INDENT = "  ";
/** @internal */
export declare class TextHelpers {
    static insertTextFirefox(field: HTMLTextAreaElement | HTMLInputElement, text: string): void;
    /**
     * Inserts text at the cursor’s position, replacing any selection, with **undo** support and by
     * firing the input event.
     */
    static insert(field: HTMLTextAreaElement | HTMLInputElement, text: string): void;
    /**
     * Replaces the entire content, equivalent to field.value = text but with **undo** support and by
     * firing the input event.
     */
    static set(field: HTMLTextAreaElement | HTMLInputElement, text: string): void;
    /** Get the selected text in a field or an empty string if nothing is selected. */
    static getSelection(field: HTMLTextAreaElement | HTMLInputElement): string;
    /**
     * Adds the wrappingText before and after field’s selection (or cursor). If endWrappingText is
     * provided, it will be used instead of wrappingText at on the right.
     */
    static wrapSelection(field: HTMLTextAreaElement | HTMLInputElement, wrap: string, wrapEnd?: string): void;
    /** Finds and replaces strings and regex in the field’s value. */
    static replace(field: HTMLTextAreaElement | HTMLInputElement, searchValue: string | RegExp, replacer: string | ReplacerCallback): void;
    static findLineEnd(value: string, currentEnd: number): number;
    static indent(element: HTMLTextAreaElement): void;
    static unindent(element: HTMLTextAreaElement): void;
    static indentCE(element: HTMLElement): void;
    static unindentCE(element: HTMLElement): void;
    static fixNewLines: RegExp;
    static normalizeText(text: string): string;
    static normalizeTextForDom(text: string): string;
}
//# sourceMappingURL=TextHelpers.d.ts.map