import { Child, Signal } from './types';
/**
 * Get whether a child's parents have changed.
 *
 * @param child The child to check.
 * @returns True if the child's parents have changed, false otherwise.
 */
export declare function haveParentsChanged(child: Child): boolean;
/**
 * Detach a child from a parent.
 *
 * @param parent The parent to detach from.
 * @param child The child to detach.
 */
export declare const detach: (parent: Signal<any>, child: Child) => void;
/**
 * Attach a child to a parent.
 *
 * @param parent The parent to attach to.
 * @param child The child to attach.
 */
export declare const attach: (parent: Signal<any>, child: Child) => void;
/**
 * Get whether two values are equal (insofar as @tldraw/state is concerned).
 *
 * @param a The first value.
 * @param b The second value.
 */
export declare function equals(a: any, b: any): boolean;
export declare function assertNever(x: never): never;
/** @public */
export declare const EMPTY_ARRAY: [];
//# sourceMappingURL=helpers.d.ts.map