/** @public */
export declare const runtime: {
    openWindow: (url: string, target: string) => void;
    refreshPage: () => void;
    hardReset: () => void;
};
/** @public */
export declare function setRuntimeOverrides(input: Partial<typeof runtime>): void;
//# sourceMappingURL=runtime.d.ts.map