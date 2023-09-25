/** @public */
export type TLCopyType = 'jpeg' | 'json' | 'png' | 'svg';
/** @public */
export type TLExportType = 'jpeg' | 'json' | 'png' | 'svg' | 'webp';
/** @public */
export declare function getSvgAsString(svg: SVGElement): string;
/** @public */
export declare function getSvgAsImage(svg: SVGElement, options: {
    type: TLCopyType | TLExportType;
    quality: number;
    scale: number;
}): Promise<Blob | null>;
/** @public */
export declare function getSvgAsDataUrl(svg: SVGElement): Promise<string>;
/** @public */
export declare function getSvgAsDataUrlSync(node: SVGElement): string;
/** @public */
export declare function downloadDataURLAsFile(dataUrl: string, filename: string): void;
/** @public */
export declare function getTextBoundingBox(text: SVGTextElement): DOMRect;
//# sourceMappingURL=export.d.ts.map