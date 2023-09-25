import { Editor } from '../Editor';
export declare class TickManager {
    editor: Editor;
    constructor(editor: Editor);
    raf: any;
    isPaused: boolean;
    last: number;
    t: number;
    start: () => void;
    tick: () => void;
    dispose: () => void;
    private prevPoint;
    private updatePointerVelocity;
}
//# sourceMappingURL=TickManager.d.ts.map