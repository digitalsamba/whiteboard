import { TLEventHandlers } from '../../../types/event-types';
import { StateNode } from '../../StateNode';
export declare class Pointing extends StateNode {
    static id: string;
    markId: string;
    wasFocusedOnEnter: boolean;
    onEnter: () => void;
    onPointerMove: TLEventHandlers['onPointerMove'];
    onPointerUp: TLEventHandlers['onPointerUp'];
    onCancel: TLEventHandlers['onCancel'];
    onComplete: TLEventHandlers['onComplete'];
    onInterrupt: TLEventHandlers['onInterrupt'];
    complete(): void;
    cancel(): void;
}
//# sourceMappingURL=Pointing.d.ts.map