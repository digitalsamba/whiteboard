import { TLDefaultDashStyle } from '@tldraw/tlschema';
export declare function getPerfectDashProps(totalLength: number, strokeWidth: number, opts?: Partial<{
    style: TLDefaultDashStyle;
    snap: number;
    end: 'skip' | 'outset' | 'none';
    start: 'skip' | 'outset' | 'none';
    lengthRatio: number;
    closed: boolean;
}>): {
    strokeDasharray: string;
    strokeDashoffset: string;
};
//# sourceMappingURL=getPerfectDashProps.d.ts.map