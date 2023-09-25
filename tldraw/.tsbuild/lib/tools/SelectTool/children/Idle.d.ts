import { StateNode, TLClickEventInfo, TLEventHandlers, TLKeyboardEventInfo } from '@tldraw/editor';
export declare class Idle extends StateNode {
    static id: string;
    onEnter: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerDown: TLEventHandlers['onPointerDown'];
    onDoubleClick: TLEventHandlers['onDoubleClick'];
    onRightClick: TLEventHandlers['onRightClick'];
    onCancel: TLEventHandlers['onCancel'];
    onKeyDown: TLEventHandlers['onKeyDown'];
    onKeyRepeat: TLEventHandlers['onKeyDown'];
    onKeyUp: (info: TLKeyboardEventInfo) => void;
    private shouldStartEditingShape;
    private startEditingShape;
    isDarwin: boolean;
    handleDoubleClickOnCanvas(info: TLClickEventInfo): void;
    private nudgeSelectedShapes;
}
export declare const MAJOR_NUDGE_FACTOR = 10;
export declare const MINOR_NUDGE_FACTOR = 1;
export declare const GRID_INCREMENT = 5;
//# sourceMappingURL=Idle.d.ts.map