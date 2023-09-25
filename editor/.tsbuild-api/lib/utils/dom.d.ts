import React from 'react';
/** @public */
export declare function loopToHtmlElement(elm: Element): HTMLElement;
/**
 * This function calls `event.preventDefault()` for you. Why is that useful?
 *
 * Beacuase if you enable `window.preventDefaultLogging = true` it'll log out a message when it
 * happens. Because we use console.warn rather than (log) you'll get a stack trace in the inspector
 * telling you exactly where it happened. This is important because `e.preventDefault()` is the
 * source of many bugs, but unfortuantly it can't be avoided because it also stops a lot of default
 * behaviour which doesn't make sense in our UI
 *
 * @param event - To prevent default on
 * @public
 */
export declare function preventDefault(event: Event | React.BaseSyntheticEvent): void;
/** @public */
export declare function setPointerCapture(element: Element, event: PointerEvent | React.PointerEvent<Element>): void;
/** @public */
export declare function releasePointerCapture(element: Element, event: PointerEvent | React.PointerEvent<Element>): void;
/** @public */
export declare const stopEventPropagation: (e: any) => any;
//# sourceMappingURL=dom.d.ts.map