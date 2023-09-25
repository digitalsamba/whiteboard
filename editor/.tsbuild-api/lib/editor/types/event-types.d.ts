import { TLHandle, TLShape, Vec2dModel } from '@tldraw/tlschema';
import { VecLike } from '../../primitives/Vec2d';
import { TLSelectionHandle } from './selection-types';
/** @public */
export type UiEventType = 'click' | 'keyboard' | 'pinch' | 'pointer' | 'wheel' | 'zoom';
/** @public */
export type TLPointerEventTarget = {
    target: 'canvas';
    shape?: undefined;
} | {
    target: 'handle';
    shape: TLShape;
    handle: TLHandle;
} | {
    target: 'selection';
    handle?: TLSelectionHandle;
    shape?: undefined;
} | {
    target: 'shape';
    shape: TLShape;
};
/** @public */
export type TLPointerEventName = 'middle_click' | 'pointer_down' | 'pointer_move' | 'pointer_up' | 'right_click';
/** @public */
export type TLCLickEventName = 'double_click' | 'quadruple_click' | 'triple_click';
/** @public */
export type TLPinchEventName = 'pinch_end' | 'pinch_start' | 'pinch';
/** @public */
export type TLKeyboardEventName = 'key_down' | 'key_repeat' | 'key_up';
/** @public */
export type TLEventName = 'cancel' | 'complete' | 'interrupt' | 'wheel' | TLCLickEventName | TLKeyboardEventName | TLPinchEventName | TLPointerEventName;
/** @public */
export interface TLBaseEventInfo {
    type: UiEventType;
    shiftKey: boolean;
    altKey: boolean;
    ctrlKey: boolean;
}
/** @public */
export type TLPointerEventInfo = TLBaseEventInfo & {
    type: 'pointer';
    name: TLPointerEventName;
    point: VecLike;
    pointerId: number;
    button: number;
    isPen: boolean;
} & TLPointerEventTarget;
/** @public */
export type TLClickEventInfo = TLBaseEventInfo & {
    type: 'click';
    name: TLCLickEventName;
    point: VecLike;
    pointerId: number;
    button: number;
    phase: 'down' | 'settle' | 'up';
} & TLPointerEventTarget;
/** @public */
export type TLKeyboardEventInfo = TLBaseEventInfo & {
    type: 'keyboard';
    name: TLKeyboardEventName;
    key: string;
    code: string;
};
/** @public */
export type TLPinchEventInfo = TLBaseEventInfo & {
    type: 'pinch';
    name: TLPinchEventName;
    point: Vec2dModel;
    delta: Vec2dModel;
};
/** @public */
export type TLWheelEventInfo = TLBaseEventInfo & {
    type: 'wheel';
    name: 'wheel';
    delta: Vec2dModel;
};
/** @public */
export type TLCancelEventInfo = {
    type: 'misc';
    name: 'cancel';
};
/** @public */
export type TLCompleteEventInfo = {
    type: 'misc';
    name: 'complete';
};
/** @public */
export type TLInterruptEventInfo = {
    type: 'misc';
    name: 'interrupt';
};
/** @public */
export type TLEventInfo = TLCancelEventInfo | TLClickEventInfo | TLCompleteEventInfo | TLInterruptEventInfo | TLKeyboardEventInfo | TLPinchEventInfo | TLPointerEventInfo | TLWheelEventInfo;
/** @public */
export type TLPointerEvent = (info: TLPointerEventInfo) => void;
/** @public */
export type TLClickEvent = (info: TLClickEventInfo) => void;
/** @public */
export type TLKeyboardEvent = (info: TLKeyboardEventInfo) => void;
/** @public */
export type TLPinchEvent = (info: TLPinchEventInfo) => void;
/** @public */
export type TLWheelEvent = (info: TLWheelEventInfo) => void;
/** @public */
export type TLCancelEvent = (info: TLCancelEventInfo) => void;
/** @public */
export type TLCompleteEvent = (info: TLCompleteEventInfo) => void;
/** @public */
export type TLInterruptEvent = (info: TLInterruptEventInfo) => void;
/** @public */
export type UiEvent = TLCancelEvent | TLClickEvent | TLCompleteEvent | TLKeyboardEvent | TLPinchEvent | TLPointerEvent;
/** @public */
export type TLEnterEventHandler = (info: any, from: string) => void;
/** @public */
export type TLExitEventHandler = (info: any, to: string) => void;
/** @public */
export interface TLEventHandlers {
    onPointerDown: TLPointerEvent;
    onPointerMove: TLPointerEvent;
    onRightClick: TLPointerEvent;
    onDoubleClick: TLClickEvent;
    onTripleClick: TLClickEvent;
    onQuadrupleClick: TLClickEvent;
    onMiddleClick: TLPointerEvent;
    onPointerUp: TLPointerEvent;
    onKeyDown: TLKeyboardEvent;
    onKeyUp: TLKeyboardEvent;
    onKeyRepeat: TLKeyboardEvent;
    onWheel: TLWheelEvent;
    onCancel: TLCancelEvent;
    onComplete: TLCompleteEvent;
    onInterrupt: TLInterruptEvent;
}
/** @public */
export declare const EVENT_NAME_MAP: Record<Exclude<TLEventName, TLPinchEventName>, keyof TLEventHandlers>;
/** @public */
export type TLTickEvent = (elapsed: number) => void;
//# sourceMappingURL=event-types.d.ts.map