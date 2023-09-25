import { Atom, Computed } from '@tldraw/state';
import type { Editor } from '../Editor';
import { TLEnterEventHandler, TLEventHandlers, TLEventInfo, TLExitEventHandler, TLPinchEventInfo } from '../types/event-types';
type TLStateNodeType = 'branch' | 'leaf' | 'root';
/** @public */
export interface TLStateNodeConstructor {
    new (editor: Editor, parent?: StateNode): StateNode;
    id: string;
    initial?: string;
    children?: () => TLStateNodeConstructor[];
}
/** @public */
export declare abstract class StateNode implements Partial<TLEventHandlers> {
    editor: Editor;
    constructor(editor: Editor, parent?: StateNode);
    path: Computed<string>;
    static id: string;
    static initial?: string;
    static children?: () => TLStateNodeConstructor[];
    id: string;
    current: Atom<StateNode | undefined>;
    type: TLStateNodeType;
    shapeType?: string;
    initial?: string;
    children?: Record<string, StateNode>;
    parent: StateNode;
    isActive: boolean;
    transition(id: string, info: any): this;
    handleEvent(info: Exclude<TLEventInfo, TLPinchEventInfo>): void;
    enter(info: any, from: string): void;
    exit(info: any, from: string): void;
    /**
     * This is a hack / escape hatch that will tell the editor to
     * report a different state as active (in `currentToolId`) when
     * this state is active. This is usually used when a tool transitions
     * to a child of a different state for a certain interaction and then
     * returns to the original tool when that interaction completes; and
     * where we would want to show the original tool as active in the UI.
     *
     * @public
     */
    _currentToolIdMask: Atom<string | undefined, unknown>;
    get currentToolIdMask(): string | undefined;
    set currentToolIdMask(id: string | undefined);
    onWheel?: TLEventHandlers['onWheel'];
    onPointerDown?: TLEventHandlers['onPointerDown'];
    onPointerMove?: TLEventHandlers['onPointerMove'];
    onPointerUp?: TLEventHandlers['onPointerUp'];
    onDoubleClick?: TLEventHandlers['onDoubleClick'];
    onTripleClick?: TLEventHandlers['onTripleClick'];
    onQuadrupleClick?: TLEventHandlers['onQuadrupleClick'];
    onRightClick?: TLEventHandlers['onRightClick'];
    onMiddleClick?: TLEventHandlers['onMiddleClick'];
    onKeyDown?: TLEventHandlers['onKeyDown'];
    onKeyUp?: TLEventHandlers['onKeyUp'];
    onKeyRepeat?: TLEventHandlers['onKeyRepeat'];
    onCancel?: TLEventHandlers['onCancel'];
    onComplete?: TLEventHandlers['onComplete'];
    onInterrupt?: TLEventHandlers['onInterrupt'];
    onEnter?: TLEnterEventHandler;
    onExit?: TLExitEventHandler;
}
export {};
//# sourceMappingURL=StateNode.d.ts.map