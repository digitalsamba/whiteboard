import { StateNode, TLEventHandlers, TLExitEventHandler } from '@tldraw/editor';
export declare class Idle extends StateNode {
    static id: string;
    onEnter: () => void;
    onExit: TLExitEventHandler;
    onCancel: TLEventHandlers['onCancel'];
    onPointerDown: TLEventHandlers['onPointerDown'];
    onDoubleClick: TLEventHandlers['onDoubleClick'];
    onKeyDown: TLEventHandlers['onKeyDown'];
    onKeyRepeat: TLEventHandlers['onKeyRepeat'];
    onKeyUp: TLEventHandlers['onKeyUp'];
    private cancel;
    private cleanupCroppingState;
    private nudgeCroppingImage;
}
//# sourceMappingURL=Idle.d.ts.map