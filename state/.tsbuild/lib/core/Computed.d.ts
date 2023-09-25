import { ArraySet } from './ArraySet';
import { HistoryBuffer } from './HistoryBuffer';
import { Child, ComputeDiff, RESET_VALUE, Signal } from './types';
declare const UNINITIALIZED: unique symbol;
/**
 * The type of the first value passed to a computed signal function as the 'prevValue' parameter.
 *
 * @see [[isUninitialized]].
 * @public
 */
type UNINITIALIZED = typeof UNINITIALIZED;
/**
 * Call this inside a computed signal function to determine whether it is the first time the function is being called.
 *
 * Mainly useful for incremental signal computation.
 *
 * @example
 * ```ts
 * const count = atom('count', 0)
 * const double = computed('double', (prevValue) => {
 *   if (isUninitialized(prevValue)) {
 *     print('First time!')
 *   }
 *   return count.value * 2
 * })
 * ```
 *
 * @param value - The value to check.
 * @public
 */
export declare const isUninitialized: (value: any) => value is typeof UNINITIALIZED;
declare class WithDiff<Value, Diff> {
    value: Value;
    diff: Diff;
    constructor(value: Value, diff: Diff);
}
/**
 * When writing incrementally-computed signals it is convenient (and usually more performant) to incrementally compute the diff too.
 *
 * You can use this function to wrap the return value of a computed signal function to indicate that the diff should be used instead of calculating a new one with [[AtomOptions.computeDiff]].
 *
 * @example
 * ```ts
 * const count = atom('count', 0)
 * const double = computed('double', (prevValue) => {
 *   const nextValue = count.value * 2
 *   if (isUninitialized(prevValue)) {
 *     return nextValue
 *   }
 *   return withDiff(nextValue, nextValue - prevValue)
 * }, { historyLength: 10 })
 * ```
 *
 *
 * @param value - The value.
 * @param diff - The diff.
 * @public
 */
export declare function withDiff<Value, Diff>(value: Value, diff: Diff): WithDiff<Value, Diff>;
/**
 * Options for creating computed signals. Used when calling [[computed]].
 * @public
 */
export interface ComputedOptions<Value, Diff> {
    /**
     * The maximum number of diffs to keep in the history buffer.
     *
     * If you don't need to compute diffs, or if you will supply diffs manually via [[Atom.set]], you can leave this as `undefined` and no history buffer will be created.
     *
     * If you expect the value to be part of an active effect subscription all the time, and to not change multiple times inside of a single transaction, you can set this to a relatively low number (e.g. 10).
     *
     * Otherwise, set this to a higher number based on your usage pattern and memory constraints.
     *
     */
    historyLength?: number;
    /**
     * A method used to compute a diff between the atom's old and new values. If provided, it will not be used unless you also specify [[AtomOptions.historyLength]].
     */
    computeDiff?: ComputeDiff<Value, Diff>;
    /**
     * If provided, this will be used to compare the old and new values of the atom to determine if the value has changed.
     * By default, values are compared using first using strict equality (`===`), then `Object.is`, and finally any `.equals` method present in the object's prototype chain.
     * @param a - The old value
     * @param b - The new value
     * @returns
     */
    isEqual?: (a: any, b: any) => boolean;
}
/**
 * A computed signal created via [[computed]].
 *
 * @public
 */
export interface Computed<Value, Diff = unknown> extends Signal<Value, Diff> {
    /**
     * Whether this computed child is involved in an actively-running effect graph.
     * @public
     */
    readonly isActivelyListening: boolean;
    /** @internal */
    readonly parents: Signal<any, any>[];
    /** @internal */
    readonly parentEpochs: number[];
}
/**
 * @internal
 */
export declare class _Computed<Value, Diff = unknown> implements Computed<Value, Diff> {
    /**
     * The name of the signal. This is used for debugging and performance profiling purposes. It does not need to be globally unique.
     */
    readonly name: string;
    /**
     * The function that computes the value of the signal.
     */
    private readonly derive;
    lastChangedEpoch: number;
    lastTraversedEpoch: number;
    /**
     * The epoch when the reactor was last checked.
     */
    private lastCheckedEpoch;
    parents: Signal<any, any>[];
    parentEpochs: number[];
    children: ArraySet<Child>;
    get isActivelyListening(): boolean;
    historyBuffer?: HistoryBuffer<Diff>;
    private state;
    private computeDiff?;
    private readonly isEqual;
    constructor(
    /**
     * The name of the signal. This is used for debugging and performance profiling purposes. It does not need to be globally unique.
     */
    name: string, 
    /**
     * The function that computes the value of the signal.
     */
    derive: (previousValue: Value | UNINITIALIZED, lastComputedEpoch: number) => Value | WithDiff<Value, Diff>, options?: ComputedOptions<Value, Diff>);
    __unsafe__getWithoutCapture(): Value;
    get value(): Value;
    getDiffSince(epoch: number): RESET_VALUE | Diff[];
}
/**
 * Retrieves the underlying computed instance for a given property created with the [[computed]]
 * decorator.
 *
 * @example
 * ```ts
 * class Counter {
 *   max = 100
 *   count = atom(0)
 *
 *   @computed get remaining() {
 *     return this.max - this.count.value
 *   }
 * }
 *
 * const c = new Counter()
 * const remaining = getComputedInstance(c, 'remaining')
 * remaining.value === 100 // true
 * c.count.set(13)
 * remaining.value === 87 // true
 * ```
 *
 * @param obj - The object
 * @param propertyName - The property name
 * @public
 */
export declare function getComputedInstance<Obj extends object, Prop extends keyof Obj>(obj: Obj, propertyName: Prop): Computed<Obj[Prop]>;
/**
 * Creates a computed signal.
 *
 * @example
 * ```ts
 * const name = atom('name', 'John')
 * const greeting = computed('greeting', () => `Hello ${name.value}!`)
 * console.log(greeting.value) // 'Hello John!'
 * ```
 *
 * `computed` may also be used as a decorator for creating computed class properties.
 *
 * @example
 * ```ts
 * class Counter {
 *   max = 100
 *   count = atom<number>(0)
 *
 *   @computed get remaining() {
 *     return this.max - this.count.value
 *   }
 * }
 * ```
 *
 * You may optionally pass in a [[ComputedOptions]] when used as a decorator:
 *
 * @example
 * ```ts
 * class Counter {
 *   max = 100
 *   count = atom<number>(0)
 *
 *   @computed({isEqual: (a, b) => a === b})
 *   get remaining() {
 *     return this.max - this.count.value
 *   }
 * }
 * ```
 *
 * @param name - The name of the signal.
 * @param compute - The function that computes the value of the signal.
 * @param options - Options for the signal.
 *
 * @public
 */
export declare function computed<Value, Diff = unknown>(name: string, compute: (previousValue: Value | typeof UNINITIALIZED, lastComputedEpoch: number) => Value | WithDiff<Value, Diff>, options?: ComputedOptions<Value, Diff>): Computed<Value, Diff>;
/** @public */
export declare function computed(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor;
/** @public */
export declare function computed<Value, Diff = unknown>(options?: ComputedOptions<Value, Diff>): (target: any, key: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
/**
 * Returns true if the given value is a computed signal.
 *
 * @param value
 * @returns {value is Computed<any>}
 * @public
 */
export declare function isComputed(value: any): value is Computed<any>;
export {};
//# sourceMappingURL=Computed.d.ts.map