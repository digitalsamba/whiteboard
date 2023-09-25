import { StateNode } from '@tldraw/editor';
import { Idle } from './children/Idle';
import { Lasering } from './children/Lasering';
/** @public */
export declare class LaserTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Idle | typeof Lasering)[];
    onEnter: () => void;
}
//# sourceMappingURL=LaserTool.d.ts.map