import { StateNode, TLEventHandlers, TLShapeId } from '@tldraw/editor';
import { ScribbleManager } from '../../../shapes/shared/ScribbleManager';
export declare class ScribbleBrushing extends StateNode {
    static id: string;
    hits: Set<TLShapeId>;
    size: number;
    scribble: ScribbleManager;
    initialSelectedShapeIds: Set<TLShapeId>;
    newlySelectedShapeIds: Set<TLShapeId>;
    onEnter: () => void;
    onExit: () => void;
    onPointerMove: () => void;
    onPointerUp: () => void;
    onKeyDown: () => void;
    onKeyUp: () => void;
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    private startScribble;
    private pushPointToScribble;
    private onScribbleUpdate;
    private onScribbleComplete;
    private updateScribbleSelection;
    private complete;
    private cancel;
}
//# sourceMappingURL=ScribbleBrushing.d.ts.map