import { StateNode } from '../StateNode';
import { Idle } from './children/Idle';
import { Pointing } from './children/Pointing';
/** @public */
export declare abstract class BaseBoxShapeTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Idle | typeof Pointing)[];
    abstract shapeType: string;
}
//# sourceMappingURL=BaseBoxShapeTool.d.ts.map