import { TLEventHandlers } from '../types/event-types';
import { StateNode } from './StateNode';
export declare class RootState extends StateNode {
    static id: string;
    static initial: string;
    static children: () => never[];
    onKeyDown: TLEventHandlers['onKeyDown'];
}
//# sourceMappingURL=RootState.d.ts.map