import { StateNode, TLClickEvent } from '@tldraw/editor';
import { Dragging } from './children/Dragging';
import { Idle } from './children/Idle';
import { Pointing } from './children/Pointing';
/** @public */
export declare class HandTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Dragging | typeof Idle | typeof Pointing)[];
    onDoubleClick: TLClickEvent;
    onTripleClick: TLClickEvent;
    onQuadrupleClick: TLClickEvent;
}
//# sourceMappingURL=HandTool.d.ts.map