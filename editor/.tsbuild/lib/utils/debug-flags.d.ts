import { Atom } from '@tldraw/state';
/** @internal */
export declare const featureFlags: {
    peopleMenu: DebugFlag<boolean>;
    highlighterTool: DebugFlag<boolean>;
};
/** @internal */
export declare const debugFlags: {
    preventDefaultLogging: DebugFlag<boolean>;
    pointerCaptureLogging: DebugFlag<boolean>;
    pointerCaptureTracking: DebugFlag<boolean>;
    pointerCaptureTrackingObject: DebugFlag<Map<Element, number>>;
    elementRemovalLogging: DebugFlag<boolean>;
    debugSvg: DebugFlag<boolean>;
    throwToBlob: DebugFlag<boolean>;
    logMessages: DebugFlag<never[]>;
    resetConnectionEveryPing: DebugFlag<boolean>;
    debugCursors: DebugFlag<boolean>;
    forceSrgb: DebugFlag<boolean>;
};
declare global {
    interface Window {
        tldrawLog: (message: any) => void;
    }
}
interface Defaults<T> {
    development?: T;
    staging?: T;
    production?: T;
    all: T;
}
/** @internal */
export interface DebugFlagDef<T> {
    name: string;
    defaults: Defaults<T>;
    shouldStoreForSession: boolean;
}
/** @internal */
export type DebugFlag<T> = DebugFlagDef<T> & Atom<T>;
export {};
//# sourceMappingURL=debug-flags.d.ts.map