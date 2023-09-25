import { StateNode } from '@tldraw/editor';
import { Idle } from './toolStates/Idle';
import { Pointing } from './toolStates/Pointing';
export declare class GeoShapeTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Idle | typeof Pointing)[];
    shapeType: string;
}
//# sourceMappingURL=GeoShapeTool.d.ts.map