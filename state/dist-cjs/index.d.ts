import { FunctionComponent } from 'react';
import { default as React_2 } from 'react';

/* Excluded from this release type: ArraySet */

/**
 * An Atom is a signal that can be updated directly by calling [[Atom.set]] or [[Atom.update]].
 *
 * Atoms are created using the [[atom]] function.
 *
 * @example
 * ```ts
 * const name = atom('name', 'John')
 *
 * print(name.value) // 'John'
 * ```
 *
 * @public
 */
export declare interface Atom<Value, Diff = unknown> extends Signal<Value, Diff> {
    /**
     * Sets the value of this atom to the given value. If the value is the same as the current value, this is a no-op.
     *
     * @param value - The new value to set.
     * @param diff - The diff to use for the update. If not provided, the diff will be computed using [[AtomOptions.computeDiff]].
     */
    set(value: Value, diff?: Diff): Value;
    /**
     * Updates the value of this atom using the given updater function. If the returned value is the same as the current value, this is a no-op.
     *
     * @param updater - A function that takes the current value and returns the new value.
     */
    update(updater: (value: Value) => Value): Value;
}

/**
 * Creates a new [[Atom]].
 *
 * An Atom is a signal that can be updated directly by calling [[Atom.set]] or [[Atom.update]].
 *
 * @example
 * ```ts
 * const name = atom('name', 'John')
 *
 * name.value // 'John'
 *
 * name.set('Jane')
 *
 * name.value // 'Jane'
 * ```
 *
 * @public
 */
export declare function atom<Value, Diff = unknown>(
/**
 * A name for the signal. This is used for debugging and profiling purposes, it does not need to be unique.
 */
name: string, 
/**
 * The initial value of the signal.
 */
initialValue: Value, 
/**
 * The options to configure the atom. See [[AtomOptions]].
 */
options?: AtomOptions<Value, Diff>): Atom<Value, Diff>;

/**
 * The options to configure an atom, passed into the [[atom]] function.
 * @public
 */
