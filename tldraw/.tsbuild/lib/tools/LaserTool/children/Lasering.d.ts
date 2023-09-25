import { StateNode, TLEventHandlers } from '@tldraw/editor';
import { ScribbleManager } from '../../../shapes/shared/ScribbleManager';
export declare class Lasering extends StateNode {
    static id: string;
    scribble: ScribbleManager;
    onEnter: () => void;
    onExit: () => void;
    onPointerMove: () => void;
    onPointerUp: () => void;
    private startScribble;
    private pushPointToScribble;
    private onScribbleUpdate;
    private onScribbleComplete;
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    private complete;
    private cancel;
}
//# sourceMappingURL=Lasering.d.ts.map