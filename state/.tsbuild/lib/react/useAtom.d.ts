import { Atom, AtomOptions } from '../core';
/**
 * Creates a new atom and returns it. The atom will be created only once.
 *
 * See [[atom]]
 *
 * @example
 * ```ts
 * const Counter = track(function Counter () {
 *   const count = useAtom('count', 0)
 *   const increment = useCallback(() => count.set(count.value + 1), [count])
 *   return <button onClick={increment}>{count.value}</button>
 * })
 * ```
 *
 * @public
 */
export declare function useAtom<Value, Diff = unknown>(
/**
 * The name of the atom. This does not need to be globally unique. It is used for debugging and performance profiling.
 */
name: string, 
/**
 * The initial value of the atom. If this is a function, it will be called to get the initial value.
 */
valueOrInitialiser: Value | (() => Value), 
/**
 * Options for the atom.
 */
options?: AtomOptions<Value, Diff>): Atom<Value, Diff>;
//# sourceMappingURL=useAtom.d.ts.map