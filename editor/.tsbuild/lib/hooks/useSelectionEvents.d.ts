/// <reference types="react" />
import { TLSelectionHandle } from '../editor/types/selection-types';
/** @public */
export declare function useSelectionEvents(handle: TLSelectionHandle): {
    onPointerDown: import("react").PointerEventHandler<Element>;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerUp: import("react").PointerEventHandler<Element>;
};
//# sourceMappingURL=useSelectionEvents.d.ts.map