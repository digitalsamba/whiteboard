/// <reference types="react" />
/** @public */
export declare function getPointerInfo(e: React.PointerEvent | PointerEvent): {
    point: {
        x: number;
        y: number;
        z: number;
    };
    shiftKey: boolean;
    altKey: boolean;
    ctrlKey: boolean;
    pointerId: number;
    button: number;
    isPen: boolean;
};
//# sourceMappingURL=getPointerInfo.d.ts.map