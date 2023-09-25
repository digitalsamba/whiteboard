import { TLEventHandlers } from '../../../types/event-types';
import { StateNode } from '../../StateNode';
export declare class Idle extends StateNode {
    static id: string;
    onPointerDown: TLEventHandlers['onPointerDown'];
    onEnter: () => void;
    onCancel: () => void;
}
//# sourceMappingURL=Idle.d.ts.map