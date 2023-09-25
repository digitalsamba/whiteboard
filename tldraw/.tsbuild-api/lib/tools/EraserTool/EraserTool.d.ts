import { StateNode } from '@tldraw/editor';
import { Erasing } from './children/Erasing';
import { Idle } from './children/Idle';
import { Pointing } from './children/Pointing';
/** @public */
export declare class EraserTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Erasing | typeof Idle | typeof Pointing)[];
    onEnter: () => void;
}
//# sourceMappingURL=EraserTool.d.ts.map