export declare interface AtomOptions<Value, Diff> {
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

/* Excluded from this release type: Child */

/**
 * A computed signal created via [[computed]].
 *
 * @public
 */
export declare interface Computed<Value, Diff = unknown> extends Signal<Value, Diff> {
    /**
     * Whether this computed child is involved in an actively-running effect graph.
     * @public
     */
    readonly isActivelyListening: boolean;
    /* Excluded from this release type: parents */
    /* Excluded from this release type: parentEpochs */
}

/* Excluded from this release type: _Computed */

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
export declare function computed<Value, Diff = unknown>(name: string, compute: (previousValue: typeof UNINITIALIZED | Value, lastComputedEpoch: number) => Value | WithDiff<Value, Diff>, options?: ComputedOptions<Value, Diff>): Computed<Value, Diff>;

/** @public */
export declare function computed(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor;

/** @public */
export declare function computed<Value, Diff = unknown>(options?: ComputedOptions<Value, Diff>): (target: any, key: string, descriptor: PropertyDescriptor) => PropertyDescriptor;

/**
 * Computes the diff between the previous and current value.
 *
 * If the diff cannot be computed for whatever reason, it should return [[RESET_VALUE]].
 *
 * @public
 */
declare type ComputeDiff<Value, Diff> = (previousValue: Value, currentValue: Value, lastComputedEpoch: number, currentEpoch: number) => Diff | RESET_VALUE;

/**
 * Options for creating computed signals. Used when calling [[computed]].
 * @public
 */
export declare interface ComputedOptions<Value, Diff> {
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
 * An EffectScheduler is responsible for executing side effects in response to changes in state.
 *
 * You probably don't need to use this directly unless you're integrating this library with a framework of some kind.
 *
 * Instead, use the [[react]] and [[reactor]] functions.
 *
 * @example
 * ```ts
 * const render = new EffectScheduler('render', drawToCanvas)
 *
 * render.attach()
 * render.execute()
 * ```
 *
 * @public
 */
export declare class EffectScheduler<Result> {
    readonly name: string;
    private readonly runEffect;
    private _isActivelyListening;
    /**
     * Whether this scheduler is attached and actively listening to its parents.
     * @public
     */
    get isActivelyListening(): boolean;
    /* Excluded from this release type: lastTraversedEpoch */
    private lastReactedEpoch;
    private _scheduleCount;
    /**
     * The number of times this effect has been scheduled.
     * @public
     */
    get scheduleCount(): number;
    /* Excluded from this release type: parentEpochs */
    /* Excluded from this release type: parents */
    private readonly _scheduleEffect?;
    constructor(name: string, runEffect: (lastReactedEpoch: number) => Result, options?: EffectSchedulerOptions);
    /* Excluded from this release type: maybeScheduleEffect */
    /* Excluded from this release type: scheduleEffect */
    private maybeExecute;
    /**
     * Makes this scheduler become 'actively listening' to its parents.
     * If it has been executed before it will immediately become eligible to receive 'maybeScheduleEffect' calls.
     * If it has not executed before it will need to be manually executed once to become eligible for scheduling, i.e. by calling [[EffectScheduler.execute]].
     * @public
     */
    attach(): void;
    /**
     * Makes this scheduler stop 'actively listening' to its parents.
     * It will no longer be eligible to receive 'maybeScheduleEffect' calls until [[EffectScheduler.attach]] is called again.
     */
    detach(): void;
    /**
     * Executes the effect immediately and returns the result.
     * @returns The result of the effect.
     */
    execute(): Result;
}

declare interface EffectSchedulerOptions {
    /**
     * scheduleEffect is a function that will be called when the effect is scheduled.
     *
     * It can be used to defer running effects until a later time, for example to batch them together with requestAnimationFrame.
     *
     *
     * @example
     * ```ts
     * let isRafScheduled = false
     * const scheduledEffects: Array<() => void> = []
     * const scheduleEffect = (runEffect: () => void) => {
     * 	scheduledEffects.push(runEffect)
     * 	if (!isRafScheduled) {
     * 		isRafScheduled = true
     * 		requestAnimationFrame(() => {
     * 			isRafScheduled = false
     * 			scheduledEffects.forEach((runEffect) => runEffect())
     * 			scheduledEffects.length = 0
     * 		})
     * 	}
     * }
     * const stop = react('set page title', () => {
     * 	document.title = doc.title,
     * }, scheduleEffect)
     * ```
     *
     * @param execute - A function that will execute the effect.
     * @returns
     */
    scheduleEffect?: (execute: () => void) => void;
}

/** @public */
export declare const EMPTY_ARRAY: [];

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

/* Excluded from this release type: HistoryBuffer */

/**
 * Returns true if the given value is an [[Atom]].
 * @public
 */
export declare function isAtom(value: unknown): value is Atom<unknown>;

/**
 * Returns true if the given value is a signal (either an Atom or a Computed).
 * @public
 */
export declare function isSignal(value: any): value is Signal<any>;

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

declare type RangeTuple<Diff> = [fromEpoch: number, toEpoch: number, diff: Diff];

/**
 * Starts a new effect scheduler, scheduling the effect immediately.
 *
 * Returns a function that can be called to stop the scheduler.
 *
 * @example
 * ```ts
 * const color = atom('color', 'red')
 * const stop = react('set style', () => {
 *   divElem.style.color = color.value
 * })
 * color.set('blue')
 * // divElem.style.color === 'blue'
 * stop()
 * color.set('green')
 * // divElem.style.color === 'blue'
 * ```
 *
 *
 * Also useful in React applications for running effects outside of the render cycle.
 *
 * @example
 * ```ts
 * useEffect(() => react('set style', () => {
 *   divRef.current.style.color = color.value
 * }), [])
 * ```
 *
 * @public
 */
export declare function react(name: string, fn: (lastReactedEpoch: number) => any, options?: EffectSchedulerOptions): () => void;

/**
 * The reactor is a user-friendly interface for starting and stopping an [[EffectScheduler]].
 *
 * Calling .start() will attach the scheduler and execute the effect immediately the first time it is called.
 *
 * If the reactor is stopped, calling `.start()` will re-attach the scheduler but will only execute the effect if any of its parents have changed since it was stopped.
 *
 * You can create a reactor with [[reactor]].
 * @public
 */
export declare interface Reactor<T = unknown> {
    /**
     * The underlying effect scheduler.
     * @public
     */
    scheduler: EffectScheduler<T>;
    /**
     * Start the scheduler. The first time this is called the effect will be scheduled immediately.
     *
     * If the reactor is stopped, calling this will start the scheduler again but will only execute the effect if any of its parents have changed since it was stopped.
     *
     * If you need to force re-execution of the effect, pass `{ force: true }`.
     * @public
     */
    start(options?: {
        force?: boolean;
    }): void;
    /**
     * Stop the scheduler.
     * @public
     */
    stop(): void;
}

/**
 * Creates a [[Reactor]], which is a thin wrapper around an [[EffectScheduler]].
 *
 * @public
 */
export declare function reactor<Result>(name: string, fn: (lastReactedEpoch: number) => Result, options?: EffectSchedulerOptions): Reactor<Result>;

/** @public */
export declare const RESET_VALUE: unique symbol;

/** @public */
export declare type RESET_VALUE = typeof RESET_VALUE;

/**
 * A Signal is a reactive value container. The value may change over time, and it may keep track of the diffs between sequential values.
 *
 * There are two types of signal:
 *
 * - Atomic signals, created using [[atom]]. These are mutable references to values that can be changed using [[Atom.set]].
 * - Computed signals, created using [[computed]]. These are values that are computed from other signals. They are recomputed lazily if their dependencies change.
 *
 * @public
 */
export declare interface Signal<Value, Diff = unknown> {
    /**
     * The name of the signal. This is used at runtime for debugging and perf profiling only. It does not need to be globally unique.
     */
    name: string;
    /**
     * The current value of the signal. This is a reactive value, and will update when the signal changes.
     * Any computed signal that depends on this signal will be lazily recomputed if this signal changes.
     * Any effect that depends on this signal will be rescheduled if this signal changes.
     */
    readonly value: Value;
    /**
     * The epoch when this signal's value last changed. Note tha this is not the same as when the value was last computed.
     * A signal may recopmute it's value without changing it.
     */
    lastChangedEpoch: number;
    /**
     * Returns the sequence of diffs between the the value at the given epoch and the current value.
     * Returns the [[RESET_VALUE]] constant if there is not enough information to compute the diff sequence.
     * @param epoch - The epoch to get diffs since.
     */
    getDiffSince(epoch: number): Diff[] | RESET_VALUE;
    /**
     * Returns the current value of the signal without capturing it as a dependency.
     * Use this if you need to retrieve the signal's value in a hot loop where the performance overhead of dependency tracking is too high.
     */
    __unsafe__getWithoutCapture(): Value;
    /* Excluded from this release type: children */
}

/**
 * Returns a tracked version of the given component.
 * Any signals whose values are read while the component renders will be tracked.
 * If any of the tracked signals change later it will cause the component to re-render.
 *
 * This also wraps the component in a React.memo() call, so it will only re-render if the props change.
 *
 * @example
 * ```ts
 * const Counter = track(function Counter(props: CounterProps) {
 *   const count = useAtom('count', 0)
 *   const increment = useCallback(() => count.set(count.value + 1), [count])
 *   return <button onClick={increment}>{count.value}</button>
 * })
 * ```
 *
 * @param baseComponent - The base component to track.
 * @public
 */
export declare function track<T extends FunctionComponent<any>>(baseComponent: T): T extends React_2.MemoExoticComponent<any> ? T : React_2.MemoExoticComponent<T>;

/**
 * Like [transaction](#transaction), but does not create a new transaction if there is already one in progress.
 *
 * @param fn - The function to run in a transaction.
 * @public
 */
export declare function transact<T>(fn: () => T): T;

/**
 * Batches state updates, deferring side effects until after the transaction completes.
 *
 * @example
 * ```ts
 * const firstName = atom('John')
 * const lastName = atom('Doe')
 *
 * react('greet', () => {
 *   print(`Hello, ${firstName.value} ${lastName.value}!`)
 * })
 *
 * // Logs "Hello, John Doe!"
 *
 * transaction(() => {
 *  firstName.set('Jane')
 *  lastName.set('Smith')
 * })
 *
 * // Logs "Hello, Jane Smith!"
 * ```
 *
 * If the function throws, the transaction is aborted and any signals that were updated during the transaction revert to their state before the transaction began.
 *
 * @example
 * ```ts
 * const firstName = atom('John')
 * const lastName = atom('Doe')
 *
 * react('greet', () => {
 *   print(`Hello, ${firstName.value} ${lastName.value}!`)
 * })
 *
 * // Logs "Hello, John Doe!"
 *
 * transaction(() => {
 *  firstName.set('Jane')
 *  throw new Error('oops')
 * })
 *
 * // Does not log
 * // firstName.value === 'John'
 * ```
 *
 * A `rollback` callback is passed into the function.
 * Calling this will prevent the transaction from committing and will revert any signals that were updated during the transaction to their state before the transaction began.
 *
 *  * @example
 * ```ts
 * const firstName = atom('John')
 * const lastName = atom('Doe')
 *
 * react('greet', () => {
 *   print(`Hello, ${firstName.value} ${lastName.value}!`)
 * })
 *
 * // Logs "Hello, John Doe!"
 *
 * transaction((rollback) => {
 *  firstName.set('Jane')
 *  lastName.set('Smith')
 *  rollback()
 * })
 *
 * // Does not log
 * // firstName.value === 'John'
 * // lastName.value === 'Doe'
 * ```
 *
 * @param fn - The function to run in a transaction, called with a function to roll back the change.
 * @public
 */
export declare function transaction<T>(fn: (rollback: () => void) => T): T;

declare const UNINITIALIZED: unique symbol;

/**
 * The type of the first value passed to a computed signal function as the 'prevValue' parameter.
 *
 * @see [[isUninitialized]].
 * @public
 */
declare type UNINITIALIZED = typeof UNINITIALIZED;

/**
 * Executes the given function without capturing any parents in the current capture context.
 *
 * This is mainly useful if you want to run an effect only when certain signals change while also
 * dereferencing other signals which should not cause the effect to rerun on their own.
 *
 * @example
 * ```ts
 * const name = atom('name', 'Sam')
 * const time = atom('time', () => new Date().getTime())
 *
 * setInterval(() => {
 *   time.set(new Date().getTime())
 * })
 *
 * react('log name changes', () => {
 * 	 print(name.value, 'was changed at', unsafe__withoutCapture(() => time.value))
 * })
 *
 * ```
 *
 * @public
 */
export declare function unsafe__withoutCapture<T>(fn: () => T): T;

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
valueOrInitialiser: (() => Value) | Value, 
/**
 * Options for the atom.
 */
options?: AtomOptions<Value, Diff>): Atom<Value, Diff>;

/**
 * Creates a new computed signal and returns it. The computed signal will be created only once.
 *
 * See [[computed]]
 *
 * @example
 * ```ts
 * type GreeterProps = {
 *   firstName: Signal<string>
 *   lastName: Signal<string>
 * }
 *
 * const Greeter = track(function Greeter ({firstName, lastName}: GreeterProps) {
 *   const fullName = useComputed('fullName', () => `${firstName.value} ${lastName.value}`)
 *   return <div>Hello {fullName.value}!</div>
 * })
 * ```
 *
 * @public
 */
export declare function useComputed<Value>(name: string, compute: () => Value, deps: any[]): Computed<Value>;

/** @public */
export declare function useComputed<Value, Diff = unknown>(name: string, compute: () => Value, opts: ComputedOptions<Value, Diff>, deps: any[]): Computed<Value>;

/** @public */
export declare function useQuickReactor(name: string, reactFn: () => void, deps?: any[]): void;

/** @public */
export declare function useReactor(name: string, reactFn: () => void, deps?: any[] | undefined): void;

/* Excluded from this release type: useStateTracking */

/**
 * Extracts the value from a signal and subscribes to it.
 *
 * Note that you do not need to use this hook if you are wrapping the component with [[track]]
 *
 * @example
 * ```ts
 * const Counter: React.FC = () => {
 *   const $count = useAtom('count', 0)
 *   const increment = useCallback(() => $count.set($count.value + 1), [count])
 *   const currentCount = useValue($count)
 *   return <button onClick={increment}>{currentCount}</button>
 * }
 * ```
 *
 * You can also pass a function to compute the value and it will be memoized as in [[useComputed]]:
 *
 * @example
 * ```ts
 * type GreeterProps = {
 *   firstName: Signal<string>
 *   lastName: Signal<string>
 * }
 *
 * const Greeter = track(function Greeter({ firstName, lastName }: GreeterProps) {
 *   const fullName = useValue('fullName', () => `${firstName.value} ${lastName.value}`, [
 *     firstName,
 *     lastName,
 *   ])
 *   return <div>Hello {fullName}!</div>
 * })
 * ```
 *
 * @public
 */
export declare function useValue<Value>(value: Signal<Value>): Value;

/** @public */
export declare function useValue<Value>(name: string, fn: () => Value, deps: unknown[]): Value;

/**
 * A debugging tool that tells you why a computed signal or effect is running.
 * Call in the body of a computed signal or effect function.
 *
 * @example
 * ```ts
 * const name = atom('name', 'Bob')
 * react('greeting', () => {
 * 	whyAmIRunning()
 *	print('Hello', name.value)
 * })
 *
 * name.set('Alice')
 *
 * // 'greeting' is running because:
 * //     'name' changed => 'Alice'
 * ```
 *
 * @public
 */
export declare function whyAmIRunning(): void;

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

export { }
