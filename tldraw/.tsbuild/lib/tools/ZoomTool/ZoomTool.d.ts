import { StateNode, TLInterruptEvent, TLKeyboardEvent, TLPointerEventInfo } from '@tldraw/editor';
import { Idle } from './children/Idle';
import { Pointing } from './children/Pointing';
import { ZoomBrushing } from './children/ZoomBrushing';
/** @public */
export declare class ZoomTool extends StateNode {
    static id: string;
    static initial: string;
    static children: () => (typeof Idle | typeof Pointing | typeof ZoomBrushing)[];
    info: TLPointerEventInfo & {
        onInteractionEnd?: string | undefined;
    };
    onEnter: (info: TLPointerEventInfo & {
        onInteractionEnd: string;
    }) => void;
    onExit: () => void;
    onKeyDown: TLKeyboardEvent | undefined;
    onKeyUp: TLKeyboardEvent;
    onInterrupt: TLInterruptEvent;
    private complete;
    private updateCursor;
}
//# sourceMappingURL=ZoomTool.d.ts.map