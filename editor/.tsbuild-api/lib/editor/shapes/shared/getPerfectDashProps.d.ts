import { TLDefaultDashStyle } from '@tldraw/tlschema';
export declare function getPerfectDashProps(totalLength: number, strokeWidth: number, opts?: Partial<{
    style: TLDefaultDashStyle;
    snap: number;
    end: 'none' | 'outset' | 'skip';
    start: 'none' | 'outset' | 'skip';
    lengthRatio: number;
    closed: boolean;
}>): {
    strokeDasharray: string;
    strokeDashoffset: string;
};
//# sourceMappingURL=getPerfectDashProps.d.ts.map