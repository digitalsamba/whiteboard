import type { Editor } from '../Editor';
import { TLClickEventInfo, TLPointerEventInfo } from '../types/event-types';
type TLClickState = 'idle' | 'pendingDouble' | 'pendingTriple' | 'pendingQuadruple' | 'pendingOverflow' | 'overflow';
export declare class ClickManager {
    editor: Editor;
    constructor(editor: Editor);
    private _clickId;
    private _clickTimeout?;
    private _clickScreenPoint?;
    private _previousScreenPoint?;
    private _getClickTimeout;
    /**
     * The current click state.
     *
     * @internal
     */
    private _clickState?;
    /**
     * The current click state.
     *
     * @public
     */
    get clickState(): TLClickState | undefined;
    lastPointerInfo: TLPointerEventInfo;
    /**
     * Start the double click timeout.
     *
     * @param info - The event info.
     */
    transformPointerDownEvent: (info: TLPointerEventInfo) => TLPointerEventInfo | TLClickEventInfo;
    /**
     * Emit click_up events on pointer up.
     *
     * @param info - The event info.
     */
    transformPointerUpEvent: (info: TLPointerEventInfo) => TLPointerEventInfo | TLClickEventInfo;
    /**
     * Cancel the double click timeout.
     *
     * @internal
     */
    cancelDoubleClickTimeout: () => void;
    /**
     * Handle a move event, possibly cancelling the click timeout.
     *
     * @internal
     */
    handleMove: () => void;
}
export {};
//# sourceMappingURL=ClickManager.d.ts.map