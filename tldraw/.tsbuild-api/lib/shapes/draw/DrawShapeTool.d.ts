import { StateNode } from '@tldraw/editor';
import { Drawing } from './toolStates/Drawing';
import { Idle } from './toolStates/Idle';
export declare class DrawShapeTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Drawing | typeof Idle)[];
    shapeType: string;
    onExit: () => void;
}
//# sourceMappingURL=DrawShapeTool.d.ts.map