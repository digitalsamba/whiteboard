import { StateNode } from '@tldraw/editor';
import { Drawing } from '../draw/toolStates/Drawing';
import { Idle } from '../draw/toolStates/Idle';
export declare class HighlightShapeTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Drawing | typeof Idle)[];
    shapeType: string;
    onExit: () => void;
}
//# sourceMappingURL=HighlightShapeTool.d.ts.map